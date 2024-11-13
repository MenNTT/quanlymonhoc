import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CourseItem, useCart } from '../contexts/CartContext';
import '../styles/Cart.css';
import { RECOMMENDED_COURSES } from '../contexts/CartContext';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, totalAmount } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState('KEEPLEARNING');
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Giả lập loading
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    // Thêm hàm xử lý xóa khóa học
    const handleRemove = (id: number) => {
        if (window.confirm('Bạn có chắc muốn xóa khóa học này?')) {
            removeFromCart(id);
        }
    };

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            alert('Vui lòng nhập mã giảm giá');
            return;
        }
        // Xử lý logic áp dụng coupon
        setAppliedCoupon(couponCode);
        setCouponCode('');
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon('');
    };

    const handleCheckout = async () => {
        try {
            setIsProcessing(true);
            // Xử lý logic checkout
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Redirect to checkout page or show success message
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Cập nhật giao diện cart item
    const CartItem: React.FC<{ item: CourseItem; onRemove: (id: number) => void }> = ({ item, onRemove }) => (
        <div className="cart-item">
            <div className="item-left">
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                    <h3>{item.title}</h3>
                    <p className="instructor">{item.instructor}</p>
                    <div className="course-details">
                        <span>Tổng số {item.duration}</span>
                        <span className="bullet">•</span>
                        <span>{item.lectures} bài giảng</span>
                        <span className="bullet">•</span>
                        <span>{item.level}</span>
                    </div>
                    <div className="rating">
                        <span>{item.rating}</span>
                        <div className="stars">{'★'.repeat(Math.floor(item.rating))}</div>
                        <span className="rating-count">({item.ratingCount} xếp hạng)</span>
                    </div>
                </div>
            </div>
            <div className="item-right">
                <div className="item-actions">
                    <button className="action-link" onClick={() => onRemove(item.id)}>
                        Xóa
                    </button>
                    <button className="action-link">Lưu để mua sau</button>
                    <button className="action-link">Chuyển vào danh sách mong ước</button>
                </div>
                <div className="item-price">₫{item.price.toLocaleString()}</div>
            </div>
        </div>
    );

    return (
        <div className="cart-container">
            {isLoading ? (
                <div className="loading">Đang tải...</div>
            ) : (
                <>
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h2>Giỏ hàng của bạn đang trống</h2>
                            <Link to="/courses" className="browse-courses-btn">
                                Duyệt khóa học
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-main">
                            <h1>Giỏ hàng</h1>
                            <div className="cart-count">{cartItems.length} khóa học trong giỏ hàng</div>

                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <CartItem key={item.id} item={item} onRemove={handleRemove} />
                                ))}
                            </div>

                            {cartItems.length > 0 && (
                                <div className="recommendations">
                                    <h2>Bạn cũng có thể thích</h2>
                                    <div className="recommendation-list">
                                        {RECOMMENDED_COURSES.map(course => (
                                            <div key={course.id} className="recommendation-item">
                                                <img src={course.image} alt={course.title} />
                                                <div className="recommendation-info">
                                                    <h3>{course.title}</h3>
                                                    <p className="instructor">{course.instructor}</p>
                                                    <div className="rating">
                                                        <span>{course.rating}</span>
                                                        <div className="stars">
                                                            {'★'.repeat(Math.floor(course.rating))}
                                                            {course.rating % 1 >= 0.5 ? '½' : ''}
                                                        </div>
                                                        <span className="rating-count">({course.ratingCount})</span>
                                                    </div>
                                                    <div className="price">₫{course.price.toLocaleString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="cart-sidebar">
                        <div className="total-section">
                            <h3>Tổng:</h3>
                            <div className="total-amount">₫{totalAmount.toLocaleString()}</div>
                        </div>

                        <button 
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={isProcessing || cartItems.length === 0}
                        >
                            {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
                        </button>

                        <div className="promotion-section">
                            <h3>Khuyến mãi</h3>
                            {appliedCoupon && (
                                <div className="coupon-applied">
                                    <div className="coupon-info">
                                        <div>Đã áp dụng <strong>{appliedCoupon}</strong></div>
                                        <div className="coupon-source">Coupon của Udemy</div>
                                    </div>
                                    <button 
                                        className="remove-coupon"
                                        onClick={handleRemoveCoupon}
                                    >×</button>
                                </div>
                            )}
                            <div className="coupon-input">
                                <input 
                                    type="text" 
                                    placeholder="Nhập coupon"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button 
                                    className="apply-btn"
                                    onClick={handleApplyCoupon}
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart; 