import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaSearch,
  FaPlus
} from 'react-icons/fa';
import './appointment.css';

function AppointmentPat() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('book');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const crumbs = [
    { label: 'Dashboard'},
  ];

  // Sample data - in a real app this would come from API
  useEffect(() => {
    // Sample doctors list
    const sampleDoctors = [
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Medicine' },
      { id: 2, name: 'Dr. Michael Brown', specialty: 'Cardiology' },
      { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics' }
    ];
    setDoctors(sampleDoctors);

    // Sample appointment history
    const sampleAppointments = [
      { 
        id: 1, 
        date: '2023-07-15', 
        time: '10:00 AM', 
        doctor: 'Dr. Sarah Johnson', 
        reason: 'Medication Review',
        status: 'Approved' 
      },
      { 
        id: 2, 
        date: '2023-07-10', 
        time: '02:30 PM', 
        doctor: 'Dr. Michael Brown', 
        reason: 'Prescription Refill',
        status: 'Declined' 
      },
      { 
        id: 3, 
        date: '2023-07-05', 
        time: '09:15 AM', 
        doctor: 'Dr. Emily Davis', 
        reason: 'Vaccination Consultation',
        status: 'Pending' 
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedDoctor || !reason) return;
    
    // In a real app, this would call an API
    const newAppointment = {
      id: appointments.length + 1,
      date: selectedDate,
      time: selectedTime,
      doctor: doctors.find(d => d.id === parseInt(selectedDoctor)).name,
      reason,
      status: 'Pending'
    };
    
    setAppointments([newAppointment, ...appointments]);
    alert('Appointment requested successfully!');
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDoctor('');
    setReason('');
  };

  const filteredAppointments = appointments.filter(appt => 
    appt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved':
        return <FaCheckCircle className="status-icon approved" />;
      case 'Declined':
        return <FaTimesCircle className="status-icon declined" />;
      default:
        return <FaHourglassHalf className="status-icon pending" />;
    }
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 16; hour++) {
    timeSlots.push(`${hour}:00 AM`);
    if (hour < 12) timeSlots.push(`${hour}:30 AM`);
    else if (hour < 16) {
      const pmHour = hour === 12 ? 12 : hour - 12;
      timeSlots.push(`${pmHour}:00 PM`);
      timeSlots.push(`${pmHour}:30 PM`);
    }
  }

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className='scrollable-content'>

      <div className="appointment-page-container">
        <div className="appointment-tabs">
          <button 
            className={`tab-btn ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            <FaPlus /> Book Appointment
          </button>
          <button 
            className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
            onClick={() => setActiveTab('status')}
          >
            <FaSearch /> View Status
          </button>
        </div>

        {activeTab === 'book' && (
          <div className="book-appointment-container">
            <h2>Schedule a New Appointment</h2>
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label>
                  <FaCalendarAlt /> Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaClock /> Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <FaUserMd /> Select Doctor
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Reason for Appointment</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe the reason for your appointment"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Request Appointment
              </button>
            </form>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="appointment-status-container">
            <div className="status-header">
              <h2>Your Appointment Status</h2>
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="no-appointments">
                <p>No appointments found</p>
              </div>
            ) : (
              <div className="appointment-list">
                {filteredAppointments.map(appt => (
                  <div key={appt.id} className="appointment-card">
                    <div className="appointment-info">
                      <div className="appointment-date">
                        <h3>{appt.date}</h3>
                        <p>{appt.time}</p>
                      </div>
                      <div className="appointment-details">
                        <h3>{appt.doctor}</h3>
                        <p>{appt.reason}</p>
                      </div>
                      <div className="appointment-status">
                        {getStatusIcon(appt.status)}
                        <span className={`status-text ${appt.status.toLowerCase()}`}>
                          {appt.status}
                        </span>
                      </div>
                    </div>
                    {appt.status === 'Approved' && (
                      <div className="appointment-actions">
                        <button className="action-btn">
                          Reschedule
                        </button>
                        <button className="action-btn cancel-btn">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </MainLayout>
  );
}

export default AppointmentPat;