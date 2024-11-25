import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { cookieService } from '../../../services/cookie.service';

interface UserDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleLogout = () => {
        logout();
        cookieService.remove('authToken');
        localStorage.removeItem('user');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="user-menu" ref={dropdownRef}>
            <div className="dropdown-menu">
                <div className="dropdown-item-text">
                    <strong>{user?.fullName}</strong>
                    <br />
                    <small>{user?.email}</small>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item" onClick={onClose}>
                    <i className="fas fa-user-circle me-2"></i>
                    Hồ sơ của tôi
                </Link>
                <Link to="/my-courses" className="dropdown-item" onClick={onClose}>
                    <i className="fas fa-graduation-cap me-2"></i>
                    Khóa học của tôi
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={onClose}>
                    <i className="fas fa-cog me-2"></i>
                    Cài đặt
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default UserDropdown; 