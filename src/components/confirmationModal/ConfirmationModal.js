// components/confirmationModal/ConfirmationModal.js
import React from 'react';
import { FiAlertTriangle, FiX, FiCheck } from 'react-icons/fi';
import './ConfirmationModal.css';

const ConfirmationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon: Icon = FiAlertTriangle,
  iconColor = "#f44336",
  dangerMode = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        {Icon && (
          <div className="modal-icon" style={{ color: dangerMode ? '#e53e3e' : iconColor }}>
            <Icon size={40} />
          </div>
        )}
        <div className="modal-content">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-message">{message}</p>
          <p className="modal-warning">This action cannot be undone.</p>
        </div>
        <div className="modal-buttons">
          <button className="btn btn-cancel" onClick={onCancel}>
            <FiX className="btn-icon" />
            {cancelText}
          </button>
          <button className={`btn ${dangerMode ? 'btn-danger' : 'btn-confirm'}`} onClick={onConfirm}>
            <FiCheck className="btn-icon" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;