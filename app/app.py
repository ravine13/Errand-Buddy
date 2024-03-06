from flask import Flask, Blueprint
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # Assuming you're using flask_jwt_extended
from flask_bcrypt import Bcrypt  # Assuming you're using flask_bcrypt
import os
from models import db
# from tags import tags_bp
from mpesa import mpesa_bp
from Auth import auth_bp
from routes.users import user_bp
from serializer import serializer_bp
from routes.task_bp import task_bp
from routes.payment_bp import payment_bp

jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
    # app.config['SECRET_KEY'] = b"\x06F\x14\x91\xba\xdc\x9a\x96g'\xc7\xb0"
    
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(mpesa_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(serializer_bp)
    app.register_blueprint(task_bp)
    app.register_blueprint(payment_bp)
    CORS(app, resources={r"*": {"origins": "*"}})
    
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5555)
