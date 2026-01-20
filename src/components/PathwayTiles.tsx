'use client';

import { Users, BookOpen, Play, Heart, MessageCircle, Gift } from 'lucide-react';
import Link from 'next/link';

const pathways = [
  {
    icon: Users,
    title: 'Join a House Church',
    description: 'Connect with believers in your area through intimate home gatherings.',
    href: '/discipleship',
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-600',
  },
  {
    icon: BookOpen,
    title: 'Start Discipleship',
    description: 'Begin your journey of spiritual growth and transformation.',
    href: '/discipleship#start',
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
  },
  {
    icon: Play,
    title: 'Watch Messages',
    description: 'Access powerful teachings and sermons from our global network.',
    href: '/watch',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    icon: Gift,
    title: 'Get Resources',
    description: 'Explore books, guides, and training materials for your growth.',
    href: '/resources',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
  },
  {
    icon: Heart,
    title: 'Prayer & Support',
    description: 'Submit prayer requests and receive spiritual support.',
    href: '/connect#prayer',
    color: 'bg-rose-500',
    hoverColor: 'hover:bg-rose-600',
  },
  {
    icon: MessageCircle,
    title: 'Connect With Us',
    description: 'Reach out to learn more about our global community.',
    href: '/connect',
    color: 'bg-cyan-500',
    hoverColor: 'hover:bg-cyan-600',
  },
];

export function PathwayTiles() {
  return (
    <section className="py-2 -mt-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-24">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Your Next Step Starts Here
          </h2>
          <p className="text-gray-600 text-lg">
            Whether you're exploring faith, seeking community, or ready to grow deeper — 
            there's a place for you in our global family.
          </p>
        </div>

        {/* Pathway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathways.map((pathway, index) => (
            <Link
              key={pathway.title}
              href={pathway.href}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${pathway.color} ${pathway.hoverColor} rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:scale-110 duration-300`}>
                <pathway.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {pathway.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pathway.description}
              </p>

              {/* Arrow indicator */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
