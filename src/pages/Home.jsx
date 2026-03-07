import React from 'react';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import ServiceMap from '../components/features/ServiceMap';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <ServicesOverview />
            <WhyChooseUs />
            <HowItWorks />
            <ServiceMap />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;
