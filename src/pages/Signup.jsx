import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiMail, FiLock, FiUser, FiCalendar,
    FiAlertCircle, FiArrowRight, FiEye, FiEyeOff
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Shared auth styles

const Signup = () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return setError('Passwords do not match.');
        }
        try {
            setError('');
            setLoading(true);
            await signup(email, password, name, birthday);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create account: ' + (err.message || 'Please try again.'));
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
                    Join the<br /><em>Sapphire family.</em>
                </h2>
                <p className="auth-brand-sub">
                    Create your free account and unlock loyalty rewards, birthday surprises, and a premium cleaning experience.
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
                    <h1 className="auth-form-title">Create account</h1>
                    <p className="auth-form-subtitle">Get 100 welcome points just for signing up 🎉</p>

                    {error && (
                        <motion.div className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <FiAlertCircle /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Two fields side by side: Name + Birthday */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div className="auth-input-wrap">
                                <label>Full Name</label>
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="auth-input-wrap">
                                <label>Birthday 🎁</label>
                                <FiCalendar className="input-icon" />
                                <input
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </div>
                        </div>

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

                        {/* Two fields side by side: Password + Confirm */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div className="auth-input-wrap">
                                <label>Password</label>
                                <FiLock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{ paddingRight: '2.5rem' }}
                                />
                                <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            <div className="auth-input-wrap">
                                <label>Confirm</label>
                                <FiLock className="input-icon" />
                                <input
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{ paddingRight: '2.5rem' }}
                                />
                                <button type="button" className="auth-eye-btn" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                                    {showPasswordConfirm ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : <><span>Create Account</span> <FiArrowRight /></>}
                        </button>
                    </form>

                    <p className="auth-footer" style={{ marginTop: '1.25rem' }}>
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
