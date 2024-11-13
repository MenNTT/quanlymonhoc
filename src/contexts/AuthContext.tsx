import React, { createContext, useContext, useState, useEffect } from 'react';
import { cookieService } from '../shared/services/cookie.service';

interface User {
    id: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Kiểm tra user trong localStorage khi component mount
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const isAuthenticated = !!user && !!cookieService.get('authToken');

    const logout = () => {
        setUser(null);
        cookieService.remove('authToken');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};