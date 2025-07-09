import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './DoctorDashboard.css';
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaProcedures, 
  FaFlask,
  FaChartBar,
  FaStethoscope,
  FaClipboardList,
  FaUserClock,
  FaHospitalUser,
  FaNotesMedical,
  FaBell
} from 'react-icons/fa';

function DoctorDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const crumbs = [{ label: 'Dashboard', path: '/doctor/dashboard' }];

  const [todaySchedule] = useState([
    { id: 1, time: '09:00 AM', patient: 'John Smith', type: 'Follow-up', status: 'Confirmed' },
    { id: 2, time: '10:30 AM', patient: 'Sarah Johnson', type: 'New Patient', status: 'Confirmed' },
    { id: 3, time: '02:15 PM', patient: 'Michael Brown', type: 'Consultation', status: 'Pending' }
  ]);

  const [recentPatients] = useState([
    { id: 1, name: 'Emily Davis', lastVisit: '2023-06-10', diagnosis: 'Hypertension', nextAppointment: '2023-06-25' },
    { id: 2, name: 'Robert Wilson', lastVisit: '2023-06-08', diagnosis: 'Type 2 Diabetes', nextAppointment: '2023-07-05' }
  ]);

  const [pendingTasks] = useState([
    { id: 1, type: 'Lab Results Review', patient: 'John Smith', priority: 'High', due: 'Today' },
    { id: 2, type: 'Prescription Refill', patient: 'Lisa Taylor', priority: 'Medium', due: 'Tomorrow' }
  ]);

  const [practiceStats] = useState({
    patientsThisWeek: 24,
    appointmentsCompleted: 18,
    prescriptionCount: 32,
    averageWaitTime: '15 mins'
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const TodayScheduleCard = ({ schedule }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2>Today's Schedule</h2>
        <span className="badge">{schedule.length} appointments</span>
      </div>
      {schedule.length === 0 ? (
        <p className="no-data-message">No appointments scheduled for today</p>
      ) : (
        <div className="schedule-list">
          {schedule.map(item => (
            <div key={item.id} className={`schedule-item ${item.status.toLowerCase()}`}>
              <div className="schedule-time">{item.time}</div>
              <div className="schedule-details">
                <h3>{item.patient}</h3>
                <p>{item.type} • <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></p>
              </div>
              <button className="action-button">View</button>
            </div>
          ))}
        </div>
      )}
      <a href="/doctor/schedule" className="view-all-link">View full schedule →</a>
    </div>
  );

  const RecentPatientsCard = ({ patients }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2>Recent Patients</h2>
        <a href="/doctor/patients" className="view-all-link">View all</a>
      </div>
      {patients.length === 0 ? (
        <p className="no-data-message">No recent patient records</p>
      ) : (
        <div className="patients-list">
          <div className="patients-list-header">
            <span>Patient</span>
            <span>Last Visit</span>
            <span>Diagnosis</span>
          </div>
          {patients.map(patient => (
            <div key={patient.id} className="patient-item">
              <div className="patient-name">
                <FaHospitalUser className="patient-icon" />
                {patient.name}
              </div>
              <div>{patient.lastVisit}</div>
              <div className="diagnosis">{patient.diagnosis}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const PendingTasksCard = ({ tasks }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2>Pending Tasks</h2>
        <span className="badge warning">{tasks.length} pending</span>
      </div>
      {tasks.length === 0 ? (
        <p className="no-data-message">No pending tasks</p>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-priority" data-priority={task.priority.toLowerCase()}></div>
              <div className="task-details">
                <h3>{task.type}</h3>
                <p>For: {task.patient}</p>
              </div>
              <div className="task-due">
                <span>Due: {task.due}</span>
                <button className="action-button small">Complete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const PracticeStatsCard = ({ stats }) => (
    <div className="dashboard-card">
      <h2>Practice Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon"><FaUserMd /></div>
          <div>
            <h3>Patients This Week</h3>
            <p>{stats.patientsThisWeek}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaCalendarAlt /></div>
          <div>
            <h3>Appointments Completed</h3>
            <p>{stats.appointmentsCompleted}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaNotesMedical /></div>
          <div>
            <h3>Prescriptions</h3>
            <p>{stats.prescriptionCount}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaUserClock /></div>
          <div>
            <h3>Avg. Wait Time</h3>
            <p>{stats.averageWaitTime}</p>
          </div>
        </div>
      </div>
      <a href="/doctor/analytics" className="view-all-link">View detailed analytics →</a>
    </div>
  );

  const QuickActionsCard = () => (
    <div className="dashboard-card quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        <button className="action-button primary">
          <FaStethoscope /> New Consultation
        </button>
        <button className="action-button">
          <FaClipboardList /> View Patient Records
        </button>
        <button className="action-button">
          <FaProcedures /> Order Tests
        </button>
        <button className="action-button">
          <FaNotesMedical /> Write Prescription
        </button>
      </div>
    </div>
  );

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        <div className="doctor-dashboard-container">
          <div className="doc-welcome-banner">
            <div>
              <h1>Good Morning, Dr. Anderson</h1>
              {/* <p>You have {todaySchedule.length} appointments today</p> */}
            </div>
            {/* <div className="notification-bell">
              <FaBell />
              <span className="notification-count">3</span>
            </div> */}
          </div>

          <div className="dashboard-main-content">
            <div className="dashboard-column">
              <TodayScheduleCard schedule={todaySchedule} />
              <RecentPatientsCard patients={recentPatients} />
            </div>

            <div className="dashboard-column">
              <PracticeStatsCard stats={practiceStats} />
              <PendingTasksCard tasks={pendingTasks} />
              <QuickActionsCard />
            </div>
          </div>

          <div className="medical-updates-section">
            <h2>Medical Updates & Alerts</h2>
            <div className="updates-grid">
              <div className="update-card important">
                <h3>New Clinical Guidelines</h3>
                <p>Updated hypertension management protocols have been released by the AMA.</p>
                <a href="#" className="read-more">Read More</a>
              </div>
              <div className="update-card">
                <h3>Drug Recall Notice</h3>
                <p>Lot #XYZ123 of MedicationX has been recalled due to manufacturing issues.</p>
                <a href="#" className="read-more">Details</a>
              </div>
              <div className="update-card">
                <h3>CME Opportunity</h3>
                <p>Upcoming webinar on advanced diabetes care - June 25th, 7PM EST.</p>
                <a href="#" className="read-more">Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default DoctorDashboard;