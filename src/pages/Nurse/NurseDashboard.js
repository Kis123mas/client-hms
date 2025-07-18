import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Nurse.css';

function NurseDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePatients, setActivePatients] = useState([]);
  const [upcomingMedications, setUpcomingMedications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const crumbs = [{ label: 'Dashboard', path: '/nur/dashboard' }];

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Mock data for active patients
      setActivePatients([
        {
          id: 1,
          name: 'John Doe',
          room: '201B',
          condition: 'Post-op Recovery',
          vitals: { bp: '120/80', temp: '98.6°F', pulse: '72', oxygen: '98%' },
          needsAttention: false,
          lastChecked: '30 mins ago'
        },
        {
          id: 2,
          name: 'Sarah Smith',
          room: '305A',
          condition: 'Diabetes Management',
          vitals: { bp: '130/85', temp: '99.1°F', pulse: '68', oxygen: '96%' },
          needsAttention: true,
          lastChecked: '15 mins ago'
        },
        {
          id: 3,
          name: 'Michael Johnson',
          room: '102C',
          condition: 'Pneumonia',
          vitals: { bp: '118/78', temp: '100.4°F', pulse: '82', oxygen: '94%' },
          needsAttention: true,
          lastChecked: '5 mins ago'
        }
      ]);

      // Mock data for medications
      setUpcomingMedications([
        {
          id: 1,
          patient: 'John Doe',
          medication: 'Ibuprofen 400mg',
          time: '10:00 AM',
          status: 'pending',
          route: 'Oral'
        },
        {
          id: 2,
          patient: 'Sarah Smith',
          medication: 'Insulin 10 units',
          time: '11:30 AM',
          status: 'pending',
          route: 'Subcutaneous'
        },
        {
          id: 3,
          patient: 'Michael Johnson',
          medication: 'Amoxicillin 500mg',
          time: '12:00 PM',
          status: 'pending',
          route: 'Oral'
        }
      ]);

      // Mock data for tasks
      setTasks([
        { id: 1, description: 'Change dressing for Room 201B', completed: false, priority: 'high' },
        { id: 2, description: 'Administer flu vaccine to new admissions', completed: false, priority: 'medium' },
        { id: 3, description: 'Update patient charts', completed: true, priority: 'low' }
      ]);

      // Mock data for alerts
      setAlerts([
        { id: 1, message: 'Patient in 305A has elevated blood sugar (250 mg/dL)', priority: 'high' },
        { id: 2, message: 'Medication inventory low for Ibuprofen (5 remaining)', priority: 'medium' },
        { id: 3, message: 'New lab results available for Patient Johnson', priority: 'low' }
      ]);
    };

    fetchData();
  }, []);

  const handleMedicationAdministered = (medicationId) => {
    setUpcomingMedications(prev => 
      prev.map(med => 
        med.id === medicationId ? { ...med, status: 'completed' } : med
      )
    )
  };

  const handleTaskComplete = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    )
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>
      <div className="scrollable-content">
        <div className="receptionist-container">
          {/* Priority Alerts */}
          <section className="alerts-section">
            <h2 className="section-title">Priority Alerts</h2>
            <div className="alerts-grid">
              {alerts.map(alert => (
                <div key={alert.id} className={`alert-card ${alert.priority}`}>
                  <div className="alert-indicator"></div>
                  <p className="alert-message">{alert.message}</p>
                  <span className="alert-time">Just now</span>
                </div>
              ))}
            </div>
          </section>

          {/* Main Dashboard Content */}
          <div className="dashboard-main-content">
            {/* Left Column */}
            <div className="dashboard-column">
              {/* Patient Overview */}
              <section className="patients-section">
                <h2 className="section-title">Patient Overview</h2>
                <div className="patients-grid">
                  {activePatients.map(patient => (
                    <div key={patient.id} className={`patient-card ${patient.needsAttention ? 'attention' : ''}`}>
                      <div className="patient-header">
                        <h3>{patient.name}</h3>
                        <span className="room-badge">Room {patient.room}</span>
                      </div>
                      <p className="patient-condition">{patient.condition}</p>
                      
                      <div className="vitals-grid">
                        <div className="vital-item">
                          <span className="vital-label">BP</span>
                          <span className="vital-value">{patient.vitals.bp}</span>
                        </div>
                        <div className="vital-item">
                          <span className="vital-label">Temp</span>
                          <span className="vital-value">{patient.vitals.temp}</span>
                        </div>
                        <div className="vital-item">
                          <span className="vital-label">Pulse</span>
                          <span className="vital-value">{patient.vitals.pulse}</span>
                        </div>
                        <div className="vital-item">
                          <span className="vital-label">SpO₂</span>
                          <span className="vital-value">{patient.vitals.oxygen}</span>
                        </div>
                      </div>
                      
                      <div className="patient-footer">
                        <span className="last-checked">Last checked: {patient.lastChecked}</span>
                        {patient.needsAttention && (
                          <button className="action-button attention-button">Attend</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section className="quick-actions-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions-grid">
                  <button className="quick-action-button">
                    <span className="action-icon">📝</span>
                    <span>Document Vitals</span>
                  </button>
                  <button className="quick-action-button">
                    <span className="action-icon">💊</span>
                    <span>Record Medication</span>
                  </button>
                  <button className="quick-action-button">
                    <span className="action-icon">🩺</span>
                    <span>Request Doctor</span>
                  </button>
                  <button className="quick-action-button">
                    <span className="action-icon">📋</span>
                    <span>Update Chart</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="dashboard-column">
              {/* Medication Schedule */}
              <section className="medication-section">
                <h2 className="section-title">Medication Schedule</h2>
                <div className="medication-list">
                  {upcomingMedications.map(med => (
                    <div key={med.id} className="medication-card">
                      <div className="medication-time">{med.time}</div>
                      <div className="medication-details">
                        <h4>{med.patient}</h4>
                        <p>{med.medication} ({med.route})</p>
                      </div>
                      <button 
                        className={`action-button ${med.status === 'completed' ? 'completed' : ''}`}
                        onClick={() => handleMedicationAdministered(med.id)}
                      >
                        {med.status === 'completed' ? '✓ Administered' : 'Mark Administered'}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tasks */}
              <section className="tasks-section">
                <h2 className="section-title">Tasks</h2>
                <div className="task-list">
                  {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                      <label className="task-checkbox">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          onChange={() => handleTaskComplete(task.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <div className="task-content">
                        <p className="task-description">{task.description}</p>
                        <span className={`task-priority ${task.priority}`}>{task.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default NurseDashboard;