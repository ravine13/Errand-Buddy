from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from models import History, db
from serializer import HistorySchema, history_schema, historys_schema

history_bp = Blueprint('history_bp', __name__)
api = Api(history_bp)

history_parser = reqparse.RequestParser()
history_parser.add_argument('task_id', type=int, required=True, help='Task id is required')
history_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand boy id is required')
history_parser.add_argument('payment_id', type=int, required=True, help='Payment id is required')
history_parser.add_argument('rating_id', type=int, required=True, help='Rating id is required')
history_parser.add_argument('category_id', type=int, required=True, help='Category id is required')

class Histories(Resource):
    def get(self):
        histories = History.query.all()
        result = historys_schema.dump(histories)
        
        response =  make_response(
            jsonify(result),
            200
        )
        return response
    
api.add_resource(Histories, '/history')

class HistoryByID(Resource):
    def get(self,id):
        history = History.query.filter_by(id=id).first()
        if not history:
            return make_response(jsonify({'message': 'History not found'}), 404)
        return make_response(jsonify(history_schema.dump(history)), 200)

    def patch(self,id):
        history = History.query.filter_by(id=id).first()
        if not history:
            return make_response(jsonify({'message': 'History not found'}), 404)
        data = history_parser.parse_args()
        for key, value in data.items():
            if value is not None:
                setattr(history, key, value)
        db.session.commit()
        return make_response(jsonify(history_schema.dump(history)), 200)

    def delete(self,id):
        history = History.query.filter_by(id=id).first()

        if not history:
            return make_response(jsonify({'message': 'History not found'}))
        db.session.delete(history)
        db.session.commit()
        return make_response(jsonify({'Message': 'History deleted successfully'}),200)
    
api.add_resource(HistoryByID, '/history/<int:id>')
