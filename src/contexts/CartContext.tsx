import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../models/Course';

interface CartItem extends Course {}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Course) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (course: Course) => {
        if (!cartItems.some(cartItem => cartItem.id.toString() === course.id.toString())) {
            setCartItems([...cartItems, course]);
        }
    };

    const removeFromCart = (id: string) => {
        setCartItems(cartItems.filter(item => item.id.toString() !== id));
    };

    const clearCart = () => {
        setCartItems([]);
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