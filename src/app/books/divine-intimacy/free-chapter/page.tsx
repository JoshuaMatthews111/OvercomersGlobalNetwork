'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Gift,
  Loader2,
  Heart,
  Lock,
  Mail,
  Download,
  Truck,
  ChevronDown
} from 'lucide-react';

export default function FreeChapterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const physicalPrice = 19.99;
  const ebookPrice = 9.99;

  const handleUnlock = async (e: React.FormEvent) => {
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
          source: 'free-chapter-preview',
        }),
      });
      
      const leads = JSON.parse(localStorage.getItem('ogn-book-leads') || '[]');
      leads.push({ email, firstName, book: 'Divine Intimacy', date: new Date().toISOString() });
      localStorage.setItem('ogn-book-leads', JSON.stringify(leads));
      
      setUnlocked(true);
    } catch (err) {
      setUnlocked(true);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleBuyPhysical = async () => {
    setIsLoading(true);
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

  const chapterContent = [
    {
      type: 'heading',
      content: 'CHAPTER ONE',
    },
    {
      type: 'subheading',
      content: 'THE CALL TO INTIMACY',
    },
    {
      type: 'quote',
      content: '"My son, go and write a book whereby men will learn to fellowship with me as you do. Teach them to commune with me that I may lead them in their daily affairs of life. They have not yet understood themselves and their role in life. Tell them to bring their troubles, and they shall be washed away. Tell them to cry no more tears, for I dwell inside them and we are one. I know all things which are needed for their lives. Teach them to come to me so they may receive what I have for them."',
    },
    {
      type: 'paragraph',
      content: 'These words came to me in a moment of deep communion with the Father. As I sat in His presence, He revealed to me the longing of His heart—a desire that burns within Him for every believer to experience the same intimacy that I have come to know.',
    },
    {
      type: 'paragraph',
      content: 'In this book, Divine Intimacy: The Believer\'s Guide to Fellowship with God, you\'ll find tools to transform your relationship with God, and you will be invited not only to read about Him but also to become acquainted with Him within ourselves.',
    },
    {
      type: 'scripture',
      content: 'Scripture reminds us in John 10:27, "My sheep hear my voice, and another they will not follow."',
    },
    {
      type: 'paragraph',
      content: 'The question is: Are you hearing His voice? Are you walking in the fellowship He designed for you?',
    },
    {
      type: 'paragraph',
      content: 'Many believers live their entire Christian lives without ever experiencing true intimacy with their Heavenly Father. They know about God, but they don\'t know Him. They read His Word, but they don\'t hear His voice. They attend church, but they\'ve never entered the secret place.',
    },
    {
      type: 'paragraph',
      content: 'This book is your invitation to something more. Something deeper. Something that will transform not just your prayer life, but your entire existence.',
    },
    {
      type: 'divider',
    },
    {
      type: 'subheading',
      content: 'THE HIGHER NATURE WITHIN',
    },
    {
      type: 'paragraph',
      content: 'Every believer carries within them a higher nature—the very Spirit of God dwelling inside. Yet most live as though they are spiritual orphans, reaching up to a distant God rather than communing with the One who lives within.',
    },
    {
      type: 'paragraph',
      content: 'The Apostle Paul wrote in Galatians 2:20, "I have been crucified with Christ and I no longer live, but Christ lives in me." This is not merely theological language—it is the reality of every born-again believer.',
    },
    {
      type: 'paragraph',
      content: 'When you understand this truth—that Christ dwells within you, that you are one with Him—everything changes. Prayer is no longer a religious duty but a conversation with your closest Friend. Worship is no longer performance but overflow. Life itself becomes an adventure of discovery as you learn to walk in constant communion with the Divine.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Navigation />

      {/* Book Reader Header */}
      <div className="fixed top-28 left-0 right-0 bg-[#1a1d29] z-40 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link 
              href="/books/divine-intimacy"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Book</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-white font-medium">Divine Intimacy</span>
              <span className="text-gray-500 text-sm">— Free Preview</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBuyEbook}
                disabled={isLoading}
                className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Get eBook ${ebookPrice}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kindle-Style Reader */}
      <section className="pt-48 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Book Cover Mini */}
            <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gray-200">
              <div className="relative w-24 h-36 flex-shrink-0">
                <Image
                  src="/images/books/divine-intimacy-cover-2.png"
                  alt="Divine Intimacy"
                  fill
                  className="object-contain rounded shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Divine Intimacy</h1>
                <p className="text-gray-600 mb-2">The Believer's Guide to Fellowship With God</p>
                <p className="text-amber-600 font-medium">by Joshua Matthews</p>
              </div>
            </div>

            {/* Chapter Content - Kindle Style */}
            <div className="prose prose-lg max-w-none">
              {chapterContent.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <h2 key={index} className="text-center text-gray-400 tracking-[0.3em] text-sm font-medium mb-2">
                      {block.content}
                    </h2>
                  );
                }
                if (block.type === 'subheading') {
                  return (
                    <h3 key={index} className="text-center text-3xl font-bold text-gray-900 mb-8">
                      {block.content}
                    </h3>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote key={index} className="border-l-4 border-amber-500 pl-6 py-2 my-8 italic text-gray-700 bg-amber-50/50 rounded-r-lg pr-6">
                      {block.content}
                    </blockquote>
                  );
                }
                if (block.type === 'scripture') {
                  return (
                    <p key={index} className="text-amber-700 font-medium my-6 text-center">
                      {block.content}
                    </p>
                  );
                }
                if (block.type === 'divider') {
                  return (
                    <div key={index} className="flex items-center justify-center gap-4 my-12">
                      <div className="w-16 h-px bg-gray-300" />
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <div className="w-16 h-px bg-gray-300" />
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                    {block.content}
                  </p>
                );
              })}
            </div>

            {/* Unlock Gate or Continue Reading */}
            {!unlocked ? (
              <div className="mt-16 relative">
                {/* Fade overlay */}
                <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-[#faf8f5] to-transparent pointer-events-none" />
                
                <div className="bg-gradient-to-r from-amber-50 to-purple-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
                  <Gift className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Continue Reading for Free
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Enter your email to unlock the rest of Chapter 1 and receive exclusive updates.
                  </p>
                  
                  <form onSubmit={handleUnlock} className="max-w-md mx-auto space-y-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isCapturing}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-4 rounded-xl font-bold transition-all"
                    >
                      {isCapturing ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking...</>
                      ) : (
                        <><Lock className="w-5 h-5" /> Unlock Full Chapter</>
                      )}
                    </button>
                  </form>
                  
                  <p className="text-gray-500 text-xs mt-4">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* More content after unlock */}
                <div className="prose prose-lg max-w-none mt-8">
                  <div className="flex items-center justify-center gap-4 my-12">
                    <div className="w-16 h-px bg-gray-300" />
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <div className="w-16 h-px bg-gray-300" />
                  </div>
                  
                  <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">
                    ENTERING THE SECRET PLACE
                  </h3>
                  
                  <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                    Jesus spoke of a secret place in Matthew 6:6: "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you."
                  </p>
                  
                  <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                    This secret place is not merely a physical location—though having a dedicated space for prayer is valuable. The secret place is a state of the heart, a posture of the soul, where you shut out the noise of the world and tune your spirit to the frequency of heaven.
                  </p>
                  
                  <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                    In the secret place, pretense falls away. Religious performance ceases. You come as you are—broken, hopeful, desperate, grateful—and you find that He receives you with open arms every single time.
                  </p>
                  
                  <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-8 italic text-gray-700 bg-amber-50/50 rounded-r-lg pr-6">
                    "As you explore this book and apply the practices it offers, you'll experience a transformation in your relationship with God, and your perception of life and your mission."
                  </blockquote>
                  
                  <p className="text-gray-800 leading-relaxed mb-6 text-lg font-serif">
                    Are you ready to step into Divine Intimacy? The journey begins now...
                  </p>
                </div>

                {/* End of Preview - Buy CTA */}
                <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    End of Free Preview
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Get the complete book to continue your journey into Divine Intimacy.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleBuyEbook}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-bold transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Get eBook (PDF) — ${ebookPrice}
                    </button>
                    <button
                      onClick={handleBuyPhysical}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold transition-all"
                    >
                      <Truck className="w-5 h-5" />
                      Get Physical Book — ${physicalPrice}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
