import MainLayout from '../../layouts/MainLayout';
import React, { useState } from 'react';
import TopNav from '../../components/topNav/TopNav';
import { useNavigate } from 'react-router-dom';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import { FiSearch, FiChevronDown, FiEye, FiX } from 'react-icons/fi';
import './patient.css';

function Patient() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [activeFilter] = useState('all');

    // Sample patient data
    const [patients] = useState([
        { id: 1, name: 'John Doe', age: 35, gender: 'Male', lastVisit: '2023-05-15', status: 'Active' },
        { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', lastVisit: '2023-05-10', status: 'Active' },
        { id: 3, name: 'Robert Johnson', age: 42, gender: 'Male', lastVisit: '2023-04-22', status: 'Inactive' },
        { id: 4, name: 'Emily Wilson', age: 31, gender: 'Female', lastVisit: '2023-05-12', status: 'Active' },
        { id: 5, name: 'Michael Brown', age: 56, gender: 'Male', lastVisit: '2023-03-30', status: 'Inactive' },
        { id: 6, name: 'Sarah Davis', age: 24, gender: 'Female', lastVisit: '2023-05-14', status: 'Active' },
        { id: 7, name: 'David Miller', age: 45, gender: 'Male', lastVisit: '2023-05-08', status: 'Active' },
        { id: 8, name: 'Lisa Taylor', age: 38, gender: 'Female', lastVisit: '2023-04-28', status: 'Inactive' },
        { id: 9, name: 'James Wilson', age: 50, gender: 'Male', lastVisit: '2023-05-01', status: 'Active' },
    ]);

    const crumbs = [
        { label: 'Dashboard', path: '/doctor' },
        { label: 'Patients' }
    ];

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedPatients = [...patients].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredPatients = sortedPatients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             patient.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             patient.status.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = activeFilter === 'all' || patient.status.toLowerCase() === activeFilter;
        
        return matchesSearch && matchesFilter;
    });

    const viewPatient = (patientId) => {
        console.log(`View patient ${patientId}`);
        // Add your view patient logic here
        navigate(`/doc/patient-emr`);
    };

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>

            <div className="scrollable-content">
                <div className="receptionist-container">
                    <div className="patient-header">
                        <h1 className="page-title">Patient Records</h1>
                        
                        <div className="patient-controls">
                            <div className="search-container">
                                <div className="search-input-wrapper">
                                    <FiSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search patients..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="search-input"
                                    />
                                    {searchTerm && (
                                        <button onClick={clearSearch} className="clear-search-btn">
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="patient-table-container">
                        <table className="patient-table">
                            <thead>
                                <tr>
                                    <th onClick={() => requestSort('name')}>
                                        <div className="table-header">
                                            Name
                                            <FiChevronDown className={`sort-icon ${sortConfig.key === 'name' ? 'active' : ''} ${sortConfig.direction === 'desc' ? 'flipped' : ''}`} />
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('age')}>
                                        <div className="table-header">
                                            Age
                                            <FiChevronDown className={`sort-icon ${sortConfig.key === 'age' ? 'active' : ''} ${sortConfig.direction === 'desc' ? 'flipped' : ''}`} />
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('gender')}>
                                        <div className="table-header">
                                            Gender
                                            <FiChevronDown className={`sort-icon ${sortConfig.key === 'gender' ? 'active' : ''} ${sortConfig.direction === 'desc' ? 'flipped' : ''}`} />
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('lastVisit')}>
                                        <div className="table-header">
                                            Last Visit
                                            <FiChevronDown className={`sort-icon ${sortConfig.key === 'lastVisit' ? 'active' : ''} ${sortConfig.direction === 'desc' ? 'flipped' : ''}`} />
                                        </div>
                                    </th>
                                    <th onClick={() => requestSort('status')}>
                                        <div className="table-header">
                                            Status
                                            <FiChevronDown className={`sort-icon ${sortConfig.key === 'status' ? 'active' : ''} ${sortConfig.direction === 'desc' ? 'flipped' : ''}`} />
                                        </div>
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.length === 0 ? (
                                    <tr className="no-results-row">
                                        <td colSpan="6">No patients found matching your search</td>
                                    </tr>
                                ) : (
                                    filteredPatients.map(patient => (
                                        <tr key={patient.id}>
                                            <td>{patient.name}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.gender}</td>
                                            <td>{new Date(patient.lastVisit).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`status-badge ${patient.status.toLowerCase()}`}>
                                                    {patient.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="view-btn"
                                                    onClick={() => viewPatient(patient.id)}
                                                >
                                                    <FiEye className="view-icon" /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Patient;