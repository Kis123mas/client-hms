import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import { useNavigate } from 'react-router-dom';
import './doctor.css';
import ChatWidget from "../../components/chatwidget/ChatWidget";
import BreadCrums from '../../components/breadcrums/BreadCrums';
import { FiSearch, FiX, FiCalendar, FiClock, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';

// Sample data generator
const generateAppointments = () => {
  const types = ['follow-up', 'new-patient', 'consultation', 'check-up'];
  const statuses = ['confirmed', 'pending', 'cancelled'];
  const today = new Date();
  
  const generateDate = (daysOffset) => {
    const date = new Date(today);
    date.setDate(date.getDate() + daysOffset);
    return date;
  };
  
  return [
    // Past appointments (last 7 days)
    { id: 1, patientName: 'John Doe', time: '09:00', date: generateDate(-3), type: types[0], status: statuses[0], notes: 'Regular checkup' },
    { id: 2, patientName: 'Jane Smith', time: '10:30', date: generateDate(-2), type: types[1], status: statuses[0], notes: 'Initial consultation' },
    { id: 3, patientName: 'Robert Johnson', time: '11:15', date: generateDate(-1), type: types[2], status: statuses[1], notes: 'Follow up on treatment' },
    
    // Today's appointments
    { id: 4, patientName: 'Emily Wilson', time: '09:00', date: today, type: types[3], status: statuses[0], notes: 'Annual physical' },
    { id: 5, patientName: 'Michael Brown', time: '10:30', date: today, type: types[0], status: statuses[1], notes: 'Pain management' },
    { id: 6, patientName: 'Sarah Davis', time: '13:45', date: today, type: types[1], status: statuses[0], notes: 'New patient intake' },
    
    // Upcoming appointments (next 7 days)
    { id: 7, patientName: 'David Miller', time: '14:30', date: generateDate(1), type: types[2], status: statuses[1], notes: 'Test results review' },
    { id: 8, patientName: 'Lisa Taylor', time: '15:15', date: generateDate(2), type: types[3], status: statuses[0], notes: 'Post-op check' },
    { id: 9, patientName: 'James Wilson', time: '16:00', date: generateDate(3), type: types[0], status: statuses[0], notes: 'Medication adjustment' },
    { id: 10, patientName: 'Mary Johnson', time: '09:30', date: generateDate(4), type: types[1], status: statuses[1], notes: 'Consultation' },
    { id: 11, patientName: 'Thomas Lee', time: '11:00', date: generateDate(5), type: types[2], status: statuses[0], notes: 'Follow-up' },
    { id: 12, patientName: 'Jennifer Harris', time: '14:00', date: generateDate(6), type: types[3], status: statuses[0], notes: 'Annual checkup' },
  ];
};

function DoctorAppointments() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  
  const itemsPerPage = 6;
  const crumbs = [{ label: 'Dashboard' }, { label: 'Appointments' }];

  useEffect(() => {
    setAppointments(generateAppointments());
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleEMR = (appointmentId) => {
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
            ? { ...appointment, status: 'cancelled' }
            : appointment
        )
      );
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleAccept = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'confirmed' }
          : appointment
      )
    );
  };

  const cancelCancel = () => {
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isUpcoming = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  // Filter appointments based on active tab and search term
  const filteredAppointments = appointments.filter(appointment => {
    const dateFilter = 
      activeTab === 'today' ? isToday(appointment.date) :
      activeTab === 'upcoming' ? isUpcoming(appointment.date) :
      isPast(appointment.date);
    
    const searchFilter = 
      searchTerm === '' ||
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(appointment.date).toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return dateFilter && searchFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className={`scrollable-content ${showCancelModal ? 'blur-background' : ''}`}>
        <div className="doctor-appointments-container">
          <div className="appointments-header">
            <div className="header-title-section">
              <h1 className="page-title">Appointments</h1>
              <p className="page-subtitle">Manage your patient appointments</p>
            </div>
            
            {/* <div className="search-container">
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
            </div> */}
          </div>
          
          <div className="appointments-filters">
            <div className="tabs-container">
              <button 
                className={`tab ${activeTab === 'passed' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('passed');
                  setCurrentPage(1);
                }}
              >
                <span>Passed</span>
                <span className="badge">
                  {appointments.filter(a => isPast(a.date)).length}
                </span>
              </button>
              <button 
                className={`tab ${activeTab === 'today' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('today');
                  setCurrentPage(1);
                }}
              >
                <span>Today</span>
                <span className="badge">
                  {appointments.filter(a => isToday(a.date)).length}
                </span>
              </button>
              <button 
                className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('upcoming');
                  setCurrentPage(1);
                }}
              >
                <span>Upcoming</span>
                <span className="badge">
                  {appointments.filter(a => isUpcoming(a.date)).length}
                </span>
              </button>
            </div>
          </div>
          
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-image">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>No appointments found</h3>
              <p>There are no {activeTab} appointments matching your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="appointments-grid">
                {paginatedAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className={`appointment-card ${appointment.status === 'pending' ? 'pending' : ''} ${appointment.status === 'cancelled' ? 'cancelled' : ''}`}
                  >
                    <div className="card-header">
                      <div className="patient-info">
                        <FiUser className="icon" />
                        <h3>{appointment.patientName}</h3>
                      </div>
                      <div className={`status-badge ${appointment.status}`}>
                        {appointment.status}
                      </div>
                    </div>
                    
                    <div className="card-details">
                      <div className="detail-row">
                        <FiCalendar className="icon" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="detail-row">
                        <FiClock className="icon" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Type:</span>
                        <span className={`type-badge ${appointment.type.replace('-', ' ')}`}>
                          {appointment.type.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="detail-row notes">
                        <span className="label">Notes:</span>
                        <span>{appointment.notes}</span>
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      {(activeTab === 'today' || activeTab === 'upcoming') && (
                        <>
                          {appointment.status === 'pending' && (
                            <button 
                              className="btn btn-sm btn-success"
                              onClick={() => handleAccept(appointment.id)}
                            >
                              Accept
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleCancelClick(appointment.id)}
                            disabled={appointment.status === 'cancelled'}
                          >
                            {appointment.status === 'cancelled' ? 'Cancelled' : 'Decline'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination-container">
                  <div className="pagination-info">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{' '}
                    {filteredAppointments.length} appointments
                  </div>
                  <div className="pagination-controls">
                    <button 
                      className="pagination-button" 
                      onClick={prevPage} 
                      disabled={currentPage === 1}
                    >
                      <FiChevronLeft /> Previous
                    </button>
                    
                    <div className="page-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`page-number ${page === currentPage ? 'active' : ''}`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      className="pagination-button" 
                      onClick={nextPage} 
                      disabled={currentPage === totalPages}
                    >
                      Next <FiChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </>
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

export default DoctorAppointments;