import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { total: 0, count: 0, recent: [], error: 'Stripe not configured' },
      { status: 200 }
    );
  }

  const stripe = new Stripe(stripeKey);

  try {
    let total = 0;
    let count = 0;
    const recent: Array<{
      id: string;
      amount: number;
      email: string;
      name: string;
      date: string;
      description: string;
    }> = [];
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
          // Collect the 10 most recent for display
          if (recent.length < 10) {
            recent.push({
              id: charge.id,
              amount: charge.amount / 100,
              email: charge.billing_details?.email || charge.receipt_email || '',
              name: charge.billing_details?.name || '',
              date: new Date(charge.created * 1000).toISOString(),
              description: charge.description || 'Donation',
            });
          }
        }
      }

      hasMore = charges.has_more;
      if (charges.data.length > 0) {
        startingAfter = charges.data[charges.data.length - 1].id;
      }
    }

    return NextResponse.json({
      total: total / 100,
      count,
      recent,
    });
  } catch (error: any) {
    console.error('Error fetching Stripe donations:', error);
    return NextResponse.json(
      { total: 0, count: 0, recent: [], error: error.message },
      { status: 200 }
    );
  }
}
