import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7pf-LLmFKTN6bZMNuD003T99i5-KbqaM",
  authDomain: "overcoemers-global-network.firebaseapp.com",
  projectId: "overcoemers-global-network",
  storageBucket: "overcoemers-global-network.firebasestorage.app",
  messagingSenderId: "690893738869",
  appId: "1:690893738869:web:368f796d825a619079f93c",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!stripeKey) {
    return NextResponse.json(
      { error: 'Stripe configuration missing' },
      { status: 500 }
    );
  }
  
  const stripe = new Stripe(stripeKey);
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      if (!webhookSecret) {
        return NextResponse.json(
          { error: 'Webhook secret not configured' },
          { status: 500 }
        );
      }
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('Payment successful for session:', session.id);

        // Handle 1-on-1 Prophet Booking payments
        if (session.metadata?.bookingType === 'prophet-1on1' && session.metadata?.bookingId) {
          try {
            const { updateBooking, getBookingById } = await import('@/lib/bookings');
            const { sendBookingConfirmation, sendAdminBookingNotification } = await import('@/lib/email');
            
            const bookingId = session.metadata.bookingId;
            
            // Update booking to confirmed/paid
            await updateBooking(bookingId, {
              status: 'confirmed',
              isPaid: true,
              paymentAmount: (session.amount_total || 0) / 100,
            });
            
            // Fetch fresh booking data
            const { booking } = await getBookingById(bookingId);
            if (booking) {
              const emailData = {
                firstName: booking.firstName,
                lastName: booking.lastName,
                email: booking.email,
                phone: booking.phone,
                date: booking.date,
                time: booking.time,
                bookingId,
                notes: booking.notes,
              };
              
              // Send confirmation to customer
              await sendBookingConfirmation(emailData).catch(err => 
                console.error('Confirmation email failed:', err)
              );
              
              // Send paid notification to admin
              await sendAdminBookingNotification({
                ...emailData,
                isPaid: true,
                amount: (session.amount_total || 0) / 100,
              }).catch(err => console.error('Admin notification failed:', err));
              
              // Mark confirmation sent
              await updateBooking(bookingId, {
                remindersSent: { confirmation: new Date().toISOString() },
              });
            }
            
            console.log('Booking confirmed and emails sent:', bookingId);
          } catch (bookingError) {
            console.error('Error processing booking payment:', bookingError);
          }
          break;
        }

        if (session.metadata?.checkoutType === 'event-registration' && session.metadata?.eventRegistrationId) {
          try {
            const { updateEventRegistration } = await import('@/lib/event-registrations');
            const stripeNote = session.custom_fields?.find(field => field.key === 'event_note')?.text?.value || '';

            await updateEventRegistration(session.metadata.eventRegistrationId, {
              status: 'paid',
              amount: (session.amount_total || 0) / 100,
              stripeSessionId: session.id,
              stripeNote,
            });

            console.log('Event registration marked paid:', session.metadata.eventRegistrationId);
          } catch (registrationError) {
            console.error('Error processing event registration payment:', registrationError);
          }
          break;
        }

        // Record donation in Firebase (default)
        try {
          await addDoc(collection(db, 'donations'), {
            stripeSessionId: session.id,
            email: session.customer_email || session.customer_details?.email || '',
            name: session.customer_details?.name || '',
            amount: (session.amount_total || 0) / 100,
            currency: session.currency || 'usd',
            donationType: session.metadata?.donationType || 'General',
            status: 'completed',
            createdAt: new Date().toISOString(),
          });
          console.log('Donation recorded in Firebase');
        } catch (fbError) {
          console.error('Error recording donation in Firebase:', fbError);
        }
        
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
