import React, { useEffect, useState } from 'react';
import Preloader from '../components/preloader/Preloader';
import './pages.css';
import loginImage from '../assets/login.svg';
import hospitalLogo from '../assets/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Staticbutton from '../components/button/Staticbutton';
import PoweredBy from '../components/poweredBy/PoweredBy';

function Login() {
    const [loading, setLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(() => setFadeIn(true), 100);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Preloader loadingText="Loading Login..." />;
    }

    return (
        <div className={`login-container ${fadeIn ? 'fade-in' : ''}`}>
            {/* Left Section - Visual Panel */}
            <div className="login-half left-section">
                <div className="centered-content">
                    <div className="circle-container">
                        <div className="circle-background"></div>
                        <img 
                            src={loginImage} 
                            alt="Hospital Illustration" 
                            className="circle-image"
                        />
                    </div>
                </div>
                
            </div>

            {/* Right Section - Form Panel */}
            <div className="login-half right-section">
                <div className="centered-content">
                    <div className="form-header">
                        <img src={hospitalLogo} alt="Hospital Logo" className="form-logo" />
                        <h2 className="welcome-text">Welcome Back!</h2>
                        <p className="instruction-text">Please fill in your information to access your dashboard</p>
                    </div>
                    
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group password-group">
                                <label>Password</label>
                                <div className="password-input-container">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter your password" 
                                        className="form-input"
                                    />
                                    <span 
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <Staticbutton children='Login' />
                        </form>
                    </div>
                </div>
                <PoweredBy />
            </div>
        </div>
    );
}

export default Login;