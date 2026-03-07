import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiLoader, FiAlertCircle, FiCreditCard, FiInfo, FiArrowRight } from 'react-icons/fi';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PaystackIntegration from '../components/payments/PaystackIntegration';
import './Booking.css';

const Booking = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: '',
        date: '',
        time: '',
        bedrooms: '1',
        bathrooms: '1',
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const validateStep = (currentStep) => {
        let newErrors = {};
        if (currentStep === 1) {
            if (!formData.serviceType) newErrors.serviceType = 'Please select a service type.';
        } else if (currentStep === 2) {
            if (!formData.date) newErrors.date = 'Date is required.';
            if (!formData.time) newErrors.time = 'Time preference is required.';
            if (!formData.name.trim()) newErrors.name = 'Full name is required.';
            if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Please enter a valid email.';
            if (!formData.address.trim()) newErrors.address = 'Service address is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };
    const prevStep = () => setStep(step - 1);

    const submitBooking = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setSubmitError('');

            const bookingData = {
                ...formData,
                userId: currentUser ? currentUser.uid : 'anonymous',
                status: 'pending',
                paymentStatus: 'pending',
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'bookings'), bookingData);
            setBookingId(docRef.id);
            setStep(4); // Move to payment step
        } catch (err) {
            console.error("Error adding booking: ", err);
            setSubmitError('Failed to submit booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaymentSuccess = async (reference) => {
        setPaymentStatus('success');
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            await updateDoc(bookingRef, {
                paymentStatus: 'paid',
                paymentReference: reference.reference,
                paidAt: serverTimestamp(),
                status: 'confirmed'
            });
        } catch (err) {
            console.error("Error updating payment status:", err);
        }
    };

    return (
        <div className="booking-page section">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-gradient mb-2">Book Your Cleaning</h1>
                    <p className="text-muted">In just a few simple steps, you'll be on your way to a spotless space.</p>
                </div>

                {/* Progress Tracker */}
                <div className="progress-tracker mb-8">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`progress-step ${step >= num ? 'active' : ''}`}>
                            <div className="step-circle">{step > num ? <FiCheckCircle /> : num}</div>
                            <span className="step-label">
                                {num === 1 ? 'Service' : num === 2 ? 'Details' : 'Confirm'}
                            </span>
                            {num < 3 && <div className="step-line"></div>}
                        </div>
                    ))}
                </div>

                <div className="booking-form-container glass-panel">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: Service Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="form-step"
                            >
                                <h3 className="mb-4">What service do you need?</h3>
                                <div className="service-options">
                                    {['Standard Cleaning', 'Deep Cleaning', 'Move In/Out', 'Office Cleaning'].map(service => (
                                        <label
                                            key={service}
                                            className={`service-option ${formData.serviceType === service ? 'selected' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="serviceType"
                                                value={service}
                                                checked={formData.serviceType === service}
                                                onChange={handleInputChange}
                                                className="hidden-radio"
                                            />
                                            <span className="option-text">{service}</span>
                                            {formData.serviceType === service && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                >
                                                    <FiCheckCircle className="check-icon" />
                                                </motion.div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                {errors.serviceType && <span className="error-text">{errors.serviceType}</span>}

                                <h3 className="mb-4 mt-6">Size of your space??</h3>
                                <div className="size-inputs">
                                    <div className="input-group">
                                        <label>Bedrooms</label>
                                        <select name="bedrooms" value={formData.bedrooms} onChange={handleInputChange}>
                                            {[1, 2, 3, 4, 5, '6+'].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Bathrooms</label>
                                        <select name="bathrooms" value={formData.bathrooms} onChange={handleInputChange}>
                                            {[1, 1.5, 2, 2.5, 3, '4+'].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions mt-8 text-right">
                                    <button
                                        className="btn btn-primary"
                                        onClick={nextStep}
                                        disabled={!formData.serviceType}
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Personal & Contact Detail */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="form-step"
                            >
                                <h3 className="mb-4">When should we come?</h3>
                                <div className="datetime-inputs mb-6">
                                    <div className="input-group">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className={errors.date ? 'input-error' : ''}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                        />
                                        {errors.date && <span className="error-text">{errors.date}</span>}
                                    </div>
                                    <div className="input-group">
                                        <label>Time Preference</label>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            className={errors.time ? 'input-error' : ''}
                                            required
                                        >
                                            <option value="">Select a time</option>
                                            <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
                                            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                                        </select>
                                        {errors.time && <span className="error-text">{errors.time}</span>}
                                    </div>
                                </div>

                                <h3 className="mb-4">Your Details</h3>
                                <div className="contact-inputs">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={errors.name ? 'input-error' : ''}
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && <span className="error-text">{errors.name}</span>}
                                    </div>
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={errors.email ? 'input-error' : ''}
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                    <div className="input-group full-width">
                                        <label>Service Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={errors.address ? 'input-error' : ''}
                                            placeholder="123 Main St, Apt 4B"
                                            required
                                        />
                                        {errors.address && <span className="error-text">{errors.address}</span>}
                                    </div>
                                </div>

                                <div className="form-actions mt-8 flex justify-between">
                                    <button className="btn btn-outline" onClick={prevStep}>Back</button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={nextStep}
                                        disabled={!formData.date || !formData.time || !formData.name || !formData.address}
                                    >
                                        Review Details
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: Confirmation */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="form-step"
                            >
                                <h3 className="mb-4">Review Your Booking</h3>

                                <div className="summary-card">
                                    <div className="summary-row">
                                        <span className="summary-label">Service:</span>
                                        <span className="summary-value font-semibold">{formData.serviceType}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label">Space Config:</span>
                                        <span className="summary-value">{formData.bedrooms} Bed, {formData.bathrooms} Bath</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label">When:</span>
                                        <span className="summary-value">{formData.date} | {formData.time}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label">Where:</span>
                                        <span className="summary-value">{formData.address}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label">Contact:</span>
                                        <span className="summary-value">{formData.name} ({formData.email})</span>
                                    </div>
                                </div>

                                <div className="payment-notice mt-4 text-sm text-secondary bg-secondary/5 p-4 rounded-xl border border-secondary/10 flex items-start gap-3">
                                    <FiInfo className="mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold">Instant Confirmation</p>
                                        <p>Pay now to lock in your slot and get 5% off future cleanings. Payment is secured by Paystack.</p>
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="error-alert p-3 bg-red-50 text-red-600 rounded-lg mb-4 text-sm flex items-center gap-2">
                                        <FiAlertCircle /> {submitError}
                                    </div>
                                )}

                                <div className="form-actions mt-8 flex justify-between">
                                    <button className="btn btn-outline" onClick={prevStep} disabled={isSubmitting}>Edit Details</button>
                                    <button
                                        className="btn btn-primary flex items-center gap-2"
                                        onClick={submitBooking}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <FiLoader className="animate-spin" /> Confirming...
                                            </>
                                        ) : 'Confirm Booking'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: Success */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="form-step text-center py-8"
                            >
                                {paymentStatus === 'success' ? (
                                    <>
                                        <div className="success-icon-wrapper mx-auto mb-6 bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
                                            <FiCheckCircle size={40} />
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold">Booking Confirmed!</h2>
                                        <p className="text-muted mb-8 text-lg">
                                            Thank you, {formData.name.split(' ')[0]}! Your payment was successful and your slot is officially locked in.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link to="/dashboard" className="btn btn-primary px-8">Go to Dashboard</Link>
                                            <button onClick={() => window.print()} className="btn btn-outline">Print Receipt</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="payment-icon-wrapper mx-auto mb-6 bg-primary/10 text-primary w-20 h-20 rounded-full flex items-center justify-center">
                                            <FiCreditCard size={40} />
                                        </div>
                                        <h2 className="mb-4 text-3xl font-bold">Secure Your Slot</h2>
                                        <p className="text-muted mb-8 leading-relaxed max-w-md mx-auto">
                                            Your details are saved! Now, simply complete the payment to finalize your booking with Sapphire Sparks.
                                        </p>

                                        <div className="max-w-xs mx-auto mb-8">
                                            <div className="glass-panel p-4 text-left border border-slate-100 mb-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-muted">Service Total</span>
                                                    <span className="font-bold text-xl">$150.00</span>
                                                </div>
                                                <div className="text-xs text-muted flex items-center gap-1">
                                                    <FiCheckCircle className="text-green-500" /> Professional Grade Equipment
                                                </div>
                                            </div>

                                            <PaystackIntegration
                                                email={currentUser?.email || formData.email}
                                                amount={150}
                                                metadata={{
                                                    bookingId,
                                                    serviceType: formData.serviceType
                                                }}
                                                onSuccess={handlePaymentSuccess}
                                                buttonText="Pay & Confirm Now"
                                            />

                                            <button
                                                onClick={() => navigate('/dashboard')}
                                                className="text-muted text-sm mt-4 hover:text-primary transition-all flex items-center justify-center gap-2 w-full"
                                            >
                                                Pay Later in Dashboard <FiArrowRight />
                                            </button>
                                        </div>

                                        <p className="text-xs text-muted flex items-center justify-center gap-1 mt-4">
                                            <FiInfo /> Card details are encrypted and never stored on our servers.
                                        </p>
                                    </>
                                )}
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Booking;
