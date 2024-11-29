import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { CourseService } from '../../services/course.service';
import './Payment.css';
import { useAuth } from '../../contexts/AuthContext';

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const formatPrice = (price: number | undefined) => {
        if (typeof price === 'undefined') return '0';
        return price.toLocaleString('vi-VN');
    };

    const handlePayment = async () => {
        if (isProcessing) return;
        
        try {
            setIsProcessing(true);
            
            if (!user?.id) {
                throw new Error('Vui lòng đăng nhập để thanh toán');
            }

            for (const course of cartItems) {
                await CourseService.enrollCourse(user.email, course.id);
            }
            
            await clearCart();
            navigate('/payment-success');
        } catch (error: any) {
            console.error('Payment error:', error);
            if (error.message.includes('đăng nhập')) {
                if (window.confirm('Bạn cần đăng nhập để thanh toán. Đăng nhập ngay?')) {
                    navigate('/login', { state: { from: location.pathname } });
                }
                return;
            }
            alert(error.message || 'Có lỗi xảy ra trong quá trình thanh toán');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h3 className="card-title mb-4">Xác nhận thanh toán</h3>
                            
                            <div className="order-summary mb-4">
                                <h5 className="mb-3">Chi tiết đơn hàng</h5>
                                {cartItems.map(item => (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                                        <span>{item.name}</span>
                                        <span className="text-primary">
                                            {formatPrice(item.feeAmount || 0)} VND
                                        </span>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>Tổng cộng</strong>
                                    <strong className="text-primary">{formatPrice(totalAmount)} VND</strong>
                                </div>
                            </div>

                            <div className="payment-actions">
                                <button 
                                    className="btn btn-primary btn-lg w-100 mb-3"
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-check-circle me-2"></i>
                                            Xác nhận thanh toán
                                        </>
                                    )}
                                </button>
                                <button 
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => navigate('/cart')}
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Quay lại giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
