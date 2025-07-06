import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import { useNavigate } from 'react-router-dom';
import './doctor.css';
import ChatWidget from "../../components/chatwidget/ChatWidget";
import BreadCrums from '../../components/breadcrums/BreadCrums';
import { FiSearch, FiX } from 'react-icons/fi';
import AppointmentCard from '../../components/appointment/AppointmentCard';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';

function Doctor() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();
  
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', time: '09:00 AM', date: 'May 15, 2023', status: 'Confirmed' },
    { id: 2, patientName: 'Jane Smith', time: '10:30 AM', date: 'May 15, 2023', status: 'Confirmed' },
    { id: 3, patientName: 'Robert Johnson', time: '11:15 AM', date: 'May 15, 2023', status: 'Pending' },
    { id: 4, patientName: 'Emily Wilson', time: '01:45 PM', date: 'May 15, 2023', status: 'Confirmed' },
    { id: 5, patientName: 'Michael Brown', time: '02:30 PM', date: 'May 15, 2023', status: 'Cancelled' },
    { id: 6, patientName: 'Sarah Davis', time: '03:00 PM', date: 'May 15, 2023', status: 'Confirmed' },
    { id: 7, patientName: 'David Miller', time: '04:15 PM', date: 'May 15, 2023', status: 'Pending' },
    { id: 8, patientName: 'Lisa Taylor', time: '04:45 PM', date: 'May 15, 2023', status: 'Confirmed' },
    { id: 9, patientName: 'James Wilson', time: '05:30 PM', date: 'May 15, 2023', status: 'Confirmed' },
  ]);

  const crumbs = [
    { label: 'Dashboard' }
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleEMR = (appointmentId) => {
    console.log(`View EMR for appointment ${appointmentId}`);
    navigate(`/doc/patient-emr`);
  };

  const handleCancelClick = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === selectedAppointment
            ? { ...appointment, status: 'Cancelled' }
            : appointment
        )
      );
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const cancelCancel = () => {
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      {/* Fixed Header Section */}
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className={`scrollable-content ${showCancelModal ? 'blur-background' : ''}`}>
        <div className="receptionist-container">
          <div className="header-section">
            <h1 className="page-title">Today's Appointments</h1>
            
            <div className="doctor-search-container">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search patients, time, date or status..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                {searchTerm && (
                  <button onClick={clearSearch} className="clear-search-btn">
                    <FiX />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {filteredAppointments.length === 0 ? (
            <div className="no-results">
              <p>No appointments found yet!</p>
            </div>
          ) : (
            <div className="appointments-grid">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onViewEMR={handleEMR}
                  onCancel={handleCancelClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showCancelModal}
        onConfirm={confirmCancel}
        onCancel={cancelCancel}
        title="Confirm Cancellation"
        message="Are you sure you want to cancel this appointment?"
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
      />
      <ChatWidget />
    </MainLayout>
  );
}

export default Doctor;