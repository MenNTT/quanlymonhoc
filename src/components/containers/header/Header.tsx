import React, { useState, useEffect } from 'react';
import '../../../styles/Header.css';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import UserDropdown from './UserDropdown';
import { cookieService } from '../../../services/cookie.service';

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = cookieService.get('authToken');
            const userData = localStorage.getItem('user');
            setIsLoggedIn(!!token && !!userData);
        };

        checkLoginStatus();
        if (!isLoggedIn) {
            setShowDropdown(false);
        }
    }, [isAuthenticated]);

    const handleLogoutAndClose = () => {
        setShowDropdown(false);
        setIsLoggedIn(false);
    };

    return (
        <header className="header-wrapper">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo and Navigation */}
                <div className="d-flex align-items-center">
                    <div className="header-logo">
                        <Link to="/">
                            <span className="logo-text">ITLearn</span>
                        </Link>
                    </div>
                    
                    <nav className="header-nav">
                        <Link to="/" className="nav-link">Trang chủ</Link>
                        <Link to="/about" className="nav-link">Giới thiệu</Link>
                        <Link to="/courses" className="nav-link">Khoá học</Link>
                        <Link to="/search" className="nav-link">Tra cứu</Link>
                        <Link to="/news" className="nav-link">Tin tức</Link>
                    </nav>
                </div>

                {/* Search, Cart and User Actions */}
                <div className="d-flex align-items-center header-right">
                    <form className="search-form">
                        <div className="search-wrapper">
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm khoá học..." 
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>

                    <Link to="/cart" className="cart-link">
                        <i className="fas fa-shopping-cart"></i>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {isLoggedIn ? (
                        <div className="user-menu-container">
                            <div 
                                className="user-icon"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <i className="fas fa-user-circle"></i>
                            </div>
                            {showDropdown && (
                                <UserDropdown 
                                    isOpen={showDropdown} 
                                    onClose={handleLogoutAndClose}
                                />
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="user-icon">
                            <i className="fas fa-user"></i>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
