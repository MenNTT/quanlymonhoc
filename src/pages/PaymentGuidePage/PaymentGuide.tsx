import React from 'react';
import '../../styles/PaymentGuide.css';

const PaymentGuide: React.FC = () => {
    return (
        <div className="payment-guide-container">
            <div className="payment-guide-header">
                <h1>Hướng dẫn thanh toán</h1>
                <p>Các phương thức thanh toán được chấp nhận tại trung tâm</p>
            </div>

            <div className="payment-methods">
                {/* Chuyển khoản ngân hàng */}
                <div className="payment-method-card">
                    <div className="method-header">
                        <i className="bi bi-bank"></i>
                        <h2>Chuyển khoản ngân hàng</h2>
                    </div>
                    <div className="method-content">
                        <div className="bank-info">
                            <p><strong>Ngân hàng:</strong> Vietcombank</p>
                            <p><strong>Số tài khoản:</strong> 1234567890</p>
                            <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH ABC</p>
                            <p><strong>Chi nhánh:</strong> Hồ Chí Minh</p>
                        </div>
                        <div className="transfer-note">
                            <h3>Nội dung chuyển khoản:</h3>
                            <p>[Họ tên] - [Khóa học] - [Số điện thoại]</p>
                            <p className="example">Ví dụ: Nguyen Van A - Java Basic - 0912345678</p>
                        </div>
                    </div>
                </div>

                {/* Thanh toán trực tiếp */}
                <div className="payment-method-card">
                    <div className="method-header">
                        <i className="bi bi-cash"></i>
                        <h2>Thanh toán trực tiếp</h2>
                    </div>
                    <div className="method-content">
                        <p>Học viên có thể đến trực tiếp văn phòng để thanh toán bằng tiền mặt hoặc quẹt thẻ:</p>
                        <div className="office-info">
                            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
                            <p><strong>Thời gian làm việc:</strong> 8:00 - 17</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGuide; 