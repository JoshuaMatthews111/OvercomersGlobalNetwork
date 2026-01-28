'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

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

// Default blog posts - will be replaced by admin-created posts
const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Walking in Kingdom Authority',
    excerpt: 'Discover how to exercise the authority that Christ has given every believer in their daily walk.',
    content: '',
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
    content: '',
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
    content: '',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    author: 'Prophet Joshua Matthews',
    date: '2026-01-05',
    category: 'Finance',
    published: true,
  },
];

const categories = ['All', 'Teaching', 'Ministry', 'Finance', 'Testimony', 'Events'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('ogn-blog-posts');
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      if (parsed.length > 0) {
        // ALWAYS use admin posts if they exist
        setPosts(parsed.filter((p: BlogPost) => p.published));
      } else {
        // Only use defaults if no admin posts exist
        setPosts(defaultPosts.filter((p: BlogPost) => p.published));
      }
    } else {
      // Only use defaults if localStorage is empty
      setPosts(defaultPosts.filter((p: BlogPost) => p.published));
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && post.published;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Kingdom <span className="gold-shimmer">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Teachings, testimonies, and insights to help you grow in your walk with Christ
              and advance the Kingdom in your sphere of influence.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No posts found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Want to Stay Updated?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Follow us on social media for daily inspiration and the latest updates from Overcomers Global Network.
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
          >
            Connect With Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
