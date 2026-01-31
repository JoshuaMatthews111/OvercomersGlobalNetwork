'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Heart, Mail, ArrowRight, Clock, Package, Users } from 'lucide-react';
import Link from 'next/link';

export default function DiscipleshipThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Thank You Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Welcome to the Family!
            </h1>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
              <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                <Heart className="w-6 h-6" />
                <span className="font-semibold text-lg">We Love You!</span>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Thank you for taking this step of faith! Your enrollment has been received, 
                and we are excited to welcome you into the Overcomers Global Network family.
              </p>

              {/* Important Notice */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="w-6 h-6" />
                  <span className="font-bold text-lg">Someone Will Be Reaching Out!</span>
                </div>
                <p className="text-amber-100 mb-4">
                  Please <strong className="text-white">check your email address within 24-48 hours</strong>. 
                  A member of our team will contact you to welcome you personally and help you get started.
                </p>
                <div className="flex items-center justify-center gap-2 text-amber-200">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">Check your inbox (and spam folder)</span>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">What Happens Next:</h3>
                <ul className="text-left space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-gray-900">Check Your Email (24-48 hrs)</strong>
                      <p className="text-sm text-gray-600">Someone from our team will reach out to welcome you and answer any questions.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-gray-900">Receive Your Disciple Starter Pack</strong>
                      <p className="text-sm text-gray-600">Your email will be used to send you your starter pack as a new disciple in Overcomers!</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-gray-900">Get Connected</strong>
                      <p className="text-sm text-gray-600">You&apos;ll be connected with a house church in your area or our online community.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Scripture */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-gray-700 italic text-lg mb-3">
                  &quot;Therefore, if anyone is in Christ, he is a new creation; old things have passed away; 
                  behold, all things have become new.&quot;
                </p>
                <p className="text-amber-600 font-semibold">— 2 Corinthians 5:17</p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xl text-gray-800 font-medium mb-2">
                  You are loved in the name of Jesus Christ!
                </p>
                <p className="text-amber-600 font-bold text-lg">
                  Welcome to the family — It&apos;s time to advance!
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Questions? Reach Out to Us</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="mailto:mr.matthews2022@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  mr.matthews2022@gmail.com
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Return Home
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/watch"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Watch Teachings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
