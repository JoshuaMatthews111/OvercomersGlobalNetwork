import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Free resources from Overcomers Global Network. Download Bible studies, devotionals, teaching materials, and discipleship guides.',
  alternates: { canonical: '/resources/' },
  openGraph: {
    title: 'Resources | Overcomers Global Network',
    description: 'Download Bible studies, devotionals, teaching materials, and discipleship guides.',
    url: 'https://overcomersglobalnetwork.com/resources/',
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
