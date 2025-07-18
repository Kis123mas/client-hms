import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Pharmacy.css';
import { 
  FaPills, 
  FaPrescriptionBottleAlt, 
  FaBoxOpen, 
  FaExclamationTriangle,
  FaClipboardList,
  FaUserClock,
  FaHospitalUser,
  FaNotesMedical,
  FaBell,
  FaTruck,
  FaFileInvoiceDollar
} from 'react-icons/fa';

function PharmacyDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const crumbs = [{ label: 'Dashboard', path: '/pharmacy/dashboard' }];

  const [todayOrders] = useState([
    { id: 1, time: '09:00 AM', patient: 'John Smith', prescription: 'Amoxicillin 500mg', status: 'Ready for Pickup' },
    { id: 2, time: '10:30 AM', patient: 'Sarah Johnson', prescription: 'Lisinopril 10mg', status: 'Processing' },
    { id: 3, time: '02:15 PM', patient: 'Michael Brown', prescription: 'Atorvastatin 20mg', status: 'New' }
  ]);

  const [recentPrescriptions] = useState([
    { id: 1, patient: 'Emily Davis', date: '2023-06-10', medication: 'Metformin 1000mg', refills: 2 },
    { id: 2, patient: 'Robert Wilson', date: '2023-06-08', medication: 'Albuterol Inhaler', refills: 1 }
  ]);

  const [pendingTasks] = useState([
    { id: 1, type: 'Insurance Verification', patient: 'John Smith', priority: 'High', due: 'Today' },
    { id: 2, type: 'Inventory Reorder', medication: 'Ibuprofen 200mg', priority: 'Medium', due: 'Tomorrow' }
  ]);

  const [pharmacyStats] = useState({
    prescriptionsToday: 24,
    ordersCompleted: 18,
    inventoryItems: 856,
    lowStockItems: 12
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const TodayOrdersCard = ({ orders }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2>Today's Orders</h2>
        <span className="badge">{orders.length} prescriptions</span>
      </div>
      {orders.length === 0 ? (
        <p className="no-data-message">No orders for today</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className={`order-item ${order.status.toLowerCase().replace(' ', '-')}`}>
              <div className="order-time">{order.time}</div>
              <div className="order-details">
                <h3>{order.patient}</h3>
                <p>{order.prescription} • <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></p>
              </div>
              <button className="action-button">Process</button>
            </div>
          ))}
        </div>
      )}
      <a href="/pharmacy/orders" className="view-all-link">View all orders →</a>
    </div>
  );

  const RecentPrescriptionsCard = ({ prescriptions }) => (
    <div className="dashboard-card">
      <div className="card-header">
        <h2>Recent Prescriptions</h2>
        <a href="/pharmacy/prescriptions" className="view-all-link">View all</a>
      </div>
      {prescriptions.length === 0 ? (
        <p className="no-data-message">No recent prescriptions</p>
      ) : (
        <div className="prescriptions-list">
          <div className="prescriptions-list-header">
            <span>Patient</span>
            <span>Date</span>
            <span>Medication</span>
          </div>
          {prescriptions.map(prescription => (
            <div key={prescription.id} className="prescription-item">
              <div className="patient-name">
                <FaHospitalUser className="patient-icon" />
                {prescription.patient}
              </div>
              <div>{prescription.date}</div>
              <div className="medication">
                {prescription.medication} 
                {prescription.refills > 0 && <span className="refill-badge">{prescription.refills} refills</span>}
              </div>
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
                <p>{task.patient || task.medication}</p>
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

  const PharmacyStatsCard = ({ stats }) => (
    <div className="dashboard-card">
      <h2>Pharmacy Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon"><FaPrescriptionBottleAlt /></div>
          <div>
            <h3>Prescriptions Today</h3>
            <p>{stats.prescriptionsToday}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaClipboardList /></div>
          <div>
            <h3>Orders Completed</h3>
            <p>{stats.ordersCompleted}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaPills /></div>
          <div>
            <h3>Inventory Items</h3>
            <p>{stats.inventoryItems}</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><FaExclamationTriangle /></div>
          <div>
            <h3>Low Stock Items</h3>
            <p>{stats.lowStockItems}</p>
          </div>
        </div>
      </div>
      <a href="/pharmacy/analytics" className="view-all-link">View detailed analytics →</a>
    </div>
  );

  const QuickActionsCard = () => (
    <div className="dashboard-card quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        <button className="action-button primary">
          <FaPrescriptionBottleAlt /> Process Prescription
        </button>
        <button className="action-button">
          <FaPills /> Check Inventory
        </button>
        <button className="action-button">
          <FaBoxOpen /> Place Order
        </button>
        <button className="action-button">
          <FaFileInvoiceDollar /> Billing
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
        <div className="pharmacy-dashboard-container">
          <div className="welcome-banner">
            <div>
              <h1>Pharmacy Dashboard</h1>
              <p>You have {todayOrders.length} orders to process today</p>
            </div>
            <div className="notification-bell">
              <FaBell />
              <span className="notification-count">2</span>
            </div>
          </div>

          <div className="dashboard-main-content">
            <div className="dashboard-column">
              <TodayOrdersCard orders={todayOrders} />
              <RecentPrescriptionsCard prescriptions={recentPrescriptions} />
            </div>

            <div className="dashboard-column">
              <PharmacyStatsCard stats={pharmacyStats} />
              <PendingTasksCard tasks={pendingTasks} />
              <QuickActionsCard />
            </div>
          </div>

          <div className="pharmacy-updates-section">
            <h2>Pharmacy Updates & Alerts</h2>
            <div className="updates-grid">
              <div className="update-card important">
                <h3>Drug Recall Notice</h3>
                <p>Lot #PH123 of MedicationX has been recalled due to packaging issues.</p>
                <a href="#" className="read-more">Details</a>
              </div>
              <div className="update-card">
                <h3>New Generic Available</h3>
                <p>Generic version of BrandMed now available at 40% lower cost.</p>
                <a href="#" className="read-more">View Formulary</a>
              </div>
              <div className="update-card">
                <h3>Insurance Updates</h3>
                <p>New coverage policies from Medicare Part D effective July 1st.</p>
                <a href="#" className="read-more">Review Changes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PharmacyDashboard;