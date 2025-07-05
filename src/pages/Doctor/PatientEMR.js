import React from 'react';
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
  FiHome
} from 'react-icons/fi';
import './emr.css';

function PatientEMR() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
    const navigate = useNavigate();

    const crumbs = [
        { label: 'Dashboard', path: '/' },
        { label: 'Patients', path: '/patients' },
        { label: 'John Doe - EMR', path: '/patients/123/emr' }
    ];

    // Sample patient data with admission status
    const [patient, setPatient] = React.useState({
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
        isAdmitted: true,
        admissionDate: '2023-07-01T14:30:00',
        ward: 'Cardiology',
        room: '305',
        bed: 'B'
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

    const handleDiagnoseClick = () => {
        console.log("Refer button clicked");
        navigate(`/doc/patient-diagnos`);
    };

    const handleAdmitPatient = () => {
        setPatient(prev => ({
            ...prev,
            isAdmitted: true,
            admissionDate: new Date().toISOString(),
            ward: 'General Medicine',
            room: '405',
            bed: 'A'
        }));
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

    return (
        <MainLayout isCollapsed={isSidebarCollapsed} userRole="doctor">
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>

            <div className="scrollable-content">
                <div className="receptionist-container">
                    <div className="emr-header">
                        <button className="back-button" onClick={() => navigate('/patients')}>
                            <FiArrowLeft /> Back to Patients
                        </button>
                        <div className="header-actions">
                            <button className="refer-button" onClick={handleDiagnoseClick}>
                                <FiPlusCircle /> Refer
                            </button>
                            <button className="print-button">
                                <FiPrinter /> Print EMR
                            </button>
                        </div>
                    </div>

                    <section className="patient-info-section">
                        <h2 className="section-title"><FiUser /> Patient Information</h2>
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
                                </div>
                            ) : (
                                <button className="admission-badge not-admitted" onClick={handleAdmitPatient}>
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
                            <h2 className="section-title"><FiClipboard /> Medical History</h2>
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
                            <h2 className="section-title"><FiPieChart /> Current Medications</h2>
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
                            <h2 className="section-title"><FiBarChart2 /> Lab Results</h2>
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
                            <h2 className="section-title"><FiFilePlus /> Clinical Notes</h2>
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
            <ChatWidget />
        </MainLayout>
    );
}

export default PatientEMR;