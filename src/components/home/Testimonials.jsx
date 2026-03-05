import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonials.css';

const testimonialsData = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Homeowner",
        text: "Sapphire Cleaning Services completely transformed my house! Their attention to detail is unmatched. I love coming home to a spotless, fresh-smelling space every week.",
        rating: 5,
        avatar: "S"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Office Manager",
        text: "We hired them for our office space, and the difference is night and day. The team is professional, discreet, and always reliable. Highly recommend their commercial services.",
        rating: 5,
        avatar: "M"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Recent Mover",
        text: "Used their Move-Out cleaning service and got my full deposit back without any hassle. The landlord even asked for their contact info! Worth every penny.",
        rating: 5,
        avatar: "E"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextTestimonial, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="section bg-light testimonials-section">
            <div className="container">
                <div className="text-center section-header">
                    <span className="badge">Client Stories</span>
                    <h2 className="section-title">Loved by <span className="text-gradient">Hundreds</span></h2>
                    <p className="section-subtitle">
                        Don't just take our word for it. Here's what our satisfied clients have to say about the Sapphire standard.
                    </p>
                </div>

                <div className="testimonial-slider-container">
                    <button className="slider-btn prev-btn" onClick={prevTestimonial} aria-label="Previous testimonial">
                        <FiChevronLeft size={24} />
                    </button>

                    <div className="testimonial-viewport">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="testimonial-content glass-panel"
                            >
                                <div className="rating-stars mb-4">
                                    {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                                        <FiStar key={i} className="star-icon filled" />
                                    ))}
                                </div>

                                <p className="testimonial-text">
                                    "{testimonialsData[currentIndex].text}"
                                </p>

                                <div className="testimonial-author mt-6">
                                    <div className="author-avatar">{testimonialsData[currentIndex].avatar}</div>
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonialsData[currentIndex].name}</h4>
                                        <span className="author-role">{testimonialsData[currentIndex].role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className="slider-btn next-btn" onClick={nextTestimonial} aria-label="Next testimonial">
                        <FiChevronRight size={24} />
                    </button>
                </div>

                <div className="slider-dots">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
