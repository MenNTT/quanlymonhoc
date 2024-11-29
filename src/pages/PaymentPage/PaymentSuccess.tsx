import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Xóa thông tin đơn hàng từ localStorage nếu có
        localStorage.removeItem('pendingOrder');
    }, []);

    return (
        <div className="payment-success-container">
            <div className="success-card">
                <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h1>Đăng ký khóa học thành công!</h1>
                <p>Cảm ơn bạn đã đăng ký khóa học. Bạn có thể bắt đầu học ngay bây giờ.</p>
                <div className="action-buttons">
                    <button 
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/profile')}
                    >
                        <i className="fas fa-book me-2"></i>
                        Xem khóa học của tôi
                    </button>
                    <button 
                        className="btn btn-outline-primary"
                        onClick={() => navigate('/courses')}
                    >
                        <i className="fas fa-search me-2"></i>
                        Khám phá thêm khóa học
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess; 