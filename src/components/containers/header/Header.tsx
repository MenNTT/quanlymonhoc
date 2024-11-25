import React, { useState, useEffect } from 'react';
import '../../../styles/Header.css';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import UserDropdown from './UserDropdown';
import { cookieService } from '../../../services/cookie.service';

const Header: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { cartCount } = useCart();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = cookieService.get('authToken');
            const userData = localStorage.getItem('user');
            setIsLoggedIn(!!token && !!userData);
        };

        checkLoginStatus();
    }, [isAuthenticated]);

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
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
                    
                    <nav className={`header-nav ${isMenuOpen ? 'show' : ''}`}>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                isActive ? "nav-link active" : "nav-link"
                            }
                            end
                        >
                            Trang chủ
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Giới thiệu
                        </NavLink>
                        <NavLink 
                            to="/courses" 
                            className={({ isActive }) => 
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Khoá học
                        </NavLink>
                        <NavLink 
                            to="/search" 
                            className={({ isActive }) => 
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Tra cứu
                        </NavLink>
                        <NavLink 
                            to="/news" 
                            className={({ isActive }) => 
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Tin tức
                        </NavLink>
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
                                onClick={toggleDropdown}
                            >
                                <i className="fas fa-user-circle"></i>
                            </div>
                            {showDropdown && (
                                <UserDropdown 
                                    isOpen={showDropdown} 
                                    onClose={handleCloseDropdown}
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
            <button 
                className="menu-toggle hide-lg-up"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`} />
            </button>
        </header>
    );
};

export default Header;
