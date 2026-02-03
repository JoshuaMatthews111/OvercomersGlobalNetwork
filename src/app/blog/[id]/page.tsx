import BlogPostClient from './BlogPostClient';
import { getBlogPosts } from '@/lib/firebase';

// Generate static params from Firebase blog posts
export async function generateStaticParams() {
  try {
    const result = await getBlogPosts(true); // Get published posts
    if (result.success) {
      return result.posts.map((post) => ({
        id: post.firebaseId || '',
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  // Fallback to empty array if Firebase fails
  return [];
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}
