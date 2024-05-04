from flask import Blueprint, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_bcrypt import Bcrypt
from models import Task, db
from serializer import TaskSchema, task_schema, tasks_schema
from flask_jwt_extended import jwt_required

task_bp = Blueprint('task_bp', __name__)
bcrypt = Bcrypt()
api = Api(task_bp)

task_parser = reqparse.RequestParser()
task_parser.add_argument('description', type=str, required=True, help='Description is required')
task_parser.add_argument('status', type=str, required=True, help='Status is required')
task_parser.add_argument('location', type=str, required=True, help='Location is required')
task_parser.add_argument('estimated_time', type=int, required=True, help='Estimated time is required')
task_parser.add_argument('user_id', type=int, required=True, help='User id is required')
task_parser.add_argument('errand_boy_id', type=int, required=True, help='Errand boy id is required')
task_parser.add_argument('category_id', type=int, required=True, help='Category id is required')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

class Tasks(Resource):
    # @jwt_required()
    def get(self):
        tasks = Task.query.all()
        result = tasks_schema.dump(tasks)
        return make_response(jsonify(result), 200)
    

    @jwt_required()
    def post(self):
        data = task_parser.parse_args()
        new_task = Task(**data)
        db.session.add(new_task)
        db.session.commit()
        return make_response(jsonify(task_schema.dump(new_task)), 201)
    
api.add_resource(Tasks, '/tasks')

class TaskById(Resource):
    def get(self, id):
        task = Task.query.get(id)
        if not task:
            return make_response(jsonify({'error': 'Task not found'}), 404)
        return make_response(jsonify(task_schema.dump(task)), 200)

    def patch(self, id):
        task = Task.query.get(id)
        if not task:
            return make_response(jsonify({'message': 'Task not found'}), 404)
        data = task_parser.parse_args()
        for key, value in data.items():
            setattr(task, key, value)
        db.session.commit()
        return make_response(jsonify(task_schema.dump(task)), 200)

    def delete(self, id):
        task = Task.query.get(id)
        if not task:
            return make_response(jsonify({'message': 'Task not found'}), 404)
        db.session.delete(task)
        db.session.commit()
        return make_response(jsonify({'message': 'Task deleted successfully'}), 200)

api.add_resource(TaskById, '/tasks/<int:id>')