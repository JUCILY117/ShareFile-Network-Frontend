import React, { useState, useEffect } from 'react';
import './css/PromoBanner.css';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div 
      className={`promo-banner ${isVisible ? 'visible' : 'hidden'}`} 
    >
      <p className="banner-text">
        Introducing <strong className='teams-text'>TeamsFile Network</strong> — Our newest addition to your workspace.
      </p>
      <a href="https://teamsfilenetwork.netlify.app" target="_blank" className="cta-button">Explore Now</a>
    </div>
  );
};

export default PromoBanner;
