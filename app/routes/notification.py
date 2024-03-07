from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_bcrypt import Bcrypt
from models import Notification, db
from serializer import NotificationSchema,notification_schema,notifications_schema
from flask_jwt_extended import jwt_required


notification_bp = Blueprint('notification_bp', __name__)
bcrypt = Bcrypt()
api = Api(notification_bp)

notification_parser = reqparse.RequestParser()
notification_parser.add_argument('message', type=str, required=True, help='message is required')
notification_parser.add_argument('user_id', type=int, required=True, help='user_id is required')
notification_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand_boy_id is required')

patch_notification_parser = reqparse.RequestParser()
patch_notification_parser.add_argument('message', type=str, required=False)
patch_notification_parser.add_argument('user_id', type=int, required=False)
patch_notification_parser.add_argument('errand_boy_id', type=int, required=False)

class Notifications(Resource):
    def get(self):
        notifications = Notification.query.all()
        res = notifications_schema.dump(notifications)
        response = make_response(jsonify(res),200)
        return response
    
api.add_resource(Notifications, '/notifications')

class NotificationsByID(Resource):
    def get(self,id):
        notifications = Notification.query.filter_by(id=id).first()
        if not notifications:
            return make_response(jsonify({'message':'notication not found'}),404)
    def patch(self,id):
        notifications = Notification.query.filter_by(id=id).first()
        if not notifications:
            return make_response(jsonify({'message':'notification not found'}),404)
        
        data = notification_parser.parse_args()
        for key,value in data.items():
            if value is not None:
                setattr(notifications,key,value)
            db.session.commit()
            return make_response(jsonify(notification_schema.dump(notifications)),200)
    def delete(self,id):
        notifications = Notification.query.filter_by(id=id).first()
        if not notifications:
            return make_response(jsonify({'message':'notification not found'}),404)
        db.session.delete(notifications)
        db.session.commit()
        return make_response(jsonify({'message':'notification deleted successfully'}),200)

api.add_resource(NotificationsByID, '/notification/<int:id>')

class new_notification(Resource):
    def post(self):
        data = notification_parser.parse_args()
        new_notifications = Notification(**data)
        db.session.add(new_notifications)
        db.session.commit()

        return make_response(jsonify(notification_schema.dump(new_notifications)),201)
    
api.add_resource(new_notification, '/new_notifications')
