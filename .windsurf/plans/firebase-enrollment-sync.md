# Firebase Enrollment Sync - Direct Form to Admin Panel

Use Firebase Firestore (already installed, free tier) to sync enrollments directly from form to admin panel, viewable from any device with auto-refresh.

## Why This Works

- **Firebase is already in your project** (`package.json` has `firebase: ^12.8.0`)
- **Free tier** - 50K reads/day, 20K writes/day (more than enough)
- **Real-time sync** - Data appears instantly in admin panel
- **No external services** - Just configure Firebase (you may already have a project)
- **Works with static export** - Firebase SDK works client-side

## How It Will Work

```
User fills form → Firebase Firestore → Admin panel fetches data
                                      ↓
                              Auto-refresh every 1 min
                              + Manual refresh button
```

## Features

| Feature | Description |
|---------|-------------|
| **Direct sync** | Form → Firebase → Admin (no localStorage dependency) |
| **Auto-refresh** | Admin panel checks for new data every 60 seconds |
| **Manual refresh** | "Refresh Data" button for immediate update |
| **Offline backup** | Still saves to localStorage as fallback |
| **Data recovery** | Migrate existing localStorage data to Firebase |

## Implementation Steps

| Step | Task |
|------|------|
| 1 | Set up Firebase config (you provide project credentials) |
| 2 | Create Firestore database for enrollments |
| 3 | Update enrollment form to write to Firestore |
| 4 | Update admin panel to read from Firestore |
| 5 | Add auto-refresh (1 min interval) + manual refresh button |
| 6 | Migrate existing localStorage enrollments to Firebase |
| 7 | Test and deploy |

## What You Need To Provide

1. **Firebase Project** - Create one at [console.firebase.google.com](https://console.firebase.google.com) if you don't have one
2. **Firebase Config** - From Project Settings → Your Apps → Web App:
   ```javascript
   apiKey: "...",
   authDomain: "...",
   projectId: "...",
   storageBucket: "...",
   messagingSenderId: "...",
   appId: "..."
   ```

## Data Recovery

Your existing enrollments are NOT lost:
- **Old key**: `ogn-discipleship-enrollments` (viewable at `/admin/discipleship`)
- **New key**: `ogn-enrollments`

I will create a migration that:
1. Reads both localStorage keys
2. Uploads all existing data to Firebase
3. Deduplicates by email/phone

## Files To Modify

- `src/lib/firebase.ts` - Firebase configuration (new file)
- `src/app/discipleship/enroll/page.tsx` - Submit to Firestore
- `src/app/admin/enrollments/page.tsx` - Fetch from Firestore + auto-refresh
- `src/app/admin/enrollments/migrate.tsx` - One-time migration component

## Alternative: If You Don't Want Firebase

If you prefer not to use Firebase, the only other free options are:
1. **Google Sheets** (via Apps Script) - Requires setup
2. **Email notifications only** - No dashboard, just emails
3. **localStorage only** - Only works on YOUR browser

Firebase is the cleanest solution since it's already installed.
