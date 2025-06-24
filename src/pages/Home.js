import React, { useState, useEffect } from 'react';
import './pages.css';
import hospitalLogo from '../assets/logo.png';
import LandingPageImage from '../assets/dashboardd.png';
import Staticbutton from '../components/button/Staticbutton';
import Preloader from '../components/preloader/Preloader';
import PoweredBy from '../components/poweredBy/PoweredBy';

function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
      // Trigger fade-in effect after preloader finishes
      setTimeout(() => setFadeIn(true), 100);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader loadingText="Loading Hospital System..." />;
  }

  return (
    <div className={`home-container ${fadeIn ? 'fade-in' : ''}`}>
      <div className="left-panel">
        <div className="logo-container slide-in-left">
          <img src={hospitalLogo} alt="Hospital Logo" className="logo" />
        </div>
        
        <div className="left-content">
          <div className="left-header slide-in-bottom">
            <h1>Modern Hospital Management Made Easy!</h1>
            <div className="divider-line expand-width"></div>
          </div>

          <div className="left-para slide-in-bottom">
            <p>
              Manage patients, appointments, staff and more—all in one place. 
              <span className="ai-feature"> Assisted by AI-driven insights for smarter healthcare decisions.</span>
            </p>
          </div>

          <div className="slide-in-bottom">
            <Staticbutton href='/login' />
          </div>
        </div>

        <PoweredBy />
      </div>

      <div className="right-panel zoom-in">
        <div className="image-container">
          <img 
            src={LandingPageImage} 
            alt="Hospital Dashboard" 
            className="dashboard-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;