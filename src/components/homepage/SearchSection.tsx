import React from 'react';
import '../../styles/SearchSection.css';

const SearchSection: React.FC = () => {
    return (
        <div className="search-section">
            <div className="announcement-container">
                <div className="announcement-wrapper">
                    <h2 className="announcement-text">
                        Tổng khai giảng khóa <span className="highlight-number">1</span> từ ngày 
                        <span className="highlight-date">01/11/2024</span> đến 
                        <span className="highlight-date">23/11/2024</span>
                    </h2>
                    <h3 className="promotion-text">
                        Ưu đãi học phí lên đến <span className="highlight-percent">100%</span>
                    </h3>
                    <button className="register-button">
                        Đăng ký ngay
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <div className="search-cards-container">
                <div className="search-card">
                    <div className="notification-bell">
                        <i className="fas fa-bell"></i>
                        <span className="notification-badge">Mới</span>
                    </div>
                    <div className="card-icon purple">
                        <i className="fas fa-search"></i>
                    </div>
                    <h3>Tra cứu điểm thi</h3>
                    <p>Xem kết quả các kỳ thi của bạn</p>
                </div>

                <div className="search-card">
                    <div className="notification-bell">
                        <i className="fas fa-bell"></i>
                    </div>
                    <div className="card-icon green">
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                    <h3>Lịch thi chứng chỉ CNTT</h3>
                    <p>Xem lịch thi các kỳ sắp tới</p>
                </div>

                <div className="search-card">
                    <div className="notification-bell">
                        <i className="fas fa-bell"></i>
                    </div>
                    <div className="card-icon orange">
                        <i className="fas fa-certificate"></i>
                    </div>
                    <h3>Tra cứu chứng chỉ</h3>
                    <p>Kiểm tra thông tin chứng chỉ của bạn</p>
                </div>
            </div>
        </div>
    );
};

export default SearchSection;