import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell, BookOpen, CheckCircle2, HeartHandshake, MapPinned, MessageCircle, PlayCircle, ShieldCheck, Users } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const siteUrl = 'https://overcomersglobalnetwork.com';
const assetUrl = 'https://og-nweb.vercel.app/app-marketing';

export const metadata: Metadata = {
  title: 'Overcomers Global Network App',
  description:
    'Marketing information for the Overcomers Global Network mobile app for Bible reading, sermons, prayer, giving, community, evangelism, and ministry updates.',
  alternates: { canonical: '/marketing/' },
  openGraph: {
    title: 'Overcomers Global Network App',
    description:
      'Read the Bible, watch sermons, submit prayer requests, give securely, connect with the OGN community, and follow global ministry updates.',
    url: `${siteUrl}/marketing/`,
    images: [
      {
        url: `${assetUrl}/home.png`,
        width: 1242,
        height: 2688,
        alt: 'Overcomers Global Network app home screen',
      },
    ],
  },
};

const features = [
  { icon: BookOpen, title: 'Bible Reading', body: 'Read supported translations including KJV, NLT, and AMP with chapter navigation.' },
  { icon: PlayCircle, title: 'Media Library', body: 'Access sermons, articles, videos, music, saved items, and downloads in one place.' },
  { icon: HeartHandshake, title: 'Prayer & Giving', body: 'Submit prayer requests and give securely through OGN web giving and Stripe links.' },
  { icon: MessageCircle, title: 'Community', body: 'Connect through private messages, groups, and announcements with moderation support.' },
  { icon: Bell, title: 'Notifications', body: 'Choose updates for chats, announcements, new media, prayer alerts, and ministry events.' },
  { icon: MapPinned, title: 'Evangelism Tools', body: 'Approved leaders and outreach teams can track territories, follow-ups, and discipleship activity.' },
];

const roles = [
  'Members can read, watch, pray, give, save media, manage profile information, and participate in community features.',
  'Leaders and approved outreach workers can access evangelism and follow-up tools based on assigned permissions.',
  'Admins and staff can manage app content, stories, media, prayers, announcements, roles, and moderation workflows.',
];

const screenshots = [
  { src: `${assetUrl}/home.png`, alt: 'Home screen with OGN globe hero and live broadcast card', label: 'Home' },
  { src: `${assetUrl}/give.png`, alt: 'Give screen with basket image and secure giving options', label: 'Give' },
  { src: `${assetUrl}/bible.png`, alt: 'Bible screen with KJV, NLT, and AMP selectors', label: 'Bible' },
  { src: `${assetUrl}/chat.png`, alt: 'Chat screen for private messages, groups, and announcements', label: 'Chat' },
  { src: `${assetUrl}/evangelism.png`, alt: 'Evangelism map and follow-up dashboard', label: 'Evangelism' },
  { src: `${assetUrl}/admin.png`, alt: 'Admin dashboard for content and ministry management', label: 'Admin' },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#071B45]">
      <Navigation />

      <section className="relative overflow-hidden bg-[#061536] px-4 pb-16 pt-32 text-white md:pb-24">
        <div className="absolute inset-0 opacity-30">
          <img
            src={`${assetUrl}/home.png`}
            alt=""
            className="h-full w-full object-cover object-top blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#061536]/85 via-[#061536]/92 to-[#061536]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={`${assetUrl}/ogn-app-icon.png`}
                alt="Overcomers Global Network app icon"
                className="h-[82px] w-[82px] rounded-2xl border border-amber-300/40 object-cover shadow-2xl"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">Mobile App</p>
                <p className="mt-1 text-sm text-blue-100">iPhone and Android</p>
              </div>
            </div>

            <h1 className="mt-8 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Overcomers Global Network
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-blue-100">
              A global ministry app for Bible reading, live teaching, sermons, prayer requests, giving, community messages, and Kingdom impact.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/support/"
                className="rounded-full bg-amber-400 px-6 py-3 font-bold text-[#061536] shadow-lg transition hover:bg-amber-300"
              >
                App Support
              </Link>
              <Link
                href="/privacy/"
                className="rounded-full border border-amber-300/70 px-6 py-3 font-bold text-amber-100 transition hover:bg-white/10"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-blue-100">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-300" /> Secure giving via Stripe/web</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-amber-300" /> Role-gated leader/admin tools</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-300" /> Public sign-in required</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[330px]">
            <PhoneFrame src={`${assetUrl}/home.png`} alt="Overcomers Global Network app home screen" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-700">What the app does</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Built for members, leaders, outreach teams, and admins.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            The OGN app helps members stay connected to ministry life while giving approved leaders and staff protected tools to manage outreach, prayer care, announcements, and content.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
              <feature.icon className="h-8 w-8 text-amber-700" />
              <h3 className="mt-4 text-xl font-black">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-700">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-700">Screenshots</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">A clear look at the app experience.</h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-700">
              These screens represent the current iOS and Android app experience for review, marketing, and support.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((shot) => (
              <div key={shot.label}>
                <PhoneFrame src={shot.src} alt={shot.alt} />
                <p className="mt-3 text-center font-bold">{shot.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl bg-[#071B45] p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Access model</p>
          <h2 className="mt-3 text-3xl font-black">Sign-in required. Protected roles are assigned by admins.</h2>
          <p className="mt-5 leading-8 text-blue-100">
            The app is not an unrestricted public community. Users sign in to access ministry features, and leader, outreach, staff, admin, and super admin capabilities are permission-based.
          </p>
        </div>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
              <p className="leading-7 text-slate-700">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#071B45] px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">One Vision. Every Nation. Eternal Impact.</p>
          <h2 className="mt-4 text-3xl font-black md:text-5xl">Support and policy links for app review.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link className="rounded-full bg-white px-6 py-3 font-bold text-[#071B45]" href="/privacy/">Privacy Policy</Link>
            <Link className="rounded-full bg-white px-6 py-3 font-bold text-[#071B45]" href="/support/">Support</Link>
            <Link className="rounded-full bg-white px-6 py-3 font-bold text-[#071B45]" href="/terms/">Terms</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto max-w-[330px] rounded-[2.25rem] border-[10px] border-[#050816] bg-[#050816] p-1 shadow-2xl">
      <div className="overflow-hidden rounded-[1.55rem] bg-[#071B45]">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
