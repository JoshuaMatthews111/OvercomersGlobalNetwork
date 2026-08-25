# 🚀 Deploy the Booking System — Beginner Guide

> You won't touch IONOS, DNS, or domains. Your main site at `overcomersglobalnetwork.com`
> stays exactly as it is. We'll just add a separate "booking engine" on Vercel (free).

---

## ⏱️ Time: ~10 minutes total

---

## Step 1 — Sign Up for Vercel (2 min)

1. Go to 👉 https://vercel.com/signup
2. Click **Continue with GitHub**
3. Authorize Vercel

**That's it for Step 1.** You'll land on the Vercel dashboard.

---

## Step 2 — Import Your Project (1 min)

1. On the Vercel dashboard, click **Add New → Project**
2. Find `OvercomersGlobalNetwork` in the list → click **Import**
3. On the config screen:
   - Framework Preset: **Next.js** (auto-detected — don't change)
   - Build Command: leave default
   - Output Directory: leave default
4. **Do NOT click Deploy yet.** Scroll down to **Environment Variables** and do Step 3 first.

---

## Step 3 — Paste Environment Variables (3 min)

Copy-paste each one into the Environment Variables section on the Vercel import screen.

**⚠️ Important:** Get fresh values for anything marked 🔄 — the ones you shared in chat should be rotated.

| Variable Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | *(your `sk_live_...` from Stripe dashboard)* |
| `STRIPE_WEBHOOK_SECRET` | `whsec_placeholder_for_now` (we'll fix in Step 5) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | *(your `pk_live_...` from Stripe dashboard)* |
| `NEXT_PUBLIC_BASE_URL` | `https://overcomersglobalnetwork.com` |
| `ZOHO_EMAIL` | `joshuamatthews@overcomersglobalnetwork.com` |
| `ZOHO_PASSWORD` | 🔄 *(generate NEW app password in Zoho → Settings → Security → App Passwords)* |
| `ZOHO_FROM_NAME` | `Prophet Joshua Matthews` |
| `ADMIN_NOTIFY_EMAIL` | `ognmedia2024@gmail.com` |

Click **Deploy**. Vercel will build for ~90 seconds.

When done, Vercel shows you a URL like:
```
https://overcomers-global-network.vercel.app
```
**📋 Copy this URL.** This is your booking system's home.

Test it: visit `https://<your-url>.vercel.app/oneonone` — the booking page loads.

---

## Step 4 — Connect the Main Site to the Booking App (2 min)

Your main site at `overcomersglobalnetwork.com/oneonone` needs to send visitors to the Vercel booking page. Set one GitHub Secret:

1. Go to your GitHub repo: https://github.com/JoshuaMatthews111/OvercomersGlobalNetwork
2. Click **Settings → Secrets and variables → Actions**
3. Click **New repository secret**. Create these two:

| Secret Name | Value |
|---|---|
| `NEXT_PUBLIC_BOOKING_URL` | `https://overcomers-global-network.vercel.app` *(your Vercel URL from Step 3)* |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | *(same `pk_live_...` as in Vercel)* |

4. Go to **Actions** tab → click the most recent workflow → **Re-run all jobs**
   (or just push any small change to `main` — it auto-deploys)

Now when someone visits `overcomersglobalnetwork.com/oneonone`, they'll automatically be sent to the Vercel booking page.

---

## Step 5 — Connect Stripe Webhook (2 min)

Stripe needs to tell Vercel when payments succeed.

1. Go to 👉 https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://<your-vercel-url>.vercel.app/api/webhooks/stripe`
4. Under "Events to send", click **Select events** and pick:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Click **Add endpoint**
6. On the next screen, click **Reveal signing secret** — copy the `whsec_...` value
7. Go back to Vercel → your project → **Settings → Environment Variables**
8. Find `STRIPE_WEBHOOK_SECRET`, click **Edit**, paste the real value, save
9. Go to **Deployments** → click the "..." on the latest → **Redeploy**

---

## Step 6 — Set Availability (1 min)

1. Log into your admin: `https://overcomersglobalnetwork.com/admin`
2. Go to **Prophet Schedule**
3. Click dates on the calendar → add time slots → **Save Availability**
4. Visit your Vercel booking URL to confirm times show up

---

## ✅ Done! How It Works Now

- **Main site** at `overcomersglobalnetwork.com` → works exactly as before
- **Anyone who visits** `overcomersglobalnetwork.com/oneonone` → auto-redirects to the Vercel booking page
- **Visitor picks date/time** → pays $150 via Stripe → gets confirmation email with Zoom details and a calendar file (with auto-reminders for 24h, 1h, 15min)
- **You get** a "💰 PAID" email notification at `ognmedia2024@gmail.com`
- **Booking shows up** in your admin panel at `/admin/prophet-schedule`
- **24h before session**, client gets a reminder email; 1h before, another one
- **Rescheduling** from the admin panel auto-emails the client

---

## 🔒 Security Cleanup (Important — do once)

The old admin password `OGN2026Admin!` was in your public GitHub repo's history.
**Reset it now:**

1. Go to `https://overcomersglobalnetwork.com/admin`
2. Click "Forgot Password" (if available) OR log into Firebase Console → Authentication → find `admin@overcomers.org` → reset password
3. Use a new strong password

Also rotate:
- **Zoho app password** you shared in chat (create a new one in Zoho, update Vercel env var)
- Any Stripe keys you suspect were ever exposed

---

## 🆘 Troubleshooting

**"My /oneonone page doesn't redirect!"**
→ Make sure `NEXT_PUBLIC_BOOKING_URL` GitHub Secret is set AND you re-ran the Deploy workflow.
Also clear your browser cache.

**"Emails aren't sending!"**
→ In Vercel → Functions logs, look for `Zoho email credentials not configured`.
Double-check `ZOHO_EMAIL` and `ZOHO_PASSWORD` env vars. Password must be a Zoho **App Password**, not your regular login.

**"Stripe webhook is failing!"**
→ Check Stripe Dashboard → Webhooks → your endpoint → "Recent deliveries" for error details.
Most common cause: `STRIPE_WEBHOOK_SECRET` mismatch. Re-copy from Stripe and redeploy.

**"Availability isn't showing on the booking page!"**
→ Did you click **Save Availability** in the admin? Firestore must have the data.

---

## 📁 What Changed in the Code

| File | What Changed |
|---|---|
| `next.config.js` | Added `STATIC_EXPORT=1` flag — GH Pages sets it, Vercel doesn't |
| `.github/workflows/deploy.yml` | Uses GitHub Secrets (no hardcoded passwords). Removes API routes before static build. |
| `src/app/oneonone/page.tsx` | Auto-redirects to Vercel URL when loaded on static site |
| `vercel.json` | Cron schedule for hourly reminder sending |
| `README.md`, `STRIPE-SETUP.md`, `upload-ionos.js`, `src/app/admin/settings/page.tsx` | Removed exposed admin password references |

**Nothing else was touched.** Your blog, Firebase, admin panel, shop, discipleship,
events, etc. all work identically.
