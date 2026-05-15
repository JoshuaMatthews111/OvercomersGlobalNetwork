# One-on-One Booking System Setup

## What Was Built

### 🌐 Public Pages
- **`/oneonone`** — Landing + booking flow (poster image, schedule, details, pay)
- **`/oneonone/confirmed`** — Post-payment confirmation page with Zoom details

### 🔧 Admin
- **`/admin/prophet-schedule`** — Now reads/writes Firebase for real bookings and availability
  - Set weekly/daily availability → saved to Firestore
  - See all paid bookings live
  - Reschedule any booking (auto-sends email to client)

### 📡 API Routes
- `POST /api/bookings/checkout` — Create pending booking + Stripe session
- `POST /api/bookings/reschedule` — Admin reschedule (emails client)
- `GET /api/bookings/send-reminders` — Cron-triggered reminders (24h + 1h)
- `POST /api/webhooks/stripe` — Updated to auto-confirm paid bookings and send emails

### 📧 Emails (via Zoho SMTP)
- Confirmation email (paid clients) with Zoom link, calendar invite info
- Admin paid notification to `ognmedia2024@gmail.com`
- 24-hour reminder
- 1-hour reminder
- Reschedule notifications

---

## Required Setup Steps

### 1. Zoho App Password

You cannot use your normal Zoho password for SMTP. Generate an **App Password**:

1. Log into Zoho Mail → https://mail.zoho.com
2. Go to **Settings → Security → App Passwords**
3. Click **Generate New Password**
4. Name it `OGN Website SMTP`
5. Copy the generated password

### 2. Update `.env.local`

```bash
# Zoho Email
ZOHO_EMAIL=joshuamatthews@overcomersglobalnetwork.com
ZOHO_PASSWORD=<PASTE_APP_PASSWORD_HERE>
ZOHO_FROM_NAME=Prophet Joshua Matthews

# Admin notifications
ADMIN_NOTIFY_EMAIL=ognmedia2024@gmail.com

# Optional: Cron secret for reminder endpoint
CRON_SECRET=<generate-random-string>
```

### 3. Stripe Webhook

Your webhook must listen for `checkout.session.completed`. In your Stripe dashboard webhook settings, confirm the endpoint is:
```
https://overcomersglobalnetwork.com/api/webhooks/stripe
```
The webhook will auto-detect 1-on-1 bookings via `metadata.bookingType === 'prophet-1on1'` and handle them separately from donations.

### 4. Reminder Cron Job

The reminder endpoint needs to be called hourly. Options:

**Vercel Cron** (recommended) — add to `vercel.json`:
```json
{
  "crons": [
    { "path": "/api/bookings/send-reminders", "schedule": "0 * * * *" }
  ]
}
```

**External cron** (cron-job.org, EasyCron, etc.):
- URL: `https://overcomersglobalnetwork.com/api/bookings/send-reminders`
- Header: `Authorization: Bearer <your CRON_SECRET>`
- Schedule: Every hour

### 5. Set Initial Availability

1. Log into `/admin`
2. Go to **Prophet Schedule**
3. Click dates on the calendar
4. Click **Select Date Range** → choose time slots → **Apply**
5. Click **Save Availability**

Now live at `overcomersglobalnetwork.com/oneonone`.

---

## How the Flow Works

1. **Visitor** opens `/oneonone` → sees poster image and picks date/time from Firebase availability
2. **Fills** name, email, phone, notes
3. **Clicks Pay** → `POST /api/bookings/checkout`:
   - Creates `prophetBookings` doc in Firestore with `status: 'pending_payment'`
   - Creates Stripe Checkout session ($150)
   - Sends admin "new pending" notification
   - Redirects to Stripe
4. **Visitor pays** → Stripe webhook fires `checkout.session.completed`:
   - Updates booking to `status: 'confirmed'`, `isPaid: true`
   - Sends confirmation email to client (with Zoom details)
   - Sends "💰 PAID" notification to admin
5. **Visitor lands** on `/oneonone/confirmed?session_id=...&booking=...`:
   - Shows appointment, Zoom link/ID/passcode, "Add to Google Calendar" button
6. **24 hours before** → cron fires → reminder email sent
7. **1 hour before** → cron fires → reminder email sent

---

## Admin Reschedule Flow

1. Admin opens **Prophet Schedule → Bookings** tab
2. Clicks reschedule on a booking
3. Picks new date/time
4. `POST /api/bookings/reschedule`:
   - Updates Firestore doc (keeps record of old time in `rescheduledFrom`)
   - Emails client with old vs new time comparison
   - Zoom link stays the same

---

## Firestore Collections Used

- `prophetBookings` — one doc per booking
- `prophetSettings/availability` — single doc with `slots: { "YYYY-MM-DD": [{time, available}] }`

---

## Troubleshooting

**Emails not sending?**
- Check Zoho app password is correct (not your regular login password)
- Check Zoho account allows IMAP/SMTP access (Zoho Admin → Mail Administration → Service Settings)
- Check server logs for `Zoho email credentials not configured`

**Booking created but no payment confirmation?**
- Verify Stripe webhook is set up and pointing to production URL
- Check webhook signing secret in `.env.local` as `STRIPE_WEBHOOK_SECRET`
- View Stripe dashboard → Webhooks → recent events for errors

**Availability not showing on public page?**
- Make sure you clicked **Save Availability** button in admin (not just set slots)
- Check browser console for Firestore permission errors
- Verify Firestore security rules allow read on `prophetSettings/availability`
