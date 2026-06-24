import type { Metadata } from 'next';

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
  const commandCenterUrl = 'https://og-nweb.vercel.app/app/';

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071B45] px-6 text-center text-white">
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace(${JSON.stringify(commandCenterUrl)});` }} />
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-200">OGN App Command Center</p>
        <h1 className="mt-4 text-3xl font-black">Opening the live admin console...</h1>
        <p className="mt-4 text-blue-100">The app back office now runs on the secure Vercel command center for uploads, publishing, events, announcements, and moderation.</p>
        <a className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-3 font-black text-[#071B45]" href={commandCenterUrl}>Open Command Center</a>
      </div>
    </main>
  );
}
