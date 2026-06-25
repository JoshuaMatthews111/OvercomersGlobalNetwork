import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createEventRegistration, updateEventRegistration } from '@/lib/event-registrations';

const KIDS_NIGHT = {
  slug: 'kids-night-2026-07-10',
  title: 'Kids Night Fun Night Club',
  amount: 50,
  date: 'July 10, 2026',
  time: '5:00 PM - 9:00 PM',
};

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { parentName, childName, childAge, email, phone, notes } = body;

    if (!parentName || !childName || !childAge || !email || !phone) {
      return NextResponse.json({ error: 'Please complete every required registration field.' }, { status: 400 });
    }

    const registration = await createEventRegistration({
      eventSlug: KIDS_NIGHT.slug,
      eventTitle: KIDS_NIGHT.title,
      parentName: parentName.trim(),
      childName: childName.trim(),
      childAge: childAge.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes?.trim() || '',
      status: 'pending_payment',
      amount: KIDS_NIGHT.amount,
    });

    if (!registration.success || !registration.id) {
      return NextResponse.json({ error: 'Could not create registration. Please try again.' }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email.trim(),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: KIDS_NIGHT.amount * 100,
            product_data: {
              name: `${KIDS_NIGHT.title} Registration`,
              description: `${KIDS_NIGHT.date}, ${KIDS_NIGHT.time}. Please type "Kids Night" in the note field at checkout.`,
              images: [`${baseUrl}/images/events/kids-night-2026-07-10.jpg`],
            },
          },
          quantity: 1,
        },
      ],
      custom_fields: [
        {
          key: 'event_note',
          label: { type: 'custom', custom: 'Type "Kids Night" in this note field' },
          type: 'text',
          optional: false,
        },
      ],
      metadata: {
        checkoutType: 'event-registration',
        eventSlug: KIDS_NIGHT.slug,
        eventTitle: KIDS_NIGHT.title,
        eventRegistrationId: registration.id,
        parentName: parentName.trim(),
        childName: childName.trim(),
      },
      success_url: `${baseUrl}/events/kids-night?registered=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/events/kids-night?canceled=1&registration=${registration.id}`,
      custom_text: {
        submit: {
          message: 'Please make sure the note field says "Kids Night" so the gift is connected to this event registration.',
        },
      },
    });

    await updateEventRegistration(registration.id, { stripeSessionId: session.id });

    return NextResponse.json({ url: session.url, registrationId: registration.id });
  } catch (error: any) {
    console.error('Event checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
