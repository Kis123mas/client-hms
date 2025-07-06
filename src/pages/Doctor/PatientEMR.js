import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import ChatWidget from "../../components/chatwidget/ChatWidget";
import { useNavigate } from 'react-router-dom';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import { 
  FiPrinter, 
  FiArrowLeft, 
  FiAlertCircle,
  FiPieChart, 
  FiUser, 
  FiActivity,
  FiDroplet,
  FiCalendar,
  FiPocket,
  FiHeart,
  FiClipboard,
  FiBarChart2,
  FiFilePlus,
  FiPlusCircle,
  FiHome,
  FiX,
  FiEye,
  FiShoppingCart,
  FiVolume2,
  FiActivity as FiTest
} from 'react-icons/fi';
import './emr.css';

function PatientEMR() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showAdmitModal, setShowAdmitModal] = useState(false);
    const [showReferModal, setShowReferModal] = useState(false);
    const [admissionDetails, setAdmissionDetails] = useState({
        ward: '',
        room: '',
        bed: ''
    });
    const [referralDetails, setReferralDetails] = useState({
        department: '',
        description: '',
        reason: ''
    });
    const navigate = useNavigate();

    // Departments available for referral
    const departments = [
        { value: 'pharmacy', label: 'Pharmacy', icon: <FiShoppingCart /> },
        { value: 'eye', label: 'Eye Clinic', icon: <FiEye /> },
        { value: 'ear', label: 'Ear/Nose', icon: <FiVolume2 /> },
        { value: 'lab', label: 'Laboratory Tests', icon: <FiTest /> },
        { value: 'radiology', label: 'Radiology', icon: <FiActivity /> },
        { value: 'cardiology', label: 'Cardiology', icon: <FiHeart /> }
    ];

    // Sample ward data with rooms and beds
    const wards = [
        {
            name: 'Cardiology',
            rooms: [
                { number: '301', beds: ['A', 'B', 'C'] },
                { number: '302', beds: ['A', 'B'] },
                { number: '303', beds: ['A'] }
            ]
        },
        {
            name: 'General Medicine',
            rooms: [
                { number: '401', beds: ['A', 'B', 'C'] },
                { number: '402', beds: ['A', 'B'] },
                { number: '403', beds: ['A'] }
            ]
        },
        {
            name: 'Pediatrics',
            rooms: [
                { number: '501', beds: ['A', 'B'] },
                { number: '502', beds: ['A'] }
            ]
        }
    ];

    const crumbs = [
        { label: 'Dashboard', path: '/' },
        // { label: 'Patients', path: '/' },
    ];

    // Sample patient data with admission status
    const [patient, setPatient] = useState({
        id: 'PAT-789456',
        name: 'John Doe',
        age: 42,
        gender: 'Male',
        dob: '1980-05-15',
        bloodType: 'A+',
        allergies: ['Penicillin', 'Peanuts'],
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        lastVisit: '2023-06-15',
        nextAppointment: '2023-08-20',
        isAdmitted: false,
        admissionDate: null,
        ward: null,
        room: null,
        bed: null
    });

    // Sample medical history
    const medicalHistory = [
        {
            date: '2023-06-15',
            provider: 'Dr. Sarah Johnson',
            diagnosis: 'Hypertension follow-up',
            treatment: 'Adjusted medication dosage',
            notes: 'Patient reports better BP control with current regimen'
        },
        {
            date: '2023-03-10',
            provider: 'Dr. Michael Chen',
            diagnosis: 'Type 2 Diabetes checkup',
            treatment: 'Metformin 500mg twice daily',
            notes: 'HbA1c levels improved to 6.2%'
        },
        {
            date: '2022-11-05',
            provider: 'Dr. Sarah Johnson',
            diagnosis: 'Annual physical',
            treatment: 'Lab tests ordered',
            notes: 'Patient in generally good health'
        }
    ];

    // Sample prescriptions
    const prescriptions = [
        {
            medication: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            prescribed: '2023-01-10',
            expires: '2023-12-31',
            provider: 'Dr. Sarah Johnson'
        },
        {
            medication: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice daily',
            prescribed: '2022-09-15',
            expires: '2023-09-15',
            provider: 'Dr. Michael Chen'
        },
        {
            medication: 'Atorvastatin',
            dosage: '20mg',
            frequency: 'Once at bedtime',
            prescribed: '2022-11-05',
            expires: '2023-11-05',
            provider: 'Dr. Sarah Johnson'
        }
    ];

    // Sample lab results
    const labResults = [
        {
            test: 'Complete Blood Count',
            date: '2023-06-10',
            results: 'Within normal limits',
            status: 'Normal'
        },
        {
            test: 'Lipid Panel',
            date: '2023-06-10',
            results: 'LDL: 98 mg/dL, HDL: 42 mg/dL',
            status: 'Borderline high LDL'
        },
        {
            test: 'HbA1c',
            date: '2023-06-10',
            results: '6.2%',
            status: 'Controlled'
        }
    ];

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const openReferModal = () => {
        setShowReferModal(true);
    };

    const openAdmitModal = () => {
        setShowAdmitModal(true);
    };

    const closeAdmitModal = () => {
        setShowAdmitModal(false);
        setAdmissionDetails({ ward: '', room: '', bed: '' });
    };

    const closeReferModal = () => {
        setShowReferModal(false);
        setReferralDetails({ department: '', description: '', reason: '' });
    };

    const handleAdmissionChange = (e) => {
        const { name, value } = e.target;
        setAdmissionDetails(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'ward' && { room: '', bed: '' }),
            ...(name === 'room' && { bed: '' })
        }));
    };

    const handleReferralChange = (e) => {
        const { name, value } = e.target;
        setReferralDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdmitPatient = () => {
        if (!admissionDetails.ward || !admissionDetails.room || !admissionDetails.bed) {
            alert('Please select ward, room, and bed');
            return;
        }

        setPatient(prev => ({
            ...prev,
            isAdmitted: true,
            admissionDate: new Date().toISOString(),
            ward: admissionDetails.ward,
            room: admissionDetails.room,
            bed: admissionDetails.bed
        }));

        closeAdmitModal();
    };

    const handleReferPatient = () => {
        if (!referralDetails.department) {
            alert('Please select a department');
            return;
        }

        if (!referralDetails.reason) {
            alert('Please provide a reason for referral');
            return;
        }

        // Here you would typically send the referral to your backend
        console.log('Referring patient to:', referralDetails);
        
        // Show confirmation and close modal
        alert(`Patient referred to ${departments.find(d => d.value === referralDetails.department)?.label}`);
        closeReferModal();
    };

    const handleDischargePatient = () => {
        setPatient(prev => ({
            ...prev,
            isAdmitted: false,
            admissionDate: null,
            ward: null,
            room: null,
            bed: null
        }));
    };

    const calculateAdmissionDuration = (admissionDate) => {
        if (!admissionDate) return '';
        
        const now = new Date();
        const admitted = new Date(admissionDate);
        const diffMs = now - admitted;
        
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${days}d ${hours}h ${minutes}m`;
    };

    const getAdmissionTooltip = () => {
        return `Ward: ${patient.ward}\nRoom: ${patient.room}\nBed: ${patient.bed}\nAdmitted: ${new Date(patient.admissionDate).toLocaleString()}\nDuration: ${calculateAdmissionDuration(patient.admissionDate)}`;
    };

    const getAvailableRooms = () => {
        const ward = wards.find(w => w.name === admissionDetails.ward);
        return ward ? ward.rooms : [];
    };

    const getAvailableBeds = () => {
        const ward = wards.find(w => w.name === admissionDetails.ward);
        if (!ward) return [];
        
        const room = ward.rooms.find(r => r.number === admissionDetails.room);
        return room ? room.beds : [];
    };

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>

            <div className="scrollable-content">
                <div className="receptionist-container">
                    <div className="emr-header">
                        <button className="back-button" onClick={() => navigate('/doc/patient')}>
                            <FiArrowLeft /> Back to Patients
                        </button>
                        <div className="header-actions">
                            <button className="refer-button" onClick={openReferModal}>
                                <FiPlusCircle /> Refer
                            </button>
                            <button className="print-button">
                                <FiPrinter /> Print EMR
                            </button>
                        </div>
                    </div>

                    <section className="patient-info-section">
                        <h2 className="emr-section-title"><FiUser /> Patient Information</h2>
                        <div className="patient-banner">
                            <div className="patient-details">
                                <h1>{patient.name}</h1>
                                <div className="patient-meta">
                                    <span><FiPocket /> ID: {patient.id}</span>
                                    <span><FiCalendar /> {patient.age} years ({patient.dob})</span>
                                    <span><FiUser /> {patient.gender}</span>
                                    <span><FiDroplet /> Blood Type: {patient.bloodType}</span>
                                </div>
                            </div>
                            <div className="patient-alerts">
                                {patient.allergies.length > 0 && (
                                    <div className="alert-item allergies">
                                        <FiAlertCircle />
                                        <div>
                                            <strong>Allergies:</strong> {patient.allergies.join(', ')}
                                        </div>
                                    </div>
                                )}
                                {patient.conditions.length > 0 && (
                                    <div className="alert-item conditions">
                                        <FiAlertCircle />
                                        <div>
                                            <strong>Conditions:</strong> {patient.conditions.join(', ')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="admission-status-container">
                            {patient.isAdmitted ? (
                                <div className="admission-badge admitted" title={getAdmissionTooltip()}>
                                    <FiHome /> Admitted
                                    <button 
                                        className="discharge-button"
                                        onClick={handleDischargePatient}
                                    >
                                        Discharge
                                    </button>
                                </div>
                            ) : (
                                <button className="admission-badge not-admitted" onClick={openAdmitModal}>
                                    <FiPlusCircle /> Admit Patient
                                </button>
                            )}
                        </div>

                        <div className="quick-stats">
                            <div className="stat-card">
                                <div className="stat-icon"><FiActivity /></div>
                                <div className="stat-value">3</div>
                                <div className="stat-label">Active Medications</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FiHeart /></div>
                                <div className="stat-value">2</div>
                                <div className="stat-label">Chronic Conditions</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FiCalendar /></div>
                                <div className="stat-value">{patient.lastVisit}</div>
                                <div className="stat-label">Last Visit</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon"><FiCalendar /></div>
                                <div className="stat-value">{patient.nextAppointment}</div>
                                <div className="stat-label">Next Appointment</div>
                            </div>
                        </div>
                    </section>

                    <div className="emr-sections">
                        <section className="emr-section">
                            <h2 className="emr-section-title"><FiClipboard /> Medical History</h2>
                            <div className="history-table">
                                <div className="history-header">
                                    <div>Date</div>
                                    <div>Provider</div>
                                    <div>Diagnosis</div>
                                    <div>Treatment</div>
                                    <div>Notes</div>
                                </div>
                                {medicalHistory.map((visit, index) => (
                                    <div className="history-row" key={index}>
                                        <div>{visit.date}</div>
                                        <div>{visit.provider}</div>
                                        <div>{visit.diagnosis}</div>
                                        <div>{visit.treatment}</div>
                                        <div>{visit.notes}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="emr-section">
                            <h2 className="emr-section-title"><FiPieChart /> Current Medications</h2>
                            <div className="medication-table">
                                <div className="medication-header">
                                    <div>Medication</div>
                                    <div>Dosage</div>
                                    <div>Frequency</div>
                                    <div>Prescribed</div>
                                    <div>Expires</div>
                                    <div>Provider</div>
                                </div>
                                {prescriptions.map((med, index) => (
                                    <div className="medication-row" key={index}>
                                        <div><strong>{med.medication}</strong></div>
                                        <div>{med.dosage}</div>
                                        <div>{med.frequency}</div>
                                        <div>{med.prescribed}</div>
                                        <div>{med.expires}</div>
                                        <div>{med.provider}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="emr-section">
                            <h2 className="emr-section-title"><FiBarChart2 /> Lab Results</h2>
                            <div className="lab-table">
                                <div className="lab-header">
                                    <div>Test</div>
                                    <div>Date</div>
                                    <div>Results</div>
                                    <div>Status</div>
                                </div>
                                {labResults.map((lab, index) => (
                                    <div className="lab-row" key={index}>
                                        <div><strong>{lab.test}</strong></div>
                                        <div>{lab.date}</div>
                                        <div>{lab.results}</div>
                                        <div className={`status ${lab.status.toLowerCase().includes('normal') ? 'normal' : 'abnormal'}`}>
                                            {lab.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="emr-section">
                            <h2 className="emr-section-title"><FiFilePlus /> Clinical Notes</h2>
                            <div className="clinical-notes">
                                <div className="note">
                                    <div className="note-header">
                                        <span className="note-date">2023-06-15</span>
                                        <span className="note-author">Dr. Sarah Johnson</span>
                                    </div>
                                    <div className="note-content">
                                        Patient presents for hypertension follow-up. Reports good medication compliance.
                                        BP today is 128/82, which is improved from last visit. No new complaints.
                                        Continue current regimen and follow up in 2 months.
                                    </div>
                                </div>
                                <div className="note">
                                    <div className="note-header">
                                        <span className="note-date">2023-03-10</span>
                                        <span className="note-author">Dr. Michael Chen</span>
                                    </div>
                                    <div className="note-content">
                                        Diabetes management visit. Patient reports occasional forgetfulness with medication.
                                        HbA1c is 6.2%, down from 6.8% last visit. Encouraged to use pill organizer.
                                        Discussed importance of consistent medication timing for glucose control.
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Admission Modal */}
            {showAdmitModal && (
                <div className="modal-overlay">
                    <div className="admission-modal">
                        <div className="modal-header">
                            <h3>Admit Patient</h3>
                            <button className="close-button" onClick={closeAdmitModal}>
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Ward:</label>
                                <select 
                                    name="ward" 
                                    value={admissionDetails.ward}
                                    onChange={handleAdmissionChange}
                                    required
                                >
                                    <option value="">Select Ward</option>
                                    {wards.map(ward => (
                                        <option key={ward.name} value={ward.name}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {admissionDetails.ward && (
                                <div className="form-group">
                                    <label>Room:</label>
                                    <select 
                                        name="room" 
                                        value={admissionDetails.room}
                                        onChange={handleAdmissionChange}
                                        required
                                    >
                                        <option value="">Select Room</option>
                                        {getAvailableRooms().map(room => (
                                            <option key={room.number} value={room.number}>
                                                {room.number}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {admissionDetails.room && (
                                <div className="form-group">
                                    <label>Bed:</label>
                                    <select 
                                        name="bed" 
                                        value={admissionDetails.bed}
                                        onChange={handleAdmissionChange}
                                        required
                                    >
                                        <option value="">Select Bed</option>
                                        {getAvailableBeds().map(bed => (
                                            <option key={bed} value={bed}>
                                                {bed}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-button" onClick={closeAdmitModal}>
                                Cancel
                            </button>
                            <button className="confirm-button" onClick={handleAdmitPatient}>
                                Confirm Admission
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Referral Modal */}
            {showReferModal && (
                <div className="modal-overlay">
                    <div className="referral-modal">
                        <div className="modal-header">
                            <h3>Refer Patient</h3>
                            <button className="close-button" onClick={closeReferModal}>
                                <FiX />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Department:</label>
                                <div className="department-options">
                                    {departments.map(dept => (
                                        <label 
                                            key={dept.value} 
                                            className={`department-option ${referralDetails.department === dept.value ? 'selected' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="department"
                                                value={dept.value}
                                                checked={referralDetails.department === dept.value}
                                                onChange={handleReferralChange}
                                                className="hidden-radio"
                                            />
                                            <div className="department-icon">
                                                {dept.icon}
                                            </div>
                                            <div className="department-label">
                                                {dept.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Reason for Referral:</label>
                                <textarea
                                    name="reason"
                                    value={referralDetails.reason}
                                    onChange={handleReferralChange}
                                    placeholder="Explain why you're referring the patient..."
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Additional Description (Optional):</label>
                                <textarea
                                    name="description"
                                    value={referralDetails.description}
                                    onChange={handleReferralChange}
                                    placeholder="Add any additional details or instructions..."
                                    rows="3"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-button" onClick={closeReferModal}>
                                Cancel
                            </button>
                            <button className="confirm-button" onClick={handleReferPatient}>
                                Submit Referral
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ChatWidget />
        </MainLayout>
    );
}

export default PatientEMR;