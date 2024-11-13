// App.tsx đừng sửa toàn bộ file này
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteComponent from './Routes/RouteComponent';
import { UserProvider } from './components/contents/UserContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
    return (
        <div>
            <AuthProvider>
                <CartProvider>
                    <UserProvider>
                    <BrowserRouter>
                        <RouteComponent />
                    </BrowserRouter>
                    </UserProvider>
                </CartProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
