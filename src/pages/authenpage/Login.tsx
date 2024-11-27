// Login.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import '../../styles/Login.css';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../models/user';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await authService.login({ 
                email: email.trim().toLowerCase(), 
                password 
            });

            console.log('Full server response:', response);

            if (response.success && response.data) {
                console.log('Response data:', response.data);
                console.log('User roles from response:', response.data.user.roles);

                const userData: User = {
                    email: response.data.user.email,
                    fullName: response.data.user.fullName,
                    phoneNumber: response.data.user.phoneNumber,
                    address: response.data.user.address,
                    roles: response.data.user.roles
                };

                // Lưu user data trước
                localStorage.setItem('user', JSON.stringify(userData));
                await setUser(userData); // Đảm bảo setUser hoàn thành

                // Kiểm tra role và navigate
                const hasAdminRole = Array.isArray(userData.roles) && 
                    userData.roles.some(role => 
                        typeof role === 'string' && 
                        role.toLowerCase() === 'admin'
                    );

                console.log('Role check:', {
                    roles: userData.roles,
                    hasAdminRole,
                    roleTypes: userData.roles?.map(r => typeof r)
                });

                if (hasAdminRole) {
                    console.log('Admin user detected, navigating to admin page');
                    // Sử dụng timeout để đảm bảo state đã được cập nhật
                    setTimeout(() => {
                        navigate('/admin', { replace: true });
                    }, 100);
                } else {
                    console.log('Regular user detected, navigating to home page');
                    navigate('/', { replace: true });
                }
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    // Kiểm tra nếu user đã đăng nhập và có role admin thì redirect
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.roles?.includes('admin')) {
                navigate('/admin', { replace: true });
            }
        }
    }, [navigate]);

    return (
        <div className="login-wrapper">
            <div className="login-container">
                {/* Left side - Illustration */}
                <div className="illustration-side">
                    <div className="login-illustration">
                        <div className="animation-container">
                            <i className="fas fa-user-circle user-icon"></i>
                            <div className="circles">
                                <span className="circle"></span>
                                <span className="circle"></span>
                                <span className="circle"></span>
                            </div>
                            <i className="fas fa-lock lock-icon"></i>
                        </div>
                    </div>
                    <div className="illustration-text">
                        <h3>Welcome Back!</h3>
                        <p>Your fitness journey continues here</p>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="login-form-side">
                    <div className="login-form-content">
                        <Link to="/" className="back-link">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>

                        <h2>Account Login</h2>
                        <p className="subtitle">
                            If you are already a member you can login with your email address and password.
                        </p>

                        {error && (
                            <div className="error-message" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

                            <button type="submit" className="login-btn">
                                Login
                            </button>
                        </form>

                        <div className="signup-link">
                            Don't have an account? <Link to="/register">Sign up here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;