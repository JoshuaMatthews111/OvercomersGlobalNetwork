# Stripe Integration Setup

## Overview

This site now uses **Stripe** for secure payment processing on:
- Book/resource purchases (checkout)
- Donations (giving page)

Givelify remains as a secondary option on the giving page.

---

## Step 1: Create Environment Variables

Create a file called `.env.local` in the root of your project:

```bash
# Stripe Keys (REQUIRED)
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here

# Webhook Secret (for production)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Base URL (update for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Admin Credentials
NEXT_PUBLIC_ADMIN_EMAIL=mr.matthews2022@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword
```

---

## Step 2: Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers > API Keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`)

**Important:** Use test keys (`pk_test_`, `sk_test_`) for development, live keys for production.

---

## Step 3: Set Up Webhooks (Production)

For automatic payment confirmation in production:

1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

---

## How It Works

### Book Purchases:
1. Customer adds books to cart
2. Customer fills shipping info
3. Customer clicks "Pay" → redirected to Stripe Checkout
4. Payment processed securely by Stripe
5. Customer redirected to success page
6. Order marked as "paid" automatically

### Donations:
1. Visitor selects or enters donation amount
2. Clicks "Give" → redirected to Stripe Checkout
3. Donation processed securely
4. Visitor redirected to thank you page

---

## Files Created/Modified

### API Routes:
- `/src/app/api/checkout/route.ts` - Creates Stripe checkout sessions for purchases
- `/src/app/api/donate/route.ts` - Creates Stripe checkout sessions for donations
- `/src/app/api/webhooks/stripe/route.ts` - Handles Stripe webhooks

### Pages:
- `/src/app/checkout/page.tsx` - Updated to use Stripe
- `/src/app/checkout/success/page.tsx` - Success page after payment
- `/src/app/give/page.tsx` - Updated with Stripe (primary) + Givelify (secondary)
- `/src/app/give/success/page.tsx` - Thank you page after donation

---

## Testing

### Test Mode:
Use Stripe test card numbers:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- Any future expiry date, any 3-digit CVC

### Test Webhook Locally:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Security Notes

1. **Never commit `.env.local`** to version control
2. **Regenerate keys** if they're ever exposed
3. **Use HTTPS** in production
4. **Verify webhook signatures** (already implemented)

---

## Stripe Dashboard Features

As a church/nonprofit, you can:
- View all payments and donations
- Issue refunds if needed
- Download financial reports
- Set up recurring donations (future feature)
- Export data for accounting

---

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
