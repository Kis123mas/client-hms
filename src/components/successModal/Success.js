import React from 'react';
import './success.css';

function SuccessModal({ message = "Operation completed successfully!", onClose }) {
  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="modal-header">
          <button className="close-icon" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <svg className="success-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8l-9,9z" />
          </svg>
          <h3 className="modal-title">Success!</h3>
        </div>
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;