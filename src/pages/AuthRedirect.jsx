import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AuthRedirect — immediately after login, route the user to the correct dashboard.
 * This exists as a brief intermediary so userData has time to load from Firestore.
 */
const AuthRedirect = () => {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        if (userData) {
            switch (userData.role) {
                case 'admin':
                    navigate('/admin', { replace: true });
                    break;
                case 'employee':
                    navigate('/employee', { replace: true });
                    break;
                default:
                    navigate('/dashboard', { replace: true });
            }
        }
    }, [userData, currentUser, navigate]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#0d1b2a',
            color: '#00D4F3',
            fontSize: '1.1rem',
            fontWeight: 700
        }}>
            Signing you in…
        </div>
    );
};

export default AuthRedirect;
