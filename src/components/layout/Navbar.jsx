import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled glass-panel' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo flex items-center gap-3">
                    <div className="logo-wrapper">
                        <img
                            src={logo}
                            alt="Sapphire Sparks"
                        />
                    </div>
                    <span className="brand-name flex flex-col leading-tight">
                        <span className="text-gradient font-bold text-2xl">Sapphire</span>
                        <span className="text-primary font-medium text-sm tracking-widest uppercase">Sparks</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                    <a href="/#about">How it Works</a>
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
                    <Link to="/book" className="btn btn-primary ml-4">Book Now</Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle mobile-only"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'is-open' : ''} glass-panel dark-mode`}>
                <div className="mobile-links">
                    <Link to="/">Home</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/about">About</Link>
                    <a href="/#about">How it Works</a>
                    <Link to="/contact">Contact</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/book" className="btn btn-primary mt-4">Book Now</Link>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
