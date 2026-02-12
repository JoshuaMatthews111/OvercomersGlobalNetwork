import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ask the Prophet',
  description: 'Submit your questions to Prophet Joshua Matthews. Receive biblical guidance, prophetic insight, and spiritual counsel from Overcomers Global Network.',
  alternates: { canonical: '/ask-the-prophet/' },
  openGraph: {
    title: 'Ask the Prophet | Overcomers Global Network',
    description: 'Submit your questions and receive biblical guidance and prophetic insight.',
    url: 'https://overcomersglobalnetwork.com/ask-the-prophet/',
  },
};

export default function AskTheProphetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
