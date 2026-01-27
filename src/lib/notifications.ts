// Email notification utility using EmailJS (free tier: 200 emails/month)
// Setup: Go to emailjs.com, create account, get Service ID, Template ID, Public Key

const EMAILJS_CONFIG = {
  serviceId: 'service_ogn', // Replace with your EmailJS service ID
  templateId: 'template_booking', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
  adminEmail: 'mr.matthews2022@gmail.com',
};

interface BookingNotification {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  sessionType?: string;
  notes?: string;
}

interface DonationNotification {
  donorName: string;
  donorEmail: string;
  amount: number;
  type: string;
}

interface EnrollmentNotification {
  studentName: string;
  studentEmail: string;
  phone: string;
  address: string;
}

// Send email notification using EmailJS
export async function sendEmailNotification(
  type: 'booking' | 'donation' | 'enrollment',
  data: BookingNotification | DonationNotification | EnrollmentNotification
): Promise<boolean> {
  try {
    // Using EmailJS REST API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.templateId,
        user_id: EMAILJS_CONFIG.publicKey,
        template_params: {
          to_email: EMAILJS_CONFIG.adminEmail,
          notification_type: type.toUpperCase(),
          ...data,
          timestamp: new Date().toLocaleString(),
        },
      }),
    });

    if (response.ok) {
      console.log('Email notification sent successfully');
      return true;
    } else {
      console.error('Failed to send email notification');
      return false;
    }
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

// Alternative: Use Formspree (free tier: 50 submissions/month)
export async function sendFormspreeNotification(
  formId: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _replyto: data.email || EMAILJS_CONFIG.adminEmail,
        ...data,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Formspree notification error:', error);
    return false;
  }
}

// Store notification in localStorage for admin panel live updates
export function storeNotification(notification: {
  id: number;
  type: 'booking' | 'donation' | 'enrollment' | 'order';
  title: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
}): void {
  const notifications = JSON.parse(localStorage.getItem('ogn-notifications') || '[]');
  notifications.unshift(notification);
  // Keep only last 100 notifications
  if (notifications.length > 100) {
    notifications.pop();
  }
  localStorage.setItem('ogn-notifications', JSON.stringify(notifications));
}

// Get unread notification count
export function getUnreadNotificationCount(): number {
  const notifications = JSON.parse(localStorage.getItem('ogn-notifications') || '[]');
  return notifications.filter((n: any) => !n.read).length;
}

// Mark notification as read
export function markNotificationRead(id: number): void {
  const notifications = JSON.parse(localStorage.getItem('ogn-notifications') || '[]');
  const updated = notifications.map((n: any) => 
    n.id === id ? { ...n, read: true } : n
  );
  localStorage.setItem('ogn-notifications', JSON.stringify(updated));
}

// Mark all notifications as read
export function markAllNotificationsRead(): void {
  const notifications = JSON.parse(localStorage.getItem('ogn-notifications') || '[]');
  const updated = notifications.map((n: any) => ({ ...n, read: true }));
  localStorage.setItem('ogn-notifications', JSON.stringify(updated));
}

// Get all notifications
export function getNotifications(): any[] {
  return JSON.parse(localStorage.getItem('ogn-notifications') || '[]');
}

// Create booking notification
export function createBookingNotification(booking: any): void {
  const notification = {
    id: Date.now(),
    type: 'booking' as const,
    title: 'New Booking Request',
    message: `${booking.customer?.firstName} ${booking.customer?.lastName} scheduled a session for ${new Date(booking.date).toLocaleDateString()} at ${booking.time}`,
    data: booking,
    read: false,
    createdAt: new Date().toISOString(),
  };
  storeNotification(notification);

  // Also try to send email
  sendEmailNotification('booking', {
    customerName: `${booking.customer?.firstName} ${booking.customer?.lastName}`,
    customerEmail: booking.customer?.email || '',
    customerPhone: booking.customer?.phone || '',
    date: new Date(booking.date).toLocaleDateString(),
    time: booking.time,
    sessionType: booking.serviceType?.title || '1-on-1 Session',
    notes: booking.customer?.notes || '',
  });
}

// Create donation notification
export function createDonationNotification(donation: any): void {
  const notification = {
    id: Date.now(),
    type: 'donation' as const,
    title: 'New Donation Received',
    message: `${donation.name} donated $${donation.amount} (${donation.type})`,
    data: donation,
    read: false,
    createdAt: new Date().toISOString(),
  };
  storeNotification(notification);
}

// Create enrollment notification
export function createEnrollmentNotification(enrollment: any): void {
  const notification = {
    id: Date.now(),
    type: 'enrollment' as const,
    title: 'New Discipleship Enrollment',
    message: `${enrollment.firstName} ${enrollment.lastName} enrolled in discipleship`,
    data: enrollment,
    read: false,
    createdAt: new Date().toISOString(),
  };
  storeNotification(notification);
}
