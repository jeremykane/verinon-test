import sys
from flask import Blueprint, jsonify, request

# Imports the Google Cloud client library
from google.cloud import datastore

# Instantiates a client for datastore
client = datastore.Client()

# Kind of the entity
kind = 'Users'

account_api = Blueprint('account_api', __name__)

@account_api.route('/get-users', methods=['GET'])
def getAllUsers():
    query = client.query(kind='Users')
    users = list(query.fetch())

    if len(users) > 0:
        return jsonify(users), 200
    return jsonify({}), 404

    # return jsonify({}), 200

@account_api.route("/signup", methods=['POST'])
def registerAccount():
    id = request.get_json()['id']
    password = request.get_json()['password']
    name = request.get_json()['name']

    # Setup the key for the entity
    key = client.key('Users', id)
    user = client.get(key)
    if user:
        return jsonify({}), 404
    user = datastore.Entity(key=key)
   

    # Insert all user account data into the Entity
    user['id'] = id
    user['password'] = password
    user['name'] = name

    user.update(user)
    
    client.put(user)

    # Insert newly created entity into datastore
    return jsonify({}), 200

@account_api.route("/login", methods=['POST'])
def authentication():
    id = request.get_json()['username']
    password = request.get_json()['password']

    # Key
    key = client.key('Users', id)
    user = client.get(key)

    if user:
        if user['password'] == password:
            return jsonify({}), 200 

    return jsonify({}), 404