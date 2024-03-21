from datetime import datetime, time
from models import User,db,ErrandBoy,Category,Availability,Message,Notification,Task,Payment,Rating,Role,History
from flask_bcrypt import Bcrypt
from app import app

bcrypt = Bcrypt(app)

with app.app_context():
    session = db.session

    # Create some users
    user_data = [
        {'username': 'user1', 'email': 'user1@example.com', 'password': bcrypt.generate_password_hash('password1').decode('utf-8'), 'location': 'Location1', 'profile_picture': '1', 'phone_number': '1234567890'},
        {'username': 'user2', 'email': 'user2@example.com', 'password': bcrypt.generate_password_hash('password2').decode('utf-8'), 'location': 'Location2', 'profile_picture': '2', 'phone_number': '0987654321'},
    ]

    for data in user_data:
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            user = User(**data)
            db.session.add(user)

    # Create some errand boys
    errand_boy_data = [
        {'username': 'errandboy1', 'email': 'errandboy1@example.com', 'password': bcrypt.generate_password_hash('password1').decode('utf-8'), 'location': 'Location1', 'profile_picture': '3', 'phone_number': '1234567890'},
        {'username': 'errandboy2', 'email': 'errandboy2@example.com', 'password': bcrypt.generate_password_hash('password2').decode('utf-8'), 'location': 'Location2', 'profile_picture': '4', 'phone_number': '0987654321'},
    ]

    for data in errand_boy_data:
        errand_boy = ErrandBoy.query.filter_by(username=data['username']).first()
        if not errand_boy:
            errand_boy = ErrandBoy(**data)
            db.session.add(errand_boy)

    # Create some categories
    category_names = ['Grocery Shopping', 'House Cleaning']

    for name in category_names:
        category = Category.query.filter_by(name=name).first()
        if not category:
            category = Category(name=name)
            db.session.add(category)


    # Create some tasks
    tasks = [
        Task(description='Buy groceries', location='Supermarket', status='pending', user_id=1, errand_boy_id=1, category_id=1, estimated_time=3600),
        Task(description='Clean the house', location='Home', status='pending', user_id=2, errand_boy_id=2, category_id=2, estimated_time=7200),
    ]

    # Create some payments
    payments = [
        Payment(amount=100.0, status='pending', user_id=1, errand_boy_id=1, task_id=1, payment_method='credit_card'),
        Payment(amount=200.0, status='pending', user_id=2, errand_boy_id=2, task_id=2, payment_method='debit_card'),
    ]

    # Create some ratings
    ratings = [
        Rating(rating=4.5, review='Great job!', user_id=1, errand_boy_id=1),
        Rating(rating=4.0, review='Good job!', user_id=2, errand_boy_id=2),
    ]

    # Create some availabilities
    availabilities = [
        Availability(start_time=time(9, 0), end_time=time(17, 0), errand_boy_id=1),
        Availability(start_time=time(10, 0), end_time=time(18, 0), errand_boy_id=2),
    ]

    # Create some notifications
    notifications = [
        Notification(message='Your task has been accepted.', user_id=1, errand_boy_id=1),
        Notification(message='Your task has been completed.', user_id=2, errand_boy_id=2),
    ]

    # Create some messages
    messages = [
        Message(message='I have accepted your task.', user_id=1, errand_boy_id=1),
        Message(message='I have completed your task.', user_id=2, errand_boy_id=2),
        Message(message='Thank you for using our service.', user_id=4, errand_boy_id=1),
    ]

    # Create some roles
    role_names = ['User', 'ErrandBoy']

    for name in role_names:
        role = Role.query.filter_by(name=name).first()
        if not role:
            role = Role(name=name)
            db.session.add(role)

    # Create some history
    histories = [
        History(task_id=1, errand_boy_id=1, payment_id=1, rating_id=1, category_id=1),
        History(task_id=2, errand_boy_id=2, payment_id=2, rating_id=2, category_id=2),
    ]

    # Add the users, errand boys, categories, tasks, payments, ratings, availabilities, notifications, messages, roles, and histories to the session

    for task in tasks:
        db.session.add(task)

    for payment in payments:
        db.session.add(payment)

    for rating in ratings:
        db.session.add(rating)

    for availability in availabilities:
        db.session.add(availability)

    for notification in notifications:
        db.session.add(notification)

    for message in messages:
        db.session.add(message)

    for history in histories:
        db.session.add(history)

    # Commit the session to save the objects to the database
    db.session.commit()

    # Print a success message
    print("The database has been seeded successfully.")
