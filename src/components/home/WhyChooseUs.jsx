import React from 'react';
import { FiShield, FiStar, FiHeart, FiZap } from 'react-icons/fi';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FiShield />,
            title: "Fully Insured",
            text: "Your space is covered by our $2M premium insurance policy.",
            color: "blue"
        },
        {
            icon: <FiStar />,
            title: "5-Star Professionals",
            text: "Our cleaners are vetted, background-checked, and rigorously trained.",
            color: "yellow"
        },
        {
            icon: <FiHeart />,
            title: "Eco-Friendly",
            text: "We use non-toxic, sustainable products safe for pets and children.",
            color: "green"
        },
        {
            icon: <FiZap />,
            title: "Instant Booking",
            text: "Secure your slot in under 60 seconds with our seamless platform.",
            color: "secondary"
        }
    ];

    return (
        <section className="why-choose-us py-20 bg-slate-50/50">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="badge badge-primary mb-4">Why Sapphire Sparks?</span>
                    <h2 className="text-4xl font-bold">The Standard of Excellence</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="glass-panel p-8 hover:translate-y-[-10px] transition-all duration-300 border-none shadow-xl shadow-slate-200/50">
                            <div className={`icon-box text-3xl mb-6 text-${f.color}`}>
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">
                                {f.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
