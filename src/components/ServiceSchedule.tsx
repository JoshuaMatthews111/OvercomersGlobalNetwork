'use client';

import { Calendar, Clock, MapPin, TrendingUp, BookOpen, ChartBar, Trophy, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    day: 'Tuesday',
    title: 'Financial and Personal Wellness Class',
    time: '6:30 PM EST',
    icon: 'trending-up',
    color: 'emerald',
    gradient: 'from-emerald-400 to-emerald-600',
  },
  {
    day: 'Wednesday',
    title: 'Bible Study',
    time: '6:00 PM EST',
    icon: 'book-open',
    color: 'blue',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    day: 'Thursday',
    title: 'Financial Class',
    time: '8:00 PM EST',
    icon: 'chart-bar',
    color: 'purple',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    day: 'Friday',
    title: 'Weekly Gathering – Gathering of Champions',
    time: '2:00 PM EST',
    icon: 'trophy',
    color: 'amber',
    gradient: 'from-amber-400 to-amber-600',
  },
];

export function ServiceSchedule() {
  return (
    <section className="py-24 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Schedule */}
          <div>
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
              Weekly Service Schedule
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join us throughout the week for worship, study, and fellowship. 
              All are welcome to attend in person or online.
            </p>

            {/* Schedule Grid */}
            <div className="space-y-4">
              {services.map((service) => {
                const iconMap = {
                  'trending-up': TrendingUp,
                  'book-open': BookOpen,
                  'chart-bar': ChartBar,
                  'trophy': Trophy,
                };
                const IconComponent = iconMap[service.icon as keyof typeof iconMap];

                if (!IconComponent) return null;

                return (
                  <a
                    key={service.day}
                    href={`/services/${service.day.toLowerCase()}`}
                    className="group bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-3 sm:gap-4 hover:-translate-y-1 cursor-pointer border border-gray-100 hover:border-gray-200 w-full"
                  >
                    {/* Icon Container */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-${service.color}-600 font-bold text-sm uppercase tracking-wide`}>
                          {service.day}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate group-hover:text-gray-700 transition-colors">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <Clock className="w-4 h-4" />
                        {service.time}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Location */}
            <div className="mt-8 bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">
                    7519 Mentor Ave, Unit A106<br />
                    Mentor, OH 44060
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/Utofrj3o6exU12c2A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm mt-2"
                  >
                    Get Directions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Ministry Images */}
          <div className="relative overflow-x-hidden">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/ministry/ministry-4.jpg"
                    alt="OGN Community"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/ministry/ministry-1.jpg"
                    alt="OGN Outreach"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/ministry/ministry-5.jpg"
                    alt="OGN Worship"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/ministry/ministry-6.jpg"
                    alt="OGN Fellowship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-2 sm:-bottom-4 sm:-left-4 bg-white rounded-2xl shadow-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm sm:text-base">Join Us Weekly</p>
                <p className="text-gray-500 text-xs sm:text-sm">In-Person & Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
