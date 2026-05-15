import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBooking } from '@/lib/bookings';
import { sendRescheduleEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, newDate, newTime } = await request.json();

    if (!bookingId || !newDate || !newTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { booking, success } = await getBookingById(bookingId);
    if (!success || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const oldDate = booking.date;
    const oldTime = booking.time;

    await updateBooking(bookingId, {
      date: newDate,
      time: newTime,
      status: 'rescheduled',
      rescheduledFrom: {
        date: oldDate,
        time: oldTime,
        at: new Date().toISOString(),
      },
    });

    // Send email
    await sendRescheduleEmail(
      {
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phone: booking.phone,
        date: newDate,
        time: newTime,
        bookingId,
        notes: booking.notes,
      },
      oldDate,
      oldTime
    ).catch(err => console.error('Reschedule email failed:', err));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Reschedule error:', error);
    return NextResponse.json({ error: error.message || 'Reschedule failed' }, { status: 500 });
  }
}
