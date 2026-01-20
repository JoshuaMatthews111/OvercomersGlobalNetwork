'use client';

import { useState } from 'react';
import { Users, Home, TrendingUp, Heart, Share2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Connect',
    description: 'Find a house church near you or join our online community. We welcome everyone seeking authentic faith.',
  },
  {
    number: '02',
    icon: Home,
    title: 'Gather',
    description: 'Experience intimate worship and fellowship in homes, just like the early church in Acts.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Grow',
    description: 'Engage in discipleship, study the Word, and develop your spiritual gifts through mentorship.',
  },
  {
    number: '04',
    icon: Heart,
    title: 'Serve',
    description: 'Discover your calling and use your gifts to serve others in your community and beyond.',
  },
  {
    number: '05',
    icon: Share2,
    title: 'Multiply',
    description: 'Become a disciple-maker and help start new house churches, expanding God\'s Kingdom.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
            Our Model
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
            How <span className="gold-shimmer">Overcomers</span> Works
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Following the pattern of the early church, we gather from home to home, 
            making disciples who make disciples across the nations.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative group"
              >
                {/* Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 text-center h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mt-4 mb-4 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <step.icon className="w-8 h-8 text-amber-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/discipleship"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl"
          >
            Start Your Journey
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
