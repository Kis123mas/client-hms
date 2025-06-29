import MainLayout from '../../layouts/MainLayout';
import React, { useState, useRef, useEffect } from 'react';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import SuccessModal from '../../components/successModal/Success';
import Staticbutton from '../../components/button/Staticbutton';
import './Receptionist.css';
import { useNavigate } from 'react-router-dom';

function BookAppointment() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        doctor: '',
        patient: '',
        description: ''
    });
    const [doctorSearch, setDoctorSearch] = useState('');
    const [patientSearch, setPatientSearch] = useState('');
    const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
    const [showPatientDropdown, setShowPatientDropdown] = useState(false);
    const doctorDropdownRef = useRef(null);
    const patientDropdownRef = useRef(null);

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setShowSuccessModal(true);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    // Sample data
    const doctors = [
        { id: '1', name: 'Dr. Smith (Cardiology)' },
        { id: '2', name: 'Dr. Johnson (Pediatrics)' },
        { id: '3', name: 'Dr. Williams (Neurology)' },
        { id: '4', name: 'Dr. Brown (Orthopedics)' },
        { id: '5', name: 'Dr. Davis (Dermatology)' }
    ];

    const patients = [
        { id: '101', name: 'John Doe (ID: 101)' },
        { id: '102', name: 'Jane Smith (ID: 102)' },
        { id: '103', name: 'Robert Johnson (ID: 103)' },
        { id: '104', name: 'Emily Williams (ID: 104)' },
        { id: '105', name: 'Michael Brown (ID: 105)' }
    ];

    const crumbs = [
        { label: 'Receptionist', path: '/receptionist' },
        { label: 'Book Appointment' }
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (doctorDropdownRef.current && !doctorDropdownRef.current.contains(event.target)) {
                setShowDoctorDropdown(false);
            }
            if (patientDropdownRef.current && !patientDropdownRef.current.contains(event.target)) {
                setShowPatientDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log('Appointment booked:', bookingData);
        setShowSuccessModal(true);

        // Redirect after 1020ms
        setTimeout(() => {
            navigate('/receptionist');
        }, 1020);
    };

    const handleCancel = () => {
        setBookingData({
            doctor: '',
            patient: '',
            description: ''
        });
        setDoctorSearch('');
        setPatientSearch('');
    };

    const selectDoctor = (doctor) => {
        setBookingData(prev => ({ ...prev, doctor: doctor.id }));
        setShowDoctorDropdown(false);
    };

    const selectPatient = (patient) => {
        setBookingData(prev => ({ ...prev, patient: patient.id }));
        setShowPatientDropdown(false);
    };

    const getSelectedDoctorName = () => doctors.find(d => d.id === bookingData.doctor)?.name || 'Select a doctor';
    const getSelectedPatientName = () => patients.find(p => p.id === bookingData.patient)?.name || 'Select a patient';

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(doctorSearch.toLowerCase())
    );

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(patientSearch.toLowerCase())
    );

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>
            <div className="scrollable-content">
                <div className="receptionist-container">
                    <div className="booking-form">
                        <div className="booking-header">
                            <h2>Appointment Booking Form</h2>
                            <p className="booking-subtitle">Complete all required fields (*)</p>
                        </div>

                        <form onSubmit={handleBookingSubmit}>
                            {/* Section 1: Doctor Selection */}
                            <div className="booking-section">
                                <div className="section-header">
                                    <div className="section-number">1</div>
                                    <div className="section-title">Doctor Information</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="booking-field" ref={doctorDropdownRef}>
                                    <label>Select Doctor <span className="required">*</span></label>
                                    <div
                                        className="booking-dropdown-select"
                                        onClick={() => {
                                            setShowDoctorDropdown(!showDoctorDropdown);
                                            setShowPatientDropdown(false);
                                        }}
                                    >
                                        {getSelectedDoctorName()}
                                        <span className="dropdown-arrow">▼</span>
                                    </div>
                                    {showDoctorDropdown && (
                                        <div className="booking-dropdown-modal">
                                            <div className="booking-search">
                                                <input
                                                    type="text"
                                                    placeholder="Search doctors..."
                                                    value={doctorSearch}
                                                    onChange={(e) => setDoctorSearch(e.target.value)}
                                                    autoFocus
                                                    className="booking-input"
                                                />
                                            </div>
                                            <div className="booking-options">
                                                {filteredDoctors.length > 0 ? (
                                                    filteredDoctors.map(doctor => (
                                                        <div
                                                            key={doctor.id}
                                                            className={`booking-option ${bookingData.doctor === doctor.id ? 'selected' : ''}`}
                                                            onClick={() => selectDoctor(doctor)}
                                                        >
                                                            {doctor.name}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="booking-option no-results">
                                                        No matching doctors found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 2: Patient Selection */}
                            <div className="booking-section">
                                <div className="section-header">
                                    <div className="section-number">2</div>
                                    <div className="section-title">Patient Information</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="booking-field" ref={patientDropdownRef}>
                                    <label>Select Patient <span className="required">*</span></label>
                                    <div
                                        className="booking-dropdown-select"
                                        onClick={() => {
                                            setShowPatientDropdown(!showPatientDropdown);
                                            setShowDoctorDropdown(false);
                                        }}
                                    >
                                        {getSelectedPatientName()}
                                        <span className="dropdown-arrow">▼</span>
                                    </div>
                                    {showPatientDropdown && (
                                        <div className="booking-dropdown-modal">
                                            <div className="booking-search">
                                                <input
                                                    type="text"
                                                    placeholder="Search patients..."
                                                    value={patientSearch}
                                                    onChange={(e) => setPatientSearch(e.target.value)}
                                                    autoFocus
                                                    className="booking-input"
                                                />
                                            </div>
                                            <div className="booking-options">
                                                {filteredPatients.length > 0 ? (
                                                    filteredPatients.map(patient => (
                                                        <div
                                                            key={patient.id}
                                                            className={`booking-option ${bookingData.patient === patient.id ? 'selected' : ''}`}
                                                            onClick={() => selectPatient(patient)}
                                                        >
                                                            {patient.name}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="booking-option no-results">
                                                        No matching patients found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 3: Appointment Details */}
                            <div className="booking-section">
                                <div className="section-header">
                                    <div className="section-number">3</div>
                                    <div className="section-title">Appointment Details</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="booking-field">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={bookingData.description}
                                        onChange={(e) => setBookingData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Enter appointment reason or notes..."
                                        className="booking-input"
                                        rows="4"
                                    />
                                </div>
                            </div>

                            <div className="booking-footer">
                                <div className="booking-declaration">
                                    <p><strong>Declaration:</strong> I confirm the accuracy of this booking information.</p>
                                </div>
                                <div className="booking-actions">
                                    <div className="button-group">
                                        <Staticbutton
                                            children="CANCEL"
                                            type="button"
                                            onClick={handleCancel}
                                        />
                                        <Staticbutton
                                            children="BOOK APPOINTMENT"
                                            type="submit"
                                            onClick={handleRegisterClick}
                                        />
                                    </div>
                                </div>
                                <div className="booking-timestamp">
                                    <p>Booking initiated: {new Date().toLocaleString()}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    message="Appointment booked successfully!"
                    onClose={closeSuccessModal}
                />
            )}
        </MainLayout>
    );
}

export default BookAppointment;