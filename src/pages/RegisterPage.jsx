import React, { useState } from 'react';
import axios from 'axios';
import './css/RegisterPage.css';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill out all fields');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    axios.post(`${apiBaseUrl}/api/auth/register`, userData)
      .then(response => {
        console.log('Registration successful:', response.data);
        alert('Registration successful! Please check your email for verification.');
        window.location.href = '/login';
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('User already exists with this email.');
        } else {
          console.error('Registration error:', error);
          alert('An error occurred during registration. Please try again.');
        }
      });
  };

  return (
    <div className="register-page">
        <h1>Register to ShareFile</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label>First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Your First Name'
              required
              className='name-input'
            />
          </label>
        </div>
        <div>
          <label>Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Your Last Name'
              required
              className='name-input'
            />
          </label>
        </div>
        <div>
          <label>Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your Email'
              required
            />
          </label>
        </div>
        <div className="password-container">
          <label>Password:</label>
          <div className="password-input-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              required
            />
            <i
              className={`password-toggle-icon fas fa-eye${passwordVisible ? '-slash' : ''}`}
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></i>
          </div>
        </div>
        <div className='checkbox'>
          <input type='checkbox' required='true'/>
          <label>I agree to the Terms & Privacy Policy</label>
        </div>
        <button type="submit">Sign Up</button>
        <p><a href='/login'>Already registered?</a></p>
      </form>
    </div>
  );
}

export default RegisterPage;
