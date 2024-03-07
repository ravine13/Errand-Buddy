from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_bcrypt import Bcrypt
from models import Availability, db
from serializer import availabilities_schema,AvailabilitySchema,availability_schema
from flask_jwt_extended import jwt_required


availability_bp = Blueprint('availability_bp', __name__)
bcrypt = Bcrypt()
api = Api(availability_bp)

availability_parser = reqparse.RequestParser()
availability_parser.add_argument('start_time', type=str, required=True, help='Start time is required')
availability_parser.add_argument('end_time', type=str, required=True, help='End time is required')
availability_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand boy id is required')

patch_availability_parser = reqparse.RequestParser()
patch_availability_parser.add_argument('start_time', type=str, required=False)
patch_availability_parser.add_argument('end_time', type=str, required=False)
patch_availability_parser.add_argument('errand_boy_id', type=int, required=False)


availability_schema = AvailabilitySchema()
availabilities_schema = AvailabilitySchema(many=True)

class Availabilities(Resource):
    def get(self):
        availability = Availability.query.all()
        result = availabilities_schema.dump(availability)
        return make_response(jsonify(result), 200)

api.add_resource(Availabilities,'/availability')

class AvailabilityByID(Resource):
    def get(self,id):
        availability = Availability.query.filter_by(id=id).first()
        if not availability:
            return make_response(jsonify({'message':'availability not found'}),404)
        return make_response(jsonify(availability_schema.dump(availability)),200)
    
    def patch(self,id):
        availability = Availability.query.filter(id=id).first()
        if not availability:
            return make_response(jsonify({'message':'availability not found'}),404)
        data = patch_availability_parser.parse_args()
        for key,value in data.items():
            if value is not None:
                setattr(availability,key,value)
        db.session.commit()
        return make_response(jsonify(availability_schema.dump(availability)),200)
    
    def delete(self,id):
        availability = Availability.query.filter(id=id).first()
        if not availability:
            return make_response(jsonify({'message':'availability not found'}),404)
        db.session.delete(availability)
        db.session.commit()

        return make_response(jsonify({'message': 'availability successfully deleted'}),200)

api.add_resource(AvailabilityByID,'/availability/<int:id>')

class new_availability(Resource):
    def post(self):
        data = availability_parser.parse_args()
        new_availabilities = Availability(**data)
        db.session.add(new_availabilities)
        db.session.commit()

        return make_response(jsonify(availability_schema.dump(new_availabilities)),201)

api.add_resource(new_availability,'/new_availability')
