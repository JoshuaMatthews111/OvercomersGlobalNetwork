import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7pf-LLmFKTN6bZMNuD003T99i5-KbqaM",
  authDomain: "overcoemers-global-network.firebaseapp.com",
  projectId: "overcoemers-global-network",
  storageBucket: "overcoemers-global-network.firebasestorage.app",
  messagingSenderId: "690893738869",
  appId: "1:690893738869:web:368f796d825a619079f93c",
  measurementId: "G-LDQSZLYJB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enrollments collection reference
const enrollmentsCollection = collection(db, "enrollments");

// Add a new enrollment
export async function addEnrollment(enrollment: Record<string, unknown>) {
  try {
    const docRef = await addDoc(enrollmentsCollection, {
      ...enrollment,
      createdAt: new Date().toISOString(),
    });
    console.log("Enrollment saved to Firebase with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding enrollment to Firebase:", error);
    return { success: false, error };
  }
}

// Get all enrollments
export async function getEnrollments() {
  try {
    const q = query(enrollmentsCollection, orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);
    const enrollments = querySnapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    }));
    console.log(`Fetched ${enrollments.length} enrollments from Firebase`);
    return { success: true, enrollments };
  } catch (error) {
    console.error("Error fetching enrollments from Firebase:", error);
    // If orderBy fails (no index), try without ordering
    try {
      const querySnapshot = await getDocs(enrollmentsCollection);
      const enrollments = querySnapshot.docs.map(doc => ({
        firebaseId: doc.id,
        ...doc.data()
      }));
      // Sort client-side
      enrollments.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
        const dateA = new Date(a.submittedAt as string).getTime();
        const dateB = new Date(b.submittedAt as string).getTime();
        return dateB - dateA;
      });
      console.log(`Fetched ${enrollments.length} enrollments from Firebase (unordered)`);
      return { success: true, enrollments };
    } catch (fallbackError) {
      console.error("Fallback fetch also failed:", fallbackError);
      return { success: false, enrollments: [], error: fallbackError };
    }
  }
}

// Update an enrollment
export async function updateEnrollment(firebaseId: string, updates: Record<string, unknown>) {
  try {
    const docRef = doc(db, "enrollments", firebaseId);
    await updateDoc(docRef, {
      ...updates,
      lastUpdated: new Date().toISOString(),
    });
    console.log("Enrollment updated in Firebase:", firebaseId);
    return { success: true };
  } catch (error) {
    console.error("Error updating enrollment in Firebase:", error);
    return { success: false, error };
  }
}

export { db, enrollmentsCollection };
