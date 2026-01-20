'use client';

import { useState, useEffect } from 'react';
import { Play, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-900 mb-0">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/MJhFu-xDZm8?autoplay=1&mute=1&loop=1&playlist=MJhFu-xDZm8&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
            title="OGN Background Video"
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ 
              top: '55%',
              transform: 'translate(-50%, -40%)',
              width: '177.78vh',
              height: '100vh',
              minWidth: '100%',
              minHeight: '56.25vw'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-x-0 top-0 h-[95%] bg-gradient-to-r from-black/60 via-transparent to-black-60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 min-h-screen flex items-center relative z-10 pt-20">
        <div className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 animate-fadeIn">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">
              A Global Discipleship Network
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] animate-fadeInUp delay-100">
            <span className="shimmer-text-light">From Home to Home</span>
            <br />
            <span className="text-white">Across the Nations</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/80 text-lg md:text-xl leading-relaxed animate-fadeInUp delay-200 max-w-2xl">
            Overcomers Global Network is a movement of believers gathering in homes, 
            making disciples, and advancing God's Kingdom — one house church at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
            <Link
              href="/discipleship"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105"
            >
              <Users size={20} />
              Join a House Church
            </Link>
            <Link
              href="/watch"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
            >
              <Play size={20} />
              Watch Now
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 pt-1 animate-fadeIn delay-400 relative z-20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">50+</div>
              <div className="text-white text-base font-bold">Nations Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">200+</div>
              <div className="text-white text-base font-bold">House Churches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">5,000+</div>
              <div className="text-white text-base font-bold">Disciples Trained</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
