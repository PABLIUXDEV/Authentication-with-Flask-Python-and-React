"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Create flask app
api = Blueprint('api', __name__)

CORS(api)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if user_exist is None:
        return jsonify({"msg": "User not found"}), 404
    
    if email != user_exist.email or password != user_exist.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exist = User.query.filter_by(email=email).first()
    if user_exist:
        return jsonify({"msg": "User found"}), 400
    
    new_user = User(
        email = email,
        password = password,
        is_active = True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User was created"}), 201


    
@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    dictionary = {
        "message": "hello world"
    }

    return jsonify(dictionary)
