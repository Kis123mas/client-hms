import React from 'react';
import './TopNav.css';

const TopNav = ({ onMenuClick }) => {


    return (
        <header className="top-nav">
            <div className="top-nav-left">
                <button className="menu-button" onClick={onMenuClick} aria-label="Toggle menu">
                    <span className="menu-icon">☰</span>
                </button>
            </div>


        </header>
    );
};

export default TopNav;