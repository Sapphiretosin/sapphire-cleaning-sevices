import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiCheckCircle, FiSettings, FiUser, FiInfo } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    const user = {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        memberSince: "March 2026"
    };

    const upcomingBookings = [
        {
            id: "#BK-8821",
            date: "March 12, 2026",
            time: "10:00 AM",
            service: "Deep Cleaning",
            status: "Confirmed",
            price: "$180"
        }
    ];

    const pastBookings = [
        {
            id: "#BK-7704",
            date: "February 15, 2026",
            time: "02:00 PM",
            service: "Standard Cleaning",
            status: "Completed",
            price: "$120"
        },
        {
            id: "#BK-6552",
            date: "January 20, 2026",
            time: "09:00 AM",
            service: "Move In Cleaning",
            status: "Completed",
            price: "$250"
        }
    ];

    return (
        <div className="dashboard-page pt-24 pb-12">
            <div className="container">
                <div className="dashboard-header mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, <span className="text-gradient">{user.name}</span></h1>
                        <p className="text-muted">Manage your cleaning schedules and history.</p>
                    </div>
                    <div className="dashboard-actions">
                        <a href="/book" className="btn btn-primary">Book New Service</a>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Sidebar */}
                    <aside className="dashboard-sidebar">
                        <div className="glass-panel profile-summary mb-6">
                            <div className="avatar-large mb-4">AJ</div>
                            <h3 className="font-bold">{user.name}</h3>
                            <p className="text-sm text-muted mb-4">{user.email}</p>
                            <div className="profile-stats border-t pt-4">
                                <div className="stat">
                                    <span className="stat-label">Total Cleanings</span>
                                    <span className="stat-value">3</span>
                                </div>
                            </div>
                        </div>

                        <nav className="dashboard-nav glass-panel">
                            <a href="#overview" className="nav-item active"><FiCalendar /> Overview</a>
                            <a href="#history" className="nav-item"><FiClock /> History</a>
                            <a href="#profile" className="nav-item"><FiUser /> Profile Settings</a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="dashboard-main">
                        {/* Upcoming Section */}
                        <section className="mb-10">
                            <div className="section-title-box mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FiCalendar className="text-secondary" /> Upcoming Bookings
                                </h2>
                            </div>

                            {upcomingBookings.length > 0 ? (
                                <div className="bookings-list">
                                    {upcomingBookings.map(booking => (
                                        <motion.div
                                            key={booking.id}
                                            className="booking-card glass-panel flex-row"
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="booking-info">
                                                <span className="booking-id">{booking.id}</span>
                                                <h3>{booking.service}</h3>
                                                <div className="booking-meta">
                                                    <span><FiCalendar /> {booking.date}</span>
                                                    <span><FiClock /> {booking.time}</span>
                                                </div>
                                            </div>
                                            <div className="booking-status">
                                                <span className="status-badge badge-confirmed">{booking.status}</span>
                                                <span className="price">{booking.price}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-panel text-center p-8">
                                    <p className="text-muted">No upcoming bookings scheduled.</p>
                                </div>
                            )}
                        </section>

                        {/* History Section */}
                        <section id="history">
                            <div className="section-title-box mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FiCheckCircle className="text-green-500" /> Past Appointments
                                </h2>
                            </div>
                            <div className="history-table glass-panel">
                                <div className="table-header desktop-only">
                                    <span>Service</span>
                                    <span>Date</span>
                                    <span>Price</span>
                                    <span>Status</span>
                                </div>
                                <div className="table-body">
                                    {pastBookings.map(booking => (
                                        <div key={booking.id} className="table-row">
                                            <div className="row-main">
                                                <span className="row-title font-bold">{booking.service}</span>
                                                <span className="row-id text-xs text-muted">{booking.id}</span>
                                            </div>
                                            <span className="row-date">{booking.date}</span>
                                            <span className="row-price">{booking.price}</span>
                                            <span className="status-badge badge-completed">{booking.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
