// Supabase Edge Function: get-download-links
//
// The website is a static export on GitHub Pages, so it cannot verify a payment
// itself. This function is the one piece of server code in the purchase flow:
// the browser hands it a Stripe Checkout Session id, and it hands back short-lived
// signed URLs for that product's tracks — but only if Stripe says the session was
// actually paid, and only for the product that session paid for.
//
// Deploy:  supabase functions deploy get-download-links --project-ref <ref>
// Secrets: STRIPE_SECRET_KEY  (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected)

import { createClient } from 'jsr:@supabase/supabase-js@2';

const BUCKET = 'cd-audio';
const LINK_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// A session only unlocks a product if it came from that product's Payment Link.
// Both volumes cost $50, so matching on amount alone would let a Volume I buyer
// pull down Volume II. The Payment Link id is what makes this exact.
const CATALOG: Record<string, { paymentLinkId: string; folder: string; tracks: string[] }> = {
  revelation: {
    paymentLinkId: 'plink_1U9TJrJxIpzb2nsmmW3z2LaJ',
    folder: 'revelation',
    tracks: [
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
    ],
  },
  'vol-1': {
    paymentLinkId: 'plink_1U8ROZJxIpzb2nsmpZtXznRj',
    folder: 'volume-1',
    tracks: [
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
    ],
  },
  'vol-2': {
    paymentLinkId: 'plink_1U8RaxJxIpzb2nsmeDi7JbEM',
    folder: 'volume-2',
    tracks: [
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
    ],
  },
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const { sessionId, product } = await req.json().catch(() => ({}));

    const item = CATALOG[product];
    if (!item) return json({ error: 'Unknown product.' }, 400);
    if (!sessionId || typeof sessionId !== 'string') {
      return json({ error: 'No purchase reference was supplied.' }, 400);
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) return json({ error: 'Downloads are not configured yet.' }, 500);

    // Ask Stripe directly. Never trust anything the browser says about payment.
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${stripeKey}` } },
    );
    if (!res.ok) {
      return json({ error: 'We could not find that purchase.' }, 403);
    }
    const session = await res.json();

    if (session.payment_status !== 'paid') {
      return json({ error: 'That purchase has not been completed.' }, 403);
    }
    if (session.payment_link !== item.paymentLinkId) {
      return json({ error: 'That purchase does not cover this collection.' }, 403);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const paths = item.tracks.map((t) => `${item.folder}/${t}.mp3`);
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrls(paths, LINK_TTL_SECONDS, { download: true });

    if (error) {
      console.error('createSignedUrls failed', error);
      return json({ error: 'Your files could not be prepared. Please contact us.' }, 500);
    }

    // createSignedUrls preserves input order, so index maps back to the track name.
    const tracks = item.tracks.map((title, i) => ({
      title,
      url: data?.[i]?.signedUrl ?? null,
    }));

    if (tracks.some((t) => !t.url)) {
      console.error('some tracks missing in bucket', tracks.filter((t) => !t.url));
    }

    return json({ email: session.customer_details?.email ?? null, tracks });
  } catch (err) {
    console.error('get-download-links failed', err);
    return json({ error: 'Something went wrong preparing your downloads.' }, 500);
  }
});
