'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BlogPostClient from './blog/[id]/BlogPostClient';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const pathname = usePathname();
  const [blogId, setBlogId] = useState<string | null>(null);

  useEffect(() => {
    // Check if this is a blog post URL: /blog/SOMEID or /blog/SOMEID/
    const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
    if (match && match[1]) {
      setBlogId(match[1]);
    }
  }, [pathname]);

  // If this is a blog URL, render the blog post client directly
  if (blogId) {
    return <BlogPostClient id={blogId} />;
  }

  // For all other 404s, show a standard not-found page
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
