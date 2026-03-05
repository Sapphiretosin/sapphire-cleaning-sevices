import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="hero-section">
            {/* Background Graphic Elements */}
            <div className="hero-bg-shape shape-1"></div>
            <div className="hero-bg-shape shape-2"></div>

            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="badge glass-panel">
                        <FiCheckCircle className="badge-icon" />
                        <span>#1 Rated Cleaning Service</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="hero-title">
                        Exceptional Cleaning <br />
                        for a <span className="text-gradient">Spotless</span> Life
                    </motion.h1>

                    <motion.p variants={itemVariants} className="hero-subtitle">
                        Experience the difference with Sapphire Cleaning. Professional, reliable, and tailored to your home or office needs. Let us do the dirty work.
                    </motion.p>

                    <motion.div variants={itemVariants} className="hero-actions">
                        <Link to="/book" className="btn btn-primary btn-lg">
                            Book a Cleaning
                        </Link>
                        <Link to="/services" className="btn btn-outline btn-lg">
                            Explore Services
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">5k+</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">10k+</span>
                            <span className="stat-label">Cleanings Done</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">4.9/5</span>
                            <span className="stat-label">Average Rating</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Image / Graphic (Space for GenAI image or abstract design) */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="glass-panel main-image-container">
                        <img src="/images/hero.png" alt="Spotless sparkling living room cleaned by Sapphire" className="hero-actual-image" />
                    </div>

                    {/* Floating Elements for 3D effect */}
                    <motion.div
                        className="floating-badge badge-1 glass-panel"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        ✨ Deep Clean
                    </motion.div>
                    <motion.div
                        className="floating-badge badge-2 glass-panel"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                    >
                        🧼 Eco-Friendly
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
