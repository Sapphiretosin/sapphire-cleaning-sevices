import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoSparklesOutline } from 'react-icons/io5';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page flex flex-col items-center justify-center min-vh-100 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="not-found-content glass-panel p-12"
            >
                <div className="error-code text-gradient font-black">404</div>
                <h1 className="mb-4">Oops! This Spark is Missing.</h1>
                <p className="text-muted mb-8 max-w-md mx-auto">
                    The page you're looking for was either swept away or never existed.
                    Let's get you back to the sparkling main page.
                </p>
                <Link to="/" className="btn btn-primary flex items-center gap-2 mx-auto w-fit">
                    <IoSparklesOutline />
                    Return to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
