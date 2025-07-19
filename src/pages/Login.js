import React, { useEffect, useState } from 'react';
import Preloader from '../components/preloader/Preloader';
import './pages.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Staticbutton from '../components/button/Staticbutton';

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
            {/* Right Section - Form Panel (now full width) */}
            <div className="login-full">
                <div className="centered-content">
                    <div className="form-header1">
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
                                    required
                                />
                            </div>
                            <div className="form-group password-group">
                                <label>Password</label>
                                <div className="password-input-container">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter your password" 
                                        className="form-input"
                                        required
                                    />
                                    <span 
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <div className="form-options">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>
                                <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                            </div>
                            <Staticbutton children='Login' href="/rep/receptionist" />
                        </form>
                    </div>
                </div>
                {/* <PoweredBy /> */}
            </div>
        </div>
    );
}

export default Login;