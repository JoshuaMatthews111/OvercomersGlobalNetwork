'use client';

import './ultimate-journey.css';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  BookOpen, Download, Globe, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, Check, Star, Quote, Play, X, Cross, Shield, Flame, Heart, Eye, HandMetal, Zap
} from 'lucide-react';

/* ─── ScrollReveal ─── */
function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
    }}>
      {children}
    </div>
  );
}

/* ─── CDN Assets ─── */
const CDN = {
  bookCover: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ultimate_journey_cover_90c9f5e5.webp',
  heroBg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/uj_hero_bg_clean-Df9zPfFsRjTe9NKLmpCkbp.webp',
  authorPhoto: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/author_circle_centered_440deb32.png',
  trailerVideo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ultimate_journey_trailer_v2_c8003fc6.mp4',
  ministryLogo: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ministry-logo_3eb6c31c.png',
};

const MANUS_API_BASE = 'https://divine-intimacy-landing-page.manus.space';

/* ─── Color Palettes (crimson/maroon/teal matching book cover) ─── */
const DARK = {
  bg: '#1a0a0f',
  text: '#f5ede5',
  textMuted: 'rgba(245,237,229,0.65)',
  textFaint: 'rgba(245,237,229,0.4)',
  crimson: '#8b1a2b',
  crimsonLight: '#c0354d',
  gold: '#d4a855',
  goldSoft: 'rgba(212,168,85,0.85)',
  teal: '#1a6b6b',
  cardBg: 'rgba(26,10,15,0.7)',
  border: 'rgba(139,26,43,0.3)',
};

const LIGHT = {
  bg: '#faf5ef',
  bgAlt: '#f2ebe0',
  text: '#2a1218',
  textMuted: '#5a3040',
  textFaint: '#8a6070',
  crimson: '#7a1525',
  crimsonBright: '#9b1d30',
  gold: '#9a7b30',
  cardBg: '#fff9f4',
  border: '#e5d5c5',
};

/* ─── Content Data ─── */
const SIX_PILLARS = [
  { icon: Heart, title: 'Repentance from Dead Works', desc: 'Understand why our own works cannot save us and how turning to Christ alone restores our right standing with God.', hook: 'Your good deeds alone will never be enough.' },
  { icon: Shield, title: 'Faith Toward God', desc: 'Not religion. Not tradition. Living, breathing trust in the God who created you for relationship.', hook: 'Faith is not what you think it is.' },
  { icon: Flame, title: 'Doctrine of Baptisms', desc: 'Three baptisms explained — water, Holy Spirit, and fire. Each one transforms you at a deeper level.', hook: 'Most churches only teach one of three.' },
  { icon: HandMetal, title: 'Laying on of Hands', desc: 'The power and danger of physical touch in ministry — blessing, healing, impartation, and critical warnings.', hook: 'Be careful who lays hands on you.' },
  { icon: Zap, title: 'Resurrection of the Dead', desc: "Christ's victory over death lives inside every believer. The same power that raised Jesus dwells in you.", hook: 'Death has already been defeated.' },
  { icon: Eye, title: 'Eternal Judgment', desc: 'Every deed is recorded. Jesus took our judgment, but believers must live with eternal accountability.', hook: 'No one escapes the judgment of God.' },
];

const BOOK_QUOTES = [
  { text: 'We must have a solid foundation laid before going on to perfection or into maturity with God.', chapter: 'Introduction' },
  { text: 'Nothing else can grant us right standing with God — not our donations to the poor, going to church, or even reading the Bible.', chapter: 'Chapter 1' },
  { text: "God didn't leave humanity helpless. Hallelujah! He sent His Son, Jesus Christ, as the ultimate sacrifice.", chapter: 'Chapter 1' },
  { text: 'When a believer becomes immersed in the Holy Spirit, they are being filled not with just a force but the actual person of God.', chapter: 'Chapter 2' },
  { text: "The power in an individual's hand can either bless you or curse you.", chapter: 'Chapter 3' },
  { text: 'The same spirit which raised Jesus from the dead dwells in us.', chapter: 'Chapter 4' },
  { text: 'When you pray, fear and hopelessness will begin to leave you; your guilt and shame will dissipate.', chapter: 'Chapter 6' },
  { text: 'Talk to Him like a father and a friend. Express to Him your deepest feelings.', chapter: 'Chapter 6' },
];

const TESTIMONIALS = [
  { name: 'David Mensah', location: 'Accra, Ghana', text: 'This book gave me the clarity I have been searching for. After reading about baptism and the laying on of hands, I finally understood what I had been missing.', rating: 5, flag: '🇬🇭' },
  { name: 'Grace Okonkwo', location: 'Lagos, Nigeria', text: 'The chapter on repentance from dead works broke something open inside of me. I realized I had been trying to earn what Christ already paid for.', rating: 5, flag: '🇳🇬' },
  { name: 'Michael Thompson', location: 'Columbus, Ohio', text: 'I have been in church for twenty years and no one ever laid out the foundations like this. I bought copies for my entire Bible study group.', rating: 5, flag: '🇺🇸' },
  { name: 'Angela Rodriguez', location: 'Miami, Florida', text: 'The chapter on prayer alone is worth the entire book. My prayer life has been completely transformed.', rating: 5, flag: '🇺🇸' },
  { name: 'Samuel Adeyemi', location: 'Nairobi, Kenya', text: 'Every pastor should read this book. The teaching on laying on of hands opened my eyes to dangers I never considered.', rating: 5, flag: '🇰🇪' },
];

const CHAPTER_PREVIEW = {
  title: 'Chapter 1: Repentance from Dead Works',
  content: `Hebrews 6:1-3 tells us, "Therefore leaving the principles of the doctrine of Christ, let us go on unto perfection; not laying again the foundation of repentance from dead works, and of faith toward God, of the doctrine of baptisms, and of laying on of hands, and of the resurrection of the dead, and of eternal judgment. And this will we do, if God permits."

The first foundation that every believer needs to lay is repentance from dead works. You might wonder, what does it mean to repent from "dead works"? Essentially, it's about realizing that all of us, by our nature, have fallen short of the glory of God. As Romans 3:23 says, "For all have sinned, and come short of the glory of God," and no amount of work or effort can justify us before God.

However, when Adam and Eve disobeyed God in the Garden of Eden by eating from the tree of the knowledge of good and evil, they were banished from the Garden. This didn't just affect them but all of humanity because they were the first of our kind.

Imagine this: had Adam and Eve remained obedient, we would all be in Eden, in right standing, immortals doing the work of God, and manifesting the full expression of our divine abilities. However, that is not the case because they sinned, and we all bear the consequences of that fall.

However, God didn't leave humanity helpless. Hallelujah! He sent His Son, Jesus Christ, as the ultimate sacrifice. John 3:16-18 reads: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."

Nothing else can grant us right standing with God, not our donations to the poor, going to church, or even reading the Bible. According to Ephesians 2:8-9: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."`,
};

const PRICING = [
  { key: 'uj_ebook', price: 15, label: 'E-Book (PDF)', description: 'Instant digital download', icon: 'download', popular: true },
  { key: 'uj_physical_us', price: 20, label: 'Physical Book (US)', description: 'Free shipping within the USA', icon: 'book', popular: false },
  { key: 'uj_physical_intl', price: 25.99, label: 'Physical Book (International)', description: 'Worldwide shipping included', icon: 'globe', popular: false },
];

/* ─── Video Overlay ─── */
function VideoOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.92)' }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white z-50"><X className="h-8 w-8" /></button>
      <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
        <video src={CDN.trailerVideo} controls autoPlay className="w-full h-full rounded-xl" style={{ background: '#000' }} />
      </div>
    </div>
  );
}

/* ─── Navbar ─── */
function UjNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(26,10,15,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${DARK.border}` : 'none',
      }}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={CDN.ministryLogo} alt="OGN" width={32} height={32} className="h-8 w-auto" />
          <span className="text-sm font-medium hidden sm:inline" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
            Overcomers Global Network
          </span>
        </Link>
        <a href="#uj-pricing">
          <button className="uj-crimson-gradient text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Get the Book
          </button>
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — Clean, centered book cover, dark crimson
   ═══════════════════════════════════════════════════════════ */
function HeroSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden uj-hero-bg">
      <div className="absolute inset-0 uj-hero-base" />
      <div className="absolute inset-0" style={{ backgroundImage: `url(${CDN.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.55 }} />
      <div className="absolute inset-0 uj-hero-rays" />
      <div className="absolute inset-0 uj-hero-mist" />
      <div className="absolute inset-0 uj-hero-glow" />
      <div className="absolute inset-0 uj-hero-warm-wash" />

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute uj-particle rounded-full"
          style={{
            width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
            left: `${10 + Math.random() * 80}%`, bottom: '-5%',
            background: i % 3 === 0 ? 'rgba(212,168,85,0.4)' : 'rgba(139,26,43,0.3)',
            animationDelay: `${Math.random() * 15}s`, animationDuration: `${15 + Math.random() * 10}s`,
          }} />
      ))}

      <div className="container mx-auto px-4 pt-24 pb-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="uj-animate-fadeIn mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium"
              style={{ background: 'rgba(139,26,43,0.15)', border: `1px solid ${DARK.border}`, color: DARK.gold, fontFamily: "'Inter', sans-serif" }}>
              <Cross className="h-3 w-3" /> Based on Hebrews 6:1-3
            </span>
          </div>

          {/* Book cover — prominently centered */}
          <div className="uj-animate-scaleIn mb-10">
            <div className="relative">
              <div className="absolute -inset-8 uj-book-glow" />
              <Image src={CDN.bookCover} alt="The Ultimate Journey with Jesus Christ" width={280} height={420}
                className="relative z-10 rounded-lg uj-book-shadow" priority />
            </div>
          </div>

          {/* Title */}
          <div className="uj-animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              The Ultimate Journey
              <span className="block mt-2" style={{
                background: 'linear-gradient(135deg, #c0354d, #d4a855, #c0354d)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>with Jesus Christ</span>
            </h1>
          </div>

          <div className="uj-animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-3"
              style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              Foundational Teachings Every Believer Needs
            </p>
            <p className="text-base max-w-xl mx-auto mb-8"
              style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
              By Prophet Joshua Matthews
            </p>
          </div>

          <div className="uj-animate-fadeIn w-32 h-px uj-crimson-line mx-auto mb-8" style={{ animationDelay: '0.5s' }} />

          {/* Hook quote */}
          <div className="uj-animate-fadeInUp mb-10" style={{ animationDelay: '0.5s' }}>
            <p className="text-lg italic max-w-lg mx-auto"
              style={{ color: DARK.goldSoft, fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;If the foundations are destroyed, what can the righteous do?&rdquo;
              <span className="block text-sm mt-2 not-italic" style={{ color: DARK.textFaint }}>— Psalm 11:3</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="uj-animate-fadeInUp flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.6s' }}>
            <a href="#uj-pricing">
              <button className="uj-crimson-gradient text-white font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-3"
                style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 40px rgba(139,26,43,0.3)' }}>
                <Sparkles className="h-5 w-5" /> Get Your Copy
              </button>
            </a>
            <button onClick={onWatchVideo}
              className="uj-hero-btn font-semibold text-base px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif", border: `1px solid ${DARK.border}` }}>
              <Play className="h-5 w-5" /> Watch Trailer
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 uj-hero-fade-bottom" />
    </section>
  );
}

/* ═══ Video Trailer Section (light) ═══ */
function VideoPreviewSection({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              Watch the Trailer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              A Journey That Will Transform Your Faith
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl" onClick={onWatchVideo}
              style={{ border: `1px solid ${LIGHT.border}` }}>
              <video src={CDN.trailerVideo} muted playsInline className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(26,10,15,0.5)' }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(139,26,43,0.8)', boxShadow: '0 0 40px rgba(139,26,43,0.4)' }}>
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══ Hook Section — "The Problem" (light alt) ═══ */
function HookSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-6">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              The Problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Millions of Believers Are Missing the Foundation
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              They go to church every Sunday. They read their Bibles. They pray. But something is still missing.
              According to <strong style={{ color: LIGHT.crimson }}>Hebrews 6:1-3</strong>, God reveals
              <strong style={{ color: LIGHT.crimson }}> six foundational pillars</strong> that every believer must build upon
              before going on to spiritual maturity. Without them, your faith has no foundation.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center py-8" style={{ borderTop: `1px solid ${LIGHT.border}`, borderBottom: `1px solid ${LIGHT.border}` }}>
            <Quote className="h-8 w-8 mx-auto mb-4 opacity-30" style={{ color: LIGHT.crimsonBright }} />
            <p className="text-xl sm:text-2xl italic leading-relaxed" style={{ color: LIGHT.crimson, fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;We must have a solid foundation laid before going on to perfection or into maturity with God.&rdquo;
            </p>
            <p className="text-sm mt-3 uppercase tracking-wider" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>— Joshua Matthews</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="text-center mt-10">
            <a href="#uj-pillars">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:opacity-80"
                style={{ border: `1px solid ${LIGHT.border}`, color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
                Discover the 6 Pillars <ChevronDown className="h-4 w-4" />
              </button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══ Six Pillars Section (light) ═══ */
function PillarsSection() {
  return (
    <section id="uj-pillars" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              The Six Foundations of Christ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              What You&apos;ll Learn Inside
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Each chapter builds on the last, taking you from the basics to the depths of your faith.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SIX_PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={i}>
                <div className="h-full group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                  style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider font-bold mb-3"
                      style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>{p.hook}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,26,43,0.08)' }}>
                        <Icon className="h-5 w-5" style={{ color: LIGHT.crimsonBright }} />
                      </div>
                      <h3 className="text-lg font-semibold" style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{p.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: LIGHT.textMuted, fontFamily: "'Inter', sans-serif" }}>{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
        <ScrollReveal>
          <div className="text-center mt-12">
            <a href="#uj-pricing">
              <button className="uj-crimson-gradient text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}>
                <Sparkles className="h-4 w-4" /> Get the Book Now
              </button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══ Author Section (light alt) ═══ */
function AuthorSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.3em] mb-10 font-medium text-center" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
            About the Author
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 shadow-lg"
                style={{ border: `3px solid ${LIGHT.crimsonBright}` }}>
                <Image src={CDN.authorPhoto} alt="Prophet Joshua Matthews" width={112} height={112} className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
                  Prophet Joshua Matthews
                </h2>
                <p className="text-base italic mb-3" style={{ color: LIGHT.textFaint, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;Joshua the Leader of Many&rdquo;
                </p>
                <blockquote className="text-lg italic leading-relaxed" style={{ color: LIGHT.crimson, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;As you read and apply these principles, your life and walk with God will receive an immediate change.&rdquo;
                </blockquote>
              </div>
            </div>
            <div className="space-y-4 leading-relaxed text-center sm:text-left" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
              <p>
                Prophet Joshua Matthews is a man called by God to lead nations into the deeper dimensions of His presence. As the founder of <strong style={{ color: LIGHT.text }}>Overcomers Global Network</strong>, he has dedicated his life to equipping believers with the tools and revelation needed to walk in the fullness of their divine assignment.
              </p>
              <p>
                With a prophetic mandate to educate, equip, and empower, Prophet Joshua Matthews carries a unique anointing that bridges the gap between head knowledge and heart experience. His teachings have transformed lives across the globe, and this book distills the foundational truths every believer needs.
              </p>
            </div>
            <div className="mt-8 text-center sm:text-left">
              <Link href="/">
                <button className="rounded-full px-6 py-2.5 transition-all inline-flex items-center gap-2"
                  style={{ border: `1px solid ${LIGHT.border}`, color: LIGHT.textMuted, fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                  Visit overcomersglobalnetwork.com <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══ Chapter Preview (light) ═══ */
function ChapterPreviewSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="uj-preview" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bg }}>
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
                  {CHAPTER_PREVIEW.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                  {!expanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: `linear-gradient(to top, ${LIGHT.cardBg}, transparent)` }} />
                  )}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <button onClick={() => setExpanded(!expanded)} className="rounded-full px-6 py-2.5 inline-flex items-center gap-2"
                    style={{ border: `1px solid ${LIGHT.border}`, color: LIGHT.textMuted, fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                    {expanded ? <><ChevronUp className="h-4 w-4" /> Show Less</> : <><ChevronDown className="h-4 w-4" /> Read Full Chapter</>}
                  </button>
                  {expanded && (
                    <a href="#uj-pricing">
                      <button className="uj-crimson-gradient text-white font-semibold rounded-full px-6 py-2.5 inline-flex items-center gap-2"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                        <Sparkles className="h-4 w-4" /> Get the Full Book
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

/* ═══ Quotes Section (Dark crimson accent) ═══ */
function QuotesSection() {
  const [activeQuote, setActiveQuote] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveQuote((p) => (p + 1) % BOOK_QUOTES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a0f, #2a0f18, #1a0a0f)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.12) 0%, transparent 60%)' }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: DARK.gold, fontFamily: "'Inter', sans-serif" }}>
              Words That Transform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              From the Pages of This Book
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
            — {BOOK_QUOTES[activeQuote].chapter}
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {BOOK_QUOTES.map((_, i) => (
              <button key={i} onClick={() => setActiveQuote(i)} className="h-2 rounded-full transition-all duration-300"
                style={{ background: i === activeQuote ? DARK.gold : 'rgba(139,26,43,0.4)', width: i === activeQuote ? '24px' : '8px' }} />
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="#uj-pricing">
            <button className="uj-crimson-gradient text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              I Want This Book <ArrowRight className="h-4 w-4" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══ Testimonials (light alt) ═══ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              What Readers Are Saying
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Lives Being Transformed
            </h2>
          </div>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto mb-12">
          <div className="overflow-hidden shadow-md rounded-xl" style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
            <div className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-6 gap-1">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: LIGHT.gold }} />
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
              <button key={i} onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-8' : 'w-2.5 opacity-40 hover:opacity-60'}`}
                style={{ background: i === active ? LIGHT.crimsonBright : 'rgba(139,26,43,0.3)' }} />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i}>
              <div className={`hover:shadow-md transition-all duration-300 cursor-pointer rounded-xl p-5 ${i === active ? 'ring-1' : ''}`}
                style={{
                  background: LIGHT.cardBg, border: `1px solid ${i === active ? 'rgba(139,26,43,0.4)' : LIGHT.border}`,
                  ...(i === active ? { boxShadow: '0 0 20px rgba(139,26,43,0.08)' } : {}),
                }} onClick={() => setActive(i)}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{t.flag}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: LIGHT.text, fontFamily: "'Inter', sans-serif" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{t.location}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-current" style={{ color: LIGHT.gold }} />
                    ))}
                  </div>
                </div>
                <p className="text-sm italic uj-line-clamp-3" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ Pricing Section (light) ═══ */
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
      if (result?.url) window.open(result.url, '_blank');
      else if (result?.message) alert(result.message);
    } catch { alert('Something went wrong. Please try again.'); }
    finally { setLoading(null); }
  };

  const iconMap: Record<string, typeof Download> = { download: Download, book: BookOpen, globe: Globe };

  return (
    <section id="uj-pricing" className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
              Invest in Your Foundation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Get Your Copy Today
            </h2>
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
                      style={{ fontFamily: "'Inter', sans-serif" }}>Most Popular</div>
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
                      <button onClick={() => handleCheckout(tier.key)} disabled={loading === tier.key}
                        className={`w-full rounded-full font-semibold py-3 transition-all ${tier.popular ? 'uj-crimson-gradient text-white hover:opacity-90' : ''}`}
                        style={!tier.popular ? { background: 'rgba(139,26,43,0.06)', color: LIGHT.text, fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}>
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

/* ═══ Lead Capture (dark crimson) ═══ */
function LeadCaptureSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { alert('Please fill in all fields.'); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${MANUS_API_BASE}/api/trpc/leads.capture`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: { name: name.trim(), email: email.trim() } }),
      });
      if (res.ok) setSubmitted(true);
      else alert('Something went wrong. Please try again.');
    } catch { alert('Something went wrong. Please try again.'); }
    finally { setSubmitting(false); }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a0a0f, #2a0f18, #1a0a0f)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.1) 0%, transparent 50%)' }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
                Get a Free Chapter
              </h2>
              <p style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
                Enter your details and receive Chapter 1 — &ldquo;Repentance from Dead Works&rdquo; — straight to your inbox.
              </p>
            </div>
          </ScrollReveal>
          {submitted ? (
            <div className="p-10 rounded-2xl text-center" style={{ background: DARK.cardBg, border: `1px solid ${DARK.border}` }}>
              <Check className="h-14 w-14 mx-auto mb-4" style={{ color: DARK.gold }} />
              <h3 className="text-2xl font-semibold mb-2" style={{ color: DARK.text, fontFamily: "'Cormorant Garamond', serif" }}>Thank You!</h3>
              <p className="mb-6" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your free chapter is on its way.</p>
              <a href="#uj-pricing">
                <button className="uj-crimson-gradient text-white font-semibold rounded-full px-8 py-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Get the Full Book Now
                </button>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-2xl backdrop-blur-sm"
              style={{ background: DARK.cardBg, border: `1px solid ${DARK.border}` }}>
              <div>
                <label htmlFor="uj-name" className="text-sm mb-1.5 block" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Name</label>
                <input id="uj-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name"
                  className="w-full rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-red-500/30"
                  style={{ background: 'rgba(10,5,8,0.8)', border: `1px solid ${DARK.border}`, color: DARK.text, fontFamily: "'Inter', sans-serif" }} />
              </div>
              <div>
                <label htmlFor="uj-email" className="text-sm mb-1.5 block" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Email</label>
                <input id="uj-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"
                  className="w-full rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-red-500/30"
                  style={{ background: 'rgba(10,5,8,0.8)', border: `1px solid ${DARK.border}`, color: DARK.text, fontFamily: "'Inter', sans-serif" }} />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full uj-crimson-gradient text-white font-bold text-base py-4 rounded-full hover:opacity-90 transition-all"
                style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 30px rgba(139,26,43,0.25)' }}>
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

/* ═══ Final CTA (dark crimson) ═══ */
function FinalCTA({ onWatchVideo }: { onWatchVideo: () => void }) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: '#1a0a0f' }}>
      <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `url(${CDN.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(3px)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.12) 0%, transparent 60%)' }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6" style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              Your Foundation
              <span className="block mt-2" style={{
                background: 'linear-gradient(135deg, #c0354d, #d4a855, #c0354d)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Starts Here</span>
            </h2>
            <p className="text-xl italic mb-10 max-w-2xl mx-auto"
              style={{ color: DARK.goldSoft, fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;As you read and apply these principles, your life and walk with God will receive an immediate change.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#uj-pricing">
                <button className="uj-crimson-gradient text-white font-bold text-lg px-12 py-4 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-3"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 40px rgba(139,26,43,0.3)' }}>
                  <Sparkles className="h-5 w-5" /> Begin Your Journey Today
                </button>
              </a>
              <button onClick={onWatchVideo}
                className="font-semibold text-base px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
                style={{ border: `1px solid ${DARK.border}`, color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
                <Play className="h-5 w-5" /> Watch the Trailer
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══ Footer (light) ═══ */
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
          <div className="text-center md:text-right">
            <Link href="/" className="text-sm hover:opacity-80 transition-opacity" style={{ color: LIGHT.crimsonBright, fontFamily: "'Inter', sans-serif" }}>
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

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════ */
export default function UltimateJourneyClient() {
  const [videoOpen, setVideoOpen] = useState(false);
  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <UjNavbar />
      <HeroSection onWatchVideo={openVideo} />
      <VideoPreviewSection onWatchVideo={openVideo} />
      <HookSection />
      <PillarsSection />
      <AuthorSection />
      <ChapterPreviewSection />
      <QuotesSection />
      <TestimonialsSection />
      <PricingSection />
      <LeadCaptureSection />
      <FinalCTA onWatchVideo={openVideo} />
      <UjFooter />
      <VideoOverlay isOpen={videoOpen} onClose={closeVideo} />
    </div>
  );
}
