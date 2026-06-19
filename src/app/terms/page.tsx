import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for the Overcomers Global Network website and mobile app.',
  alternates: { canonical: '/terms/' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <section className="bg-[#071B45] px-4 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Overcomers Global Network</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">Terms of Service</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Effective June 18, 2026.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 text-gray-800">
        <TermsSection title="Agreement">
          <p>These Terms govern your use of the Overcomers Global Network website and mobile app. By using OGN services, you agree to use them lawfully, respectfully, and in a way that supports ministry, prayer, teaching, community, and outreach.</p>
        </TermsSection>

        <TermsSection title="Accounts">
          <p>You are responsible for keeping your account credentials secure. Do not share your password or use another person&apos;s account. OGN may restrict accounts that abuse community tools, impersonate others, or violate these Terms.</p>
        </TermsSection>

        <TermsSection title="Community Conduct">
          <ul>
            <li>Do not harass, threaten, exploit, or abuse other users.</li>
            <li>Do not post illegal, hateful, sexually explicit, violent, or spam content.</li>
            <li>Do not upload content that violates another person&apos;s rights.</li>
            <li>Leaders and moderators may remove unsafe messages, announcements, media, or group members.</li>
          </ul>
        </TermsSection>

        <TermsSection title="Prayer Requests and Ministry Content">
          <p>Prayer requests, testimonies, outreach notes, and chat messages may be reviewed by authorized ministry staff, leaders, prayer team members, or moderators according to their role. Do not submit emergency, medical, legal, or safety-critical requests as your only source of help. If you are in immediate danger, contact local emergency services.</p>
        </TermsSection>

        <TermsSection title="Giving">
          <p>Giving is voluntary and is processed through the OGN website and Stripe. OGN does not store your full payment card number in the mobile app. Donation receipts, refunds, or giving questions should be sent to <a className="font-semibold text-[#071B45] underline" href="mailto:giving@overcomersglobalnetwork.com">giving@overcomersglobalnetwork.com</a>.</p>
        </TermsSection>

        <TermsSection title="Protected Leader Tools">
          <p>Evangelism, admin, moderation, media management, and role-management tools are limited to approved users. Users may not self-assign protected roles. Role changes and protected actions may be logged for safety and accountability.</p>
        </TermsSection>

        <TermsSection title="Content Rights">
          <p>You keep ownership of content you submit, but you grant OGN permission to store, display, moderate, and share it as needed to provide the app, website, ministry communication, prayer support, and outreach services. Do not upload content you do not have permission to use.</p>
        </TermsSection>

        <TermsSection title="Availability and Changes">
          <p>OGN may update, suspend, or remove features as needed for safety, maintenance, legal compliance, or ministry operations. We may update these Terms by posting a new version on this page.</p>
        </TermsSection>

        <TermsSection title="Contact">
          <p>Questions about these Terms can be sent to <a className="font-semibold text-[#071B45] underline" href="mailto:support@overcomersglobalnetwork.com">support@overcomersglobalnetwork.com</a>.</p>
        </TermsSection>
      </article>
      <Footer />
    </main>
  );
}

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9 space-y-4 leading-7">
      <h2 className="text-2xl font-bold text-[#071B45]">{title}</h2>
      <div className="space-y-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">{children}</div>
    </section>
  );
}
