from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_bcrypt import Bcrypt
from models import Rating, db
from serializer import RatingSchema,rating_schema,ratings_schema
from flask_jwt_extended import jwt_required


rating_bp = Blueprint('rating_bp', __name__)
bcrypt = Bcrypt()
api = Api(rating_bp)

rating_parser = reqparse.RequestParser()
rating_parser.add_argument('rating', type=float, required=True, help='Rating is required')
rating_parser.add_argument('review', type=str, required=False)  # This field is optional
rating_parser.add_argument('user_id', type=int, required=True, help='User id is required')
rating_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand boy id is required')

patch_rating_parser = reqparse.RequestParser()
patch_rating_parser.add_argument('rating', type=float, required=False)
patch_rating_parser.add_argument('review', type=str, required=False)
patch_rating_parser.add_argument('user_id', type=int, required=False)
patch_rating_parser.add_argument('errand_boy_id', type=int, required=False)


rating_schema = RatingSchema()
ratings_schema = RatingSchema(many=True)


class Ratings(Resource):
    def get(self):
        rating = Rating.query.all()
        result = ratings_schema.dump(rating)
        return make_response(jsonify(result), 200)

api.add_resource(Ratings,'/ratings')

class RatingByID(Resource):
    def get(self,id):
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return make_response(jsonify({'message':'rating not found'}),404)
        return make_response(jsonify(rating_schema.dump(rating)),200)
    
    def patch(self,id):
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return make_response(jsonify({'message':'rating not found'}),404)
        data = rating_parser.parse_args()
        for key,value in data.items():
            if value is not None:
                setattr(rating,key,value)
        db.session.commit()
        return make_response(jsonify(rating_schema.dump(rating)),200)

    def delete(self,id):
        rating = Rating.query.filter_by(id=id).first()

        if not rating:
            return make_response(jsonify({'message':'rating not found'}),404)
        db.session.delete(rating)
        db.session.commit()

        return make_response(jsonify({'message':'rating deleted successfully'}),200)


api.add_resource(RatingByID,'/rating/<int:id>')

class new_rating(Resource):
    def post(self):
        data = rating_parser.parse_args()

        new_ratings = Rating(**data)

        db.session.add(new_ratings)
        db.session.commit()

        return make_response(jsonify(rating_schema.dump(new_ratings)),201)
api.add_resource(new_rating,'/new_ratings')


