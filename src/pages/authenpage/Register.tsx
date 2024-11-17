import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service'; // Import hàm register từ dịch vụ
import '../../styles/Register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
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
        
        if (formData.password !== retypePassword) {
            setError("Passwords don't match");
            return;
        }
        
        try {
            await register(formData); // Gọi hàm register
            navigate('/login');
        } catch (error) {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                {/* Left side - Illustration */}
                <div className="illustration-side">
                    <div className="logo">Logo</div>
                    <img 
                        src="/path-to-your-tree-illustration.png" 
                        alt="Nature" 
                        className="nature-illustration"
                    />
                </div>

                {/* Right side - Register Form */}
                <div className="login-form-side">
                    <div className="login-form-content">
                        <Link to="/login" className="back-link">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>

                        <h2>Account Signup</h2>
                        <p className="subtitle">
                            Become a member and enjoy exclusive promotions.
                        </p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    name="name"
                                    value={formData.name}
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
