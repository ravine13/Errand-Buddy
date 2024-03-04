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
    tasks = db.relationship('Task', back_populates='user')
    payments = db.relationship('Payment', back_populates='user')
    profile_picture = db.Column(db.String(500))
    phone_number = db.Column(db.String(20))

class ErrandBoy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    location = db.Column(db.String(120))
    tasks = db.relationship('Task', back_populates='errand_boy')
    payments = db.relationship('Payment', back_populates='errand_boy')
    profile_picture = db.Column(db.String(500))
    phone_number = db.Column(db.String(20))

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(140))
    location = db.Column(db.String(120))
    status = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    payment = db.relationship('Payment', back_populates='task', uselist=False)
    estimated_time = db.Column(db.Integer) #stored in seconds, but will convert to hrs/mins in frontend
    completed_at = db.Column(db.DateTime)

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
    tasks = db.relationship('Task', back_populates='category')

Task.category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
Task.category = db.relationship('Category', back_populates='tasks')

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Float)
    review = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))

User.ratings = db.relationship('Rating', back_populates='user', foreign_keys=[Rating.user_id])
ErrandBoy.ratings = db.relationship('Rating', back_populates='errand_boy', foreign_keys=[Rating.errand_boy_id])

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))

ErrandBoy.availabilities = db.relationship('Availability', back_populates='errand_boy')

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(140))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))

User.notifications = db.relationship('Notification', back_populates='user', foreign_keys=[Notification.user_id])
ErrandBoy.notifications = db.relationship('Notification', back_populates='errand_boy', foreign_keys=[Notification.errand_boy_id])

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    errand_boy_id = db.Column(db.Integer, db.ForeignKey('errand_boy.id'))
    timestamp = db.Column(db.DateTime, index = True, default=datetime.utcnow)

User.messages = db.relationship('Message', back_populates='user', foreign_keys=[Message.user_id])
ErrandBoy.messages = db.relationship('Message', back_populates='errand_boy', foreign_keys=[Message.errand_boy_id])

