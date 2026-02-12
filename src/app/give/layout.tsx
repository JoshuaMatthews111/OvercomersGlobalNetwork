import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Give',
  description: 'Support the mission of Overcomers Global Network. Your generous donations help advance discipleship, house churches, and kingdom work worldwide.',
  alternates: { canonical: '/give/' },
  openGraph: {
    title: 'Give | Overcomers Global Network',
    description: 'Your generous donations help advance discipleship, house churches, and kingdom work worldwide.',
    url: 'https://overcomersglobalnetwork.com/give/',
  },
};

export default function GiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
