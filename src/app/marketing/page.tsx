import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell, BookOpen, CheckCircle2, HeartHandshake, MapPinned, MessageCircle, PlayCircle, ShieldCheck, Users } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const siteUrl = 'https://overcomersglobalnetwork.com';
const assetUrl = 'https://og-nweb.vercel.app/app-marketing';

export const metadata: Metadata = {
  title: 'Overcomers Global Network App',
  description: 'A unified ministry app for live worship, secure giving, Bible study, evangelism follow-up, group chat, and admin management.',
  alternates: { canonical: '/marketing/' },
  openGraph: {
    title: 'Overcomers Global Network App',
    description: 'Live worship, giving, Bible tools, evangelism, chat, and admin management in one ministry app.',
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
  { icon: PlayCircle, title: 'Live Worship', copy: 'Broadcast services, featured worship, and replay content from one mobile home.' },
  { icon: HeartHandshake, title: 'Secure Giving', copy: 'Multiple giving flows with Stripe checkout and clear donation records.' },
  { icon: BookOpen, title: 'Bible Study', copy: 'Read KJV, NLT, and AMP translations with a focused mobile reading experience.' },
  { icon: MessageCircle, title: 'Community Chat', copy: 'Private messages, ministry groups, and announcements organized by role.' },
  { icon: MapPinned, title: 'Evangelism Tools', copy: 'Track outreach, map follow-ups, and keep ministry teams aligned in the field.' },
  { icon: ShieldCheck, title: 'Admin Controls', copy: 'Role-based dashboards for managing content, members, and ministry activity.' },
];

const roles = [
  'Public visitors can watch, give, read, and connect.',
  'Members can join groups, chat, and receive ministry updates.',
  'Leaders can manage outreach, content, and administrative workflows.',
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
    <main className="min-h-screen bg-white text-gray-950">
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
                <h1 className="mt-2 text-4xl font-bold leading-tight md:text-6xl">Overcomers Global Network</h1>
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl">
              A complete church and ministry app designed for worship, discipleship, giving, evangelism, communication, and leadership operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/connect" className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-[#061536] transition hover:bg-amber-300">
                Request Access
              </Link>
              <Link href="/give" className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Support the App
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {roles.map((role) => (
                <div key={role} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm leading-6 text-blue-50">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-amber-300" />
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[330px]">
            <PhoneFrame src={`${assetUrl}/home.png`} alt="Overcomers Global Network app home screen" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">Built for ministry flow</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Everything the church needs in one app experience</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              The app combines the public worship experience with member communication and administrator tools, so ministry teams can move from broadcast to follow-up without scattered systems.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-950 px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Screens</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Preview the app modules</h2>
            </div>
            <p className="max-w-xl leading-7 text-gray-300">
              Each screen is designed around practical ministry actions: watch, give, read, connect, follow up, and manage.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((shot) => (
              <div key={shot.label}>
                <PhoneFrame src={shot.src} alt={shot.alt} />
                <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">{shot.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">Operations</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Designed for real ministry teams</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              The app is structured around roles, so visitors, members, leaders, and administrators each get the tools they need without cluttering the experience.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              ['Visitor path', 'Watch live worship, explore the ministry, submit prayer requests, and give securely.'],
              ['Member path', 'Join groups, chat with ministry teams, receive updates, and stay connected throughout the week.'],
              ['Leader path', 'Manage outreach follow-ups, publish content, review activity, and support the congregation.'],
            ].map(([title, copy]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#061536] text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 leading-7 text-gray-600">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-400 px-4 py-14 text-[#061536]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <Bell className="mb-4 h-8 w-8" />
            <h2 className="text-3xl font-bold">Ready to bring the app into ministry use?</h2>
            <p className="mt-2 max-w-2xl text-[#061536]/80">Connect with Overcomers Global Network to learn about rollout, access, and next steps.</p>
          </div>
          <Link href="/connect" className="rounded-full bg-[#061536] px-7 py-4 text-center font-semibold text-white transition hover:bg-[#0b2254]">
            Contact the Team
          </Link>
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
