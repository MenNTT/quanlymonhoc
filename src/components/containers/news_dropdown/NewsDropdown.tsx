import React from 'react';
import '../../../styles/NewsDropdown.css'; // Tạo file CSS nếu cần

const NewsDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const newsList = [
        { title: 'Tin tức 1', icon: 'bi-newspaper' },
        { title: 'Tin tức 2', icon: 'bi-bell' },
        { title: 'Tin tức 3', icon: 'bi-calendar-event' },
        { title: 'Tin tức 4', icon: 'bi-info-circle' },
        { title: 'Tin tức 5', icon: 'bi-globe' },
        // Thêm tin tức nếu cần
    ];

    return (
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} onMouseLeave={onClose} style={{ width: 'auto', padding: '10px' }}>
            <div className="p-2">
                <h6>Danh Sách Tin Tức</h6>
                <hr className="bg-dark" />
                <div className="news-column">
                    {newsList.map((news, index) => (
                        <div key={index} className="news-item">
                            <i className={`bi ${news.icon}`} style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
                            <div className="news-text">
                                <span>{news.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsDropdown;
