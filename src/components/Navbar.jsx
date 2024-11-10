import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './css/Navbar.css';
import PromoBanner from './PromoBanner';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { profileImage } = useProfile();
  const isAdmin = user?.userType === 'admin';
  const isLoggedOut = !user || user?.userType === 'user';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <PromoBanner/>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/"><img src="../../logo.png" alt="Logo" /></Link>
        </div>
        <div className={`navbar-middle ${isLoggedOut ? 'increased-middle' : ''}`}>
          {user ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/support">Support</Link>
              <Link to="/about" style={{ width: '4.5em' }}>About Us</Link>
              {isAdmin && (
                <Link to="/admin" className="admin-link">Admin</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/pricing">Pricing</Link>
              <Link to="/support">Support</Link>
              <Link to="/about" style={{ width: '4.5em' }}>About Us</Link>
            </>
          )}
        </div>
        <div className={`navbar-right ${isLoggedOut ? 'increased-right' : ''}`}>
          {user ? (
            <>
              <button onClick={logout} className="logout-button">Logout</button>
              <Link to="/profile">
                <img src={profileImage} className='profile-img' alt="Profile" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/register" className="register-button">Register</Link>
            </>
          )}
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className='nav-menu-icon'/>
        </div>
      </div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <Link to="/home" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/support" onClick={toggleMobileMenu}>Support</Link>
            <Link to="/about" onClick={toggleMobileMenu}>About Us</Link>
            {isAdmin && (
              <Link to="/admin" className="admin-link" onClick={toggleMobileMenu}>Admin</Link>
            )}
            <button onClick={() => { logout(); toggleMobileMenu(); }} className="logout-button">Logout</button>
            <Link to="/profile" onClick={toggleMobileMenu}>
              <img src={profileImage} className='profile-img' alt="Profile" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/pricing" onClick={toggleMobileMenu}>Pricing</Link>
            <Link to="/support" onClick={toggleMobileMenu}>Support</Link>
            <Link to="/about" onClick={toggleMobileMenu}>About Us</Link>
            <Link to="/login" className="login-button" onClick={toggleMobileMenu}>Login</Link>
            <Link to="/register" className="register-button" onClick={toggleMobileMenu}>Register</Link>
          </>
        )}
      </div>
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </nav>
    </>
  );
};

export default Navbar;
