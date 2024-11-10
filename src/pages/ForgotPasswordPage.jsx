import React, { useState } from 'react';
import axios from 'axios';
import './css/ForgotPasswordPage.css';

const apiBaseUrl = import.meta.env.VITE_BASE_API;

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }

    axios.post(`${apiBaseUrl}/api/auth/forgot-password`, { email })
      .then(response => {
        console.log('Reset password email sent:', response.data);
        alert('Password reset link has been sent to your email.');
      })
      .catch(error => {
        if (error.response) {
          console.error('Error:', error.response.data.msg);
          alert(error.response.data.msg);
        } else {
          console.error('Error:', error);
          alert('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className="reset-password-page">
        <h1>Reset Password</h1>
      <form className="reset-password-form" onSubmit={handleResetPassword}>
        <div>
          <label>Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Type your email here..'
            />
          </label>
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
