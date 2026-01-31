# Enhanced Discipleship & House Church Enrollment Form

Enhance the existing discipleship enrollment form at `/discipleship/enroll` to include house church-specific questions, creating one comprehensive form for both discipleship and house church enrollment.

## Current State

The existing form at `/src/app/discipleship/enroll/page.tsx` currently collects:
- Personal info (name, email, phone)
- Mailing address (for right hand of fellowship materials)
- How they heard about OGN
- Prayer requests

## Proposed Enhancements

### New House Church Section
Add a dedicated section to the existing form with these questions:

1. **Interest in House Church** (Required)
   - Radio buttons: "Join an existing house church" / "Start a house church in my home" / "Learn more first"

2. **For Those Starting a House Church:**
   - "Do you own or rent your home?" (Radio: Own/Rent)
   - "How many people can your space accommodate?" (Dropdown: 5-10, 10-15, 15-20, 20+)
   - "What days/times work best for gatherings?" (Checkboxes: Weekday evenings, Weekend mornings, Weekend afternoons, Flexible)
   - "Do you have leadership or ministry experience?" (Textarea)
   - "Why do you feel called to start a house church?" (Textarea - required)

3. **For Those Joining:**
   - "Preferred location/area" (Text input)
   - "Preferred meeting times" (Checkboxes: same as above)
   - "Any specific needs or preferences?" (Textarea)

4. **General House Church Questions:**
   - "Have you attended a house church before?" (Yes/No radio)
   - "What are you hoping to gain from house church fellowship?" (Textarea)

### Form Logic
- Show/hide conditional fields based on the user's selection
- All house church fields appear after the existing address section
- Maintain all current fields (don't remove anything)

### Data Storage
- Save to localStorage as `ogn-house-church-enrollments`
- Include all existing fields plus new house church fields
- Add `enrollmentType` field: "discipleship", "house-church-start", "house-church-join"

### Admin Panel Integration
- Create new admin page at `/admin/house-church-enrollments`
- Display enrollments in a table with filters:
  - Filter by type (Start/Join/Learn More)
  - Filter by location/city
  - Filter by date
- Show detailed view of each enrollment
- Mark as "Contacted", "In Progress", "Completed"

### UI/UX Improvements
- Add icons for house church section (Home icon from lucide-react)
- Use amber accent colors to match existing design
- Add helpful tooltips/descriptions for house church questions
- Include inspiring scripture about house churches (Acts 2:46-47)
- Smooth transitions when showing/hiding conditional fields

## Files to Modify

1. **`/src/app/discipleship/enroll/page.tsx`**
   - Add new form fields and state
   - Add conditional rendering logic
   - Update form submission to include house church data

2. **Create `/src/app/admin/house-church-enrollments/page.tsx`**
   - New admin page to view and manage enrollments
   - Table view with filters and search
   - Detail modal for each enrollment

3. **`/src/app/admin/dashboard/page.tsx`**
   - Add link to house church enrollments in sidebar

4. **`/src/app/discipleship/page.tsx`**
   - Update "Apply to Lead" button to point to enhanced enrollment form
   - Update copy to mention house church enrollment

## Benefits of One Form

- **Simpler user experience** - One entry point for all discipleship/house church needs
- **Better data collection** - All information in one place
- **Easier admin management** - Single system to track all enrollments
- **Flexible** - Users can indicate interest in multiple areas
- **Progressive disclosure** - Only show relevant questions based on user's selection

## Implementation Steps

1. Add new state fields to enrollment form
2. Create house church section with conditional fields
3. Update form submission logic
4. Create admin panel for viewing enrollments
5. Update navigation links
6. Test form flow and data storage
7. Deploy changes
