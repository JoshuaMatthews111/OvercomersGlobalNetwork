import BlogPostClient from './BlogPostClient';
import { getBlogPosts } from '@/lib/firebase';

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
