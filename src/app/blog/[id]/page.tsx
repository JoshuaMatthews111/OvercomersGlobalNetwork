import BlogPostClient from './BlogPostClient';

// Generate static params for all possible blog post IDs
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogPostClient id={id} />;
}
