# Enhanced Discipleship Enrollment Form with Church Affiliation & Network Benefits

Enhance the existing discipleship enrollment form to include church affiliation questions, display network benefits before enrollment, and send detailed enrollment data to the admin panel for follow-up and prayer support.

## Overview

Transform the enrollment form to:
1. Ask about current church/fellowship affiliation
2. Welcome everyone regardless of church background
3. Display benefits of joining the Overcomers Global Network
4. Collect house church interest (start/join)
5. Send all details to admin panel for team follow-up and prayer

## New Form Structure

### **Section 1: Welcome & Benefits (Before Form)**
Display prominent benefits section with:
- **"One Body in Christ"** message - welcoming those from other churches/fellowships
- **Network Benefits:**
  - Global community across 50+ nations
  - Discipleship training and mentorship
  - Access to Kingdom resources and teachings
  - House church network and support
  - Prayer support from our team
  - Leadership development opportunities
  - Connection to Prophet Joshua's ministry
  - Regular check-ins and pastoral care
- **Inclusive Message:** "Whether you're part of a local fellowship or another church, we welcome you! We are one body in Christ."

### **Section 2: Personal Information**
(Keep existing fields)
- Name, Email, Phone
- Mailing Address

### **Section 3: Church Affiliation** (NEW)
Questions:
1. **"Are you currently part of a local church or fellowship?"**
   - Radio: Yes / No / Not Currently

2. **If Yes - "Please share about your current church:"**
   - Church/Fellowship Name (text input)
   - Location (text input)
   - Pastor/Leader Name (optional text input)
   - "How long have you been attending?" (dropdown: Less than 6 months, 6-12 months, 1-2 years, 2+ years)

3. **"What brings you to Overcomers Global Network?"** (Required)
   - Checkboxes (multiple selection):
     - Seeking deeper discipleship
     - Want to start/join a house church
     - Interested in Prophet Joshua's teachings
     - Looking for mentorship
     - Desire to serve in ministry
     - Need prayer support
     - Other (with text field)

### **Section 4: House Church Interest** (NEW)
1. **"Are you interested in house church ministry?"** (Required)
   - Radio: Start a house church / Join a house church / Learn more first / Not at this time

2. **If "Start a house church" - Show:**
   - "Do you own or rent your home?" (Radio: Own/Rent/Other)
   - "How many people can your space accommodate?" (Dropdown: 5-10, 10-15, 15-20, 20+, Not sure)
   - "Preferred meeting days/times" (Checkboxes: Weekday evenings, Weekend mornings, Weekend afternoons, Flexible)
   - "Do you have leadership or ministry experience?" (Textarea)
   - "Why do you feel called to start a house church?" (Textarea - required)

3. **If "Join a house church" - Show:**
   - "Preferred location/area" (Text input)
   - "Preferred meeting times" (Checkboxes: same as above)
   - "Any specific needs or preferences?" (Textarea)

4. **General Questions:**
   - "Have you attended a house church before?" (Yes/No)
   - "What are you hoping to gain from house church fellowship?" (Textarea)

### **Section 5: Prayer & Support**
(Keep existing)
- How did you hear about us?
- Prayer Request (Optional)

### **Section 6: Commitment Message**
Display before submit button:
- **"Our Commitment to You:"**
  - "Our team will be praying for you"
  - "We'll reach out to check on you and support your journey"
  - "You'll receive personalized guidance based on your interests"
  - "Welcome to the family!"

## Admin Panel Enhancements

### **New Admin Page: `/admin/enrollments`**

**Dashboard View:**
- Total enrollments count
- New enrollments (last 7 days)
- Pending follow-ups
- By category: House Church Starters, House Church Joiners, Discipleship Only

**Enrollments Table with Filters:**
- Filter by:
  - Enrollment type (Start House Church / Join House Church / Discipleship)
  - Church affiliation (Has church / No church)
  - Date range
  - Status (New / Contacted / In Progress / Completed)
  - Location/City

**Table Columns:**
- Name
- Email
- Phone
- Location
- Church Affiliation (Yes/No + Church Name)
- Interest Type (Start/Join/Learn)
- Date Enrolled
- Status
- Actions (View Details, Mark Contacted, Add Notes)

**Detail View Modal:**
Shows complete enrollment information:
- **Personal Info:** Name, email, phone, full address
- **Church Background:**
  - Current church/fellowship (if any)
  - Church name and location
  - Pastor/leader name
  - Duration of attendance
  - Reasons for joining OGN
- **House Church Interest:**
  - Type (Start/Join/Learn)
  - All relevant details based on selection
  - Previous house church experience
- **Prayer Requests**
- **Admin Actions:**
  - Mark as Contacted (with date)
  - Add follow-up notes
  - Assign to team member
  - Set reminder for next check-in
  - Mark as completed

**Prayer List View:**
- Special view showing all enrollments with prayer requests
- Quick access for team prayer meetings
- Mark prayers as "Prayed for" with date

## Data Storage

**localStorage Key:** `ogn-enrollments`

**Enrollment Object Structure:**
```javascript
{
  id: timestamp,
  date: ISO date,
  status: 'new' | 'contacted' | 'in-progress' | 'completed',
  
  // Personal Info
  firstName, lastName, email, phone,
  address, city, state, zipCode, country,
  
  // Church Affiliation
  hasChurch: boolean,
  churchName: string,
  churchLocation: string,
  pastorName: string,
  attendanceDuration: string,
  reasonsForJoining: array,
  reasonsOther: string,
  
  // House Church
  houseChurchInterest: 'start' | 'join' | 'learn' | 'not-now',
  // If start:
  homeOwnership: string,
  spaceCapacity: string,
  preferredTimes: array,
  leadershipExperience: string,
  callingReason: string,
  // If join:
  preferredLocation: string,
  joinPreferredTimes: array,
  specificNeeds: string,
  // General:
  previousHouseChurch: boolean,
  fellowshipGoals: string,
  
  // Additional
  howDidYouHear: string,
  prayerRequest: string,
  
  // Admin tracking
  contactedDate: string,
  followUpNotes: array,
  assignedTo: string,
  nextCheckIn: string
}
```

## UI/UX Design

### **Benefits Section Design:**
- Large hero section with gradient background
- Icon grid showing 8 key benefits
- Welcoming message in amber accent box
- "One Body in Christ" scripture (1 Corinthians 12:12-13)

### **Form Design:**
- Progressive disclosure (show/hide based on answers)
- Clear section headers with icons
- Amber accent colors matching brand
- Helpful tooltips and descriptions
- Mobile-responsive layout
- Success animation on submit

### **Admin Panel Design:**
- Clean dashboard with stats cards
- Filterable, searchable table
- Color-coded status badges
- Quick action buttons
- Detailed modal view
- Export to CSV option

## Files to Modify

1. **`/src/app/discipleship/enroll/page.tsx`**
   - Add benefits section at top
   - Add church affiliation fields
   - Add house church interest section
   - Add commitment message
   - Update form state and submission

2. **Create `/src/app/admin/enrollments/page.tsx`**
   - Dashboard with stats
   - Enrollments table with filters
   - Detail view modal
   - Prayer list view
   - Admin actions (contact, notes, status)

3. **`/src/app/admin/dashboard/page.tsx`**
   - Add "Enrollments" link to sidebar
   - Add enrollment stats to main dashboard

4. **`/src/app/discipleship/page.tsx`**
   - Update CTA to mention network benefits
   - Link to enrollment form

## Implementation Priority

1. ✅ Add benefits section to enrollment form
2. ✅ Add church affiliation questions
3. ✅ Add house church interest section
4. ✅ Update form submission logic
5. ✅ Create admin enrollments page
6. ✅ Add filters and search
7. ✅ Add detail view and admin actions
8. ✅ Test complete flow
9. ✅ Deploy

## Key Messages to Convey

**Inclusivity:**
- "We welcome you regardless of your church background"
- "One body in Christ - we're all family"
- "Whether you're from another church or seeking a church home"

**Support:**
- "Our team will be praying for you"
- "We'll check in on you regularly"
- "Personalized guidance based on your journey"

**Benefits:**
- Global network and community
- Discipleship and mentorship
- Resources and teachings
- House church opportunities
- Leadership development
