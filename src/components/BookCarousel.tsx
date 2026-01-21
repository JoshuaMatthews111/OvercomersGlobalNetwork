'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const books = [
  {
    id: 1,
    title: 'Advancing Kingdom Culture',
    subtitle: 'Guidelines For the Local Assembly',
    author: 'Joshua Matthews',
    cover: '/images/books/book-1.png',
    price: '$15.99',
    preOrder: true,
  },
  {
    id: 2,
    title: 'Master Your Days, Weeks, Months',
    subtitle: '2026 Hand-guide to Success',
    author: 'Prophet Joshua Matthews',
    cover: '/images/books/book-2.png',
    price: '$50.00',
    preOrder: false,
  },
  {
    id: 3,
    title: 'Advancing Kingdom Culture',
    subtitle: 'Guidelines & Structure for the Local Assembly',
    author: 'Prophet Joshua Matthews',
    cover: '/images/books/book-3.jpg',
    price: '$15.99',
    preOrder: true,
  },
  {
    id: 4,
    title: 'Exercising Dominion Over Your World',
    subtitle: 'Through Spiritual Laws and Principles',
    author: 'Joshua Matthews',
    cover: '/images/books/book-4.png',
    price: '$15.99',
    preOrder: false,
  },
  {
    id: 5,
    title: 'Divine Intimacy',
    subtitle: 'The Believers Guide to Fellowship With God',
    author: 'Joshua Matthews',
    cover: '/images/books/book-5.png',
    price: '$15.99',
    preOrder: false,
  },
  {
    id: 6,
    title: 'Exercising Dominion Over Your World',
    subtitle: 'Through Spiritual Laws and Principles',
    author: 'Joshua Matthews',
    cover: '/images/books/book-6.png',
    price: '$15.99',
    preOrder: false,
  },
  {
    id: 7,
    title: 'The Ultimate Journey With Jesus Christ',
    subtitle: 'Foundational Teachings Every Believer Needs',
    author: 'Joshua Matthews',
    cover: '/images/books/book-7.png',
    price: '$15.99',
    preOrder: false,
  },
];

export function BookCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleBooks, setVisibleBooks] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleBooks(1);
      } else if (window.innerWidth < 768) {
        setVisibleBooks(2);
      } else if (window.innerWidth < 1024) {
        setVisibleBooks(3);
      } else {
        setVisibleBooks(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleBooks >= books.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, books.length - visibleBooks) : prev - 1
    );
  };

  const displayedBooks = books.slice(currentIndex, currentIndex + visibleBooks);
  
  // If we need more books to fill the display, wrap around
  const wrappedBooks = displayedBooks.length < visibleBooks 
    ? [...displayedBooks, ...books.slice(0, visibleBooks - displayedBooks.length)]
    : displayedBooks;

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
              Books by <span className="gold-shimmer">Prophet Joshua Matthews</span>
            </h2>
            <p className="text-gray-600 text-lg mt-3 max-w-xl">
              Equip yourself with powerful teachings for spiritual growth and Kingdom advancement.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors whitespace-nowrap"
          >
            View All Books
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors border border-gray-100"
            aria-label="Previous books"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-amber-50 transition-colors border border-gray-100"
            aria-label="Next books"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {wrappedBooks.map((book, index) => (
              <Link
                key={`${book.id}-${index}`}
                href="/resources"
                className="group"
              >
                {/* Book Cover */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4 bg-gray-100">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Book Info */}
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 text-sm md:text-base">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-1">
                  {book.subtitle}
                </p>
                <p className="text-amber-600 text-xs md:text-sm mt-1 font-medium">
                  {book.author}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-900 font-bold text-sm md:text-base">{book.price}</span>
                  {book.preOrder && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Pre-Order
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(books.length / visibleBooks) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleBooks)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / visibleBooks) === index
                  ? 'w-8 bg-amber-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
