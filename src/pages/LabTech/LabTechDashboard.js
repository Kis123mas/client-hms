import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './LabTechDashboard.css';
import { 
  FaFlask, 
  FaVial, 
  FaCalendarAlt, 
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaUserInjured,
  FaMicroscope,
  FaFileDownload
} from 'react-icons/fa';

function LabTechDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const crumbs = [{ label: 'Dashboard' }];

  const [pendingTests] = useState([
    { id: 1, patient: 'John Smith', test: 'CBC', priority: 'High', received: '2 hours ago' },
    { id: 2, patient: 'Sarah Johnson', test: 'Lipid Panel', priority: 'Medium', received: '4 hours ago' },
    { id: 3, patient: 'Michael Brown', test: 'Liver Function', priority: 'Low', received: '6 hours ago' }
  ]);

  const [completedTests] = useState([
    { id: 4, patient: 'Emily Davis', test: 'Glucose', status: 'Completed', completed: '1 hour ago' },
    { id: 5, patient: 'Robert Wilson', test: 'Thyroid Panel', status: 'Verified', completed: '3 hours ago' }
  ]);

  const [equipmentStatus] = useState([
    { id: 1, name: 'Centrifuge X-200', status: 'Operational', lastCalibrated: '2023-06-01' },
    { id: 2, name: 'Hematology Analyzer', status: 'Maintenance Needed', lastCalibrated: '2023-05-15' },
    { id: 3, name: 'Chemistry Analyzer', status: 'Operational', lastCalibrated: '2023-06-05' }
  ]);

  const [testStatistics] = useState({
    testsToday: 42,
    pendingTests: 8,
    criticalResults: 3,
    avgProcessingTime: '2.5 hours'
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const PendingTestsCard = ({ tests }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2><FaVial /> Pending Tests</h2>
        <span className="badge">{tests.length}</span>
      </div>
      {tests.length === 0 ? (
        <p className="no-data-message">No pending tests</p>
      ) : (
        <div className="tests-list">
          {tests.map(test => (
            <div key={test.id} className={`test-item priority-${test.priority.toLowerCase()}`}>
              <div className="test-info">
                <h3>{test.test}</h3>
                <p>{test.patient}</p>
              </div>
              <div className="test-meta">
                <span className={`priority-badge ${test.priority.toLowerCase()}`}>{test.priority}</span>
                <span className="time-received">{test.received}</span>
              </div>
              <button className="action-button">Process</button>
            </div>
          ))}
        </div>
      )}
      <a href="/lab/pending-tests" className="view-all-link">View all pending tests →</a>
    </div>
  );

  const CompletedTestsCard = ({ tests }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2><FaCheckCircle /> Completed Tests</h2>
        <span className="badge">{tests.length}</span>
      </div>
      {tests.length === 0 ? (
        <p className="no-data-message">No completed tests today</p>
      ) : (
        <div className="tests-list">
          {tests.map(test => (
            <div key={test.id} className="test-item">
              <div className="test-info">
                <h3>{test.test}</h3>
                <p>{test.patient}</p>
              </div>
              <div className="test-meta">
                <span className={`status-badge ${test.status.toLowerCase()}`}>{test.status}</span>
                <span className="time-completed">{test.completed}</span>
              </div>
              <button className="action-button">View Report</button>
            </div>
          ))}
        </div>
      )}
      <a href="/lab/completed-tests" className="view-all-link">View all completed tests →</a>
    </div>
  );

  const EquipmentStatusCard = ({ equipment }) => (
    <div className="dashboard-card">
      <h2><FaFlask /> Equipment Status</h2>
      <div className="equipment-grid">
        {equipment.map(item => (
          <div key={item.id} className={`equipment-item ${item.status.replace(/\s+/g, '-').toLowerCase()}`}>
            <h3>{item.name}</h3>
            <p>Status: <span className="status-text">{item.status}</span></p>
            <p>Last Calibrated: {item.lastCalibrated}</p>
            {item.status === 'Maintenance Needed' && (
              <button className="maintenance-button">Request Maintenance</button>
            )}
          </div>
        ))}
      </div>
      <a href="/lab/equipment" className="view-all-link">View all equipment →</a>
    </div>
  );

  const TestStatisticsCard = ({ stats }) => (
    <div className="dashboard-card">
      <h2><FaChartLine /> Today's Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon"><FaVial /></div>
          <div className="stat-content">
            <h3>Tests Today</h3>
            <p>{stats.testsToday}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaClock /></div>
          <div className="stat-content">
            <h3>Pending Tests</h3>
            <p>{stats.pendingTests}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaExclamationTriangle /></div>
          <div className="stat-content">
            <h3>Critical Results</h3>
            <p>{stats.criticalResults}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaUserInjured /></div>
          <div className="stat-content">
            <h3>Avg. Processing Time</h3>
            <p>{stats.avgProcessingTime}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const QuickActionsCard = () => (
    <div className="dashboard-card">
      <h2><FaMicroscope /> Quick Actions</h2>
      <div className="quick-actions-grid">
        <button className="quick-action">
          <FaFileDownload /> Download Requisition Forms
        </button>
        <button className="quick-action">
          <FaFlask /> New Test Entry
        </button>
        <button className="quick-action">
          <FaExclamationTriangle /> Report Critical Value
        </button>
        <button className="quick-action">
          <FaChartLine /> Generate Daily Report
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
        <div className="lab-dashboard-container">
          <div className="welcome-banner">
            <h1>Welcome back, John!</h1>
            <p>Welcome back, Lab Technician</p>
          </div>

          <div className="quick-stats-row">
            <TestStatisticsCard stats={testStatistics} />
          </div>

          <div className="dashboard-main-content">
            <div className="dashboard-column">
              <PendingTestsCard tests={pendingTests} />
              <EquipmentStatusCard equipment={equipmentStatus} />
            </div>

            <div className="dashboard-column">
              <CompletedTestsCard tests={completedTests} />
              <QuickActionsCard />
            </div>
          </div>

          <div className="upcoming-calibration-section">
            <h2>Upcoming Equipment Calibration</h2>
            <div className="calibration-grid">
              <div className="calibration-item">
                <h3>Centrifuge X-200</h3>
                <p>Due: 2023-07-01</p>
                <span className="status-due">Due in 3 days</span>
              </div>
              <div className="calibration-item">
                <h3>Hematology Analyzer</h3>
                <p>Due: 2023-07-10</p>
                <span className="status-upcoming">Due in 12 days</span>
              </div>
              <div className="calibration-item">
                <h3>Microscope Set A</h3>
                <p>Due: 2023-07-15</p>
                <span className="status-upcoming">Due in 17 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LabTechDashboard;