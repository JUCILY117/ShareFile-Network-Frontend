import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './css/LandingPage.css';
import HeroImage from '../assets/hero-image.png';
import Auth from '../assets/auth.jpg';
import FileManage from '../assets/file-manage.png';
import SecureShare from '../assets/secure-sharing.jpg';
import EmailNotifs from '../assets/email-notifs.jpg';
import RegisterVerify from '../assets/register-verify.jpg';
import SecureUpload from '../assets/secure-upload.jpg';
import Share from '../assets/share.jpg';
import BillDoors from '../assets/billgates.png';
import Approved from '../assets/approved.png';
import Jamal from '../assets/jamal.png';
import McLovin from '../assets/mclovin.png';
import Dolly from '../assets/dolly.png';
import Perms from '../assets/perms.jpg';
import 'normalize.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

const LandingPage = () => {

  const [selectedSubject, setSelectedSubject] = useState('general');
  
  const handleRadioChange = (event) => {
    setSelectedSubject(event.target.value);
  };


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section:not(.hero)');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };

    const handleInitialLoad = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        section.classList.add('visible');
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleInitialLoad);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleInitialLoad);
    };
  }, []);

  return (
    <div className="landing-page">
      <section className="hero visible">
        <div className="hero-content">
          <h1 style={{ color: '#FFC0CB' }}>Store.</h1>
          <h1 style={{ color: '#9AD7F3' }}>Share.</h1>
          <h1 style={{ color: '#6BDFDA', marginBottom: '0.7em' }}>Collaborate.</h1>
          <p>ShareFile Network makes it easy to share, manage, and secure your files across any device. Collaborate seamlessly and ensure your data is always safe.</p>
          <Link to="/pricing"><button className='explore-now'>Explore Now</button></Link>
        </div>
        <div className="hero-image parallax">
          <img className='hero-img' src={HeroImage} alt="File sharing illustration" />
          <div className='circle'></div>
        </div>
      </section>

      <section className="features">
        <h2>Why <b className='choose'>Choose</b> Us?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <img src={FileManage} alt="Feature 2" />
            <h3>File Management</h3>
            <p>Effortlessly organize and manage your files with ShareFile Network. Our intuitive interface allows you to upload, categorize, and access your documents, images, and videos with ease.</p>
          </div>
          <div className="feature-item">
            <img src={SecureShare} alt="Feature 3" />
            <h3>Secure Sharing</h3>
            <p>Share your files securely with ShareFile Network’s advanced sharing options. Whether you need to share sensitive documents or collaborate on a project, our platform ensures your data is shared safely and only with the intended recipients.</p>
          </div>
          <div className="feature-item">
            <img src={EmailNotifs} alt="Feature 4" />
            <h3>Email Notifications</h3>
            <p>Stay informed with ShareFile Network’s real-time email notifications. Our notification system keeps you updated on important actions and changes, ensuring you never miss a critical update.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="steps">
          <div className="first-step">
            <h1>How It</h1>
            <h1 className='subtitle-works'>WORKS.</h1>
            <div className="step step-medium">
              <img src={RegisterVerify} alt="Step 1" />
              <h3>Register</h3>
              <p>Join the ShareFile Network and gain access to a powerful platform for managing and sharing your files.</p>
            </div>
          </div>
          <div className="second-step">
            <div className="step step-large">
              <img src={SecureUpload} alt="Step 2" />
              <h3>Upload Files</h3>
              <p>Uploading files to ShareFile Network is simple and efficient. Our platform supports a wide range of file types, ensuring you can easily store and manage all your important documents.</p>
            </div>
          </div>
          <div className="third-step">
            <div className="step step-small">
              <img src={Share} alt="Step 3" />
              <h3>Share</h3>
              <p>Sharing files with ShareFile Network is secure and hassle-free.</p>
            </div>
            <div className="step step-small">
              <img src={Perms} alt="Step 4" />
              <h3>Set Permissions</h3>
              <p>Control who can view or edit your files.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="testimonials">
        <h1 className='heading' style={{ color: '#fff' }}>Testi<span style={{ color: '#EFC356' }}>monials</span></h1>
        <div className='left-section'>
          <img src={BillDoors} />
          <p>"<span className='I'>I</span>nnovative and Fresh, Changed my life" <br/><span className='billdoors'>-Bill Doors(Founder, MacroHard)</span></p>
        </div>
        <div className='right-section'>
          <div className='users'>
            <div className="mobile-fix">
            <div className='approved-top'>
              <h1>180K</h1>
              <p>Premium Users</p>
            </div>
            <div className='approved-top'>
              <h1>10M</h1>
              <p>Terabytes Servers</p>
            </div>
            </div>
            <div  className='mobile-awards'>
              <h1>2024</h1>
              <p>Most Innovative Product Award</p>
            </div>
          </div>
          <img className='approved' src={Approved} />
          <div className="reviews">
            <div className="review-left">
              <img src={Jamal} />
              <h2>Damn! This shit so good, be bussin!</h2>
              <p>-Jamal</p>
            </div>
            <div className="review-right">
              <img src={McLovin} />
              <h2>Uh yeah, This helped me a lot! AWOOGA!</h2>
              <p>-McLovin</p>
            </div>
          </div>
        </div>
      </section>

      <div className="view-wrap">
        <div className="contact-top">
        <div className="side"><h1>Contact US.</h1>
          <ul>
            <li id="conlist"><FontAwesomeIcon icon={faPhoneVolume} size="xl"/>&nbsp;&nbsp;&nbsp; 80-981-876-432</li>
            <li id="conlist"><FontAwesomeIcon icon={faEnvelope} size="xl" /> &nbsp;&nbsp;&nbsp;support@sharefilenetwork.in</li>
            <li id="conlist"><FontAwesomeIcon icon={faLocationDot} size="xl" />&nbsp;&nbsp;&nbsp;742 Carter Road, Bandra, Mumbai</li></ul>
          <span><button style={{ borderRadius: "100%", width: "4vh", height: "4vh", textAlign: "center", alignItems: "center", backgroundColor:'#000' }}><FontAwesomeIcon icon={faTwitter} color='#fff' size='xl'/></button><button style={{ borderRadius: "50%", width: "4vh", height: "4vh", backgroundColor: "#fff", color: "white" }}><FontAwesomeIcon icon={faInstagram} color='#000' size='xl'/></button><button style={{ borderRadius: "50%", width: "4vh", height: "4vh", backgroundColor:'#000' }}><FontAwesomeIcon icon={faDiscord} color='#fff' size='lg'/></button></span>
          <div className="circle1"></div>
        </div>
        <div className="circle2"></div>        
        <div className='contact-form'>
          <div className="top-details">
            <div className="left">
              <label>First Name</label>
              <input type="text"></input>
              <label>Email</label>
              <input type="email"></input>
            </div>
            <div className="right">
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
              <button>Send Message</button>
          </div>
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
              <Link to='/privacy' style={{textDecoration:'none'}}><li>Privacy Policy</li></Link>
              <Link to='/terms' style={{textDecoration:'none'}}><li>Terms of use</li></Link>
              <Link to='terms' style={{textDecoration:'none'}}><li>Refund Policy</li></Link>
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
      <p className='reserved'>&copy; 2024 ShareFile Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
