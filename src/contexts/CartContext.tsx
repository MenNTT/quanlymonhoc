import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../models/Course';
import { CartService } from '../services/cart.service';
import { useAuth } from './AuthContext';

interface CartContextType {
    cartItems: Course[];
    addToCart: (item: Course) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Course[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const { user } = useAuth();

    useEffect(() => {
        const loadCartItems = async () => {
            if (user?.id) {
                try {
                    const response = await CartService.getCartItems(user.id);
                    setCartItems(response.data);
                } catch (error) {
                    console.error('Error loading cart items:', error);
                }
            }
        };

        loadCartItems();
    }, [user]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (course: Course) => {
        if (!user?.id) {
            alert('Vui lòng đăng nhập để thêm vào giỏ hàng');
            return;
        }
        try {
            const response = await CartService.addToCart(course.id.toString(), user.id);
            if (response.success) {
                if (!cartItems.some(item => item.id.toString() === course.id.toString())) {
                    setCartItems(prev => [...prev, course]);
                    localStorage.setItem('cart', JSON.stringify([...cartItems, course]));
                }
                alert('Đã thêm khóa học vào giỏ hàng!');
            } else {
                throw new Error(response.message || 'Không thể thêm vào giỏ hàng');
            }
        } catch (error: any) {
            console.error('Error adding to cart:', error);
            alert(error.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };

    const removeFromCart = async (cartItemId: string) => {
        if (!user?.id) {
            alert('Vui lòng đăng nhập để thực hiện chức năng này');
            return;
        }
        try {
            await CartService.removeFromCart(cartItemId);
            setCartItems(prev => prev.filter(item => item.id.toString() !== cartItemId));
        } catch (error: any) {
            console.error('Error removing from cart:', error);
            alert(error.message || 'Có lỗi xảy ra khi xóa khỏi giỏ hàng');
        }
    };

    const clearCart = async () => {
        if (!user?.id) {
            throw new Error('User not authenticated');
        }
        try {
            await CartService.clearCart(user.id);
            setCartItems([]);
            localStorage.removeItem('cart');
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.feeAmount, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 