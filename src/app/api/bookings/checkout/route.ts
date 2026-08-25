import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createBooking } from '@/lib/bookings';
import { sendAdminBookingNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, date, time, notes } = body;

    if (!firstName || !lastName || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    // Create pending booking in Firebase first
    const bookingResult = await createBooking({
      firstName,
      lastName,
      email,
      phone: phone || '',
      date,
      time,
      notes: notes || '',
      status: 'pending_payment',
      isPaid: false,
    });

    if (!bookingResult.success) {
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    const bookingId = bookingResult.id!;
    const stripe = new Stripe(stripeKey);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '1-on-1 Session with Prophet Joshua Matthews',
              description: `Booking for ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${time}`,
            },
            unit_amount: 35000, // $350.00
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/oneonone/confirmed?session_id={CHECKOUT_SESSION_ID}&booking=${bookingId}`,
      cancel_url: `${baseUrl}/oneonone?canceled=true&booking=${bookingId}`,
      metadata: {
        bookingId,
        bookingType: 'prophet-1on1',
        firstName,
        lastName,
        date,
        time,
      },
    });

    // Save Stripe session ID to booking
    const { updateBooking } = await import('@/lib/bookings');
    await updateBooking(bookingId, { stripeSessionId: session.id });

    // Send admin notification for pending booking (non-blocking)
    sendAdminBookingNotification({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      bookingId,
      notes,
      isPaid: false,
    }).catch(err => console.error('Admin notification failed:', err));

    return NextResponse.json({ url: session.url, bookingId });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
