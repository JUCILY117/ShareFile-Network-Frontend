import React, { useState } from 'react';
import axios from 'axios';
import './css/LoginPage.css';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill out all fields');
      return;
    }

    const loginData = {
      email,
      password,
    };

    axios
      .post(`${apiBaseUrl}/api/auth/login`, loginData)
      .then((response) => {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        const userType = response.data.userType;

        // Send the auth token to Website B (e.g., website2.netlify.app)
        const authToken = response.data.token;

        // This is the critical change: sending the token to Website B
        window.postMessage(
          { type: 'auth', authToken: authToken },
          'http://localhost:5173'  // Replace with Website B's production URL
        );

        if (userType === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/home';
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error('Login error:', error.response.data.msg);
          alert(error.response.data.msg);
        } else {
          console.error('Login error:', error);
          alert('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className="login-page">
      <h1>Login to ShareFile</h1>
      <form className="login-form" onSubmit={handleLogin}>
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
        <div className='checkbox-container'>
          <input type='checkbox' className='checkbox'/>
          <label>Remember Me</label>
        </div>
        <button type="submit">Log In</button>
        <p>Forgot Password? <a href="forgot-password">Reset It</a></p>
        <p><a href="/register">Don't have an account?</a></p>
      </form>
    </div>
  );
}

export default LoginPage;
