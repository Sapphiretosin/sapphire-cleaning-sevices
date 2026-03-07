import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers, FiCalendar, FiDollarSign, FiTrendingUp,
    FiCheckCircle, FiClock, FiActivity, FiSearch,
    FiFilter, FiDownload, FiStar, FiLogOut
} from 'react-icons/fi';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, getDocs, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { generateEmployeeId } from '../utils/idGenerator';
import './Dashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('performance');
    const [bookings, setBookings] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all bookings for admin
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubBookings = onSnapshot(q, (snapshot) => {
            setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });

        // Fetch employees (users with role 'employee')
        // In a real app, this would be a filtered query
        const getEmployees = async () => {
            const userQ = query(collection(db, "users"));
            const snap = await getDocs(userQ);
            const list = snap.docs.map(doc => doc.data()).filter(u => u.role === 'employee');
            setEmployees(list);
        };
        getEmployees();

        // Fetch clients
        const getClients = async () => {
            const userQ = query(collection(db, "users"));
            const snap = await getDocs(userQ);
            const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(u => u.role === 'client');
            setClients(list);
        };
        getClients();

        return () => unsubBookings();
    }, []);

    const stats = {
        totalRevenue: bookings.length * 150, // Placeholder calculation
        pendingJobs: bookings.filter(b => b.status === 'pending').length,
        completedJobs: bookings.filter(b => b.status === 'completed').length,
        avgRating: 4.8
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'performance':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
                        <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="glass-panel p-6 text-center">
                                <FiDollarSign className="text-secondary mb-2 mx-auto" size={24} />
                                <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
                                <p className="text-muted text-xs uppercase">Est. Revenue</p>
                            </div>
                            <div className="glass-panel p-6 text-center">
                                <FiActivity className="text-blue-500 mb-2 mx-auto" size={24} />
                                <h3 className="text-2xl font-bold">{bookings.length}</h3>
                                <p className="text-muted text-xs uppercase">Total Bookings</p>
                            </div>
                            <div className="glass-panel p-6 text-center">
                                <FiClock className="text-yellow-500 mb-2 mx-auto" size={24} />
                                <h3 className="text-2xl font-bold">{stats.pendingJobs}</h3>
                                <p className="text-muted text-xs uppercase">Pending Jobs</p>
                            </div>
                            <div className="glass-panel p-6 text-center">
                                <FiStar className="text-green-500 mb-2 mx-auto" size={24} />
                                <h3 className="text-2xl font-bold">{stats.avgRating}</h3>
                                <p className="text-muted text-xs uppercase">Avg. Rating</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">All Bookings</h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white/50 border rounded-lg text-sm" />
                                    </div>
                                    <button className="btn btn-outline btn-sm"><FiFilter /> Filter</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b">
                                        <tr className="text-muted text-sm uppercase">
                                            <th className="py-4">Client</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {bookings.slice(0, 10).map(b => (
                                            <tr key={b.id} className="text-sm">
                                                <td className="py-4 font-medium">{b.name}</td>
                                                <td>{b.serviceType}</td>
                                                <td>{b.date}</td>
                                                <td className="max-w-[200px] truncate">{b.address}</td>
                                                <td>
                                                    <span className={`status-badge status-${b.status}`}>{b.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'workers':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
                        <div className="workers-list grid grid-cols-1 md:grid-cols-3 gap-6">
                            {employees.map(emp => (
                                <div key={emp.uid} className="glass-panel p-6 flex flex-col items-center">
                                    <div className="avatar-large mb-4 bg-primary/10 text-primary">
                                        {emp.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <h3 className="font-bold">{emp.name}</h3>
                                    <p className="text-xs text-muted mb-4">{emp.employeeId || 'SSP-2026-001'}</p>
                                    <div className="w-full border-t pt-4 flex justify-between text-center">
                                        <div>
                                            <p className="font-bold text-sm">4.9</p>
                                            <p className="text-[10px] text-muted uppercase">Rating</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">12</p>
                                            <p className="text-[10px] text-muted uppercase">Jobs</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-green-500">Online</p>
                                            <p className="text-[10px] text-muted uppercase">Status</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={async () => {
                                    const name = prompt("Enter new worker's full name:");
                                    if (!name) return;
                                    const email = prompt("Enter worker's email:");
                                    if (!email) return;

                                    try {
                                        const newEmpId = await generateEmployeeId();
                                        // In a real app, this would be a backend call to create an auth user
                                        // For now, we simulate by adding to users collection
                                        const tempUid = `emp_${Date.now()}`;
                                        await setDoc(doc(db, "users", tempUid), {
                                            uid: tempUid,
                                            name,
                                            email,
                                            role: 'employee',
                                            employeeId: newEmpId,
                                            createdAt: new Date().toISOString()
                                        });
                                        alert(`Worker registered with ID: ${newEmpId}`);
                                    } catch (err) {
                                        console.error(err);
                                        alert("Failed to register worker.");
                                    }
                                }}
                                className="glass-panel p-6 flex flex-col items-center justify-center border-dashed border-2 hover:border-primary transition-all group"
                            >
                                <FiPlus className="mb-4 text-muted group-hover:text-primary" size={40} />
                                <h3 className="font-bold text-muted group-hover:text-primary">Add New Worker</h3>
                                <p className="text-[10px] text-muted uppercase mt-2">Auto-generate ID</p>
                            </motion.button>
                        </div>
                    </motion.div>
                );
            case 'clients':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
                        <div className="glass-panel p-6">
                            <h2 className="text-xl font-bold mb-6">Client Management</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b">
                                        <tr className="text-muted text-sm uppercase">
                                            <th className="py-4">Name</th>
                                            <th>Email</th>
                                            <th>Points</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {clients.map(client => (
                                            <tr key={client.id} className="text-sm">
                                                <td className="py-4 font-medium">{client.name} {client.isClientOfMonth && '👑'}</td>
                                                <td>{client.email}</td>
                                                <td>{client.rewardPoints || 0}</td>
                                                <td>
                                                    <span className={`status-badge ${client.isClientOfMonth ? 'status-confirmed' : ''}`}>
                                                        {client.isClientOfMonth ? 'Spotlight' : 'Standard'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={async () => {
                                                            const userRef = doc(db, "users", client.id);
                                                            await updateDoc(userRef, { isClientOfMonth: !client.isClientOfMonth });
                                                            setClients(clients.map(c => c.id === client.id ? { ...c, isClientOfMonth: !client.isClientOfMonth } : c));
                                                        }}
                                                        className={`btn btn-sm ${client.isClientOfMonth ? 'btn-outline' : 'btn-primary'}`}
                                                    >
                                                        {client.isClientOfMonth ? 'Remove' : 'Spotlight'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'settings':
                return null;
        }
    };

    return (
        <div className="dashboard-page pt-24 pb-12">
            <div className="container">
                <div className="admin-header flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin <span className="text-gradient">Console</span></h1>
                        <p className="text-muted">Sapphire Sparks Central Operations</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn btn-outline btn-sm flex items-center gap-2"><FiDownload /> Export Reports</button>
                    </div>
                </div>

                <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <nav className="dashboard-nav glass-panel p-4 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('performance')}
                                className={`nav-item ${activeTab === 'performance' ? 'active' : ''}`}
                            >
                                <FiTrendingUp /> Performance
                            </button>
                            <button
                                onClick={() => setActiveTab('workers')}
                                className={`nav-item ${activeTab === 'workers' ? 'active' : ''}`}
                            >
                                <FiUsers /> Workers
                            </button>
                            <button
                                onClick={() => setActiveTab('clients')}
                                className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}
                            >
                                <FiStar /> Clients
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                            >
                                <FiCalendar /> Schedule
                            </button>
                            <button
                                onClick={() => logout().then(() => navigate('/login'))}
                                className="nav-item text-red-500 mt-8 border-t pt-4 w-full text-left"
                            >
                                <FiLogOut /> Admin Logout
                            </button>
                        </nav>
                    </aside>

                    <main className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
