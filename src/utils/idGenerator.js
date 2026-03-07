import { db } from './firebase';
import { doc, getDoc, updateDoc, setDoc, query, collection, where, getDocs, limit } from 'firebase/firestore';

/**
 * Generates a unique Employee ID in the format: SSP-2026-XXXX
 * where XXXX is a sequential or unique number.
 */
export async function generateEmployeeId() {
    const year = new Date().getFullYear();
    const prefix = `SSP-${year}-`;

    try {
        // Find the last generated ID or count employees to generate the next number
        // For simplicity in this demo, we'll use a random 4-digit number 
        // and check if it exists, but a counter in Firestore is better for production.

        let uniqueId = '';
        let exists = true;

        while (exists) {
            const random = Math.floor(1000 + Math.random() * 9000);
            uniqueId = `${prefix}${random}`;

            const q = query(collection(db, "users"), where("employeeId", "==", uniqueId), limit(1));
            const querySnapshot = await getDocs(q);
            exists = !querySnapshot.empty;
        }

        return uniqueId;
    } catch (error) {
        console.error("Error generating employee ID:", error);
        return `${prefix}0000`; // Fallback
    }
}

/**
 * Updates a user's document with a role and auto-generated Employee ID
 */
export async function assignEmployeeRole(uid, role = 'employee') {
    const employeeId = await generateEmployeeId();
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        role: role,
        employeeId: employeeId,
        updatedAt: new Date().toISOString()
    });

    return employeeId;
}
