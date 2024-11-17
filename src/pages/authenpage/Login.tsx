// Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import '../../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await login({ email: email.trim(), password });
            if (response) {
                navigate('/');
            }
        } catch (error: any) {
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
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