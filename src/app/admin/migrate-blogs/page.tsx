'use client';

import { useState, useEffect } from 'react';
import { addBlogPost, signInAdmin } from '@/lib/firebase';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const oldBlogPosts = [
  {
    title: 'THE REVELATION OF ADOPTION INTO THE AS NEW CREATIONS',
    slug: 'the-revelation-of-adoption-into-the-as-new-creations',
    excerpt: `Today's message is from Grace Matthews.\n\nWe've just released a powerful blog titled "The Revelation of Adoption: Into the New Creation."\nThis message will help you understand what it truly means to live as a son or daughter of God—not from fear, not from striving, but from inheritance.\n\nTake a few moments today to read the full post and allow the Word to strengthen your identity in Christ.- Grace Matthews`,
    content: `The revelation of adoption reveals the true meaning of becoming a new creation in Christ. Salvation is not simply the removal of sin; it is God bringing believers into His family. Adoption changes identity, position, and inheritance. Scripture declares that those who are in Christ are no longer strangers but children of God.\n"Therefore, if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." (2 Corinthians 5:17, KJV).\nTo be a new creation means the old identity has ended and a new life, rooted in sonship, has begun.\n\nThrough adoption, God is revealed not as a distant deity but as Father. This is why fear has no place in the life of a believer who understands their position in Christ. The Spirit confirms this relationship from within.\n"For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father." (Romans 8:15, KJV).\nAdoption removes anxiety and insecurity because children do not worry about provision or acceptance—they trust their Father. What belongs to the Father belongs to the child, and this truth anchors the believer in confidence and peace.\n\nAs new creations, believers are called to function from the Spirit, not the flesh. Sonship changes how we live, think, and pray. Those who belong to God are led by His Spirit, not driven by fear or survival instincts.\n"For as many as are led by the Spirit of God, they are the sons of God." (Romans 8:14, KJV).\nPrayer from sonship is not begging God for answers, but aligning with His will. The Spirit Himself helps us in our weakness, interceding beyond what words can express, guiding us into deeper communion with the Father.\n\nLiving as a new creation means learning to rest in inheritance rather than striving for acceptance. Heirs do not beg—they trust. Adoption establishes identity, and identity shapes behavior.\n"And if children, then heirs; heirs of God, and joint-heirs with Christ." (Romans 8:17, KJV).\nWhen believers understand adoption, they stop living like outsiders and begin walking as sons and daughters who are fully accepted, fully covered, and fully loved by God.`,
    coverImage: 'https://img.youtube.com/vi/wFBCrcAckig/maxresdefault.jpg',
    author: 'Prophet Joshua Matthews',
    authorUid: '',
    category: 'Teaching',
    tags: ['adoption', 'new creation', 'identity', 'sonship'],
    status: 'published' as const,
    publishedAt: '2026-01-27T12:00:00.000Z',
  },
  {
    title: '"The Revelation of Adoption: Into the New Creation."',
    slug: 'the-revelation-of-adoption-into-the-new-creation',
    excerpt: `Today's message is from Grace Matthews. We've just released a powerful blog titled "The Revelation of Adoption: Into the New Creation." This message will help you understand what it truly means to live as a son or daughter of God—not from fear, not from striving, but from inheritance. Take a few moments today to read the full post and allow the Word to strengthen your identity in Christ.- Grace Matthews`,
    content: `\n\nThe revelation of adoption reveals the true meaning of becoming a new creation in Christ. Salvation is not simply the removal of sin; it is God bringing believers into His family. Adoption changes identity, position, and inheritance. Scripture declares that those who are in Christ are no longer strangers but children of God. "Therefore, if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." (2 Corinthians 5:17, KJV). To be a new creation means the old identity has ended and a new life, rooted in sonship, has begun.\n\nThrough adoption, God is revealed not as a distant deity but as Father. This is why fear has no place in the life of a believer who understands their position in Christ. The Spirit confirms this relationship from within. "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father." (Romans 8:15, KJV). Adoption removes anxiety and insecurity because children do not worry about provision or acceptance—they trust their Father. What belongs to the Father belongs to the child, and this truth anchors the believer in confidence and peace.\n\nAs new creations, believers are called to function from the Spirit, not the flesh. Sonship changes how we live, think, and pray. Those who belong to God are led by His Spirit, not driven by fear or survival instincts. "For as many as are led by the Spirit of God, they are the sons of God." (Romans 8:14, KJV). Prayer from sonship is not begging God for answers, but aligning with His will. The Spirit Himself helps us in our weakness, interceding beyond what words can express, guiding us into deeper communion with the Father.\n\nLiving as a new creation means learning to rest in inheritance rather than striving for acceptance. Heirs do not beg—they trust. Adoption establishes identity, and identity shapes behavior. "And if children, then heirs; heirs of God, and joint-heirs with Christ." (Romans 8:17, KJV). When believers understand adoption, they stop living like outsiders and begin walking as sons and daughters who are fully accepted, fully covered, and fully loved by God.\n\n`,
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200',
    author: 'Prophet Joshua Matthews',
    authorUid: '',
    category: 'Message',
    tags: ['adoption', 'new creation', 'identity'],
    status: 'published' as const,
    publishedAt: '2026-01-28T12:00:00.000Z',
  },
  {
    title: 'The Beauty of God Revealed in Creation',
    slug: 'the-beauty-of-god-revealed-in-creation',
    excerpt: `The Beauty of God Revealed in Creation\n\nMessage Description:\nThis message reveals how the quality of our walk with God is shaped by His Spirit and our hunger to draw near to Him. Through the lens of relationship—not signs, performances, or outward appearances—we learn that God desires communion of the heart. As we understand His language and respond with faith, obedience, and love, we discover that God Himself is the greatest gift, and His beauty is revealed both in creation and in a life fully surrendered to Him.`,
    content: `Good morning, Overcomers.\n\nThe quality of your walk with God is determined firstly by the Spirit of God, and then by your hunger and willpower to advance toward Him.\n\nFor a moment, imagine two lovers.\n\nThe first lover makes up their mind that they will be committed to the journey with their partner no matter the state or condition they are in.\n\nThe second lover is slightly in love, but willing to get to know *why* their partner made such a choice. So they venture into a journey of relationship—speaking with the partner, understanding that the one they are in relationship with is far more advanced than themselves, and realizing that they must adjust to the level of the committed partner.\n\nThat is how our relationship with God is.\n\nThe Bible says:\n\n> **"Draw near to God, and He will draw near to you. Cleanse your hands, you sinners; and purify your hearts, you double-minded."**\n> — James 4:8\n\nWe must come closer to God not by waiting for some magical event, or basing our journey on signs or gifts that come *through* relationship. Many of us today base our walk with God on whether He performs or does something—but that is not how relationship is supposed to function.\n\nRelationship is supposed to function in a way where we see **God Himself as the gift**, and understand that this relationship is a privilege.\n\nAs the Scripture says:\n\n> **"Behold what manner of love the Father has bestowed on us, that we should be called children of God!"**\n> — 1 John 3:1\n\nOne may ask, *How can I draw near to God, the Lover of my soul?*\n\nYou must know that God—your friend, your lover—is not like any relationship you have witnessed in this material world. You must know His language.\n\nGod's language is the language of the *heart—the soul:( the mind, the will, and the emotions of man). What a man thinks, what he feels, and what he does is communication to God the Father.\n\nThe Bible says:\n\n"For the Lord does not see as man sees; for man looks at the outward appearance, but the Lord looks at the heart."**\n — 1 Samuel 16:7\n\nThis means you can speak to God *now*—in your mind—by thinking about Him, speaking to Him, and waiting to hear back, because we know He hears us.\n\nFor God is Spirit, and those who worship Him must worship in spirit and in truth:\n\n"God is Spirit, and those who worship Him must worship in spirit and truth." — John 4:24\n\n(Spirit—mind, will, and emotions; non-physical.)\n\nWhen you start with this first step—cleansing your mind by learning the ways of God through discipleship, and taking steps no matter how small you see them—you are drawing closer to God. And He said that He will draw closer to you.\n\n Prayer\n\nToday, say this:\n\nGod, I acknowledge that You know the thoughts of a man.\nYou look at my heart.\nPurify my mind to always be stayed on You.\nGod, I trust You, and I know You will keep me in perfect peace.\nAs I take a step in my journey with You, I am grateful for the gift of eternal life and to spend it with You.\nGuide my steps today.\nLead me not into temptation, and deliver me from evil.\nIn Jesus' name, amen.\n\n\nProphet Joshua Matthews\nOvercomers Global Network\n`,
    coverImage: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200',
    author: 'Prophet Joshua Matthews',
    authorUid: '',
    category: 'Message',
    tags: ['creation', 'relationship', 'prayer', 'discipleship'],
    status: 'published' as const,
    publishedAt: '2026-02-03T12:00:00.000Z',
  },
];

export default function MigrateBlogsPage() {
  const [migrating, setMigrating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('ogn-admin-auth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleMigrate = async () => {
    if (!isAuthenticated) {
      setResults(['❌ Please log in to the admin panel first']);
      return;
    }
    setMigrating(true);
    setResults([]);
    
    const newResults: string[] = [];
    
    for (const post of oldBlogPosts) {
      try {
        const result = await addBlogPost(post);
        if (result.success) {
          newResults.push(`✅ Added: "${post.title}" (ID: ${result.id})`);
        } else {
          const errorMsg = result.error instanceof Error ? result.error.message : JSON.stringify(result.error);
          newResults.push(`❌ Failed: "${post.title}" - ${errorMsg}`);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        newResults.push(`❌ Error: "${post.title}" - ${errorMsg}`);
      }
      setResults([...newResults]);
    }
    
    setMigrating(false);
    setCompleted(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/blog" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Blog Admin
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Migrate Old Blog Posts to Firebase</h1>
          <p className="text-gray-600 mb-6">
            This will add the 3 original blog posts to Firebase so they appear on the public website.
          </p>
          
          {!completed ? (
            <button
              onClick={handleMigrate}
              disabled={migrating}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 disabled:bg-amber-300"
            >
              {migrating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Migrating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Migrate 3 Blog Posts
                </>
              )}
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                <CheckCircle className="w-5 h-5" />
                Migration Complete!
              </div>
              <p className="text-green-600 text-sm">
                The blog posts have been added to Firebase. You can now view them on the public blog page.
              </p>
            </div>
          )}
          
          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-gray-900">Results:</h3>
              {results.map((result, idx) => (
                <p key={idx} className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">
                  {result}
                </p>
              ))}
            </div>
          )}
          
          {completed && (
            <div className="mt-6 flex gap-3">
              <Link
                href="/blog"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                View Public Blog
              </Link>
              <Link
                href="/admin/blog"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Go to Blog Admin
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
