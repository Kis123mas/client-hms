import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import './Receptionist.css';
import Docpic from '../../assets/docpic.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PatientsList from '../../components/patientslist/PatientsList';
import DutyModal from '../../components/duty/Duty';

function Receptionist() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDutyModal, setShowDutyModal] = useState(false);

  const crumbs = [
    { label: 'Dashboard' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiologist', image: Docpic, onDuty: true },
    { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrician', image: Docpic, onDuty: false },
    { id: 3, name: 'Dr. Williams', specialty: 'Dermatologist', image: Docpic, onDuty: true },
    { id: 4, name: 'Dr. Brown', specialty: 'Neurologist', image: Docpic, onDuty: true },
    { id: 5, name: 'Dr. Davis', specialty: 'Orthopedist', image: Docpic, onDuty: false },
    { id: 6, name: 'Dr. Miller', specialty: 'Gynecologist', image: Docpic, onDuty: true },
    { id: 7, name: 'Dr. Smith', specialty: 'Cardiologist', image: Docpic, onDuty: true },
    { id: 8, name: 'Dr. Johnson', specialty: 'Pediatrician', image: Docpic, onDuty: false },
    { id: 9, name: 'Dr. Williams', specialty: 'Dermatologist', image: Docpic, onDuty: true },
    { id: 10, name: 'Dr. Brown', specialty: 'Neurologist', image: Docpic, onDuty: true },
    { id: 11, name: 'Dr. Davis', specialty: 'Orthopedist', image: Docpic, onDuty: false },
    { id: 12, name: 'Dr. Miller', specialty: 'Gynecologist', image: Docpic, onDuty: true },
  ];


  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };


  const toggleDutyModal = () => {
    setShowDutyModal(!showDutyModal);
  };


  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      {/* Fixed Header Section */}
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        <div className="receptionist-container">
          <div className="calender-doctors">
            {/* Doctors cards section */}
            <div className="doctors-section">
              <h2 className="section-title" onClick={toggleDutyModal}>
                View All
                <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </h2>
              <div className="doctors-scroll-container">
                <div className="doctors-grid">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-image-container">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="doctor-image"
                        />
                      </div>
                      <div className={`doctor-button ${doctor.onDuty ? 'on-duty' : 'off-duty'}`}>
                        {doctor.onDuty ? 'Available' : 'Unavailable'}
                      </div>
                      <h3 className="doctor-name">{doctor.name}</h3>
                      <p className="doctor-specialty">{doctor.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Calendar section */}
            <div className="calendar-section">

              <div className="calendar-container">
                <Calendar 
                  onChange={setDate}
                  value={date}
                  className="react-calendar"
                />
              </div>
            </div>
          </div>
          <PatientsList />
        </div>
      </div>
      {showDutyModal && <DutyModal onClose={toggleDutyModal} />}
    </MainLayout>
  );
}

export default Receptionist;