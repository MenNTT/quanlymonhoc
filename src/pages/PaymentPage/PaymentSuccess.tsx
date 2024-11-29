import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Tự động chuyển đến trang khóa học của tôi sau 5 giây
        const timeout = setTimeout(() => {
            navigate('/profile');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className="container py-5">
            <div className="text-center">
                <FaCheckCircle className="text-success mb-4" size={64} />
                <h2 className="mb-4">Thanh toán thành công!</h2>
                <p className="mb-4">
                    Cảm ơn bạn đã đăng ký khóa học. Bạn có thể truy cập khóa học ngay bây giờ.
                </p>
                <div className="mt-4">
                    <button
                        className="btn btn-primary me-3"
                        onClick={() => navigate('/profile')}
                    >
                        Xem khóa học của tôi
                    </button>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate('/courses')}
                    >
                        Khám phá thêm khóa học
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess; 