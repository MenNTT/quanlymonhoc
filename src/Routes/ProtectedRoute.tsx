import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    requiredRole 
}) => {
    const { user, isAuthenticated, hasRole } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log('Protected Route Check:', {
            isAuthenticated,
            userRoles: user?.roles,
            requiredRole,
            hasRequiredRole: requiredRole ? hasRole(requiredRole) : true
        });
    }, [isAuthenticated, user, requiredRole, hasRole]);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        console.log('Access denied:', {
            userRoles: user?.roles,
            requiredRole,
            hasRole: hasRole(requiredRole)
        });
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;