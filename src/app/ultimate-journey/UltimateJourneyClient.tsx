'use client';

import './ultimate-journey.css';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  BookOpen, Download, Globe, Mail, ChevronDown, ChevronUp,
  Sparkles, ArrowRight, Check, Star, Quote, Play, X, Cross, Shield, Flame, Heart, Eye, HandMetal
} from 'lucide-react';

/* ─── ScrollReveal wrapper ─── */
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
  bookCover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ultimate_journey_cover_90c9f5e5.webp",
  authorCircle: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/author_circle_centered_440deb32.png",
  ministryLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/ministry-logo_3eb6c31c.png",
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/uj_hero_bg-cbhD54kykb8PLfV3YCxDUN.webp",
};

/* ─── Manus Backend API URL (for Stripe & leads) ─── */
const MANUS_API_BASE = "https://divine-intimacy-landing-page.manus.space";

/* ─── Data ─── */
const TESTIMONIALS = [
  { name: "David Mensah", location: "Accra, Ghana", flag: "🇬🇭", text: "This book gave me the clarity I have been searching for. I was saved for years but never understood the foundations properly. After reading about baptism and the laying on of hands, I finally understood what I had been missing in my walk with God.", rating: 5 },
  { name: "Grace Okonkwo", location: "Lagos, Nigeria", flag: "🇳🇬", text: "Prophet Joshua writes with such authority and simplicity. The chapter on repentance from dead works broke something open inside of me. I realized I had been trying to earn what Christ already paid for. This book is a must-read for every new believer.", rating: 5 },
  { name: "Michael Thompson", location: "Columbus, Ohio, USA", flag: "🇺🇸", text: "I have been in church for twenty years and no one ever laid out the foundations like this. The section on eternal judgment was a wake-up call. I bought copies for my entire Bible study group.", rating: 5 },
  { name: "Angela Rodriguez", location: "Miami, Florida, USA", flag: "🇺🇸", text: "The chapter on prayer alone is worth the entire book. Prophet Joshua reminded me that prayer is not about sounding spiritual — it is about talking to God like a father and friend. My prayer life has been completely transformed.", rating: 5 },
  { name: "Samuel Adeyemi", location: "Nairobi, Kenya", flag: "🇰🇪", text: "Every pastor should read this book. The teaching on laying on of hands opened my eyes to dangers I never considered. This is the kind of foundational teaching the church desperately needs.", rating: 5 },
  { name: "Patricia Williams", location: "Baltimore, Maryland, USA", flag: "🇺🇸", text: "I was a new believer feeling overwhelmed by all the different teachings out there. This book gave me a clear roadmap based on Hebrews 6:1-3. Now I know exactly what foundations I need to lay in my life.", rating: 5 },
];

const BOOK_QUOTES = [
  { text: "We must have a solid foundation laid before going on to perfection or into maturity with God.", chapter: "Introduction" },
  { text: "Nothing else can grant us right standing with God, not our donations to the poor, going to church, or even reading the Bible.", chapter: "Chapter 1" },
  { text: "God didn't leave humanity helpless. Hallelujah! He sent His Son, Jesus Christ, as the ultimate sacrifice.", chapter: "Chapter 1" },
  { text: "Baptism in water is not merely a ritual but a powerful experience of cleansing and transformation.", chapter: "Chapter 2" },
  { text: "When a believer becomes immersed in the Holy Spirit, they are being filled not with just a force but the actual person of God.", chapter: "Chapter 2" },
  { text: "The power in an individual's hand can either bless you or curse you.", chapter: "Chapter 3" },
  { text: "The same spirit which raised Jesus from the dead dwells in us.", chapter: "Chapter 4" },
  { text: "Prayer is the key that will enable you to receive the strength to perform everything written in this book.", chapter: "Chapter 6" },
  { text: "When you pray, fear and hopelessness will begin to leave you; your guilt and shame will dissipate.", chapter: "Chapter 6" },
  { text: "Talk to Him like a father and a friend, express to Him your deepest feelings.", chapter: "Chapter 6" },
];

const CHAPTER_PREVIEW = {
  title: "Chapter 1: Repentance from Dead Works and Faith toward God",
  content: `Hebrews 6:1-3 tells us, "Therefore leaving the principles of the doctrine of Christ, let us go on unto perfection; not laying again the foundation of repentance from dead works, and of faith toward God, of the doctrine of baptisms, and of laying on of hands, and of the resurrection of the dead, and of eternal judgment. And this will we do, if God permits."

The first foundation that every believer needs to lay is repentance from dead works. You might wonder, what does it mean to repent from "dead works"? Essentially, it's about realizing that all of us, by our nature, have fallen short of the glory of God. As Romans 3:23 in the KJV says, "For all have sinned, and come short of the glory of God," and no amount of work or effort can justify us before God.

However, when Adam and Eve disobeyed God in the Garden of Eden by eating from the tree of the knowledge of good and evil, they were banished from the Garden. This didn't just affect them but all of humanity because they were the first of our kind. They were in a position of immortality and right standing with God but fell from their position due to their disobedience.

Imagine this: had Adam and Eve remained obedient, we would all be in Eden, in right standing, immortals doing the work of God, and manifesting the full expression of our divine abilities. However, that is not the case because they sinned, and we all bear the consequences of that fall.

However, God didn't leave humanity helpless. Hallelujah! He sent His Son, Jesus Christ, as the ultimate sacrifice. John 3:16-18 reads: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."

Nothing else can grant us right standing with God, not our donations to the poor, going to church, or even reading the Bible. According to Ephesians 2:8-9: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."

So, there is only one way for a person to be in right standing with God, and it is through belief in His Son, Jesus the Christ, and His death, burial, and resurrection. As we believe and repent, we are saved from the impending judgment that was to come upon humanity, and we become a new creation.`,
};

const PRICING = [
  { key: "uj_ebook", price: 15, label: "E-Book (PDF)", description: "Instant digital download", icon: "download", popular: true },
  { key: "uj_physical_us", price: 20, label: "Physical Book (US)", description: "Free shipping within the USA", icon: "book", popular: false },
  { key: "uj_physical_intl", price: 25.99, label: "Physical Book (International)", description: "Worldwide shipping included", icon: "globe", popular: false },
];

const FOUNDATIONS = [
  { title: "Repentance from Dead Works", desc: "Understand why our own works cannot save us and how faith in Jesus Christ alone restores our right standing with God.", icon: Heart },
  { title: "Doctrine of Baptisms", desc: "Three types of baptism explained — water, Holy Spirit, and fire. Each holds profound spiritual significance.", icon: Flame },
  { title: "Laying on of Hands", desc: "The power and danger of physical touch in ministry — blessing, healing, impartation, and critical warnings.", icon: HandMetal },
  { title: "Resurrection of the Dead", desc: "Christ's victory over death gives believers dominion. The power of resurrection lives inside every believer.", icon: Cross },
  { title: "Eternal Judgment", desc: "God judges by His laws, every deed is recorded. Understand the eternal significance of our earthly lives.", icon: Eye },
  { title: "Prayer", desc: "The essential practice that empowers everything else. Talk to God like a father and friend.", icon: Shield },
];

/* ─── Color constants ─── */
const DARK = {
  bg: "#1a0a0f",
  text: "#f0e8e5",
  textMuted: "rgba(240,232,229,0.6)",
  textFaint: "rgba(240,232,229,0.4)",
  gold: "#d4af37",
  goldSoft: "rgba(212,175,55,0.85)",
  crimson: "#8b1a2b",
  cardBg: "rgba(26,10,15,0.6)",
  border: "rgba(100,40,50,0.4)",
};

const LIGHT = {
  bg: "#f5f0e8",
  bgAlt: "#ede7db",
  text: "#2a1a1e",
  textMuted: "#5a3d42",
  textFaint: "#8a6b70",
  gold: "#8b6914",
  goldBright: "#a07d1c",
  crimson: "#7a1525",
  cardBg: "#faf7f2",
  border: "#ddd5c5",
};

/* ─── Navbar ─── */
function UjNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(26,10,15,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(100,40,50,0.2)' : 'none',
      }}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src={CDN.ministryLogo} alt="OGN" width={32} height={32} className="h-8 w-auto" />
          <span className="text-sm font-medium hidden sm:inline" style={{ color: DARK.text, fontFamily: "'Inter', sans-serif" }}>
            Overcomers Global Network
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <a href="#uj-foundations" className="text-sm hidden md:inline-block transition-colors hover:opacity-80"
            style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
            Foundations
          </a>
          <a href="#uj-preview" className="text-sm hidden md:inline-block transition-colors hover:opacity-80"
            style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
            Free Chapter
          </a>
          <a href="#uj-pricing">
            <button className="uj-crimson-gradient text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Get the Book
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Section (dark crimson) ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden uj-hero-bg">
      {/* Background layers */}
      <div className="absolute inset-0 uj-hero-base" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${CDN.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
      }} />
      <div className="absolute inset-0 uj-hero-rays" />
      <div className="absolute inset-0 uj-hero-warm-wash" />
      <div className="absolute bottom-0 left-0 right-0 h-40 uj-hero-fade-bottom" />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="absolute uj-particle rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-5%',
            background: i % 3 === 0 ? 'rgba(212,175,55,0.4)' : 'rgba(139,26,43,0.3)',
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="uj-animate-fadeInUp">
              <p className="text-sm uppercase tracking-[0.3em] mb-6 font-medium"
                style={{ color: DARK.gold, fontFamily: "'Inter', sans-serif" }}>
                Based on Hebrews 6:1-3
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
                The Ultimate Journey
                <span className="block mt-2" style={{
                  background: 'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  with Jesus Christ
                </span>
              </h1>
              <p className="text-lg sm:text-xl mb-3 italic"
                style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                Foundational Teachings Every Believer Needs
              </p>
              <p className="text-base mb-8 max-w-lg mx-auto lg:mx-0"
                style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
                A clear, scriptural roadmap for laying the six foundations of Christ in your life — from repentance to prayer. Your walk with God will receive an immediate change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#uj-pricing">
                  <button className="uj-crimson-gradient text-white font-bold text-base px-10 py-4 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-3"
                    style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 40px rgba(139,26,43,0.3)' }}>
                    <Sparkles className="h-5 w-5" />
                    Get Your Copy Now
                  </button>
                </a>
                <a href="#uj-preview">
                  <button className="uj-hero-btn font-semibold text-base px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Inter', sans-serif", border: '1px solid rgba(100,40,50,0.4)' }}>
                    <BookOpen className="h-5 w-5" />
                    Read Free Chapter
                  </button>
                </a>
              </div>
              <p className="text-sm mt-6" style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
                By <strong style={{ color: DARK.gold }}>Joshua Matthews</strong> &middot; Author &amp; Minister
              </p>
            </div>
          </div>

          {/* Right: Book cover */}
          <div className="flex-shrink-0 relative uj-animate-scaleIn">
            <div className="absolute inset-0 -m-8 uj-book-glow rounded-full" />
            <div className="relative uj-book-shadow rounded-lg overflow-hidden" style={{ width: 280 }}>
              <Image
                src={CDN.bookCover}
                alt="The Ultimate Journey with Jesus Christ Book Cover"
                width={280}
                height={420}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SEO Hook Section (light) ─── */
function SeoHookSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] mb-6 font-medium"
              style={{ color: LIGHT.crimson, fontFamily: "'Inter', sans-serif" }}>
              The Foundation Every Believer Needs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
              style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Have You Ever Felt the Desire to Understand God&rsquo;s Teachings but Lacked the Foundational Knowledge?
            </h2>
            <div className="h-px w-24 mx-auto mb-8 uj-gold-line" />
            <p className="text-lg leading-relaxed mb-6"
              style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              According to the Bible in Hebrews 6:1-3, we must have a solid foundation laid before going on to perfection or into maturity with God. This book covers the teachings of Christ and propels us toward the perfection or maturity desired by God.
            </p>
            <p className="text-lg leading-relaxed"
              style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              Different churches teach different things. Many believers search for guidance but few find a clear, scriptural roadmap. <strong style={{ color: LIGHT.text }}>This book lays down those clear foundations</strong> based on the Spirit of Christ and the Holy Bible.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Six Foundations Section (light) ─── */
function FoundationsSection() {
  return (
    <section id="uj-foundations" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: LIGHT.crimson, fontFamily: "'Inter', sans-serif" }}>
              Six Pillars of Hebrews 6:1-3
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              The Foundations You Will Lay
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Each chapter equips you with scriptural understanding and practical steps for your walk with God.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {FOUNDATIONS.map((f, i) => {
            const Icon = f.icon;
            return (
              <ScrollReveal key={i}>
                <div className="h-full rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(122,21,37,0.08)' }}>
                    <Icon className="h-5 w-5" style={{ color: LIGHT.crimson }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2"
                    style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed"
                    style={{ color: LIGHT.textMuted, fontFamily: "'Inter', sans-serif" }}>
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Author Section (light) ─── */
function AuthorSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {/* Circle photo + quote row */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg"
                  style={{ border: `3px solid ${LIGHT.crimson}` }}>
                  <Image src={CDN.authorCircle} alt="Prophet Joshua Matthews" width={112} height={112}
                    className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
                  Prophet Joshua Matthews
                </h2>
                <p className="text-base italic mb-4"
                  style={{ color: LIGHT.textFaint, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;Joshua the Leader of Many&rdquo;
                </p>
                <blockquote className="text-lg sm:text-xl italic leading-relaxed"
                  style={{ color: LIGHT.crimson, fontFamily: "'Cormorant Garamond', serif" }}>
                  &ldquo;I dedicate this material to the Almighty Spirit of Christ, His children, and my disciples. This book is devoted to your spiritual upliftment and fortification.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 leading-relaxed text-center sm:text-left"
              style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
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
    <section id="uj-preview" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: LIGHT.crimson, fontFamily: "'Inter', sans-serif" }}>
              Free Chapter Preview
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Begin Your Journey Now
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Read the first chapter right here. Experience the power of this book before you purchase.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden shadow-lg rounded-xl"
              style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-8 pb-6"
                  style={{ borderBottom: `1px solid ${LIGHT.border}` }}>
                  <BookOpen className="h-5 w-5" style={{ color: LIGHT.crimson }} />
                  <h3 className="text-xl font-semibold"
                    style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>
                    {CHAPTER_PREVIEW.title}
                  </h3>
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
      style={{ background: 'linear-gradient(180deg, #1a0a0f, #2a0f15, #1a0a0f)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.12) 0%, transparent 60%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: DARK.gold, fontFamily: "'Inter', sans-serif" }}>
              Words That Transform
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold"
              style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              From the Pages of The Ultimate Journey
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
          <p className="text-sm mt-6 uppercase tracking-wider"
            style={{ color: DARK.textFaint, fontFamily: "'Inter', sans-serif" }}>
            — {BOOK_QUOTES[activeQuote].chapter} &middot; The Ultimate Journey
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {BOOK_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeQuote ? DARK.gold : 'rgba(139,26,43,0.4)',
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
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bg }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: LIGHT.crimson, fontFamily: "'Inter', sans-serif" }}>
              Readers Around the World
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
              Lives Being Transformed
            </h2>
            <p style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }} className="max-w-xl mx-auto">
              Believers from every nation are building their foundations through these pages.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="overflow-hidden shadow-md rounded-xl"
            style={{ background: LIGHT.cardBg, border: `1px solid ${LIGHT.border}` }}>
            <div className="p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-6 gap-1">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" style={{ color: LIGHT.goldBright }} />
                ))}
              </div>
              <Quote className="h-8 w-8 mx-auto mb-6 opacity-20" style={{ color: LIGHT.crimson }} />
              <p className="text-lg sm:text-xl leading-relaxed mb-8 italic"
                style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(122,21,37,0.08)' }}>
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
                style={{ background: i === active ? LIGHT.crimson : 'rgba(122,21,37,0.3)' }}
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
                  border: `1px solid ${i === active ? 'rgba(122,21,37,0.4)' : LIGHT.border}`,
                  ...(i === active ? { boxShadow: '0 0 20px rgba(122,21,37,0.06)' } : {}),
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
                <p className="text-sm italic uj-line-clamp-3" style={{ color: LIGHT.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>&ldquo;{t.text}&rdquo;</p>
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
    <section id="uj-pricing" className="py-24 sm:py-32 relative overflow-hidden" style={{ background: LIGHT.bgAlt }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              style={{ color: LIGHT.crimson, fontFamily: "'Inter', sans-serif" }}>
              Invest in Your Foundation
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: LIGHT.text, fontFamily: "'Playfair Display', serif" }}>
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
                  style={{ background: LIGHT.cardBg, borderColor: tier.popular ? LIGHT.crimson : LIGHT.border, ...(tier.popular ? { boxShadow: '0 0 40px rgba(122,21,37,0.08)' } : {}) }}>
                  {tier.popular && (
                    <div className="uj-crimson-gradient text-white text-xs font-bold uppercase tracking-wider text-center py-1.5"
                      style={{ fontFamily: "'Inter', sans-serif" }}>
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 text-center flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                      style={{ background: 'rgba(122,21,37,0.06)' }}>
                      <Icon className="h-5 w-5" style={{ color: LIGHT.crimson }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-1"
                      style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>{tier.label}</h3>
                    <p className="text-sm mb-6"
                      style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>{tier.description}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold uj-crimson-text"
                        style={{ fontFamily: "'Playfair Display', serif" }}>${tier.price}</span>
                      <span className="text-sm ml-1" style={{ color: LIGHT.textFaint }}>USD</span>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleCheckout(tier.key)}
                        disabled={loading === tier.key}
                        className={`w-full rounded-full font-semibold py-3 transition-all ${tier.popular ? 'uj-crimson-gradient text-white hover:opacity-90' : ''}`}
                        style={!tier.popular ? { background: 'rgba(122,21,37,0.06)', color: LIGHT.text, fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
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
      style={{ background: 'linear-gradient(180deg, #1a0a0f, #2a0f15, #1a0a0f)' }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(139,26,43,0.08) 0%, transparent 50%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
                Get Your Free Chapter
              </h2>
              <p style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
                Enter your details below and receive Chapter 1 delivered straight to your inbox.
              </p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <div className="p-10 rounded-2xl text-center"
              style={{ background: DARK.cardBg, border: `1px solid ${DARK.border}` }}>
              <Check className="h-14 w-14 mx-auto mb-4" style={{ color: DARK.gold }} />
              <h3 className="text-2xl font-semibold mb-2"
                style={{ color: DARK.text, fontFamily: "'Cormorant Garamond', serif" }}>Thank You!</h3>
              <p className="mb-6" style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
                Your free chapter is on its way. Check your inbox.
              </p>
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
                <label htmlFor="uj-name" className="text-sm mb-1.5 block"
                  style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Name</label>
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
                <label htmlFor="uj-email" className="text-sm mb-1.5 block"
                  style={{ color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>Your Email</label>
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
function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: '#0f0508' }}>
      <div className="absolute inset-0 opacity-[0.08]" style={{
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
            <h2 className="text-3xl sm:text-5xl font-bold mb-6"
              style={{ color: DARK.text, fontFamily: "'Playfair Display', serif" }}>
              Lay Your
              <span className="block mt-2" style={{
                background: 'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Foundation</span>
            </h2>
            <p className="text-xl italic mb-10 max-w-2xl mx-auto"
              style={{ color: DARK.textMuted, fontFamily: "'Cormorant Garamond', serif" }}>
              &ldquo;If the foundations are destroyed, what can the righteous do? It is time to build on the rock of Christ.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#uj-pricing">
                <button className="uj-crimson-gradient text-white font-bold text-lg px-12 py-4 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-3"
                  style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 40px rgba(139,26,43,0.3)' }}>
                  <Sparkles className="h-5 w-5" />
                  Begin Your Journey Today
                </button>
              </a>
              <a href="#uj-preview">
                <button className="font-semibold text-base px-8 py-4 rounded-full transition-all inline-flex items-center justify-center gap-2"
                  style={{ border: `1px solid ${DARK.border}`, color: DARK.textMuted, fontFamily: "'Inter', sans-serif" }}>
                  <BookOpen className="h-5 w-5" />
                  Read Free Chapter
                </button>
              </a>
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
              <p className="text-sm font-semibold"
                style={{ color: LIGHT.text, fontFamily: "'Cormorant Garamond', serif" }}>Overcomers Global Network</p>
              <p className="text-xs"
                style={{ color: LIGHT.textFaint, fontFamily: "'Inter', sans-serif" }}>Educate. Equip. Empower.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/divineintimacy" className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: LIGHT.crimson, fontFamily: "'Inter', sans-serif" }}>
              Divine Intimacy
            </Link>
            <Link href="/" className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: LIGHT.goldBright, fontFamily: "'Inter', sans-serif" }}>
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
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <UjNavbar />
      <HeroSection />
      <SeoHookSection />
      <FoundationsSection />
      <AuthorSection />
      <ChapterPreviewSection />
      <QuotesSection />
      <TestimonialsSection />
      <PricingSection />
      <LeadCaptureSection />
      <FinalCTA />
      <UjFooter />
    </div>
  );
}
