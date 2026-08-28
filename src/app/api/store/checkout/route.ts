import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const PRODUCTS: Record<string, { name: string; description: string; amount: number }> = {
  'vol-1': {
    name: 'Secrets of the Mind & the New Creation — Volume I',
    description: '19 tracks, 2h 39m of audio teaching by Prophet Joshua Matthews (320 kbps MP3)',
    amount: 5000, // $50
  },
  'vol-2': {
    name: 'Secrets of the Mind & the New Creation — Volume II',
    description: '16 tracks, 1h 56m of audio teaching by Prophet Joshua Matthews (320 kbps MP3)',
    amount: 5000, // $50
  },
  revelation: {
    name: 'The Revelation of the Son of God',
    description: '12 teachings & meditations, 2h 06m, by Prophet Joshua Matthews (MP3 download)',
    amount: 2500, // $25
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, email } = body;

    if (!productId || !PRODUCTS[productId]) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const product = PRODUCTS[productId];
    const stripe = new Stripe(stripeKey);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/store/download?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
      cancel_url: `${baseUrl}/store?canceled=true`,
      metadata: {
        productId,
        type: 'cd-purchase',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Store checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
