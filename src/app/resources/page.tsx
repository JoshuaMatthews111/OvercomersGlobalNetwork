'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { BookOpen, Download, FileText, Video, Filter, Search, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Books', 'PDFs', 'Teachings', 'Guides', 'Training Kits'];

const resources = [
  {
    id: 1,
    title: 'Advancing Kingdom Culture',
    subtitle: 'Guidelines for the Local Assembly',
    type: 'Book',
    cover: '/images/books/book-1.png',
    description: 'A comprehensive guide to building Kingdom culture.',
    author: 'Joshua Matthews',
    price: 15.99,
    preOrder: true,
  },
  {
    id: 2,
    title: 'Master Your Days, Weeks, Months',
    subtitle: '2026 Hand-guide to Success',
    type: 'Book',
    cover: '/images/books/book-2.png',
    description: 'Practical wisdom for time management and productivity.',
    author: 'Prophet Joshua Matthews',
    price: 15.99,
    preOrder: false,
  },
  {
    id: 3,
    title: 'Advancing Kingdom Culture',
    subtitle: 'Guidelines & Structure for the Local Assembly',
    type: 'Book',
    cover: '/images/books/book-3.jpg',
    description: 'Building strong foundations for the local church.',
    author: 'Prophet Joshua Matthews',
    price: 15.99,
    preOrder: true,
  },
  {
    id: 4,
    title: 'Exercising Dominion Over Your World',
    subtitle: 'Through Spiritual Laws and Principles',
    type: 'Book',
    cover: '/images/books/book-4.png',
    description: 'Understanding Kingdom authority.',
    author: 'Joshua Matthews',
    price: 15.99,
    preOrder: false,
  },
  {
    id: 5,
    title: 'Divine Intimacy',
    subtitle: 'The Believers Guide to Fellowship With God',
    type: 'Book',
    cover: '/images/books/book-5.png',
    description: 'Deepening your relationship with the Father.',
    author: 'Joshua Matthews',
    price: 15.99,
    preOrder: false,
  },
  {
    id: 6,
    title: 'The Ultimate Journey With Jesus Christ',
    subtitle: 'Foundational Teachings Every Believer Needs',
    type: 'Book',
    cover: '/images/books/book-7.png',
    description: 'Essential truths for spiritual growth.',
    author: 'Joshua Matthews',
    price: 15.99,
    preOrder: false,
  },
];

const downloads = [
  {
    title: 'House Church Starter Kit',
    description: 'Everything you need to launch your first gathering.',
    icon: FileText,
    size: '2.5 MB',
  },
  {
    title: 'Weekly Study Guides',
    description: 'Downloadable guides for group Bible study.',
    icon: BookOpen,
    size: '1.2 MB',
  },
  {
    title: 'Leader Training Videos',
    description: 'Video series for house church leaders.',
    icon: Video,
    size: 'Streaming',
  },
  {
    title: 'Discipleship Curriculum',
    description: '12-week discipleship program materials.',
    icon: FileText,
    size: '4.8 MB',
  },
];

export default function ResourcesPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [showCartNotice, setShowCartNotice] = useState(false);

  const addToCart = (resource: typeof resources[0]) => {
    const existingCart = JSON.parse(localStorage.getItem('ogn-cart') || '[]');
    const exists = existingCart.find((item: any) => item.id === resource.id);
    
    if (!exists) {
      const cartItem = {
        id: resource.id,
        title: resource.title,
        subtitle: resource.subtitle,
        price: resource.price,
        cover: resource.cover,
        quantity: 1,
      };
      existingCart.push(cartItem);
      localStorage.setItem('ogn-cart', JSON.stringify(existingCart));
      setCart([...cart, resource.id]);
      setShowCartNotice(true);
      setTimeout(() => setShowCartNotice(false), 3000);
    }
  };

  const isInCart = (id: number) => {
    if (typeof window === 'undefined') return false;
    const existingCart = JSON.parse(localStorage.getItem('ogn-cart') || '[]');
    return existingCart.some((item: any) => item.id === id);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Cart Notice */}
      {showCartNotice && (
        <div className="fixed top-32 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5" />
          Item added to cart!
          <Link href="/checkout" className="ml-2 underline font-medium">View Cart</Link>
        </div>
      )}

      {/* Floating Cart Button */}
      <Link
        href="/checkout"
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Equip Yourself for the <span className="gold-shimmer">Journey</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Books, guides, training materials, and downloadable resources to help you 
              grow as a disciple and disciple-maker.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === 'All'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full md:w-80 pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={resource.cover}
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  {resource.preOrder && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Pre-Order
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-amber-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {resource.description}
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    By {resource.author}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    ${resource.price.toFixed(2)}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(resource)}
                      disabled={isInCart(resource.id)}
                      className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                        isInCart(resource.id)
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {isInCart(resource.id) ? (
                        <><Check className="w-4 h-4" /> Added to Cart</>
                      ) : (
                        <><ShoppingCart className="w-4 h-4" /> {resource.preOrder ? 'Pre-Order' : 'Add to Cart'}</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Free Downloads
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Training Materials & Guides
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Access free resources to equip yourself and your house church community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {downloads.map((download) => (
              <div
                key={download.title}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <download.icon className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{download.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{download.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{download.size}</span>
                  <Download className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Custom Resources?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We can help create tailored materials for your house church or ministry. 
            Contact us to discuss your needs.
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
