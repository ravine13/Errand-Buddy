from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_bcrypt import Bcrypt
from models import Category, db
from serializer import CategorySchema,category_schema,categories_schema
from flask_jwt_extended import jwt_required

category_bp = Blueprint('category_bp', __name__)
bcrypt = Bcrypt()
api = Api(category_bp)

category_parser = reqparse.RequestParser()
category_parser.add_argument('name', type=str, required=True, help='name is required')

patch_category_parser = reqparse.RequestParser()
patch_category_parser.add_argument('name', type=str, required=False)

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

class Categories(Resource):
    def get(self):
        category = Category.query.all()
        res = categories_schema.dump(category)
        response = make_response(jsonify(res),200)
        return response
    
api.add_resource(Categories, '/category')

class CategoryByID(Resource):
    def get(self,id):
        category = Category.query.filter_by(id=id).first()
        if not category:
            return make_response(jsonify({'message': 'Category not found'}), 404)
        return make_response(jsonify(category_schema.dump(category)), 200)

    def patch(self,id):
        category = Category.query.filter_by(id=id).first()
        if not category:
            return make_response(jsonify({'message':'Category not found'}), 404)
        data = patch_category_parser.parse_args()
        for key,value in data.items():
            setattr(category,key,value)
        db.session.commit()
        return make_response(jsonify(category_schema.dump(category)), 200)

    def delete(self,id):
        category = Category.query.filter_by(id=id).first()
        if not category:
            return make_response(jsonify({'message':'Category not found'}), 404)
        db.session.delete(category)
        db.session.commit()
        return make_response(jsonify({'message':'Category deleted successfully'}), 200)

api.add_resource(CategoryByID, '/category/<int:id>')

class new_Category(Resource):
    def post(self):
        data = category_parser.parse_args()
        new_category = Category(name=data['name'])
        db.session.add(new_category)
        db.session.commit()
        return make_response(jsonify(category_schema.dump(new_category)), 201)

api.add_resource(new_Category, '/new_category')
