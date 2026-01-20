'use client';

import { BookOpen, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const books = [
  {
    title: 'The Overcomer\'s Guide',
    author: 'OGN Leadership',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    category: 'Discipleship',
  },
  {
    title: 'House Church Essentials',
    author: 'OGN Leadership',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    category: 'Leadership',
  },
  {
    title: 'Kingdom Advancement',
    author: 'OGN Leadership',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    category: 'Teaching',
  },
  {
    title: 'Prayer & Intercession',
    author: 'OGN Leadership',
    cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=400&fit=crop',
    category: 'Spiritual Growth',
  },
];

export function ResourcesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Equip Yourself for the Journey
            </h2>
            <p className="text-gray-600 text-lg mt-3 max-w-xl">
              Books, guides, and training materials to help you grow as a disciple and disciple-maker.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors whitespace-nowrap"
          >
            Browse Library
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <Link
              key={book.title}
              href="/resources"
              className="group"
            >
              {/* Book Cover */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    View Details
                  </span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                {book.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {book.author}
              </p>
            </Link>
          ))}
        </div>

        {/* Additional Resources CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Free Training Materials
              </h3>
              <p className="text-gray-600 mt-1">
                Download guides, study materials, and leadership resources.
              </p>
            </div>
          </div>
          <Link
            href="/resources#downloads"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap"
          >
            Access Downloads
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
