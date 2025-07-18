import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import BreadCrums from '../../components/breadcrums/BreadCrums';
import TopNav from '../../components/topNav/TopNav';
import './Admin.css';

function UserManagement() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'doctor',
    status: 'active'
  });

  const crumbs = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'User Management', path: '/admin/users' }
  ];

  useEffect(() => {
    // Simulate API call to fetch users
    const fetchUsers = async () => {
      const mockUsers = [
        { id: 1, name: 'Dr. Sarah Chen', email: 's.chen@hospital.com', role: 'doctor', lastActive: 'Active now', status: 'active', avatar: 'SC' },
        { id: 2, name: 'Nurse Mark Williams', email: 'm.williams@hospital.com', role: 'nurse', lastActive: '15 mins ago', status: 'active', avatar: 'MW' },
        { id: 3, name: 'Receptionist Amy Davis', email: 'a.davis@hospital.com', role: 'receptionist', lastActive: '1 hour ago', status: 'active', avatar: 'AD' },
        { id: 4, name: 'Dr. Robert Kim', email: 'r.kim@hospital.com', role: 'doctor', lastActive: '2 days ago', status: 'inactive', avatar: 'RK' },
        { id: 5, name: 'Lab Tech James Wilson', email: 'j.wilson@hospital.com', role: 'labtech', lastActive: 'Yesterday', status: 'active', avatar: 'JW' },
        { id: 6, name: 'Admin Michael Brown', email: 'm.brown@hospital.com', role: 'admin', lastActive: 'Active now', status: 'active', avatar: 'MB' },
        { id: 7, name: 'Dr. Lisa Wong', email: 'l.wong@hospital.com', role: 'doctor', lastActive: '3 hours ago', status: 'active', avatar: 'LW' },
        { id: 8, name: 'Nurse Olivia Martinez', email: 'o.martinez@hospital.com', role: 'nurse', lastActive: '30 mins ago', status: 'active', avatar: 'OM' },
        { id: 9, name: 'Pharmacist David Lee', email: 'd.lee@hospital.com', role: 'pharmacist', lastActive: '1 day ago', status: 'inactive', avatar: 'DL' },
        { id: 10, name: 'Receptionist Emma Johnson', email: 'e.johnson@hospital.com', role: 'receptionist', lastActive: 'Active now', status: 'active', avatar: 'EJ' },
        { id: 11, name: 'Dr. Andrew Smith', email: 'a.smith@hospital.com', role: 'doctor', lastActive: '4 hours ago', status: 'active', avatar: 'AS' },
        { id: 12, name: 'Nurse Sophia Garcia', email: 's.garcia@hospital.com', role: 'nurse', lastActive: '2 hours ago', status: 'active', avatar: 'SG' }
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, users]);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserObj = {
      id: users.length + 1,
      ...newUser,
      lastActive: 'Just now',
      avatar: newUser.name.split(' ').map(n => n[0]).join('')
    };
    setUsers([newUserObj, ...users]);
    setNewUser({
      name: '',
      email: '',
      role: 'doctor',
      status: 'active'
    });
    setShowAddUserModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const formatRole = (role) => {
    const roleMap = {
      doctor: 'Doctor',
      nurse: 'Nurse',
      receptionist: 'Receptionist',
      labtech: 'Lab Technician',
      pharmacist: 'Pharmacist',
      admin: 'Administrator'
    };
    return roleMap[role] || role;
  };

  return (
    <MainLayout isCollapsed={isSidebarCollapsed}>
      <div className="fixed-header">
        <TopNav onMenuClick={toggleSidebar} />
        <BreadCrums items={crumbs} />
      </div>
      <div className="scrollable-content">
        <div className="user-management">
          <div className="user-management-header">
            <h1>User Management</h1>
            <div className="user-actions">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>
              <button 
                className="add-user-button"
                onClick={() => setShowAddUserModal(true)}
              >
                + Add User
              </button>
            </div>
          </div>

          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Active</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">{user.avatar}</div>
                          <div className="user-name">{user.name}</div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{formatRole(user.role)}</td>
                      <td>{user.lastActive}</td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className={`status-toggle ${user.status}`}
                            onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="edit-button">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="add-user-modal">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button 
                className="close-modal"
                onClick={() => setShowAddUserModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="labtech">Lab Technician</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default UserManagement;