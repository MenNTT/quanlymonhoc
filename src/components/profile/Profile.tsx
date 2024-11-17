import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from '../../constants/api/api.config';
import { useNavigate } from 'react-router-dom';
import { cookieService } from '../../services/cookie.service';

interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string | null;
    address: string | null;
    birthDate: string | null;
}

interface ProfileApiResponse {
    success: boolean;
    message: string;
    data?: UserProfile;
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            const token = cookieService.get('authToken');
            if (!token || !user?.id) {
                setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                navigate('/login');
                return;
            }

            if (!formData.fullName?.trim()) {
                setError('Vui lòng nhập họ và tên');
                return;
            }

            const updateUrl = `${BASE_URL}${API_ENDPOINTS.AUTH.UPDATE(user.id)}`;
            console.log('Update URL:', updateUrl);

            console.log('Request data:', {
                userId: user.id,
                formData: {
                    fullName: formData.fullName.trim(),
                    phoneNumber: formData.phoneNumber?.trim() || null,
                    address: formData.address?.trim() || null,
                    birthDate: formData.birthDate || null
                }
            });

            const response = await axios.put<ProfileApiResponse>(
                updateUrl,
                {
                    fullName: formData.fullName.trim(),
                    phoneNumber: formData.phoneNumber?.trim() || null,
                    address: formData.address?.trim() || null,
                    birthDate: formData.birthDate || null
                },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response:', response.data);

            if (response.data.success && response.data.data) {
                const updatedUser = {
                    ...user,
                    ...response.data.data
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setSuccess('Cập nhật thông tin thành công!');
                setIsEditing(false);
                setError(null);
            } else {
                setError(response.data.message || 'Có lỗi xảy ra khi cập nhật thông tin');
            }
        } catch (error: any) {
            console.error('Update profile error:', error);
            console.error('Error response:', error.response?.data);
            
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                        cookieService.remove('authToken');
                        localStorage.removeItem('user');
                        setUser(null);
                        navigate('/login');
                        break;
                    case 403:
                        setError('Phiên đăng nhập đã hết hạn hoặc không có quyền. Vui lòng đăng nhập lại.');
                        cookieService.remove('authToken');
                        localStorage.removeItem('user');
                        setUser(null);
                        navigate('/login');
                        break;
                    case 404:
                        setError('Không tìm thấy thông tin người dùng');
                        break;
                    case 400:
                        setError(error.response.data.message || 'Dữ liệu không hợp lệ');
                        break;
                    default:
                        setError('Có lỗi xảy ra khi cập nhật thông tin');
                }
            } else if (error.request) {
                setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
            } else {
                setError(`Lỗi: ${error.message}`);
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
