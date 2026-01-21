'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DonationSuccessPage() {
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    // Get amount from URL params if available
    const params = new URLSearchParams(window.location.search);
    const donationAmount = params.get('amount');
    if (donationAmount) {
      setAmount(donationAmount);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Thank You Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Thank You for Your <span className="gold-shimmer">Generous Gift!</span>
            </h1>

            {amount && (
              <div className="inline-block bg-white rounded-2xl px-8 py-4 shadow-lg mb-8">
                <p className="text-gray-600 text-sm mb-1">Your Donation</p>
                <p className="text-4xl font-bold text-amber-600">${amount}</p>
              </div>
            )}

            {/* Blessing */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl">
              <Heart className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <p className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
                May God's Grace Be Released Upon You
              </p>
              <p className="text-xl md:text-2xl italic mb-4">
                In Jesus' Name, Amen
              </p>
              <div className="mt-8 pt-8 border-t border-white/30">
                <p className="text-lg opacity-90 leading-relaxed">
                  "Give, and it will be given to you. A good measure, pressed down, 
                  shaken together and running over, will be poured into your lap."
                </p>
                <p className="text-amber-200 font-semibold mt-3">— Luke 6:38</p>
              </div>
            </div>

            {/* Impact Message */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Impact</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your generous gift is fueling the mission of Overcomers Global Network. 
                Through your partnership, we're training leaders, planting house churches, 
                and spreading the Gospel to the nations.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-600 mb-2">🌍</div>
                  <p className="text-sm text-gray-600">Supporting Global Missions</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-600 mb-2">👥</div>
                  <p className="text-sm text-gray-600">Training Leaders</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-amber-600 mb-2">📖</div>
                  <p className="text-sm text-gray-600">Creating Resources</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <p className="text-gray-600">
                A confirmation email has been sent to your inbox with your donation receipt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
                >
                  Return Home
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/connect"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-200 transition-all"
                >
                  Connect With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
