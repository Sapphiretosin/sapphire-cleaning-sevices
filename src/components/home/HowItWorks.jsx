import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiSmile, FiShield } from 'react-icons/fi';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FiCalendar />,
            title: "1. Book Online",
            description: "Choose your service, select a date and time, and get instant pricing. It takes less than 60 seconds."
        },
        {
            icon: <FiShield />,
            title: "2. We Clean",
            description: "Our vetted, background-checked professionals arrive fully equipped to make your space shine."
        },
        {
            icon: <FiSmile />,
            title: "3. You Relax",
            description: "Enjoy your sparkling clean home or office. We guarantee you'll be satisfied with the results."
        }
    ];

    return (
        <section className="section how-it-works-section" id="about">
            <div className="container">
                <div className="text-center section-header">
                    <span className="badge">Simple Process</span>
                    <h2 className="section-title">How It <span className="text-gradient">Works</span></h2>
                    <p className="section-subtitle">
                        We've made getting a spotless space as easy as 1-2-3.
                    </p>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="step-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="step-number glass-panel">
                                {step.icon}
                            </div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.description}</p>

                            {/* Connector line, hide on last item */}
                            {index < steps.length - 1 && (
                                <div className="step-connector desktop-only"></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="why-choose-us mt-16 glass-panel-dark"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="wcu-content">
                        <h2 className="mb-4">Why Choose Sapphire Sparks?</h2>
                        <p className="mb-6 text-gray-300">
                            Our commitment to excellence and attention to detail ensures your space is not just clean, but truly sparkling.
                            We use high-quality, eco-friendly products and trained professionals to deliver a premium service every time.
                        </p>
                        <ul className="wcu-list">
                            <li>Fully Insured & Bonded</li>
                            <li>100% Satisfaction Guarantee</li>
                            <li>Eco-Friendly Products Available</li>
                            <li>Seamless Online Booking</li>
                        </ul>
                    </div>
                    <div className="wcu-visual">
                        {/* Decorative element representing trust/quality */}
                        <div className="shield-glow">
                            <FiShield size={80} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
