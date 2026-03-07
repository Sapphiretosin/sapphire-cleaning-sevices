import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password, fullName, birthday = '') {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        // Update Firebase Auth profile
        await updateProfile(user, { displayName: fullName });

        // Create Firestore user document
        const userDoc = {
            uid: user.uid,
            name: fullName,
            email: email,
            role: 'client', // Default role
            birthday: birthday,
            createdAt: new Date().toISOString(),
            rewardPoints: 100 // Welcome bonus
        };

        await setDoc(doc(db, "users", user.uid), userDoc);
        return user;
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);

            if (user) {
                // Listen to real-time user data changes (role, points, etc.)
                const userRef = doc(db, "users", user.uid);
                const unsubDoc = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                });

                return () => unsubDoc();
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userData,
        login,
        signup,
        logout,
        resetPassword,
        isAdmin: userData?.role === 'admin',
        isEmployee: userData?.role === 'employee',
        isClient: userData?.role === 'client'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
