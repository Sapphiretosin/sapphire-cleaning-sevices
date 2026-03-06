import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './FAQ.css';

const faqs = [
    {
        question: "What's included in a standard cleaning?",
        answer: "Standard cleaning includes dusting all surfaces, vacuuming and mopping floors, cleaning bathrooms (toilets, showers, sinks), and wiping down kitchen surfaces including the exterior of appliances."
    },
    {
        question: "Do I need to be home for the cleaning?",
        answer: "It's completely up to you! Most of our clients provide us with a key or access code. All our cleaners are vetted and background-checked for your peace of mind."
    },
    {
        question: "What is your cancellation policy?",
        answer: "We require at least 24 hours notice for cancellations. Within 24 hours, a small cancellation fee may apply."
    },
    {
        question: "Do you bring your own cleaning supplies?",
        answer: "Yes, we arrive fully equipped with premium, eco-friendly cleaning products and professional tools. If you have specific products you prefer us to use, just let us know!"
    },
    {
        question: "Are you insured and bonded?",
        answer: "Absolutely. Sapphire Sparks is fully insured and bonded, protecting your home and our professionals at all times."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`faq-item glass-panel ${isOpen ? 'open' : ''}`} onClick={onClick}>
            <div className="faq-question">
                <h3>{question}</h3>
                <div className="faq-icon">
                    {isOpen ? <FiMinus /> : <FiPlus />}
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer-wrapper"
                    >
                        <p className="faq-answer">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="section faq-section" id="faq">
            <div className="container">
                <div className="text-center section-header">
                    <span className="badge">Knowledge Base</span>
                    <h2 className="section-title">Common <span className="text-gradient">Questions</span></h2>
                    <p className="section-subtitle">
                        Everything you need to know about our premium cleaning experience.
                    </p>
                </div>

                <div className="faq-grid max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            {...faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
