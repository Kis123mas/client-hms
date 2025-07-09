import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TopNav from '../../components/topNav/TopNav';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiCalendar,
  FiAward,
  FiShield,
  FiDroplet,
  FiHeart
} from 'react-icons/fi';
import './Profile.css';

function Profile() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const crumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' }
  ];

  const profile = {
    id: "HOS-EMP-2023-0425",
    avatar: "/profile.png",
    fullName: "Dr. Sarah Johnson",
    gender: "Female",
    dateOfBirth: "1982-11-15",
    maritalStatus: "Married",
    nationality: "USA",
    role: "Senior Cardiologist",
    department: "Cardiology",
    email: "s.johnson@cityhospital.org",
    phone: "+1 (555) 987-6543",
    address: "123 Medical Drive, Cityville",
    joinDate: "15/03/2015",
    license: "MD-78945612",
    bloodType: "A+",
    emergencyContact: "Michael Johnson (Spouse) - +1 (555) 123-4567",
    specialization: "Interventional Cardiology",
    education: [
      "MD - Harvard Medical School",
      "Residency - City General Hospital"
    ],
    insurance: "MediCare Plus",
    primaryPhysician: "Dr. Robert Chen",
    lastVisit: "15/06/2023"
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const isPatient = profile.role.toLowerCase().includes('patient');

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>

      <div className="scrollable-content">
        <div className="profile-container">
          {/* Overview */}
          <div className="profile-overview">
            <img src={profile.avatar} alt="Avatar" className="profile-avatar" />
            <div className="profile-overview-details">
              <h2>{profile.fullName}</h2>
              <p>{profile.role} - {profile.department}</p>
              <div className="overview-contact">
                <span><FiMail /> {profile.email}</span>
                <span><FiPhone /> {profile.phone}</span>
              </div>
              <span className="user-id">ID: {profile.id}</span>
            </div>
            <button className="btn-edit"><FiEdit /> Edit Profile</button>
          </div>

          <div className="profile-grid">
            {/* Personal Info */}
            <div className="profile-card">
              <h3>Personal Information</h3>
              <ul>
                <li><strong>Gender:</strong> {profile.gender}</li>
                <li><strong>Date of Birth:</strong> {profile.dateOfBirth}</li>
                <li><strong>Marital Status:</strong> {profile.maritalStatus}</li>
                <li><strong>Nationality:</strong> {profile.nationality}</li>
                <li><strong>Address:</strong> {profile.address}</li>
              </ul>
            </div>

            {/* Role Specific */}
            <div className="profile-card">
              <h3>{isPatient ? 'Medical Information' : 'Professional Information'}</h3>
              <ul>
                {isPatient ? (
                  <>
                    <li><strong>Blood Type:</strong> {profile.bloodType}</li>
                    <li><strong>Insurance:</strong> {profile.insurance}</li>
                    <li><strong>Primary Physician:</strong> {profile.primaryPhysician}</li>
                    <li><strong>Last Visit:</strong> {profile.lastVisit}</li>
                  </>
                ) : (
                  <>
                    <li><strong>Specialization:</strong> {profile.specialization}</li>
                    <li><strong>License No:</strong> {profile.license}</li>
                    <li><strong>Join Date:</strong> {profile.joinDate}</li>
                    <li><strong>Education:</strong>
                      <ul className="nested-list">
                        {profile.education.map((edu, idx) => <li key={idx}>{edu}</li>)}
                      </ul>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="profile-card emergency-card">
            <h3>Emergency Contact</h3>
            <p>{profile.emergencyContact}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;