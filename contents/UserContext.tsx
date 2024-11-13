import { useState } from 'react'

interface User {
    email: string;
    password: string;
}

const mockUsers = [
    { email: 'test@example.com', password: 'password123', /* other user properties */ }
];

const [user, setUser] = useState<User | null>(null);

const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find((user) => user.email === email && user.password === password);
    if (foundUser) {
        setUser(foundUser);
        sessionStorage.setItem('user', JSON.stringify(foundUser));
        return true;
    } else {
        console.error('Invalid email or password');
        return false;
    }
}; 
