'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Heart, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Quote, 
  Sparkles,
  Users,
  Gift,
  ShoppingCart,
  Loader2,
  Download,
  BookMarked,
  ChevronRight,
  Mail,
  Lock,
  Eye,
  Truck,
  FileText,
  X
} from 'lucide-react';

export default function DivineIntimacyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'physical' | 'ebook' | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);

  const physicalPrice = 19.99;
  const ebookPrice = 9.99;

  const handleBuyPhysical = async () => {
    setIsLoading(true);
    setLoadingType('physical');
    
    const cartItem = {
      id: 5,
      title: 'Divine Intimacy (Physical Book)',
      subtitle: "The Believer's Guide to Fellowship With God",
      price: physicalPrice,
      cover: '/images/books/divine-intimacy-cover-2.png',
      quantity: 1,
      type: 'physical',
    };
    
    localStorage.setItem('ogn-cart', JSON.stringify([cartItem]));
    window.location.href = '/checkout';
  };

  const handleBuyEbook = async () => {
    setIsLoading(true);
    setLoadingType('ebook');
    
    const cartItem = {
      id: 6,
      title: 'Divine Intimacy (eBook PDF)',
      subtitle: "The Believer's Guide to Fellowship With God - Digital Download",
      price: ebookPrice,
      cover: '/images/books/divine-intimacy-cover-2.png',
      quantity: 1,
      type: 'ebook',
      downloadUrl: '/books/divine-intimacy.pdf',
    };
    
    localStorage.setItem('ogn-cart', JSON.stringify([cartItem]));
    localStorage.setItem('ogn-pending-download', '/books/divine-intimacy.pdf');
    window.location.href = '/checkout';
  };

  const handleCaptureLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCapturing(true);
    
    try {
      await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          book: 'Divine Intimacy',
          source: 'landing-page',
        }),
      });
      
      const leads = JSON.parse(localStorage.getItem('ogn-book-leads') || '[]');
      leads.push({ email, firstName, book: 'Divine Intimacy', date: new Date().toISOString() });
      localStorage.setItem('ogn-book-leads', JSON.stringify(leads));
      
      setCaptured(true);
    } catch (err) {
      setCaptured(true);
    } finally {
      setIsCapturing(false);
    }
  };

  const discoveries = [
    "The higher nature inside every believer",
    "The believers' oneness with God",
    "How to understand the language of the Spirit of God",
    "Constructing your life and plans by the voice of God",
    "How to see in the Spirit",
    "The Divine mystery of Christ within you",
    "Christ-centered meditations for intimacy",
  ];

  const chapterPreviewText = `CHAPTER ONE: THE CALL TO INTIMACY

"My son, go and write a book whereby men will learn to fellowship with me as you do. Teach them to commune with me that I may lead them in their daily affairs of life. They have not yet understood themselves and their role in life. Tell them to bring their troubles, and they shall be washed away. Tell them to cry no more tears, for I dwell inside them and we are one. I know all things which are needed for their lives. Teach them to come to me so they may receive what I have for them."

These words came to me in a moment of deep communion with the Father. As I sat in His presence, He revealed to me the longing of His heart—a desire that burns within Him for every believer to experience the same intimacy that I have come to know.

In this book, Divine Intimacy: The Believer's Guide to Fellowship with God, you'll find tools to transform your relationship with God, and you will be invited not only to read about Him but also to become acquainted with Him within ourselves.

Scripture reminds us in John 10:27, "My sheep hear my voice, and another they will not follow."

The question is: Are you hearing His voice? Are you walking in the fellowship He designed for you?

Many believers live their entire Christian lives without ever experiencing true intimacy with their Heavenly Father. They know about God, but they don't know Him. They read His Word, but they don't hear His voice. They attend church, but they've never entered the secret place.

This book is your invitation to something more. Something deeper. Something that will transform not just your prayer life, but your entire existence.

As you explore this book and apply the practices it offers, you'll experience a transformation in your relationship with God, and your perception of life and your mission.

Are you ready to step into Divine Intimacy?`;

  const testimonials = [
    {
      name: "Sister Grace M.",
      location: "Atlanta, GA",
      text: "This book completely transformed my prayer life. I went from feeling distant from God to experiencing His presence daily.",
    },
    {
      name: "Brother David K.",
      location: "London, UK",
      text: "Divine Intimacy gave me the keys to unlock a deeper relationship with the Father. Every chapter is filled with revelation.",
    },
    {
      name: "Pastor Sarah T.",
      location: "Lagos, Nigeria",
      text: "I've read many books on prayer, but none have impacted me like this one. It's now required reading for our leadership team.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Kindle-Style Chapter Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#faf8f5] rounded-2xl overflow-hidden shadow-2xl">
            <div className="sticky top-0 bg-[#1a1d29] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span className="text-white font-semibold">Free Preview — Chapter 1</span>
              </div>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 md:p-12 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Divine Intimacy</h1>
                <p className="text-gray-500 mb-8 italic">The Believer's Guide to Fellowship With God</p>
                <div className="whitespace-pre-line text-gray-800 leading-relaxed font-serif text-lg">
                  {chapterPreviewText}
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-500 mb-4">Continue reading...</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleBuyEbook}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Get eBook — ${ebookPrice}
                    </button>
                    <button
                      onClick={handleBuyPhysical}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      <Truck className="w-5 h-5" />
                      Get Physical Book — ${physicalPrice}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Staged Book Display */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
        {/* Cosmic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0c11] to-blue-900/30" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/books/divine-intimacy-cover-1.png')] bg-cover bg-center opacity-10 blur-sm" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Compelling Copy */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 rounded-full px-5 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">A Divine Mandate From Heaven</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="shimmer-text">Divine</span>
                <br />
                <span className="text-white">Intimacy</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light italic">
                "Teach them to commune with me that I may lead them in their daily affairs of life..."
              </p>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                God spoke these words directly to Prophet Joshua Matthews, commissioning this book to help believers 
                experience the same fellowship he enjoys with the Father. <strong className="text-white">Are you ready to transform 
                your relationship with God?</strong>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">5.0 • 127 Reviews</span>
                <span className="text-gray-600">|</span>
                <span className="text-green-400 text-sm">✓ 5,000+ Copies Sold</span>
              </div>

              {/* Purchase Options */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBuyPhysical}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50"
                  >
                    {isLoading && loadingType === 'physical' ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      <>
                        <Truck className="w-5 h-5" />
                        <div className="text-left">
                          <div>Physical Book</div>
                          <div className="text-sm opacity-80">${physicalPrice} + Shipping</div>
                        </div>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleBuyEbook}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50"
                  >
                    {isLoading && loadingType === 'ebook' ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <div className="text-left">
                          <div>eBook (PDF)</div>
                          <div className="text-sm opacity-80">${ebookPrice} • Instant Download</div>
                        </div>
                      </>
                    )}
                  </button>
                </div>
                
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center justify-center gap-2 border-2 border-white/20 hover:border-amber-500/50 text-white hover:text-amber-400 px-6 py-4 rounded-xl font-semibold transition-all"
                >
                  <Eye className="w-5 h-5" />
                  Read Chapter 1 Free
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 justify-center lg:justify-start text-gray-500 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-500" />
                  <span>Ships Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-500" />
                  <span>Instant PDF Access</span>
                </div>
              </div>
            </div>

            {/* Right: Staged Book Display */}
            <div className="relative flex justify-center order-1 lg:order-2">
              <div className="relative">
                {/* Main Book - 3D Effect */}
                <div className="relative w-[320px] h-[480px] transform perspective-1000 hover:rotate-y-[-5deg] transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-purple-500/40 blur-[60px] scale-110" />
                  <Image
                    src="/images/books/divine-intimacy-cover-2.png"
                    alt="Divine Intimacy Book Cover"
                    fill
                    className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(201,162,74,0.4)]"
                    priority
                  />
                </div>
                
                {/* Floating Quote Card */}
                <div className="absolute -bottom-8 -left-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 max-w-[280px] shadow-2xl">
                  <Quote className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="text-white text-sm italic leading-relaxed">
                    "Tell them to cry no more tears, for I dwell inside them and we are one."
                  </p>
                  <p className="text-amber-400 text-xs font-semibold mt-2">— The Father's Words</p>
                </div>

                {/* Best Seller Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-12 z-20">
                  ⭐ BEST SELLER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divine Quote Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-900/30 via-[#1a1d29] to-purple-900/30 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-amber-400/50 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl text-white font-light italic leading-relaxed mb-4">
              "My son, go and write a book whereby men will learn to fellowship with me as you do."
            </p>
            <p className="text-amber-400 font-semibold">— The Lord's Commission to Prophet Joshua Matthews</p>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-24 bg-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-amber-400 tracking-[0.3em] text-sm uppercase mb-4">Through The Pages</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">What You'll Discover</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  As you explore this book and apply the practices it offers, you'll experience a transformation 
                  in your relationship with God, and your perception of life and your mission.
                </p>
                
                <div className="space-y-4">
                  {discoveries.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                      </div>
                      <p className="text-gray-300 text-lg">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-full h-[600px]">
                  <Image
                    src="/images/books/divine-intimacy-cover-1.png"
                    alt="Divine Intimacy Back Cover"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-[#0a0c11] to-[#1a1d29]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-amber-400 tracking-[0.3em] text-sm uppercase mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Lives Transformed</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/30 transition-all"
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-24 bg-[#1a1d29]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-amber-900/30 to-purple-900/30 border border-amber-500/20 rounded-3xl p-8 md:p-12">
              {captured ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-4">You're In!</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Check your email at <strong className="text-amber-400">{email}</strong> for exclusive content 
                    and updates about Divine Intimacy.
                  </p>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold transition-all"
                  >
                    <Eye className="w-5 h-5" />
                    Read Chapter 1 Now
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Gift className="w-12 h-12 text-amber-400 mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Get Chapter 1 Free + Exclusive Updates
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Enter your details below to receive the first chapter of Divine Intimacy 
                      and be the first to know about new releases, teachings, and special offers.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Lock className="w-4 h-4" />
                      <span>We respect your privacy. Unsubscribe anytime.</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleCaptureLead} className="space-y-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isCapturing}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-5 rounded-xl font-bold text-lg transition-all disabled:opacity-50"
                    >
                      {isCapturing ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                      ) : (
                        <><Mail className="w-5 h-5" /> Get Free Chapter</>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="shimmer-text">Begin Your Journey Today</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Don't settle for a distant relationship with God. Discover the intimacy He designed you to experience. 
              Order your copy of Divine Intimacy now and start walking in deeper fellowship with your Heavenly Father.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleBuyPhysical}
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50"
              >
                <BookOpen className="w-5 h-5" />
                Order Physical Book — ${physicalPrice}
              </button>
              
              <button
                onClick={handleBuyEbook}
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                Get eBook (PDF) — ${ebookPrice}
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              100% Satisfaction Guaranteed • Secure Stripe Checkout • Ships within 3-5 business days
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
