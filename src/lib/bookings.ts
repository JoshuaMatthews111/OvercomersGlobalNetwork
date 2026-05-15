import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface ProphetBooking {
  firebaseId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM"
  notes?: string;
  status: 'pending_payment' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  isPaid: boolean;
  paymentAmount?: number;
  stripeSessionId?: string;
  remindersSent?: {
    dayBefore?: string;
    hourBefore?: string;
    confirmation?: string;
  };
  rescheduledFrom?: {
    date: string;
    time: string;
    at: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProphetAvailabilitySlot {
  time: string;
  available: boolean;
}

// ==================== BOOKINGS ====================

export async function createBooking(booking: Omit<ProphetBooking, 'firebaseId' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'prophetBookings'), {
      ...booking,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error };
  }
}

export async function getAllBookings() {
  try {
    const snapshot = await getDocs(collection(db, 'prophetBookings'));
    const bookings = snapshot.docs.map(d => ({
      firebaseId: d.id,
      ...d.data(),
    })) as ProphetBooking[];
    bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { success: true, bookings };
  } catch (error) {
    return { success: false, bookings: [], error };
  }
}

export async function getBookingById(firebaseId: string) {
  try {
    const snap = await getDoc(doc(db, 'prophetBookings', firebaseId));
    if (!snap.exists()) return { success: false, booking: null, error: 'Not found' };
    return { success: true, booking: { firebaseId: snap.id, ...snap.data() } as ProphetBooking };
  } catch (error) {
    return { success: false, booking: null, error };
  }
}

export async function updateBooking(firebaseId: string, updates: Partial<ProphetBooking>) {
  try {
    await updateDoc(doc(db, 'prophetBookings', firebaseId), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getBookingBySessionId(stripeSessionId: string) {
  try {
    const q = query(collection(db, 'prophetBookings'), where('stripeSessionId', '==', stripeSessionId));
    const snap = await getDocs(q);
    if (snap.empty) return { success: false, booking: null };
    const d = snap.docs[0];
    return { success: true, booking: { firebaseId: d.id, ...d.data() } as ProphetBooking };
  } catch (error) {
    return { success: false, booking: null, error };
  }
}

export async function getBookingsForDate(date: string) {
  try {
    const q = query(collection(db, 'prophetBookings'), where('date', '==', date));
    const snap = await getDocs(q);
    return {
      success: true,
      bookings: snap.docs.map(d => ({ firebaseId: d.id, ...d.data() })) as ProphetBooking[],
    };
  } catch (error) {
    return { success: false, bookings: [], error };
  }
}

export async function deleteBooking(firebaseId: string) {
  try {
    await deleteDoc(doc(db, 'prophetBookings', firebaseId));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

// ==================== AVAILABILITY ====================

export async function getAvailability() {
  try {
    const snap = await getDoc(doc(db, 'prophetSettings', 'availability'));
    if (!snap.exists()) return { success: true, availability: {} as Record<string, ProphetAvailabilitySlot[]> };
    return { success: true, availability: (snap.data().slots || {}) as Record<string, ProphetAvailabilitySlot[]> };
  } catch (error) {
    return { success: false, availability: {} as Record<string, ProphetAvailabilitySlot[]>, error };
  }
}

export async function saveAvailability(slots: Record<string, ProphetAvailabilitySlot[]>) {
  try {
    const { setDoc } = await import('firebase/firestore');
    await setDoc(doc(db, 'prophetSettings', 'availability'), {
      slots,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
