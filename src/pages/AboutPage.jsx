import React, { useEffect, useState, useRef, useContext } from 'react';
import './css/AboutPage.css';
import Square from '../assets/squarestar.png';
import Star from '../assets/star.png';
import Round from '../assets/round.png';
import Lisa from '../assets/jonathan.png';
import Akshit from '../assets/akshit.avif';
import Killer from '../assets/killer.png';
import Clouds from '../assets/clouds.png';
import Boba from '../assets/boba.png';
import Music from '../assets/awaken.mp3';
import Joseph from '../assets/joseph.png';
import Mona from '../assets/mona.png';
import Hand from '../assets/hand.png';
import Anmol from '../assets/anmol-hero.png';
import Cards from '../assets/cards.png';
import Jotaro from '../assets/jotaro1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../context/AuthContext';

const AboutPage = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const cardRefs = useRef([]);
  const { user } = useAuth();
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
        setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);


useEffect(() => {
  cardRefs.current.forEach((ref, index) => {
      const cardTop = ref.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (ref && cardTop < windowHeight * 0.8) {
          ref.classList.add('show');
      } else {
          ref.classList.remove('show');
      }
  });
}, [scrollPos]);


  return (
    <div className="card-slider">
      <audio ref={audioRef} src={Music} autoPlay />
      <div className={`card ${scrollPos >= 0 ? 'show' : ''}`}>
        <div className="about-us">
        <h1>Work through our</h1>
        <h1>world with us</h1>
        <p>Welcome to ShareFile Network, your premier solution for secure and efficient file sharing and management. Our mission is to empower users with a robust platform that simplifies file storage, sharing, and collaboration while maintaining the highest standards of security and user experience.</p>
        <button className='mute' onClick={toggleMute} >{isMuted ? <FontAwesomeIcon icon={faVolumeMute} size='xl'style={{color:'#fff'}}/> : <FontAwesomeIcon icon={faVolumeUp} size='xl'style={{color:'#fff'}}/>} </button>
        </div>
      </div>
      <div className="card" ref={(el) => cardRefs.current[1] = el}>
        <div className="akshit">
            <div className="left-akshit">
                <h1>Akshit Sharma</h1>
                <h4>Contributions: None</h4>
                <h4>About:</h4>
                <img src={Mona} className='mona'/>
                <img src={Hand} className='hand'/>
                <p>My name is Akshit Sharma. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I would lose to anyone.</p>
                <button className='mute' onClick={toggleMute} >{isMuted ? <FontAwesomeIcon icon={faVolumeMute} size='xl'style={{color:'#fff'}}/> : <FontAwesomeIcon icon={faVolumeUp} size='xl'style={{color:'#fff'}}/>} </button>
            </div>
            <div className="right-akshit">
              <img src={Clouds} className='clouds'/>
              <img src={Killer} className='killer'/>
                <img src={Akshit} className='akshit-img'/>
            </div>
        </div>
      </div>
      <div className="card" ref={(el) => cardRefs.current[2] = el}>
        <div className="aniket-sinha">
        <div className="left-sinha">
            <h1>Aniket <br/>Sinha</h1>
            <hr/>
            <h3>Contributions: Around 2 ChatGPT Searches</h3>
            <h2>"They Call Me 007"</h2>
            <div className="sinha-divs">
                <div className="sinha">
                <FontAwesomeIcon icon={faMusic} style={{color:'#d1d1d1', marginBottom:'0.8em'}}/>
                <h4>0</h4>
                <p>Bitches.</p>
                </div>
                <div className="sinha">
                <FontAwesomeIcon icon={faMusic} style={{color:'#d1d1d1', marginBottom:'0.8em'}}/>
                <h4>0</h4>
                <p>hours of work done.</p>
                </div>
                <div className="sinha">
                <FontAwesomeIcon icon={faMusic} style={{color:'#d1d1d1', marginBottom:'0.8em'}}/>
                <h4>7</h4>
                <p>courses of meal a day.</p>
                </div>
            </div>
            <button className='mute' onClick={toggleMute} >{isMuted ? <FontAwesomeIcon icon={faVolumeMute} size='xl'style={{color:'#fff'}}/> : <FontAwesomeIcon icon={faVolumeUp} size='xl'style={{color:'#fff'}}/>} </button>
        </div>
        <div className="right-sinha">
            <img src={Square} className='square'/>
            <img src={Lisa} className='lisa'/>
            <img src={Round} className='round'/>
            <img src={Star} className='star'/>
        </div>
        </div>      
      </div>
      <div className="card" ref={(el) => cardRefs.current[3] = el}>
        <div className="anmol">
          <div className="top-section">
            <div className="left-anmol">
              <h1>Anmol</h1>
              <p>"Damn! Why this app so sexy" -☝️🤓</p>
              <h4>Contribution: UI/UX Design, App Content, a little Frontend</h4>
              <button className='mute' onClick={toggleMute} >{isMuted ? <FontAwesomeIcon icon={faVolumeMute} size='xl'style={{color:'#fff'}}/> : <FontAwesomeIcon icon={faVolumeUp} size='xl'style={{color:'#fff'}}/>} </button>
            </div>
            <div className="right-anmol">
              <img src={Boba} className='boba'/>
              <img src={Joseph} className='joseph'/>
              <img src={Anmol} className='anmol-hero'/>
            </div>
          </div>
          <div className="bottom-section">
            <div className="anmol-divs">
              <div className="anmol-div">
                <h3>56</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="anmol-div">
                <h3>56</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card" ref={(el) => cardRefs.current[4] = el}>
        <div className="aniket">
          <div className="left-aniket">
            <img src={Cards} className='cards'/>
            <img src={Jotaro} className='jotaro'/>
          </div>
          <div className="right-aniket">
            <div className="aniket-circle"></div>
            <div className="aniket-content">
              <div className="top-aniket">
            <h1>Aayu</h1>
            <h3>Contribution: </h3>
            <p>Frontend, Backend & Created and managed RESTful APIs</p>
            <button className='aniket-button' onClick={toggleMute} >{isMuted ? <FontAwesomeIcon icon={faVolumeMute} size='xl'style={{color:'#000'}}/> : <FontAwesomeIcon icon={faVolumeUp} size='xl'style={{color:'#000'}}/>} </button>
            <a href='https://github.com/JUCILY117' target='_blank'><FontAwesomeIcon icon={faGithub} size='2xl' color='#242424' className='menu-icons'/></a>
              </div>
              <div className="bottom-aniket">
                <div className="aayu-divs">
                  <div className="aayu-div">
                    <h4>4.9</h4>
                    <hr/>
                    <p>Lorem ipsum dolor amet</p>
                  </div>
                  <div className="aayu-div">
                    <h4>870K</h4>
                    <hr/>
                    <p>Lorem ipsum dolor amet</p>
                  </div>
                  <div className="aayu-div">
                    <h4>No. 1</h4>
                    <hr/>
                    <p>Lorem ipsum dolor amet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user && user.userType === 'user' && (
        <div className={`card ${scrollPos >= 3000 ? 'show' : ''}`}>
          <div className="extension">
          <h1>Feeling like a god?</h1>
           <h1>Want to work with us?</h1>
          <button onClick={() => window.location.href = '/request-admin-access'}>
            Request Admin Access
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
