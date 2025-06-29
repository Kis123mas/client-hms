import MainLayout from '../../layouts/MainLayout';
import React, { useState } from 'react';
import SuccessModal from '../../components/successModal/Success';
import TopNav from '../../components/topNav/TopNav';
import './Receptionist.css';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import Staticbutton from '../../components/button/Staticbutton';
import { useNavigate } from 'react-router-dom';

function RegisterPatient() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        email: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        bloodGroup: '',
        allergies: '',
        medicalHistory: ''
    });

    const navigate = useNavigate();

    const crumbs = [
        { label: 'Receptionist', path: '/receptionist' },
        { label: 'Register Patient' }
    ];

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form validation could be added here
        console.log('Form submitted:', formData);
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Redirect after 1020ms
        setTimeout(() => {
            navigate('/receptionist');
        }, 1020);
    };

    return (
        <MainLayout isCollapsed={isSidebarCollapsed}>
            <div className="fixed-header">
                <TopNav onMenuClick={toggleSidebar} />
                <BreadCrums items={crumbs} />
            </div>
            <div className={`scrollable-content ${showSuccessModal ? 'blur-background' : ''}`}>
                <div className="receptionist-container">
                    <div className="patient-registration-form">
                        <div className="form-header">
                            <h2>Patient Registration Form</h2>
                            <p className="form-subtitle">Please complete all sections</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* Personal Information Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <div className="section-number">1</div>
                                    <div className="section-title">Personal Particulars</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>First Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Last Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Date of Birth <span className="required">*</span></label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Gender <span className="required">*</span></label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-field">
                                        <label>Phone Number <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="official-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <div className="section-number">2</div>
                                    <div className="section-title">Address Information</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-field full-width">
                                        <label>Street Address <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>City <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>State/Province <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Zip/Postal Code <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Country <span className="required">*</span></label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        >
                                            <option value="">-- Select Country --</option>
                                            <option value="US">United States</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="IN">India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <div className="section-number">3</div>
                                    <div className="section-title">Emergency Contact</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Full Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="emergencyContactName"
                                            value={formData.emergencyContactName}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Phone Number <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            name="emergencyContactPhone"
                                            value={formData.emergencyContactPhone}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Relationship <span className="required">*</span></label>
                                        <select
                                            name="emergencyContactRelation"
                                            value={formData.emergencyContactRelation}
                                            onChange={handleChange}
                                            required
                                            className="official-input"
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="spouse">Spouse</option>
                                            <option value="parent">Parent</option>
                                            <option value="child">Child</option>
                                            <option value="sibling">Sibling</option>
                                            <option value="friend">Friend</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Information Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <div className="section-number">4</div>
                                    <div className="section-title">Medical Information</div>
                                    <div className="section-divider"></div>
                                </div>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label>Blood Group</label>
                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            className="official-input"
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                    <div className="form-field">
                                        <label>Known Allergies</label>
                                        <input
                                            type="text"
                                            name="allergies"
                                            value={formData.allergies}
                                            onChange={handleChange}
                                            className="official-input"
                                        />
                                    </div>
                                    <div className="form-field full-width">
                                        <label>Medical History (Previous illnesses, surgeries, etc.)</label>
                                        <textarea
                                            name="medicalHistory"
                                            value={formData.medicalHistory}
                                            onChange={handleChange}
                                            rows="4"
                                            className="official-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-footer">
                                <div className="declaration">
                                    <p><strong>Declaration:</strong> I confirm that the information provided is accurate and complete to the best of my knowledge.</p>
                                </div>
                                <div className="booking-actions">
                                    <div className="button-group">
                                        <Staticbutton
                                            children="CANCEL"
                                            type="button"
                                        />
                                        <Staticbutton
                                            children="REGISTER"
                                            type="submit"
                                        />
                                    </div>
                                </div>
                                <div className="form-timestamp">
                                    <p>Form processed on: {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    message="Patient registered successfully!"
                    onClose={closeSuccessModal}
                />
            )}
        </MainLayout>
    );
}

export default RegisterPatient;