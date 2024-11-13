import React, { useState } from 'react';
import { useUser } from '../contents/UserContext.tsx';

const Profile: React.FC = () => {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [idNumber, setIdNumber] = useState(user?.idNumber || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [companyName, setCompanyName] = useState(user?.companyName || '');
    const [companyAddress, setCompanyAddress] = useState(user?.companyAddress || '');

    if (!user) {
        return (
            <div className="container mt-5">
                <h4>Bạn chưa đăng nhập.</h4>
            </div>
        );
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log('Saving profile:', {
            fullName,
            idNumber,
            phone,
            address,
            companyName,
            companyAddress,
        });
    };

    return (
        <div className="flex-grow-1">
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card shadow-sm w-100" style={{maxWidth: '600px'}}>
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center mb-4">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="rounded-circle mb-3"
                                style={{width: '100px', height: '100px'}} // Giảm kích thước hình ảnh cho màn hình nhỏ
                            />
                            <h4 className="card-title">{fullName || "Thông tin cá nhân"}</h4>
                            <p className="text-muted">{user.email}</p>
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
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Nhập họ và tên"
                                    />
                                ) : (
                                    <p>{fullName || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-card-text me-2"></i>Số căn cước công dân
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={idNumber}
                                        onChange={(e) => setIdNumber(e.target.value)}
                                        placeholder="Nhập số căn cước công dân"
                                    />
                                ) : (
                                    <p>{idNumber || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-phone-fill me-2"></i>Số điện thoại
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                    />
                                ) : (
                                    <p>{phone || 'Chưa cập nhật'}</p>
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
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Nhập địa chỉ"
                                    />
                                ) : (
                                    <p>{address || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-building me-2"></i>Tên cơ quan
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Nhập tên cơ quan"
                                    />
                                ) : (
                                    <p>{companyName || 'Chưa cập nhật'}</p>
                                )}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">
                                    <i className="bi bi-geo-alt-fill me-2"></i>Địa chỉ cơ quan
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={companyAddress}
                                        onChange={(e) => setCompanyAddress(e.target.value)}
                                        placeholder="Nhập địa chỉ cơ quan"
                                    />
                                ) : (
                                    <p>{companyAddress || 'Chưa cập nhật'}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={handleEditToggle}
                                >
                                    Hủy
                                </button>
                                <button className="btn btn-success btn-sm" onClick={handleSave}>
                                    <i className="bi bi-save me-2"></i>Lưu thay đổi
                                </button>
                            </div>
                        )}

                        <div className="mt-4 text-center">
                            <a href="/" className="btn btn-outline-secondary btn-sm">
                                <i className="bi bi-house-door-fill me-2"></i>Quay lại Trang chủ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
