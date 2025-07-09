import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();

  const paymentDetails = {
    patient: "Jane Doe",
    id: "PAT-2024-0087",
    services: [
      { name: "Consultation", cost: 10000 },
      { name: "Blood Test", cost: 5000 },
      { name: "Malaria Treatment", cost: 15000 },
      { name: "Hypertension Monitoring", cost: 15000 }
    ],
    total: 45000,
    status: "Pending"
  };

  const handlePayment = () => {
    alert('Payment successful!');
    navigate('/patient-health');
  };

  const crumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Payment', path: '/payment' }
  ];

  return (
    <MainLayout>
      <div className="fixed-header">
        <TopNav />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        <div className="payment-page-container">
          <div className="payment-card">
            <h2>Payment for: {paymentDetails.patient}</h2>
            <p className="payment-id">ID: {paymentDetails.id}</p>

            <h4>Services</h4>
            <ul className="payment-service-list">
              {paymentDetails.services.map((service, index) => (
                <li key={index}>
                  <span>{service.name}</span>
                  <span>₦{service.cost.toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <div className="payment-total">
              <strong>Total:</strong> ₦{paymentDetails.total.toLocaleString()}
            </div>

            <button className="pay-button" onClick={handlePayment}>Pay Now</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Payment;
