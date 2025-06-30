import React from 'react';
import './MainLayout.css';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import PoweredBy from '../components/poweredBy/PoweredBy';

const MainLayout = ({ children, isCollapsed }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="side-nav-layout">
      {/* Mobile menu button */}
      {/* <button 
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button> */}

      <aside 
        className={`full-height-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        {!isCollapsed && (
          <div className="profile-section">
            <div className="profile-circle">
              <img
                src={logo}
                alt="User Profile"
                className="profile-image"
              />
            </div>
            {!isCollapsed && (
              <div className="profile-info">
                <h3 className="profile-name">receptionist fullname</h3>
                <p className="profile-role">RECEPTIONIST</p>
              </div>
            )}
          </div>
        )}

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="sidebar-nav">
          <a 
            href="/receptionist" 
            className={`nav-link ${isActive('/receptionist') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>📊</span> {!isCollapsed && 'Dashboard'}
          </a>
          <a 
            href="/registerpatient" 
            className={`nav-link ${isActive('/registerpatient') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>📝</span> {!isCollapsed && 'Register Patient'}
          </a>
          <a 
            href="/bookappointment" 
            className={`nav-link ${isActive('/bookappointment') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>📅</span> {!isCollapsed && 'Book Appointment'}
          </a>
        </nav>

        <div className="sidebar-bottom">
          {!isCollapsed && <PoweredBy />}
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation (only visible on mobile) */}
      <nav className="mobile-bottom-nav">
        <a 
          href="/receptionist" 
          className={`mobile-nav-link ${isActive('/receptionist') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>📊</span>
          Dashboard
        </a>
        <a 
          href="/registerpatient" 
          className={`mobile-nav-link ${isActive('/registerpatient') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>📝</span>
          Register
        </a>
        <a 
          href="/bookappointment" 
          className={`mobile-nav-link ${isActive('/bookappointment') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>📅</span>
          Book
        </a>
      </nav>
    </div>
  );
};

export default MainLayout;