from db import mysql
from datetime import datetime

# Function to create the users table if it doesn't exist
def create_users_table():
    cursor = mysql.connection.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255),
                        gender VARCHAR(50),
                        dob DATE,
                        height VARCHAR(50),
                        workplace VARCHAR(255),
                        job_title VARCHAR(255),
                        school VARCHAR(255),
                        education_level VARCHAR(255),
                        nationality VARCHAR(255),
                        location VARCHAR(255),
                        religion VARCHAR(255),
                        caste VARCHAR(255),
                        marital_status VARCHAR(255),
                        languages VARCHAR(255),
                        personal_interests VARCHAR(255),
                        home VARCHAR(255),
                        father VARCHAR(255),
                        mother VARCHAR(255),
                        siblings VARCHAR(255),
                        sisters VARCHAR(255),
                        brothers VARCHAR(255),
                        partner_age VARCHAR(50),
                        partner_height VARCHAR(50),
                        partner_work VARCHAR(255),
                        partner_education_level VARCHAR(255),
                        partner_nationality VARCHAR(255),
                        partner_hometown VARCHAR(255),
                        partner_religion VARCHAR(255),
                        partner_caste VARCHAR(255),
                        partner_marital_status VARCHAR(255),
                        partner_languages VARCHAR(255),
                        partner_additional_requirements VARCHAR(255)
                    )''')
    cursor.close()

def insert_user(user_data):
    cursor = mysql.connection.cursor()
    query = '''INSERT INTO users 
               (name, gender, dob, height, workplace, job_title, school, education_level, nationality, location, religion, caste, marital_status, languages, personal_interests, home, father, mother, siblings, sisters, brothers, partner_age, partner_height, partner_work, partner_education_level, partner_nationality, partner_hometown, partner_religion, partner_caste, partner_marital_status, partner_languages, partner_additional_requirements) 
               VALUES 
               (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

    # Process and validate the `dob` field
    dob = user_data.get('dob', '')
    if dob:
        try:
            dob = datetime.strptime(dob, '%Y-%m-%d').strftime('%Y-%m-%d')
        except ValueError:
            dob = None  # Set to None if the date is invalid

    # Values for the SQL query
    values = (
        user_data.get('name', ''), 
        user_data.get('gender', ''), 
        dob,  # Pass dob as a string formatted to YYYY-MM-DD or None
        user_data.get('height', ''), 
        user_data.get('workplace', ''), 
        user_data.get('jobTitle', ''), 
        user_data.get('school', ''), 
        user_data.get('educationLevel', ''), 
        user_data.get('nationality', ''), 
        user_data.get('location', ''), 
        user_data.get('religion', ''), 
        user_data.get('caste', ''), 
        user_data.get('maritalStatus', ''), 
        user_data.get('languages', ''), 
        user_data.get('personalInterests', ''), 
        user_data['familyBackground'].get('home', ''), 
        user_data['familyBackground'].get('father', ''), 
        user_data['familyBackground'].get('mother', ''), 
        user_data['familyBackground'].get('siblings', ''), 
        user_data['familyBackground'].get('sisters', ''), 
        user_data['familyBackground'].get('brothers', ''), 
        user_data['partnerPreferences'].get('age', ''), 
        user_data['partnerPreferences'].get('height', ''), 
        user_data['partnerPreferences'].get('work', ''), 
        user_data['partnerPreferences'].get('educationLevel', ''), 
        user_data['partnerPreferences'].get('nationality', ''), 
        user_data['partnerPreferences'].get('hometown', ''), 
        user_data['partnerPreferences'].get('religion', ''), 
        user_data['partnerPreferences'].get('caste', ''), 
        user_data['partnerPreferences'].get('maritalStatus', ''), 
        user_data['partnerPreferences'].get('languages', ''),
        user_data['partnerPreferences'].get('additionalRequirements', '')
    )

    # Ensure that `len(values)` matches the number of `%s` in `query`
    if len(values) != query.count('%s'):
        raise ValueError("Number of placeholders does not match number of values")

    cursor.execute(query, values)
    mysql.connection.commit()
    user_id = cursor.lastrowid
    cursor.close()
    return user_id
# Function to retrieve a user from the database by ID
def get_user_by_id(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
    user = cursor.fetchone()
    cursor.close()

    if user:
        # Ensure that family background and partner preferences are structured correctly
        user['familyBackground'] = {
            "home": user.pop("home", ""),
            "father": user.pop("father", ""),
            "mother": user.pop("mother", ""),
            "siblings": user.pop("siblings", ""),
            "sisters": user.pop("sisters", ""),
            "brothers": user.pop("brothers", "")
        }
        user['partnerPreferences'] = {
            "age": user.pop("partner_age", ""),
            "height": user.pop("partner_height", ""),
            "work": user.pop("partner_work", ""),
            "educationLevel": user.pop("partner_education_level", ""),
            "nationality": user.pop("partner_nationality", ""),
            "hometown": user.pop("partner_hometown", ""),
            "religion": user.pop("partner_religion", ""),
            "caste": user.pop("partner_caste", ""),
            "maritalStatus": user.pop("partner_marital_status", ""),
            "languages": user.pop("partner_languages", ""),
            "additionalRequirements": user.pop("partner_additional_requirements", "")
        }
        user['personalInterests'] = user.get("personal_interests", "")
    return user