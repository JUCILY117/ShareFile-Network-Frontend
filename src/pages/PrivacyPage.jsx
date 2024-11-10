import React from 'react';
import './css/Terms.css';

const Privacy = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Privacy Policy</h1>
        <p>
        At <b>ShareFile Network</b>, we are committed to protecting your privacy. This policy outlines how we collect, use, and protect your personal information.        </p>
        <h2>Information we collect:</h2>
        <ul className='terms-list'>
          <li><b>Personal Information:</b> When you register, we collect information such as your name, email address, and payment details.</li>
          <li><b>Usage Data:</b>We may collect data on how you use our services, including interactions with our website.</li>
        </ul>
        
        <h2>How We Use Your Information:</h2>
        <ul className='terms-list'>
          <li><b>Service Provision: </b> We use your information to provide, operate, and maintain our services.</li>
          <li><b>Communication: </b>We may use your email address to send important updates, such as changes to terms or service outages.</li>
          <li><b>Security: </b>We implement strong encryption to protect your data from unauthorized access.</li>
        </ul>
        
        <h2>Data Security</h2>
        <p>All user data is stored using high-level encryption, ensuring that your information remains confidential and secure.</p>
        
        <h2>Third-Party Services:</h2>
        <p>
        We do not share your personal information with third parties, except when required by law or necessary to provide our services.
        </p>
        
        <h2>Your Rights:</h2>
        <p>
        You have the right to access, modify, or delete your personal information at any time. Please contact us if you wish to exercise these rights.
        </p>
        
        <h2>Changes to This Policy:</h2>
        <p>
        We may update this privacy policy from time to time. Any changes will be posted on this page.
        </p>
        <h2>Contact Us</h2>
        <p>
        If you have any questions about these terms, please contact us at <b>support@sharefilenetwork.in</b>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
