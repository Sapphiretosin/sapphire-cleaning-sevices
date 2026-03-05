import React from 'react';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <ServicesOverview />
            <HowItWorks />
            <Testimonials />
        </div>
    );
};

export default Home;
