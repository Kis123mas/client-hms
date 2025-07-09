import React, { useState, useEffect } from 'react';
import './TestResult.css';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import MainLayout from '../../layouts/MainLayout';

const TestResult = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [testTypes, setTestTypes] = useState([]);
    const crumbs = [{ label: 'Dashboard' }];
    const [formData, setFormData] = useState({
        testRequestId: '',
        patientId: '',
        doctorId: '',
        testType: '',
        testPrice: '',
        results: '',
        notes: '',
        labTechName: 'Lab Technician Name' // Should be populated from auth context
    });

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Mock data fetch
    useEffect(() => {
        setLoading(true);
        // Simulate API calls
        setTimeout(() => {
            // Test results data
            setTestResults([
                {
                    id: 'TRES-001',
                    testRequestId: 'TR-2023-001',
                    patientName: 'John Doe',
                    patientId: 'PT-1001',
                    doctorName: 'Dr. Smith',
                    testType: 'Complete Blood Count',
                    testPrice: 45.00,
                    date: '2023-05-20',
                    labTechName: 'Sarah Johnson',
                    status: 'sent',
                    file: 'blood_test_results.pdf'
                },
                {
                    id: 'TRES-002',
                    testRequestId: 'TR-2023-002',
                    patientName: 'Jane Smith',
                    patientId: 'PT-1002',
                    doctorName: 'Dr. Johnson',
                    testType: 'Lipid Profile',
                    testPrice: 65.50,
                    date: '2023-05-21',
                    labTechName: 'Michael Chen',
                    status: 'sent',
                    file: 'lipid_profile_results.pdf'
                }
            ]);

            // Doctors data
            setDoctors([
                { id: 'DOC-001', name: 'Dr. Smith' },
                { id: 'DOC-002', name: 'Dr. Johnson' }
            ]);

            // Patients data
            setPatients([
                { id: 'PT-1001', name: 'John Doe' },
                { id: 'PT-1002', name: 'Jane Smith' }
            ]);

            // Test types with standard prices (can be overridden)
            setTestTypes([
                { name: 'Complete Blood Count', standardPrice: 45.00 },
                { name: 'Lipid Profile', standardPrice: 65.50 },
                { name: 'Liver Function Test', standardPrice: 55.00 },
                { name: 'Thyroid Panel', standardPrice: 75.00 },
                { name: 'Hemoglobin A1C', standardPrice: 35.00 },
                { name: 'Urinalysis', standardPrice: 25.00 }
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTestTypeChange = (e) => {
        const selectedTest = testTypes.find(test => test.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            testType: e.target.value,
            testPrice: selectedTest ? selectedTest.standardPrice : ''
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // In a real app, this would upload the file and submit to backend
        setTimeout(() => {
            const newResult = {
                id: `TRES-${testResults.length + 1}`,
                testRequestId: formData.testRequestId,
                patientName: patients.find(p => p.id === formData.patientId)?.name || '',
                patientId: formData.patientId,
                doctorName: doctors.find(d => d.id === formData.doctorId)?.name || '',
                testType: formData.testType,
                testPrice: parseFloat(formData.testPrice),
                date: new Date().toISOString().split('T')[0],
                labTechName: formData.labTechName,
                results: formData.results,
                status: 'sent',
                file: selectedFile?.name || 'results.pdf'
            };

            setTestResults([newResult, ...testResults]);
            resetForm();
            setLoading(false);
        }, 1500);
    };

    const resetForm = () => {
        setFormData({
            testRequestId: '',
            patientId: '',
            doctorId: '',
            testType: '',
            testPrice: '',
            results: '',
            notes: '',
            labTechName: 'Lab Technician Name'
        });
        setSelectedFile(null);
        setShowForm(false);
    };

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>
            <div className="scrollable-content">
                <div className="test-results-container">
                    <div className="header-section">
                        <h2>Test Results Management</h2>
                        <button
                            className="add-result-btn"
                            onClick={() => setShowForm(true)}
                        >
                            + Add Test Result
                        </button>
                    </div>

                    {showForm && (
                        <div className="result-form-container">
                            <div className="result-form-card">
                                <div className="form-header">
                                    <h3>Record Test Results</h3>
                                    <button className="close-btn" onClick={resetForm}>×</button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Test Request ID</label>
                                        <input
                                            type="text"
                                            name="testRequestId"
                                            value={formData.testRequestId}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Patient</label>
                                            <select
                                                name="patientId"
                                                value={formData.patientId}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Patient</option>
                                                {patients.map(patient => (
                                                    <option key={patient.id} value={patient.id}>
                                                        {patient.name} ({patient.id})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Doctor</label>
                                            <select
                                                name="doctorId"
                                                value={formData.doctorId}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Doctor</option>
                                                {doctors.map(doctor => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Test Type</label>
                                            <select
                                                name="testType"
                                                value={formData.testType}
                                                onChange={handleTestTypeChange}
                                                required
                                            >
                                                <option value="">Select Test Type</option>
                                                {testTypes.map(test => (
                                                    <option key={test.name} value={test.name}>
                                                        {test.name} (${test.standardPrice})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Test Price ($)</label>
                                            <input
                                                type="number"
                                                name="testPrice"
                                                value={formData.testPrice}
                                                onChange={handleInputChange}
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Results Summary</label>
                                        <textarea
                                            name="results"
                                            value={formData.results}
                                            onChange={handleInputChange}
                                            required
                                            rows="4"
                                            placeholder="Enter test findings and interpretation..."
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Notes</label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="Additional comments or special instructions..."
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Upload Results File</label>
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.jpg,.png"
                                                required
                                            />
                                            <small>Accepted formats: PDF, DOC, JPG, PNG</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Lab Technician</label>
                                            <input
                                                type="text"
                                                name="labTechName"
                                                value={formData.labTechName}
                                                onChange={handleInputChange}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="submit-btn"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner"></span> Sending...
                                                </>
                                            ) : (
                                                'Send Results'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="results-list">
                        <h3>Sent Test Results</h3>
                        {loading && testResults.length === 0 ? (
                            <div className="loading">Loading test results...</div>
                        ) : testResults.length === 0 ? (
                            <div className="no-results">No test results found</div>
                        ) : (
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Result ID</th>
                                            <th>Patient</th>
                                            <th>Doctor</th>
                                            <th>Test Type</th>
                                            <th>Price ($)</th>
                                            <th>Date</th>
                                            <th>Lab Tech</th>
                                            <th>File</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testResults.map(result => (
                                            <tr key={result.id}>
                                                <td>{result.id}</td>
                                                <td>{result.patientName} ({result.patientId})</td>
                                                <td>{result.doctorName}</td>
                                                <td>{result.testType}</td>
                                                <td>{result.testPrice.toFixed(2)}</td>
                                                <td>{result.date}</td>
                                                <td>{result.labTechName}</td>
                                                <td>
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        alert(`Would download ${result.file}`);
                                                    }}>
                                                        {result.file}
                                                    </a>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${result.status}`}>
                                                        {result.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TestResult;