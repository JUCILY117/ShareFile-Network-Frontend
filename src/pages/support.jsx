// src/components/ui/AuroraBackground.jsx
import React, {useEffect, useState} from 'react';
import './css/support.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

const AuroraBackground = () => {
  const [selectedSubject, setSelectedSubject] = useState('general');
  
  const handleRadioChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  return (
    <div className="view-wrap1">
        <div className="contact-top1">
        <div className="side"><h1>Contact US.</h1>
          <ul>
            <li id="conlist"><FontAwesomeIcon icon={faPhoneVolume} size="xl"/>&nbsp;&nbsp;&nbsp; 80-981-876-432</li>
            <li id="conlist"><FontAwesomeIcon icon={faEnvelope} size="xl" /> &nbsp;&nbsp;&nbsp;support@sharefilenetwork.in</li>
            <li id="conlist"><FontAwesomeIcon icon={faLocationDot} size="xl" />&nbsp;&nbsp;&nbsp;742 Carter Road, Bandra, Mumbai</li></ul>
          <span><button style={{ borderRadius: "100%", width: "4vh", height: "4vh", textAlign: "center", alignItems: "center", backgroundColor:'#000' }}><FontAwesomeIcon icon={faTwitter} color='#fff' size='xl'/></button><button style={{ borderRadius: "50%", width: "4vh", height: "4vh", backgroundColor: "#fff", color: "white" }}><FontAwesomeIcon icon={faInstagram} color='#000' size='xl'/></button><button style={{ borderRadius: "50%", width: "4vh", height: "4vh", backgroundColor:'#000' }}><FontAwesomeIcon icon={faDiscord} color='#fff' size='lg'/></button></span>
          <div className="circle1"></div>
        </div>
        <div className="circle3"></div>     
        <div className='contact-form'>
          <div className="top-details">
            <div className="left-support">
              <label>First Name</label>
              <input type="text"></input>
              <label>Email</label>
              <input type="email"></input>
            </div>
            <div className="right-support">
              <label>Last Name</label>
              <input type="text"></input>
              <label>Phone Number</label>
              <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"></input>
            </div>
          </div>
          <div className="middle-contact">
            <h3>Select Subject?</h3>
            <div className="contact-radio">
              <input
                type="radio"
                id="general"
                name="subject"
                value="general"
                checked={selectedSubject === 'general'}
                onChange={handleRadioChange}
              />
              <label htmlFor="general">General Inquiry</label>
              
              <input
                type="radio"
                id="tech"
                name="subject"
                value="tech"
                checked={selectedSubject === 'tech'}
                onChange={handleRadioChange}
                className='radio-fix'
              />
              <label htmlFor="tech">Tech Support</label>
              
              <input
                type="radio"
                id="review"
                name="subject"
                value="review"
                checked={selectedSubject === 'review'}
                onChange={handleRadioChange}
                className='radio-fix'
              />
              <label htmlFor="review">Submit Review</label>
              
              <input
                type="radio"
                id="business"
                name="subject"
                value="business"
                checked={selectedSubject === 'business'}
                onChange={handleRadioChange}
                className='radio-fix'
              />
              <label htmlFor="business">Business Proposal</label>
            </div>
          </div>
          <div className="bottom-contact">
            <h4>Message</h4>
            <textarea placeholder='Write your message here..'></textarea>
          </div>
        </div>
        </div>
        <footer>
        <div className="footer-div">
          <div className="reachus foot">
            <h2>Reach Us</h2>
            <ul className='ul-fix'>
              <li id="conlist"><FontAwesomeIcon icon={faPhoneVolume} size="xl"/>&nbsp;&nbsp;&nbsp; 80-981-876-432</li>
              <li id="conlist"><FontAwesomeIcon icon={faEnvelope} size="xl" /> &nbsp;&nbsp;&nbsp;support@sharefilenetwork.in</li>
              <li id="conlist"><FontAwesomeIcon icon={faLocationDot} size="xl" />&nbsp;&nbsp;&nbsp;742 Carter Road, Bandra, Mumbai</li>
            </ul>
          </div>
          <div className="company foot">
            <h2>Company</h2>
            <ul className='ul-fix'>
              <li>About</li>
              <li>Contact</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div className="legal foot">
            <h2>Legal</h2>
            <ul className='ul-fix'>
              <li>Privacy Policy</li>
              <li>Terms and Services</li>
              <li>Terms of use</li>
              <li>Refund Policy</li>
            </ul>
          </div>
          <div className="links foot">
            <h2>Quick Links</h2>
            <ul className='ul-fix'>
              <li>Home</li>
              <li>Support</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="newsletter foot" >
            <h2>Join Our Newsletter</h2>
            <div className="news-input">
            <input type="text" placeholder="Your email address" />
            <button>Subscribe</button>
            </div>
            <p>* We will send you weekly updates on your email.</p>

          </div>
        </div>
      </footer>
      </div>
      
  );
};

export default AuroraBackground;
