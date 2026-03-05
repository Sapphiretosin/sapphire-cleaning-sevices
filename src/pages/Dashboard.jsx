import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiCalendar, FiClock, FiCheckCircle, FiSettings,
    FiUser, FiInfo, FiLogOut, FiGift, FiShield,
    FiMail, FiPhone, FiMapPin, FiBell, FiCreditCard,
    FiPlus, FiTrash2, FiStar
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState({
        name: "Alex Johnson",
        email: "alex.j@example.com",
        phone: "+1 (555) 000-1234",
        address: "123 Maple Street, Clean City",
        memberSince: "March 2026",
        rewardPoints: 150
    });

    const notifications = [
        { id: 1, title: "Cleaner assigned", text: "Your deep clean on March 12 has been assigned to 'Maria'.", time: "2h ago", type: "info" },
        { id: 2, title: "Special Offer!", text: "Refer a friend this week and get double points.", time: "1d ago", type: "promo" }
    ];

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

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="tab-content"
                    >
                        {/* Stats Widgets */}
                        <div className="stats-row mb-8">
                            <div className="glass-panel stat-card text-center">
                                <FiStar className="stat-icon text-yellow-500 mb-2" />
                                <h3>{user.rewardPoints}</h3>
                                <p className="text-muted text-xs uppercase font-bold">Reward Points</p>
                            </div>
                            <div className="glass-panel stat-card text-center">
                                <FiCalendar className="stat-icon text-blue-500 mb-2" />
                                <h3>1</h3>
                                <p className="text-muted text-xs uppercase font-bold">Upcoming</p>
                            </div>
                            <div className="glass-panel stat-card text-center">
                                <FiCheckCircle className="stat-icon text-green-500 mb-2" />
                                <h3>3</h3>
                                <p className="text-muted text-xs uppercase font-bold">Total Done</p>
                            </div>
                        </div>

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

                        <div className="dashboard-widgets">
                            <div className="glass-panel widget-card">
                                <FiGift className="widget-icon text-secondary" />
                                <h4>Refer a Friend</h4>
                                <p className="text-sm text-muted">Get $20 off your next cleaning for every referral.</p>
                                <button className="btn btn-outline btn-sm mt-3">Get Invite Link</button>
                            </div>
                            <div className="glass-panel widget-card">
                                <FiShield className="widget-icon text-green-500" />
                                <h4>Pro Protection</h4>
                                <p className="text-sm text-muted">Your home is insured up to $2M during our visits.</p>
                                <button className="btn btn-outline btn-sm mt-3">View Policy</button>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'history':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="tab-content"
                    >
                        <section>
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
                    </motion.div>
                );
            case 'payments':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="tab-content"
                    >
                        <section className="glass-panel p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Payment Methods</h2>
                                <button className="btn btn-primary btn-sm flex items-center gap-2">
                                    <FiPlus /> Add Card
                                </button>
                            </div>

                            <div className="cards-list">
                                <div className="credit-card-item border p-4 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="cc-icon p-2 bg-gray-100 rounded-lg">
                                            <FiCreditCard size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold">•••• •••• •••• 4242</p>
                                            <p className="text-xs text-muted">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <button className="text-muted hover:text-red-500"><FiTrash2 /></button>
                                </div>
                            </div>

                            <div className="billing-address mt-8 pt-8 border-t">
                                <h3 className="font-bold mb-4">Default Billing Address</h3>
                                <div className="glass-panel p-4 flex items-center justify-between">
                                    <p className="text-sm">{user.address}</p>
                                    <button className="text-primary font-bold text-xs uppercase">Edit</button>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                );
            case 'profile':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="tab-content"
                    >
                        <section className="glass-panel profile-settings-form">
                            <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-grid">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Primary Address</label>
                                        <input type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-actions mt-8">
                                    <button className="btn btn-primary">Save Changes</button>
                                    <button className="btn btn-outline ml-4">Change Password</button>
                                </div>
                            </form>
                        </section>

                        <div className="danger-zone mt-8 glass-panel border-red-100">
                            <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
                            <p className="text-sm text-muted mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                            <button className="btn border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all">Delete Account</button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-page pt-24 pb-12">
            <div className="container">
                <div className="dashboard-header mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, <span className="text-gradient">{user.name}</span></h1>
                        <p className="text-muted">Manage your cleaning schedules and history.</p>
                    </div>
                    <div className="dashboard-header-right flex items-center gap-6">
                        {/* Notifications Popover Placeholder */}
                        <div className="notifications-bell relative cursor-pointer p-2 glass-panel rounded-full">
                            <FiBell size={20} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="dashboard-actions">
                            <a href="/book" className="btn btn-primary">Book New Service</a>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Sidebar */}
                    <aside className="dashboard-sidebar">
                        <div className="glass-panel profile-summary mb-6">
                            <div className="avatar-large mb-4">{user.name.split(' ').map(n => n[0]).join('')}</div>
                            <h3 className="font-bold">{user.name}</h3>
                            <p className="text-sm text-muted mb-4">{user.email}</p>
                            <div className="profile-stats border-t pt-4">
                                <div className="stat">
                                    <span className="stat-label">Member Points</span>
                                    <span className="stat-value">{user.rewardPoints}</span>
                                </div>
                            </div>
                        </div>

                        <nav className="dashboard-nav glass-panel">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                            >
                                <FiCalendar /> Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                            >
                                <FiClock /> History
                            </button>
                            <button
                                onClick={() => setActiveTab('payments')}
                                className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
                            >
                                <FiCreditCard /> Payments
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            >
                                <FiUser /> Settings
                            </button>
                            <button className="nav-item text-red-500 mt-4 border-t pt-4 w-full text-left">
                                <FiLogOut /> Logout
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="dashboard-main">
                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
