import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import logo from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="nav-logo mb-6 flex items-center gap-4">
                        <div className="logo-wrapper">
                            <img
                                src={logo}
                                alt="Sapphire Sparks"
                            />
                        </div>
                        <span className="brand-name flex flex-col leading-none">
                            <span className="text-secondary font-bold text-3xl">Sapphire</span>
                            <span className="text-white font-medium text-xs tracking-[0.3em] uppercase mt-1">Sparks</span>
                        </span>
                    </Link>
                    <p className="text-muted mb-4">
                        Professional cleaning services tailored to your needs. We bring the sparkle back to your home and office with eco-friendly products and expert care.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><FiFacebook /></a>
                        <a href="#" aria-label="Twitter"><FiTwitter /></a>
                        <a href="#" aria-label="Instagram"><FiInstagram /></a>
                    </div>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Services</h4>
                    <ul className="footer-links">
                        <li><Link to="/services#standard">Standard Cleaning</Link></li>
                        <li><Link to="/services#deep">Deep Cleaning</Link></li>
                        <li><Link to="/services#move">Move In/Out</Link></li>
                        <li><Link to="/services#office">Office Cleaning</Link></li>
                        <li><Link to="/services#eco">Eco-Friendly Cleaning</Link></li>
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Company</h4>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><a href="#careers">Careers</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4 className="footer-heading">Contact Us</h4>
                    <ul className="footer-contact">
                        <li>
                            <FiPhone className="contact-icon" />
                            <span>08101099961</span>
                        </li>
                        <li>
                            <FiMail className="contact-icon" />
                            <span>info@sapphiresparks.com</span>
                        </li>
                        <li>
                            <FiMapPin className="contact-icon" />
                            <span>Lagos, Nigeria</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} Sapphire Sparks Cleaning & Facility Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
