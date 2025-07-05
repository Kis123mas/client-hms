// components/appointmentCard/AppointmentCard.js
import React from 'react';
import './Appointmentcard.css'; // You might want to create this for card-specific styles

const AppointmentCard = ({ appointment, onViewEMR, onCancel }) => {
  return (
    <div key={appointment.id} className={`appointment-card ${appointment.status.toLowerCase()}`}>
      <div className="card-header">
        <h3 className="patient-name">{appointment.patientName}</h3>
      </div>
      
      <div className="appointment-details">
        <div className="detail-row">
          <span className="detail-label">Time:</span>
          <span className="detail-value">{appointment.time}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{appointment.date}</span>
        </div>
      </div>
      
      <div className="card-actions">
        <button 
          className="btn-emr"
          onClick={() => onViewEMR(appointment.id)}
        >
          EMR
        </button>
        <button 
          className="btn-cancel"
          onClick={() => onCancel(appointment.id)}
          disabled={appointment.status === 'Cancelled'}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;