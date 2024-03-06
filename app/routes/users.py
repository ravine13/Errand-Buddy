from flask import Flask, Blueprint, jsonify, make_response, request
from datetime import datetime
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import User,db
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required

User_bp = Blueprint('user', __name__)
api = Api(User_bp)
ma = Marshmallow(User_bp)

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
user_schema = UserSchema()

class Users(Resource):
    def get(self):
        users = User.query.all()
        print(users)
        user =user_schema.dump(users,many = True)
        
        response =  make_response(
            jsonify(user),
            200
        )
        return response
    

api.add_resource(Users, '/user')