import nodemailer from 'nodemailer';
import { generateICS } from './calendar';

const ZOOM_DETAILS = {
  link: 'https://us06web.zoom.us/j/85889631414?pwd=nbd0qW9GeIutNDIBNk04DNdsTWFWqR.1',
  meetingId: '858 8963 1414',
  passcode: 'prophetic',
  dialIn: '+1 301 715 8592',
  dialInAlt: '+1 305 224 1968',
  tapToCall: '+13017158592,,85889631414#,,,,*873336342#',
};

const BRAND = {
  name: 'Overcomers Global Network',
  domain: 'overcomersglobalnetwork.com',
  primary: '#C9A24A',
  dark: '#0a0c11',
};

// Create SMTP transporter using Zoho
function getTransporter() {
  const email = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;

  if (!email || !password) {
    throw new Error('Zoho email credentials not configured. Set ZOHO_EMAIL and ZOHO_PASSWORD in .env.local');
  }

  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });
}

const fromAddress = () => {
  const email = process.env.ZOHO_EMAIL || 'joshuamatthews@overcomersglobalnetwork.com';
  const name = process.env.ZOHO_FROM_NAME || 'Prophet Joshua Matthews';
  return `"${name}" <${email}>`;
};

// ==================== BOOKING CONFIRMATION EMAIL ====================

export interface BookingEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  bookingId: string;
  notes?: string;
}

export async function sendBookingConfirmation(booking: BookingEmailData) {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Session is Confirmed</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #0a0c11 0%, #1a1d29 100%);padding:40px 30px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:28px;font-weight:bold;">Session Confirmed</h1>
              <p style="color:${BRAND.primary};margin:8px 0 0;font-size:14px;letter-spacing:2px;text-transform:uppercase;">Overcomers Global Network</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;">
              <h2 style="color:#1a1d29;margin:0 0 16px;font-size:22px;">Shalom, ${booking.firstName}!</h2>
              <p style="color:#4a5568;line-height:1.6;font-size:16px;margin:0 0 24px;">
                Your 1-on-1 session with Prophet Joshua Matthews has been confirmed. 
                Please save these details and join the Zoom call at your scheduled time.
              </p>

              <!-- Appointment Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:2px solid ${BRAND.primary};border-radius:12px;padding:24px;margin:0 0 24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;color:${BRAND.primary};font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Your Appointment</p>
                    <p style="margin:0 0 4px;color:#1a1d29;font-size:20px;font-weight:bold;">${formattedDate}</p>
                    <p style="margin:0;color:#1a1d29;font-size:18px;">${booking.time}</p>
                  </td>
                </tr>
              </table>

              <!-- Zoom Details -->
              <h3 style="color:#1a1d29;margin:0 0 12px;font-size:18px;">Join via Zoom</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0c11;border-radius:12px;padding:20px;margin:0 0 24px;">
                <tr>
                  <td>
                    <a href="${ZOOM_DETAILS.link}" style="display:inline-block;background:${BRAND.primary};color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;margin:0 0 16px;">
                      Join Zoom Meeting
                    </a>
                    <p style="color:#cbd5e0;margin:12px 0 4px;font-size:14px;"><strong style="color:white;">Meeting ID:</strong> ${ZOOM_DETAILS.meetingId}</p>
                    <p style="color:#cbd5e0;margin:0 0 4px;font-size:14px;"><strong style="color:white;">Passcode:</strong> ${ZOOM_DETAILS.passcode}</p>
                    <p style="color:#cbd5e0;margin:12px 0 4px;font-size:12px;"><strong style="color:white;">Dial-in (US):</strong> ${ZOOM_DETAILS.dialIn}</p>
                    <p style="color:#cbd5e0;margin:0;font-size:12px;"><strong style="color:white;">Alt Dial-in:</strong> ${ZOOM_DETAILS.dialInAlt}</p>
                  </td>
                </tr>
              </table>

              <!-- Save to Calendar CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:2px dashed #3b82f6;border-radius:12px;padding:20px;margin:0 0 24px;">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0 0 8px;color:#1e40af;font-weight:bold;font-size:16px;">📅 Save to Your Phone's Calendar</p>
                    <p style="margin:0 0 12px;color:#3b82f6;font-size:13px;">We've attached a calendar file with <strong>automatic reminders set for 24 hours, 1 hour, and 15 minutes before</strong> your session. Just tap the attachment to add it to Apple Calendar or Google Calendar.</p>
                  </td>
                </tr>
              </table>

              <!-- How to Prepare -->
              <h3 style="color:#1a1d29;margin:0 0 12px;font-size:18px;">How to Prepare</h3>
              <ul style="color:#4a5568;line-height:1.8;font-size:15px;margin:0 0 24px;padding-left:20px;">
                <li>Find a quiet, private space</li>
                <li>Test your camera and microphone beforehand</li>
                <li>Have a pen and journal ready for notes</li>
                <li>Spend a few minutes in prayer before the session</li>
                <li>Join 2-3 minutes early</li>
              </ul>

              <!-- Scripture -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef3c7;border-left:4px solid ${BRAND.primary};border-radius:8px;padding:20px;margin:0 0 24px;">
                <tr>
                  <td>
                    <p style="color:#78350f;margin:0;font-style:italic;font-size:15px;line-height:1.6;">
                      "Call to me and I will answer you, and will tell you great and hidden things that you have not known."
                    </p>
                    <p style="color:${BRAND.primary};margin:8px 0 0;font-size:13px;font-weight:bold;">— Jeremiah 33:3</p>
                  </td>
                </tr>
              </table>

              <p style="color:#4a5568;line-height:1.6;font-size:14px;margin:24px 0 0;">
                Need to reschedule or have questions? Reply to this email and we'll get back to you as soon as possible.
              </p>

              <p style="color:#718096;line-height:1.6;font-size:13px;margin:24px 0 0;">
                <strong>Booking Reference:</strong> ${booking.bookingId}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0c11;padding:24px 30px;text-align:center;">
              <p style="color:#cbd5e0;margin:0 0 8px;font-size:14px;font-weight:bold;">Overcomers Global Network</p>
              <p style="color:#718096;margin:0;font-size:12px;">
                <a href="https://${BRAND.domain}" style="color:${BRAND.primary};text-decoration:none;">${BRAND.domain}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Generate ICS with built-in VALARM reminders (24h, 1h, 15min)
  const icsContent = generateICS({
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,
    date: booking.date,
    time: booking.time,
    bookingId: booking.bookingId,
  });

  const transporter = getTransporter();
  return transporter.sendMail({
    from: fromAddress(),
    to: booking.email,
    subject: `Session Confirmed: ${formattedDate} at ${booking.time}`,
    html,
    icalEvent: {
      filename: 'prophet-joshua-session.ics',
      method: 'PUBLISH',
      content: icsContent,
    },
    attachments: [
      {
        filename: 'prophet-joshua-session.ics',
        content: icsContent,
        contentType: 'text/calendar; charset=utf-8; method=PUBLISH',
      },
    ],
  });
}

// ==================== BOOKING REMINDER EMAIL ====================

export async function sendBookingReminder(booking: BookingEmailData, hoursUntil: number) {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeLabel = hoursUntil >= 24 ? 'Tomorrow' : hoursUntil >= 2 ? `In ${hoursUntil} Hours` : 'Starting Soon';

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND.primary} 0%, #e8c472 100%);padding:40px 30px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:28px;">Reminder: Your Session is ${timeLabel}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <p style="color:#4a5568;line-height:1.6;font-size:16px;margin:0 0 24px;">
                Hi ${booking.firstName}, this is a friendly reminder about your upcoming session with Prophet Joshua Matthews.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:2px solid ${BRAND.primary};border-radius:12px;padding:24px;margin:0 0 24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;color:#1a1d29;font-size:20px;font-weight:bold;">${formattedDate}</p>
                    <p style="margin:0;color:#1a1d29;font-size:18px;">${booking.time}</p>
                  </td>
                </tr>
              </table>
              <div style="text-align:center;margin:24px 0;">
                <a href="${ZOOM_DETAILS.link}" style="display:inline-block;background:${BRAND.primary};color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">
                  Join Zoom Meeting
                </a>
              </div>
              <p style="color:#4a5568;font-size:14px;text-align:center;margin:0;">
                Meeting ID: <strong>${ZOOM_DETAILS.meetingId}</strong> &nbsp;|&nbsp; Passcode: <strong>${ZOOM_DETAILS.passcode}</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const transporter = getTransporter();
  return transporter.sendMail({
    from: fromAddress(),
    to: booking.email,
    subject: `Reminder: Your Session ${timeLabel} — ${booking.time}`,
    html,
  });
}

// ==================== ADMIN NOTIFICATION EMAIL ====================

export async function sendAdminBookingNotification(booking: BookingEmailData & { isPaid: boolean; amount?: number }) {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || 'ognmedia2024@gmail.com';
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statusBadge = booking.isPaid 
    ? '<span style="background:#10b981;color:white;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:bold;">PAID ✓</span>'
    : '<span style="background:#f59e0b;color:white;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:bold;">PENDING</span>';

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#0a0c11;padding:30px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:24px;">New 1-on-1 Booking ${statusBadge}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="color:#718096;font-weight:bold;width:140px;">Name:</td>
                  <td style="color:#1a1d29;">${booking.firstName} ${booking.lastName}</td>
                </tr>
                <tr>
                  <td style="color:#718096;font-weight:bold;">Email:</td>
                  <td style="color:#1a1d29;"><a href="mailto:${booking.email}" style="color:${BRAND.primary};">${booking.email}</a></td>
                </tr>
                <tr>
                  <td style="color:#718096;font-weight:bold;">Phone:</td>
                  <td style="color:#1a1d29;">${booking.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="color:#718096;font-weight:bold;">Date:</td>
                  <td style="color:#1a1d29;font-weight:bold;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="color:#718096;font-weight:bold;">Time:</td>
                  <td style="color:#1a1d29;font-weight:bold;">${booking.time}</td>
                </tr>
                <tr>
                  <td style="color:#718096;font-weight:bold;">Payment:</td>
                  <td style="color:#1a1d29;">${booking.isPaid ? `$${booking.amount || 350} ✓ Received` : 'Awaiting payment'}</td>
                </tr>
                <tr>
                  <td style="color:#718096;font-weight:bold;">Booking ID:</td>
                  <td style="color:#1a1d29;font-family:monospace;font-size:12px;">${booking.bookingId}</td>
                </tr>
                ${booking.notes ? `
                <tr>
                  <td style="color:#718096;font-weight:bold;vertical-align:top;">Notes:</td>
                  <td style="color:#1a1d29;background:#faf8f5;padding:12px;border-radius:8px;">${booking.notes}</td>
                </tr>
                ` : ''}
              </table>
              <div style="margin-top:24px;text-align:center;">
                <a href="https://${BRAND.domain}/admin/prophet-schedule" style="display:inline-block;background:${BRAND.primary};color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
                  Manage in Admin Panel
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const transporter = getTransporter();
  return transporter.sendMail({
    from: fromAddress(),
    to: adminEmail,
    subject: `${booking.isPaid ? '💰 PAID' : '⏳ New'} Booking: ${booking.firstName} ${booking.lastName} - ${formattedDate}`,
    html,
  });
}

// ==================== RESCHEDULE EMAIL ====================

export async function sendRescheduleEmail(booking: BookingEmailData, oldDate: string, oldTime: string) {
  const formattedNewDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedOldDate = new Date(oldDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#0a0c11;padding:40px 30px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:24px;">Your Session Has Been Rescheduled</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px;">
              <p style="color:#4a5568;line-height:1.6;font-size:16px;margin:0 0 24px;">
                Hi ${booking.firstName}, your session with Prophet Joshua Matthews has been rescheduled.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#fee2e2;border-radius:8px;padding:16px;width:48%;">
                    <p style="margin:0 0 4px;color:#dc2626;font-size:11px;font-weight:bold;text-transform:uppercase;">Previous Time</p>
                    <p style="margin:0 0 2px;color:#1a1d29;font-size:15px;text-decoration:line-through;">${formattedOldDate}</p>
                    <p style="margin:0;color:#1a1d29;font-size:15px;text-decoration:line-through;">${oldTime}</p>
                  </td>
                  <td style="width:4%;"></td>
                  <td style="background:#d1fae5;border:2px solid #10b981;border-radius:8px;padding:16px;width:48%;">
                    <p style="margin:0 0 4px;color:#059669;font-size:11px;font-weight:bold;text-transform:uppercase;">New Time</p>
                    <p style="margin:0 0 2px;color:#1a1d29;font-size:15px;font-weight:bold;">${formattedNewDate}</p>
                    <p style="margin:0;color:#1a1d29;font-size:15px;font-weight:bold;">${booking.time}</p>
                  </td>
                </tr>
              </table>
              <div style="text-align:center;margin:32px 0 16px;">
                <a href="${ZOOM_DETAILS.link}" style="display:inline-block;background:${BRAND.primary};color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">
                  Join Zoom Meeting (same link)
                </a>
              </div>
              <p style="color:#4a5568;font-size:14px;text-align:center;margin:0;">
                Meeting ID: <strong>${ZOOM_DETAILS.meetingId}</strong> &nbsp;|&nbsp; Passcode: <strong>${ZOOM_DETAILS.passcode}</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const transporter = getTransporter();
  return transporter.sendMail({
    from: fromAddress(),
    to: booking.email,
    subject: `Rescheduled: Your Session is now ${formattedNewDate} at ${booking.time}`,
    html,
  });
}

export { ZOOM_DETAILS };
