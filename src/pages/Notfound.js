import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css'; // We'll create this CSS file

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="error-details">
          The requested URL was not found on this server.
        </p>
        <button 
          className="return-button"
          onClick={() => navigate('/receptionist')}
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default NotFound;