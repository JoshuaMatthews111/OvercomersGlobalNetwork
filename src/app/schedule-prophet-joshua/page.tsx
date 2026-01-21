'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Calendar, Clock, DollarSign, Video, Phone, MessageSquare, CheckCircle, User } from 'lucide-react';

interface SessionType {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  icon: any;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const sessionTypes: SessionType[] = [
  {
    id: 'prophetic-word',
    title: 'Prophetic Word & Prayer',
    duration: '30 minutes',
    price: 50,
    description: 'Receive a personal prophetic word and prayer from Prophet Joshua Matthews.',
    icon: MessageSquare,
  },
  {
    id: 'spiritual-guidance',
    title: 'Spiritual Guidance Session',
    duration: '60 minutes',
    price: 100,
    description: 'In-depth spiritual guidance, counsel, and prayer for life decisions and spiritual growth.',
    icon: User,
  },
  {
    id: 'ministry-consultation',
    title: 'Ministry Consultation',
    duration: '90 minutes',
    price: 150,
    description: 'Strategic consultation for ministry leaders, church planters, and those in full-time ministry.',
    icon: Video,
  },
];

export default function ScheduleProphetJoshuaPage() {
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
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

  useEffect(() => {
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
      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem('ogn-prophet-bookings') || '[]');
      const newBooking = {
        id: Date.now(),
        sessionType: selectedSession,
        date: selectedDate,
        time: selectedTime,
        customer: formData,
        status: 'pending_payment',
        createdAt: new Date().toISOString(),
      };
      bookings.push(newBooking);
      localStorage.setItem('ogn-prophet-bookings', JSON.stringify(bookings));

      // Redirect to Stripe payment
      window.location.href = 'https://buy.stripe.com/3cI3cw5xM5Hj3VLbg5co000';
    } catch (error) {
      console.error('Booking error:', error);
      setIsSubmitting(false);
    }
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
    return dates;
  };

  const getAvailableTimesForDate = (date: string): TimeSlot[] => {
    return availability[date] || [];
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-8">
                Your session with Prophet Joshua Matthews has been scheduled. 
                A confirmation email has been sent with all the details.
              </p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule a 1-on-1 Session with <span className="gold-shimmer-light">Prophet Joshua Matthews</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Receive prophetic insight, spiritual guidance, and prayer for your life and ministry.
            </p>
          </div>
        </div>
      </section>

      {/* Session Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Session Type</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sessionTypes.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`p-6 rounded-2xl text-left transition-all ${
                    selectedSession?.id === session.id
                      ? 'bg-amber-500 text-white shadow-xl scale-105'
                      : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <session.icon className={`w-10 h-10 mb-4 ${
                    selectedSession?.id === session.id ? 'text-white' : 'text-amber-600'
                  }`} />
                  <h3 className="text-xl font-bold mb-2">{session.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{session.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg font-bold">${session.price}</span>
                  </div>
                  <p className={`text-sm ${
                    selectedSession?.id === session.id ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {session.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      {selectedSession && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Booking</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Date Selection */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Choose a date...</option>
                    {getAvailableDates().map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      <Clock className="w-5 h-5 inline mr-2" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
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
                              ? 'bg-white hover:bg-amber-50 text-gray-900 border-2 border-gray-200'
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
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <textarea
                        placeholder="Prayer requests or topics you'd like to discuss (optional)"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={4}
                        className="w-full mt-4 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Submit */}
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700 font-medium">Total:</span>
                        <span className="text-3xl font-bold text-amber-600">${selectedSession.price}</span>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-all"
                      >
                        {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                      </button>
                      <p className="text-gray-600 text-sm text-center mt-4">
                        You will be redirected to secure Stripe checkout
                      </p>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
