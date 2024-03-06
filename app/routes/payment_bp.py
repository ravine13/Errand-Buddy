from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from models import Payment, db
from serializer import PaymentSchema, payment_schema, payments_schema
from flask_jwt_extended import jwt_required, get_jwt_identity

payment_bp = Blueprint('payment_bp', __name__)
api = Api(payment_bp)

payment_parser = reqparse.RequestParser()
payment_parser.add_argument('amount', type=float, required=True, help='Amount is required')
payment_parser.add_argument('status', type=str, required=True, help='Status is required')
payment_parser.add_argument('user_id', type=int, required=True, help='User id is required')
payment_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand boy id is required')
payment_parser.add_argument('task_id', type=int, required=True, help='Task id is required')
payment_parser.add_argument('payment_method', type=str, required=True, help='Payment method is required')

class Payments(Resource):
    def get(self):
        payments = Payment.query.all()
        result = payments_schema.dump(payments)
        return make_response(jsonify(result), 200)

    @jwt_required()
    def post(self):
        data = payment_parser.parse_args()

        #check if amount is positive
        if data['amount'] <= 0:
            return make_response(jsonify({'error': 'Amount must be a positive number'}), 400)
        
        #check if status is valid
        valid_statuses = ['pending', 'completed', 'cancelled']
        if data['status'] not in valid_statuses:
            return make_response(jsonify({'error': 'Invalid status'}), 400)
        
        #check if user exists
        user = User.query.get(data['user_id'])
        if not user:
            return make_response(jsonify({'error': 'User not found'}), 404)
        
        #check if errand boy exists
        errand_boy = ErrandBoy.query.get(data['errand_boy_id'])
        if not errand_boy:
            return make_response(jsonify({'error': 'Errand boy not found'}), 404)
        
        #check if task exists
        task = Task.query.get(data['task_id'])
        if not task:
            return make_response(jsonify({'error': 'Task not found'}), 404)

        # if all checks pass, create new payment
        new_payment = Payment(**data)
        try :
            db.session.add(new_payment)
            db.session.commit()
        except Exception as e:
            return make_response(jsonify({'error': 'Database error: ' + str(e)}), 500)

        return make_response(jsonify(payment_schema.dump(new_payment)), 201)

api.add_resource(Payments, '/payments')

class PaymentById(Resource):
    def get(self, id):
        payment = Payment.query.get(id)
        if not payment:
            return make_response(jsonify({'error': 'Payment not found'}), 404)
        return make_response(jsonify(payment_schema.dump(payment)), 200)

    def patch(self, id):
        payment = Payment.query.get(id)
        if not payment:
            return make_response(jsonify({'error': 'Payment not found'}), 404)
        data = payment_parser.parse_args()
        for key, value in data.items():
            setattr(payment, key, value)
        db.session.commit()
        return make_response(jsonify(payment_schema.dump(payment)), 200)

    def delete(self, id):
        payment = Payment.query.get(id)
        if not payment:
            return make_response(jsonify({'error': 'Payment not found'}), 404)
        db.session.delete(payment)
        db.session.commit()
        return make_response(jsonify({'message': 'Payment deleted successfully'}), 200)

api.add_resource(PaymentById, '/payments/<int:id>')

