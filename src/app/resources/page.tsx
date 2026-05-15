'use client';

import { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import {
  BookOpen, Download, FileText, Search, ArrowRight, ShoppingCart, Check,
  Heart, CheckSquare, Square, Package, Loader2, X, Gift,
} from 'lucide-react';
import Link from 'next/link';

// ── Tab types ──
type Tab = 'guides' | 'books';

// ── Teaching Guide data (19 PDFs) ──
interface Guide {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  cover: string;
  pdf: string;
  category: 'faith' | 'healing' | 'relationships' | 'mind' | 'repentance';
}

const guides: Guide[] = [
  { id: 'g01', number: 1, title: 'Why Have You Left Me, Holy Spirit?', subtitle: 'Restoring the presence of God in your life', cover: '/images/guides/01-why-have-you-left-me-holy-spirit.png', pdf: '/pdfs/healing-for-the-homes/01-why-have-you-left-me-holy-spirit.pdf', category: 'faith' },
  { id: 'g02', number: 2, title: 'God, Is It Too Late for Me?', subtitle: 'Finding hope when you feel beyond redemption', cover: '/images/guides/02-god-is-it-too-late-for-me.png', pdf: '/pdfs/healing-for-the-homes/02-god-is-it-too-late-for-me.pdf', category: 'faith' },
  { id: 'g03', number: 3, title: 'Lord, What Is Forgiveness?', subtitle: 'Understanding and extending true forgiveness', cover: '/images/guides/03-lord-what-is-forgiveness.png', pdf: '/pdfs/healing-for-the-homes/03-lord-what-is-forgiveness.pdf', category: 'healing' },
  { id: 'g04', number: 4, title: "God, I'm Locked Down", subtitle: 'Breaking free from spiritual bondage', cover: '/images/guides/04-god-im-locked-down.png', pdf: '/pdfs/healing-for-the-homes/04-god-im-locked-down.pdf', category: 'faith' },
  { id: 'g05', number: 5, title: 'Lord, Anxiety Is Holding Me', subtitle: 'Finding peace in the midst of anxiety', cover: '/images/guides/05-lord-anxiety-is-holding-me.png', pdf: '/pdfs/healing-for-the-homes/05-lord-anxiety-is-holding-me.pdf', category: 'mind' },
  { id: 'g06', number: 6, title: 'God, Why Me?', subtitle: 'Understanding suffering through the lens of faith', cover: '/images/guides/06-god-why-me.png', pdf: '/pdfs/healing-for-the-homes/06-god-why-me.pdf', category: 'faith' },
  { id: 'g07', number: 7, title: 'God, My Betrayal Is Your Celebration', subtitle: 'Turning pain into purpose', cover: '/images/guides/07-god-my-betrayal-is-your-celebration.png', pdf: '/pdfs/healing-for-the-homes/07-god-my-betrayal-is-your-celebration.pdf', category: 'healing' },
  { id: 'g08', number: 8, title: 'Porn Has Held Me From You, God', subtitle: 'Breaking chains of addiction', cover: '/images/guides/08-porn-has-held-me-from-you-god.png', pdf: '/pdfs/healing-for-the-homes/08-porn-has-held-me-from-you-god.pdf', category: 'repentance' },
  { id: 'g09', number: 9, title: 'Lord, My Heart Is Broken', subtitle: 'Healing from heartbreak and loss', cover: '/images/guides/09-lord-my-heart-is-broken.png', pdf: '/pdfs/healing-for-the-homes/09-lord-my-heart-is-broken.pdf', category: 'healing' },
  { id: 'g10', number: 10, title: 'Trusting God After Divorce', subtitle: 'Rebuilding faith after a broken covenant', cover: '/images/guides/10-trusting-god-after-divorce.png', pdf: '/pdfs/healing-for-the-homes/10-trusting-god-after-divorce.pdf', category: 'relationships' },
  { id: 'g11', number: 11, title: 'Men Reject Me, But Lord You Will Take Me In', subtitle: 'Finding acceptance in Christ alone', cover: '/images/guides/11-men-reject-me-but-lord-you-will-take-me-in.png', pdf: '/pdfs/healing-for-the-homes/11-men-reject-me-but-lord-you-will-take-me-in.pdf', category: 'healing' },
  { id: 'g12', number: 12, title: 'Lord, Can I Sin One More Day?', subtitle: 'Confronting habitual sin with grace', cover: '/images/guides/12-lord-can-i-sin-one-more-day.png', pdf: '/pdfs/healing-for-the-homes/12-lord-can-i-sin-one-more-day.pdf', category: 'repentance' },
  { id: 'g13', number: 13, title: 'God, Am I Truly in Right Standing?', subtitle: 'Assurance of righteousness through Christ', cover: '/images/guides/13-god-am-i-truly-in-right-standing.png', pdf: '/pdfs/healing-for-the-homes/13-god-am-i-truly-in-right-standing.pdf', category: 'faith' },
  { id: 'g14', number: 14, title: 'My Spouse Broke Me, God', subtitle: 'Healing from marital wounds', cover: '/images/guides/14-my-spouse-broke-me-god.png', pdf: '/pdfs/healing-for-the-homes/14-my-spouse-broke-me-god.pdf', category: 'relationships' },
  { id: 'g15', number: 15, title: 'Lord, Fix My Mind', subtitle: 'Renewing the mind through the Word', cover: '/images/guides/15-lord-fix-my-mind.png', pdf: '/pdfs/healing-for-the-homes/15-lord-fix-my-mind.pdf', category: 'mind' },
  { id: 'g16', number: 16, title: 'Lord, How Do I Walk With You?', subtitle: 'A guide to daily intimacy with God', cover: '/images/guides/01-lord-how-do-i-walk-with-you.png', pdf: '/pdfs/healing-for-the-homes/01-lord-how-do-i-walk-with-you.pdf', category: 'faith' },
  { id: 'g17', number: 17, title: 'God, I Sinned. Will You Forgive Me?', subtitle: 'Returning to God after failure', cover: '/images/guides/02-god-i-sinned-will-you-forgive-me.png', pdf: '/pdfs/healing-for-the-homes/02-god-i-sinned-will-you-forgive-me.pdf', category: 'repentance' },
  { id: 'g18', number: 18, title: 'Lord, I Blasphemed', subtitle: 'Understanding the unforgivable sin', cover: '/images/guides/03-lord-i-blasphemed.png', pdf: '/pdfs/healing-for-the-homes/03-lord-i-blasphemed.pdf', category: 'repentance' },
  { id: 'g19', number: 19, title: "God, I'm Angry With You", subtitle: 'Processing anger toward God honestly', cover: '/images/guides/04-god-im-angry-with-you.png', pdf: '/pdfs/healing-for-the-homes/04-god-im-angry-with-you.pdf', category: 'faith' },
];

const guideCategories = [
  { key: 'all', label: 'All Guides' },
  { key: 'faith', label: 'Faith & Trust' },
  { key: 'healing', label: 'Healing & Recovery' },
  { key: 'relationships', label: 'Relationships' },
  { key: 'mind', label: 'Mind & Anxiety' },
  { key: 'repentance', label: 'Repentance & Sin' },
];

// ── Books (existing shop items) ──
const books = [
  { id: 1, title: 'Advancing Kingdom Culture', subtitle: 'Guidelines for the Local Assembly', cover: '/images/books/book-1.png', description: 'A comprehensive guide to building Kingdom culture.', author: 'Joshua Matthews', price: 15.99, preOrder: true },
  { id: 2, title: 'Master Your Days, Weeks, Months', subtitle: '2026 Hand-guide to Success', cover: '/images/books/book-2.png', description: 'Practical wisdom for time management and productivity.', author: 'Prophet Joshua Matthews', price: 50.00, preOrder: false },
  { id: 3, title: 'Advancing Kingdom Culture', subtitle: 'Guidelines & Structure for the Local Assembly', cover: '/images/books/book-3.jpg', description: 'Building strong foundations for the local church.', author: 'Prophet Joshua Matthews', price: 15.99, preOrder: true },
  { id: 4, title: 'Exercising Dominion Over Your World', subtitle: 'Through Spiritual Laws and Principles', cover: '/images/books/book-4.png', description: 'Understanding Kingdom authority.', author: 'Joshua Matthews', price: 15.99, preOrder: false },
  { id: 5, title: 'Divine Intimacy', subtitle: 'The Believers Guide to Fellowship With God', cover: '/images/books/book-5.png', description: 'Deepening your relationship with the Father.', author: 'Joshua Matthews', price: 15.99, preOrder: false },
  { id: 6, title: 'The Ultimate Journey With Jesus Christ', subtitle: 'Foundational Teachings Every Believer Needs', cover: '/images/books/book-7.png', description: 'Essential truths for spiritual growth.', author: 'Joshua Matthews', price: 15.99, preOrder: false },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('guides');
  const [selectedGuides, setSelectedGuides] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadingSingle, setDownloadingSingle] = useState<string | null>(null);
  const [showDonation, setShowDonation] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [showCartNotice, setShowCartNotice] = useState(false);

  // ── Filter guides ──
  const filteredGuides = guides.filter(g => {
    if (categoryFilter !== 'all' && g.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return g.title.toLowerCase().includes(q) || g.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  // ── Toggle selection ──
  const toggleGuide = (id: string) => {
    setSelectedGuides(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedGuides.size === filteredGuides.length) {
      setSelectedGuides(new Set());
    } else {
      setSelectedGuides(new Set(filteredGuides.map(g => g.id)));
    }
  };

  // ── Single PDF download ──
  const downloadSingle = async (guide: Guide) => {
    setDownloadingSingle(guide.id);
    try {
      const a = document.createElement('a');
      a.href = guide.pdf;
      a.download = guide.pdf.split('/').pop() || 'guide.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setShowDonation(true);
    } finally {
      setTimeout(() => setDownloadingSingle(null), 500);
    }
  };

  // ── Multi-download as ZIP ──
  const downloadSelected = async () => {
    if (selectedGuides.size === 0) return;
    setDownloading(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      const selected = guides.filter(g => selectedGuides.has(g.id));
      await Promise.all(selected.map(async (guide) => {
        const res = await fetch(guide.pdf);
        const blob = await res.blob();
        const filename = guide.pdf.split('/').pop() || `${guide.id}.pdf`;
        zip.file(filename, blob);
      }));

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `healing-for-the-homes-${selected.length}-guides.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowDonation(true);
    } catch (err) {
      console.error('ZIP download failed:', err);
      alert('Download failed. Please try downloading individually.');
    } finally {
      setDownloading(false);
    }
  };

  // ── Cart functions for books ──
  const addToCart = (resource: typeof books[0]) => {
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

      {/* Donation Modal */}
      {showDonation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowDonation(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowDonation(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Download Has Started!</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                These teaching guides are <strong>100% free</strong> because we believe everyone
                deserves access to tools that bring healing. If this resource blesses you,
                consider sowing a seed to help us reach more homes.
              </p>
              <Link
                href="/give"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold transition-all w-full justify-center mb-3"
              >
                <Gift className="w-5 h-5" />
                Give a Donation
              </Link>
              <button onClick={() => setShowDonation(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Resources
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Equip Yourself for the <span className="gold-shimmer">Journey</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We designed these free tools to <strong>educate</strong>, <strong>equip</strong>,
              and <strong>evolve</strong> people to the fullness of Christ. Download our
              teaching guides, share them with your family, your small group, or anyone who
              needs healing in their home.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-100 sticky top-28 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-6 py-4 font-semibold text-sm border-b-3 transition-all ${
                activeTab === 'guides'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Free Teaching Guides ({guides.length})
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-6 py-4 font-semibold text-sm border-b-3 transition-all ${
                activeTab === 'books'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Books & Shop ({books.length})
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ TEACHING GUIDES TAB ═══════════════ */}
      {activeTab === 'guides' && (
        <>
          {/* Filter bar */}
          <section className="py-4 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {guideCategories.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setCategoryFilter(cat.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        categoryFilter === cat.key
                          ? 'bg-amber-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search guides..."
                    className="w-full md:w-80 pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Multi-select toolbar */}
          <section className="py-3 bg-amber-50 border-b border-amber-100">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={selectAll}
                    className="flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
                  >
                    {selectedGuides.size === filteredGuides.length && filteredGuides.length > 0 ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                    {selectedGuides.size === filteredGuides.length && filteredGuides.length > 0
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                  {selectedGuides.size > 0 && (
                    <span className="text-sm text-amber-600">
                      {selectedGuides.size} selected
                    </span>
                  )}
                </div>
                <button
                  onClick={downloadSelected}
                  disabled={selectedGuides.size === 0 || downloading}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
                >
                  {downloading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating ZIP...</>
                  ) : (
                    <><Package className="w-4 h-4" /> Download Selected as ZIP</>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Guides Grid */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              {/* Series badge */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <Heart className="w-4 h-4" />
                  Healing for the Homes Series &mdash; by Prophet Joshua Matthews
                </span>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredGuides.map(guide => {
                  const isSelected = selectedGuides.has(guide.id);
                  return (
                    <div
                      key={guide.id}
                      className={`group relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                        isSelected ? 'border-amber-500 shadow-amber-100 shadow-lg' : 'border-gray-100'
                      }`}
                    >
                      {/* Selection checkbox */}
                      <button
                        onClick={() => toggleGuide(guide.id)}
                        className={`absolute top-3 left-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-white'
                            : 'bg-white/90 text-gray-400 hover:text-amber-500 border border-gray-200'
                        }`}
                      >
                        {isSelected ? <Check className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </button>

                      {/* Cover */}
                      <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => toggleGuide(guide.id)}>
                        <Image
                          src={guide.cover}
                          alt={guide.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            FREE
                          </span>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                          <span className="text-white/70 text-xs font-medium">#{guide.number}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{guide.subtitle}</p>
                        <button
                          onClick={() => downloadSingle(guide)}
                          disabled={downloadingSingle === guide.id}
                          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-all"
                        >
                          {downloadingSingle === guide.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredGuides.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No guides match your search.</p>
                </div>
              )}
            </div>
          </section>

          {/* Donation CTA */}
          <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
            <div className="container mx-auto px-4 text-center">
              <Heart className="w-10 h-10 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                These Resources Are Free — Forever
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                We believe healing should be accessible to everyone. If these guides have blessed
                your life, your family, or your community, consider sowing a seed so we can continue
                creating tools that transform homes.
              </p>
              <Link
                href="/give"
                className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all"
              >
                <Gift className="w-5 h-5" />
                Support This Ministry
              </Link>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════ BOOKS TAB ═══════════════ */}
      {activeTab === 'books' && (
        <>
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

          {/* CTA */}
          <section className="py-20 bg-amber-500">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Custom Resources?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                We can help create tailored materials for your house church or ministry. Contact us to discuss your needs.
              </p>
              <Link href="/connect" className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
