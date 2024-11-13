// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../../mock_data/mockUsers';

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => boolean; // Return boolean for login success
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, password: string): boolean => {
       // const foundUser = mockUsers.find((user) => user.email === email && user.password === password);
       let foundUser = null;
        if (foundUser) {
            setUser(foundUser);
            sessionStorage.setItem('user', JSON.stringify(foundUser)); // Lưu vào sessionStorage
            return true;
        } else {
            console.error('Invalid email or password');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user'); // Xóa khỏi sessionStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
