import { NextRequest, NextResponse } from 'next/server';
import { getBookingById } from '@/lib/bookings';
import { generateICS } from '@/lib/calendar';

export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('id');
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
  }

  const { booking, success } = await getBookingById(bookingId);
  if (!success || !booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const ics = generateICS({
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,
    date: booking.date,
    time: booking.time,
    bookingId,
  });

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="prophet-joshua-session.ics"',
    },
  });
}
