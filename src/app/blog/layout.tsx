import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles, teachings, and insights from Overcomers Global Network. Topics on discipleship, faith, ministry, and kingdom living.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Blog | Overcomers Global Network',
    description: 'Read the latest articles, teachings, and insights on discipleship, faith, ministry, and kingdom living.',
    url: 'https://overcomersglobalnetwork.com/blog/',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
