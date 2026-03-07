import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLoader } from 'react-icons/fi';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { currentUser, userData, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 gap-4">
                <FiLoader className="text-primary animate-spin" size={40} />
                <p className="text-muted">Verifying credentials...</p>
            </div>
        );
    }

    if (!currentUser) {
        // Redirect to login but save the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userData?.role)) {
        // Role not permitted
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
