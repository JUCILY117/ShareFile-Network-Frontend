import React from 'react';
import './css/PricingPage.css';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <div className="pricing">
      <div className="pricing-heading">
        <h1>Cho<span className='cool-style'>ose</span></h1>
        <h1>the<span className='cool-style'> plan</span></h1>
        <h1>th<span className='cool-style'>at</span></h1>
        <h1>su<span className='cool-style'>its</span></h1>
        <h2 className='you'>YOU</h2>
      </div>
      <div className="pricing-plans">
        <div className='plan-container'>
        <div className="plan free-plan">
          <h2>Free Plan</h2>
          <p>₹ 0/yr</p>
          <ul>
            <li>For individuals</li>
            <li>Download & Upload speeds upto 2 Mbps</li>
            <li>5 GB free storage</li>
            <li>Works on all devices</li>
          </ul>
          <Link to="/register"><button className='free-button'>Sign Up for Free</button></Link>
        </div>
        </div>
        <div className="plan-container" style={{backgroundColor:'#2f2f2f'}}>
        <div className="plan premium-plan">
          <h2>Premium Plan</h2>
          <p>₹ 1299/yr</p>
          <ul>
            <li>Sharable Files</li>
            <li>No cap on download speed</li>
            <li>Works on all devices</li>
            <li>Organizational Features</li>
          </ul>
          <button className='premium-button'>Upgrade to Premium</button>
        </div>
        </div>
      </div>

      <div className="donation-section">
        <div className="donation-heading">
        <h2>Support Us with a Donation</h2>
        </div>
        <form>
          <div className="form-pricing">
            <label>Name: </label>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-pricing">
            <label>Email: </label>
            <input type="email" placeholder="Your Email" required />
          </div>
          <button type="submit">Donate</button>
        </form>
      </div>
    </div>
  );
};

export default PricingPage;
