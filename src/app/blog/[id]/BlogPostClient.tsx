'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Link as LinkIcon, CheckCircle, Share2, Linkedin, Mail, MessageSquare, MapPin, Send, LogIn, Loader2 } from 'lucide-react';
import { getBlogPosts, getBlogPostById, type BlogPost as FirebaseBlogPost } from '@/lib/firebase';

interface BlogPost {
  id: string;
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
  postId: string;
  userId: string;
  userName: string;
  userLocation: string;
  content: string;
  createdAt: string;
}

export default function BlogPostClient({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        // Fetch the single post directly by document ID
        const postResult = await getBlogPostById(id);
        if (postResult.success && postResult.post && postResult.post.status === 'published') {
          const p = postResult.post;
          const mappedPost: BlogPost = {
            id: p.firebaseId || p.id || '',
            title: p.title,
            excerpt: p.excerpt,
            content: p.content,
            image: p.coverImage || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
            author: p.author,
            date: p.publishedAt || p.createdAt,
            category: p.category,
            published: true,
          };
          setPost(mappedPost);

          // Fetch related posts separately
          try {
            const allResult = await getBlogPosts(true);
            if (allResult.success) {
              const related = allResult.posts
                .filter((rp: FirebaseBlogPost) => rp.category === p.category && (rp.firebaseId || rp.id) !== id)
                .slice(0, 2)
                .map((rp: FirebaseBlogPost) => ({
                  id: rp.firebaseId || rp.id || '',
                  title: rp.title,
                  excerpt: rp.excerpt,
                  content: rp.content,
                  image: rp.coverImage || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
                  author: rp.author,
                  date: rp.publishedAt || rp.createdAt,
                  category: rp.category,
                  published: true,
                }));
              setRelatedPosts(related);
            }
          } catch (relatedError) {
            console.error('Error loading related posts:', relatedError);
          }
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      }
      setIsLoading(false);
    }

    loadPost();

    // Check if user is logged in
    const savedUser = localStorage.getItem('ogn-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load comments for this post
    const savedComments = localStorage.getItem('ogn-blog-comments');
    if (savedComments) {
      const allComments = JSON.parse(savedComments);
      const postComments = allComments.filter((c: Comment) => c.postId === id);
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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
            <p className="text-gray-500">Loading post...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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
