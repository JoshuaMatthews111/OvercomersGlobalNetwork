'use client';

import { Globe, Users, MapPin, Award } from 'lucide-react';

const stats = [
  { icon: Globe, value: '13+', label: 'Nations Reached' },
  { icon: MapPin, value: '75+', label: 'House Churches' },
  { icon: Users, value: '100+', label: 'Disciples Trained' },
  { icon: Award, value: '100+', label: 'Leaders Raised' },
];

export function GlobalNetwork() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="globe-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="250" r="200" fill="url(#globe-gradient)" />
          {/* Simplified world map dots */}
          <g fill="#f59e0b" opacity="0.5">
            {/* North America */}
            <circle cx="200" cy="150" r="3" />
            <circle cx="220" cy="160" r="2" />
            <circle cx="180" cy="170" r="2" />
            <circle cx="250" cy="180" r="3" />
            {/* South America */}
            <circle cx="280" cy="300" r="3" />
            <circle cx="300" cy="320" r="2" />
            <circle cx="270" cy="350" r="2" />
            {/* Europe */}
            <circle cx="480" cy="140" r="3" />
            <circle cx="500" cy="150" r="2" />
            <circle cx="520" cy="130" r="2" />
            {/* Africa */}
            <circle cx="500" cy="250" r="4" />
            <circle cx="520" cy="280" r="3" />
            <circle cx="480" cy="300" r="2" />
            <circle cx="540" cy="260" r="2" />
            {/* Asia */}
            <circle cx="650" cy="180" r="3" />
            <circle cx="700" cy="200" r="2" />
            <circle cx="750" cy="220" r="3" />
            <circle cx="680" cy="250" r="2" />
            {/* Australia */}
            <circle cx="800" cy="350" r="3" />
            <circle cx="820" cy="360" r="2" />
          </g>
          {/* Connection lines */}
          <g stroke="#f59e0b" strokeWidth="0.5" opacity="0.3">
            <line x1="200" y1="150" x2="480" y2="140" />
            <line x1="480" y1="140" x2="500" y2="250" />
            <line x1="500" y1="250" x2="650" y2="180" />
            <line x1="650" y1="180" x2="800" y2="350" />
            <line x1="280" y1="300" x2="500" y2="250" />
          </g>
        </svg>
      </div>

      {/* Animated Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
            Global Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
            One Network, <span className="shimmer-text-light">Many Nations</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            From living rooms in Africa to apartments in Asia, from homes in Europe to 
            gatherings in the Americas — we are one family, one mission, one Kingdom.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-amber-500/20 rounded-xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                <stat.icon className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Be part of what God is doing across the nations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/discipleship"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-amber-500/20"
            >
              Find a House Church
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Learn Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
