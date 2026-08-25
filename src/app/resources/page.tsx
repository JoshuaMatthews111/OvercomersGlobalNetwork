'use client';

import { useState, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import {
  BookOpen, Download, FileText, Search, ArrowRight, ShoppingCart, Check,
  Heart, CheckSquare, Square, Package, Loader2, X, Gift, Disc, Play, Music,
} from 'lucide-react';
import Link from 'next/link';

// ── Tab types ──
type Tab = 'guides' | 'books' | 'cds';

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

// ── CD Volumes ──
interface CDTrack {
  number: number;
  title: string;
  file: string;
}

interface CDVolume {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  frontCover: string;
  backCover: string;
  price: number;
  tracks: CDTrack[];
}

const cdVolumes: CDVolume[] = [
  {
    id: 'vol-1',
    title: 'VOLUME I - Secrets of the Mind & The New Creation',
    subtitle: 'Influencing the Natural World from the Supernatural Heart of God',
    description: 'Your mind is a gateway. What you continually behold, believe, and agree with will influence the world you experience.\n\nIn Volume I, Prophet Joshua Matthews takes you on a transformational journey into the mind of Christ, the power of imagination, spiritual perception, faith, proclamation, and the reality of the New Creation. These teachings reveal how your inner world must first come into agreement with what God has spoken before lasting transformation can manifest in your outer world.\n\nYou will learn how to break agreement with limiting patterns of thought, renew your mind through the Word of God, see yourself according to the finished work of Christ, and develop the consciousness of the person you have already become in Him.\n\nThis is more than positive thinking. It is the biblical process of bringing the mind, heart, imagination, words, and faith into alignment with the promises of God.\n\nYour mind is the gateway. What you behold, you will become. Renew it. Align it. Transform your world.',
    frontCover: '/images/cds/volume-1-front.png',
    backCover: '/images/cds/volume-1-back.png',
    price: 50,
    tracks: [
      { number: 1, title: 'The Mystery of the New Creation Man', file: '/audio/cds/volume-1/01 The Mystery of the New Creation Man.mp3' },
      { number: 2, title: 'Your Mind Must Catch Up With Your Spirit', file: '/audio/cds/volume-1/02 Your Mind Must Catch Up With Your Spirit.mp3' },
      { number: 3, title: 'The Organ of Creation Imagination', file: '/audio/cds/volume-1/03 The Organ of Creation Imagination.mp3' },
      { number: 4, title: 'The Gates of the Mind', file: '/audio/cds/volume-1/04 The Gates of the Mind.mp3' },
      { number: 5, title: 'Meditation Releasing Wrong Images', file: '/audio/cds/volume-1/05 Meditation Releasing Wrong Images.mp3' },
      { number: 6, title: 'Structuring Your Mind to Agree With Heaven', file: '/audio/cds/volume-1/06 Structuring Your Mind to Agree With Heaven.mp3' },
      { number: 7, title: 'Thought Emotion Action', file: '/audio/cds/volume-1/07 Thought  Emotion  Action.mp3' },
      { number: 8, title: "The Power of 'I AM'", file: "/audio/cds/volume-1/08 The Power of 'I AM'.mp3" },
      { number: 9, title: 'Full Persuasion', file: '/audio/cds/volume-1/09 Full Persuasion.mp3' },
      { number: 10, title: 'Meditation I AM - New Creation Identity', file: '/audio/cds/volume-1/10 Meditation I AM - New Creation Identity.mp3' },
      { number: 11, title: 'The Image Within', file: '/audio/cds/volume-1/11 The Image Within.mp3' },
      { number: 12, title: 'The Promise Is Greater Than the Picture', file: '/audio/cds/volume-1/12 The Promise Is Greater Than the Picture.mp3' },
      { number: 13, title: 'Refusing to Bow to What You See', file: '/audio/cds/volume-1/13 Refusing to Bow to What You See.mp3' },
      { number: 14, title: 'Making the Word Visible Within', file: '/audio/cds/volume-1/14 Making the Word Visible Within.mp3' },
      { number: 15, title: 'Meditation Healing the Images of People', file: '/audio/cds/volume-1/15 Meditation Healing the Images of People.mp3' },
      { number: 16, title: 'The Heart The Place of Agreement', file: '/audio/cds/volume-1/16 The Heart The Place of Agreement.mp3' },
      { number: 17, title: 'The Inward Journey of Prayer', file: '/audio/cds/volume-1/17 The Inward Journey of Prayer.mp3' },
      { number: 18, title: 'Attracting a Godly Marriage & Relationship', file: '/audio/cds/volume-1/18 Attracting a Godly Marriage & Relationship.mp3' },
      { number: 19, title: 'Meditation Preparing for Covenant Love', file: '/audio/cds/volume-1/19 Meditation Preparing for Covenant Love.mp3' },
    ],
  },
  {
    id: 'vol-2',
    title: 'VOLUME II - Influencing the Natural World',
    subtitle: 'Living from the Supernatural Heart of God',
    description: "God's purpose is not only to transform what is happening inside of you, but to release His nature, wisdom, power, and provision through you into the world around you.\n\nIn Volume II, Prophet Joshua Matthews moves from inner transformation into practical manifestation. These teachings reveal how faith becomes action, how divine promises move from revelation into experience, and how believers can cooperate with the wisdom and direction of God to influence their families, finances, businesses, communities, and environments.\n\nExplore powerful teachings on divine direction, wisdom, giving and honor, supernatural provision, prosperity with purpose, marketplace influence, faith-filled action, and becoming a vessel through whom God can operate in the earth.\n\nYou were not created merely to observe the supernatural. You were created to become a yielded vessel through which heaven influences the natural world.\n\nGod's plan isn't just for you -- it's through you. Influence the natural world from the supernatural heart of God.",
    frontCover: '/images/cds/volume-2-front.png',
    backCover: '/images/cds/volume-2-back.png',
    price: 50,
    tracks: [
      { number: 1, title: 'Faith Has a Voice', file: '/audio/cds/volume-2/01 Faith Has a Voice.mp3' },
      { number: 2, title: 'Action Giving the Inner World Physical Expression', file: '/audio/cds/volume-2/02 Action Giving the Inner World Physical Expression.mp3' },
      { number: 3, title: 'Remaining in Faith Until the Promise Manifests', file: '/audio/cds/volume-2/03 Remaining in Faith Until the Promise Manifests.mp3' },
      { number: 4, title: 'Wisdom for the Promise', file: '/audio/cds/volume-2/04 Wisdom for the Promise.mp3' },
      { number: 5, title: 'Divine Direction & Decision Making', file: '/audio/cds/volume-2/05 Divine Direction & Decision Making.mp3' },
      { number: 6, title: 'Gods Vessels on Earth', file: '/audio/cds/volume-2/06 Gods Vessels on Earth.mp3' },
      { number: 7, title: 'The Mystery of Giving & Honor', file: '/audio/cds/volume-2/07 The Mystery of Giving & Honor.mp3' },
      { number: 8, title: 'Giving & Divine Intervention', file: '/audio/cds/volume-2/08 Giving & Divine Intervention.mp3' },
      { number: 9, title: 'Money Is a Defense', file: '/audio/cds/volume-2/09 Money Is a Defense.mp3' },
      { number: 10, title: 'Developing the Mindset of Provision & Prosperity', file: '/audio/cds/volume-2/10 Developing the Mindset of Provision & Prosperity.mp3' },
      { number: 11, title: 'Meditation Provision & Prosperity', file: '/audio/cds/volume-2/11 Meditation Provision & Prosperity.mp3' },
      { number: 12, title: 'The Mind of Christ in the Marketplace & Natural World', file: '/audio/cds/volume-2/12 The Mind of Christ in the Marketplace & Natural World.mp3' },
      { number: 13, title: 'Living From the Supernatural Heart of God', file: '/audio/cds/volume-2/13 Living From the Supernatural Heart of God.mp3' },
      { number: 14, title: 'Influencing the Natural World From the Supernatural', file: '/audio/cds/volume-2/14 Influencing the Natural World From the Supernatural.mp3' },
      { number: 15, title: 'From Promise to Manifestation', file: '/audio/cds/volume-2/15 From Promise to Manifestation.mp3' },
      { number: 16, title: 'Final Meditation The New Creation Experience', file: '/audio/cds/volume-2/16 Final Meditation The New Creation Experience.mp3' },
    ],
  },
];

const CD_BUNDLE_PRICE = 100;

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
  const [cdPurchased, setCdPurchased] = useState<Set<string>>(new Set());
  const [expandedVolume, setExpandedVolume] = useState<string | null>(null);
  const [downloadingCd, setDownloadingCd] = useState(false);

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
              onClick={() => setActiveTab('cds')}
              className={`px-6 py-4 font-semibold text-sm border-b-3 transition-all ${
                activeTab === 'cds'
                  ? 'border-b-2 border-amber-500 text-amber-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Disc className="w-4 h-4 inline mr-2" />
              Teaching CDs (2 Volumes)
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

      {/* ═══════════════ CDS TAB ═══════════════ */}
      {activeTab === 'cds' && (
        <>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              {/* Bundle CTA */}
              <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center">
                <Disc className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Complete Teaching CD Bundle
                </h2>
                <p className="text-gray-300 text-lg mb-2">
                  Volume I + Volume II (35 Teachings)
                </p>
                <p className="text-amber-400 text-4xl font-bold mb-6">${CD_BUNDLE_PRICE}</p>
                <p className="text-gray-400 text-sm mb-8 max-w-2xl mx-auto">
                  Get both volumes together and save. All tracks are fully downloadable immediately after purchase.
                </p>
                <a
                  href="/give"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Bundle - ${CD_BUNDLE_PRICE}
                </a>
              </div>

              {/* Individual Volumes */}
              {cdVolumes.map(volume => (
                <div key={volume.id} className="max-w-5xl mx-auto mb-16">
                  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
                    {/* Covers Row */}
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative aspect-square">
                        <Image
                          src={volume.frontCover}
                          alt={`${volume.title} - Front Cover`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                          Front Cover
                        </div>
                      </div>
                      <div className="relative aspect-square">
                        <Image
                          src={volume.backCover}
                          alt={`${volume.title} - Back Cover`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                          Back Cover
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-8 md:p-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {volume.title}
                      </h3>
                      <p className="text-amber-600 font-semibold text-lg mb-6">
                        {volume.subtitle}
                      </p>
                      <div className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                        {volume.description}
                      </div>

                      <p className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-1">
                        By Prophet Joshua Matthews
                      </p>
                      <p className="text-amber-600 text-2xl font-bold mb-6">${volume.price}</p>

                      {/* Track List Toggle */}
                      <button
                        onClick={() => setExpandedVolume(expandedVolume === volume.id ? null : volume.id)}
                        className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium mb-4 transition-colors"
                      >
                        <Music className="w-5 h-5" />
                        {expandedVolume === volume.id ? 'Hide' : 'Show'} Track List ({volume.tracks.length} tracks)
                      </button>

                      {expandedVolume === volume.id && (
                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                          <ol className="space-y-2">
                            {volume.tracks.map(track => (
                              <li key={track.number} className="flex items-center gap-3 text-sm">
                                <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {track.number}
                                </span>
                                <span className="text-gray-700">{track.title}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Purchase / Download */}
                      {cdPurchased.has(volume.id) ? (
                        <div>
                          <div className="flex items-center gap-2 text-green-600 font-bold mb-4">
                            <Check className="w-5 h-5" />
                            Purchased - Download Your Tracks
                          </div>
                          <div className="bg-green-50 rounded-2xl p-6 space-y-2">
                            {volume.tracks.map(track => (
                              <a
                                key={track.number}
                                href={track.file}
                                download
                                className="flex items-center gap-3 text-sm text-gray-700 hover:text-amber-600 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors"
                              >
                                <Download className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">{track.number}.</span>
                                <span>{track.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a
                          href="/give"
                          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Purchase Volume - ${volume.price}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info Section */}
          <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 text-center">
              <Disc className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Fully Downloadable Digital Teachings
              </h2>
              <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto">
                All tracks are delivered as high-quality MP3 files. Once purchased, download them instantly to your device. Listen anywhere, anytime - no internet required.
              </p>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                Volume I: 19 Tracks | Volume II: 16 Tracks | Bundle: All 35 Tracks
              </p>
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
