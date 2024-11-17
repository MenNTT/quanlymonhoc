import React, { useState } from 'react';
import '../../../styles/Header.css';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import logo from '../../../assets/logo.svg';

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

    return (
        <header className="header-wrapper">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo and Navigation */}
                <div className="d-flex align-items-center">
                    <div className="header-logo">
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
                    
                    <nav className="header-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/products" className="nav-link">Products</Link>
                        <Link to="/resources" className="nav-link">Resources</Link>
                        <Link to="/pricing" className="nav-link">Pricing</Link>
                    </nav>
                </div>

                {/* Search, Cart and Actions */}
                <div className="d-flex align-items-center gap-3">
                    {/* Search Bar */}
                    <div className="header-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm khóa học..."
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cart */}
                    <Link to="/cart" className="cart-link">
                        <i className="bi bi-cart3"></i>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {/* Auth Actions */}
                    <div className="header-actions">
                        {!user ? (
                            <>
                                <button className="login-button" onClick={handleLoginClick}>
                                    Log in
                                </button>
                                <Link to="/signup" className="signup-button">
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <div className="user-dropdown">
                                <button className="dropdown-toggle" onClick={handleDropdownToggle}>
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
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
