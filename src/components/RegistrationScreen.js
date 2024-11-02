import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationScreen.css';

function RegistrationScreen({ setUserId, prevStep, nextStep }) {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        height: '',
        workplace: '',
        jobTitle: '',
        school: '',
        educationLevel: '',
        nationality: '',
        location: '',
        religion: '',
        caste: '',
        maritalStatus: '',
        languages: '',
        personalInterests: '',   // Personal Interests field// Additional Requirements field
        familyBackground: {
            home: '',
            father: '',
            mother: '',
            siblings: '',
            sisters: '',
            brothers: ''
        },
        partnerPreferences: {
            age: '',
            height: '',
            work: '',
            educationLevel: '',
            nationality: '',
            hometown: '',
            religion: '',
            caste: '',
            maritalStatus: '',
            languages: '',
            additionalRequirements: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNestedChange = (section, name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.user_id) {
                    setUserId(data.user_id);
                    nextStep();
                } else {
                    console.error('No user_id returned in response');
                    alert('Registration failed, no user ID returned');
                }
            } else {
                const errorData = await response.json();
                console.error('Registration failed with message:', errorData.error);
                alert(`Registration failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error connecting to backend:', error);
            alert('Error connecting to backend');
        }
    };

    return (
        <div className="registration-container">
            <div className="form-header">
                <button className="back-button" onClick={prevStep}>Back</button>
                <h2 className="form-title">Your Profile</h2>
                <button type="button" className="next-button" onClick={handleSubmit}>Next</button>
            </div>
            <form onSubmit={handleSubmit} className="registration-form">
                {/* Input fields with handleChange or handleNestedChange */}
                {/* Example field */}
                <div className="form-row">
                    <span className="form-label">Name</span>
                    <input
                        type="text"
                        name="name"
                        className="form-value"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Gender</span>
                    <input
                        type="text"
                        name="gender"
                        className="form-value"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Date of Birth</span>
                    <input
                        type="date"
                        name="dob"
                        className="form-value"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Height</span>
                    <input
                        type="text"
                        name="height"
                        className="form-value"
                        value={formData.height}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Workplace</span>
                    <input
                        type="text"
                        name="workplace"
                        className="form-value"
                        value={formData.workplace}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Job Title</span>
                    <input
                        type="text"
                        name="jobTitle"
                        className="form-value"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">School</span>
                    <input
                        type="text"
                        name="school"
                        className="form-value"
                        value={formData.school}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Education Level</span>
                    <input
                        type="text"
                        name="educationLevel"
                        className="form-value"
                        value={formData.educationLevel}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Nationality</span>
                    <input
                        type="text"
                        name="nationality"
                        className="form-value"
                        value={formData.nationality}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Location</span>
                    <input
                        type="text"
                        name="location"
                        className="form-value"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Religion</span>
                    <input
                        type="text"
                        name="religion"
                        className="form-value"
                        value={formData.religion}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Caste</span>
                    <input
                        type="text"
                        name="caste"
                        className="form-value"
                        value={formData.caste}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Marital Status</span>
                    <input
                        type="text"
                        name="maritalStatus"
                        className="form-value"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Languages</span>
                    <input
                        type="text"
                        name="languages"
                        className="form-value"
                        value={formData.languages}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-row">
                    <span className="form-label">Personal Interests</span>
                    <input
                        type="text"
                        name="personalInterests"
                        className="form-value"
                        value={formData.personalInterests}
                        onChange={handleChange}
                    />
                </div>

                {/* Family Background */}
                <h3>Family Background</h3>
                <div className="form-row">
                    <span className="form-label">Home</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.familyBackground.home}
                        onChange={(e) => handleNestedChange('familyBackground', 'home', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Father</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.familyBackground.father}
                        onChange={(e) => handleNestedChange('familyBackground', 'father', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Mother</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.familyBackground.mother}
                        onChange={(e) => handleNestedChange('familyBackground', 'mother', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Siblings</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.familyBackground.siblings}
                        onChange={(e) => handleNestedChange('familyBackground', 'siblings', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Sisters</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.familyBackground.sisters}
                        onChange={(e) => handleNestedChange('familyBackground', 'sisters', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Brothers</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.familyBackground.brothers}
                        onChange={(e) => handleNestedChange('familyBackground', 'brothers', e.target.value)}
                    />
                </div>

                {/* Partner Preferences */}
                <h3>Partner Preferences</h3>
                <div className="form-row">
                    <span className="form-label">Age</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.age}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'age', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Height</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.height}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'height', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Work</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.work}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'work', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Education Level</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.educationLevel}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'educationLevel', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Nationality</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.nationality}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'nationality', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Hometown</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.hometown}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'hometown', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Religion</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.religion}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'religion', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Caste</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.caste}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'caste', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Marital Status</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.maritalStatus}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'maritalStatus', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Languages</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.languages}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'languages', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <span className="form-label">Additional Requirements</span>
                    <input
                        type="text"
                        className="form-value"
                        value={formData.partnerPreferences.additionalRequirements}
                        onChange={(e) => handleNestedChange('partnerPreferences', 'additionalRequirements', e.target.value)}
                    />
                </div>
                </form>
        </div>
    );
}

export default RegistrationScreen;