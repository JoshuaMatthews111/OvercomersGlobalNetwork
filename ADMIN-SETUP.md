# OGN Admin Dashboard Setup

## Setting Up Admin Credentials

For security, admin credentials are stored in environment variables, NOT in the code.

### Step 1: Create Environment File

Create a file called `.env.local` in the root of your project (same folder as `package.json`):

```bash
# Admin Credentials
NEXT_PUBLIC_ADMIN_EMAIL=mr.matthews2022@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword123
```

**Important:** Replace `YourSecurePassword123` with your actual password. Never share this file or commit it to version control.

### Step 2: Restart the Server

After creating or updating `.env.local`, restart your development server:

```bash
npm run dev
```

### Step 3: Access Admin Dashboard

1. Go to: `http://localhost:3000/admin`
2. Enter your email and password
3. You'll be redirected to the dashboard

---

## Admin Features

### Dashboard (`/admin/dashboard`)
- Overview of orders, revenue, and stats
- Quick access to all admin functions

### Orders (`/admin/orders`)
- View all orders from book purchases
- Update order status (Pending → Paid → Shipped → Completed)
- View customer details and shipping addresses
- Delete orders if needed

### Events (`/admin/events`)
- Create new events with flyers
- Set event date, time, and location
- Toggle events live/draft
- Edit or delete events

### Content (`/admin/content`)
- Create site announcements (info, warning, success types)
- Update hero section text
- Manage site content

### Settings (`/admin/settings`)
- Update site name and contact email
- Configure Givelify and Venmo settings
- View admin information

---

## How the Checkout Works

1. **Customer adds books to cart** on `/resources` page
2. **Customer goes to checkout** at `/checkout`
3. **Customer fills shipping info** and submits order
4. **Order is saved** and customer is shown Givelify button
5. **Customer donates via Givelify** (donation covers book cost)
6. **Admin sees order** in dashboard and updates status when payment confirmed
7. **Admin ships order** and marks as completed

---

## Important Notes

- Orders are stored in browser localStorage (for demo purposes)
- For production, you should integrate a real database (MongoDB, PostgreSQL, etc.)
- The Givelify integration is a redirect - customers complete payment on Givelify's platform
- Events and content changes are also stored in localStorage

---

## Security Recommendations

1. **Never commit `.env.local`** to version control
2. **Use a strong password** for admin access
3. **For production**, implement:
   - Server-side authentication (NextAuth.js recommended)
   - Database storage for orders/events
   - HTTPS encryption
   - Rate limiting on login attempts

---

## Quick Links

- Admin Login: `/admin`
- Dashboard: `/admin/dashboard`
- Orders: `/admin/orders`
- Events: `/admin/events`
- Content: `/admin/content`
- Settings: `/admin/settings`
