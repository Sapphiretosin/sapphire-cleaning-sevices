import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const submitBooking = (e) => {
        e.preventDefault();
        // In a real app, this would send data to an API
        setStep(4); // Success step
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
                                            {formData.serviceType === service && <FiCheckCircle className="check-icon text-secondary" />}
                                        </label>
                                    ))}
                                </div>

                                <h3 className="mb-4 mt-6">Size of your space?</h3>
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
                                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Time Preference</label>
                                        <select name="time" value={formData.time} onChange={handleInputChange} required>
                                            <option value="">Select a time</option>
                                            <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
                                            <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                                        </select>
                                    </div>
                                </div>

                                <h3 className="mb-4">Your Details</h3>
                                <div className="contact-inputs">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required />
                                    </div>
                                    <div className="input-group full-width">
                                        <label>Service Address</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St, Apt 4B" required />
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

                                <div className="payment-notice mt-4 text-sm text-muted">
                                    * Payment is collected securely after the service is completed. No charge today.
                                </div>

                                <div className="form-actions mt-8 flex justify-between">
                                    <button className="btn btn-outline" onClick={prevStep}>Edit Details</button>
                                    <button className="btn btn-primary" onClick={submitBooking}>Confirm Booking</button>
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
                                <div className="success-icon-wrapper mx-auto mb-6">
                                    <FiCheckCircle size={64} className="text-secondary" />
                                </div>
                                <h2 className="mb-4">Booking Confirmed!</h2>
                                <p className="text-muted mb-8">
                                    Thank you, {formData.name.split(' ')[0]}! We've sent a confirmation email to {formData.email}.
                                    Our team will see you on {formData.date}.
                                </p>
                                <a href="/" className="btn btn-outline mx-auto">Return Home</a>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Booking;
