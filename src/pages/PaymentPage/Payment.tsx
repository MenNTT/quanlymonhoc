import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseService } from '../../services/course.service';
import { VNPayService } from '../../services/vnpay.service';
import { useCart } from '../../contexts/CartContext';
import './Payment.css';
import { Course } from '../../models/Course';

const Payment: React.FC = () => {
    const { id_course } = useParams<{ id_course: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { cartItems, totalAmount, clearCart } = useCart();

    useEffect(() => {
        const fetchCourseData = async () => {
            if (id_course) {
                try {
                    const data = await CourseService.getCourseById(id_course);
                    setCourse(data);
                } catch (error) {
                    setError('Không thể tải thông tin khóa học');
                    console.error(error);
                }
            }
        };
        
        if (id_course) {
            fetchCourseData();
        }
    }, [id_course]);

    const handleVNPayPayment = async () => {
        try {
            setLoading(true);
            const amount = id_course && course ? course.feeAmount : totalAmount;
            const orderInfo = id_course && course
                ? `Thanh toan khoa hoc ${course.name}`
                : `Thanh toan gio hang`;

            const response = await VNPayService.createPaymentUrl(amount, orderInfo);
            
            if (response.paymentUrl) {
                // Lưu thông tin đơn hàng vào localStorage trước khi chuyển hướng
                const orderData = {
                    items: id_course ? [course] : cartItems,
                    totalAmount: amount,
                    orderInfo
                };
                localStorage.setItem('pendingOrder', JSON.stringify(orderData));
                
                // Chuyển hướng đến trang thanh toán VNPay
                window.location.href = response.paymentUrl;
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.');
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = () => {
        // Xóa giỏ hàng nếu thanh toán thành công
        clearCart();
        // Chuyển hướng đến trang thành công
        navigate('/payment-success');
    };

    const calculateTotal = () => {
        if (id_course && course) {
            return course.feeAmount;
        }
        return totalAmount;
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Thanh toán khóa học</h3>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}
                            
                            <div className="payment-details mb-4">
                                <h4 className="mb-3">Chi tiết đơn hàng</h4>
                                {id_course && course ? (
                                    <div className="course-item">
                                        <h5>{course.name}</h5>
                                        <p className="text-primary fw-bold">
                                            {course.feeAmount.toLocaleString()} VND
                                        </p>
                                    </div>
                                ) : (
                                    cartItems.map(item => (
                                        <div key={item.id} className="course-item">
                                            <h5>{item.name}</h5>
                                            <p className="text-primary fw-bold">
                                                {item.feeAmount.toLocaleString()} VND
                                            </p>
                                        </div>
                                    ))
                                )}
                                
                                <div className="total-amount mt-3">
                                    <h5>Tổng thanh toán:</h5>
                                    <h4 className="text-primary">
                                        {calculateTotal().toLocaleString()} VND
                                    </h4>
                                </div>
                            </div>

                            <div className="payment-methods">
                                <h4 className="mb-3">Phương thức thanh toán</h4>
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        onClick={handleVNPayPayment}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                Đang xử lý...
                                            </span>
                                        ) : (
                                            <>
                                                <img 
                                                    src="/vnpay-logo.png" 
                                                    alt="VNPay" 
                                                    className="payment-method-icon"
                                                />
                                                Thanh toán qua VNPay
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
