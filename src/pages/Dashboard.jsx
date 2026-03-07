import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    FiCalendar, FiClock, FiCheckCircle, FiSettings,
    FiUser, FiInfo, FiLogOut, FiGift, FiShield,
    FiMail, FiPhone, FiMapPin, FiBell, FiCreditCard,
    FiPlus, FiTrash2, FiStar, FiLoader, FiCalendar as FiCalendarOutline
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import PaystackIntegration from '../components/payments/PaystackIntegration';
import './Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, logout, userData } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: userData?.name || currentUser?.displayName || "User",
        email: userData?.email || currentUser?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
        memberSince: userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "March 2026",
        rewardPoints: userData?.rewardPoints || 0
    });

    useEffect(() => {
        if (userData) {
            setUser({
                name: userData.name || currentUser?.displayName || "User",
                email: userData.email || currentUser?.email || "",
                phone: userData.phone || "",
                address: userData.address || "",
                memberSince: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "March 2026",
                rewardPoints: userData.rewardPoints || 0
            });
        }
    }, [userData, currentUser]);

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "bookings"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedBookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(fetchedBookings);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching bookings:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed');
    const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

    const handlePaymentSuccess = async (bookingId, reference) => {
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            const bookingData = bookings.find(b => b.id === bookingId);
            const pointsEarned = Math.floor((bookingData?.amount || 150) / 10);

            await updateDoc(bookingRef, {
                paymentStatus: 'paid',
                paymentReference: reference.reference,
                paidAt: serverTimestamp(),
                status: 'confirmed'
            });

            // Update user points if in userData
            if (userData) {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                    rewardPoints: (userData.rewardPoints || 0) + pointsEarned
                });
            }
        } catch (err) {
            console.error("Error updating payment status:", err);
        }
    };

    const notifications = [
        { id: 1, title: "Welcome to Sapphire Sparks!", text: "Manage all your cleaning appointments from this dashboard.", time: "Just now", type: "info" }
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
                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-20 gap-4">
                                <FiLoader className="text-primary animate-spin" size={40} />
                                <p className="text-muted">Loading your bookings...</p>
                            </div>
                        ) : (
                            <>
                                <div className="stats-row mb-8">
                                    <div className="glass-panel stat-card text-center">
                                        <FiStar className="stat-icon text-yellow-500 mb-2" />
                                        <h3>{user.rewardPoints}</h3>
                                        <p className="text-muted text-xs uppercase font-bold">Reward Points</p>
                                    </div>
                                    <div className="glass-panel stat-card text-center">
                                        <FiCalendarOutline className="stat-icon text-blue-500 mb-2" />
                                        <h3>{upcomingBookings.length}</h3>
                                        <p className="text-muted text-xs uppercase font-bold">Upcoming</p>
                                    </div>
                                    <div className="glass-panel stat-card text-center">
                                        <FiCheckCircle className="stat-icon text-green-500 mb-2" />
                                        <h3>{pastBookings.filter(b => b.status === 'completed').length}</h3>
                                        <p className="text-muted text-xs uppercase font-bold">Total Done</p>
                                    </div>
                                </div>

                                {userData?.birthday && new Date(userData.birthday).getMonth() === new Date().getMonth() && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="birthday-banner glass-panel p-6 mb-8 bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
                                    >
                                        <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                                            <FiGift size={120} />
                                        </div>
                                        <div className="text-4xl">🎂</div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-xl font-bold mb-1">Happy Birthday Month, {user.name.split(' ')[0]}! 🎊</h3>
                                            <p className="text-muted text-sm">To celebrate, we've added <span className="text-secondary font-bold">50 bonus points</span> to your account! Enjoy a special discount on your next booking.</p>
                                        </div>
                                        <Link to="/book" className="btn btn-secondary btn-sm shadow-lg shadow-secondary/20 relative z-10">Claim My Gift</Link>
                                    </motion.div>
                                )}

                                {userData?.isClientOfMonth && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="spotlight-banner glass-panel p-8 mb-8 border-yellow-400/30 bg-gradient-to-br from-yellow-400/5 to-primary/5 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <FiStar size={80} className="text-yellow-500" />
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 p-1">
                                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-black text-amber-600 shadow-inner">
                                                    👑
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <span className="badge-spotlight mb-2">Spotlight Client</span>
                                                <h2 className="text-2xl font-bold mb-1">Client of the Month!</h2>
                                                <p className="text-muted text-sm max-w-lg">
                                                    Congratulations, {user.name}! You've been selected as our Client of the Month for your incredible loyalty.
                                                    Enjoy **Double Points** on all bookings this month and a free priority upgrade!
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <section className="mb-10">
                                    <div className="section-title-box mb-4">
                                        <h2 className="text-xl font-bold flex items-center gap-2">
                                            <FiCalendarOutline className="text-secondary" /> Upcoming Bookings
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
                                                        <div className="booking-id text-xs text-muted mb-1">ID: {booking.id.substring(0, 8)}</div>
                                                        <h4 className="font-bold">{booking.serviceType}</h4>
                                                        <div className="flex gap-4 mt-2 text-sm text-muted">
                                                            <span className="flex items-center gap-1"><FiCalendarOutline /> {booking.date}</span>
                                                            <span className="flex items-center gap-1"><FiClock /> {booking.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className="booking-status flex flex-col items-end gap-2">
                                                        <span className={`status-badge status-${booking.status}`}>
                                                            {booking.status}
                                                        </span>
                                                        {booking.paymentStatus !== 'paid' && booking.status !== 'cancelled' && (
                                                            <div className="mt-1 w-full max-w-[120px]">
                                                                <PaystackIntegration
                                                                    email={user.email}
                                                                    amount={booking.serviceType === 'Deep Cleaning' ? 250 : 150}
                                                                    metadata={{
                                                                        bookingId: booking.id,
                                                                        serviceType: booking.serviceType
                                                                    }}
                                                                    onSuccess={(ref) => handlePaymentSuccess(booking.id, ref)}
                                                                    buttonText="Pay Now"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="glass-panel text-center p-12 flex flex-col items-center gap-4"
                                        >
                                            <div className="p-4 bg-gray-50 rounded-full">
                                                <FiCalendarOutline size={32} className="text-muted" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">No upcoming bookings</h4>
                                                <p className="text-muted text-sm">Schedule your next cleaning session today!</p>
                                            </div>
                                            <Link to="/book" className="btn btn-primary btn-sm">Book a Service</Link>
                                        </motion.div>
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
                            </>
                        )}
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
                                    <span>Bedrooms</span>
                                    <span>Status</span>
                                </div>
                                <div className="table-body">
                                    {pastBookings.length > 0 ? (
                                        pastBookings.map(booking => (
                                            <div key={booking.id} className="table-row">
                                                <div className="row-main">
                                                    <span className="row-title font-bold">{booking.serviceType}</span>
                                                    <span className="row-id text-xs text-muted">{booking.id.substring(0, 8)}</span>
                                                </div>
                                                <span className="row-date">{booking.date}</span>
                                                <span className="row-price">{booking.bedrooms} Bed</span>
                                                <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-muted">No past appointments found.</div>
                                    )}
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
                                    <p className="text-sm">{user.address || "No address saved"}</p>
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
                                        <input type="email" value={user.email} disabled />
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
                        <motion.div
                            className="notifications-bell relative cursor-pointer p-2 glass-panel rounded-full"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ rotate: -10 }}
                            animate={{ rotate: [10, -10, 10, 0] }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <FiBell size={20} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </motion.div>
                        <div className="dashboard-actions">
                            <Link to="/book" className="btn btn-primary">Book New Service</Link>
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
                                <FiCalendarOutline /> Overview
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
                            <button
                                onClick={() => logout().then(() => navigate('/login'))}
                                className="nav-item text-red-500 mt-4 border-t pt-4 w-full text-left"
                            >
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
