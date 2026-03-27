import type { Metadata } from 'next';
import DivineIntimacyClient from './DivineIntimacyClient';

export const metadata: Metadata = {
  title: 'Divine Intimacy – The Believer\'s Guide to Fellowship with God',
  description: 'A living revelation from God\'s heart to yours. Discover the keys to unlocking a dimension of fellowship with God that will transform every area of your life. By Prophet Joshua Matthews.',
  keywords: [
    'divine intimacy', 'fellowship with God', 'prophet joshua matthews',
    'christian book', 'spiritual growth', 'prayer', 'presence of God',
    'overcomers global network', 'discipleship', 'relationship with God',
    'hearing God', 'secret place', 'communion with God',
  ],
  alternates: { canonical: '/divineintimacy/' },
  openGraph: {
    title: 'Divine Intimacy – The Believer\'s Guide to Fellowship with God',
    description: 'God desires to speak to you. This is a living revelation from God\'s heart to yours.',
    url: 'https://overcomersglobalnetwork.com/divineintimacy/',
    images: [
      {
        url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/divine-intimacy-cover-2_e23ed17b.png',
        width: 600,
        height: 900,
        alt: 'Divine Intimacy Book Cover',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divine Intimacy – The Believer\'s Guide to Fellowship with God',
    description: 'God desires to speak to you. A living revelation from God\'s heart to yours.',
  },
};

export default function DivineIntimacyPage() {
  return <DivineIntimacyClient />;
}
