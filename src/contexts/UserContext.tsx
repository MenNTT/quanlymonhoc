import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa interface cho User
interface User {
    email: string;
    name?: string;
    avatar?: string;
}

// Định nghĩa interface cho UserContext
interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Export UserContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Props cho UserProvider
interface UserProviderProps {
    children: ReactNode;
}

// Export UserProvider với named export
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        try {
            // Thực hiện logic đăng nhập ở đây
            setUser({ email });
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Export useUser hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Thêm export default cho UserContext nếu cần
export default UserContext; 