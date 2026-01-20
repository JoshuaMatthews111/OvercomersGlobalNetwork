'use client';

import Image from 'next/image';

export function LiveWorshipSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Circular Image */}
          <div className="relative scroll-reveal">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Outer cyan ring */}
              <div className="absolute inset-0 rounded-full border-8 border-cyan-500/30" />

              {/* Middle white ring */}
              <div className="absolute inset-4 rounded-full border-8 border-white" />

              {/* Inner dark ring */}
              <div className="absolute inset-8 rounded-full border-8 border-[#1a1d29]" />

              {/* Image container with gradient background */}
              <div className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
                <Image
                  src="https://ugc.same-assets.com/vWI9cceLkD25F7O0OrE1V0pgZZcPNeSu.png"
                  alt="Prophet Joshua Matthews"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 scroll-reveal">
            <div>
              <span className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
                <span className="gold-shimmer">Live Worship</span>
              </span>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="text-gray-900">JOIN US LIVE<br /></span>
                <span className="shimmer-text">
                  EVERY SUNDAY!
                </span>
              </h2>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              Experience inspiring worship and a powerful message from{' '}
              <span className="gold-shimmer font-semibold">Prophet Joshua Matthews</span>
              {' '}and our team—right from your home.
            </p>

            <a
              href="#services"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-md text-lg font-medium transition-all hover:scale-105 shadow-lg"
            >
              <span>▶</span>
              Watch Live! Sundays at 11:00 AM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
