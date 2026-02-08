import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { total: 0, count: 0, error: 'Stripe not configured' },
      { status: 200 }
    );
  }

  const stripe = new Stripe(stripeKey);

  try {
    // Fetch all successful payments from Stripe
    let total = 0;
    let count = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const params: Stripe.ChargeListParams = {
        limit: 100,
      };
      if (startingAfter) {
        params.starting_after = startingAfter;
      }

      const charges = await stripe.charges.list(params);

      for (const charge of charges.data) {
        if (charge.paid && !charge.refunded) {
          total += charge.amount;
          count++;
        }
      }

      hasMore = charges.has_more;
      if (charges.data.length > 0) {
        startingAfter = charges.data[charges.data.length - 1].id;
      }
    }

    // Stripe amounts are in cents, convert to dollars
    return NextResponse.json({
      total: total / 100,
      count,
    });
  } catch (error: any) {
    console.error('Error fetching Stripe donations:', error);
    return NextResponse.json(
      { total: 0, count: 0, error: error.message },
      { status: 200 }
    );
  }
}
