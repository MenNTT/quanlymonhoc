import React, { createContext, useContext, useState, useEffect } from 'react';
import { cookieService } from '../services/cookie.service';
import { User } from '../models/user';
import authService from '../services/auth.service';

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
    hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setUserData = async (userData: User | null) => {
        setUser(userData);
        setIsAuthenticated(!!userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    useEffect(() => {
        const token = cookieService.get('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                console.log('Loaded user data:', userData);
                console.log('User roles from storage:', userData.roles);
                
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                logout();
            }
        } else {
            logout();
        }
    }, []);

    const hasRole = (role: string): boolean => {
        if (!user?.roles) return false;
        return user.roles.some(r => r.toLowerCase() === role.toLowerCase());
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        authService.logout();
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser: setUserData,
            isAuthenticated,
            logout,
            hasRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };