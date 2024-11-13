import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { AxiosError } from 'axios';
import '../../styles/Register.css';
import { BASE_URL, API_ENDPOINTS, ApiResponse } from '../../services/api/api.config';
import axios from 'axios';

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  address?: string;
  phoneNumber?: string;
  birthDate?: string;
}

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
        
        if (formData.password !== retypePassword) {
            setError("Passwords don't match");
            return;
        }
        
        try {
            const response = await axios.post<ApiResponse>(`${BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                address: formData.address || undefined,
                phoneNumber: formData.phoneNumber || undefined,
                birthDate: formData.birthDate || undefined
            });
            
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            let errorMessage = 'Registration failed. Please try again.';

            if (axiosError.response?.data && typeof axiosError.response.data === 'object') {
                const responseData = axiosError.response.data as { message?: string };
                errorMessage = responseData.message || errorMessage;
            }
            setError(errorMessage);
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
