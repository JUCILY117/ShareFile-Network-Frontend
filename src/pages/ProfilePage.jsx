import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Dots from '../assets/dots.png';
import './css/ProfilePage.css';
import NotFoundPage from './NotFoundPage';
import { useProfile } from '../context/ProfileContext';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

const ProfilePage = () => {
  const { user } = useAuth();
  const { profileImage, updateProfileImage } = useProfile();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: profileImage, 
  });
  const [editMode, setEditMode] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        profileImage: user.profileImage || profileImage,
      });
    }
  }, [user, profileImage]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${apiBaseUrl}/api/auth/profile`, userData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      alert('Profile updated successfully');
      setEditMode(false);
    })
    .catch(error => console.error('Error updating profile:', error));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        if (userData.profileImage && userData.profileImage !== profileImage) {
          await axios.delete(`${apiBaseUrl}/api/files/delete-file/${userData.profileImage.split('/').pop()}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
        }

        const response = await axios.post(`${apiBaseUrl}/api/files/upload-profile-image`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        alert('Profile image updated successfully');

        window.location.reload();
        updateProfileImage(response.data.imageUrl);
        setUserData(prevData => ({ ...prevData, profileImage: response.data.imageUrl }));
        setFileInputKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleDeleteProfileImage = async () => {
    if (userData.profileImage === " " || !userData.profileImage || userData.profileImage.trim() === '') {
        alert('User has no profile image uploaded');
        return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete your profile image? This action cannot be undone.');

    if (!isConfirmed) {
        return;
    }

    try {
        const filename = userData.profileImage.split('/').pop();

        await axios.delete(`${apiBaseUrl}/api/files/delete-file/${filename}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        await axios.put(`${apiBaseUrl}/api/auth/profile`, {
            ...userData,
            profileImage: ' '
        }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        window.location.reload();
        updateProfileImage('');
        setUserData(prevData => ({ ...prevData, profileImage: ' ' }));
        alert('Profile image deleted successfully');
    } catch (error) {
        console.error('Error deleting profile image:', error);
        alert('Error deleting profile image');
    }
};

  if (!user) {
    return <NotFoundPage/>;
  }
  

  return (
    <div className="profile-container">
      <div className="profile-left">
        <img src={Dots} className='dots'/>
        <div className="yellow-circle">
            </div>
          <div className="profile-image-container">
            <img 
              src={userData.profileImage} 
              alt="Profile" 
              className="profile-image" 
              onClick={handleImageClick}
            />
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="image-upload"
                ref={fileInputRef}
                key={fileInputKey}
                style={{ display: 'none' }} 
              />
          </div>
        <div className="left-details">
          <h1>{userData.firstName} {userData.lastName}</h1>
          <div className="spotify-login">
          <p>{userData.email}</p>
          </div>
        </div>
        <img src={Dots} className='dots1'/>
      </div>
      <div className="profile-right">
        <h1>Your Profile</h1> 
        <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
          <br />
          {editMode ? (
            <>
              <button type="submit">Update Profile</button>
              <button type="button" className='normal' onClick={() => setEditMode(false)}>Cancel</button>
              <button type="button" className='delete-pfp' onClick={handleDeleteProfileImage}>Delete Profile Image</button>
            </>
          ) : (
            <button type="button" className='normal' onClick={() => setEditMode(true)}>Edit Profile</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
