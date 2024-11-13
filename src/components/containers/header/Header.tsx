import React, { useState } from 'react';
import '../../../styles/Header.css';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLoginClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    const renderUserSection = () => {
        if (user) {
            return (
                <div className="user-dropdown">
                    <button
                        className="dropdown-toggle"
                        onClick={handleDropdownToggle}
                    >
                        <i className="bi bi-person-circle"></i>
                        <span>{user.fullName}</span>
                    </button>
                    {showDropdown && (
                        <ul className="dropdown-menu show">
                            <li>
                                <Link to="/profile" className="dropdown-item">
                                    <i className="bi bi-person"></i>
                                    <span>Xem hồ sơ</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-courses" className="dropdown-item">
                                    <i className="bi bi-book"></i>
                                    <span>Khóa học của tôi</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/schedule" className="dropdown-item">
                                    <i className="bi bi-calendar3"></i>
                                    <span>Lịch học</span>
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Đăng xuất</span>
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            );
        }

        return (
            <button className="login-button" onClick={handleLoginClick}>
                <i className="bi bi-person"></i>
                <span>Đăng nhập</span>
            </button>
        );
    };

    return (
        <header className="header-wrapper py-2">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <div className="header-logo">
                    <Link to="/">
                        <img
                            src="https://online.hcmue.edu.vn/static/media/Logo_Login.92cef6d3.png"
                            alt="Logo"
                            className="img-fluid"
                        />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="header-search">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Tìm kiếm khóa học..."
                            aria-label="Search"
                        />
                        <button className="btn btn-search" type="button">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                {/* Account & Cart */}
                <div className="header-actions">
                    <Link to="/cart" className="cart-link">
                        <div className="cart-icon-wrapper">
                            <i className="bi bi-cart3"></i>
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </div>
                        <span>Giỏ hàng</span>
                    </Link>
                    {renderUserSection()}
                </div>
            </div>
        </header>
    );
};

export default Header;
