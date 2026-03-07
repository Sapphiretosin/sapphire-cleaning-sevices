import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiClock, FiMapPin, FiCheckSquare, FiUser,
    FiCalendar, FiAward, FiLogOut, FiBriefcase
} from 'react-icons/fi';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const EmployeeDashboard = () => {
    const [activeTab, setActiveTab] = useState('attendance');
    const [status, setStatus] = useState('offline'); // offline, active
    const [todayJobs, setTodayJobs] = useState([]);
    const { currentUser, userData, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) return;

        // Mocking assigned jobs for now - in production would filter by assignedWorkerId
        const q = query(
            collection(db, "bookings"),
            where("status", "==", "confirmed"),
            where("date", "==", new Date().toISOString().split('T')[0])
        );

        const unsub = onSnapshot(q, (snapshot) => {
            setTodayJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsub();
    }, [currentUser]);

    const handleAttendance = async () => {
        const newStatus = status === 'offline' ? 'active' : 'offline';
        setStatus(newStatus);

        // Log attendance in Firestore
        const attendanceLog = {
            userId: currentUser.uid,
            timestamp: serverTimestamp(),
            type: newStatus === 'active' ? 'clock-in' : 'clock-out'
        };

        try {
            await setDoc(doc(db, "attendance", `${currentUser.uid}_${Date.now()}`), attendanceLog);
        } catch (err) {
            console.error("Failed to log attendance:", err);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'attendance':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content text-center">
                        <div className="glass-panel p-12 flex flex-col items-center gap-6">
                            <div className={`status-orb w-4 h-4 rounded-full ${status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                            <h2 className="text-2xl font-bold">Real-time Check-in</h2>
                            <p className="text-muted max-w-sm">Clock in to start your shift and see assigned cleaning tasks for today.</p>

                            <button
                                onClick={handleAttendance}
                                className={`btn w-full max-w-xs py-6 text-xl flex items-center justify-center gap-3 transition-all ${status === 'active'
                                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200'
                                        : 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-200'
                                    }`}
                            >
                                <FiClock /> {status === 'active' ? 'Clock Out' : 'Clock In'}
                            </button>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold flex items-center gap-2 mb-4 justify-center">
                                <FiBriefcase className="text-primary" /> Today's Assigned Jobs
                            </h3>
                            {todayJobs.length > 0 ? (
                                <div className="space-y-4">
                                    {todayJobs.map(job => (
                                        <div key={job.id} className="glass-panel p-4 flex justify-between items-center text-left">
                                            <div>
                                                <h4 className="font-bold">{job.serviceType}</h4>
                                                <p className="text-xs text-muted flex items-center gap-1"><FiMapPin /> {job.address}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-sm">{job.time}</p>
                                                <button className="text-primary font-bold text-xs uppercase hover:underline">Start Job</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-panel p-8 text-muted italic">No jobs assigned yet for today.</div>
                            )}
                        </div>
                    </motion.div>
                );
            case 'id-card':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content flex justify-center">
                        <div className="employee-id-card glass-panel p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-white/50 w-full max-w-sm text-center shadow-xl">
                            <div className="header mb-6 pb-4 border-b">
                                <h1 className="text-xl font-bold italic">Sapphire <span className="text-primary">Sparks</span></h1>
                                <p className="text-[10px] tracking-widest uppercase text-muted">Official Personnel</p>
                            </div>
                            <div className="avatar-huge w-32 h-32 mx-auto mb-6 rounded-full bg-white p-1 border shadow-inner flex items-center justify-center overflow-hidden">
                                {userData?.profileImage ? (
                                    <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <FiUser size={64} className="text-muted" />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold">{userData?.name || 'Employee'}</h2>
                            <p className="text-primary font-bold mb-4 uppercase tracking-tighter">Cleaning Specialist</p>

                            <div className="id-number bg-white/50 p-3 rounded-lg border border-white mb-6">
                                <p className="text-[10px] text-muted uppercase">Employee ID</p>
                                <p className="font-mono font-bold tracking-widest">{userData?.employeeId || 'SSP-2026-0000'}</p>
                            </div>

                            <div className="flex justify-around border-t pt-4">
                                <div>
                                    <FiCalendar className="mx-auto text-muted mb-1" />
                                    <p className="text-[10px] uppercase text-muted">Joined</p>
                                    <p className="text-xs font-bold">2026</p>
                                </div>
                                <div>
                                    <FiAward className="mx-auto text-yellow-500 mb-1" />
                                    <p className="text-[10px] uppercase text-muted">Level</p>
                                    <p className="text-xs font-bold">Pro</p>
                                </div>
                            </div>
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
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Personnel <span className="text-gradient">Dashboard</span></h1>
                        <p className="text-muted">Welcome back, {userData?.name.split(' ')[0]}</p>
                    </div>
                </div>

                <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <nav className="dashboard-nav glass-panel p-4 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('attendance')}
                                className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
                            >
                                <FiClock /> Attendance
                            </button>
                            <button
                                onClick={() => setActiveTab('id-card')}
                                className={`nav-item ${activeTab === 'id-card' ? 'active' : ''}`}
                            >
                                <FiAward /> Digital ID Card
                            </button>
                            <button
                                onClick={() => logout().then(() => navigate('/login'))}
                                className="nav-item text-red-500 mt-8 border-t pt-4 w-full text-left"
                            >
                                <FiLogOut /> Logout
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

export default EmployeeDashboard;
