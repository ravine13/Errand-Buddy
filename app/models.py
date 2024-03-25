from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    location = db.Column(db.String(120))
    profile_picture = db.Column(db.String(500))
    phone_number = db.Column(db.String(20))
    tasks = db.relationship('Task', backref='user', lazy='dynamic')
    payments = db.relationship('Payment', backref='user', lazy='dynamic')
    ratings_given = db.relationship('Rating', backref='user_given', foreign_keys='Rating.user_id')
    notifications = db.relationship('Notification', backref='user_received', foreign_keys='Notification.user_id')
    messages_sent = db.relationship('Message', backref='user_sender', foreign_keys='Message.user_id')
    role = db.Column(db.String(20))
    
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role
            
        }

class ErrandBoy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    location = db.Column(db.String(120))
    profile_picture = db.Column(db.String(500))
    phone_number = db.Column(db.String(20))
    tasks = db.relationship('Task', backref='errand_boy', lazy='dynamic')
    payments = db.relationship('Payment', backref='errand_boy', lazy='dynamic')
    ratings = db.relationship('Rating', backref='errand_boy_rated_by', foreign_keys='Rating.errand_boy_id')
    availabilities = db.relationship('Availability', backref='availability_errand_boy', lazy='dynamic')
    notifications = db.relationship('Notification', backref='notification_errand_boy', foreign_keys='Notification.errand_boy_id')
    messages_received = db.relationship('Message', backref='message_errand_boy', foreign_keys='Message.errand_boy_id')
    role = db.Column(db.String(20))

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(140))
    location = db.Column(db.String(120))
    status = db.Column(db.String(20)) #pending, completed, canceled
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    estimated_time = db.Column(db.Integer) #stored in seconds, but will convert to hrs/mins in frontend
    completed_at = db.Column(db.DateTime)
    payment = db.relationship('Payment', backref='task_payment', uselist=False)

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float)
    status = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    payment_method = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, index = True, default=datetime.utcnow)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    tasks = db.relationship('Task', backref='category', lazy='dynamic')

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Float)
    review = db.Column(db.String(500), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(140))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    timestamp = db.Column(db.DateTime, index = True, default=datetime.utcnow)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    timestamp = db.Column(db.DateTime, index = True, default=datetime.utcnow)

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'))
    rating_id = db.Column(db.Integer, db.ForeignKey('rating.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)


class TokenBlocklist(db.Model):
    __tablename__ ='token_blocklist'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)