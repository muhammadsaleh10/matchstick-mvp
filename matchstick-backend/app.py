from flask import Flask, jsonify, request
from flask_cors import CORS
from db import mysql
from models import create_users_table, insert_user, get_user_by_id

app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Matrimoney1@'
app.config['MYSQL_DB'] = 'matchstick_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql.init_app(app)

# Create users table if it doesn't exist
with app.app_context():
    create_users_table()

@app.route('/api/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        data['familyBackground'] = data.get("familyBackground", {
            "home": "", "father": "", "mother": "", "siblings": "", "sisters": "", "brothers": ""
        })
        data['partnerPreferences'] = data.get("partnerPreferences", {
            "age": "", "height": "", "work": "", "educationLevel": "", "nationality": "", 
            "hometown": "", "religion": "", "caste": "", "maritalStatus": "", "languages": "", 
            "additionalRequirements": ""
        })
        user_id = insert_user(data)
        return jsonify({"message": "User registered successfully!", "user_id": user_id}), 201
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    try:
        user = get_user_by_id(user_id)
        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        print(f"An error occurred while fetching user profile: {e}")
        return jsonify({"error": "An error occurred while retrieving the profile"}), 500

if __name__ == '__main__':
    app.run(debug=True)