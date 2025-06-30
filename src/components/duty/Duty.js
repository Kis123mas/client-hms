import React, { useState } from 'react';
import './Duty.css';
import Docpic from '../../assets/docpic.svg';

const onDutyDoctors = [
  { name: 'Dr. John Doe', number: 1, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Jane Smith', number: 3, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Alex Jones', number: 5, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Clara Adams', number: 3, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Henry Miles', number: 7, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Lily Ray', number: 2, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Mike Taylor', number: 4, time: '5:00AM - 8:00PM' },
  { name: 'Dr. Sarah Connor', number: 6, time: '5:00AM - 8:00PM' },
  { name: 'Dr. David Smith', number: 8, time: '5:00AM - 8:00PM' },
];

const offDutyDoctors = [
  { name: 'Dr. Lily Ray', number: 0, time: '—' },
  { name: 'Dr. Mike Taylor', number: 0, time: '—' },
  { name: 'Dr. Sarah Connor', number: 0, time: '—' },
  { name: 'Dr. David Smith', number: 0, time: '—' },
];

export default function Duty({ onClose }) {
  const [activeTab, setActiveTab] = useState('on');
  const [searchTerm, setSearchTerm] = useState('');



  const doctors = activeTab === 'on' ? onDutyDoctors : offDutyDoctors;

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>

        <h2 className="header">25th May 2025</h2>

        <div className="toggleButtons">
          <button
            className={activeTab === 'on' ? 'activeToggle' : 'inactiveToggle'}
            onClick={() => setActiveTab('on')}
          >
            ON DUTY
          </button>
          <button
            className={activeTab === 'off' ? 'activeToggle' : 'inactiveToggle'}
            onClick={() => setActiveTab('off')}
          >
            OFF
          </button>
        </div>

        <input
          type="text"
          className="searchInput"
          placeholder="Search doctor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="scrollableDoctorList">
          <div className="doctorListWrapper">
            {filteredDoctors.map((doctor, index) => (
              <div className="doctorCard" key={index}>
                <img src={Docpic} alt="doctor" className="doctorImage" />
                <div className="doctorDetails">
                  <div className="doctorName" title={doctor.name}>
                    {doctor.name.length > 5 
                      ? `${doctor.name.substring(0, 15)}...` 
                      : doctor.name}
                  </div>
                  <div className="doctorNumber">
                    { doctor.number}
                  </div>
                  <div className="doctorTime">{doctor.time}</div>
                </div>
              </div>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="noResults">No doctors found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}