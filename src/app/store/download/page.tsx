'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import {
  Download, Check, Music, ArrowLeft, Loader2, ShieldCheck, AlertCircle,
} from 'lucide-react';

// Signed links come from a Supabase Edge Function, because a static site on
// GitHub Pages cannot check Stripe itself.
//
// This is deliberately gated on its own flag rather than on the Supabase keys
// being present: those keys are already committed in .env.production for other
// features, so keying off them would switch this on before the function and the
// storage bucket exist and break downloads for real buyers. Set
// NEXT_PUBLIC_SIGNED_DOWNLOADS=1 only once the Supabase side is live and tested.
// While it is off, the page serves the mp3s that still ship in /public.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SIGNED_LINKS_ENABLED =
  process.env.NEXT_PUBLIC_SIGNED_DOWNLOADS === '1' && Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const VOLUME_1_TRACKS = [
  '01 The Mystery of the New Creation Man',
  '02 Your Mind Must Catch Up With Your Spirit',
  '03 The Organ of Creation Imagination',
  '04 The Gates of the Mind',
  '05 Meditation Releasing Wrong Images',
  '06 Structuring Your Mind to Agree With Heaven',
  '07 Thought  Emotion  Action',
  "08 The Power of 'I AM'",
  '09 Full Persuasion',
  '10 Meditation I AM - New Creation Identity',
  '11 The Image Within',
  '12 The Promise Is Greater Than the Picture',
  '13 Refusing to Bow to What You See',
  '14 Making the Word Visible Within',
  '15 Meditation Healing the Images of People',
  '16 The Heart The Place of Agreement',
  '17 The Inward Journey of Prayer',
  '18 Attracting a Godly Marriage & Relationship',
  '19 Meditation Preparing for Covenant Love',
];

const VOLUME_2_TRACKS = [
  '01 Faith Has a Voice',
  '02 Action Giving the Inner World Physical Expression',
  '03 Remaining in Faith Until the Promise Manifests',
  '04 Wisdom for the Promise',
  '05 Divine Direction & Decision Making',
  '06 Gods Vessels on Earth',
  '07 The Mystery of Giving & Honor',
  '08 Giving & Divine Intervention',
  '09 Money Is a Defense',
  '10 Developing the Mindset of Provision & Prosperity',
  '11 Meditation Provision & Prosperity',
  '12 The Mind of Christ in the Marketplace & Natural World',
  '13 Living From the Supernatural Heart of God',
  '14 Influencing the Natural World From the Supernatural',
  '15 From Promise to Manifestation',
  '16 Final Meditation The New Creation Experience',
];

const REVELATION_TRACKS = [
  '01 A Son Was Given To You',
  '02 Christ Formed In You',
  '03 Born From Above',
  '04 The Cry of Abba Within',
  '05 Put On the New Man',
  '06 The Life In You Does Not Sink',
  '07 The Way Within the Veil',
  '08 No Condemnation',
  '09 Crucified With Him, Alive In Him',
  '10 One Spirit With Him',
  '11 From Glory To Glory',
  '12 Beholding Him Within',
];

function getTracksForProduct(productId: string) {
  const volumes: { label: string; badge: string; folder: string; tracks: string[] }[] = [];
  if (productId === 'vol-1' || productId === 'bundle') {
    volumes.push({ label: 'Volume I — The Inner World', badge: 'VOLUME I', folder: 'volume-1', tracks: VOLUME_1_TRACKS });
  }
  if (productId === 'vol-2' || productId === 'bundle') {
    volumes.push({ label: 'Volume II — Influencing the Natural World', badge: 'VOLUME II', folder: 'volume-2', tracks: VOLUME_2_TRACKS });
  }
  if (productId === 'revelation') {
    volumes.push({ label: 'The Revelation of the Son of God', badge: 'NEW RELEASE', folder: 'revelation', tracks: REVELATION_TRACKS });
  }
  return volumes;
}

function DownloadContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const productId = searchParams.get('product') || '';
  const [status, setStatus] = useState<'checking' | 'ready' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    if (!productId) {
      setErrorMessage('We could not tell which collection this was. Please contact us and we will sort it out.');
      setStatus('error');
      return;
    }

    if (!SIGNED_LINKS_ENABLED) {
      // Legacy behaviour: files are served straight from /public.
      if (sessionId) setStatus('ready');
      else {
        setErrorMessage('We could not find your purchase. Please use the link Stripe sent you after paying.');
        setStatus('error');
      }
      return;
    }

    if (!sessionId) {
      setErrorMessage('We could not find your purchase. Please use the link Stripe sent you after paying.');
      setStatus('error');
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/get-download-links`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ sessionId, product: productId }),
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (!res.ok) {
          setErrorMessage(data?.error || 'We could not confirm that purchase. Please contact us.');
          setStatus('error');
          return;
        }

        const map: Record<string, string> = {};
        for (const t of data.tracks ?? []) {
          if (t?.title && t?.url) map[t.title] = t.url;
        }
        setSignedUrls(map);
        setStatus('ready');
      } catch {
        if (cancelled) return;
        setErrorMessage('We could not reach the download service. Please try again in a moment.');
        setStatus('error');
      }
    })();

    return () => { cancelled = true; };
  }, [sessionId, productId]);

  const volumes = getTracksForProduct(productId);

  const handleDownload = (folder: string, track: string) => {
    setDownloading(track);
    const link = document.createElement('a');
    link.href = signedUrls[track] || `/audio/cds/${folder}/${track}.mp3`;
    link.download = `${track}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(prev => new Set([...prev, track]));
    setTimeout(() => setDownloading(null), 1000);
  };

  const handleDownloadAll = (folder: string, tracks: string[]) => {
    tracks.forEach((track, i) => {
      setTimeout(() => {
        handleDownload(folder, track);
      }, i * 500);
    });
  };

  if (status === 'checking') {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-40 pb-20 text-center">
          <Loader2 className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirming your purchase...</h1>
          <p className="text-gray-500">This only takes a moment.</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-40 pb-20 text-center px-4">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">We could not open your downloads</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">{errorMessage}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all">
              Contact Us
            </Link>
            <Link href="/store" className="border border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all">
              Back to Store
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-8">
            If you have already paid, your receipt email from Stripe has the link. We will always
            send your files if anything goes wrong.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-36 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Thank You for Your Purchase!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your payment was successful. All your tracks are ready to download below. You can download them individually or all at once.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
              <ShieldCheck className="w-4 h-4" />
              Payment confirmed via Stripe
            </div>
            {SIGNED_LINKS_ENABLED && (
              <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto">
                These download links stay active for 24 hours. Save the files to your device — once
                they are downloaded they are yours to keep. Need the links again? Just contact us.
              </p>
            )}
          </div>

          {/* Download Sections */}
          {volumes.map((volume) => (
            <div key={volume.folder} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
              <div className="bg-gray-900 p-6 flex items-center justify-between">
                <div>
                  <p className="text-amber-400 tracking-wider text-xs uppercase font-bold mb-1">
                    {volume.badge}
                  </p>
                  <h2 className="text-xl font-bold text-white">{volume.label}</h2>
                  <p className="text-gray-400 text-sm mt-1">{volume.tracks.length} tracks</p>
                </div>
                <button
                  onClick={() => handleDownloadAll(volume.folder, volume.tracks)}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>

              <div className="divide-y divide-gray-50">
                {volume.tracks.map((track, i) => (
                  <div
                    key={track}
                    className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-400 text-xs font-mono w-6 text-right flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Music className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    <span className="flex-1 text-gray-800 text-sm font-medium truncate">
                      {track.replace(/^\d+\s+/, '')}
                    </span>
                    <button
                      onClick={() => handleDownload(volume.folder, track)}
                      disabled={downloading === track}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${
                        downloaded.has(track)
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                      }`}
                    >
                      {downloading === track ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : downloaded.has(track) ? (
                        <><Check className="w-3 h-3" /> Downloaded</>
                      ) : (
                        <><Download className="w-3 h-3" /> Download</>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Back to Store */}
          <div className="text-center mt-8">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <div className="pt-40 pb-20 text-center">
          <Loader2 className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    }>
      <DownloadContent />
    </Suspense>
  );
}
