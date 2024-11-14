// Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, API_ENDPOINTS, ApiResponse } from '../../services/api/api.config';
import { cookieService } from '../../shared/services/cookie.service';
import '../../styles/Login.css';
import { useAuth } from '../../contexts/AuthContext';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        phoneNumber: string | null;
        address: string | null;
        birthDate: string | null;
    }
}

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
            const response = await axios.post<ApiResponse<LoginResponse>>(
                `${BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
                {
                    email: email.trim(),
                    password: password
                }
            );

            if (response.data.success && response.data.data) {
                const { token, user } = response.data.data;
                
                // Lưu token với prefix "Bearer "
                cookieService.set('authToken', `Bearer ${token}`);
                
                // Lưu user data và cập nhật context
                const userData = {
                    ...user,
                    phoneNumber: user.phoneNumber || null,
                    address: user.address || null,
                    birthDate: user.birthDate || null
                };
                
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);

                navigate('/');
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Đăng nhập thất bại. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                {/* Left side - Illustration */}
                <div className="illustration-side">
                    <div className="logo">Logo</div>
                    <img 
                        src="../../../images/image/background_login.gif" 
                        alt="Exercise" 
                        className="exercise-illustration"
                    />
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