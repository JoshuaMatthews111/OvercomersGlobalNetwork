'use client';

import { Heart, Globe, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

const impactAreas = [
  {
    icon: Globe,
    title: 'Global Missions',
    description: 'Support church planting and discipleship in unreached nations.',
  },
  {
    icon: Users,
    title: 'Leader Training',
    description: 'Equip house church leaders with resources and mentorship.',
  },
  {
    icon: BookOpen,
    title: 'Resource Development',
    description: 'Create books, courses, and materials for spiritual growth.',
  },
];

export function GiveSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hearts" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 6 C10 4, 8 2, 6 2 C4 2, 2 4, 2 6 C2 10, 10 14, 10 14 C10 14, 18 10, 18 6 C18 4, 16 2, 14 2 C12 2, 10 4, 10 6" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hearts)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Partner With Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Invest in Kingdom Advancement
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Your generosity fuels the mission. Every gift helps train leaders, 
                plant house churches, and spread the Gospel to the nations.
              </p>

              {/* Impact Areas */}
              <div className="space-y-4 mb-8">
                {impactAreas.map((area) => (
                  <div key={area.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <area.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{area.title}</h3>
                      <p className="text-white/80 text-sm">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/give"
                className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl"
              >
                <Heart className="w-5 h-5" />
                Give Now
              </Link>
            </div>

            {/* Right - Giving Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Make a Difference Today
              </h3>

              {/* Amount Options - Direct Stripe Links */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <a href="https://donate.stripe.com/14A3cw6BQ6Ln0Jz4RHco007" className="py-3 px-4 border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold text-gray-700 hover:text-amber-600 transition-all text-center">$25</a>
                <a href="https://donate.stripe.com/bJeeVe8JY9Xz63T1Fvco005" className="py-3 px-4 border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold text-gray-700 hover:text-amber-600 transition-all text-center">$50</a>
                <a href="https://donate.stripe.com/00w9AUf8m7Pr77Xbg5co006" className="py-3 px-4 border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold text-gray-700 hover:text-amber-600 transition-all text-center">$100</a>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <a href="https://donate.stripe.com/dRm6oIgcq2v763Tac1co009" className="py-3 px-4 border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold text-gray-700 hover:text-amber-600 transition-all text-center">$250</a>
                <a href="https://donate.stripe.com/aFadRa6BQ7Pr8c1fwlco00a" className="py-3 px-4 border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold text-gray-700 hover:text-amber-600 transition-all text-center">$500</a>
                <a href="https://donate.stripe.com/6oU5kEgcqglXfEt6ZPco008" className="py-3 px-4 border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 rounded-xl font-bold text-gray-700 hover:text-amber-600 transition-all text-center">$1000</a>
              </div>

              {/* Custom Amount / Tithe & Offering */}
              <a
                href="https://donate.stripe.com/9B64gA2lAfhT63T1Fvco00b"
                className="block w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-center transition-all mb-4"
              >
                Tithe & Offering (Custom Amount)
              </a>

              {/* Give Button */}
              <Link
                href="/give"
                className="block w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 py-3 rounded-xl font-bold text-center transition-all"
              >
                View All Giving Options
              </Link>

              <p className="text-center text-gray-500 text-sm mt-4">
                Secure giving powered by trusted payment providers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
