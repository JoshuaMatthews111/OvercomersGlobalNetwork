'use client';

import './ultimate-journey.css';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  BookOpen, Download, Globe, Mail, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, Check, Star, Quote, Play, X, Shield
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
  frontCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/uj_front_cover_c618b686.png",
  backCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/uj_back_cover_62db7a1b.png",
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/uj_hero_bg-nGDXQrn2NsuAEvcRq4mjuf.webp",
  trailerVideo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ultimate_journey_trailer_v2_f60bc411.mp4",
  authorCircle: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/author_centered_square_149654df.png",
  ministryLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ministry-logo_3eb6c31c.png",
};

/* ─── Manus Backend API URL (for Stripe & leads) ─── */
const MANUS_API_BASE = "https://divine-intimacy-landing-page.manus.space";

/* ─── Data ─── */
const TESTIMONIALS = [
  { name: "Pastor David Okafor", location: "Lagos, Nigeria", flag: "\u{1F1F3}\u{1F1EC}", text: "This book answered questions I have carried for over fifteen years in ministry. The chapter on baptism alone is worth ten times the price. Every pastor needs this on their shelf.", rating: 5 },
  { name: "Sarah Mitchell", location: "Atlanta, Georgia, USA", flag: "\u{1F1FA}\u{1F1F8}", text: "I thought I understood the basics of my faith until I read this book. Prophet Joshua breaks down the foundational doctrines with such clarity that I felt like I was learning them for the first time.", rating: 5 },
  { name: "Emmanuel Asante", location: "Accra, Ghana", flag: "\u{1F1EC}\u{1F1ED}", text: "The section on the laying on of hands opened my eyes to a dimension of ministry I had been missing. This is not just a book \u2014 it is a training manual for the end-time church.", rating: 5 },
  { name: "Rebecca Johnson", location: "Houston, Texas, USA", flag: "\u{1F1FA}\u{1F1F8}", text: "I bought this for my Bible study group and every single member said it was the most impactful study they have ever done. The way it unpacks Hebrews 6:1-3 is nothing short of revelatory.", rating: 5 },
  { name: "James Kimani", location: "Nairobi, Kenya", flag: "\u{1F1F0}\u{1F1EA}", text: "Prophet Joshua writes with the authority of someone who has walked with God through fire. The chapter on eternal judgment brought me to my knees. Every believer must read this.", rating: 5 },
  { name: "Maria Santos", location: "London, United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", text: "I have been a Christian for twenty years and I am ashamed to say I never truly understood these foundational doctrines until now. This book is a gift to the global church.", rating: 5 },
];

const BOOK_QUOTES = [
  { text: "We must have a solid foundation laid before going on to perfection or into maturity with God.", chapter: "Introduction" },
  { text: "Repentance is not merely feeling sorry for sin. It is a complete turning of the mind, will, and direction of your life toward God.", chapter: "Chapter 1" },
  { text: "Baptism is not a religious tradition. It is a prophetic act that declares to the heavens and the earth that you have died with Christ and risen to walk in newness of life.", chapter: "Chapter 2" },
  { text: "The power in an individual\u2019s hand can either bless you or curse you.", chapter: "Chapter 3" },
  { text: "The same spirit which raised Jesus from the dead dwells in us.", chapter: "Chapter 4" },
  { text: "Eternal judgment reminds us that every moment we live on this earth carries weight in eternity.", chapter: "Chapter 5" },
  { text: "When you pray, fear and hopelessness will begin to leave you; your guilt and shame will dissipate.", chapter: "Chapter 6" },
];

const CHAPTER_PREVIEW = {
  title: "Chapter 1: Repentance from Dead Works",
  content: `Hebrews 6:1-3 tells us, \u201CTherefore leaving the principles of the doctrine of Christ, let us go on unto perfection; not laying again the foundation of repentance from dead works, and of faith toward God, of the doctrine of baptisms, and of laying on of hands, and of the resurrection of the dead, and of eternal judgment. And this will we do, if God permits.\u201D

The first foundation that every believer needs to lay is repentance from dead works. You might wonder, what does it mean to repent from \u201Cdead works\u201D? Essentially, it\u2019s about realizing that all of us, by our nature, have fallen short of the glory of God. As Romans 3:23 says, \u201CFor all have sinned, and come short of the glory of God,\u201D and no amount of work or effort can justify us before God.

However, when Adam and Eve disobeyed God in the Garden of Eden by eating from the tree of the knowledge of good and evil, they were banished from the Garden. This didn\u2019t just affect them but all of humanity because they were the first of our kind.

Imagine this: had Adam and Eve remained obedient, we would all be in Eden, in right standing, immortals doing the work of God, and manifesting the full expression of our divine abilities. However, that is not the case because they sinned, and we all bear the consequences of that fall.

However, God didn\u2019t leave humanity helpless. Hallelujah! He sent His Son, Jesus Christ, as the ultimate sacrifice. John 3:16-18 reads: \u201CFor God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.\u201D

Nothing else can grant us right standing with God \u2014 not our donations to the poor, going to church, or even reading the Bible. According to Ephesians 2:8-9: \u201CFor by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.\u201D`,
};

const PRICING = [
  { key: "uj_ebook", price: 25, label: "E-Book (PDF)", description: "Instant digital download", icon: "download", popular: true },
  { key: "uj_physical_us", price: 30, label: "Physical Book (US)", description: "Free shipping within the USA", icon: "book", popular: false },
  { key: "uj_physical_intl", price: 35.99, label: "Physical Book (International)", description: "Worldwide shipping included", icon: "globe", popular: false },
];

const SIX_PILLARS = [
  { title: "Repentance from Dead Works", desc: "Understand the true meaning of repentance \u2014 not merely feeling sorry, but a complete turning of your mind, will, and life toward God.", chapter: "Chapter 1" },
  { title: "Faith Toward God", desc: "Build an unshakable faith rooted in the character and promises of God, not in circumstances or feelings.", chapter: "Chapter 1" },
  { title: "The Doctrine of Baptisms", desc: "Discover the proper and improper ways of baptism, and why this prophetic act carries such weight in the spirit realm.", chapter: "Chapter 2" },
  { title: "Laying On of Hands", desc: "Unveil the power and potential dangers of this foundational doctrine that transfers anointing, authority, and blessing.", chapter: "Chapter 3" },
  { title: "Resurrection of the Dead", desc: "The living hope that anchors every believer\u2019s faith \u2014 understanding the resurrection changes how you live today.", chapter: "Chapter 4" },
  { title: "Eternal Judgment", desc: "Every moment on earth carries weight in eternity. Understand the judgment that awaits and how it shapes your walk with God.", chapter: "Chapter 5" },
];

/* ─── Color constants ─── */
const DARK = {
  bg: "#1a0a0f",
  text: "#f5ede5",
  textMuted: "rgba(245,237,229,0.65)",
  textFaint: "rgba(245,237,229,0.4)",
  crimson: "#8b1a2b",
  crimsonLight: "#c0354d",
  gold: "#d4a855",
  goldSoft: "rgba(212,168,85,0.85)",
  teal: "#1a6b6b",
  cardBg: "rgba(26,10,15,0.7)",
  border: "rgba(139,26,43,0.3)",
};

const LIGHT = {
  bg: "#faf5ef",
  bgAlt: "#f2ebe0",
  text: "#2a1218",
  textMuted: "#5a3040",
  textFaint: "#8a6070",
  crimson: "#7a1525",
  crimsonBright: "#9b1d30",
  gold: "#9a7b30",
  cardBg: "#fff9f4",
  border: "#e5d5c5",
  maroonAccent: "#5a1a1a",
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center uj-animate-fadeIn">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>
      <div className="relative w-[90vw] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl uj-animate-fadeInUp">
        <video
          ref={videoRef}
          src={CDN.trailerVideo}
          className="w-full h-full object-cover"
          controls
          playsInline
          onEnded={onClose}
        />
      </div>
      <div className="absolute bottom-8 left-0 right-0 text-center uj-animate-fadeInUp" style={{ animationDelay: '1s' }}>
        <a href="#uj-pricing" onClick={onClose}>
          <button className="uj-crimson-gradient text-white font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-2xl inline-flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Get the Book Now
          </button>
        </a>
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function UjNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl shadow-lg" : "bg-transparent"}`}
      style={scrolled ? { background: "rgba(250,245,239,0.95)", borderBottom: `1px solid ${LIGHT.border}` } : {}}>
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src={CDN.ministryLogo} alt="OGN" width={40} height={40} className="h-10 w-auto" />
          <span className={`font-serif text-lg hidden sm:block transition-colors ${scrolled ? "text-[#2a1218]" : "text-white/90"} group-hover:text-[#9b1d30]`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Overcomers Global Network
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#uj-about" className={`text-sm transition-colors hidden md:block ${scrolled ? "text-[#5a3040] hover:text-[#9b1d30]" : "text-white/60 hover:text-[#c0354d]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}>About</a>
          <a href="#uj-preview" className={`text-sm transition-colors hidden md:block ${scrolled ? "text-[#5a3040] hover:text-[#9b1d30]" : "text-white/60 hover:text-[#c0354d]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}>Read</a>
          <a href="#uj-pricing">
            <button className="uj-crimson-gradient text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Get the Book
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO: Dark Crimson section ─── */
function HeroSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden uj-hero-bg">
      {/* Living Crimson Background Layers */}
      <div className="absolute inset-0 uj-hero-base" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${CDN.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        filter: 'saturate(0.9) brightness(0.9)',
      }} />
      <div className="absolute inset-0 uj-hero-warm-wash" />
      <div className="absolute inset-0 uj-hero-rays" />
      <div className="absolute bottom-0 left-0 right-0 h-[30%] uj-hero-mist" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] uj-hero-glow" />

      {/* Floating light particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full uj-particle"
            style={{
              width: `${2 + (i % 3) * 1.5}px`,
              height: `${2 + (i % 3) * 1.5}px`,
              left: `${(i * 7) % 100}%`,
              background: i % 3 === 0 ? 'rgba(192, 57, 43, 0.4)' : i % 3 === 1 ? 'rgba(212, 168, 85, 0.35)' : 'rgba(42, 138, 138, 0.3)',
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${15 + (i % 5) * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Top crimson accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10 uj-crimson-line" />

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Real Book Cover */}
          <div className="mb-12 uj-animate-fadeInUp" style={{ perspective: '1200px' }}>
            <div className="relative">
              <div className="absolute -inset-12 rounded-full uj-book-glow" />
              <div style={{ transform: 'rotateY(-5deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}>
                <Image
                  src={CDN.frontCover}
                  alt="The Ultimate Journey with Jesus Christ - Foundational Teachings Every Believer Needs by Joshua Matthews"
                  width={320}
                  height={460}
                  className="relative w-56 sm:w-64 md:w-72 rounded-lg uj-book-shadow"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-3xl uj-animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ border: '1px solid rgba(139,26,43,0.3)', background: 'rgba(139,26,43,0.08)' }}>
              <Shield className="h-3.5 w-3.5" style={{ color: DARK.crimsonLight }} />
              <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: DARK.crimsonLight, fontFamily: "'Inter', sans-serif" }}>Based on Hebrews 6:1-3</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              The Foundation
              <br />
              <span style={{ background: 'linear-gradient(135deg, #c0354d, #e8606a, #c0354d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every Believer Needs</span>
            </h1>

            <p className="text-xl sm:text-2xl italic leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              We must have a solid foundation laid before going on to perfection or into maturity with God.
            </p>

            <p className="text-sm mb-10" style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
              By <span className="font-medium" style={{ color: 'rgba(245,237,229,0.7)' }}>Prophet Joshua Matthews</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onWatchVideo}
                className="uj-hero-btn font-bold text-base px-10 py-4 rounded-full transition-all shadow-2xl inline-flex items-center justify-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Play className="h-5 w-5 fill-current" />
                Watch the Trailer
              </button>
              <a href="#uj-pricing">
                <button className="uj-crimson-gradient text-white font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(139,26,43,0.25)' }}>
                  Order Your Copy
                  <ArrowRight className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition: dark crimson to warm cream */}
      <div className="absolute bottom-0 left-0 right-0 h-40 uj-hero-fade-bottom" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ animation: 'uj-float-up 2s ease-in-out infinite alternate' }}>
        <ChevronDown className="h-6 w-6" style={{ color: 'rgba(245,237,229,0.3)' }} />
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
            <p className="text-center text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              A Cinematic Journey Through the Word
            </p>
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Watch the Book Trailer
            </h2>

            <div
              className="relative cursor-pointer group rounded-2xl overflow-hidden mx-auto"
              onClick={onWatchVideo}
              style={{ boxShadow: '0 8px 40px rgba(90,26,26,0.12)' }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden" style={{ border: `1px solid ${LIGHT.border}` }}>
                <Image
                  src={CDN.heroBg}
                  alt="The Ultimate Journey with Jesus Christ - Book Trailer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: 'rgba(139,26,43,0.25)', border: '2px solid rgba(139,26,43,0.5)' }}>
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 ml-1 text-white" fill="white" />
                  </div>
                  <p className="text-lg sm:text-xl text-white italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    &ldquo;The foundation is everything.&rdquo;
                  </p>
                  <p className="text-sm text-white/70 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Click to watch the full trailer
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
        background: 'radial-gradient(ellipse at 50% 30%, rgba(139,26,43,0.03) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] mb-6 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              A Word for Every Believer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Are You Building on the
              <span className="uj-crimson-text block mt-2">Right Foundation?</span>
            </h2>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              <p>
                Have you ever felt the desire to understand God&apos;s teachings but lacked the foundational knowledge to do so effectively? Have you wanted to guide fellow believers in righteousness but struggled to articulate the fundamental principles of Christ?
              </p>
              <p className="font-medium text-xl" style={{ color: LIGHT.text }}>
                You are not alone.
              </p>
              <p>
                Millions of believers are walking through their Christian journey without ever understanding the six foundational doctrines that Scripture says must be laid before we can go on to maturity. Without this foundation, the building cannot stand.
              </p>
              <p className="text-xl italic" style={{ color: LIGHT.crimson }}>
                &ldquo;According to the Bible in Hebrews 6:1-3, we must have a solid foundation laid before going on to perfection or into maturity with God.&rdquo;
              </p>
            </div>
            <div className="mt-10">
              <a href="#uj-lead-capture">
                <button className="uj-crimson-gradient text-white font-bold text-base px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(139,26,43,0.2)' }}>
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

/* ─── Six Pillars / What You'll Discover (light) ─── */
function PillarsSection() {
  return (
    <section id="uj-about" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              The Six Foundational Doctrines
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              What You Will Discover
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SIX_PILLARS.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="h-full group hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center" style={{ background: 'rgba(139,26,43,0.08)' }}>
                  <span className="text-lg font-bold" style={{ color: LIGHT.maroonAccent, fontFamily: "'Playfair Display', serif" }}>{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 transition-colors" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                <p className="text-xs uppercase tracking-wider" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>{item.chapter}</p>
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
        background: 'radial-gradient(ellipse at 70% 50%, rgba(139,26,43,0.03) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 font-medium text-center" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              About the Author
            </p>

            {/* Circle photo + signature quote */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
              <div className="relative shrink-0">
                <div className="absolute -inset-3 rounded-full" style={{
                  background: 'linear-gradient(135deg, rgba(139,26,43,0.2), rgba(154,123,48,0.15))',
                  filter: 'blur(12px)'
                }} />
                <Image
                  src={CDN.authorCircle}
                  alt="Prophet Joshua Matthews"
                  width={160}
                  height={160}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl"
                  style={{ border: '3px solid rgba(139,26,43,0.3)' }}
                />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
                  Prophet Joshua Matthews
                </h2>
                <p className="text-base italic mb-4" style={{ color: LIGHT.textFaint, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;Joshua the Leader of Many&rdquo;
                </p>
                <blockquote className="text-lg sm:text-xl italic leading-relaxed" style={{ color: LIGHT.crimson, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;The foundation is everything. Without it, the building cannot stand. Without it, the believer cannot grow.&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="space-y-4 leading-relaxed text-center sm:text-left" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
              <p>
                Prophet Joshua Matthews is a man called by God to lead nations into the deeper dimensions of His presence. As the founder of <strong style={{ color: LIGHT.text }}>Overcomers Global Network</strong>, he has dedicated his life to equipping believers with the tools and revelation needed to walk in the fullness of their divine assignment.
              </p>
              <p>
                With a prophetic mandate to educate, equip, and empower, Prophet Joshua Matthews carries a unique anointing that bridges the gap between head knowledge and heart experience. His teachings have transformed lives across the globe, and this book represents the foundational truths that every believer must understand.
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
    <section id="uj-preview" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
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
                  <BookOpen className="h-5 w-5" style={{ color: LIGHT.crimsonBright }} />
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
                    <a href="#uj-pricing">
                      <button className="uj-crimson-gradient text-white font-semibold rounded-full px-6 py-2.5 inline-flex items-center gap-2"
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
    <section id="uj-quotes" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a0f, #2a1018, #1a0a0f)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.12) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: DARK.crimsonLight, fontFamily: "'Inter', sans-serif" }}>
              Words That Transform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              From the Pages of The Ultimate Journey
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto text-center">
          <Quote className="h-10 w-10 mx-auto mb-6 opacity-30" style={{ color: DARK.crimsonLight }} />
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="text-2xl sm:text-3xl italic leading-relaxed transition-opacity duration-500"
              style={{ color: 'rgba(192,53,77,0.85)', fontFamily: "'Cormorant Garamond', serif" }} key={activeQuote}>
              &ldquo;{BOOK_QUOTES[activeQuote].text}&rdquo;
            </p>
          </div>
          <p className="text-sm mt-6 uppercase tracking-wider" style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
            &mdash; {BOOK_QUOTES[activeQuote].chapter} &middot; The Ultimate Journey
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {BOOK_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeQuote ? DARK.crimsonLight : 'rgba(139,26,43,0.3)',
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
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              Readers Around the World
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Lives Being Transformed
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Believers from every nation are being equipped through these foundational teachings.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="overflow-hidden shadow-md rounded-xl" style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
            <div className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-6 gap-1">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: LIGHT.crimsonBright }} />
                ))}
              </div>
              <Quote className="h-8 w-8 mx-auto mb-6 opacity-20" style={{ color: LIGHT.crimsonBright }} />
              <p className="text-lg sm:text-xl leading-relaxed mb-8 italic" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(139,26,43,0.08)' }}>
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
                style={{ background: i === active ? LIGHT.crimsonBright : 'rgba(139,26,43,0.3)' }}
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
                  border: `1px solid ${i === active ? 'rgba(139,26,43,0.4)' : LIGHT.border}`,
                  ...(i === active ? { boxShadow: '0 0 20px rgba(139,26,43,0.08)' } : {}),
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
                      <Star key={j} className="h-3 w-3 fill-current" style={{ color: LIGHT.crimsonBright }} />
                    ))}
                  </div>
                </div>
                <p className="text-sm italic uj-line-clamp-3" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>&ldquo;{t.text}&rdquo;</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Back Cover Section (light) ─── */
function BackCoverSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Back cover image */}
            <div className="shrink-0">
              <Image
                src={CDN.backCover}
                alt="The Ultimate Journey with Jesus Christ - Back Cover"
                width={280}
                height={400}
                className="rounded-lg shadow-xl"
                style={{ border: `1px solid ${LIGHT.border}` }}
              />
            </div>
            {/* Description */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
                What&apos;s Inside
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
                A Complete Guide to Spiritual Maturity
              </h2>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                <p>
                  This book covers the teachings of Christ and propels us toward the perfection or maturity desired by God. Inside, you will find insight into topics such as:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 shrink-0" style={{ color: LIGHT.crimsonBright }} />
                    <span>Unveiling the power and potential dangers of laying on hands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 shrink-0" style={{ color: LIGHT.crimsonBright }} />
                    <span>Exploring the proper and improper ways of baptism</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 shrink-0" style={{ color: LIGHT.crimsonBright }} />
                    <span>Harnessing the transformative power of prayer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-1 shrink-0" style={{ color: LIGHT.crimsonBright }} />
                    <span>Understanding repentance, resurrection, and eternal judgment</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a href="#uj-pricing">
                  <button className="uj-crimson-gradient text-white font-semibold rounded-full px-8 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}>
                    <Sparkles className="h-4 w-4" />
                    Get Your Copy Today
                  </button>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
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
    <section id="uj-pricing" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              Invest in Your Foundation
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
                  style={{ background: LIGHT.cardBg, borderColor: tier.popular ? LIGHT.crimsonBright : LIGHT.border, ...(tier.popular ? { boxShadow: '0 0 40px rgba(139,26,43,0.1)' } : {}) }}>
                  {tier.popular && (
                    <div className="uj-crimson-gradient text-white text-xs font-bold uppercase tracking-wider text-center py-1.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 text-center flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(139,26,43,0.08)' }}>
                      <Icon className="h-5 w-5" style={{ color: LIGHT.crimsonBright }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{tier.label}</h3>
                    <p className="text-sm mb-6" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{tier.description}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold uj-crimson-text" style={{ fontFamily: "'Playfair Display', serif" }}>${tier.price}</span>
                      <span className="text-sm ml-1" style={{ color: LIGHT.textFaint }}>USD</span>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleCheckout(tier.key)}
                        disabled={loading === tier.key}
                        className={`w-full rounded-full font-semibold py-3 transition-all ${tier.popular ? 'uj-crimson-gradient text-white hover:opacity-90' : ''}`}
                        style={!tier.popular ? { background: 'rgba(139,26,43,0.08)', color: LIGHT.text, fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
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
    <section id="uj-lead-capture" className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a0f, #2a1018, #1a0a0f)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.08) 0%, transparent 50%)'
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
              <Check className="h-14 w-14 mx-auto mb-4" style={{ color: DARK.crimsonLight }} />
              <h3 className="text-2xl font-semibold mb-2" style={{ color: DARK.text, fontFamily: "'Cormorant Garamond', serif" }}>Thank You!</h3>
              <p className="mb-6" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your free chapter is on its way. Check your inbox.</p>
              <a href="#uj-pricing">
                <button className="uj-crimson-gradient text-white font-semibold rounded-full px-8 py-3"
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
                <label htmlFor="uj-name" className="text-sm mb-1.5 block" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Name</label>
                <input
                  id="uj-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-red-500/30"
                  style={{ background: 'rgba(10,5,8,0.8)', border: `1px solid ${DARK.border}`, color: DARK.text, fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label htmlFor="uj-email" className="text-sm mb-1.5 block" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Email</label>
                <input
                  id="uj-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-red-500/30"
                  style={{ background: 'rgba(10,5,8,0.8)', border: `1px solid ${DARK.border}`, color: DARK.text, fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full uj-crimson-gradient text-white font-bold text-base py-4 rounded-full hover:opacity-90 transition-all"
                style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(139,26,43,0.2)' }}
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

/* ─── Final CTA (dark crimson) ─── */
function FinalCTA({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: '#0f0508' }}>
      <div className="absolute inset-0 opacity-[0.1]" style={{
        backgroundImage: `url(${CDN.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(3px)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.12) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              It Is Time to Build on the
              <span className="block mt-2" style={{ background: 'linear-gradient(135deg, #c0354d, #e8606a, #c0354d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Right Foundation</span>
            </h2>
            <p className="text-xl italic mb-10 max-w-2xl mx-auto" style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;As you read and apply these principles, your life and walk with God will receive an immediate change.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#uj-pricing">
                <button className="uj-crimson-gradient text-white font-bold text-lg px-12 py-4 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-3"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 40px rgba(139,26,43,0.25)' }}>
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
                Watch the Trailer
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Footer (light) ─── */
function UjFooter() {
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
          <div className="flex items-center gap-6">
            <Link href="/divineintimacy" className="text-sm hover:opacity-80 transition-opacity" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              Divine Intimacy
            </Link>
            <span style={{ color: LIGHT.border }}>|</span>
            <Link href="/" className="text-sm hover:opacity-80 transition-opacity" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              overcomersglobalnetwork.com
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>
              &copy; {new Date().getFullYear()} Prophet Joshua Matthews. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function UltimateJourneyClient() {
  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <UjNavbar />
      <HeroSection onWatchVideo={openVideo} />
      <VideoPreviewSection onWatchVideo={openVideo} />
      <SeoHookSection />
      <PillarsSection />
      <AuthorSection />
      <ChapterPreviewSection />
      <QuotesSection />
      <TestimonialsSection />
      <BackCoverSection />
      <PricingSection />
      <LeadCaptureSection />
      <FinalCTA onWatchVideo={openVideo} />
      <UjFooter />
      <VideoOverlay isOpen={videoOpen} onClose={closeVideo} />
    </div>
  );
}
