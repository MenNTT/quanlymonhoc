import axios from './axios.config';

export const CartService = {
    addToWishlist: async (courseId: string) => {
        try {
            const response = await axios.post('/cart', {
                courseId,
                isWishlist: true
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    removeFromWishlist: async (courseId: string) => {
        try {
            const response = await axios.delete('/cart', {
                data: {
                    courseId,
                    isWishlist: true
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 