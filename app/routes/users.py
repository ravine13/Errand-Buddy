from flask import Flask, Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User,db
from flask_bcrypt import Bcrypt
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from serializer import UserSchema, user_schema, users_schema

user_bp = Blueprint('user_bp', __name__)
bcrypt = Bcrypt()
api = Api(user_bp)


user_parser = reqparse.RequestParser()
user_parser.add_argument('username', type=str, required=True, help='Username is required')
user_parser.add_argument('email', type=str, required=True, help='Email is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')
user_parser.add_argument('location', type=str, required=True, help='Location is required')
user_parser.add_argument('profile_picture', type=str, required=True,help='profile picture is required')  
user_parser.add_argument('phone_number', type=str, required=True, help='Phone number is required')


user_schema = UserSchema()
users_schema = UserSchema(many=True)

class Users(Resource):
    def get(self):
        users = User.query.all()
        print(users)
        result = users_schema.dump(users)
        
        response =  make_response(
            jsonify(result),
            200
        )
        return response
    
    @jwt_required()
    def post(self):
        data = user_parser.parse_args()
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(user_schema.dump(new_user)), 201)

api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self,id):
        user = User.query.get(id)
        if not user:
            return make_response(jsonify({'error': 'user not found'}), 404)
        return make_response(jsonify(user_schema.dump(user)), 200)

    def patch(self,id):
        user = User.query.get(id)
        if not user:
            return make_response(jsonify({'message': 'user not found'}), 404)
        data = user_parser.parse_args()
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return make_response(jsonify(user_schema.dump(user)), 200)


    def delete(self,id):
        user = User.query.get(id)
        if not user:
            return make_response(jsonify({'message': 'user not found'}), 404)
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify({'message': 'user deleted successfully'}), 200)

api.add_resource(UserByID, '/user/<int:id>')

