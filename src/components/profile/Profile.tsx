import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

interface User {
    id: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    birthDate?: string;
    roles: string[];
}

interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    birthDate?: string;
}

const Profile: React.FC = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile>({
        id: user?.id || '',
        email: user?.email || '',
        fullName: user?.fullName || '',
        phoneNumber: user?.phoneNumber || '',
        address: user?.address || '',
        birthDate: user?.birthDate || ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setFormData({
            id: user.id || '',
            email: user.email || '',
            fullName: user.fullName || '',
            phoneNumber: user.phoneNumber || '',
            address: user.address || '',
            birthDate: user.birthDate || ''
        });
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'phoneNumber') {
            const phoneRegex = /^[0-9+]*$/;
            if (value && !phoneRegex.test(value)) {
                return;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.fullName?.trim()) {
            setError('Vui lòng nhập họ và tên');
            return false;
        }

        if (formData.phoneNumber?.trim()) {
            const phoneRegex = /^(\+84|84|0)[0-9]{9}$/;
            if (!phoneRegex.test(formData.phoneNumber.trim())) {
                setError('Số điện thoại không hợp lệ');
                return false;
            }
        }

        if (formData.birthDate) {
            const birthDate = new Date(formData.birthDate);
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
            
            if (birthDate > today) {
                setError('Ngày sinh không thể là ngày trong tương lai');
                return false;
            }
            
            if (birthDate < minDate) {
                setError('Ngày sinh không hợp lệ');
                return false;
            }
        }

        return true;
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setError(null);
        setSuccess(null);
        
        if (isEditing) {
            setFormData({
                id: user?.id || '',
                email: user?.email || '',
                fullName: user?.fullName || '',
                phoneNumber: user?.phoneNumber || '',
                address: user?.address || '',
                birthDate: user?.birthDate || ''
            });
        }
    };

    const handleSave = async () => {
        try {
            setError(null);
            setSuccess(null);

            if (!validateForm()) {
                return;
            }

            if (!user?.id) {
                setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                navigate('/login');
                return;
            }

            const formattedData = {
                fullName: formData.fullName.trim(),
                phoneNumber: formData.phoneNumber?.trim() || undefined,
                address: formData.address?.trim() || undefined,
                birthDate: formData.birthDate || undefined
            };

            const response = await authService.updateProfile(user.id, formattedData);

            if (response.success && response.data) {
                const updatedUser: User = {
                    id: user.id,
                    email: user.email,
                    roles: user.roles,
                    fullName: response.data.fullName,
                    phoneNumber: response.data.phoneNumber,
                    address: response.data.address,
                    birthDate: response.data.birthDate
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setSuccess('Cập nhật thông tin thành công!');
                setIsEditing(false);
                setError(null);
            } else {
                setError(response.message || 'Có lỗi xảy ra khi cập nhật thông tin');
            }
        } catch (error: any) {
            console.error('Update profile error:', error);
            
            if (error.response?.status === 401 || error.response?.status === 403) {
                setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                authService.logout();
                setUser(null);
                navigate('/login');
            } else {
                setError(error.message || 'Có lỗi xảy ra khi cập nhật thông tin');
            }
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="flex-grow-1">
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card shadow-sm w-100" style={{maxWidth: '600px'}}>
                    <div className="card-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="alert alert-success" role="alert">
                                {success}
                            </div>
                        )}

                        <div className="d-flex flex-column align-items-center text-center mb-4">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="rounded-circle mb-3"
                                style={{width: '100px', height: '100px'}}
                            />
                            <h4 className="card-title">{formData.fullName || "Thông tin cá nhân"}</h4>
                            <p className="text-muted">{formData.email}</p>
                            {!isEditing && (
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={handleEditToggle}
                                >
                                    <i className="bi bi-pencil me-2"></i>Chỉnh sửa thông tin
                                </button>
                            )}
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-person-fill me-2"></i>Họ và tên
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Nhập họ và tên"
                                    />
                                ) : (
                                    <p>{formData.fullName || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-phone-fill me-2"></i>Số điện thoại
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={formData.phoneNumber || ''}
                                        onChange={handleChange}
                                        placeholder="Nhập số điện thoại"
                                    />
                                ) : (
                                    <p>{formData.phoneNumber || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-house-fill me-2"></i>Địa chỉ
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={formData.address || ''}
                                        onChange={handleChange}
                                        placeholder="Nhập địa chỉ"
                                    />
                                ) : (
                                    <p>{formData.address || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-calendar-fill me-2"></i>Ngày sinh
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="birthDate"
                                        value={formData.birthDate || ''}
                                        onChange={handleChange}
                                        placeholder="Nhập ngày sinh"
                                    />
                                ) : (
                                    <p>{formData.birthDate || 'Chưa cập nhật'}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={handleEditToggle}
                                >
                                    Hủy
                                </button>
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    <i className="bi bi-save me-2"></i>Lưu thay đổi
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
