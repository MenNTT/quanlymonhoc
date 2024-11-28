import axios from 'axios';

export class VNPayService {
    private static baseUrl = 'http://localhost:3000/api/payment'; // URL của backend

    static async createPaymentUrl(amount: number, orderInfo: string) {
        try {
            const response = await axios.post(`${this.baseUrl}/create_payment_url`, {
                amount,
                orderInfo,
                language: 'vn'
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment URL:', error);
            throw error;
        }
    }

    static async verifyPayment(vnpParams: any) {
        try {
            const response = await axios.post(`${this.baseUrl}/vnpay_ipn`, vnpParams);
            return response.data;
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }
} 