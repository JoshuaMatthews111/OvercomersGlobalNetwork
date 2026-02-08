import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, orderBy, getDoc, setDoc, deleteDoc, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, type User } from "firebase/auth";

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
const auth = getAuth(app);

// ==================== AUTHENTICATION ====================

export interface AdminPermissions {
  blog: boolean;
  events: boolean;
  content: boolean;
  orders: boolean;
  enrollments: boolean;
  scheduler: boolean;
  eventFlyers: boolean;
  prophetSchedule: boolean;
  discipleship: boolean;
  prayerRequests: boolean;
  askProphet: boolean;
  settings: boolean;
}

export const DEFAULT_ADMIN_PERMISSIONS: AdminPermissions = {
  blog: false,
  events: false,
  content: false,
  orders: false,
  enrollments: false,
  scheduler: false,
  eventFlyers: false,
  prophetSchedule: false,
  discipleship: false,
  prayerRequests: false,
  askProphet: false,
  settings: false,
};

export const MASTER_ADMIN_PERMISSIONS: AdminPermissions = {
  blog: true,
  events: true,
  content: true,
  orders: true,
  enrollments: true,
  scheduler: true,
  eventFlyers: true,
  prophetSchedule: true,
  discipleship: true,
  prayerRequests: true,
  askProphet: true,
  settings: true,
};

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: 'master' | 'admin';
  status: 'active' | 'suspended' | 'paused';
  createdAt: string;
  lastLogin: string;
  invitedBy?: string;
  permissions?: AdminPermissions;
}

// Sign in admin
export async function signInAdmin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const adminDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
    
    if (!adminDoc.exists()) {
      await signOut(auth);
      return { success: false, error: "Not authorized as admin" };
    }
    
    const adminData = adminDoc.data() as AdminUser;
    if (adminData.status !== 'active') {
      await signOut(auth);
      return { success: false, error: `Account is ${adminData.status}` };
    }
    
    // Update last login
    await updateDoc(doc(db, "admins", userCredential.user.uid), {
      lastLogin: new Date().toISOString()
    });
    
    return { success: true, user: userCredential.user, admin: adminData };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    return { success: false, error: errorMessage };
  }
}

// Sign out admin
export async function signOutAdmin() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Get current admin
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    if (!adminDoc.exists()) return null;
    return { uid: user.uid, ...adminDoc.data() } as AdminUser;
  } catch {
    return null;
  }
}

// Listen to auth state changes
export function onAdminAuthChange(callback: (admin: AdminUser | null) => void) {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (!user) {
      callback(null);
      return;
    }
    
    try {
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      if (!adminDoc.exists()) {
        callback(null);
        return;
      }
      callback({ uid: user.uid, ...adminDoc.data() } as AdminUser);
    } catch {
      callback(null);
    }
  });
}

// ==================== ADMIN MANAGEMENT ====================

// Create first master admin (one-time setup)
export async function setupMasterAdmin(email: string, password: string, name: string) {
  try {
    // Check if any admins exist
    const adminsSnapshot = await getDocs(collection(db, "admins"));
    if (!adminsSnapshot.empty) {
      return { success: false, error: "Master admin already exists" };
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await setDoc(doc(db, "admins", userCredential.user.uid), {
      email,
      name,
      role: 'master',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
    
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Setup failed";
    return { success: false, error: errorMessage };
  }
}

// Invite new admin (master only)
export async function inviteAdmin(email: string, name: string, tempPassword: string, invitedByUid: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
    
    await setDoc(doc(db, "admins", userCredential.user.uid), {
      email,
      name,
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: '',
      invitedBy: invitedByUid,
      permissions: DEFAULT_ADMIN_PERMISSIONS,
    });
    
    // Sign back in as the master admin (creating user signs them in)
    // The calling code should handle re-authentication
    
    return { success: true, uid: userCredential.user.uid };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Invite failed";
    return { success: false, error: errorMessage };
  }
}

// Get all admins
export async function getAllAdmins() {
  try {
    const querySnapshot = await getDocs(collection(db, "admins"));
    const admins = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as AdminUser[];
    return { success: true, admins };
  } catch (error) {
    return { success: false, admins: [], error };
  }
}

// Update admin status (master only)
export async function updateAdminStatus(adminUid: string, status: 'active' | 'suspended' | 'paused') {
  try {
    await updateDoc(doc(db, "admins", adminUid), { status });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Remove admin (master only)
export async function removeAdmin(adminUid: string) {
  try {
    await deleteDoc(doc(db, "admins", adminUid));
    // Note: This doesn't delete the Firebase Auth user, just the admin record
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Update admin permissions (master only)
export async function updateAdminPermissions(adminUid: string, permissions: AdminPermissions) {
  try {
    await updateDoc(doc(db, "admins", adminUid), { permissions });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Send password reset email
export async function resetAdminPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

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

// ==================== BLOGS ====================

export interface BlogPost {
  id?: string;
  firebaseId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorUid: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Add blog post
export async function addBlogPost(post: Omit<BlogPost, 'id' | 'firebaseId' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      ...post,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
}

// Get all blog posts
export async function getBlogPosts(publishedOnly = false) {
  try {
    let q;
    if (publishedOnly) {
      q = query(collection(db, "blogs"), where("status", "==", "published"));
    } else {
      q = query(collection(db, "blogs"));
    }
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    })) as BlogPost[];
    
    // Sort by date
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { success: true, posts };
  } catch (error) {
    return { success: false, posts: [], error };
  }
}

// Update blog post
export async function updateBlogPost(firebaseId: string, updates: Partial<BlogPost>) {
  try {
    await updateDoc(doc(db, "blogs", firebaseId), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Delete blog post
export async function deleteBlogPost(firebaseId: string) {
  try {
    await deleteDoc(doc(db, "blogs", firebaseId));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// ==================== EVENTS ====================

export interface Event {
  id?: string;
  firebaseId?: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  address?: string;
  image?: string;
  category: string;
  isRecurring: boolean;
  recurringPattern?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdByUid: string;
  createdAt: string;
  updatedAt: string;
}

// Add event
export async function addEvent(event: Omit<Event, 'id' | 'firebaseId' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...event,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
}

// Get all events
export async function getEvents(upcomingOnly = false) {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    let events = querySnapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    })) as Event[];
    
    if (upcomingOnly) {
      const now = new Date().toISOString();
      events = events.filter(e => e.date >= now || e.status === 'upcoming' || e.status === 'ongoing');
    }
    
    // Sort by date
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return { success: true, events };
  } catch (error) {
    return { success: false, events: [], error };
  }
}

// Update event
export async function updateEvent(firebaseId: string, updates: Partial<Event>) {
  try {
    await updateDoc(doc(db, "events", firebaseId), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// Delete event
export async function deleteEvent(firebaseId: string) {
  try {
    await deleteDoc(doc(db, "events", firebaseId));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// ==================== GENERIC FORMS ====================

// Add any form submission (contact, church forms, etc.)
export async function addFormSubmission(collectionName: string, data: Record<string, unknown>) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      submittedAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
}

// Get form submissions
export async function getFormSubmissions(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const submissions = querySnapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    }));
    return { success: true, submissions };
  } catch (error) {
    return { success: false, submissions: [], error };
  }
}

export { db, auth, enrollmentsCollection };
