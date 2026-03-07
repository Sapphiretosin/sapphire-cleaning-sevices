import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, userData } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const result = await login(email, password);
            // Read role from Firestore via a quick getDocs call
            // The AuthContext snapshot may not have updated by navigate time,
            // so we check the Firebase user and let ProtectedRoute handle the rest.
            // Role-based redirect: the ProtectedRoute will enforce, but for UX
            // we use the userData already in context if available.
            navigate('/auth-redirect');
        } catch (err) {
            setError('Incorrect email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-split-page">
            {/* Left brand panel */}
            <div className="auth-brand-panel">
                <div className="auth-brand-logo">Sapphire <span>Sparks</span></div>
                <h2 className="auth-brand-tagline">
                    Clean spaces,<br /><em>happy faces.</em>
                </h2>
                <p className="auth-brand-sub">
                    Premium cleaning services delivered with care. Sign in to manage your bookings, track loyalty rewards, and more.
                </p>
            </div>

            {/* Right form panel */}
            <div className="auth-form-panel">
                <motion.div
                    className="auth-form-inner"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="auth-form-title">Welcome back</h1>
                    <p className="auth-form-subtitle">Sign in to your Sapphire Sparks account</p>

                    {error && (
                        <motion.div
                            className="auth-error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <FiAlertCircle /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="auth-input-wrap">
                            <label>Email Address</label>
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className="auth-input-wrap">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ marginBottom: 0 }}>Password</label>
                                <Link to="/forgot-password" className="auth-forgot">Forgot?</Link>
                            </div>
                            <FiLock className="input-icon" style={{ bottom: '0.85rem' }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{ paddingRight: '3rem' }}
                            />
                            <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Signing in...' : <><span>Sign In</span> <FiArrowRight /></>}
                        </button>
                    </form>

                    <p className="auth-footer" style={{ marginTop: '1.25rem' }}>
                        New to Sapphire Sparks? <Link to="/signup">Create an account</Link>
                    </p>

                    <div className="auth-admin-hint">
                        <strong>Admin access?</strong> Use your admin email &amp; password to log in — you'll be redirected to the Admin Console automatically.
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
