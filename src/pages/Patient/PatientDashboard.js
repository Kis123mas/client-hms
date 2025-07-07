import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './PatientDashboard.css';
import { 
  FaCalendarAlt, 
  FaFileMedical, 
  FaPills, 
  FaUserClock,
  FaChartLine,
  FaHeartbeat,
  FaWeight,
  FaRulerVertical,
  FaTint
} from 'react-icons/fa';

function PatientDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const crumbs = [{ label: 'Dashboard' }];

  const [upcomingAppointments] = useState([
    { id: 1, date: '2023-06-15', time: '10:30 AM', doctor: 'Dr. Smith', department: 'Cardiology' },
    { id: 2, date: '2023-06-20', time: '02:15 PM', doctor: 'Dr. Johnson', department: 'Dermatology' }
  ]);

  const [medicalSummary] = useState({
    lastVisit: '2023-05-20',
    bloodPressure: '120/80',
    weight: '68 kg',
    height: '175 cm',
    bloodType: 'A+'
  });

  const [recentPrescriptions] = useState([
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', status: 'Active' },
    { id: 2, name: 'Ibuprofen', dosage: '200mg', frequency: 'As needed', status: 'Active' }
  ]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const UpcomingAppointmentCard = ({ appointments }) => (
    <div className="dashboard-card">
      <h2>Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p className="no-data-message">No upcoming appointments</p>
      ) : (
        <div className="appointments-list">
          {appointments.map(appt => (
            <div key={appt.id} className="appointment-item">
              <div className="appointment-date">
                <div className="date-day">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="date-number">{new Date(appt.date).getDate()}</div>
              </div>
              <div className="appointment-details">
                <h3>{appt.doctor}</h3>
                <p>{appt.department}</p>
                <p className="appointment-time">
                  <FaUserClock /> {appt.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <a href="/pat/appointments" className="view-all-link">View all appointments →</a>
    </div>
  );

  const MedicalSummaryCard = ({ summary }) => (
    <div className="dashboard-card">
      <h2>Medical Summary</h2>
      <div className="medical-summary-grid">
        <div className="summary-item"><div className="summary-icon"><FaHeartbeat /></div><div><h3>Blood Pressure</h3><p>{summary.bloodPressure}</p></div></div>
        <div className="summary-item"><div className="summary-icon"><FaWeight /></div><div><h3>Weight</h3><p>{summary.weight}</p></div></div>
        <div className="summary-item"><div className="summary-icon"><FaRulerVertical /></div><div><h3>Height</h3><p>{summary.height}</p></div></div>
        <div className="summary-item"><div className="summary-icon"><FaTint /></div><div><h3>Blood Type</h3><p>{summary.bloodType}</p></div></div>
      </div>
      <p className="last-visit">Last visit: {summary.lastVisit}</p>
    </div>
  );

  const RecentPrescriptionCard = ({ prescriptions }) => (
    <div className="dashboard-card">
      <h2>Recent Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p className="no-data-message">No active prescriptions</p>
      ) : (
        <div className="prescriptions-list">
          {prescriptions.map(prescription => (
            <div key={prescription.id} className="prescription-item">
              <div className="prescription-name">{prescription.name}</div>
              <div className="prescription-details">
                <span>{prescription.dosage}</span>
                <span>•</span>
                <span>{prescription.frequency}</span>
              </div>
              <div className={`prescription-status ${prescription.status.toLowerCase()}`}>{prescription.status}</div>
            </div>
          ))}
        </div>
      )}
      <a href="/pat/prescriptions" className="view-all-link">View all prescriptions →</a>
    </div>
  );

  const HealthMetricsCard = () => (
    <div className="dashboard-card">
      <h2>Health Metrics & Insights</h2>
      <ul className="metrics-list">
        <li><strong>Overall Health Trend:</strong> Stable</li>
        <li><strong>Weight Change:</strong> -1.2 kg since last visit</li>
        <li><strong>Medication Adherence:</strong> 96%</li>
        <li><strong>Average Blood Pressure:</strong> 120/80 mmHg</li>
      </ul>
      <a href="/pat/health-insights" className="view-all-link">View detailed insights →</a>
    </div>
  );

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        <div className="patient-dashboard-container">
          <div className="welcome-banner">
            <h1>Welcome back, John!</h1>
            <p>Here's what's happening with your health today</p>
          </div>

          <div className="quick-stats-row">
            <div className="stat-card">
              <div className="stat-icon"><FaChartLine /></div>
              <div className="stat-content">
                <h3>Health Score</h3>
                <p>82/100</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaFileMedical /></div>
              <div className="stat-content">
                <h3>Active Prescriptions</h3>
                <p>{recentPrescriptions.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaCalendarAlt /></div>
              <div className="stat-content">
                <h3>Upcoming Appointments</h3>
                <p>{upcomingAppointments.length}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-main-content">
            <div className="dashboard-column">
              <UpcomingAppointmentCard appointments={upcomingAppointments} />
              <MedicalSummaryCard summary={medicalSummary} />
            </div>

            <div className="dashboard-column">
              <RecentPrescriptionCard prescriptions={recentPrescriptions} />
              <HealthMetricsCard />
            </div>
          </div>

          <div className="health-tips-section">
            <h2>Health Tips</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <h3>Stay Hydrated</h3>
                <p>Drink at least 8 glasses of water daily for optimal health.</p>
              </div>
              <div className="tip-card">
                <h3>Regular Exercise</h3>
                <p>Aim for 30 minutes of moderate activity most days.</p>
              </div>
              <div className="tip-card">
                <h3>Medication Reminder</h3>
                <p>Don't forget to take your prescribed medications on time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PatientDashboard;
