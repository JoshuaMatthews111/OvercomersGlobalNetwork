'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Video, Calendar, Mail, Copy, Check, Loader2, Apple, Smartphone } from 'lucide-react';
import Link from 'next/link';

const ZOOM_DETAILS = {
  link: 'https://us06web.zoom.us/j/85889631414?pwd=nbd0qW9GeIutNDIBNk04DNdsTWFWqR.1',
  meetingId: '858 8963 1414',
  passcode: 'prophetic',
};

function ConfirmedContent() {
  const params = useSearchParams();
  const bookingId = params.get('booking');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      if (!bookingId) {
        setLoading(false);
        return;
      }
      try {
        const { getBookingById } = await import('@/lib/bookings');
        const { booking } = await getBookingById(bookingId);
        setBooking(booking);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [bookingId]);

  const copyZoom = () => {
    navigator.clipboard.writeText(ZOOM_DETAILS.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToGoogleCalendar = () => {
    if (!booking) return;
    const startDate = new Date(`${booking.date} ${booking.time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('1-on-1 with Prophet Joshua Matthews')}&dates=${fmt(startDate)}/${fmt(endDate)}&details=${encodeURIComponent(`Zoom: ${ZOOM_DETAILS.link}\nMeeting ID: ${ZOOM_DETAILS.meetingId}\nPasscode: ${ZOOM_DETAILS.passcode}`)}&location=${encodeURIComponent(ZOOM_DETAILS.link)}`;
    window.open(url, '_blank');
  };

  const downloadICS = () => {
    if (!bookingId) return;
    // Downloads .ics with VALARM reminders (24h, 1h, 15min) built in
    window.location.href = `/api/bookings/ics?id=${bookingId}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0c11] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">Booking Confirmed!</h1>
              <p className="text-gray-400 text-lg">
                Your payment was received. A confirmation email has been sent with all your session details.
              </p>
            </div>

            {booking && (
              <>
                {/* Appointment Card */}
                <div className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 border-2 border-amber-500/30 rounded-2xl p-8 mb-6">
                  <p className="text-amber-400 text-sm uppercase tracking-wider font-semibold mb-2">
                    Your Session
                  </p>
                  <p className="text-white text-2xl font-bold mb-1">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-white text-xl">{booking.time}</p>
                </div>

                {/* Zoom Details */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-bold text-lg">Zoom Meeting Details</h3>
                  </div>

                  <a
                    href={ZOOM_DETAILS.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-all mb-4"
                  >
                    Join Zoom Meeting
                  </a>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Meeting ID:</span>
                      <span className="text-white font-mono">{ZOOM_DETAILS.meetingId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Passcode:</span>
                      <span className="text-white font-mono">{ZOOM_DETAILS.passcode}</span>
                    </div>
                  </div>

                  <button
                    onClick={copyZoom}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl transition-all text-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Zoom Link'}
                  </button>
                </div>

                {/* Add to Calendar with Auto-Reminders */}
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    <h3 className="text-white font-bold">Save to Your Phone Calendar</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    <span className="text-blue-300 font-semibold">Automatic reminders included:</span> 24 hours, 1 hour, and 15 minutes before your session.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={downloadICS}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-4 py-3 rounded-xl font-semibold transition-all"
                    >
                      <Apple className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-xs text-gray-600">Add to</div>
                        <div className="text-sm">Apple / iPhone</div>
                      </div>
                    </button>
                    <button
                      onClick={addToGoogleCalendar}
                      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl font-semibold transition-all"
                    >
                      <Calendar className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-xs text-white/80">Add to</div>
                        <div className="text-sm">Google Calendar</div>
                      </div>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-3 text-center">
                    iPhone: tap the download → "Add All" to Calendar. Android: use Google Calendar button.
                  </p>
                </div>

                {/* Email sent notice */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-white font-semibold mb-1">
                      Confirmation sent to {booking.email}
                    </p>
                    <p className="text-gray-400">
                      You'll also receive a reminder 24 hours and 1 hour before your session.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="mt-8 text-center">
              <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">
                ← Back to Overcomers Global Network
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0a0c11] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        </main>
      }
    >
      <ConfirmedContent />
    </Suspense>
  );
}
