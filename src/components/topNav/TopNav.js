import React, { useState } from 'react';
import './TopNav.css';
import logo from '../../assets/logo.png';
import profilePic from '../../assets/profile.png';

const TopNav = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
  };

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <button className="menu-button" onClick={onMenuClick} aria-label="Toggle menu">
          <span className="menu-icon">☰</span>
          <img 
            src={logo} 
            alt="App Logo" 
            className="mobile-logo" 
            style={{
              '--mobile-logo-width': '32px',
              '--mobile-logo-height': '32px'
            }}
          />
        </button>
      </div>

      <div className="top-nav-right">
        <button 
          className="notification-button" 
          onClick={toggleNotifications}
          aria-label="Notifications"
          aria-expanded={showNotifications}
        >
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-container">
          <button 
            className="profile-button"
            onClick={toggleProfileDropdown}
            aria-label="Profile menu"
            aria-expanded={showProfileDropdown}
          >
            <img 
              src={profilePic} 
              alt="Profile" 
              className="profile-picture" 
            />
          </button>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-item">
                <span className="dropdown-icon">👤</span>
                <span>Profile</span>
              </div>
              <div className="profile-dropdown-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>

        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h4>Notifications</h4>
              <button 
                className="close-button"
                onClick={() => setShowNotifications(false)}
                aria-label="Close notifications"
              >
                ×
              </button>
            </div>
            <div className="notification-content">
              <div className="notification-item">New message received</div>
              <div className="notification-item">System update available</div>
              <div className="notification-item">Your profile was viewed</div>
            </div>
            <div className="notification-footer">
              <button className="view-all-button">View All</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;