import React from 'react';
import './MainLayout.css';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import PoweredBy from '../components/poweredBy/PoweredBy';

const MainLayout = ({ children, isCollapsed }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Determine userRole based on URL path
  const path = location.pathname;
  const userRole = path.startsWith('/doc') 
    ? 'doctor' 
    : path.startsWith('/rep') 
      ? 'receptionist' 
      : path.startsWith('/pat')
        ? 'patient'
        : 'doctor'; // default to doctor if none match

  const isActive = (path) => {
    return location.pathname === path;
  };

  // const handleLogout = () => {
  //   console.log('Logging out...');
  //   setIsMobileMenuOpen(false);
  // };

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
                  {userRole === 'doctor' 
                    ? 'Doctor Fullname' 
                    : userRole === 'receptionist' 
                      ? 'Receptionist Fullname'
                      : 'Patient Fullname'}
                </h3>
                <p className="profile-role">
                  {userRole.toUpperCase()}
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
          ) : userRole === 'receptionist' ? (
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
          ) : (
            // Patient navigation options
            <>
              <a 
                href="/pat/dashboard" 
                className={`nav-link ${isActive('/pat/patient') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🏠</span> {!isCollapsed && 'Dashboard'}
              </a>
              <a 
                href="/pat/appointments" 
                className={`nav-link ${isActive('/pat/appointments') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📅</span> {!isCollapsed && 'My Appointments'}
              </a>
              <a 
                href="/pat/medicalrecords" 
                className={`nav-link ${isActive('/pat/medicalrecords') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🏥</span> {!isCollapsed && 'Medical Records'}
              </a>
            </>
          )}

          {/* Common options for all users */}
          <div className="common-user-options">
            <a 
              href={`/${userRole.substring(0, 3)}/profile`} 
              className={`nav-link ${isActive(`/${userRole.substring(0, 3)}/profile`) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>👤</span> {!isCollapsed && 'Profile'}
            </a>
            {/* <button 
              className="nav-link"
              onClick={handleLogout}
            >
              <span>🚪</span> {!isCollapsed && 'Logout'}
            </button> */}
          </div>
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
        ) : userRole === 'receptionist' ? (
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
          </>
        ) : (
          // Patient mobile navigation
          <>
            <a 
              href="/pat/patient" 
              className={`mobile-nav-link ${isActive('/pat/patient') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>🏠</span>
              Home
            </a>
            <a 
              href="/pat/appointments" 
              className={`mobile-nav-link ${isActive('/pat/appointments') ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>📅</span>
              Appointments
            </a>
          </>
        )}

        {/* Common mobile options for all users */}
        <a 
          href={`/${userRole.substring(0, 3)}/profile`} 
          className={`mobile-nav-link ${isActive(`/${userRole.substring(0, 3)}/profile`) ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>👤</span>
          Profile
        </a>
        {/* <button 
          className="mobile-nav-link"
          onClick={handleLogout}
        >
          <span>🚪</span>
          Logout
        </button> */}
      </nav>
    </div>
  );
};

export default MainLayout;