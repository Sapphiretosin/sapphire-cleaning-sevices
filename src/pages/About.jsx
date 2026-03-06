import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiZap, FiCheckCircle, FiShield, FiHeart } from 'react-icons/fi';
import './About.css';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const services = [
        {
            title: "Residential Cleaning",
            items: ["Housekeeping", "Deep cleaning", "Window and floor polishing"]
        },
        {
            title: "Commercial & Office Cleaning",
            items: ["Office sanitization", "Carpet and upholstery cleaning", "Regular janitorial services"]
        },
        {
            title: "Facility Maintenance",
            items: ["Corporate facility management", "Event cleaning and preparation", "Long-term maintenance contracts"]
        },
        {
            title: "Specialized Services",
            items: ["Move-in/move-out cleaning", "Post-construction cleaning", "Eco-friendly cleaning solutions"]
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero section">
                <div className="container text-center">
                    <motion.h1
                        className="text-gradient mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        About Sapphire Sparks
                    </motion.h1>
                    <motion.p
                        className="text-muted max-w-2xl mx-auto"
                        {...fadeIn}
                    >
                        Igniting Clean Spaces, One Sparkle at a Time.
                    </motion.p>
                </div>
            </section>

            {/* Content Section */}
            <section className="about-content section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="mb-6">Who We Are</h2>
                            <p className="mb-4">
                                <strong>Sapphire Sparks</strong> is a premium cleaning and facility management company dedicated to providing <strong>exceptional, reliable, and professional cleaning services</strong>. Our mission is to bring <strong>sparkling cleanliness and hygiene</strong> to homes, offices, and commercial spaces, ensuring every space we touch shines like a gem.
                            </p>
                            <p>
                                Founded with the vision to deliver <strong>high-quality, trustworthy, and innovative cleaning solutions</strong>, Sapphire Sparks combines modern cleaning techniques, eco-friendly products, and a team of trained professionals to create <strong>safe, healthy, and beautiful environments</strong> for our clients.
                            </p>
                        </motion.div>
                        <motion.div
                            className="glass-panel p-8 space-y-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg h-fit">
                                    <FiTarget className="text-primary text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                                    <p className="text-muted text-sm">To be <strong>Nigeria’s most trusted and innovative cleaning company</strong>, renowned for excellence, consistency, and customer satisfaction.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 bg-cyan-100 rounded-lg h-fit">
                                    <FiZap className="text-secondary text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                                    <ul className="text-muted text-sm space-y-1 list-disc pl-4">
                                        <li>Deliver <strong>premium cleaning services</strong> that exceed client expectations.</li>
                                        <li>Maintain a <strong>high standard of hygiene, safety, and professionalism</strong>.</li>
                                        <li>Use <strong>eco-friendly and sustainable cleaning methods</strong>.</li>
                                        <li>Foster <strong>trust and long-term relationships</strong> with our clients.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="about-services section bg-gray-50">
                <div className="container">
                    <h2 className="text-center mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="glass-panel p-6"
                                {...fadeIn}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="text-lg font-bold mb-4 text-primary">{service.title}</h3>
                                <ul className="space-y-2">
                                    {service.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-muted flex items-start gap-2">
                                            <FiCheckCircle className="text-secondary mt-1 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2>Why Choose Sapphire Sparks</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { icon: FiHeart, title: "Professional Team", text: "Trained, vetted, and courteous staff." },
                            { icon: FiZap, title: "Premium Equipment", text: "Modern tools and technology for efficient cleaning." },
                            { icon: FiShield, title: "Eco-Friendly", text: "Safe for families, employees, and the environment." },
                            { icon: FiCheckCircle, title: "Reliability", text: "Punctual, thorough, and committed to your satisfaction." },
                            { icon: FiTarget, title: "Scalable Services", text: "From single homes to large estates and corporate offices." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6"
                                {...fadeIn}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="text-secondary text-xl" />
                                </div>
                                <h4 className="text-sm font-bold mb-2">{item.title}</h4>
                                <p className="text-xs text-muted leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Promise CTA */}
            <section className="section pb-24">
                <div className="container">
                    <div className="glass-panel p-12 text-center bg-primary text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-white mb-6">Our Brand Promise</h2>
                            <p className="text-xl mb-8 opacity-90 italic">“We don’t just clean; we ignite spaces with life and shine.”</p>
                            <p className="max-w-2xl mx-auto mb-10 opacity-80">
                                Every project we undertake is executed with <strong>precision, care, and excellence</strong>, leaving spaces spotless, sanitized, and sparkling.
                            </p>
                            <div className="flex justify-center gap-4">
                                <a href="/book" className="btn btn-primary">Book a Sparkle</a>
                                <a href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">Contact Us</a>
                            </div>
                        </div>
                        {/* Abstract Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-10 blur-3xl -ml-32 -mb-32 rounded-full"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
