import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { RegisterData } from '../../models/user';
import '../../styles/Register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterData>({
        email: '',
        password: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        birthDate: ''
    });
    const [retypePassword, setRetypePassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        // Validate required fields
        if (!formData.email || !formData.password || !formData.fullName) {
            setError("Email, password and fullName are required");
            return;
        }

        if (formData.password !== retypePassword) {
            setError("Passwords don't match");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Invalid email format");
            return;
        }
        
        try {
            const response = await authService.register(formData);
            
            if (response.success) {
                navigate('/login', { 
                    state: { message: 'Registration successful. Please login.' } 
                });
            } else {
                setError(response.message || 'Registration failed. Please try again.');
            }
        } catch (error: any) {
            console.error('Register error:', error);
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                {/* Left side - Illustration */}
                <div className="illustration-side">
                    <div className="register-illustration">
                        <div className="animation-container">
                            <i className="fas fa-graduation-cap main-icon"></i>
                            <div className="floating-icons">
                                <i className="fas fa-dumbbell fitness-icon"></i>
                                <i className="fas fa-heart health-icon"></i>
                                <i className="fas fa-medal achievement-icon"></i>
                            </div>
                            <div className="circles">
                                <span className="circle"></span>
                                <span className="circle"></span>
                                <span className="circle"></span>
                            </div>
                        </div>
                    </div>
                    <div className="illustration-text">
                        <h3>Start Your Fitness Journey</h3>
                        <p>Transform your life with our professional training courses</p>
                    </div>
                </div>

                {/* Right side - Register Form */}
                <div className="login-form-side">
                    <div className="login-form-content">
                        <Link to="/login" className="back-link">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>

                        <h2>Create Your Account</h2>
                        <p className="subtitle">
                            Join our fitness community and access premium training courses
                        </p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Retype Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={retypePassword}
                                    onChange={(e) => setRetypePassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="login-btn">
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
