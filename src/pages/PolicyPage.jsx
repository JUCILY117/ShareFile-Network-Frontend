import React from 'react';
import './css/Terms.css';

const PolicyPage = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Refund and Cancellation Policy</h1>
        <p>
        Welcome to <b>ShareFile Network</b>. These terms and conditions outline the rules and regulations for the use of our website and services.
        </p>
        <p>
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use <b>ShareFile Network</b> if you do not agree to all the terms and conditions stated on this page.
        </p>
        
        <h2>Services</h2>
        <p>
          <b>ShareFile Network</b> offers cloud storage services where users can securely store and manage their data. All data stored is encrypted and secured.
        </p>
        
        <h2>User Responsibilities</h2>
        <ul className="terms-list">
          <li>Users must provide accurate and up-to-date information during registration.</li>
          <li>Users are responsible for maintaining the confidentiality of their account information.</li>
          <li>Any misuse of the service, including illegal activities or the distribution of harmful content, is strictly prohibited.</li>
        </ul>
        
        <h2>Account Suspension and Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms.
        </p>
        
        <h2>Liability</h2>
        <p>
          While we strive to provide uninterrupted service, <b>ShareFile Network</b> is not liable for any damages or loss of data caused by unforeseen circumstances.
        </p>
        
        <h2>Changes to Terms</h2>
        <p>
          We may update these terms from time to time, and any changes will be posted on this page.
        </p>
        <h2>Contact Us</h2>
        <p>
        If you have any questions about these terms, please contact us at <b>support@sharefilenetwork.in</b>
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;
