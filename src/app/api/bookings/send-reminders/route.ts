import { NextRequest, NextResponse } from 'next/server';
import { getAllBookings, updateBooking } from '@/lib/bookings';
import { sendBookingReminder } from '@/lib/email';

// This endpoint should be called by a cron job (e.g., Vercel Cron, GitHub Actions)
// every hour to send reminders for upcoming appointments
export async function GET(request: NextRequest) {
  // Optional: Protect with a cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { bookings } = await getAllBookings();
    const now = new Date();
    const results: any[] = [];

    for (const booking of bookings) {
      if (!booking.isPaid || booking.status !== 'confirmed') continue;
      if (!booking.firebaseId) continue;

      // Parse booking datetime
      const bookingDate = new Date(`${booking.date} ${booking.time}`);
      if (isNaN(bookingDate.getTime())) continue;

      const hoursUntil = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      const remindersSent = booking.remindersSent || {};

      // 24-hour reminder
      if (hoursUntil > 22 && hoursUntil <= 26 && !remindersSent.dayBefore) {
        try {
          await sendBookingReminder(
            {
              firstName: booking.firstName,
              lastName: booking.lastName,
              email: booking.email,
              phone: booking.phone,
              date: booking.date,
              time: booking.time,
              bookingId: booking.firebaseId,
              notes: booking.notes,
            },
            24
          );
          await updateBooking(booking.firebaseId, {
            remindersSent: { ...remindersSent, dayBefore: new Date().toISOString() },
          });
          results.push({ bookingId: booking.firebaseId, reminder: '24h', sent: true });
        } catch (err) {
          results.push({ bookingId: booking.firebaseId, reminder: '24h', error: String(err) });
        }
      }

      // 1-hour reminder
      if (hoursUntil > 0.5 && hoursUntil <= 1.5 && !remindersSent.hourBefore) {
        try {
          await sendBookingReminder(
            {
              firstName: booking.firstName,
              lastName: booking.lastName,
              email: booking.email,
              phone: booking.phone,
              date: booking.date,
              time: booking.time,
              bookingId: booking.firebaseId,
              notes: booking.notes,
            },
            1
          );
          await updateBooking(booking.firebaseId, {
            remindersSent: { ...remindersSent, hourBefore: new Date().toISOString() },
          });
          results.push({ bookingId: booking.firebaseId, reminder: '1h', sent: true });
        } catch (err) {
          results.push({ bookingId: booking.firebaseId, reminder: '1h', error: String(err) });
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: bookings.length,
      remindersSent: results.length,
      results,
    });
  } catch (error: any) {
    console.error('Send reminders error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send reminders' }, { status: 500 });
  }
}
