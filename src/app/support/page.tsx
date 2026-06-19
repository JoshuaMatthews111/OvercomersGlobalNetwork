import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with the Overcomers Global Network app, account, prayer requests, media, chat, giving, and notifications.',
  alternates: { canonical: '/support/' },
};

const faqs = [
  ['How do I create an account?', 'Open the app, tap Get Started, and enter your name, email, and password. Check your inbox for a confirmation link if prompted.'],
  ['I forgot my password.', 'Tap Sign In, then Forgot password, and enter the email you used to sign up.'],
  ['How do I delete my account?', 'Open More / Profile and choose Request Account Deletion, or email support@overcomersglobalnetwork.com.'],
  ['The live stream is not loading.', 'Live streams are active during scheduled services. Outside those windows, use the Media tab for recorded messages.'],
  ['The Bible only shows one verse.', 'Use the Verse selector and choose All to read the whole chapter.'],
  ['Someone in chat is being abusive.', 'Email safety@overcomersglobalnetwork.com with a screenshot and channel name. Leaders can remove unsafe messages from moderated groups.'],
  ['How do I give?', 'Tap Give in the app. Giving opens overcomersglobalnetwork.com/give and is processed securely by Stripe.'],
  ['How do I turn off notifications?', 'Use More / Profile - Notifications, or your device notification settings.'],
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <section className="bg-[#071B45] px-4 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">App Support</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">How can we help?</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Support for the Overcomers Global Network app, website, media, prayer requests, giving, chat, and notifications.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-bold text-[#071B45]">Contact</h2>
          <div className="mt-5 space-y-4 text-gray-700">
            <Contact label="Support" value="support@overcomersglobalnetwork.com" />
            <Contact label="Safety / Abuse" value="safety@overcomersglobalnetwork.com" />
            <Contact label="Security" value="security@overcomersglobalnetwork.com" />
            <Contact label="Giving" value="giving@overcomersglobalnetwork.com" />
          </div>
          <p className="mt-6 text-sm leading-6 text-gray-600">We reply within 2 business days.</p>
          <div className="mt-8 rounded-xl bg-white p-4 text-sm leading-6 text-gray-700">
            <strong className="text-[#071B45]">Overcomers Global Network</strong><br />
            7519 Mentor Ave, Suite A106<br />
            Painesville, OH 44077
          </div>
        </aside>

        <div>
          <h2 className="text-2xl font-bold text-[#071B45]">Common Questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map(([question, answer]) => (
              <section key={question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-gray-900">{question}</h3>
                <p className="mt-2 leading-7 text-gray-600">{answer}</p>
              </section>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[#071B45] p-6 text-white">
            <h2 className="text-2xl font-bold">App Information</h2>
            <ul className="mt-4 space-y-2 text-blue-100">
              <li>App name: Overcomers Global Network</li>
              <li>Version: 1.0.0</li>
              <li>Platforms: iOS, Android, Web</li>
              <li>Privacy Policy: overcomersglobalnetwork.com/privacy</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Contact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">{label}</div>
      <a className="font-semibold text-[#071B45] underline" href={`mailto:${value}`}>{value}</a>
    </div>
  );
}
