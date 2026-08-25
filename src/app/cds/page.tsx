'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';


const VOLUMES = [
  {
    slug: 'secrets-of-the-mind-volume-1',
    number: 'VOLUME I',
    title: 'The Inner World',
    front: '/images/cds/volume-1-front.png',
    back: '/images/cds/volume-1-back.png',
    tracks: 19,
    duration: '2h 39m',
    price: '$50',
    blurb:
      'The mystery of the new creation man, the organ of creation that is your imagination, the gates of the mind, and the images you have been carrying without knowing it.',
    highlights: [
      'Your Mind Must Catch Up With Your Spirit',
      'The Organ of Creation — Imagination',
      'The Power of "I AM"',
      'Refusing to Bow to What You See',
      'The Inward Journey of Prayer',
    ],
    meditations: 4,
  },
  {
    slug: 'secrets-of-the-mind-volume-2',
    number: 'VOLUME II',
    title: 'Influencing the Natural World',
    front: '/images/cds/volume-2-front.png',
    back: '/images/cds/volume-2-back.png',
    tracks: 16,
    duration: '1h 56m',
    price: '$50',
    blurb:
      'Faith has a voice. This volume takes what was settled inwardly and gives it physical expression — direction, provision, honour, and the marketplace.',
    highlights: [
      'Faith Has a Voice',
      'Remaining in Faith Until the Promise Manifests',
      'The Mystery of Giving & Honor',
      'Money Is a Defense',
      'Living From the Supernatural Heart of God',
    ],
    meditations: 2,
  },
];

const STRIPE_LINKS: Record<string, string> = {
  'vol-1': 'https://buy.stripe.com/4gM9AU3pE0mZfEt4RHco00c',
  'vol-2': 'https://buy.stripe.com/8x2eVe4tI0mZcsheshco00d',
  bundle: 'https://buy.stripe.com/4gM9AU3pE0mZfEt4RHco00c', // TODO: replace with actual bundle link
};

export default function CDsPage() {
  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-cyan-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-12">
          <p className="text-orange-400 tracking-[0.3em] text-sm uppercase mb-4 gold-shimmer">
            New Audio Teaching Series
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
            <span className="shimmer-text">Secrets of the Mind &amp; the New Creation</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Influencing the Natural World from the Supernatural Heart of God
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
            <span>2 Volumes</span>
            <span className="text-orange-400">·</span>
            <span>35 Tracks</span>
            <span className="text-orange-400">·</span>
            <span>4 Hours 35 Minutes</span>
            <span className="text-orange-400">·</span>
            <span>320 kbps MP3</span>
          </div>
        </div>
      </section>

      {/* The two volumes */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            {VOLUMES.map((vol, index) => (
              <div
                key={vol.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Covers — front large, back beneath */}
                <div>
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={vol.front}
                      alt={`${vol.number} — ${vol.title} front cover`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 mt-4 max-w-[45%]">
                    <Image
                      src={vol.back}
                      alt={`${vol.number} — ${vol.title} back cover with full tracklist`}
                      fill
                      className="object-cover"
                      sizes="45vw"
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2">Front and back cover</p>
                </div>

                {/* Copy */}
                <div>
                  <p className="text-orange-400 tracking-[0.3em] text-xs uppercase mb-3">{vol.number}</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="gradient-text">{vol.title}</span>
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{vol.blurb}</p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 mb-6">
                    <span>{vol.tracks} tracks</span>
                    <span>{vol.duration}</span>
                    <span>{vol.meditations} guided meditations</span>
                  </div>

                  <ul className="space-y-2 mb-8">
                    {vol.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-gray-300 text-sm">
                        <span className="text-orange-400 mt-0.5">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-3xl font-bold text-white">{vol.price}</span>
                    <a
                      href={STRIPE_LINKS[index === 0 ? 'vol-1' : 'vol-2']}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-md font-medium transition-all"
                    >
                      Buy &amp; Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section className="py-20 bg-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center border border-orange-500/30 rounded-2xl p-10 bg-gradient-to-b from-orange-900/10 to-transparent">
            <p className="text-orange-400 tracking-[0.3em] text-xs uppercase mb-4">Complete Series</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gold-shimmer">Both Volumes Together</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              The whole teaching in order, as it was taught — all 35 tracks across both volumes,
              4 hours and 35 minutes, including all six guided meditations.
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden border border-white/10">
                <Image src="/images/cds/volume-1-front.png" alt="Volume I" fill className="object-cover" sizes="144px" />
              </div>
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden border border-white/10">
                <Image src="/images/cds/volume-2-front.png" alt="Volume II" fill className="object-cover" sizes="144px" />
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-5">
              <span className="text-4xl font-bold text-white">$100</span>
              <a
                href={STRIPE_LINKS.bundle}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-md font-semibold text-lg transition-all"
              >
                Get the Complete Series
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What you get / how it works */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="gradient-text">What You Receive</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {[
                {
                  title: 'Studio-Mastered Audio',
                  body: 'Every track is 320 kbps MP3, mastered for sustained listening and tagged and sequenced exactly as printed on the back covers.',
                },
                {
                  title: 'Six Guided Meditations',
                  body: 'Each one over fifteen minutes — releasing wrong images, new creation identity, healing images of people, covenant love, provision, and the closing meditation.',
                },
                {
                  title: 'Yours To Keep',
                  body: 'Download to any device, as many times as you need. Your library never expires and nothing is streamed-only.',
                },
              ].map((card) => (
                <div key={card.title} className="bg-white/5 rounded-lg border border-white/10 p-6">
                  <h3 className="text-xl font-bold mb-3">
                    <span className="gold-shimmer">{card.title}</span>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-lg border border-white/10 p-8">
              <h3 className="text-xl font-bold mb-5 text-white">How the download works</h3>
              <ol className="space-y-4 text-gray-300 text-sm">
                {[
                  'Choose a volume or the complete series and click through to secure checkout.',
                  'Pay by card through Stripe — your card details are never handled by this site.',
                  'You land straight in your library, where every track is listed and ready.',
                  'Download the tracks you want, or the whole volume at once, on any device.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-orange-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-gray-500 text-xs mt-6">
                Checkout and downloads are handled on OGN University, our teaching platform. You will
                be asked to sign in or create a free account so your purchase is saved to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
