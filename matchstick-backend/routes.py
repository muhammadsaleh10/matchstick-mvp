from flask import Blueprint, request, jsonify
from models import insert_user, get_user_by_id

app_routes = Blueprint('app_routes', __name__)

@app_routes.route('/register', methods=['POST'])
def register_user():
    user_data = request.json
    try:
        user_id = insert_user(user_data)
        return jsonify({'message': 'User registered successfully!', 'user_id': user_id}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while registering the user'}), 500

@app_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = get_user_by_id(user_id)
    if user:
        if user['languages']:
            user['languages'] = user['languages'].split(',')
        return jsonify(user)
    else:
        return jsonify({'error': 'User not found'}), 404