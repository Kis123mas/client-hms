import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Admin.css';

function AdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState(null);
  const [userRolesData, setUserRolesData] = useState([]);
  const [appointmentTrends, setAppointmentTrends] = useState([]);
  const [systemLoad, setSystemLoad] = useState([]);

  const crumbs = [{ label: 'Admin Dashboard' }];

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      // System statistics
      setStats({
        totalUsers: 1243,
        activeToday: 287,
        newThisWeek: 56,
        systemStatus: 'optimal',
        storageUsage: 65,
        appointmentsToday: 142,
        prescriptionsProcessed: 89,
        avgResponseTime: '1.2s',
        errorRate: '0.8%'
      });

      // User roles distribution (for pie chart)
      setUserRolesData([
        { name: 'Doctors', value: 35, color: '#3498db' },
        { name: 'Nurses', value: 28, color: '#9b59b6' },
        { name: 'Reception', value: 18, color: '#2ecc71' },
        { name: 'Lab Techs', value: 12, color: '#f1c40f' },
        { name: 'Admins', value: 7, color: '#e74c3c' }
      ]);

      // Appointment trends (for line chart)
      setAppointmentTrends([
        { day: 'Mon', appointments: 120, online: 45 },
        { day: 'Tue', appointments: 145, online: 62 },
        { day: 'Wed', appointments: 98, online: 38 },
        { day: 'Thu', appointments: 167, online: 74 },
        { day: 'Fri', appointments: 132, online: 58 },
        { day: 'Sat', appointments: 75, online: 25 },
        { day: 'Sun', appointments: 42, online: 15 }
      ]);

      // System load data (for area chart)
      setSystemLoad([
        { time: '00:00', load: 25 },
        { time: '04:00', load: 18 },
        { time: '08:00', load: 65 },
        { time: '12:00', load: 78 },
        { time: '16:00', load: 72 },
        { time: '20:00', load: 45 },
        { time: '24:00', load: 30 }
      ]);
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!stats) return <div className="loading">Loading dashboard data...</div>;

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>
      <div className="scrollable-content">
        <div className="admin-dashboard">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1>System Administration</h1>
            <div className="system-status">
              <span className={`status-indicator ${stats.systemStatus}`}></span>
              <span>System Status: <strong>{stats.systemStatus.charAt(0).toUpperCase() + stats.systemStatus.slice(1)}</strong></span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">{stats.totalUsers}</div>
              <div className="metric-label">Total Users</div>
              <div className="metric-trend up">↑ 12% this month</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{stats.activeToday}</div>
              <div className="metric-label">Active Today</div>
              <div className="metric-trend up">↑ 5% from yesterday</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{stats.appointmentsToday}</div>
              <div className="metric-label">Today's Appointments</div>
              <div className="metric-trend up">↑ 8% from average</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{stats.avgResponseTime}</div>
              <div className="metric-label">Avg Response Time</div>
              <div className="metric-trend down">↓ 15% from last week</div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="charts-row">
            {/* User Roles Pie Chart */}
            <div className="dashboard-card chart-card">
              <div className="card-header">
                <h2>User Roles Distribution</h2>
                <select className="time-selector">
                  <option>Current</option>
                  <option>Last Month</option>
                  <option>Last Quarter</option>
                </select>
              </div>
              <div className="pie-chart-container">
                <div className="pie-chart">
                  {userRolesData.map((role, index) => {
                    const angle = (role.value / 100) * 360;
                    const rotation = userRolesData.slice(0, index).reduce((acc, curr) => acc + (curr.value / 100) * 360, 0);
                    return (
                      <div 
                        key={role.name}
                        className="pie-segment"
                        style={{
                          backgroundColor: role.color,
                          transform: `rotate(${rotation}deg)`,
                          clipPath: `polygon(50% 50%, 50% 0%, ${angle > 180 ? '100% 0%, 100% 100%, 50% 100%' : '100% 0%'})`
                        }}
                      ></div>
                    );
                  })}
                </div>
                <div className="pie-legend">
                  {userRolesData.map(role => (
                    <div key={role.name} className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: role.color }}></span>
                      <span className="legend-label">{role.name}</span>
                      <span className="legend-value">{role.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Trends Line Chart */}
            <div className="dashboard-card chart-card">
              <div className="card-header">
                <h2>Appointment Trends</h2>
                <select className="time-selector">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="line-chart-container">
                <div className="line-chart">
                  <div className="y-axis">
                    {[0, 50, 100, 150, 200].map(val => (
                      <div key={val} className="y-tick">{val}</div>
                    ))}
                  </div>
                  <div className="chart-area">
                    <div className="grid-lines">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="grid-line"></div>
                      ))}
                    </div>
                    <div className="data-line total">
                      {appointmentTrends.map((day, i) => (
                        <div 
                          key={day.day}
                          className="data-point"
                          style={{
                            left: `${(i / (appointmentTrends.length - 1)) * 100}%`,
                            bottom: `${(day.appointments / 200) * 100}%`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="data-line online">
                      {appointmentTrends.map((day, i) => (
                        <div 
                          key={day.day}
                          className="data-point"
                          style={{
                            left: `${(i / (appointmentTrends.length - 1)) * 100}%`,
                            bottom: `${(day.online / 200) * 100}%`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="x-axis">
                      {appointmentTrends.map(day => (
                        <div key={day.day} className="x-tick">{day.day}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="line-legend">
                  <div className="legend-item">
                    <span className="legend-line total"></span>
                    <span>Total Appointments</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-line online"></span>
                    <span>Online Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="charts-row">
            {/* System Load Area Chart */}
            <div className="dashboard-card chart-card">
              <div className="card-header">
                <h2>System Load (24h)</h2>
                <select className="time-selector">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Week Average</option>
                </select>
              </div>
              <div className="area-chart-container">
                <div className="area-chart">
                  <div className="y-axis">
                    {[0, 25, 50, 75, 100].map(val => (
                      <div key={val} className="y-tick">{val}%</div>
                    ))}
                  </div>
                  <div className="chart-area">
                    <div className="grid-lines">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="grid-line"></div>
                      ))}
                    </div>
                    <div className="area-path">
                      {systemLoad.map((point, i) => (
                        <div 
                          key={point.time}
                          className="area-point"
                          style={{
                            left: `${(i / (systemLoad.length - 1)) * 100}%`,
                            bottom: `${point.load}%`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="x-axis">
                      {systemLoad.filter((_, i) => i % 2 === 0).map(point => (
                        <div key={point.time} className="x-tick">{point.time}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="area-legend">
                  <div className="legend-item">
                    <span className="legend-color"></span>
                    <span>Server Load Percentage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescription Status Bar Chart */}
            <div className="dashboard-card chart-card">
              <div className="card-header">
                <h2>Prescription Status</h2>
                <select className="time-selector">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="bar-chart-container">
                <div className="bar-chart">
                  <div className="y-axis">
                    {[0, 25, 50, 75, 100].map(val => (
                      <div key={val} className="y-tick">{val}</div>
                    ))}
                  </div>
                  <div className="chart-area">
                    <div className="grid-lines">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid-line"></div>
                      ))}
                    </div>
                    <div className="bars">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                        <div key={day} className="bar-group">
                          <div 
                            className="bar prescribed"
                            style={{ height: `${Math.random() * 70 + 30}%` }}
                          ></div>
                          <div 
                            className="bar filled"
                            style={{ height: `${Math.random() * 60 + 20}%` }}
                          ></div>
                          <div className="x-tick">{day}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bar-legend">
                  <div className="legend-item">
                    <span className="legend-bar prescribed"></span>
                    <span>Prescribed</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-bar filled"></span>
                    <span>Filled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="metrics-grid secondary">
            <div className="metric-card">
              <div className="metric-icon">💾</div>
              <div className="metric-value">{stats.storageUsage}%</div>
              <div className="metric-label">Storage Used</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⚡</div>
              <div className="metric-value">{stats.avgResponseTime}</div>
              <div className="metric-label">Avg Response</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⚠️</div>
              <div className="metric-value">{stats.errorRate}</div>
              <div className="metric-label">Error Rate</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">📋</div>
              <div className="metric-value">{stats.prescriptionsProcessed}</div>
              <div className="metric-label">Rx Processed</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;