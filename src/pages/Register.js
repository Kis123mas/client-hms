import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './pages.css';
import Staticbutton from '../components/button/Staticbutton';
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-full">
        <div className="centered-content">
          <div className="form-header1">
            <h2 className="welcome-text">Create Account</h2>
            <p className="instruction-text">Join us to access all features</p>
          </div>
          
          <div className="register-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group with-icon">
                <label>Full Name</label>
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group with-icon">
                <label>Email Address</label>
                <div className="input-container">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-input"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group with-icon password-group">
                <label>Password</label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    className="form-input"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="form-group with-icon">
                <label>Confirm Password</label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="form-input"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-terms">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></label>
              </div>

              <Staticbutton type="submit" children='Register' />

              <div className="login-link">
                Already have an account? <a href="/login">Sign in</a>
              </div>
            </form>
          </div>
        </div>
        {/* <PoweredBy /> */}
      </div>
    </div>
  );
}

export default Register;