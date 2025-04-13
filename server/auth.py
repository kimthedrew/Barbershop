from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from config import app, db, bcrypt
from models import Client, Barber  # or your user model

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not name or not username or not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    if Client.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = Client(name=name, email=email, phone=phone, username=username, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Client.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token), 200

    return jsonify({"msg": "Invalid credentials"}), 401

# @app.route('/barber/signup', methods=['POST'])
# def barber_signup():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')
#     name = data.get('name')  # assuming barbers also have a name
#     phone = data.get('phone')
#     specialty = data.get('specialty')

#     if Barber.query.filter_by(email=email).first():
#         return jsonify({"msg": "Email already registered"}), 400

#     hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
#     new_barber = Barber(email=email, name=name, phone=phone, specialty=specialty, password=hashed_pw)
#     db.session.add(new_barber)
#     db.session.commit()

#     return jsonify({"msg": "Barber created successfully"}), 201

# @app.route('/barber/login', methods=['POST'])
# def barber_login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     barber = Barber.query.filter_by(email=email).first()
#     if barber and bcrypt.check_password_hash(barber.password, password):
#         token = create_access_token(identity=barber.id)
#         return jsonify(access_token=token), 200

#     return jsonify({"msg": "Invalid credentials"}), 401

