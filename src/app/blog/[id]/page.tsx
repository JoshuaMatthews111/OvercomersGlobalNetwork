import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import { getBlogPosts, getBlogPostById } from '@/lib/firebase';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const result = await getBlogPostById(id);
    if (result.success && result.post) {
      const post = result.post;
      return {
        title: post.title,
        description: post.excerpt || `Read "${post.title}" on Overcomers Global Network blog.`,
        alternates: { canonical: `/blog/${id}/` },
        openGraph: {
          title: post.title,
          description: post.excerpt || `Read "${post.title}" on Overcomers Global Network blog.`,
          url: `https://overcomersglobalnetwork.com/blog/${id}/`,
          type: 'article',
          publishedTime: post.publishedAt || post.createdAt,
          authors: [post.author],
          images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt || `Read "${post.title}" on Overcomers Global Network blog.`,
          images: post.coverImage ? [post.coverImage] : [],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  return {
    title: 'Blog Post',
    description: 'Read this article on Overcomers Global Network blog.',
  };
}

// Pre-build all known published posts at build time
export async function generateStaticParams() {
  try {
    const result = await getBlogPosts(false);
    if (result.success) {
      return result.posts.map((post) => ({
        id: post.firebaseId || '',
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  return [];
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}
