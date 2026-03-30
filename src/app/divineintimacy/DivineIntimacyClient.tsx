'use client';

import './divineintimacy.css';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  BookOpen, Download, Globe, Mail, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, Check, Star, Quote, Play, X
} from 'lucide-react';

/* ─── ScrollReveal wrapper using Intersection Observer ─── */
function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
      }}
    >
      {children}
    </div>
  );
}

/* ─── CDN Assets ─── */
const CDN = {
  bookCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/divine-intimacy-cover-2_e23ed17b.png",
  authorCircle: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/author_centered_square_149654df.png",
  ministryLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ministry-logo_3eb6c31c.png",
  edenVideo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/divine_intimacy_trailer_with_voiceover_b3339ce1.mp4",
  edenGardenBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/eden_01_garden_1e4a1346.png",
  edenGardenBg2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/eden_07_text_d78e4b14.png",
  edenPathBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/eden_path_bg-ZPwaG99a4oLLnsRAikbk7g.webp",
};

/* ─── Manus Backend API URL (for Stripe & leads) ─── */
const MANUS_API_BASE = "https://divine-intimacy-landing-page.manus.space";

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

/* ─── Color constants ─── */
const DARK = {
  bg: "#0f2a0f",
  text: "#f0ede5",
  textMuted: "rgba(240,237,229,0.6)",
  textFaint: "rgba(240,237,229,0.4)",
  gold: "#d4af37",
  goldSoft: "rgba(212,175,55,0.85)",
  cardBg: "rgba(15,42,15,0.6)",
  border: "rgba(60,100,60,0.4)",
};

const LIGHT = {
  bg: "#f5f0e8",
  bgAlt: "#ede7db",
  text: "#1a2e1a",
  textMuted: "#3d5a3d",
  textFaint: "#6b8a6b",
  gold: "#8b6914",
  goldBright: "#a07d1c",
  cardBg: "#faf7f2",
  border: "#ddd5c5",
  greenAccent: "#2d5a2d",
};

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
        <a href="#di-pricing" onClick={onClose}>
          <button className="di-gold-gradient text-white font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-2xl inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Get the Book Now
          </button>
        </a>
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function DiNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl shadow-lg" : "bg-transparent"}`}
      style={scrolled ? { background: "rgba(245,240,232,0.95)", borderBottom: `1px solid ${LIGHT.border}` } : {}}>
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src={CDN.ministryLogo} alt="OGN" width={40} height={40} className="h-10 w-auto" />
          <span className={`font-serif text-lg hidden sm:block transition-colors ${scrolled ? "text-[#1a2e1a]" : "text-white/90"} group-hover:text-[#a07d1c]`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Overcomers Global Network
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#di-about" className={`text-sm transition-colors hidden md:block ${scrolled ? "text-[#3d5a3d] hover:text-[#a07d1c]" : "text-white/60 hover:text-[#d4af37]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}>About</a>
          <a href="#di-preview" className={`text-sm transition-colors hidden md:block ${scrolled ? "text-[#3d5a3d] hover:text-[#a07d1c]" : "text-white/60 hover:text-[#d4af37]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}>Read</a>
          <a href="#di-pricing">
            <button className="di-gold-gradient text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Get the Book
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO: Dark Eden section ─── */
function HeroSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden di-eden-bg">
      {/* Living Eden Background Layers */}
      <div className="absolute inset-0 di-eden-base" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${CDN.edenPathBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
        filter: 'saturate(0.9) brightness(1.2)',
      }} />
      <div className="absolute inset-0 di-eden-warm-wash" />
      <div className="absolute inset-0 di-eden-rays" />
      <div className="absolute bottom-0 left-0 right-0 h-[30%] di-eden-mist" />
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
              background: i % 3 === 0 ? 'rgba(212, 175, 55, 0.5)' : 'rgba(100, 180, 100, 0.35)',
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.05)' }}>
              <Star className="h-3.5 w-3.5" style={{ color: DARK.gold }} />
              <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: DARK.gold, fontFamily: "'Inter', sans-serif" }}>A Living Revelation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              God Desires to
              <br />
              <span style={{ background: 'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Speak to You</span>
            </h1>

            <p className="text-xl sm:text-2xl italic leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              This is a living revelation from God&apos;s heart to yours.
            </p>

            <p className="text-sm mb-10" style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
              By <span className="font-medium" style={{ color: 'rgba(240,237,229,0.7)' }}>Prophet Joshua Matthews</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onWatchVideo}
                className="di-eden-btn font-bold text-base px-10 py-4 rounded-full transition-all shadow-2xl inline-flex items-center justify-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Play className="h-5 w-5 fill-current" />
                Watch the Message
              </button>
              <a href="#di-pricing">
                <button className="di-gold-gradient text-white font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(212,175,55,0.25)' }}>
                  Order Your Copy
                  <ArrowRight className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition: dark Eden → warm cream */}
      <div className="absolute bottom-0 left-0 right-0 h-40 di-hero-fade-bottom" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: 'di-float-up 2s ease-in-out infinite alternate' }}>
        <ChevronDown className="h-6 w-6" style={{ color: 'rgba(240,237,229,0.3)' }} />
      </div>
    </section>
  );
}

/* ─── Video Preview Section (light) ─── */
function VideoPreviewSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              A Message From God&apos;s Heart
            </p>
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Watch the Revelation Unfold
            </h2>

            <div
              className="relative cursor-pointer group rounded-2xl overflow-hidden mx-auto"
              onClick={onWatchVideo}
              style={{ boxShadow: '0 8px 40px rgba(45,90,45,0.12)' }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden" style={{ border: `1px solid ${LIGHT.border}` }}>
                <Image
                  src={CDN.edenGardenBg}
                  alt="Return to Eden - Divine Intimacy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: 'rgba(212,175,55,0.25)', border: '2px solid rgba(212,175,55,0.5)' }}>
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 ml-1 text-white" fill="white" />
                  </div>
                  <p className="text-lg sm:text-xl text-white italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    &ldquo;It is time to return.&rdquo;
                  </p>
                  <p className="text-sm text-white/70 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Click to experience the message
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── SEO Hook (light with subtle accent) ─── */
function SeoHookSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(45,90,45,0.04) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] mb-6 font-medium" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              A Word for This Season
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              God Is Calling You Into
              <span className="di-gold-text block mt-2">Something Deeper</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              <p>
                Have you been praying but feel like heaven is silent? Have you been seeking God but feel like something is missing? Have you been longing for a breakthrough that never seems to come?
              </p>
              <p className="font-medium text-xl" style={{ color: LIGHT.text }}>
                You are not alone.
              </p>
              <p>
                Millions of believers around the world are crying out for the same thing — a genuine, life-transforming encounter with the living God. Not religion. Not routine. Not another Sunday service that leaves you empty.
              </p>
              <p className="text-xl italic" style={{ color: LIGHT.gold }}>
                &ldquo;The hunger you feel is not a sign of failure — it is the Holy Spirit drawing you into the deepest, most intimate fellowship you have ever known.&rdquo;
              </p>
            </div>
            <div className="mt-10">
              <a href="#di-lead-capture">
                <button className="di-gold-gradient text-white font-bold text-base px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(139,105,20,0.2)' }}>
                  <Mail className="h-5 w-5" />
                  Get Your Free Chapter
                </button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── What You'll Discover (light) ─── */
function DiscoveriesSection() {
  return (
    <section id="di-about" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              Inside the Book
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              What You Will Discover
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {DISCOVERIES.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="h-full group hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center" style={{ background: 'rgba(45,90,45,0.08)' }}>
                  <span className="text-lg font-bold" style={{ color: LIGHT.greenAccent, fontFamily: "'Playfair Display', serif" }}>{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 transition-colors" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About the Author (light) ─── */
function AuthorSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 70% 50%, rgba(45,90,45,0.03) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 font-medium text-center" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              About the Author
            </p>

            {/* Circle photo + signature quote */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
              {/* Circle avatar */}
              <div className="relative shrink-0">
                <div className="absolute -inset-3 rounded-full" style={{
                  background: 'linear-gradient(135deg, rgba(160,125,28,0.2), rgba(45,90,45,0.15))',
                  filter: 'blur(12px)'
                }} />
                <Image
                  src={CDN.authorCircle}
                  alt="Prophet Joshua Matthews"
                  width={160}
                  height={160}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl"
                  style={{ border: '3px solid rgba(160,125,28,0.3)' }}
                />
              </div>

              {/* Name + quote beside the circle */}
              <div className="text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
                  Prophet Joshua Matthews
                </h2>
                <p className="text-base italic mb-4" style={{ color: LIGHT.textFaint, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;Joshua the Leader of Many&rdquo;
                </p>
                <blockquote className="text-lg sm:text-xl italic leading-relaxed" style={{ color: LIGHT.gold, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;The God who created you for fellowship is calling you by name. It is time to return.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 leading-relaxed text-center sm:text-left" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
              <p>
                Prophet Joshua Matthews is a man called by God to lead nations into the deeper dimensions of His presence. As the founder of <strong style={{ color: LIGHT.text }}>Overcomers Global Network</strong>, he has dedicated his life to equipping believers with the tools and revelation needed to walk in the fullness of their divine assignment.
              </p>
              <p>
                With a prophetic mandate to educate, equip, and empower, Prophet Joshua Matthews carries a unique anointing that bridges the gap between head knowledge and heart experience. His teachings have transformed lives across the globe.
              </p>
            </div>

            <div className="mt-8 text-center sm:text-left">
              <Link href="/">
                <button className="rounded-full px-6 py-2.5 transition-all inline-flex items-center gap-2"
                  style={{ border: `1px solid ${LIGHT.border}`, color: LIGHT.textMuted, fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                  Visit overcomersglobalnetwork.com
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Chapter Preview (light) ─── */
function ChapterPreviewSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="di-preview" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              Free Chapter Preview
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Begin Your Journey Now
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Read the first chapter right here. Experience the power of this book before you purchase.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden shadow-lg rounded-xl" style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-8 pb-6" style={{ borderBottom: `1px solid ${LIGHT.border}` }}>
                  <BookOpen className="h-5 w-5" style={{ color: LIGHT.goldBright }} />
                  <h3 className="text-xl font-semibold" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{CHAPTER_PREVIEW.title}</h3>
                </div>
                <div className={`text-lg leading-[1.9] space-y-6 transition-all duration-500 ${expanded ? '' : 'max-h-[400px] overflow-hidden relative'}`}
                  style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                  {CHAPTER_PREVIEW.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  {!expanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-40" style={{
                      background: `linear-gradient(to top, ${LIGHT.cardBg}, transparent)`
                    }} />
                  )}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="rounded-full px-6 py-2.5 inline-flex items-center gap-2"
                    style={{ border: `1px solid ${LIGHT.border}`, color: LIGHT.textMuted, fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}
                  >
                    {expanded ? <><ChevronUp className="h-4 w-4" /> Show Less</> : <><ChevronDown className="h-4 w-4" /> Read Full Chapter</>}
                  </button>
                  {expanded && (
                    <a href="#di-pricing">
                      <button className="di-gold-gradient text-white font-semibold rounded-full px-6 py-2.5 inline-flex items-center gap-2"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                        <Sparkles className="h-4 w-4" />
                        Get the Full Book
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Quotes Section: Dark accent band ─── */
function QuotesSection() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % BOOK_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="di-quotes" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f2a0f, #143214, #0f2a0f)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(45,90,45,0.15) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: DARK.gold, fontFamily: "'Inter', sans-serif" }}>
              Words That Transform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              From the Pages of Divine Intimacy
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto text-center">
          <Quote className="h-10 w-10 mx-auto mb-6 opacity-30" style={{ color: DARK.gold }} />
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="text-2xl sm:text-3xl italic leading-relaxed transition-opacity duration-500"
              style={{ color: DARK.goldSoft, fontFamily: "'Cormorant Garamond', serif" }} key={activeQuote}>
              &ldquo;{BOOK_QUOTES[activeQuote].text}&rdquo;
            </p>
          </div>
          <p className="text-sm mt-6 uppercase tracking-wider" style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
            — {BOOK_QUOTES[activeQuote].chapter} &middot; Divine Intimacy
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {BOOK_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeQuote ? DARK.gold : 'rgba(100,140,100,0.4)',
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

/* ─── Testimonials Section (light) ─── */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              Readers Around the World
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Lives Being Transformed
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Believers from every nation are encountering God through these pages.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="overflow-hidden shadow-md rounded-xl" style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
            <div className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-6 gap-1">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: LIGHT.goldBright }} />
                ))}
              </div>
              <Quote className="h-8 w-8 mx-auto mb-6 opacity-20" style={{ color: LIGHT.goldBright }} />
              <p className="text-lg sm:text-xl leading-relaxed mb-8 italic" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(160,125,28,0.1)' }}>
                  {TESTIMONIALS[active].flag}
                </div>
                <div className="text-left">
                  <p className="font-semibold" style={{ color: LIGHT.text, fontFamily: "'Inter', sans-serif" }}>{TESTIMONIALS[active].name}</p>
                  <p className="text-sm" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{TESTIMONIALS[active].location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-8' : 'w-2.5 opacity-40 hover:opacity-60'}`}
                style={{ background: i === active ? LIGHT.goldBright : 'rgba(160,125,28,0.3)' }}
              />
            ))}
          </div>
        </div>

        {/* Grid of all testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i}>
              <div
                className={`hover:shadow-md transition-all duration-300 cursor-pointer rounded-xl p-5 ${i === active ? 'ring-1' : ''}`}
                style={{
                  background: LIGHT.cardBg,
                  border: `1px solid ${i === active ? 'rgba(160,125,28,0.4)' : LIGHT.border}`,
                  ...(i === active ? { boxShadow: '0 0 20px rgba(160,125,28,0.08)' } : {}),
                }}
                onClick={() => setActive(i)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{t.flag}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: LIGHT.text, fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{t.location}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-current" style={{ color: LIGHT.goldBright }} />
                    ))}
                  </div>
                </div>
                <p className="text-sm italic line-clamp-3" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>&ldquo;{t.text}&rdquo;</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section (light) ─── */
function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (productType: string) => {
    setLoading(productType);
    try {
      const res = await fetch(`${MANUS_API_BASE}/api/trpc/store.createCheckout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: { productType, origin: window.location.origin } }),
      });
      const data = await res.json();
      const result = data?.result?.data?.json;
      if (result?.url) {
        window.open(result.url, '_blank');
      } else if (result?.message) {
        alert(result.message);
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const iconMap: Record<string, typeof Download> = { download: Download, book: BookOpen, globe: Globe };

  return (
    <section id="di-pricing" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              Invest in Your Walk with God
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Get Your Copy Today
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Choose the format that works best for you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRICING.map((tier) => {
            const Icon = iconMap[tier.icon] || Download;
            return (
              <ScrollReveal key={tier.key}>
                <div className={`relative overflow-hidden h-full group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-xl ${tier.popular ? 'border-2' : ''}`}
                  style={{ background: LIGHT.cardBg, borderColor: tier.popular ? LIGHT.goldBright : LIGHT.border, ...(tier.popular ? { boxShadow: '0 0 40px rgba(160,125,28,0.1)' } : {}) }}>
                  {tier.popular && (
                    <div className="di-gold-gradient text-white text-xs font-bold uppercase tracking-wider text-center py-1.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 text-center flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(160,125,28,0.08)' }}>
                      <Icon className="h-5 w-5" style={{ color: LIGHT.goldBright }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{tier.label}</h3>
                    <p className="text-sm mb-6" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{tier.description}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold di-gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>${tier.price}</span>
                      <span className="text-sm ml-1" style={{ color: LIGHT.textFaint }}>USD</span>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleCheckout(tier.key)}
                        disabled={loading === tier.key}
                        className={`w-full rounded-full font-semibold py-3 transition-all ${tier.popular ? 'di-gold-gradient text-white hover:opacity-90' : ''}`}
                        style={!tier.popular ? { background: 'rgba(45,90,45,0.08)', color: LIGHT.text, fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
                      >
                        {loading === tier.key ? 'Processing...' : 'Purchase Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Lead Capture (dark accent band) ─── */
function LeadCaptureSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${MANUS_API_BASE}/api/trpc/leads.capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: { name: name.trim(), email: email.trim() } }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="di-lead-capture" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f2a0f, #143214, #0f2a0f)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(45,90,45,0.1) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
                Get Your Free Chapter
              </h2>
              <p style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
                Enter your details below and receive Chapter 1 delivered straight to your inbox.
              </p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <div className="p-10 rounded-2xl text-center" style={{ background: DARK.cardBg, border: `1px solid ${DARK.border}` }}>
              <Check className="h-14 w-14 mx-auto mb-4" style={{ color: DARK.gold }} />
              <h3 className="text-2xl font-semibold mb-2" style={{ color: DARK.text, fontFamily: "'Cormorant Garamond', serif" }}>Thank You!</h3>
              <p className="mb-6" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your free chapter is on its way. Check your inbox.</p>
              <a href="#di-pricing">
                <button className="di-gold-gradient text-white font-semibold rounded-full px-8 py-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  Get the Full Book Now
                </button>
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-8 rounded-2xl backdrop-blur-sm"
              style={{ background: DARK.cardBg, border: `1px solid ${DARK.border}` }}
            >
              <div>
                <label htmlFor="di-name" className="text-sm mb-1.5 block" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Name</label>
                <input
                  id="di-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/30"
                  style={{ background: 'rgba(10,26,10,0.8)', border: `1px solid ${DARK.border}`, color: DARK.text, fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label htmlFor="di-email" className="text-sm mb-1.5 block" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Email</label>
                <input
                  id="di-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/30"
                  style={{ background: 'rgba(10,26,10,0.8)', border: `1px solid ${DARK.border}`, color: DARK.text, fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full di-gold-gradient text-white font-bold text-base py-4 rounded-full hover:opacity-90 transition-all"
                style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(160,125,28,0.2)' }}
              >
                {submitting ? 'Sending...' : 'Send Me the Free Chapter'}
              </button>
              <p className="text-xs text-center" style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA (dark Eden) ─── */
function FinalCTA({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: '#0a1a0a' }}>
      <div className="absolute inset-0 opacity-[0.1]" style={{
        backgroundImage: `url(${CDN.edenGardenBg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(3px)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(40,80,40,0.15) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              It Is Time to
              <span className="block mt-2" style={{ background: 'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Return</span>
            </h2>
            <p className="text-xl italic mb-10 max-w-2xl mx-auto" style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;The God who created you for fellowship is calling you by name. The garden awaits. Divine Intimacy begins here.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#di-pricing">
                <button className="di-gold-gradient text-white font-bold text-lg px-12 py-4 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-3"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 40px rgba(212,175,55,0.25)' }}>
                  <Sparkles className="h-5 w-5" />
                  Begin Your Journey Today
                </button>
              </a>
              <button
                onClick={onWatchVideo}
                className="font-semibold text-base px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
                style={{ border: `1px solid ${DARK.border}`, color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}
              >
                <Play className="h-5 w-5" />
                Watch the Message
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Footer (light) ─── */
function DiFooter() {
  return (
    <footer className="py-10" style={{ background: LIGHT.bg, borderTop: `1px solid ${LIGHT.border}` }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src={CDN.ministryLogo} alt="OGN" width={36} height={36} className="h-9 w-auto" />
            <div>
              <p className="text-sm font-semibold" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>Overcomers Global Network</p>
              <p className="text-xs" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>Educate. Equip. Empower.</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <Link href="/" className="text-sm hover:opacity-80 transition-opacity" style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
              overcomersglobalnetwork.com
            </Link>
            <p className="text-xs mt-1" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>
              &copy; {new Date().getFullYear()} Prophet Joshua Matthews. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function DivineIntimacyClient() {
  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <DiNavbar />
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
      <DiFooter />
      <VideoOverlay isOpen={videoOpen} onClose={closeVideo} />
    </div>
  );
}
