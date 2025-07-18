import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Admin.css';

function Reports() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('cases');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [reportData, setReportData] = useState(null);

  const crumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Reports', path: '/admin/reports' }
  ];

  useEffect(() => {
    // Simulate API call to fetch report data
    const fetchReportData = async () => {
      // Mock data for demonstration
      const mockData = {
        cases: [
          {
            id: 1,
            patient: 'John Doe',
            caseNumber: 'C-2023-001',
            diagnosis: 'Hypertension',
            treatment: 'Lisinopril 10mg daily',
            attendingStaff: 'Dr. Sarah Chen',
            admissionDate: '2023-05-10',
            dischargeDate: '2023-05-15',
            status: 'Discharged'
          },
          {
            id: 2,
            patient: 'Mary Johnson',
            caseNumber: 'C-2023-002',
            diagnosis: 'Type 2 Diabetes',
            treatment: 'Metformin 500mg twice daily',
            attendingStaff: 'Dr. Robert Kim',
            admissionDate: '2023-05-12',
            dischargeDate: '',
            status: 'Admitted'
          },
          {
            id: 3,
            patient: 'David Wilson',
            caseNumber: 'C-2023-003',
            diagnosis: 'Pneumonia',
            treatment: 'Amoxicillin 500mg every 8 hours',
            attendingStaff: 'Dr. Lisa Wong',
            admissionDate: '2023-05-05',
            dischargeDate: '2023-05-12',
            status: 'Discharged'
          }
        ],
        drugs: [
          {
            id: 1,
            name: 'Lisinopril',
            category: 'Antihypertensive',
            quantity: 1250,
            unit: 'tablets',
            lastRestocked: '2023-05-01',
            costPerUnit: 0.35
          },
          {
            id: 2,
            name: 'Metformin',
            category: 'Antidiabetic',
            quantity: 980,
            unit: 'tablets',
            lastRestocked: '2023-05-03',
            costPerUnit: 0.28
          },
          {
            id: 3,
            name: 'Amoxicillin',
            category: 'Antibiotic',
            quantity: 750,
            unit: 'capsules',
            lastRestocked: '2023-04-28',
            costPerUnit: 0.42
          },
          {
            id: 4,
            name: 'Ibuprofen',
            category: 'NSAID',
            quantity: 1500,
            unit: 'tablets',
            lastRestocked: '2023-05-10',
            costPerUnit: 0.15
          }
        ],
        patients: [
          {
            id: 1,
            name: 'Mary Johnson',
            admissionDate: '2023-05-12',
            ward: 'B-205',
            primaryDiagnosis: 'Type 2 Diabetes',
            attendingPhysician: 'Dr. Robert Kim',
            status: 'Admitted'
          },
          {
            id: 2,
            name: 'James Smith',
            admissionDate: '2023-05-14',
            ward: 'A-102',
            primaryDiagnosis: 'Fractured femur',
            attendingPhysician: 'Dr. Andrew Lee',
            status: 'Admitted'
          },
          {
            id: 3,
            name: 'Emma Davis',
            admissionDate: '2023-05-08',
            ward: 'C-304',
            primaryDiagnosis: 'Pneumonia',
            attendingPhysician: 'Dr. Sarah Chen',
            status: 'Admitted'
          }
        ],
        finances: {
          income: [
            { category: 'Consultations', amount: 12500 },
            { category: 'Lab Tests', amount: 8200 },
            { category: 'Procedures', amount: 18750 },
            { category: 'Pharmacy', amount: 9350 }
          ],
          expenses: [
            { category: 'Staff Salaries', amount: 28500 },
            { category: 'Medications', amount: 7500 },
            { category: 'Equipment', amount: 12000 },
            { category: 'Facilities', amount: 8500 }
          ],
          netProfit: 14800
        },
        statistics: {
          totalCases: 42,
          totalPatients: 28,
          averageStay: 4.2,
          mostCommonDiagnosis: 'Hypertension'
        }
      };
      setReportData(mockData);
    };

    fetchReportData();
  }, [dateRange]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Current';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTabContent = () => {
    if (!reportData) return <div className="loading">Loading report data...</div>;

    switch (activeTab) {
      case 'cases':
        return (
          <div className="report-section">
            <h2>Cases Treated ({reportData.cases.length})</h2>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Case #</th>
                    <th>Patient</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Attending Staff</th>
                    <th>Admission Date</th>
                    <th>Discharge Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.cases.map(caseItem => (
                    <tr key={caseItem.id}>
                      <td>{caseItem.caseNumber}</td>
                      <td>{caseItem.patient}</td>
                      <td>{caseItem.diagnosis}</td>
                      <td>{caseItem.treatment}</td>
                      <td>{caseItem.attendingStaff}</td>
                      <td>{formatDate(caseItem.admissionDate)}</td>
                      <td>{formatDate(caseItem.dischargeDate)}</td>
                      <td>
                        <span className={`status-badge ${caseItem.status.toLowerCase()}`}>
                          {caseItem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'drugs':
        return (
          <div className="report-section">
            <h2>Available Drugs Inventory</h2>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Drug Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Last Restocked</th>
                    <th>Unit Cost</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.drugs.map(drug => (
                    <tr key={drug.id}>
                      <td>{drug.name}</td>
                      <td>{drug.category}</td>
                      <td>{drug.quantity.toLocaleString()}</td>
                      <td>{drug.unit}</td>
                      <td>{formatDate(drug.lastRestocked)}</td>
                      <td>${drug.costPerUnit.toFixed(2)}</td>
                      <td>${(drug.quantity * drug.costPerUnit).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="report-section">
            <h2>Admitted Patients ({reportData.patients.length})</h2>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Admission Date</th>
                    <th>Ward</th>
                    <th>Primary Diagnosis</th>
                    <th>Attending Physician</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.patients.map(patient => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{formatDate(patient.admissionDate)}</td>
                      <td>{patient.ward}</td>
                      <td>{patient.primaryDiagnosis}</td>
                      <td>{patient.attendingPhysician}</td>
                      <td>
                        <span className={`status-badge ${patient.status.toLowerCase()}`}>
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'finances':
        return (
          <div className="report-section">
            <h2>Financial Report</h2>
            <div className="finance-grid">
              <div className="finance-card income">
                <h3>Income</h3>
                <table className="finance-table">
                  <tbody>
                    {reportData.finances.income.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="total">
                      <td>Total Income</td>
                      <td>${reportData.finances.income.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="finance-card expenses">
                <h3>Expenses</h3>
                <table className="finance-table">
                  <tbody>
                    {reportData.finances.expenses.map((item, index) => (
                      <tr key={index}>
                        <td>{item.category}</td>
                        <td>${item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="total">
                      <td>Total Expenses</td>
                      <td>${reportData.finances.expenses.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="finance-summary">
                <div className="summary-card">
                  <h3>Net Profit/Loss</h3>
                  <div className={`net-amount ${reportData.finances.netProfit >= 0 ? 'positive' : 'negative'}`}>
                    ${Math.abs(reportData.finances.netProfit).toLocaleString()}
                    <span>{reportData.finances.netProfit >= 0 ? 'Profit' : 'Loss'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'statistics':
        return (
          <div className="report-section">
            <h2>Key Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{reportData.statistics.totalCases}</div>
                <div className="stat-label">Total Cases Treated</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{reportData.statistics.totalPatients}</div>
                <div className="stat-label">Total Patients</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{reportData.statistics.averageStay}</div>
                <div className="stat-label">Average Stay (days)</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{reportData.statistics.mostCommonDiagnosis}</div>
                <div className="stat-label">Most Common Diagnosis</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>
      <div className="scrollable-content">
        <div className="reports-page">
          <div className="reports-header">
            <h1>System Reports</h1>
            <div className="report-controls">
              <select 
                className="date-range-selector"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="thisQuarter">This Quarter</option>
                <option value="thisYear">This Year</option>
              </select>
              <button className="export-button">
                Export Report
              </button>
            </div>
          </div>

          <div className="report-tabs">
            <button 
              className={`tab-button ${activeTab === 'cases' ? 'active' : ''}`}
              onClick={() => setActiveTab('cases')}
            >
              Cases Treated
            </button>
            <button 
              className={`tab-button ${activeTab === 'drugs' ? 'active' : ''}`}
              onClick={() => setActiveTab('drugs')}
            >
              Drugs Inventory
            </button>
            <button 
              className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
            >
              Admitted Patients
            </button>
            <button 
              className={`tab-button ${activeTab === 'finances' ? 'active' : ''}`}
              onClick={() => setActiveTab('finances')}
            >
              Financials
            </button>
            <button 
              className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
              onClick={() => setActiveTab('statistics')}
            >
              Statistics
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </MainLayout>
  );
}

export default Reports;