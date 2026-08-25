'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen, Download, ShoppingCart, Check, Disc, Music,
  ArrowRight, Search, Heart, Gift, X, Package,
} from 'lucide-react';

// ── Tab types ──
type Tab = 'cds' | 'books' | 'guides';

// ── Books ──
const defaultBooks = [
  { id: 1, title: 'Advancing Kingdom Culture', subtitle: 'Guidelines for the Local Assembly', cover: '/images/books/book-1.png', description: 'A comprehensive guide to building Kingdom culture.', author: 'Joshua Matthews', price: 15.99, preOrder: true },
  { id: 2, title: 'Master Your Days, Weeks, Months', subtitle: '2026 Hand-guide to Success', cover: '/images/books/book-2.png', description: 'Practical wisdom for time management and productivity.', author: 'Prophet Joshua Matthews', price: 50.00, preOrder: false },
  { id: 3, title: 'Advancing Kingdom Culture', subtitle: 'Guidelines & Structure for the Local Assembly', cover: '/images/books/book-3.jpg', description: 'Building strong foundations for the local church.', author: 'Prophet Joshua Matthews', price: 15.99, preOrder: true },
  { id: 4, title: 'Exercising Dominion Over Your World', subtitle: 'Through Spiritual Laws and Principles', cover: '/images/books/book-4.png', description: 'Understanding Kingdom authority.', author: 'Joshua Matthews', price: 15.99, preOrder: false },
  { id: 5, title: 'Divine Intimacy', subtitle: 'The Believers Guide to Fellowship With God', cover: '/images/books/book-5.png', description: 'Deepening your relationship with the Father.', author: 'Joshua Matthews', price: 15.99, preOrder: false },
  { id: 6, title: 'The Ultimate Journey With Jesus Christ', subtitle: 'Foundational Teachings Every Believer Needs', cover: '/images/books/book-7.png', description: 'Essential truths for spiritual growth.', author: 'Joshua Matthews', price: 15.99, preOrder: false },
];

export default function StorePage() {
  const [activeTab, setActiveTab] = useState<Tab>('cds');
  const [cart, setCart] = useState<number[]>([]);
  const [showCartNotice, setShowCartNotice] = useState(false);
  const [books, setBooks] = useState(defaultBooks);
  const [expandedVolume, setExpandedVolume] = useState<string | null>(null);

  useEffect(() => {
    // Load admin-managed products from Firebase if available
    try {
      const stored = localStorage.getItem('ogn-store-books');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setBooks(parsed);
      }
    } catch { /* use defaults */ }
  }, []);

  // ── Cart functions for books ──
  const addToCart = (resource: typeof defaultBooks[0]) => {
    const existingCart = JSON.parse(localStorage.getItem('ogn-cart') || '[]');
    const exists = existingCart.find((item: any) => item.id === resource.id);
    if (!exists) {
      existingCart.push({ id: resource.id, title: resource.title, subtitle: resource.subtitle, price: resource.price, cover: resource.cover, quantity: 1 });
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

  const VOLUMES = [
    {
      id: 'vol-1',
      number: 'VOLUME I',
      title: 'Secrets of the Mind & The New Creation',
      subtitle: 'Influencing the Natural World from the Supernatural Heart of God',
      front: '/images/cds/volume-1-front.png',
      back: '/images/cds/volume-1-back.png',
      price: 50,
      tracks: 19,
      duration: '2h 39m',
      highlights: [
        'The Mystery of the New Creation Man',
        'Your Mind Must Catch Up With Your Spirit',
        'The Organ of Creation Imagination',
        'The Power of "I AM"',
        'Refusing to Bow to What You See',
        'The Inward Journey of Prayer',
        'Attracting a Godly Marriage & Relationship',
      ],
    },
    {
      id: 'vol-2',
      number: 'VOLUME II',
      title: 'Influencing the Natural World',
      subtitle: 'Living from the Supernatural Heart of God',
      front: '/images/cds/volume-2-front.png',
      back: '/images/cds/volume-2-back.png',
      price: 50,
      tracks: 16,
      duration: '1h 56m',
      highlights: [
        'Faith Has a Voice',
        'Remaining in Faith Until the Promise Manifests',
        'The Mystery of Giving & Honor',
        'Money Is a Defense',
        'The Mind of Christ in the Marketplace',
        'From Promise to Manifestation',
      ],
    },
  ];

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

      {/* Floating Cart */}
      <Link href="/checkout" className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110">
        <ShoppingCart className="w-6 h-6" />
      </Link>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
              OGN Store
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
              Teaching CDs, Books & <span className="gold-shimmer">Free Resources</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Everything you need for your journey -- audio teachings, books, and free teaching guides by Prophet Joshua Matthews.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-100 sticky top-28 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('cds')}
              className={`px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'cds'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Disc className="w-4 h-4 inline mr-2" />
              Teaching CDs
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'books'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Books ({books.length})
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'guides'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Gift className="w-4 h-4 inline mr-2" />
              Free Guides
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ CDS TAB ═══════════════ */}
      {activeTab === 'cds' && (
        <>
          {/* Bundle */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center">
                <Disc className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Complete Teaching CD Bundle
                </h2>
                <p className="text-gray-300 text-lg mb-2">
                  Volume I + Volume II (35 Teachings)
                </p>
                <p className="text-amber-400 text-4xl font-bold mb-6">$100</p>
                <p className="text-gray-400 text-sm mb-8 max-w-2xl mx-auto">
                  Get both volumes together and save. All tracks are fully downloadable immediately after purchase.
                </p>
                <Link
                  href="/cds"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Bundle - $100
                </Link>
              </div>

              {/* Individual Volumes */}
              {VOLUMES.map(volume => (
                <div key={volume.id} className="max-w-5xl mx-auto mb-16">
                  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
                    {/* Covers */}
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative aspect-square">
                        <Image src={volume.front} alt={`${volume.number} Front Cover`} fill className="object-cover" />
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">Front Cover</div>
                      </div>
                      <div className="relative aspect-square">
                        <Image src={volume.back} alt={`${volume.number} Back Cover`} fill className="object-cover" />
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">Back Cover</div>
                      </div>
                    </div>

                    <div className="p-8 md:p-10">
                      <p className="text-amber-600 tracking-wider text-xs uppercase font-bold mb-2">{volume.number}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{volume.title}</h3>
                      <p className="text-gray-500 font-medium text-lg mb-4">{volume.subtitle}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                        <span>{volume.tracks} tracks</span>
                        <span>{volume.duration}</span>
                        <span>320 kbps MP3</span>
                      </div>

                      {/* Highlights */}
                      <button
                        onClick={() => setExpandedVolume(expandedVolume === volume.id ? null : volume.id)}
                        className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-4 transition-colors"
                      >
                        <Music className="w-5 h-5" />
                        {expandedVolume === volume.id ? 'Hide' : 'Show'} Key Teachings
                      </button>

                      {expandedVolume === volume.id && (
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                          <ul className="space-y-2">
                            {volume.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="text-amber-500 mt-0.5">&#9656;</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <span className="text-amber-600 text-2xl font-bold">${volume.price}</span>
                        <Link
                          href="/cds"
                          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Purchase Volume - ${volume.price}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ═══════════════ BOOKS TAB ═══════════════ */}
      {activeTab === 'books' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map(resource => (
                <div key={resource.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={resource.cover} alt={resource.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">Book</span>
                    </div>
                    {resource.preOrder && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">Pre-Order</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-amber-600 transition-colors">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                    <p className="text-gray-400 text-sm mb-2">By {resource.author}</p>
                    <p className="text-xl font-bold text-gray-900 mb-4">${resource.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(resource)}
                      disabled={isInCart(resource.id)}
                      className={`flex-1 w-full py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ FREE GUIDES TAB ═══════════════ */}
      {activeTab === 'guides' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <Heart className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Teaching Guides</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Our Healing for the Homes series -- 19 free teaching guides available for download. Visit the full resources page for search, filter, and multi-download.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              <Package className="w-5 h-5" />
              Go to Free Resources
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
