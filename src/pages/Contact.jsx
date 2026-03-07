import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Contact.css';

// Fix for default marker icon issues in Leaflet with React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [errors, setErrors] = useState({});

    // Service center location: Ado Ekiti, Nigeria
    const position = [7.65, 5.27];

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required.';
        if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Please enter a valid email.';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
        if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div className="contact-page">
            <div className="contact-hero text-center section">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gradient"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted max-w-2xl mx-auto mt-4"
                    >
                        Have a question about our services? Want to discuss a custom cleaning plan?
                        We'd love to hear from you.
                    </motion.p>
                </div>
            </div>

            <div className="container pb-section">
                <div className="contact-grid">

                    <motion.div
                        className="contact-info-cards"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="info-card glass-panel">
                            <div className="info-icon">
                                <FiPhone />
                            </div>
                            <div className="info-content">
                                <h3>Call Us</h3>
                                <p>Mon-Fri from 8am to 6pm.</p>
                                <a href="tel:+15551234567" className="info-link">+1 (555) 123-4567</a>
                            </div>
                        </div>

                        <div className="info-card glass-panel">
                            <div className="info-icon">
                                <FiMail />
                            </div>
                            <div className="info-content">
                                <h3>Email Us</h3>
                                <p>We'll respond within 24 hours.</p>
                                <a href="mailto:hello@sapphirecleaning.com" className="info-link">hello@sapphirecleaning.com</a>
                            </div>
                        </div>

                        <div className="info-card glass-panel">
                            <div className="info-icon">
                                <FiMapPin />
                            </div>
                            <div className="info-content">
                                <h3>Visit Us</h3>
                                <p>Visit our headquarters.</p>
                                <span className="info-link">No 8, Ilokun Estate, opposite New Reality Christian centre,<br />Ado Ekiti, Nigeria</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-wrapper glass-panel"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="mb-6">Send a Message</h2>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="success-message"
                            >
                                <div className="success-icon">✓</div>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We've received your message and will get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="input-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={errors.name ? 'input-error' : ''}
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && <span className="error-text">{errors.name}</span>}
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'input-error' : ''}
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="input-group full-width">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'input-error' : ''}
                                        placeholder="How can we help?"
                                        required
                                    />
                                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                                </div>

                                <div className="input-group full-width">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'input-error' : ''}
                                        placeholder="Tell us what you need..."
                                        rows="5"
                                        required
                                    ></textarea>
                                    {errors.message && <span className="error-text">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary mt-4 submit-btn ${status === 'submitting' ? 'loading' : ''}`}
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending...' : (
                                        <>
                                            <span>Send Message</span>
                                            <FiSend className="ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    className="map-section mt-16 glass-panel overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="map-container-wrapper">
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="contact-map">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    <strong>Sapphire Sparks HQ</strong> <br />
                                    No 8, Ilokun Estate, <br />
                                    Ado Ekiti, Nigeria
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="map-overlay-info glass-panel-dark">
                        <h3>Our Service Area</h3>
                        <p>We provide premium cleaning services across Ado Ekiti and the surrounding regions in Nigeria.</p>
                        <div className="mt-4 flex gap-4">
                            <div className="badge">Residential</div>
                            <div className="badge">Commercial</div>
                            <div className="badge">Industrial</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
