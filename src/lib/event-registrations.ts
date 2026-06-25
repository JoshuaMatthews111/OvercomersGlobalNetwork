import { collection, addDoc, getDocs, getDoc, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

export interface EventRegistration {
  firebaseId?: string;
  eventSlug: string;
  eventTitle: string;
  parentName: string;
  childName: string;
  childAge: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'pending_payment' | 'paid' | 'cancelled';
  amount: number;
  stripeSessionId?: string;
  stripeNote?: string;
  createdAt: string;
  updatedAt: string;
}

export async function createEventRegistration(registration: Omit<EventRegistration, 'firebaseId' | 'createdAt' | 'updatedAt'>) {
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, 'eventRegistrations'), {
      ...registration,
      createdAt: now,
      updatedAt: now,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating event registration:', error);
    return { success: false, error };
  }
}

export async function getAllEventRegistrations() {
  try {
    const q = query(collection(db, 'eventRegistrations'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return {
      success: true,
      registrations: snapshot.docs.map(d => ({ firebaseId: d.id, ...d.data() })) as EventRegistration[],
    };
  } catch (error) {
    console.error('Error loading event registrations:', error);
    return { success: false, registrations: [] as EventRegistration[], error };
  }
}

export async function getEventRegistrationById(firebaseId: string) {
  try {
    const snap = await getDoc(doc(db, 'eventRegistrations', firebaseId));
    if (!snap.exists()) return { success: false, registration: null, error: 'Not found' };
    return { success: true, registration: { firebaseId: snap.id, ...snap.data() } as EventRegistration };
  } catch (error) {
    return { success: false, registration: null, error };
  }
}

export async function updateEventRegistration(firebaseId: string, updates: Partial<EventRegistration>) {
  try {
    await updateDoc(doc(db, 'eventRegistrations', firebaseId), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating event registration:', error);
    return { success: false, error };
  }
}
