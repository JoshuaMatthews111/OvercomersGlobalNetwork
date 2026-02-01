'use client';

import Link from 'next/link';
import { Heart, MessageCircle, Star, ArrowRight } from 'lucide-react';

export function QuickLinks() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
            We&apos;re Here For You
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
            How Can We Serve You Today?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Prayer Request Card */}
          <Link 
            href="/prayer-request"
            className="group relative bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 md:p-8 overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Submit a Prayer Request
              </h3>
              <p className="text-purple-100 mb-4 text-sm md:text-base">
                Share your prayer needs with our intercessory team. Mark urgent requests for immediate attention and choose to receive a personal response.
              </p>
              <ul className="text-purple-200 text-sm space-y-1 mb-4">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-300" />
                  Mark as urgent for priority prayer
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-300" />
                  Option to receive a follow-up response
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-300" />
                  Confidential & covered in prayer
                </li>
              </ul>
              <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                Submit Prayer Request
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </Link>

          {/* Ask The Prophet Card */}
          <Link 
            href="/ask-the-prophet"
            className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 md:p-8 overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Ask The Prophet
              </h3>
              <p className="text-amber-100 mb-4 text-sm md:text-base">
                Submit your questions to Prophet Joshua Matthews for prophetic insight, spiritual guidance, and direction for your life.
              </p>
              <ul className="text-amber-200 text-sm space-y-1 mb-4">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-white" />
                  Dream & vision interpretation
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-white" />
                  Spiritual guidance & direction
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-white" />
                  Ministry calling & purpose
                </li>
              </ul>
              <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                Ask Your Question
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile-friendly floating buttons */}
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-50 flex gap-3">
          <Link
            href="/prayer-request"
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-full shadow-lg font-semibold text-sm"
          >
            <Heart className="w-5 h-5" />
            Prayer
          </Link>
          <Link
            href="/ask-the-prophet"
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white py-3 px-4 rounded-full shadow-lg font-semibold text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Ask Prophet
          </Link>
        </div>
      </div>
    </section>
  );
}
