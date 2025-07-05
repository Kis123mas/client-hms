import React from 'react';
import './MainLayout.css';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import PoweredBy from '../components/poweredBy/PoweredBy';

const MainLayout = ({ children, isCollapsed }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Determine userRole based on URL path
  const path = location.pathname;
  const userRole = path.startsWith('/doc') ? 'doctor' : path.startsWith('/rep') ? 'receptionist' : 'doctor'; // default to doctor if neither

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="side-nav-layout">
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
                <h3 className="profile-name">
                  {userRole === 'doctor' ? 'Doctor Fullname' : 'Receptionist Fullname'}
                </h3>
                <p className="profile-role">
                  {userRole === 'doctor' ? 'DOCTOR' : 'RECEPTIONIST'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="sidebar-nav">
          {userRole === 'doctor' ? (
            <>
              <a 
                href="/doc/doctor" 
                className={`nav-link ${isActive('/doc/doctor') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📊</span> {!isCollapsed && 'Dashboard'}
              </a>
              <a 
                href="/doc/patient" 
                className={`nav-link ${isActive('/doc/patient') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>👨‍⚕️</span> {!isCollapsed && 'Patients'}
              </a>
            </>
          ) : (
            <>
              <a 
                href="/rep/receptionist" 
                className={`nav-link ${isActive('/rep/receptionist') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📊</span> {!isCollapsed && 'Dashboard'}
              </a>
              <a 
                href="/rep/registerpatient" 
                className={`nav-link ${isActive('/rep/registerpatient') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📝</span> {!isCollapsed && 'Register Patient'}
              </a>
              <a 
                href="/rep/bookappointment" 
                className={`nav-link ${isActive('/rep/bookappointment') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📅</span> {!isCollapsed && 'Book Appointment'}
              </a>
            </>
          )}
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
        {userRole === 'doctor' ? (
          <>
            <a 
              href="/doc/doctor" 
              className={`mobile-nav-link ${isActive('/doc/doctor') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>📊</span>
              Dashboard
            </a>
            <a 
              href="/doc/patient" 
              className={`mobile-nav-link ${isActive('/doc/patient') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>👨‍⚕️</span>
              Patients
            </a>
          </>
        ) : (
          <>
            <a 
              href="/rep/receptionist" 
              className={`mobile-nav-link ${isActive('/rep/receptionist') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>📊</span>
              Dashboard
            </a>
            <a 
              href="/rep/registerpatient" 
              className={`mobile-nav-link ${isActive('/rep/registerpatient') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>📝</span>
              Register
            </a>
            <a 
              href="/rep/bookappointment" 
              className={`mobile-nav-link ${isActive('/rep/bookappointment') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>📅</span>
              Book
            </a>
          </>
        )}
      </nav>
    </div>
  );
};

export default MainLayout;