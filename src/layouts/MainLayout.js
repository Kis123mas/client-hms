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
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

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

        <nav className="sidebar-nav">
          <a 
            href="/receptionist" 
            className={`nav-link ${isActive('/receptionist') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>📊</span> {!isCollapsed && 'Dashboard'}
          </a>
          <a 
            href="/register-patient" 
            className={`nav-link ${isActive('/register-patient') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>📝</span> {!isCollapsed && 'Register Patient'}
          </a>
          <a 
            href="/book-appointment" 
            className={`nav-link ${isActive('/book-appointment') ? 'active' : ''}`}
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
    </div>
  );
};

export default MainLayout;