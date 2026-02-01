'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send, Heart, CheckCircle, Loader2 } from 'lucide-react';
import { addFormSubmission } from '@/lib/firebase';

export default function PrayerRequestPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    prayerType: '',
    isUrgent: false,
    prayerRequest: '',
    wantFollowUp: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const prayerTypes = [
    'Healing & Health',
    'Family & Relationships',
    'Financial Breakthrough',
    'Spiritual Growth',
    'Guidance & Direction',
    'Deliverance',
    'Protection',
    'Employment & Career',
    'Marriage',
    'Children',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submission = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
        submittedAt: new Date().toISOString(),
        status: 'new',
        prayedFor: false,
        adminNotes: [],
      };

      const result = await addFormSubmission('prayerRequests', submission);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError('Failed to submit prayer request. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Prayer Request Received</h1>
          <p className="text-gray-600 mb-6">
            Thank you for sharing your prayer request with us. Our prayer team will be lifting you up in prayer. 
            God hears every prayer and He is faithful to answer.
          </p>
          <blockquote className="bg-purple-50 rounded-xl p-4 mb-6 text-purple-800 italic">
            &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, 
            with thanksgiving, present your requests to God.&rdquo;
            <span className="block text-sm mt-2 text-purple-600 not-italic">— Philippians 4:6</span>
          </blockquote>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/images/prayer-request.jpg"
          alt="Prayer Request"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-900/50 to-purple-900" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Link href="/" className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <Heart className="w-16 h-16 text-purple-300 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Prayer Request</h1>
          <p className="text-xl text-purple-200 max-w-2xl">
            Share your prayer needs with us. Our prayer team is ready to stand with you in faith.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 py-12 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prayer Category *
              </label>
              <select
                required
                value={formData.prayerType}
                onChange={(e) => setFormData({ ...formData, prayerType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {prayerTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Prayer Request *
              </label>
              <textarea
                required
                rows={5}
                value={formData.prayerRequest}
                onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Share your prayer request with us. Be as detailed as you'd like..."
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isUrgent}
                  onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">This is an urgent prayer request</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.wantFollowUp}
                  onChange={(e) => setFormData({ ...formData, wantFollowUp: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">I would like someone to follow up with me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Prayer Request
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Your prayer request is confidential and will only be shared with our prayer team.
          </p>
        </div>
      </div>
    </main>
  );
}
