'use client';

import { useState, useEffect } from 'react';
import { Play, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      headline: "Overcomers Global Network is a movement of believers gathering in local assemblies and homes, making disciples, and advancing God's Kingdom—one person at a time.",
      isScripture: false
    },
    {
      headline: "And Jesus came and spake unto them, saying,\nAll power is given unto me in heaven and in earth.\nGo ye therefore, and teach all nations.",
      isScripture: true,
      reference: "Matthew 28:18–19 (KJV)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds transition

    return () => clearInterval(interval);
  }, [slides.length]);

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fadeInUp delay-100">
            <span className="shimmer-text-light">From Home to Home</span>
            <br />
            <span className="text-white">Across the Nations</span>
          </h1>

          {/* Sliding Text Content */}
          <div className="relative h-48 sm:h-40 md:h-32 overflow-hidden">
            <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-y-4'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="space-y-2">
                    <p 
                      className={`text-white/80 leading-relaxed max-w-4xl ${
                        slide.isScripture 
                          ? 'text-sm sm:text-base md:text-lg lg:text-xl italic font-light' 
                          : 'text-sm sm:text-base md:text-lg lg:text-xl font-normal'
                      }`}
                    >
                      {slide.headline.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < slide.headline.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    {slide.isScripture && (
                      <p className="text-amber-400 text-xs sm:text-sm md:text-base lg:text-lg not-italic font-medium">
                        — {slide.reference}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2 animate-fadeInUp delay-250">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-amber-400 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fadeInUp delay-300">
            <Link
              href="/discipleship"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105"
            >
              <Users size={18} className="sm:w-5 sm:h-5" />
              Join a House Church
            </Link>
            <Link
              href="/watch"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all hover:scale-105"
            >
              <Play size={18} className="sm:w-5 sm:h-5" />
              Watch Now
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 pt-1 animate-fadeIn delay-400 relative z-20">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400">50+</div>
              <div className="text-white text-xs sm:text-sm md:text-base font-bold">Nations Reached</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400">200+</div>
              <div className="text-white text-xs sm:text-sm md:text-base font-bold">House Churches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400">5,000+</div>
              <div className="text-white text-xs sm:text-sm md:text-base font-bold">Disciples Trained</div>
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
