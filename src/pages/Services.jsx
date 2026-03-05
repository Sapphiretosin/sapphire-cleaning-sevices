import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import './Services.css';

const Services = () => {
    const serviceDetails = [
        {
            id: "standard",
            title: "Standard Cleaning",
            price: "Starting at $120",
            description: "Our most popular package to keep your home looking its best consistently.",
            points: [
                "Dusting all accessible surfaces",
                "Wiping down mirrors and glass fixtures",
                "Cleaning all floor surfaces (vacuum/mop)",
                "Emptying trash bins",
                "Cleaning and sanitizing toilets, showers, and sinks",
                "Wiping outside of kitchen cabinets and appliances"
            ]
        },
        {
            id: "deep",
            title: "Deep Cleaning",
            price: "Starting at $250",
            description: "A comprehensive, top-to-bottom clean recommended for first-time customers or spring cleaning.",
            points: [
                "Everything in Standard Cleaning",
                "Hand-wiping baseboards and door frames",
                "Cleaning inside window sills and tracks",
                "Detailed dusting of blinds and ceiling fans",
                "Spot cleaning walls",
                "Cleaning inside microwave and oven (optional)"
            ]
        },
        {
            id: "move",
            title: "Move In / Move Out",
            price: "Starting at $300",
            description: "Ensure you get your deposit back or step into a fresh, perfect new home.",
            points: [
                "Everything in Deep Cleaning",
                "Cleaning inside all empty cabinets and drawers",
                "Cleaning inside the refrigerator",
                "Detailed cleaning of all appliances",
                "Removing leftover debris"
            ]
        }
    ];

    return (
        <div className="services-page">
            <div className="services-hero text-center section">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gradient"
                    >
                        Our Cleaning Packages
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted max-w-2xl mx-auto mt-4"
                    >
                        Transparent pricing and detailed checklists so you know exactly what to expect.
                        Customize any package to fit your specific needs.
                    </motion.p>
                </div>
            </div>

            <div className="container pb-section">
                <div className="detailed-services-grid">
                    {serviceDetails.map((service, index) => (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            className="detailed-service-card glass-panel"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card-header">
                                <h2>{service.title}</h2>
                                <div className="price-tag">{service.price}</div>
                            </div>

                            <p className="service-full-desc">{service.description}</p>

                            <div className="includes-section">
                                <h4>What's Included:</h4>
                                <ul className="checklist">
                                    {service.points.map((point, i) => (
                                        <li key={i}>
                                            <FiCheckCircle className="check-icon text-secondary" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-actions">
                                <a href="/book" className="btn btn-primary w-full">Book This Service</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
