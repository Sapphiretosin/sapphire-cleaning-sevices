import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="breadcrumbs-nav container">
            <ul className="breadcrumbs-list">
                <li>
                    <Link to="/" className="breadcrumb-item home-icon">
                        <FiHome />
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

                    return (
                        <li key={to}>
                            <FiChevronRight className="separator" />
                            {last ? (
                                <span className="breadcrumb-item active">{name}</span>
                            ) : (
                                <Link to={to} className="breadcrumb-item">
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
