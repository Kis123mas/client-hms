import React, { useState, useEffect } from 'react';
import './pages.css';
import Preloader from '../components/preloader/Preloader';
import HospitalLogo from '../assets/logo.svg';

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return <Preloader loadingText="Loading..." />;
  }

  return (
    <div className="landing-page">
      <nav className="main-nav">
        <div className="nav-container">
          {/* <HospitalLogo className="nav-logo" /> */}
          <img src={HospitalLogo} alt="Hospital Logo" className="nav-logo" />
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
          <div className={`auth-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="/register" className="auth-nav-link">Register</a>
            <a href="/login" className="auth-nav-link auth-login-link">Login</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>Hospital Management System</h1>
            <p>Advanced Healthcare Solutions for Modern Institutions</p>
            <div className="hero-buttons">
              <button className="primary-button">Request Demo</button>
              <button className="secondary-button">Learn More</button>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Patient Management</h3>
              <p>Efficiently manage patient records, appointments, and medical history.</p>
            </div>
            <div className="feature-card">
              <h3>Electronic Health Records</h3>
              <p>Digitized patient records accessible to authorized personnel.</p>
            </div>
            <div className="feature-card">
              <h3>Billing & Insurance</h3>
              <p>Automated billing processes with insurance claim integration.</p>
            </div>
            <div className="feature-card">
              <h3>Inventory Control</h3>
              <p>Real-time tracking of medical supplies and equipment.</p>
            </div>
            <div className="feature-card">
              <h3>AI Assistance</h3>
              <p>Leverage AI for smart scheduling, patient triage, and decision support to enhance clinical efficiency.</p>
            </div>
          </div>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <ul className="services-list">
            <li>24/7 System Support</li>
            <li>Custom Module Development</li>
            <li>Staff Training Programs</li>
            <li>Data Migration Assistance</li>
            <li>Regular System Updates</li>
            <li>Compliance Management</li>
          </ul>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            {/* <HospitalLogo className="footer-logo" /> */}
            <img src={HospitalLogo} alt="Hospital Logo" className="footer-logo" />
            <p>Hospital Management System</p>
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>123 Medical Drive</p>
            <p>Healthcare City, HC 12345</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Certified for use in healthcare institutions | HIPAA Compliant</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;