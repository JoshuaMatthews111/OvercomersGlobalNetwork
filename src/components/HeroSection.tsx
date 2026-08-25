'use client';

import { Users, Play, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] mb-0 pt-28">
      {/* Hero Banner Image */}
      <div className="relative w-full">
        <div className="relative w-full aspect-[1030/400] sm:aspect-[1030/380] md:aspect-[1030/350]">
          <Image
            src="/images/hero-banner.png"
            alt="Prophetic Teaching for Transformation - Overcomers Global Network"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Content Below Banner */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Location Banner */}
          <a
            href="https://maps.app.goo.gl/Utofrj3o6exU12c2A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-amber-200 rounded-2xl px-5 py-3 hover:shadow-md transition-all group"
          >
            <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="text-left">
              <p className="text-gray-900 font-semibold text-sm sm:text-base">Join us at our Main Branch</p>
              <p className="text-gray-500 text-xs sm:text-sm">7519 Mentor Ave, Suite A106, Mentor, OH 44060</p>
            </div>
          </a>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/discipleship"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105"
            >
              <Users size={18} className="sm:w-5 sm:h-5" />
              Join a House Church
            </Link>
            <Link
              href="/watch"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all hover:scale-105"
            >
              <Play size={18} className="sm:w-5 sm:h-5" />
              Watch Now
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 pt-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600">13+</div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium">Nations Reached</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600">75+</div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium">House Churches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600">100+</div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium">Disciples Trained</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
