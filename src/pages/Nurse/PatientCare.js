import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Nurse.css';

function PatientCare() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [medications, setMedications] = useState([]);
  const [notes, setNotes] = useState('');
  const [newVital, setNewVital] = useState({
    type: 'bloodPressure',
    value: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const crumbs = [
    { label: 'Dashboard', path: '/nur/dashboard' },
    { label: 'Patient Care', path: '/nur/patients' }
  ];

  useEffect(() => {
    // Simulate fetching patient data
    const fetchPatientData = async () => {
      // Mock patient data
      setPatient({
        id: 'P1002',
        name: 'Sarah Smith',
        age: 58,
        gender: 'Female',
        room: '305A',
        admissionDate: '2023-05-15',
        diagnosis: 'Type 2 Diabetes Mellitus',
        allergies: 'Penicillin, Sulfa drugs',
        physician: 'Dr. James Wilson',
        status: 'Stable'
      });

      // Mock vitals data
      setVitals([
        { id: 1, type: 'bloodPressure', value: '130/85', time: '08:30 AM', nurse: 'Nurse Johnson' },
        { id: 2, type: 'temperature', value: '99.1°F', time: '08:35 AM', nurse: 'Nurse Johnson' },
        { id: 3, type: 'pulse', value: '68 bpm', time: '08:35 AM', nurse: 'Nurse Johnson' },
        { id: 4, type: 'glucose', value: '180 mg/dL', time: '08:40 AM', nurse: 'Nurse Johnson' }
      ]);

      // Mock medications
      setMedications([
        { id: 1, name: 'Metformin', dosage: '500 mg', frequency: 'Twice daily', lastAdministered: 'Today, 08:00 AM', route: 'Oral' },
        { id: 2, name: 'Lantus Insulin', dosage: '20 units', frequency: 'Daily at bedtime', lastAdministered: 'Yesterday, 10:00 PM', route: 'Subcutaneous' },
        { id: 3, name: 'Lisinopril', dosage: '10 mg', frequency: 'Daily', lastAdministered: 'Today, 08:00 AM', route: 'Oral' }
      ]);
    };

    fetchPatientData();
  }, []);

  const handleVitalSubmit = (e) => {
    e.preventDefault();
    const newVitalEntry = {
      id: vitals.length + 1,
      type: newVital.type,
      value: newVital.value,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      nurse: 'You'
    };
    setVitals([newVitalEntry, ...vitals]);
    setNewVital({ ...newVital, value: '' });
  };

  const handleMedicationAdministered = (medId) => {
    setMedications(medications.map(med => 
      med.id === medId 
        ? { ...med, lastAdministered: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
        : med
    ));
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to the database
    setNotes('');
    alert('Note saved to patient chart');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!patient) return <div>Loading patient data...</div>;

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>
      <div className="scrollable-content">
        <div className="patient-care-container">
          {/* Patient Header */}
          <div className="patient-header">
            <div className="patient-info">
              <h1>{patient.name}</h1>
              <div className="patient-meta">
                <span>Room: {patient.room}</span>
                <span>Age: {patient.age}</span>
                <span>Gender: {patient.gender}</span>
                <span className={`status-badge ${patient.status.toLowerCase()}`}>{patient.status}</span>
              </div>
            </div>
            <div className="patient-id">
              <span>Patient ID: {patient.id}</span>
              <span>Admitted: {patient.admissionDate}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="patient-care-content">
            {/* Left Column */}
            <div className="patient-care-column">
              {/* Patient Details */}
              <section className="patient-details-section">
                <h2 className="section-title">Patient Details</h2>
                <div className="detail-card">
                  <div className="detail-row">
                    <span className="detail-label">Diagnosis:</span>
                    <span className="detail-value">{patient.diagnosis}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Allergies:</span>
                    <span className="detail-value">{patient.allergies || 'None documented'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Attending Physician:</span>
                    <span className="detail-value">{patient.physician}</span>
                  </div>
                </div>
              </section>

              {/* Vitals */}
              <section className="vitals-section">
                <h2 className="section-title">Vital Signs</h2>
                <div className="vitals-card">
                  <div className="current-vitals">
                    {vitals.slice(0, 4).map(vital => (
                      <div key={vital.id} className="vital-item">
                        <span className="vital-type">{formatVitalType(vital.type)}</span>
                        <span className="vital-value">{vital.value}</span>
                        <span className="vital-time">{vital.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleVitalSubmit} className="vital-form">
                    <h3>Record New Vital</h3>
                    <div className="form-group">
                      <label htmlFor="vitalType">Vital Type:</label>
                      <select
                        id="vitalType"
                        value={newVital.type}
                        onChange={(e) => setNewVital({ ...newVital, type: e.target.value })}
                      >
                        <option value="bloodPressure">Blood Pressure</option>
                        <option value="temperature">Temperature</option>
                        <option value="pulse">Pulse</option>
                        <option value="respiratoryRate">Respiratory Rate</option>
                        <option value="oxygenSaturation">Oxygen Saturation</option>
                        <option value="glucose">Blood Glucose</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="vitalValue">Value:</label>
                      <input
                        type="text"
                        id="vitalValue"
                        value={newVital.value}
                        onChange={(e) => setNewVital({ ...newVital, value: e.target.value })}
                        placeholder={getVitalPlaceholder(newVital.type)}
                        required
                      />
                    </div>
                    <button type="submit" className="submit-button">
                      Record Vital
                    </button>
                  </form>
                </div>
              </section>

              {/* Vitals History */}
              <section className="vitals-history-section">
                <h2 className="section-title">Vitals History</h2>
                <div className="history-card">
                  <table className="vitals-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Recorded By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitals.map(vital => (
                        <tr key={vital.id}>
                          <td>{vital.time}</td>
                          <td>{formatVitalType(vital.type)}</td>
                          <td>{vital.value}</td>
                          <td>{vital.nurse}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="patient-care-column">
              {/* Medications */}
              <section className="medications-section">
                <h2 className="section-title">Medications</h2>
                <div className="medications-card">
                  {medications.map(med => (
                    <div key={med.id} className="medication-item">
                      <div className="medication-info">
                        <h3>{med.name}</h3>
                        <p>{med.dosage} • {med.frequency}</p>
                        <p className="medication-route">Route: {med.route}</p>
                      </div>
                      <div className="medication-actions">
                        <span className="last-administered">
                          Last: {med.lastAdministered}
                        </span>
                        <button
                          onClick={() => handleMedicationAdministered(med.id)}
                          className="administer-button"
                        >
                          Mark as Administered
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Clinical Notes */}
              <section className="notes-section">
                <h2 className="section-title">Clinical Notes</h2>
                <div className="notes-card">
                  <form onSubmit={handleNoteSubmit}>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Document your assessment, interventions, and other relevant notes..."
                      rows="6"
                    />
                    <div className="notes-actions">
                      <button type="submit" className="submit-button">
                        Save to Patient Chart
                      </button>
                    </div>
                  </form>
                </div>
              </section>

              {/* Care Plan */}
              <section className="care-plan-section">
                <h2 className="section-title">Care Plan</h2>
                <div className="care-plan-card">
                  <ul className="care-plan-list">
                    <li>Monitor blood glucose before meals and at bedtime</li>
                    <li>Assess feet daily for wounds or ulcers</li>
                    <li>Educate on diabetic diet and exercise</li>
                    <li>Administer medications as prescribed</li>
                    <li>Monitor for signs of hypo/hyperglycemia</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Helper functions
function formatVitalType(type) {
  const types = {
    bloodPressure: 'BP',
    temperature: 'Temp',
    pulse: 'Pulse',
    respiratoryRate: 'Resp Rate',
    oxygenSaturation: 'SpO₂',
    glucose: 'Glucose'
  };
  return types[type] || type;
}

function getVitalPlaceholder(type) {
  const placeholders = {
    bloodPressure: 'e.g. 120/80',
    temperature: 'e.g. 98.6°F',
    pulse: 'e.g. 72 bpm',
    respiratoryRate: 'e.g. 16/min',
    oxygenSaturation: 'e.g. 98%',
    glucose: 'e.g. 120 mg/dL'
  };
  return placeholders[type] || 'Enter value';
}

export default PatientCare;