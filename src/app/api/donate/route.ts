import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: 'Stripe configuration missing' },
      { status: 500 }
    );
  }
  
  const stripe = new Stripe(stripeKey);
  try {
    const body = await request.json();
    const { amount, customerEmail, donationType } = body;

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session for donation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: donationType || 'Ministry Donation',
              description: 'Thank you for supporting Overcomers Global Network. Your generosity helps advance the Kingdom!',
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/give/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/give?canceled=true`,
      customer_email: customerEmail,
      submit_type: 'donate',
      metadata: {
        donationType: donationType || 'General',
        customerEmail: customerEmail || '',
      },
      custom_text: {
        submit: {
          message: 'Give, and it will be given to you. A good measure, pressed down, shaken together and running over. - Luke 6:38',
        },
      },
    });

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    });
  } catch (error: any) {
    console.error('Stripe donation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create donation session' },
      { status: 500 }
    );
  }
}
