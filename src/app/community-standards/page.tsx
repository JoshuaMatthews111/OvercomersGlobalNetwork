import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Community Standards',
  description: 'The rules that keep chat, stories and prayer in the Overcomers Global Network app a safe place for everyone.',
  alternates: { canonical: '/community-standards/' },
};

// Same words as the Community Standards page inside the app (approved 2026-09-21).
export default function CommunityStandardsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <section className="bg-[#071B45] px-4 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Overcomers Global Network</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">Community Standards</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Overcomers Global Network is a family. These standards keep chat, stories and prayer a safe place for everyone.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 text-gray-800">
        <Section title="Be kind">
          <p>Speak the truth in love (Ephesians 4:15). Disagree without insulting. Build each other up.</p>
        </Section>

        <Section title="Never allowed">
          <ul>
            <li>Threats of violence against anyone, even as a joke.</li>
            <li>Hate, slurs or mocking anyone for their race, nation, sex or background.</li>
            <li>Sexual or explicit pictures, videos or messages.</li>
            <li>Anything that harms or sexualises a child. We report it to the authorities.</li>
            <li>Asking anyone to send money to you personally, or to anyone outside the ministry (&quot;Venmo me&quot;, &quot;Cash App me&quot;, &quot;DM me for a prophecy&quot;).</li>
            <li>Pretending to be a leader or another member.</li>
            <li>Spam, scams and suspicious links.</li>
          </ul>
        </Section>

        <Section title="Giving and seed offerings">
          <p>You are welcome to encourage one another to sow a seed, tithe and give offerings to the ministry. When you write about giving, the chat offers to add the church&apos;s Give card so people can give safely. Every gift goes through the Give tab to the ministry itself. If anyone asks you to send money to them personally, report it.</p>
        </Section>

        <Section title="Your testimony is welcome">
          <p>You may share honestly about your past, your pain and what God has healed. Scripture is always welcome.</p>
        </Section>

        <Section title="If you are struggling">
          <p>If you write that you are in danger or thinking of harming yourself, a leader will be told so someone can reach out to you. If you are in immediate danger, call your local emergency number. In the US, call or text 988.</p>
        </Section>

        <Section title="How we keep it safe">
          <ul>
            <li>Some messages are held for an admin to review before others can see them. You will see a note when this happens.</li>
            <li>Long-press any message to Report it or Block the person.</li>
            <li>Admins review reports within 24 hours and may remove content or accounts that break these standards.</li>
          </ul>
        </Section>

        <Section title="Questions">
          <p>Email <a className="font-semibold text-[#071B45] underline" href="mailto:support@overcomersglobalnetwork.com">support@overcomersglobalnetwork.com</a>, or open More &gt; Support Center in the app.</p>
        </Section>
      </article>
      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9 space-y-4 leading-7">
      <h2 className="text-2xl font-bold text-[#071B45]">{title}</h2>
      <div className="space-y-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">{children}</div>
    </section>
  );
}
