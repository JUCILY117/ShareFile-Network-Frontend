import React from 'react';
import './css/Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>
        At <b>ShareFile Network</b>, we strive to provide excellent service. If you are not satisfied with our service, please review our refund and cancellation policy.
        </p>
       
        
        <h2>Cancellation Policy:</h2>
        <ul className='terms-list'>
            <li>You may cancel your subscription at any time. Upon cancellation, your account will remain active until the end of the current billing cycle.</li>
            <li>We reserve the right to terminate accounts that violate our terms and conditions.</li>
        </ul>
        
        <h2>Refund Policy:</h2>
        <ul className="terms-list">
          <li>If you cancel within the first 14 days of your subscription, you may be eligible for a full refund.</li>
          <li>Refunds will be processed within 5-7 business days after the request is approved and will be credited back to the original payment method.</li>
        </ul>
        
        <h2>No Refunds for Partial Use:</h2>
        <ul className='terms-list'>
            <li>Refunds are not provided for partial use of services or for the remaining period of a canceled subscription.</li>
        </ul>
        
        <h2>How to Request a Refund:</h2>
        <p>
        To request a refund, please contact us at <b>support@sharefilenetwork.in</b> with your account details and the reason for the refund request.</p>
        
        <h2>Contact Us:</h2>
        <p>
        If you have any questions about our refund and cancellation policy, please contact us at <b>support@sharefilenetwork.in</b>
        </p>
      </div>
    </div>
  );
};

export default Terms;
