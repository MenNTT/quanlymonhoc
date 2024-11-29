import axios from './axios.config';
import { API_ENDPOINTS } from '../constants/api/api.config';

export const CartService = {
    addToCart: async (courseId: string, userId: string) => {
        try {
            const response = await axios.post(API_ENDPOINTS.CART.ADD, {
                userId,
                courseId
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                // Lỗi từ server với status code
                switch (error.response.status) {
                    case 401:
                        throw new Error('Vui lòng đăng nhập để thực hiện chức năng này');
                    case 404:
                        throw new Error('Không tìm thấy khóa học');
                    case 400:
                        throw new Error(error.response.data.message || 'Dữ liệu không hợp lệ');
                    default:
                        throw new Error('Có lỗi xảy ra khi thêm vào giỏ hàng');
                }
            }
            throw new Error('Không thể kết nối đến server');
        }
    },

    removeFromCart: async (cartItemId: string) => {
        try {
            const response = await axios.delete(API_ENDPOINTS.CART.REMOVE(cartItemId));
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Vui lòng đăng nhập để thực hiện chức năng này');
            }
            throw error;
        }
    },

    getCartItems: async (userId: string) => {
        try {
            const response = await axios.get(API_ENDPOINTS.CART.GET_BY_USER(userId));
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Vui lòng đăng nhập để xem giỏ hàng');
            }
            throw error;
        }
    },

    clearCart: async (userId: string) => {
        try {
            const response = await axios.delete(API_ENDPOINTS.CART.CLEAR, {
                data: { userId }
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Vui lòng đăng nhập để thực hiện chức năng này');
            }
            throw error;
        }
    }
}; 