import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiAlertCircle, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions');
        } catch (err) {
            setError('Failed to reset password: ' + (err.message || 'Check your email and try again'));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="forgot-password-page pt-32 pb-20 container flex justify-center items-center">
            <motion.div
                className="glass-panel forgot-card max-w-md w-full p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-muted">Enter your email to receive a password reset link</p>
                </div>

                {error && (
                    <motion.div
                        className="alert error-alert flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiAlertCircle />
                        <span>{error}</span>
                    </motion.div>
                )}

                {message && (
                    <motion.div
                        className="alert success-alert flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-lg text-green-600 mb-6"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiCheckCircle />
                        <span>{message}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="input-group">
                        <label className="text-sm font-medium mb-2 block">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg"
                    >
                        {loading ? 'Sending...' : (
                            <>
                                Send Reset Link <FiArrowRight />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-4">
                    <p className="text-muted text-sm">
                        Remembered your password? <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
                    </p>
                    <p className="text-muted text-sm">
                        Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
