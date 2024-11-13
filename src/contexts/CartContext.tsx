import React, { createContext, useContext, useEffect, useState } from 'react';

const SAMPLE_CART_ITEMS: CourseItem[] = [
  {
    id: 1,
    title: "Học chứng chỉ MOS Word - Tin học văn phòng Quốc tế Microsoft",
    price: 1499000,
    image: "https://csc.edu.vn/data/images/mon-hoc/do-hoa/KTV-Noi-that-273x164.PNG",
    instructor: "Bởi TS. Dang Xuan Tho",
    duration: "5 giờ",
    lectures: 82,
    level: "Trung cấp",
    rating: 4.7,
    ratingCount: 14,
    progress: "Trung cấp"
  },
  {
    id: 2,
    title: "AWS Cloud for beginner (Vietnamese)",
    price: 1799000,
    image: "https://csc.edu.vn/data/images/mon-hoc/do-hoa/KTV-Do-hoa-CHUYEN_NGHIEP-273x164.PNG",
    instructor: "Bởi Linh Nguyen",
    duration: "23 giờ",
    lectures: 334,
    level: "Bán chạy nhất",
    rating: 4.8,
    ratingCount: 774,
    progress: "Sơ cấp"
  }
];

export interface CourseItem {
    id: number;
    title: string;
    price: number;
    image: string;
    instructor: string;
    duration: string;
    lectures: number;
    level: string;
    rating: number;
    ratingCount: number;
    progress: string;
}

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    instructor: string;
    duration: string;
    lectures: number;
    level: string;
    rating: number;
    ratingCount: number;
    progress: string;
}

interface CartContextType {
    cartItems: CartItem[];
    removeFromCart: (id: number) => void;
    totalAmount: number;
    cartCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const RECOMMENDED_COURSES = [
    {
        id: 3,
        title: "DevOps, CI/CD và Containers - Khóa Học Toàn Diện",
        image: "https://csc.edu.vn/data/images/mon-hoc/do-hoa/KTV-Thiet-ke-Thuong-hieu-273x164.PNG",
        instructor: "Hỏi Dân IT với Eric",
        price: 1999000,
        rating: 4.6,
        ratingCount: 285
    },
    {
        id: 4,
        title: "AWS Solutions Architect Associate (Vietnamese)",
        image: "https://csc.edu.vn/data/images/mon-hoc/do-hoa/Chuyen-vien-Do-hoa-painting-273x164.PNG",
        instructor: "Linh Nguyen",
        price: 2199000,
        rating: 4.7,
        ratingCount: 432
    },
    // ... thêm các khóa học khác
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CourseItem[]>(SAMPLE_CART_ITEMS);
    const [discount, setDiscount] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (course: CourseItem) => {
        if (!cartItems.some(item => item.id === course.id)) {
            setCartItems([...cartItems, course]);
        }
    };

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        setDiscount(0);
    };

    const applyDiscount = (code: string) => {
        // Giả lập mã giảm giá
        const discounts: { [key: string]: number } = {
            'NEWUSER': 10,
            'SUMMER2024': 20,
            'SPECIAL50': 50
        };

        const discountPercent = discounts[code];
        if (discountPercent) {
            setDiscount(discountPercent);
        }
    };

    const cartCount = cartItems.length;
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const totalAmount = subtotal * (1 - discount / 100);

    return (
        <CartContext.Provider value={{
            cartItems,
            removeFromCart,
            totalAmount,
            cartCount
        }}>
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