from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_bcrypt import Bcrypt
from models import Message, db
from serializer import MessageSchema,message_schema,messages_schema
from flask_jwt_extended import jwt_required


message_bp = Blueprint('message_bp', __name__)
bcrypt = Bcrypt()
api = Api(message_bp)

message_parser = reqparse.RequestParser()
message_parser.add_argument('message', type=str, required=True, help='message is required')
message_parser.add_argument('user_id', type=int, required=True, help='User id is required')
message_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand boy id is required')

patch_message_parser = reqparse.RequestParser()
patch_message_parser.add_argument('message', type=str, required=False)
patch_message_parser.add_argument('user_id', type=int, required=False)
patch_message_parser.add_argument('errand_boy_id', type=int, required=False)


message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)

class Messages(Resource):
    def get(self, user_id):
        # Get messages for the provided user ID
        messages = Message.query.filter_by(user_id=user_id).all()

        # Check if any messages were found
        if not messages:
            return make_response(jsonify({'message': 'No messages found for the provided user ID'}), 404)
        
        return make_response(jsonify(messages_schema.dump(messages)), 200)
    
api.add_resource(Messages, '/messages/<int:user_id>')

class MessageByID(Resource):
    def get(self,id):
        message = Message.query.filter_by(id=id).first()
        if not message:
            return make_response(jsonify({'message': 'Message not found'}), 404)
        return make_response(jsonify(message_schema.dump(message)), 200)

    def patch(self,id):
        message = Message.query.filter_by(id=id).first()
        if not message:
            return make_response(jsonify({'message': 'Message not found'}), 404)
        data = message_parser.parse_args()
        for key, value in data.items():
            if value is not None:
                setattr(message, key, value)
        db.session.commit()
        return make_response(jsonify(message_schema.dump(message)), 200)

    def delete(self,id):
        message = Message.query.filter_by(id=id).first()

        if not message:
            return make_response(jsonify({'message': 'message not found'}))
        db.session.delete(message)
        db.session.commit()
        return make_response(jsonify({'Message': 'Message deleted successfully'}),200)
    
api.add_resource(MessageByID, '/message/<int:id>')

class new_Message(Resource):
    def post(self):
        data = message_parser.parse_args()
        new_message = Message(**data)
        db.session.add(new_message)
        db.session.commit()
        return make_response(jsonify(message_schema.dump(new_message)), 201)

api.add_resource(new_Message, '/new_message')
