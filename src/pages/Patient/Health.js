import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import { useNavigate } from 'react-router-dom';
import './Health.css';

function Health() {
    const healthData = {
        patientName: "Jane Doe",
        id: "PAT-2024-0087",
        history: [
            {
                title: "Malaria",
                status: "Resolved",
                treatedBy: "Dr. Smith",
                treatedOn: "2023-11-21"
            },
            {
                title: "Hypertension",
                status: "Ongoing",
                treatedBy: "Dr. Clark",
                treatedOn: "2024-05-05"
            }
        ],
        payment: {
            treatment: "Maleria",
            status: "Pending",
            amount: 45000,
            services: [
                { name: "Consultation", cost: 10000 },
                { name: "Blood Test", cost: 5000 },
                { name: "Malaria Treatment", cost: 15000 },
                { name: "Hypertension Monitoring", cost: 15000 }
            ]
        }
    };

    const crumbs = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Patient Health', path: '/patient-health' }
    ];

    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="fixed-header">
                <TopNav />
                <BreadCrums items={crumbs} />
            </div>

            <div className="scrollable-content">
                <div className="ph-wrapper">
                    <div className="ph-card">
                        <div className="ph-header">
                            <h2>Health Record: {healthData.patientName}</h2>
                            <span className="ph-id">ID: {healthData.id}</span>
                        </div>

                        <div className="ph-section">
                            <h3>Medical History</h3>
                            {healthData.history.length > 0 ? (
                                <div className="ph-grid">
                                    {healthData.history.map((item, idx) => (
                                        <div key={idx} className={`ph-history-item ${item.status.toLowerCase()}`}>
                                            <h4>{item.title}</h4>
                                            <p><strong>Payment Status:</strong> {item.status}</p>
                                            <p><strong>Doctor:</strong> {item.treatedBy}</p>
                                            <p><strong>Date:</strong> {item.treatedOn}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="ph-empty">No medical history available.</p>
                            )}
                        </div>

                        <div className="ph-section">
                            <h3>Payment Summary</h3>
                            <div className={`ph-payment-box ${healthData.payment.status.toLowerCase()}`}>
                                <p><strong>Undergoing:</strong> {healthData.payment.treatment}</p>
                                <p><strong>Payment Status:</strong> {healthData.payment.status}</p>
                                <p><strong>Amount:</strong> ₦{healthData.payment.amount.toLocaleString()}</p>
                                <div className="ph-service-list">
                                    <h4>Services Rendered:</h4>
                                    <ul>
                                        {healthData.payment.services.map((service, idx) => (
                                            <li key={idx}>{service.name} - ₦{service.cost.toLocaleString()}</li>
                                        ))}
                                    </ul>
                                </div>
                                {healthData.payment.status === 'Pending' && (
                                    <button
                                        className="ph-pay-btn"
                                        onClick={() => navigate('/pat/payment')}
                                    >
                                        Proceed to Payment
                                    </button>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Health;
