import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule Prophet Joshua',
  description: 'Book Prophet Joshua Matthews for speaking engagements, conferences, revivals, and ministry events. Invite powerful prophetic ministry to your church or organization.',
  alternates: { canonical: '/schedule-prophet-joshua/' },
  openGraph: {
    title: 'Schedule Prophet Joshua | Overcomers Global Network',
    description: 'Book Prophet Joshua Matthews for speaking engagements, conferences, and ministry events.',
    url: 'https://overcomersglobalnetwork.com/schedule-prophet-joshua/',
  },
};

export default function ScheduleProphetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
