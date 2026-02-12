import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer Request',
  description: 'Submit a prayer request to Overcomers Global Network. Our prayer team is ready to stand in faith with you for breakthrough, healing, and guidance.',
  alternates: { canonical: '/prayer-request/' },
  openGraph: {
    title: 'Prayer Request | Overcomers Global Network',
    description: 'Submit a prayer request. Our prayer team is ready to stand in faith with you.',
    url: 'https://overcomersglobalnetwork.com/prayer-request/',
  },
};

export default function PrayerRequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
