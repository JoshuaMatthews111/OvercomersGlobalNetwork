'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send, MessageCircle, CheckCircle, Loader2, Star } from 'lucide-react';
import { addFormSubmission } from '@/lib/firebase';

export default function AskTheProphetPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    questionType: '',
    question: '',
    hasReceivedProphecy: '',
    additionalContext: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const questionTypes = [
    'Spiritual Guidance',
    'Life Direction',
    'Ministry Calling',
    'Prophetic Word Clarification',
    'Dream Interpretation',
    'Vision Interpretation',
    'Relationship Guidance',
    'Career & Purpose',
    'Healing & Deliverance',
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
        status: 'pending',
        responded: false,
        response: null,
        respondedAt: null,
        adminNotes: [],
      };

      const result = await addFormSubmission('askTheProphet', submission);
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError('Failed to submit your question. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Question Submitted</h1>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out to Prophet Joshua Matthews. Your question has been received 
            and will be prayerfully considered. You will receive a response via email.
          </p>
          <blockquote className="bg-amber-50 rounded-xl p-4 mb-6 text-amber-800 italic">
            &ldquo;Surely the Sovereign LORD does nothing without revealing his plan 
            to his servants the prophets.&rdquo;
            <span className="block text-sm mt-2 text-amber-600 not-italic">— Amos 3:7</span>
          </blockquote>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[350px]">
        <Image
          src="/images/ask-the-prophet.jpg"
          alt="Ask The Prophet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-900/40 to-amber-900" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Link href="/" className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-amber-300" />
            <Star className="w-8 h-8 text-amber-200" />
            <Star className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Ask The Prophet</h1>
          <p className="text-xl text-amber-200 max-w-2xl">
            Submit your questions to Prophet Joshua Matthews for prophetic insight and spiritual guidance.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 py-12 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Prophet Joshua Matthews receives many questions. While every question 
              is read and prayed over, not all questions may receive a direct response. Priority is given 
              to urgent spiritual matters and those the Lord highlights.
            </p>
          </div>

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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="Your country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Category *
              </label>
              <select
                required
                value={formData.questionType}
                onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {questionTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you received a prophetic word before?
              </label>
              <select
                value={formData.hasReceivedProphecy}
                onChange={(e) => setFormData({ ...formData, hasReceivedProphecy: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="">Select an option</option>
                <option value="yes-from-prophet">Yes, from Prophet Joshua Matthews</option>
                <option value="yes-from-other">Yes, from another minister</option>
                <option value="no">No, this is my first time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Question *
              </label>
              <textarea
                required
                rows={5}
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Please share your question clearly and provide any relevant background..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.additionalContext}
                onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Any additional information that might help (dreams, visions, circumstances)..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 disabled:bg-amber-300 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Your Question
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Your question is confidential and will be handled with care and prayer.
          </p>
        </div>
      </div>
    </main>
  );
}
