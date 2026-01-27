'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Heart, Phone, Mail, ArrowRight } from 'lucide-react';
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
                <span className="font-semibold text-lg">You Are Loved</span>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Thank you for taking this step of faith! Your enrollment has been received, 
                and we are excited to welcome you into the Overcomers Global Network family.
              </p>

              <div className="bg-amber-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">What Happens Next:</h3>
                <ul className="text-left space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">1</div>
                    <span>You will receive a <strong>phone call from a leader</strong> in our fellowship to personally welcome you and answer any questions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">2</div>
                    <span>Your <strong>right hand of fellowship materials</strong> will be mailed to the address you provided.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">3</div>
                    <span>You&apos;ll be connected with a <strong>house church</strong> in your area or our online community.</span>
                  </li>
                </ul>
              </div>

              {/* Scripture */}
              <div className="border-l-4 border-amber-500 pl-4 py-2 text-left mb-6">
                <p className="text-gray-700 italic mb-2">
                  &quot;Behold, I stand at the door and knock. If anyone hears My voice and opens the door, 
                  I will come in to him and dine with him, and he with Me.&quot;
                </p>
                <p className="text-amber-600 font-semibold text-sm">— Revelation 3:20</p>
              </div>

              <p className="text-lg text-gray-800 font-medium">
                You are loved in the name of Jesus Christ. <br />
                <span className="text-amber-600">It&apos;s time to advance!</span>
              </p>
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
