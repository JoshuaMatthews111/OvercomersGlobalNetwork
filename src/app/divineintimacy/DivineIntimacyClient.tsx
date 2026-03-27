'use client';

import './divineintimacy.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import {
  BookOpen, Download, Globe, Mail, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, Check, Star, Quote, Play, X
} from 'lucide-react';

/* ─── CDN Assets ─── */
const CDN = {
  bookCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/divine-intimacy-cover-2_e23ed17b.png",
  authorPhoto: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/author_original_portrait_625c294d.webp",
  ministryLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ministry-logo_3eb6c31c.png",
  edenVideo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/return_to_eden_af642579.mp4",
  edenGardenBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/eden_01_garden_1e4a1346.png",
  edenGardenBg2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/eden_07_text_d78e4b14.png",
};

/* ─── Data ─── */
const TESTIMONIALS = [
  { name: "Grace Okonkwo", location: "Lagos, Nigeria", flag: "🇳🇬", text: "This book broke something open inside of me. I have read many books on prayer and worship, but Divine Intimacy took me to a place I had only dreamed of. I wept through the first three chapters because it felt like God Himself was speaking directly to my heart.", rating: 5 },
  { name: "Michael Thompson", location: "Columbus, Ohio, USA", flag: "🇺🇸", text: "I have been in ministry for over twenty years, and I thought I knew what fellowship with God looked like. Prophet Joshua's book showed me I had barely scratched the surface. The chapter on the secret place of communion completely transformed my morning devotions.", rating: 5 },
  { name: "Patricia Williams", location: "Baltimore, Maryland, USA", flag: "🇺🇸", text: "I was going through the darkest season of my life when someone handed me this book. By the time I finished Chapter 1, I knew God had orchestrated that moment. Divine Intimacy gave me the language for what my soul had been craving.", rating: 5 },
  { name: "David Mensah", location: "Accra, Ghana", flag: "🇬🇭", text: "Prophet Joshua writes with an authority that can only come from someone who has truly walked in the presence of God. This book is a prophetic manual for the end-time church. I bought ten copies for my house church leaders.", rating: 5 },
  { name: "Angela Rodriguez", location: "Miami, Florida, USA", flag: "🇺🇸", text: "I have never highlighted so many pages in a single book. Divine Intimacy reads like a love letter from heaven. The section on moving from religion to relationship convicted me and freed me at the same time.", rating: 5 },
  { name: "Samuel Adeyemi", location: "Nairobi, Kenya", flag: "🇰🇪", text: "This is the book the body of Christ has been waiting for. In a generation drowning in religious noise, Prophet Joshua brings us back to the one thing that matters — knowing God face to face.", rating: 5 },
];

const BOOK_QUOTES = [
  { text: "True intimacy begins where the noise of the world ends and the whisper of God begins.", chapter: "Chapter 1" },
  { text: "Man was made for love, and man was made in the image of God's love.", chapter: "Chapter 2" },
  { text: "God gave man His life so we could live by Him, be sustained by Him, and have fellowship with Him.", chapter: "Chapter 3" },
  { text: "The deeper you go in God, the more you discover that He has been waiting for you all along.", chapter: "Chapter 4" },
  { text: "Prayer is not a ritual; it is the breath of a soul that has found its home in God.", chapter: "Chapter 5" },
  { text: "Fellowship with God is not about religious activity. It is about relationship.", chapter: "Chapter 6" },
  { text: "There is a place in God where the noise of the world cannot reach you. That place is your birthright.", chapter: "Chapter 7" },
];

const CHAPTER_PREVIEW = {
  title: "Chapter 1: The Foundation of Divine Fellowship",
  content: `Have you ever felt a deep longing in your heart that nothing in this world could satisfy? A hunger that no relationship, achievement, or possession could fill? That longing is not a weakness — it is the echo of eternity that God placed within you.

From the very beginning, God designed humanity for one supreme purpose: fellowship with Himself. In the Garden of Eden, before sin entered the world, Adam walked with God in the cool of the day. There was no barrier, no distance, no shame. It was pure, unhindered communion between the Creator and His creation.

This is the fellowship that God desires to restore with every believer. Not a distant, formal relationship, but a deep, intimate, face-to-face encounter with the living God. Divine Intimacy is not reserved for prophets and apostles alone — it is the birthright of every child of God.

The Scriptures declare in 1 John 1:3, "That which we have seen and heard we proclaim also to you, so that you too may have fellowship with us; and indeed our fellowship is with the Father and with his Son Jesus Christ."

Fellowship with God is not about religious activity. It is about relationship. It is about knowing Him — not just knowing about Him. There is a vast difference between head knowledge and heart experience. Many believers can quote Scripture, attend services, and participate in ministry, yet still feel distant from the very God they serve.

The reason is simple: they have substituted activity for intimacy. They have replaced the presence of God with the programs of men. But God is calling His people back to the secret place — that inner chamber where the noise of the world fades and the voice of the Almighty becomes clear.`,
};

const PRICING = [
  { key: "ebook", price: 25, label: "E-Book (PDF)", description: "Instant digital download", icon: "download", popular: true },
  { key: "physical_us", price: 30, label: "Physical Book (US)", description: "Free shipping within the USA", icon: "book", popular: false },
  { key: "physical_intl", price: 35.99, label: "Physical Book (International)", description: "Worldwide shipping included", icon: "globe", popular: false },
];

const DISCOVERIES = [
  { title: "The Higher Nature Inside Every Believer", desc: "Discover the divine DNA that God placed within you at the moment of salvation." },
  { title: "The Believer's Oneness with God", desc: "Understand the profound mystery of your union with the Creator of the universe." },
  { title: "The Secret Place of Communion", desc: "Learn how to cultivate a lifestyle of continuous, unbroken fellowship with God." },
  { title: "From Religion to Relationship", desc: "Move beyond religious routine into the authentic, life-changing presence of God." },
  { title: "Your Kingdom Assignment", desc: "Discover how intimacy with God unlocks your divine purpose and kingdom mandate." },
  { title: "The Manifest Presence", desc: "Experience the tangible, overwhelming presence of God in your daily life." },
];

/* ─── Manus Backend API URL (for Stripe & leads) ─── */
const MANUS_API_BASE = "https://divine-intimacy-landing-page.manus.space";

/* ─── Video Overlay ─── */
function VideoOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fadeIn">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>
      <div className="relative w-[90vw] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl animate-fadeInUp">
        <video
          ref={videoRef}
          src={CDN.edenVideo}
          className="w-full h-full object-cover"
          controls
          playsInline
          onEnded={onClose}
        />
      </div>
      <div className="absolute bottom-8 left-0 right-0 text-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
        <a href="#di-pricing">
          <button
            onClick={onClose}
            className="di-gold-gradient text-[#0a1a0a] font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-2xl inline-flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Get the Book Now
          </button>
        </a>
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden di-eden-bg">
      {/* Living Eden Background Layers */}
      <div className="absolute inset-0 di-eden-base" />
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url(${CDN.edenGardenBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(2px) saturate(0.6)',
      }} />
      <div className="absolute inset-0 di-eden-rays" />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] di-eden-mist" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] di-eden-glow" />

      {/* Floating light particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full di-particle"
            style={{
              width: `${2 + (i % 3) * 1.5}px`,
              height: `${2 + (i % 3) * 1.5}px`,
              left: `${(i * 7) % 100}%`,
              background: i % 3 === 0 ? 'rgba(212, 175, 55, 0.5)' : 'rgba(100, 180, 100, 0.4)',
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${15 + (i % 5) * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10 di-gold-line" />

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* 3D Book Mockup */}
          <div className="mb-12 animate-fadeInUp" style={{ perspective: '1200px' }}>
            <div className="relative">
              <div className="absolute -inset-12 rounded-full di-book-glow" />
              <div style={{ transform: 'rotateY(-5deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}>
                <Image
                  src={CDN.bookCover}
                  alt="Divine Intimacy - The Believer's Guide to Fellowship with God by Joshua Matthews"
                  width={320}
                  height={480}
                  className="relative w-64 sm:w-72 md:w-80 rounded-lg di-book-shadow"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-3xl animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-amber-500/30 bg-amber-500/5">
              <Star className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-amber-400">A Living Revelation</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-white">
              God Desires to
              <br />
              <span className="gold-shimmer">Speak to You</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-white/70 mb-4 italic leading-relaxed max-w-2xl mx-auto">
              This is a living revelation from God&apos;s heart to yours.
            </p>

            <p className="text-sm text-white/40 mb-10">
              By <span className="text-white/70 font-medium">Prophet Joshua Matthews</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onWatchVideo}
                className="group relative overflow-hidden font-bold text-base px-10 py-4 rounded-full transition-all shadow-2xl di-eden-btn inline-flex items-center justify-center gap-2"
              >
                <Play className="h-5 w-5 fill-current" />
                Watch the Message
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <a href="#di-pricing">
                <button className="di-gold-gradient text-[#0a1a0a] font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                  Order Your Copy
                  <ArrowRight className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1a0a] to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="h-6 w-6 text-white/30" />
      </div>
    </section>
  );
}

/* ─── Video Preview Section ─── */
function VideoPreviewSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(50,100,50,0.15) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto scroll-reveal">
          <p className="text-center text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">
            A Message From God&apos;s Heart
          </p>
          <h2 className="text-center font-serif text-2xl sm:text-3xl font-bold text-white mb-8">
            Watch the Revelation Unfold
          </h2>

          <div
            className="relative cursor-pointer group rounded-2xl overflow-hidden mx-auto"
            onClick={onWatchVideo}
            style={{ boxShadow: '0 8px 60px rgba(212,175,55,0.1)' }}
          >
            <div className="relative aspect-video bg-black/30 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={CDN.edenGardenBg}
                alt="Return to Eden - Divine Intimacy"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border-2 border-amber-400/40 bg-amber-400/20">
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 ml-1 text-amber-300" fill="currentColor" />
                </div>
                <p className="font-serif text-lg sm:text-xl text-white/90 italic">
                  &ldquo;It is time to return.&rdquo;
                </p>
                <p className="text-sm text-white/50 mt-2">
                  Click to experience the message
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SEO Hook Section ─── */
function SeoHookSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(50,100,50,0.15) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center scroll-reveal">
          <p className="text-sm uppercase tracking-[0.3em] mb-6 font-medium text-amber-400">
            A Word for This Season
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            God Is Calling You Into
            <span className="gold-shimmer block mt-2">Something Deeper</span>
          </h2>
          <div className="space-y-6 text-lg text-white/60 leading-relaxed">
            <p>
              Have you been praying but feel like heaven is silent? Have you been seeking God but feel like something is missing? Have you been longing for a breakthrough that never seems to come?
            </p>
            <p className="text-white/80 font-medium text-xl">
              You are not alone.
            </p>
            <p>
              Millions of believers around the world are crying out for the same thing — a genuine, life-transforming encounter with the living God. Not religion. Not routine. Not another Sunday service that leaves you empty.
            </p>
            <p className="font-serif text-xl italic text-amber-300/80">
              &ldquo;The hunger you feel is not a sign of failure — it is the Holy Spirit drawing you into the deepest, most intimate fellowship you have ever known.&rdquo;
            </p>
          </div>
          <div className="mt-10">
            <a href="#di-lead-capture">
              <button className="di-gold-gradient text-[#0a1a0a] font-bold text-base px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get Your Free Chapter
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Discoveries Section ─── */
function DiscoveriesSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(50,100,50,0.1) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">Inside the Book</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">What You Will Discover</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {DISCOVERIES.map((item, i) => (
            <div key={i} className="scroll-reveal bg-white/5 border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300 group" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center bg-green-900/30">
                <span className="font-serif text-lg font-bold text-green-400">{i + 1}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Author Section ─── */
function AuthorSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 70% 50%, rgba(100,80,30,0.06) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-2 flex justify-center scroll-reveal">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl" style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(50,100,50,0.15))',
                filter: 'blur(20px)'
              }} />
              <Image
                src={CDN.authorPhoto}
                alt="Prophet Joshua Matthews"
                width={320}
                height={427}
                className="relative w-72 sm:w-80 rounded-2xl shadow-2xl object-cover"
                style={{ aspectRatio: '3/4', objectPosition: 'center top' }}
              />
            </div>
          </div>
          <div className="lg:col-span-3 text-center lg:text-left scroll-reveal">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">About the Author</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">Prophet Joshua Matthews</h2>
            <p className="font-serif text-lg italic text-white/50 mb-6">&ldquo;Joshua the Leader of Many&rdquo;</p>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Prophet Joshua Matthews is a man called by God to lead nations into the deeper dimensions of His presence. As the founder of <strong className="text-white/80">Overcomers Global Network</strong>, he has dedicated his life to equipping believers with the tools and revelation needed to walk in the fullness of their divine assignment.
              </p>
              <p>
                With a prophetic mandate to educate, equip, and empower, Prophet Joshua Matthews carries a unique anointing that bridges the gap between head knowledge and heart experience. His teachings have transformed lives across the globe.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-amber-400 hover:text-amber-400 transition-all">
                Visit overcomersglobalnetwork.com
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter Preview ─── */
function ChapterPreviewSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(50,100,50,0.1) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 scroll-reveal">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">Free Chapter Preview</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Begin Your Journey Now</h2>
          <p className="text-white/50 max-w-xl mx-auto">Read the first chapter right here. Experience the power of this book before you purchase.</p>
        </div>

        <div className="max-w-3xl mx-auto scroll-reveal">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                <BookOpen className="h-5 w-5 text-amber-400" />
                <h3 className="font-serif text-xl font-semibold text-white">{CHAPTER_PREVIEW.title}</h3>
              </div>
              <div className={`font-serif text-lg leading-[1.9] text-white/70 space-y-6 transition-all duration-500 ${expanded ? '' : 'max-h-[400px] overflow-hidden relative'}`}>
                {CHAPTER_PREVIEW.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {!expanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f1f0f] to-transparent" />
                )}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-amber-400 hover:text-amber-400 transition-all inline-flex items-center gap-2"
                >
                  {expanded ? <><ChevronUp className="h-4 w-4" /> Show Less</> : <><ChevronDown className="h-4 w-4" /> Read Full Chapter</>}
                </button>
                {expanded && (
                  <a href="#di-pricing">
                    <button className="di-gold-gradient text-[#0a1a0a] font-semibold rounded-full px-6 py-3 inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Get the Full Book
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quotes Section ─── */
function QuotesSection() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % BOOK_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a0a, #0f1f0f, #0a1a0a)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(50,100,50,0.1) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">Words That Transform</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">From the Pages of Divine Intimacy</h2>
        </div>
        <div className="max-w-3xl mx-auto text-center scroll-reveal">
          <Quote className="h-10 w-10 mx-auto mb-6 opacity-30 text-amber-400" />
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="font-serif text-2xl sm:text-3xl italic leading-relaxed text-white/85 transition-opacity duration-500" key={activeQuote}>
              &ldquo;{BOOK_QUOTES[activeQuote].text}&rdquo;
            </p>
          </div>
          <p className="text-sm text-white/40 mt-6 uppercase tracking-wider">
            — {BOOK_QUOTES[activeQuote].chapter} · Divine Intimacy
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {BOOK_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeQuote ? '#d4af37' : 'rgba(100,100,100,0.3)',
                  width: i === activeQuote ? '24px' : '8px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─── */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">Readers Around the World</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Lives Being Transformed</h2>
          <p className="text-white/50 max-w-xl mx-auto">Believers from every nation are encountering God through these pages.</p>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-12 scroll-reveal">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm">
            <div className="flex justify-center mb-6 gap-1">
              {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current text-amber-400" />
              ))}
            </div>
            <Quote className="h-8 w-8 mx-auto mb-6 opacity-30 text-amber-400" />
            <p className="font-serif text-lg sm:text-xl leading-relaxed text-white/80 mb-8 italic">
              &ldquo;{TESTIMONIALS[active].text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-amber-400/15">
                {TESTIMONIALS[active].flag}
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">{TESTIMONIALS[active].name}</p>
                <p className="text-sm text-white/50">{TESTIMONIALS[active].location}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  background: i === active ? '#d4af37' : 'rgba(212,175,55,0.3)',
                  width: i === active ? '32px' : '10px',
                  height: '10px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`scroll-reveal bg-white/[0.03] border hover:border-white/20 rounded-xl p-5 cursor-pointer transition-all duration-300 ${i === active ? 'border-amber-400/30 shadow-lg' : 'border-white/[0.08]'}`}
              onClick={() => setActive(i)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{t.flag}</span>
                <div>
                  <p className="font-semibold text-sm text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-current text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/60 line-clamp-3 italic">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (productType: string) => {
    setLoading(productType);
    try {
      // Try to use Manus backend for Stripe checkout
      const res = await fetch(`${MANUS_API_BASE}/api/trpc/store.createCheckout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: { productType, origin: window.location.origin } }),
      });
      const data = await res.json();
      if (data?.result?.data?.json?.url) {
        window.open(data.result.data.json.url, '_blank');
      } else {
        // Fallback: contact info
        alert('To purchase, please contact: ognmedia2024@gmail.com or visit overcomersglobalnetwork.com');
      }
    } catch {
      alert('To purchase, please contact: ognmedia2024@gmail.com or visit overcomersglobalnetwork.com');
    } finally {
      setLoading(null);
    }
  };

  const getIcon = (key: string) => {
    if (key === 'ebook') return <Download className="h-5 w-5 text-amber-400" />;
    if (key === 'physical_us') return <BookOpen className="h-5 w-5 text-amber-400" />;
    return <Globe className="h-5 w-5 text-amber-400" />;
  };

  return (
    <section id="di-pricing" className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(100,80,30,0.06) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-amber-400">Invest in Your Walk with God</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Get Your Copy Today</h2>
          <p className="text-white/50 max-w-xl mx-auto">Choose the format that works best for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRICING.map((tier) => (
            <div key={tier.key} className={`scroll-reveal rounded-2xl overflow-hidden h-full group hover:-translate-y-1 transition-all duration-300 ${tier.popular ? 'border-2 border-amber-400 shadow-2xl' : 'bg-white/5 border border-white/10 hover:border-white/20'}`} style={tier.popular ? { boxShadow: '0 0 40px rgba(212,175,55,0.1)' } : {}}>
              {tier.popular && (
                <div className="di-gold-gradient text-[#0a1a0a] text-xs font-bold uppercase tracking-wider text-center py-1.5">
                  Most Popular
                </div>
              )}
              <div className="p-8 text-center flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-amber-400/10">
                  {getIcon(tier.key)}
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-1">{tier.label}</h3>
                <p className="text-sm text-white/45 mb-6">{tier.description}</p>
                <div className="mb-8">
                  <span className="font-serif text-4xl font-bold gold-shimmer">${tier.price}</span>
                  <span className="text-white/40 text-sm ml-1">USD</span>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={() => handlePurchase(tier.key)}
                    disabled={loading === tier.key}
                    className={`w-full rounded-full font-semibold py-4 transition-all ${tier.popular ? 'di-gold-gradient text-[#0a1a0a] hover:opacity-90' : 'bg-white/10 text-white/80 hover:bg-white/15'}`}
                  >
                    {loading === tier.key ? 'Processing...' : 'Purchase Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Lead Capture ─── */
function LeadCaptureSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await fetch(`${MANUS_API_BASE}/api/trpc/leads.capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: { name: name.trim(), email: email.trim() } }),
      });
      setSubmitted(true);
    } catch {
      // Still show success since the form was submitted
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="di-lead-capture" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1a0a, #0f1f0f, #0a1a0a)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(50,100,50,0.08) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto scroll-reveal">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">Get Your Free Chapter</h2>
            <p className="text-white/50">Enter your details below and receive Chapter 1 delivered straight to your inbox.</p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-2xl border border-white/10 bg-white/5 text-center backdrop-blur-sm animate-fadeInUp">
              <Check className="h-14 w-14 mx-auto mb-4 text-amber-400" />
              <h3 className="font-serif text-2xl font-semibold text-white mb-2">Thank You!</h3>
              <p className="text-white/50 mb-6">Your free chapter is on its way. Check your inbox.</p>
              <a href="#di-pricing">
                <button className="di-gold-gradient text-[#0a1a0a] font-semibold rounded-full px-8 py-3">
                  Get the Full Book Now
                </button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <div>
                <label htmlFor="di-name" className="text-sm text-white/50 mb-1.5 block">Your Name</label>
                <input
                  id="di-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="di-email" className="text-sm text-white/50 mb-1.5 block">Your Email</label>
                <input
                  id="di-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full di-gold-gradient text-[#0a1a0a] font-bold text-base py-4 rounded-full hover:opacity-90 transition-all"
                style={{ boxShadow: '0 4px 30px rgba(212,175,55,0.2)' }}
              >
                {submitting ? 'Sending...' : 'Send Me the Free Chapter'}
              </button>
              <p className="text-xs text-white/30 text-center">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#0a1a0a]">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url(${CDN.edenGardenBg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(3px)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(50,100,50,0.12) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center scroll-reveal">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6">
            It Is Time to
            <span className="gold-shimmer block mt-2">Return</span>
          </h2>
          <p className="font-serif text-xl italic text-white/60 mb-10 max-w-2xl mx-auto">
            &ldquo;The God who created you for fellowship is calling you by name. The garden awaits. Divine Intimacy begins here.&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#di-pricing">
              <button className="di-gold-gradient text-[#0a1a0a] font-bold text-lg px-12 py-5 rounded-full hover:opacity-90 transition-all shadow-2xl inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                <Sparkles className="h-5 w-5" />
                Begin Your Journey Today
              </button>
            </a>
            <button
              onClick={onWatchVideo}
              className="font-semibold text-base px-8 py-5 rounded-full border border-white/20 text-white/70 hover:border-green-400 hover:text-green-400 transition-all inline-flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" />
              Watch the Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page Component ─── */
export default function DivineIntimacyClient() {
  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <main className="min-h-screen bg-[#0a1a0a]">
      <Navigation />
      <ScrollReveal />
      <HeroSection onWatchVideo={openVideo} />
      <VideoPreviewSection onWatchVideo={openVideo} />
      <SeoHookSection />
      <DiscoveriesSection />
      <AuthorSection />
      <ChapterPreviewSection />
      <QuotesSection />
      <TestimonialsSection />
      <PricingSection />
      <LeadCaptureSection />
      <FinalCTA onWatchVideo={openVideo} />
      <Footer />
      <VideoOverlay isOpen={videoOpen} onClose={closeVideo} />
    </main>
  );
}
