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
    tasks = db.relationship('Task', backref='user')
    payments = db.relationship('Payment', backref='user')
    ratings = db.relationship('Rating', backref='user', foreign_keys='Rating.user_id')
    notifications = db.relationship('Notification', backref='user', foreign_keys='Notification.user_id')
    messages = db.relationship('Message', backref='user', foreign_keys='Message.user_id')

class ErrandBoy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    location = db.Column(db.String(120))
    profile_picture = db.Column(db.String(500))
    phone_number = db.Column(db.String(20))
    tasks = db.relationship('Task', backref='errand_boy')
    payments = db.relationship('Payment', backref='errand_boy')
    ratings = db.relationship('Rating', backref='errand_boy', foreign_keys='Rating.errand_boy_id')
    availabilities = db.relationship('Availability', backref='errand_boy')
    notifications = db.relationship('Notification', backref='errand_boy', foreign_keys='Notification.errand_boy_id')
    messages = db.relationship('Message', backref='errand_boy', foreign_keys='Message.errand_boy_id')


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
    payment = db.relationship('Payment', backref='task', uselist=False)

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float)
    status = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    payment_method = db.Column(db.String(20))

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    tasks = db.relationship('Task', backref='category')

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Float)
    review = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    user = db.relationship('User', backref='ratings_given', foreign_keys=[user_id])
    errand_boy = db.relationship('ErrandBoy', backref='ratings_received', foreign_keys=[errand_boy_id])


class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    errand_boy = db.relationship('ErrandBoy', backref='availabilities')


class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(140))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    user = db.relationship('User', backref='notifications', foreign_keys=[user_id])
    errand_boy = db.relationship('ErrandBoy', backref='notifications', foreign_keys=[errand_boy_id])


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    timestamp = db.Column(db.DateTime, index = True, default=datetime.utcnow)
    user = db.relationship('User', backref='messages_sent', foreign_keys=[user_id])
    errand_boy = db.relationship('ErrandBoy', backref='messages_received', foreign_keys=[errand_boy_id])




