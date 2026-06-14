import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AppConsole } from './AppConsole';

export const metadata: Metadata = {
  title: 'OGN App',
  description: 'Live Overcomers Global Network app command center for broadcasts, messages, prayer, chat, and evangelism follow-up.',
  alternates: { canonical: '/app/' },
  openGraph: {
    title: 'OGN App | Overcomers Global Network',
    description: 'Manage and preview the live OGN mobile app experience.',
    url: 'https://overcomersglobalnetwork.com/app/',
  },
};

export default function AppPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <AppConsole />
      <Footer />
    </main>
  );
}
