from datetime import datetime
from flask import Blueprint,jsonify,make_response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager,
                                 create_access_token, 
                                 jwt_required,
                                  current_user,
                                  get_jwt
)
from flask_restful import Resource, Api, reqparse , abort
import json


from models import User, ErrandBoy, db, TokenBlocklist, Role

auth_bp = Blueprint('auth',__name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(auth_bp)

register_args = reqparse.RequestParser()
register_args.add_argument('username', type=str, required=True, help='Username is required')
register_args.add_argument('email', type=str, required=True, help='Email is required')
register_args.add_argument('password', type=str, required=True, help='Password is required')
register_args.add_argument('location', type=str, required=False)  # This field is optional
register_args.add_argument('profile_picture', type=str, required=False)  # This field is optional
register_args.add_argument('phone_number', type=str, required=True, help='Phone number is required')
register_args.add_argument('confirm-password', type=str, required=True, help='Confirmation password is required')
register_args.add_argument('role', type=str, required=True, help='Role is required')  # New role field

login_args = reqparse.RequestParser()
login_args.add_argument('email', type=str, required=True)
login_args.add_argument('password', type=str, required=True)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]  
    return User.query.filter_by(id=identity).first()

class UserRegister(Resource):
    def post(self):
        data = register_args.parse_args()
        email = data.get('email')
        user_exists = User.query.filter_by(email = email).first() is not None
        
        if user_exists:
            return abort(409, details='Conflict! Account Already Exists')
        
        if data['password'] != data['confirm-password']:
            return abort(422,detail='Passwords do not match')
        
        # Fetch the role
        role = Role.query.filter_by(name=data['role']).first()
        if not role:
            return abort(400, detail='Invalid role')

        new_user = User(
            username=data['username'],
            email=data['email'], 
            password=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
            location=data['location'],
            profile_picture=data['profile_picture'],
            phone_number=data['phone_number'],
            role=role.name
        )
        db.session.add(new_user)
        db.session.commit()
        return {'detail':f'User {data["email"]} has been created successfully'}

api.add_resource(UserRegister,'/register')

class ErrandBoyRegister(Resource):
    def post(self):
        data = register_args.parse_args()
        email = data.get('email')
        errandboy_exists = ErrandBoy.query.filter_by(email = email).first() is not None
        
        if errandboy_exists:
            return abort(409, details='Conflict! Account Already Exists')
        
        if data['password'] != data['confirm-password']:
            return abort(422,detail='Passwords do not match')
        
        # Fetch the role
        role = Role.query.filter_by(name=data['role']).first()
        if not role:
            return abort(400, detail='Invalid role')

        new_Errandboy = ErrandBoy(
            username=data['username'],
            email=data['email'], 
            password=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
            location=data['location'],
            profile_picture=data['profile_picture'],
            phone_number=data['phone_number'],
            role=role.name
        )
        db.session.add(new_Errandboy)
        db.session.commit()
        return {'detail':f'Errandboy {data["username"]} has been created successfully'}

api.add_resource(ErrandBoyRegister,'/registers')

class UserLogin(Resource):
    @jwt_required()
    def get(self):
        return current_user.to_dict()

    def post(self):
        data = login_args.parse_args()
        user = User.query.filter_by(email=data["email"]).first()
        if not user or not bcrypt.check_password_hash(user.password, data["password"]):
            return abort(401, detail="Invalid email or password")

        token = create_access_token(identity=user.id)
        return {"token": token, "user": user.to_dict()}

api.add_resource(UserLogin,'/login')

class Logout(Resource):
    @jwt_required()
    def get(self):
        token = get_jwt()
        jti = token['jti']  
        blocked_token = TokenBlocklist(jti=jti, created_at=datetime.utcnow())
        db.session.add(blocked_token)
        db.session.commit()
        return {'detail': "logged out successful"}

api.add_resource(Logout,'/logout')
