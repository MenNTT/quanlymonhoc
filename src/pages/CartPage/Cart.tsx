import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart.css';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, totalAmount } = useCart();
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState('');

    const handleCheckout = () => {
        navigate('/payment');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-5">
                <div className="text-center empty-cart">
                    <div className="empty-cart-icon mb-4">
                        <i className="fas fa-shopping-cart fa-4x text-muted"></i>
                    </div>
                    <h3 className="mb-3">Giỏ hàng của bạn đang trống</h3>
                    <p className="text-muted mb-4">Hãy khám phá các khóa học hấp dẫn của chúng tôi</p>
                    <button 
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/courses')}
                    >
                        <i className="fas fa-book-open me-2"></i>
                        Xem khóa học
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-bold">Giỏ hàng của bạn</h2>
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="cart-items-container">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item card border-0 shadow-sm mb-3">
                                <div className="card-body p-4">
                                    <div className="d-flex gap-4">
                                        <div className="cart-item-image">
                                            {item.image && (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="rounded"
                                                    style={{ width: '160px', height: '120px', objectFit: 'cover' }}
                                                />
                                            )}
                                        </div>
                                        <div className="cart-item-details flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h5 className="mb-2">{item.name}</h5>
                                                    <p className="text-muted mb-2">{item.description}</p>
                                                    <div className="course-meta">
                                                        <span className="me-3">
                                                            <i className="fas fa-clock text-primary me-1"></i> 6 giờ
                                                        </span>
                                                        <span className="me-3">
                                                            <i className="fas fa-video text-primary me-1"></i> 24 bài học
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <h5 className="text-primary mb-3">
                                                        {item.feeAmount.toLocaleString()} {item.currency}
                                                    </h5>
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => removeFromCart(item.id.toString())}
                                                    >
                                                        <i className="fas fa-trash me-1"></i>
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-4">Tổng thanh toán</h5>
                            
                            <div className="mb-4">
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Nhập mã giảm giá"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <button className="btn btn-outline-primary">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>

                            <div className="price-details">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tạm tính</span>
                                    <span>{totalAmount.toLocaleString()} VND</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Giảm giá</span>
                                    <span className="text-success">0 VND</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <strong>Tổng cộng</strong>
                                    <strong className="text-primary">{totalAmount.toLocaleString()} VND</strong>
                                </div>
                            </div>

                            <button 
                                className="btn btn-primary w-100 btn-lg"
                                onClick={handleCheckout}
                            >
                                <i className="fas fa-lock me-2"></i>
                                Thanh toán an toàn
                            </button>

                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    <i className="fas fa-shield-alt me-1"></i>
                                    Giao dịch được bảo mật 100%
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart; 