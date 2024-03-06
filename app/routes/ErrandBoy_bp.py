from flask import Blueprint, make_response, jsonify, request, current_app
from flask_restful import Api, Resource, reqparse, abort
from flask_marshmallow import Marshmallow
from models import ErrandBoy, db
from serializer import ErrandBoySchema, errand_boy_schema, errand_boys_schema

errand_boy_bp = Blueprint('errand_boy_bp', __name__)
ma = Marshmallow(errand_boy_bp)
api = Api(errand_boy_bp)

errand_boy_parser = reqparse.RequestParser()
errand_boy_parser.add_argument('username', type=str, required=True, help='Username is required')
errand_boy_parser.add_argument('email', type=str, required=True, help='Email is required')
errand_boy_parser.add_argument('phone_number', type=str, required=True, help='Phone number is required')
errand_boy_parser.add_argument('password', type=str, required=True, help='Password is required')
errand_boy_parser.add_argument('location', type=str, required=True, help='Location is required')
errand_boy_parser.add_argument('profile_picture', type=str, required=True, help='Profile picture is required')




class ErrandBoys(Resource):
    def get(self):
        errand_boys = ErrandBoy.query.all()
        result = errand_boys_schema.dump(errand_boys)
        return make_response(jsonify(result), 200)

    def post(self):
        data = errand_boy_parser.parse_args()
        new_errand_boy = ErrandBoy(**data)
        db.session.add(new_errand_boy)
        db.session.commit()
        return make_response(jsonify(errand_boy_schema.dump(new_errand_boy)), 201)

api.add_resource(ErrandBoys, '/errand_boys')

class ErrandBoyById(Resource):
    def get(self, id):
        errand_boy = ErrandBoy.query.get(id)
        if not errand_boy:
            return make_response(jsonify({'error': 'ErrandBoy not found'}), 404)
        return make_response(jsonify(errand_boy_schema.dump(errand_boy)), 200)

    def patch(self, id):
        data = errand_boy_parser.parse_args()
        ErrandBoy.query.filter_by(id=id).update(data)
        db.session.commit()
        errand_boy = ErrandBoy.query.get(id)
        return make_response(jsonify(errand_boy_schema.dump(errand_boy)), 200)

    def delete(self, id):
        ErrandBoy.query.filter_by(id=id).delete()
        db.session.commit()
        return make_response(jsonify({'message': 'ErrandBoy deleted'}), 200)

api.add_resource(ErrandBoyById, '/errand_boys/<int:id>')
