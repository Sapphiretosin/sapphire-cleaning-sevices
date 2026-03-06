import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiStar, FiSun, FiWind, FiBriefcase, FiCheck } from 'react-icons/fi';
import './ServicesOverview.css';
import './ServicesShowcase.css';

const services = [
    {
        icon: <FiHome />,
        title: "Standard Cleaning",
        description: "Regular cleaning to keep your home fresh, tidy, and comfortable week after week.",
        features: ["Dusting & Wiping", "Vacuuming & Mopping", "Bathroom Sanitization", "Kitchen Countertops"]
    },
    {
        icon: <FiStar />,
        title: "Deep Cleaning",
        description: "Thorough, top-to-bottom cleaning that reaches the hidden grime standard cleaning misses.",
        features: ["Baseboard Cleaning", "Inside Ovens/Fridges", "Window Tracks", "Detailed Scrubbing"],
        highlight: true
    },
    {
        icon: <FiBriefcase />,
        title: "Office & Commercial",
        description: "Professional cleaning tailored to business hours, ensuring a pristine workspace.",
        features: ["Workspace Sanitization", "Restroom Maintenance", "Trash Removal", "Floor Care"]
    },
    {
        icon: <FiSun />,
        title: "Move In/Out Cleaning",
        description: "Make your transition seamless with a spotless slate for the next occupant or yourself.",
        features: ["Empty Cabinet Inside", "Deep Appliance Clean", "Wall Spot Checks", "Complete Dusting"]
    }
];

const ServicesOverview = () => {
    return (
        <section className="section bg-light" id="services-overview">
            <div className="container">
                <div className="text-center section-header">
                    <span className="badge">Our Expertise</span>
                    <h2 className="section-title">Services Tailored for <span className="text-gradient">You</span></h2>
                    <p className="section-subtitle">
                        Whether you need a quick touch-up or a comprehensive deep clean, our experienced professionals have you covered.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={`service-card ${service.highlight ? 'highlight' : 'glass-panel'}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>

                            <ul className="service-features">
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex}>
                                        <FiCheck className="check-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`btn w-full mt-auto ${service.highlight ? 'btn-primary' : 'btn-outline'}`}>
                                Learn More
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="services-showcase mt-16 glass-panel overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="showcase-content">
                        <h3 className="mb-4 text-2xl font-bold">The Sapphire Sparks Difference</h3>
                        <p className="text-muted mb-6">
                            We don't just clear the clutter; we deeply sanitize and polish every surface.
                            Our team arrives fully equipped with eco-friendly products and commercial-grade tools to ensure a flawless finish.
                        </p>
                        <ul className="checklist mb-6">
                            <li><FiCheck className="check-icon text-secondary" /> <span>Vetted & Trained Professionals</span></li>
                            <li><FiCheck className="check-icon text-secondary" /> <span>Premium Quality Products</span></li>
                            <li><FiCheck className="check-icon text-secondary" /> <span>100% Satisfaction Guarantee</span></li>
                        </ul>
                        <a href="/services" className="btn btn-outline">View Details</a>
                    </div>
                    <div className="showcase-image">
                        <img src="/images/services.png" alt="Pristine deep cleaned kitchen" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesOverview;
