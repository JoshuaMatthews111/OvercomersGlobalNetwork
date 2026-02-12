import BlogPostClient from './BlogPostClient';
import { getBlogPosts } from '@/lib/firebase';

// Allow any blog post ID to be rendered, not just pre-built ones
export const dynamicParams = true;

// Pre-build known published posts at build time
export async function generateStaticParams() {
  try {
    const result = await getBlogPosts(true);
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
