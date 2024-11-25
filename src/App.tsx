// App.tsx đừng sửa toàn bộ file này
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteComponent from './Routes/RouteComponent';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <UserProvider>
                <BrowserRouter>
                    <RouteComponent />
                    {/* File này khum chỉnh gì cả nhen diuu ơiii, thêm trang mới thì vào Route/RouteComponent.tsx nhen */}
                </BrowserRouter>
                </UserProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
