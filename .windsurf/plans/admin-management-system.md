# Admin Management System with Firebase Auth

Build a complete admin management system with roles, permissions, and Firebase integration for all forms and content.

## Firebase Test Mode

**Yes, you should switch out of test mode** for production. I'll update the security rules to:
- Only allow authenticated admins to read/write data
- Protect enrollment data
- Secure blog posts and events

## System Overview

```
Master Admin (You)
    ├── Can invite/remove/suspend admins
    ├── Can assign/unassign tasks
    ├── Full access to everything
    │
    └── Regular Admins
        ├── View enrollments
        ├── Assign themselves to enrollments
        ├── Post/edit blogs
        └── Post/edit events
```

## Features to Build

### 1. Admin Authentication (Firebase Auth)
- Email/password login
- Secure session management
- Password reset functionality

### 2. Admin Roles
| Role | Permissions |
|------|-------------|
| **Master Admin** | Full access + manage other admins |
| **Admin** | Blog, Events, Enrollments (view/assign self) |

### 3. Admin Management (Master Only)
- Invite new admins (generates temporary password)
- Suspend/pause admin accounts
- Remove admins
- View all admin activity

### 4. Task Assignment System
- Admins can assign themselves to enrollments
- All admins see who is assigned
- Master admin can unassign anyone

### 5. Firebase Collections
```
/admins
  - email, name, role, status, createdAt, lastLogin

/enrollments (existing)
  - assignedTo, assignedAt fields

/blogs
  - title, content, author, publishedAt, status

/events
  - title, date, location, description, createdBy

/churchForms
  - form submissions from church pages

/contactForms
  - contact form submissions
```

### 6. Security Rules (Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated admins can access
    function isAdmin() {
      return request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    function isMasterAdmin() {
      return isAdmin() && 
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'master';
    }
    
    // Enrollments - anyone can submit, only admins can read
    match /enrollments/{doc} {
      allow create: if true;
      allow read, update: if isAdmin();
      allow delete: if isMasterAdmin();
    }
    
    // Blogs - admins can CRUD
    match /blogs/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Events - admins can CRUD
    match /events/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Admins collection - master only
    match /admins/{doc} {
      allow read: if isAdmin();
      allow write: if isMasterAdmin();
    }
  }
}
```

## Implementation Steps

| Step | Task | Files |
|------|------|-------|
| 1 | Enable Firebase Auth in console | Firebase Console |
| 2 | Create admin auth context | `src/lib/auth.ts` |
| 3 | Build admin login page | `src/app/admin/page.tsx` |
| 4 | Create admin management page | `src/app/admin/users/page.tsx` |
| 5 | Add invite admin functionality | Admin users page |
| 6 | Update enrollments with assignment | `src/app/admin/enrollments/page.tsx` |
| 7 | Create Firebase-backed blog system | `src/app/admin/blog/page.tsx` |
| 8 | Create Firebase-backed events system | `src/app/admin/events/page.tsx` |
| 9 | Extend Firebase to other forms | Various form pages |
| 10 | Update security rules | Firebase Console |

## What You Need To Do in Firebase Console

1. **Enable Authentication:**
   - Go to Build → Authentication
   - Click "Get started"
   - Enable "Email/Password" provider

2. **Create your Master Admin account:**
   - I'll create a setup page for your first login
   - You'll set your email and password

3. **Update Security Rules** (after we test):
   - Replace test mode rules with production rules above
