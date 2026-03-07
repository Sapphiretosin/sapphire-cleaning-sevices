import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { IoDiamondOutline } from 'react-icons/io5';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { currentUser, logout, userData } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const getDashboardLink = () => {
        if (userData?.role === 'admin') return '/admin';
        if (userData?.role === 'employee') return '/employee';
        return '/dashboard';
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

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

                    {currentUser && (
                        <Link to={getDashboardLink()} className={location.pathname === getDashboardLink() ? 'active' : ''}>
                            {userData?.role === 'admin' ? 'Admin Panel' : userData?.role === 'employee' ? 'Staff Portal' : 'My Account'}
                        </Link>
                    )}

                    {!currentUser && (
                        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
                    )}

                    {currentUser && (
                        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors ml-4">
                            <FiLogOut /> Logout
                        </button>
                    )}

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
                    {currentUser ? (
                        <>
                            <Link to={getDashboardLink()}>{userData?.role === 'admin' ? 'Admin Panel' : userData?.role === 'employee' ? 'Staff Portal' : 'My Account'}</Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 w-full p-4">
                                <FiLogOut /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    <Link to="/book" className="btn btn-primary mt-4">Book Now</Link>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
