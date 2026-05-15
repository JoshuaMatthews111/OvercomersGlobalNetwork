# Vercel Deployment Guide — Overcomers Global Network

This site is deployed on **Vercel** (not GitHub Pages) because it needs server-side
API routes for the 1-on-1 booking system: Stripe checkout, Stripe webhooks, Zoho email
sending, and the hourly reminder cron.

All existing pages (blog, Firebase content, admin, shop, discipleship, give, events,
prophet schedule, etc.) continue to work exactly as before on Vercel.

---

## One-Time Setup (Do This Once)

### 1. Create a Vercel Account
Go to https://vercel.com and sign up with GitHub (free).

### 2. Import the Repository
- Click **Add New → Project**
- Select `JoshuaMatthews111/OvercomersGlobalNetwork`
- Click **Import**
- Framework: **Next.js** (auto-detected)
- Build command: `next build` (default)
- Output directory: leave default
- Click **Deploy** — first deploy will fail until env vars are set (next step)

### 3. Add Environment Variables
In Vercel: **Project → Settings → Environment Variables**. Add all of these for
**Production**, **Preview**, and **Development**:

| Name | Value | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` | From Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | From Stripe webhook settings (set after step 5) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Public — safe to expose |
| `NEXT_PUBLIC_BASE_URL` | `https://overcomersglobalnetwork.com` | Used in emails and Stripe redirects |
| `ZOHO_EMAIL` | `joshuamatthews@overcomersglobalnetwork.com` | Zoho sending address |
| `ZOHO_PASSWORD` | *(Zoho app password)* | **Regenerate** in Zoho → Settings → Security → App Passwords. The old one in chat should be rotated now. |
| `ZOHO_FROM_NAME` | `Prophet Joshua Matthews` | Display name on outgoing emails |
| `ADMIN_NOTIFY_EMAIL` | `ognmedia2024@gmail.com` | Where paid-booking alerts go |
| `CRON_SECRET` | *(random 32-char string)* | Protects the reminder endpoint. Generate with: `openssl rand -hex 16` |

> **SECURITY:** Never add a `NEXT_PUBLIC_ADMIN_PASSWORD`. Admin auth is handled by
> Firebase. The legacy `NEXT_PUBLIC_ADMIN_PASSWORD` / `NEXT_PUBLIC_ADMIN_EMAIL` vars
> have been purged from the codebase and workflows.

### 4. Redeploy
After saving env vars, go to **Deployments → latest → ... → Redeploy** with
"Use existing build cache" **off**.

### 5. Connect Custom Domain
- In Vercel: **Project → Settings → Domains**
- Add `overcomersglobalnetwork.com` and `www.overcomersglobalnetwork.com`
- Vercel shows DNS records to set at your registrar (IONOS):
  - `A` record: `@` → `76.76.21.21`
  - `CNAME`: `www` → `cname.vercel-dns.com`
- Remove any old GitHub Pages DNS records (A records pointing to `185.199.*`)
- Wait ~15 min for propagation. Vercel auto-provisions SSL.

### 6. Update Stripe Webhook
- Go to Stripe dashboard → **Developers → Webhooks**
- Edit your existing endpoint (or create a new one)
- URL: `https://overcomersglobalnetwork.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copy the **Signing secret** → paste into Vercel as `STRIPE_WEBHOOK_SECRET`
- Save, then **Redeploy** again on Vercel

### 7. Verify Cron
`vercel.json` is configured to call `/api/bookings/send-reminders` every hour.
You can confirm after first deploy at: **Vercel → Project → Cron Jobs**.

> **Note:** Vercel cron does **not** automatically pass your `CRON_SECRET`. Either:
> - Leave `CRON_SECRET` unset in env (endpoint accepts all calls), OR
> - Use Vercel's built-in cron auth (set `CRON_SECRET` and Vercel passes it automatically
>   in the `Authorization` header for cron-triggered calls).

### 8. Test End-to-End
1. Visit `https://overcomersglobalnetwork.com/oneonone`
2. Pick a date/time, fill form, click Pay $150
3. Use Stripe test card in test mode, or real card in live mode
4. Confirm:
   - Redirect to `/oneonone/confirmed` works
   - Email arrives at the booker's address (check spam)
   - Admin notification arrives at `ognmedia2024@gmail.com`
   - Booking appears in `/admin/prophet-schedule` → Bookings tab

---

## 🔐 Security Actions Taken

1. **Removed** `NEXT_PUBLIC_ADMIN_PASSWORD: OGN2026Admin!` from `.github/workflows/deploy.yml`
2. **Disabled** the GitHub Pages workflow (renamed to manual-only, no secrets embedded)
3. **Purged** the hardcoded admin password from `README.md` and `upload-ionos.js`
4. **Removed** misleading `NEXT_PUBLIC_ADMIN_PASSWORD` documentation from `src/app/admin/settings/page.tsx`
5. **Removed** the same from `STRIPE-SETUP.md`

### ⚠️ You Still Need To Do Manually:

- **Rotate the old admin password** `OGN2026Admin!` — assume compromised (it was in git history).
  Because admin auth uses Firebase Auth now, log into the Firebase console and reset the password
  for `admin@overcomers.org`, OR use the "Forgot Password" flow at `/admin`.
- **Rotate the Zoho app password** you pasted in chat (`tnYz9diNbztb`). Generate a new one in
  Zoho → Settings → Security → App Passwords, paste into Vercel env vars, and invalidate the old.
- **Rotate Stripe keys** if you suspect they were ever committed. Your keys are currently only
  in `.env.local` (gitignored), so likely fine, but check `git log -p -- .env.local` to confirm
  nothing was ever committed.
- **Clean git history** if any of the above was ever committed — use `git filter-repo` or BFG.
  Rotating keys is usually easier.

---

## 📋 Files Changed In This Migration

### Created
- `vercel.json` — Vercel build config + cron schedule
- `VERCEL-DEPLOY.md` — this guide

### Modified
- `next.config.js` — removed `output: 'export'` to enable API routes
- `.github/workflows/deploy.yml` — disabled (manual trigger only), secrets purged
- `README.md` — removed exposed admin password, updated deploy reference
- `upload-ionos.js` — removed exposed admin password
- `STRIPE-SETUP.md` — removed misleading `NEXT_PUBLIC_ADMIN_PASSWORD` example
- `src/app/admin/settings/page.tsx` — removed misleading env var docs

### Untouched (preserved as-is)
- All blog pages, Firebase config, components, branding, styling
- All existing admin pages (only prophet-schedule was enhanced earlier)
- All shop, checkout, give, events, discipleship, watch, etc.
- `src/lib/firebase.ts` (unchanged)
- `netlify.toml` (unused, kept for reference)

### Previously Created (booking system, already in place)
- `src/app/oneonone/page.tsx` — landing + booking flow
- `src/app/oneonone/confirmed/page.tsx` — post-payment page
- `src/app/api/bookings/checkout/route.ts`
- `src/app/api/bookings/reschedule/route.ts`
- `src/app/api/bookings/send-reminders/route.ts`
- `src/app/api/bookings/ics/route.ts`
- `src/app/api/webhooks/stripe/route.ts` (updated with booking logic)
- `src/lib/bookings.ts`
- `src/lib/email.ts`
- `src/lib/calendar.ts`
- `src/components/Navigation.tsx` (added "1-on-1" link)
- `src/app/admin/prophet-schedule/page.tsx` (Firebase integration)

---

## FAQ

**Q: Will the blog still work?**
Yes. Blog pages, Firebase-backed posts, admin blog management — all unchanged. Vercel
serves dynamic pages server-side, which actually makes blog loading faster and SEO
better than static export.

**Q: Do I need to keep GitHub Pages?**
No. After DNS points to Vercel, GitHub Pages is no longer serving traffic. You can
leave the old deployment up or disable it in repo Settings → Pages.

**Q: What about `output: 'export'`?**
Removed. It was blocking API routes. Existing pages still render correctly; Vercel
handles both static and dynamic rendering automatically.

**Q: Will Firebase frontend usage break?**
No. All `src/lib/firebase.ts` calls are client-side (`'use client'`) and work
identically whether the page is statically exported or server-rendered.

**Q: What if I want to rollback to GitHub Pages?**
1. Restore `output: 'export'` in `next.config.js`
2. Re-enable `.github/workflows/deploy.yml`
3. The `/oneonone` page will show as a landing page but payment/emails won't work.
