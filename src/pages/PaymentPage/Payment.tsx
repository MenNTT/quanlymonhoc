import React, { useState } from 'react';

const Payment: React.FC = () => {
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const handlePayment = () => {
        // Logic thanh toán giả lập
        setTimeout(() => {
            setPaymentSuccess(true);
        }, 2000); // Giả lập thời gian xử lý thanh toán
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-dark text-white text-center">
                            <h3>Thanh toán khóa học</h3>
                        </div>
                        <div className="card-body">
                            {!paymentSuccess ? (
                                <div>
                                    <h5 className="mb-3 text-center">
                                        Tổng tiền: <strong>7,200,000 VND</strong>
                                    </h5>

                                    {/* Chọn phương thức thanh toán */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="fas fa-credit-card"></i> Chọn phương thức thanh toán:
                                        </label>
                                        <select className="form-select">
                                            <option>Thẻ tín dụng</option>
                                            <option>Thẻ ATM nội địa</option>
                                            <option>Ví điện tử (Momo, ZaloPay, VNPAY)</option>
                                        </select>
                                    </div>

                                    {/* Form nhập thông tin thanh toán */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="fas fa-user"></i> Họ và tên
                                        </label>
                                        <input type="text" className="form-control" placeholder="Nhập họ và tên" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="fas fa-envelope"></i> Email
                                        </label>
                                        <input type="email" className="form-control" placeholder="Nhập email" />
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button className="btn btn-success" onClick={handlePayment}>
                                            <i className="fas fa-money-check-alt"></i> Thanh toán
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <i className="fas fa-check-circle fa-5x text-success"></i>
                                    <h4 className="mt-4">Thanh toán thành công!</h4>
                                    <p>Cảm ơn bạn đã đăng ký khóa học.</p>
                                    <button className="btn btn-primary mt-3">
                                        <i className="fas fa-arrow-left"></i> Quay lại trang khóa học
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
