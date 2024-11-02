import React, { useEffect, useState } from 'react';
import { FaUser, FaBirthdayCake, FaRulerVertical, FaSuitcase, FaGraduationCap, FaGlobe, FaMapMarkerAlt, FaMosque, FaHeart, FaLanguage, FaHome, FaUserFriends, FaUsers, FaClipboardList } from 'react-icons/fa';
import './ProfileScreen.css';

function ProfileScreen({ userId, prevStep }) {
    const [profileData, setProfileData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                console.log(`Fetching profile data for userId: ${userId}`);
                const response = await fetch(`http://127.0.0.1:5000/api/profile/${userId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    setErrorMessage('Failed to fetch profile data');
                }
            } catch (error) {
                setErrorMessage('Error connecting to backend');
            }
        };

        if (userId) {
            fetchProfileData();
        } else {
            setErrorMessage('Invalid user ID');
        }
    }, [userId]);

    const calculateAge = (dob) => {
        if (!dob) return "Age not provided";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <button className="back-button" onClick={prevStep}>Back</button>
                <h2 className="profile-title">{profileData.name || "User Profile"}</h2>
                <button className="submit-button">Submit</button>
            </div>
            
            {errorMessage ? (
                <p className="error">{errorMessage}</p>
            ) : (
                <div className="profile-details">
                    {/* Personal Information Section */}
                    <section className="profile-section">
                        <div className="profile-info-group">
                            <div className="profile-item gender">
                                <FaUser className="icon" /> 
                                <span>{profileData.gender}</span>
                            </div>
                            <div className="profile-item dob">
                                <FaBirthdayCake className="icon" /> 
                                <span>{calculateAge(profileData.dob) || "Age not provided"}</span>
                            </div>
                            <div className="profile-item">
                                <FaRulerVertical className="icon" /> 
                                <span>{profileData.height}</span>
                            </div>
                        </div>
                        <div className="profile-item">
                            <FaSuitcase className="icon" /> 
                            <span>{profileData.jobTitle} at {profileData.workplace}</span>
                        </div>
                        <div className="profile-item">
                            <FaGraduationCap className="icon" /> 
                            <span>{profileData.educationLevel} from {profileData.school}</span>
                        </div>
                        <div className="profile-item">
                            <FaGlobe className="icon" /> 
                            <span>{profileData.nationality}</span>
                        </div>
                        <div className="profile-item">
                            <FaMapMarkerAlt className="icon" /> 
                            <span>{profileData.location}</span>
                        </div>
                        <div className="profile-item">
                            <FaMosque className="icon" /> 
                            <span>{profileData.religion}</span>
                        </div>
                        <div className="profile-item">
                            <FaHeart className="icon" /> 
                            <span>{profileData.caste}</span>
                        </div>
                        <div className="profile-item">
                            <FaHeart className="icon" /> 
                            <span>{profileData.maritalStatus}</span>
                        </div>
                        <div className="profile-item">
                            <FaLanguage className="icon" /> 
                            <span>{profileData.languages}</span>
                        </div>
                    </section>

                    {/* Personal Interests Section */}
                    <section className="profile-section">
                        <h3>Personal Interests</h3>
                        <p>{profileData.personalInterests || "No interests specified"}</p>
                    </section>

                    {/* Family Background Section */}
                    <section className="profile-section">
                        <h3>Family Background</h3>
                        <div className="profile-item">
                            <FaHome className="icon" /> 
                            <span>{profileData.familyBackground?.home}</span>
                        </div>
                        <div className="profile-item">
                            <FaUserFriends className="icon" /> 
                            <span>Father: {profileData.familyBackground?.father}</span>
                        </div>
                        <div className="profile-item">
                            <FaUserFriends className="icon" /> 
                            <span>Mother: {profileData.familyBackground?.mother}</span>
                        </div>
                        <div className="profile-item">
                            <FaUsers className="icon" /> 
                            <span>Siblings: {profileData.familyBackground?.siblings}</span>
                        </div>
                    </section>

                    {/* Partner Preferences Section */}
                    <section className="profile-section">
    <h3>Partner Preferences</h3>

    {/* Flex container for age and height */}
    <div className="profile-info-group">
        <div className="profile-item">
            <FaUser className="icon" />
            <span>Age: {profileData.partnerPreferences?.age}</span>
        </div>
        <div className="profile-item">
            <FaRulerVertical className="icon" />
            <span>Height: {profileData.partnerPreferences?.height}</span>
        </div>
    </div>

    {/* Remaining partner preferences, displayed vertically */}
    <div className="profile-item">
        <FaSuitcase className="icon" />
        <span>Work: {profileData.partnerPreferences?.work}</span>
    </div>
    <div className="profile-item">
        <FaGraduationCap className="icon" />
        <span>Education: {profileData.partnerPreferences?.educationLevel}</span>
    </div>
    <div className="profile-item">
        <FaGlobe className="icon" />
        <span>Nationality: {profileData.partnerPreferences?.nationality}</span>
    </div>
    <div className="profile-item">
        <FaMapMarkerAlt className="icon" />
        <span>Hometown: {profileData.partnerPreferences?.hometown}</span>
    </div>
    <div className="profile-item">
        <FaMosque className="icon" />
        <span>Religion: {profileData.partnerPreferences?.religion}</span>
    </div>
    <div className="profile-item">
        <FaHeart className="icon" />
        <span>Caste: {profileData.partnerPreferences?.caste}</span>
    </div>
    <div className="profile-item">
        <FaHeart className="icon" />
        <span>Marital Status: {profileData.partnerPreferences?.maritalStatus}</span>
    </div>
    <div className="profile-item">
        <FaLanguage className="icon" />
        <span>Languages: {profileData.partnerPreferences?.languages}</span>
    </div>
    <div className="profile-item">
        <FaClipboardList className="icon" />
        <span>Additional Requirements: {profileData.partnerPreferences?.additionalRequirements}</span>
    </div>
</section>

                    {/* Additional Requirements Section */}
                    <section className="profile-section">
                        <h3>Additional Requirements</h3>
                        <p>{profileData.partnerPreferences?.additionalRequirements || "No additional requirements"}</p>
                    </section>
                </div>
            )}
        </div>
    );
}

export default ProfileScreen;