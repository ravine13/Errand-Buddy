from flask import Blueprint, current_app, make_response, jsonify
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api, reqparse, abort
from flask_bcrypt import Bcrypt
from app import ma
from app.models import User,Message,Task,ErrandBoy,Payment,Rating,Category,Notification, Availability
from marshmallow_sqlalchemy import auto_field, SQLAlchemyAutoSchema, SQLAlchemySchema, fields
from marshmallow.fields import Nested

serializer_bp = Blueprint('serializer', __name__)
api = Api(serializer_bp)
ma = Marshmallow(serializer_bp)
bcrypt = Bcrypt()

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_fk = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        load_instance = True
        include_fk = True

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

class ErrandBoySchema(ma.SQLAlchemyAutoSchema):
    tasks = fields.Nested('TaskSchema', many=True)
    payments = fields.Nested('PaymentSchema', many=True)
    ratings = fields.Nested('RatingSchema', many=True)
    availabilities = fields.Nested('AvailabilitySchema', many=True)
    notifications = fields.Nested('NotificationSchema', many=True)
    messages = fields.Nested('MessageSchema', many=True)
    
    class Meta:
        model = ErrandBoy
        load_instance = True
        include_fk = True

errand_boy_schema = ErrandBoySchema()
errand_boys_schema = ErrandBoySchema(many=True)

class PaymentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Payment
        load_instance = True
        include_fk = True

payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)

class RatingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Rating
        load_instance = True
        include_fk = True

rating_schema = RatingSchema()
ratings_schema = RatingSchema(many=True)

class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance = True
        include_fk = True

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

class MessageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True
        include_fk = True

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)

class NotificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Notification
        load_instance = True
        include_fk = True

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)

class AvailabilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Availability
        load_instance = True
        include_fk = True

availability_schema = AvailabilitySchema()
availabilities_schema = AvailabilitySchema(many=True)