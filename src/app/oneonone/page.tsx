'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Loader2,
  Sparkles,
  Compass,
  Star,
  Heart,
  Shield,
  ArrowRight,
  User,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { getAvailability, type ProphetAvailabilitySlot } from '@/lib/bookings';

export default function OneOnOnePage() {
  const [step, setStep] = useState<'intro' | 'schedule' | 'details' | 'payment'>('intro');
  const [availability, setAvailability] = useState<Record<string, ProphetAvailabilitySlot[]>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    const { availability } = await getAvailability();
    setAvailability(availability);
  };

  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      if (availability[dateStr] && availability[dateStr].length > 0) {
        const hasAvailable = availability[dateStr].some(s => s.available);
        if (hasAvailable) dates.push(dateStr);
      }
    }
    return dates;
  };

  const getTimesForDate = (date: string): ProphetAvailabilitySlot[] => {
    return (availability[date] || []).filter(s => s.available);
  };

  const handleBookAndPay = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/bookings/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create booking');

      // Redirect to Stripe
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const availableDates = getAvailableDates();

  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* HERO with poster */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#0a0c11] to-amber-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Poster Image */}
            <div className="relative">
              <div className="relative aspect-square max-w-[560px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-blue-500/30 blur-3xl scale-110" />
                <Image
                  src="/images/one-on-one-prophet-joshua.png"
                  alt="One on One Service with Prophet Joshua Matthews"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              </div>
            </div>

            {/* Right: Copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Exclusive 1-on-1 Service</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="shimmer-text">One on One</span>
                <br />
                <span className="text-white">Service</span>
              </h1>

              <p className="text-xl text-gray-300 mb-6 font-light">
                with <span className="text-amber-400 font-semibold">Prophet Joshua Matthews</span>
              </p>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                Step into a personal, Spirit-led encounter. Receive prophetic direction,
                breakthrough prayer, and supernatural intervention for your life, family,
                calling, and destiny.
              </p>

              {/* Service Highlights */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: Heart, label: 'Spiritual Issues & Breakthrough Prayer' },
                  { icon: Compass, label: 'Prophetic Direction for Life, Family & Calling' },
                  { icon: Star, label: 'Supernatural Intervention & Healing' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <div className="text-center sm:text-left">
                  <p className="text-5xl font-bold text-white">$350</p>
                  <p className="text-gray-500 text-sm">per session • ~60 minutes</p>
                </div>
                <button
                  onClick={() => setStep('schedule')}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
                >
                  <Calendar className="w-5 h-5" />
                  Book Your Session
                </button>
              </div>

              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-gray-500 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-400" />
                  <span>via Zoom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500" />
                  <span>Secure Stripe Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FLOW */}
      {step !== 'intro' && (
        <section id="booking" className="py-16 bg-gradient-to-b from-[#0a0c11] to-[#1a1d29]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Progress */}
              <div className="flex items-center justify-center gap-2 mb-12">
                {['schedule', 'details', 'payment'].map((s, i) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step === s
                          ? 'bg-amber-500 text-white scale-110'
                          : ['schedule', 'details', 'payment'].indexOf(step) > i
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-gray-500'
                      }`}
                    >
                      {['schedule', 'details', 'payment'].indexOf(step) > i ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < 2 && <div className="w-12 h-px bg-white/20 mx-2" />}
                  </div>
                ))}
              </div>

              {/* STEP 1: Schedule */}
              {step === 'schedule' && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Select Date & Time</h2>
                  <p className="text-gray-400 mb-8">
                    Choose from Prophet Joshua's available time slots (Eastern Time).
                  </p>

                  {availableDates.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-gray-300 text-lg mb-2">No availability posted yet</p>
                      <p className="text-gray-500 text-sm">
                        Prophet Joshua's team will post new availability soon. Please check back, or
                        email{' '}
                        <a href="mailto:joshuamatthews@overcomersglobalnetwork.com" className="text-amber-400">
                          joshuamatthews@overcomersglobalnetwork.com
                        </a>
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Date picker */}
                      <label className="block text-amber-400 text-sm font-medium mb-3">
                        Available Dates
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-8">
                        {availableDates.map(date => {
                          const d = new Date(date);
                          const isSelected = date === selectedDate;
                          return (
                            <button
                              key={date}
                              onClick={() => {
                                setSelectedDate(date);
                                setSelectedTime('');
                              }}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                isSelected
                                  ? 'border-amber-500 bg-amber-500/20 text-white'
                                  : 'border-white/10 bg-white/5 text-gray-300 hover:border-amber-500/50'
                              }`}
                            >
                              <div className="text-xs text-gray-500">
                                {d.toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-lg font-bold">
                                {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Time picker */}
                      {selectedDate && (
                        <>
                          <label className="block text-amber-400 text-sm font-medium mb-3">
                            Available Times
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                            {getTimesForDate(selectedDate).map(slot => (
                              <button
                                key={slot.time}
                                onClick={() => setSelectedTime(slot.time)}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                  selectedTime === slot.time
                                    ? 'border-amber-500 bg-amber-500/20 text-white'
                                    : 'border-white/10 bg-white/5 text-gray-300 hover:border-amber-500/50'
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      <button
                        onClick={() => setStep('details')}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-bold transition-all"
                      >
                        Continue to Your Details
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* STEP 2: Details */}
              {step === 'details' && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Your Information</h2>
                  <p className="text-gray-400 mb-8">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {selectedTime}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-gray-400 text-sm mb-2">
                      What would you like to discuss? (optional)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share any context, questions, or prayer requests..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-4 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('schedule')}
                      className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBookAndPay}
                      disabled={
                        loading ||
                        !formData.firstName ||
                        !formData.lastName ||
                        !formData.email
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-bold transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay $350 & Confirm Booking
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* What to Expect */}
      <section className="py-24 bg-[#1a1d29]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-amber-400 tracking-[0.3em] text-sm uppercase mb-4">
                What To Expect
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">Your Session Journey</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Calendar,
                  title: '1. Book & Pay',
                  desc: 'Pick your time, pay securely via Stripe. You receive instant confirmation and Zoom details by email.',
                },
                {
                  icon: Video,
                  title: '2. Join on Zoom',
                  desc: 'Log in from anywhere. Your private session runs for approximately 60 minutes, just you and the Prophet.',
                },
                {
                  icon: Star,
                  title: '3. Walk in Destiny',
                  desc: 'Receive prophetic direction, impartation, and prayer. Leave equipped to step into your next season.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 transition-all"
                >
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'How long is a session?',
                  a: 'Each 1-on-1 session is approximately 60 minutes on Zoom.',
                },
                {
                  q: 'What should I prepare?',
                  a: 'Come with an open heart, a pen and journal, and any specific questions or situations you want prayer for. We recommend 15 minutes of personal prayer before the call.',
                },
                {
                  q: 'What is your refund policy?',
                  a: 'Bookings can be rescheduled up to 24 hours before the session. Refunds are not offered for no-shows, but we will work with you if an emergency arises.',
                },
                {
                  q: 'Can I reschedule?',
                  a: 'Yes. Email joshuamatthews@overcomersglobalnetwork.com at least 24 hours before your session to reschedule at no cost.',
                },
                {
                  q: 'Is this confidential?',
                  a: 'Absolutely. Everything shared in your session is held in strict confidence.',
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 group"
                >
                  <summary className="text-white font-semibold cursor-pointer flex items-center justify-between">
                    {faq.q}
                    <span className="text-amber-400 group-open:rotate-45 transition-transform text-2xl">
                      +
                    </span>
                  </summary>
                  <p className="text-gray-400 mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
