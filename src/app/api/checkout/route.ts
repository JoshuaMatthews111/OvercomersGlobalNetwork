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
    const { items, customerEmail, shippingAddress, orderId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.subtitle || 'Book by Prophet Joshua Matthews',
          images: item.cover ? [`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${item.cover}`] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout?canceled=true`,
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      metadata: {
        orderId: orderId?.toString() || Date.now().toString(),
        customerEmail: customerEmail || '',
        shippingAddress: shippingAddress ? JSON.stringify(shippingAddress) : '',
      },
      custom_text: {
        submit: {
          message: 'Your donation covers the cost of materials, production, and shipping. Thank you for supporting the ministry!',
        },
      },
    });

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
