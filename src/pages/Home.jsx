import React from 'react';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <ServicesOverview />
            <HowItWorks />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;
