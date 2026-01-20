'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, Globe, Heart } from 'lucide-react';

export function AboutProphet() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Prophet Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/prophet-joshua-matthews.jpg"
                  alt="Prophet Joshua Matthews"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Ministry Images */}
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://media.npr.org/assets/img/2015/02/22/house-church-2-c3c2d96e9dce562ce03936a9534768bf919eebf5.jpg"
                  alt="House Church Gathering"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://www.gainesville.com/gcdn/authoring/2010/07/24/NTGS/ghows-LK-c8045ea3-c2b2-461e-9d82-41ab054ee2ed-658334eb.jpeg"
                  alt="Community Worship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white rounded-2xl p-6 shadow-xl">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Nations Reached</div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Meet Our Leaders
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Prophet <span className="hover:gold-shimmer transition-all duration-300">Joshua Matthews</span>
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                Prophet Joshua Matthews and his wife Grace Matthews are the founders and visionary leaders of <strong>Overcomers Global Network</strong>, 
                a global discipleship movement committed to raising mature believers who walk in freedom, 
                spiritual authority, and authentic relationship with God.
              </p>
              <p>
                Prophet Joshua carries a clear mandate to <strong>establish local assemblies</strong> while also 
                building a <strong>home-to-home discipleship network</strong>, ensuring believers are not only 
                connected online but rooted in real spiritual family and community.
              </p>
              <p>
                A central focus of his ministry is <strong>helping believers break free from the bondage of 
                religion and tradition</strong>, leading them into truth, liberty, and genuine fellowship with God. 
                His teaching emphasizes identity in Christ, spiritual maturity, and living by the Spirit rather 
                than by ritual, performance, or inherited religious systems.
              </p>
            </div>

            {/* Ministry Focus Areas */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-gray-700 font-medium">Author & Teacher</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-gray-700 font-medium">Discipleship Leader</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-gray-700 font-medium">Global Network Builder</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-gray-700 font-medium">Prophetic Ministry</span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Learn More About Our Vision
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
