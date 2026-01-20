'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Heart, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function GiveSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Generosity!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your donation has been received. May God bless you abundantly for your faithfulness.
            </p>

            {/* Scripture */}
            <div className="bg-amber-50 rounded-2xl p-8 mb-8">
              <p className="text-amber-800 text-lg italic mb-4">
                "Each of you should give what you have decided in your heart to give, 
                not reluctantly or under compulsion, for God loves a cheerful giver."
              </p>
              <p className="text-amber-600 font-semibold">— 2 Corinthians 9:7</p>
            </div>

            {/* Impact Message */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Your Gift Makes a Difference</h2>
              <p className="text-gray-600 mb-4">
                Your generous contribution helps us:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Equip and train house church leaders globally
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Create discipleship resources and materials
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Support missionaries and church planters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Advance Kingdom culture worldwide
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/give"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Give Again
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold transition-all"
              >
                Return Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Receipt Note */}
            <p className="text-gray-500 text-sm mt-8">
              A receipt has been sent to your email for your records.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function GiveSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-amber-500">Loading...</div>
      </main>
    }>
      <GiveSuccessContent />
    </Suspense>
  );
}
