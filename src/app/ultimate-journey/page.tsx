import type { Metadata } from 'next';
import UltimateJourneyClient from './UltimateJourneyClient';

export const metadata: Metadata = {
  title: 'The Ultimate Journey with Jesus Christ – Foundational Teachings Every Believer Needs',
  description: 'Based on Hebrews 6:1-3, this book lays the six foundational doctrines every believer must understand: repentance, baptism, laying on of hands, resurrection, eternal judgment, and prayer. By Joshua Matthews.',
  keywords: [
    'ultimate journey with jesus christ', 'foundational teachings', 'joshua matthews',
    'christian book', 'hebrews 6', 'repentance', 'baptism', 'laying on of hands',
    'resurrection', 'eternal judgment', 'prayer', 'overcomers global network',
    'believer foundations', 'spiritual maturity', 'walk with God',
  ],
  alternates: { canonical: '/ultimate-journey/' },
  openGraph: {
    title: 'The Ultimate Journey with Jesus Christ – Foundational Teachings Every Believer Needs',
    description: 'We must have a solid foundation laid before going on to perfection or into maturity with God. Based on Hebrews 6:1-3.',
    url: 'https://overcomersglobalnetwork.com/ultimate-journey/',
    images: [
      {
        url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663410994003/YAE6K7i42cGNZ9sXAyVQVA/uj_front_cover_c618b686.png',
        width: 600,
        height: 900,
        alt: 'The Ultimate Journey with Jesus Christ Book Cover',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Journey with Jesus Christ – Foundational Teachings Every Believer Needs',
    description: 'We must have a solid foundation laid before going on to perfection or into maturity with God.',
  },
};

export default function UltimateJourneyPage() {
  return <UltimateJourneyClient />;
}
