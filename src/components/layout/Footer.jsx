import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="nav-logo mb-4">
                        <span className="text-gradient">Sapphire</span> Cleaning
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
                        <li><a href="#about">About Us</a></li>
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
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <FiMail className="contact-icon" />
                            <span>hello@sapphirecleaning.com</span>
                        </li>
                        <li>
                            <FiMapPin className="contact-icon" />
                            <span>123 Sparkle Ave, Suite 100<br />Clean City, XX 12345</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} Sapphire Cleaning Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
