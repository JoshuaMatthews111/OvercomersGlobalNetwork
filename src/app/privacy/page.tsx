import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for the Overcomers Global Network website and mobile app.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <section className="bg-[#071B45] px-4 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Overcomers Global Network</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Effective June 16, 2026. Last updated September 24, 2026.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 text-gray-800">
        <PolicySection title="Who We Are">
          <p>Overcomers Global Network is a ministry that publishes the OGN mobile app and website for worship, Bible study, prayer, community, and outreach.</p>
          <p>Contact: <a className="font-semibold text-[#071B45] underline" href="mailto:support@overcomersglobalnetwork.com">support@overcomersglobalnetwork.com</a></p>
        </PolicySection>

        <PolicySection title="Information We Collect">
          <ul>
            <li>Name, email address, profile details, and optional profile photos.</li>
            <li>Prayer requests, chat messages, testimonies, uploaded media, and content you submit.</li>
            <li>Leader/outreach records such as evangelism notes, follow-ups, and map pins when you use those protected features.</li>
            <li>Device, app version, crash, and diagnostic data needed to keep the app reliable.</li>
            <li>Location only when you actively choose to log an outreach visit or find a nearby home cell. We do not track location in the background.</li>
            <li>Voice notes you record in chat, and audio you choose to share. The microphone is used only while you are recording.</li>
            <li>Photos and short videos you attach to a chat, a story, or an outreach visit. The camera and photo library are used only when you tap to add one.</li>
            <li>Calendar access only when you tap "Add to calendar" on an event or a booked session, so the app can write that one entry.</li>
            <li>If you book a one-to-one session: your name, the meeting type you choose, any note you leave for the pastor, and the time you booked.</li>
            <li>Read receipts: when you open a chat, the other members of that chat can see that you have read it.</li>
          </ul>
          <p>We do not collect payment card numbers. Giving and session payments are processed by Stripe on Stripe's own secure pages, outside the app. Stripe sends us only the amount, the date, and whether a promotion code was used.</p>
          <p><strong>Information about people our outreach team meets.</strong> Leaders and outreach workers may record the name, contact details, address, prayer needs, and follow-up notes of people they visit, together with photos or videos of a visit. Workers are trained to ask for permission before recording a person's details, and to record only what is needed to follow up. These records are visible only to approved outreach roles, never to ordinary members. Anyone whose details we hold may ask to see, correct, or delete them by emailing support@overcomersglobalnetwork.com.</p>
        </PolicySection>

        <PolicySection title="How We Use Information">
          <ul>
            <li>To provide accounts, Bible reading, prayer, chat, media, giving links, notifications, and evangelism tools.</li>
            <li>To moderate community spaces and protect members.</li>
            <li>To send requested notifications for chats, announcements, sermons, articles, prayer updates, and media.</li>
            <li>To diagnose crashes, respond to support requests, and improve the app.</li>
          </ul>
        </PolicySection>

        <PolicySection title="How We Share Information">
          <p>We do not sell personal information. We share information only with service providers that help us operate the app and website, including Supabase (accounts, database, and file storage), Expo (app builds and push notifications), Stripe (payments), Apple and Google (app stores and notifications), YouTube (teaching videos and live services are played from the ministry's YouTube channel, subject to Google's privacy policy), Firebase (our website's blog posts), and OpenStreetMap (when a leader types an address to find a home cell, that address text is sent to OpenStreetMap's search service), or when required for safety, legal compliance, or ministry operations.</p>
          <p>Content you post in a chat, group, or story is visible to the other members of that space. Messages that our safety filter holds for review are visible only to you and to the ministry's moderators until they are reviewed.</p>
        </PolicySection>

        <PolicySection title="Your Choices">
          <ul>
            <li>Edit your profile in the app.</li>
            <li>Turn notifications on or off in Profile - Notifications or device settings.</li>
            <li>Decline or revoke location, camera, microphone, photo, or calendar permission in device settings at any time.</li>
            <li>Report or block any member from any message or story, and read our Community Standards in the app or at overcomersglobalnetwork.com/community-standards.</li>
            <li>Request account deletion in the app or by emailing support@overcomersglobalnetwork.com.</li>
            <li>Request a copy of your data by emailing support@overcomersglobalnetwork.com.</li>
          </ul>
        </PolicySection>

        <PolicySection title="Data Retention and Security">
          <p>Account and content data are kept while your account is active. Crash and diagnostic logs are kept up to 90 days. Deleted account data is removed or anonymized within 30 days unless law requires limited retention.</p>
          <p>We use HTTPS, managed database security, storage access controls, and role-based admin permissions. No system is perfectly secure, so please use a strong unique password.</p>
        </PolicySection>

        <PolicySection title="Children and International Users">
          <p>The app is intended for general audiences ages 13 and older. We do not knowingly collect personal information from children under 13. OGN operates from the United States, and information may be processed in the United States and countries where our providers operate.</p>
        </PolicySection>

        <PolicySection title="Region-Specific Rights">
          <p>Depending on where you live, you may have rights to access, correct, delete, restrict, or export your personal information. California residents: we do not sell or share personal information for cross-context behavioral advertising. EU/UK users: our legal bases include consent, performance of our user agreement, and legitimate ministry interests.</p>
        </PolicySection>

        <PolicySection title="Contact">
          <p>Questions or requests? Email <a className="font-semibold text-[#071B45] underline" href="mailto:support@overcomersglobalnetwork.com">support@overcomersglobalnetwork.com</a>.</p>
        </PolicySection>
      </article>
      <Footer />
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9 space-y-4 leading-7">
      <h2 className="text-2xl font-bold text-[#071B45]">{title}</h2>
      <div className="space-y-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">{children}</div>
    </section>
  );
}
