'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Calendar, Clock, DollarSign, Video, CheckCircle, User, Link as LinkIcon, Copy, CalendarPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TimeSlot {
  time: string;
  available: boolean;
}

const ZOOM_DETAILS = {
  link: 'https://us06web.zoom.us/j/85889631414?pwd=nbd0qW9GeIutNDIBNk04DNdsTWFWqR.1',
  meetingId: '858 8963 1414',
  passcode: 'prophetic',
};

export default function ScheduleProphetJoshuaPage() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [availability, setAvailability] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check URL params for payment status
    const params = new URLSearchParams(window.location.search);
    const paid = params.get('paid');
    if (paid === 'true') {
      setIsPaid(true);
    }

    // Load availability from localStorage (set by admin)
    const savedAvailability = localStorage.getItem('ogn-prophet-availability');
    if (savedAvailability) {
      setAvailability(JSON.parse(savedAvailability));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const booking = {
        id: Date.now(),
        date: selectedDate,
        time: selectedTime,
        customer: formData,
        status: isPaid ? 'confirmed' : 'pending_payment',
        isPaid,
        createdAt: new Date().toISOString(),
        zoomDetails: ZOOM_DETAILS,
      };

      // Save booking to localStorage for admin panel
      const bookings = JSON.parse(localStorage.getItem('ogn-prophet-bookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('ogn-prophet-bookings', JSON.stringify(bookings));

      setBookingDetails(booking);
      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayAndSchedule = () => {
    // Save form data temporarily
    localStorage.setItem('ogn-temp-booking', JSON.stringify({
      date: selectedDate,
      time: selectedTime,
      customer: formData,
    }));
    // Redirect to Stripe payment ($150)
    window.location.href = 'https://buy.stripe.com/28EbJ2gcq6LnfEt2Jzco001';
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      if (availability[dateStr] && availability[dateStr].length > 0) {
        dates.push(dateStr);
      }
    }
    // If no admin availability set, show next 14 days
    if (dates.length === 0) {
      for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        if (date.getDay() !== 0) { // Exclude Sundays
          dates.push(date.toISOString().split('T')[0]);
        }
      }
    }
    return dates;
  };

  const getAvailableTimesForDate = (date: string): TimeSlot[] => {
    if (availability[date] && availability[date].length > 0) {
      return availability[date];
    }
    // Default times if no admin availability set
    return [
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: true },
    ];
  };

  const generateCalendarLinks = () => {
    if (!bookingDetails) return null;
    
    const startDate = new Date(`${bookingDetails.date} ${bookingDetails.time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour
    
    const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
    
    const title = encodeURIComponent('1-on-1 Session with Prophet Joshua Matthews');
    const description = encodeURIComponent(`Join Zoom Meeting: ${ZOOM_DETAILS.link}\n\nMeeting ID: ${ZOOM_DETAILS.meetingId}\nPasscode: ${ZOOM_DETAILS.passcode}`);
    const location = encodeURIComponent(ZOOM_DETAILS.link);
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${description}&location=${location}`;
    
    // Apple Calendar uses webcal or .ics file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:1-on-1 Session with Prophet Joshua Matthews
DESCRIPTION:Join Zoom Meeting: ${ZOOM_DETAILS.link}\\n\\nMeeting ID: ${ZOOM_DETAILS.meetingId}\\nPasscode: ${ZOOM_DETAILS.passcode}
LOCATION:${ZOOM_DETAILS.link}
END:VEVENT
END:VCALENDAR`;
    
    return { googleUrl, icsContent };
  };

  const downloadICS = () => {
    const links = generateCalendarLinks();
    if (!links) return;
    
    const blob = new Blob([links.icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prophet-joshua-session.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyZoomLink = () => {
    navigator.clipboard.writeText(ZOOM_DETAILS.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted && bookingDetails) {
    const calendarLinks = generateCalendarLinks();
    
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {isPaid ? 'Booking Confirmed!' : 'Booking Received!'}
                </h1>
                <p className="text-gray-600">
                  {isPaid 
                    ? 'Your session with Prophet Joshua Matthews has been scheduled.'
                    : 'Your booking request has been received. Please complete payment to confirm.'}
                </p>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Session Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingDetails.time} EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">60 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${isPaid ? 'text-green-600' : 'text-amber-600'}`}>
                      {isPaid ? 'Confirmed' : 'Pending Payment'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Zoom Details */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Video className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Zoom Meeting Details</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 block mb-1">Join Link:</span>
                    <div className="flex items-center gap-2">
                      <a href={ZOOM_DETAILS.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                        {ZOOM_DETAILS.link}
                      </a>
                      <button onClick={copyZoomLink} className="p-1 hover:bg-blue-100 rounded">
                        <Copy className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    {copied && <span className="text-green-600 text-xs">Copied!</span>}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meeting ID:</span>
                    <span className="font-mono font-medium">{ZOOM_DETAILS.meetingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passcode:</span>
                    <span className="font-mono font-medium">{ZOOM_DETAILS.passcode}</span>
                  </div>
                </div>
              </div>

              {/* Add to Calendar */}
              <div className="bg-amber-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarPlus className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-gray-900">Add to Calendar</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={calendarLinks?.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google Calendar
                  </a>
                  <button
                    onClick={downloadICS}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Apple Calendar / Outlook
                  </button>
                </div>
              </div>

              {!isPaid && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-red-800 mb-2">Payment Required</h3>
                  <p className="text-red-700 text-sm mb-4">
                    To confirm your session, please complete the $150 payment.
                  </p>
                  <a
                    href="https://buy.stripe.com/28EbJ2gcq6LnfEt2Jzco001"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    <DollarSign className="w-5 h-5" />
                    Pay $150 Now
                  </a>
                </div>
              )}

              <div className="text-center">
                <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30">
              <Image
                src="/images/prophet-joshua.jpg"
                alt="Prophet Joshua Matthews"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule a 1-on-1 Session
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-4">
              with Prophet Joshua Matthews
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">$150 per session</span>
            </div>
          </div>
        </div>
      </section>

      {/* Link Type Indicator */}
      {isPaid && (
        <div className="bg-green-100 border-b border-green-200 py-3">
          <div className="container mx-auto px-4 text-center">
            <span className="text-green-800 font-medium">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Payment Confirmed - Complete your scheduling below
            </span>
          </div>
        </div>
      )}

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select Your Appointment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Date Selection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  <Calendar className="w-5 h-5 inline mr-2 text-amber-600" />
                  Select Date
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {getAvailableDates().slice(0, 10).map((date) => {
                    const d = new Date(date);
                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime('');
                        }}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedDate === date
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-50 hover:bg-amber-50 text-gray-900 border border-gray-200'
                        }`}
                      >
                        <div className="text-xs uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-2xl font-bold">{d.getDate()}</div>
                        <div className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Clock className="w-5 h-5 inline mr-2 text-amber-600" />
                    Select Time (EST)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {getAvailableTimesForDate(selectedDate).map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          selectedTime === slot.time
                            ? 'bg-amber-500 text-white'
                            : slot.available
                            ? 'bg-gray-50 hover:bg-amber-50 text-gray-900 border border-gray-200'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {selectedTime && (
                <>
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      <User className="w-5 h-5 inline mr-2 text-amber-600" />
                      Your Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Prayer requests or topics you'd like to discuss (optional)"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full mt-4 px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Submit Options */}
                  <div className="bg-amber-50 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-700 font-medium">Session Fee:</span>
                      <span className="text-3xl font-bold text-amber-600">$150</span>
                    </div>
                    
                    {isPaid ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Confirm Booking (Payment Complete)
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={handlePayAndSchedule}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <DollarSign className="w-5 h-5" />
                          Pay $150 & Schedule
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? 'Submitting...' : 'Schedule Without Payment'}
                        </button>
                        <p className="text-gray-500 text-sm text-center">
                          Scheduling without payment will require admin approval
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Admin Link Generator Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Scheduling Links</h3>
            <p className="text-gray-600 mb-6">
              Share these links with those who want to schedule a session:
            </p>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-800 font-medium mb-2">With Payment Required ($150):</p>
                <code className="text-xs bg-white px-2 py-1 rounded border break-all">
                  {typeof window !== 'undefined' ? `${window.location.origin}/schedule-prophet-joshua` : '/schedule-prophet-joshua'}
                </code>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">Pre-Paid / Admin Approved:</p>
                <code className="text-xs bg-white px-2 py-1 rounded border break-all">
                  {typeof window !== 'undefined' ? `${window.location.origin}/schedule-prophet-joshua?paid=true` : '/schedule-prophet-joshua?paid=true'}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
