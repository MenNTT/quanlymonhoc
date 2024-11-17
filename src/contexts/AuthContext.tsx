import React, { createContext, useContext, useState, useEffect } from 'react';
import { cookieService } from '../services/cookie.service';

interface User {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string | null;
    address: string | null;
    birthDate: string | null;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    logout: () => {}
});

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = cookieService.get('authToken');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
            localStorage.removeItem('user');
            cookieService.remove('authToken');
        }
    }, []);

    const isAuthenticated = !!user && !!cookieService.get('authToken');

    const logout = () => {
        setUser(null);
        cookieService.remove('authToken');
        localStorage.removeItem('user');
    };

    const value = {
        user,
        setUser,
        isAuthenticated,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };