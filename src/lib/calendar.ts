// ICS calendar file generator with built-in VALARM reminders
// Works with Apple Calendar, Google Calendar, Outlook, etc.

const ZOOM_DETAILS = {
  link: 'https://us06web.zoom.us/j/85889631414?pwd=nbd0qW9GeIutNDIBNk04DNdsTWFWqR.1',
  meetingId: '858 8963 1414',
  passcode: 'prophetic',
};

export interface CalendarEventData {
  firstName: string;
  lastName: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // "10:00 AM"
  bookingId: string;
}

function parseDateTime(dateStr: string, timeStr: string): Date {
  // Handles "10:00 AM" or "2:30 PM"
  const d = new Date(`${dateStr} ${timeStr}`);
  return d;
}

function formatICSDate(d: Date): string {
  // Format: YYYYMMDDTHHMMSSZ (UTC)
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeICS(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

/**
 * Generate an .ics calendar file with:
 * - Event at booking time (1 hour duration)
 * - 24-hour reminder (VALARM)
 * - 1-hour reminder (VALARM)
 * - Zoom link embedded in location + description
 *
 * When user imports into Apple/Google/Outlook Calendar, reminders fire automatically on their phone.
 */
export function generateICS(booking: CalendarEventData): string {
  const start = parseDateTime(booking.date, booking.time);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour session
  const now = new Date();

  const uid = `${booking.bookingId}@overcomersglobalnetwork.com`;
  const summary = '1-on-1 Session with Prophet Joshua Matthews';
  const description = escapeICS(
    `Your 1-on-1 Service with Prophet Joshua Matthews — Overcomers Global Network\n\n` +
      `Join Zoom: ${ZOOM_DETAILS.link}\n` +
      `Meeting ID: ${ZOOM_DETAILS.meetingId}\n` +
      `Passcode: ${ZOOM_DETAILS.passcode}\n\n` +
      `One tap mobile:\n` +
      `+13017158592,,85889631414# (US Washington DC)\n` +
      `+13052241968,,85889631414# (US)\n\n` +
      `Prepare: Find a quiet space, test your camera/mic, have a journal ready, pray beforehand.`
  );

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Overcomers Global Network//One-on-One Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(now)}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeICS(ZOOM_DETAILS.link)}`,
    `URL:${ZOOM_DETAILS.link}`,
    `ORGANIZER;CN=Prophet Joshua Matthews:mailto:joshuamatthews@overcomersglobalnetwork.com`,
    `ATTENDEE;CN=${escapeICS(booking.firstName + ' ' + booking.lastName)};RSVP=TRUE:mailto:${booking.email}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
    // 24-hour reminder
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Your 1-on-1 with Prophet Joshua Matthews is tomorrow',
    'TRIGGER:-PT24H',
    'END:VALARM',
    // 1-hour reminder
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Your 1-on-1 session starts in 1 hour',
    'TRIGGER:-PT1H',
    'END:VALARM',
    // 15-minute reminder (final prep)
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Your session with Prophet Joshua begins in 15 minutes — join Zoom now',
    'TRIGGER:-PT15M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  // ICS requires CRLF line endings
  return lines.join('\r\n');
}

/**
 * Generate a Google Calendar "Add Event" URL.
 * Google Calendar applies the user's default notification settings (typically 10min + popup),
 * but the ICS download is preferred since it preserves our 24h/1h/15m reminders.
 */
export function generateGoogleCalendarUrl(booking: CalendarEventData): string {
  const start = parseDateTime(booking.date, booking.time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: '1-on-1 with Prophet Joshua Matthews',
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Zoom: ${ZOOM_DETAILS.link}\nMeeting ID: ${ZOOM_DETAILS.meetingId}\nPasscode: ${ZOOM_DETAILS.passcode}`,
    location: ZOOM_DETAILS.link,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
