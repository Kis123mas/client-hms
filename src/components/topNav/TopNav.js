import React from 'react';
import './TopNav.css';
import logo from '../../assets/logo.png'; // Make sure this path is correct

const TopNav = ({ onMenuClick }) => {
    return (
        <header className="top-nav">
            <div className="top-nav-left">
                <button className="menu-button" onClick={onMenuClick} aria-label="Toggle menu">
                    {/* Default hamburger icon (hidden on mobile) */}
                    <span className="menu-icon">☰</span>
                    
                    {/* Logo image (hidden on desktop) */}
                    <img 
                        src={logo} 
                        alt="App Logo" 
                        className="mobile-logo" 
                        style={{
                            '--mobile-logo-width': '32px',  // Default size - override in your CSS
                            '--mobile-logo-height': '32px'  // Default size - override in your CSS
                        }}
                    />
                </button>
            </div>
        </header>
    );
};

export default TopNav;