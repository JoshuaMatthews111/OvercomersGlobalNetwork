'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Link as LinkIcon, CheckCircle, Share2, Linkedin, Mail, MessageSquare, MapPin, Send, LogIn } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  published: boolean;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  location: string;
  avatar?: string;
  provider: 'google' | 'apple' | 'email';
  createdAt: string;
}

interface Comment {
  id: string;
  postId: number;
  userId: string;
  userName: string;
  userLocation: string;
  content: string;
  createdAt: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Walking in Kingdom Authority',
    excerpt: 'Discover how to exercise the authority that Christ has given every believer in their daily walk.',
    content: `The authority of the believer is one of the most powerful yet misunderstood truths in Scripture. Jesus declared in Matthew 28:18, "All authority in heaven and on earth has been given to me." And then He commissioned us to go in that same authority.

As believers, we are not merely observers in the spiritual realm—we are active participants with delegated authority from the King of Kings. This authority is not based on our own merit or strength, but on the finished work of Christ at Calvary.

**Understanding Your Position**

Ephesians 2:6 tells us that God "raised us up with Christ and seated us with him in the heavenly realms." This positional truth is foundational to walking in authority. You are seated far above all principalities and powers.

**Exercising Authority Daily**

1. **In Prayer** - Approach the throne of grace with boldness
2. **Over Circumstances** - Speak to mountains in faith
3. **Against the Enemy** - Resist the devil and he will flee
4. **In Ministry** - Heal the sick, cast out demons, proclaim the Gospel

The key is not trying to gain authority, but recognizing and exercising the authority you already have in Christ. Walk in it today!`,
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
    author: 'Prophet Joshua Matthews',
    date: '2026-01-15',
    category: 'Teaching',
    published: true,
  },
  {
    id: 2,
    title: 'The Power of House Churches',
    excerpt: 'Why the house church model is transforming communities and bringing revival to nations.',
    content: `The early church didn't meet in grand cathedrals or purpose-built facilities. They gathered in homes, breaking bread together, sharing life, and experiencing the power of God in intimate community.

Today, we're seeing a global return to this biblical model, and the results are extraordinary. House churches are multiplying across nations, reaching people who would never step foot in a traditional church building.

**Why House Churches Work**

The house church model offers several distinct advantages:

1. **Intimacy** - Small gatherings allow for deeper relationships and accountability
2. **Flexibility** - Meetings can adapt to the needs of the community
3. **Multiplication** - Easy to replicate and plant new groups
4. **Accessibility** - No building costs or barriers to entry
5. **Discipleship** - Natural environment for mentoring and growth

**The OGN Vision**

At Overcomers Global Network, we believe every believer can be a disciple-maker. Our house church network spans over 50 nations, with ordinary people doing extraordinary things for the Kingdom.

Whether you're in a high-rise apartment in New York or a village in Africa, you can start a house church. All you need is a heart for God and a willingness to gather others.

Join the movement. Start a house church in your community today.`,
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
    author: 'Prophet Joshua Matthews',
    date: '2026-01-10',
    category: 'Ministry',
    published: true,
  },
  {
    id: 3,
    title: 'Financial Freedom God\'s Way',
    excerpt: 'Biblical principles for managing your finances and walking in supernatural provision.',
    content: `God wants His children to prosper. 3 John 1:2 declares, "Beloved, I pray that you may prosper in all things and be in health, just as your soul prospers."

But prosperity in God's Kingdom looks different from the world's definition. It's not about accumulation for self—it's about stewardship for Kingdom purposes.

**Biblical Principles for Financial Freedom**

**1. Honor God First**
"Honor the Lord with your wealth, with the firstfruits of all your crops" (Proverbs 3:9). Tithing isn't about giving God a portion—it's about acknowledging that everything belongs to Him.

**2. Live Within Your Means**
"The borrower is slave to the lender" (Proverbs 22:7). Debt creates bondage. Freedom comes through discipline and contentment.

**3. Save and Invest Wisely**
"The wise store up choice food and olive oil, but fools gulp theirs down" (Proverbs 21:20). Building reserves honors God and prepares for opportunities.

**4. Give Generously**
"Give, and it will be given to you. A good measure, pressed down, shaken together and running over" (Luke 6:38). Generosity unlocks supernatural provision.

**5. Trust God as Your Source**
"And my God will meet all your needs according to the riches of his glory in Christ Jesus" (Philippians 4:19). Your job is not your source—God is.

Walk in these principles and watch God open the windows of heaven over your finances!`,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    author: 'Prophet Joshua Matthews',
    date: '2026-01-05',
    category: 'Finance',
    published: true,
  },
];

export default function BlogPostClient({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    const postId = parseInt(id);
    
    // Try to get posts from localStorage first
    const savedPosts = localStorage.getItem('ogn-blog-posts');
    let allPosts = defaultPosts;
    
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      if (parsed.length > 0) {
        allPosts = parsed;
      }
    }

    const foundPost = allPosts.find((p) => p.id === postId && p.published);
    setPost(foundPost || null);

    // Get related posts (same category, different post)
    if (foundPost) {
      const related = allPosts
        .filter((p) => p.category === foundPost.category && p.id !== foundPost.id && p.published)
        .slice(0, 2);
      setRelatedPosts(related);
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem('ogn-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load comments for this post
    const savedComments = localStorage.getItem('ogn-blog-comments');
    if (savedComments) {
      const allComments = JSON.parse(savedComments);
      const postComments = allComments.filter((c: Comment) => c.postId === postId);
      setComments(postComments.sort((a: Comment, b: Comment) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || !post) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: post.id,
      userId: user.id,
      userName: user.name,
      userLocation: user.location,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    const allComments = JSON.parse(localStorage.getItem('ogn-blog-comments') || '[]');
    allComments.unshift(comment);
    localStorage.setItem('ogn-blog-comments', JSON.stringify(allComments));
    
    setComments([comment, ...comments]);
    setNewComment('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';
  const shareText = post?.excerpt || '';

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Image */}
      <section className="pt-24">
        <div className="relative h-[50vh] md:h-[60vh]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <div className="max-w-3xl">
                <span className="bg-amber-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-li:text-gray-600">
              {post.content.split('\n\n').map((paragraph: string, index: number) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1.') || paragraph.startsWith('2.')) {
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                      {paragraph.split('\n').map((item: string, i: number) => (
                        <li key={i} className="text-gray-600">
                          {item.replace(/^\d+\.\s*\*\*/, '').replace(/\*\*/, ' - ')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900 font-bold text-lg">Share this message</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors font-medium"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors font-medium"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium"
                  >
                    {linkCopied ? <CheckCircle className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                    {linkCopied ? 'Link Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {post.author.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{post.author}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Founder of Overcomers Global Network, author, and international speaker dedicated to raising disciples and advancing the Kingdom of God across nations.
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                  Comments ({comments.length})
                </h3>
                {!user && (
                  <Link
                    href={`/auth?redirect=/blog/${post.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign in to Comment
                  </Link>
                )}
              </div>

              {/* Comment Form */}
              {user ? (
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </p>
                      </div>
                    </div>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <Link
                        href="/profile"
                        className="text-sm text-gray-600 hover:text-amber-600"
                      >
                        View Profile
                      </Link>
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                    {commentSubmitted && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Comment posted successfully!
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div className="mb-8 p-8 bg-gray-50 rounded-2xl text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Sign in to join the conversation</p>
                  <Link
                    href={`/auth?redirect=/blog/${post.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In or Create Account
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {comment.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-bold text-gray-900">{comment.userName}</p>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {comment.userLocation}
                                </span>
                                <span>•</span>
                                <span>{formatCommentDate(comment.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-amber-600 text-sm font-medium">{relatedPost.category}</span>
                    <h3 className="font-bold text-gray-900 mt-2 group-hover:text-amber-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
