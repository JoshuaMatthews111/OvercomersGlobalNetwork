# Moving CD audio to Supabase Storage

## Why

The website is a static export on GitHub Pages. GitHub refuses to publish a site
over **1 GB**, and the CD mp3s in `public/audio/cds` are ~780 MB of the current
975 MB. There is no room for another album.

Two problems get fixed at once:

1. **Storage.** Audio moves to Supabase Storage; the published site drops to ~195 MB.
2. **The CDs are currently free to anyone.** The files sit at guessable public
   paths and the download page only checks that a `session_id` is present in the
   URL — it never asks Stripe whether that session was paid. Signed URLs fix this.

## The pieces (already written, not yet switched on)

| File | Role |
|---|---|
| `supabase/functions/get-download-links/index.ts` | Verifies the Stripe session, returns 24-hour signed URLs |
| `scripts/upload-cd-audio.mjs` | Uploads `public/audio/cds/**` into the bucket |
| `src/app/store/download/page.tsx` | Requests signed links when the flag is on |

Everything is behind `NEXT_PUBLIC_SIGNED_DOWNLOADS`. While that is unset the site
behaves exactly as it does today, so nothing breaks between now and the cutover.

## Steps

### 1. Upgrade the OGN Supabase account to Pro — Joshua only

Project `ljmzujrzdhwmvvapajlr` (OGNAPP2026). **This must be done first.** Free
projects auto-pause after ~7 days idle, and a paused project stops resolving —
every download link on the site would break until someone restored it by hand.
That is the same pause that took both OGN sites down in August.

### 2. Create the bucket

Supabase dashboard → Storage → New bucket:

- Name: `cd-audio`
- **Private** (not public — public defeats the whole point)

### 3. Upload the audio

```bash
node scripts/upload-cd-audio.mjs
```

Reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `.env.local`. Safe to
re-run; it skips files already uploaded. Confirm with:

```bash
node scripts/upload-cd-audio.mjs --check
```

Expect 19 + 16 + 12 = 47 files.

### 4. Deploy the edge function

```bash
supabase functions deploy get-download-links --project-ref ljmzujrzdhwmvvapajlr
supabase secrets set STRIPE_SECRET_KEY=sk_live_... --project-ref ljmzujrzdhwmvvapajlr
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.

The function maps each product to its Stripe Payment Link id and refuses a
session that came from a different link. Both volumes cost $50, so matching on
amount alone would let a Volume I buyer pull down Volume II.

### 5. Add the Stripe redirect to the two volumes

Volume I and Volume II are set to `hosted_confirmation` — buyers pay and land on
Stripe's generic thank-you page, never reaching their downloads. In each payment
link → After payment → Redirect:

```
https://overcomersglobalnetwork.com/store/download/?product=vol-1&session_id={CHECKOUT_SESSION_ID}
https://overcomersglobalnetwork.com/store/download/?product=vol-2&session_id={CHECKOUT_SESSION_ID}
```

The Revelation link already redirects correctly. Adding the explicit
`{CHECKOUT_SESSION_ID}` placeholder to it too is worth doing — the signed-link
flow depends on that parameter arriving.

### 6. Switch it on and test with a real purchase

Add to `.env.production`:

```
NEXT_PUBLIC_SIGNED_DOWNLOADS=1
```

Push, wait for Pages, then **buy one CD for real** and confirm the tracks
download. Also confirm that opening
`/store/download/?product=revelation&session_id=cs_test_bogus` is now refused.

### 7. Only then, remove the audio from the repo

```bash
git rm -r --cached public/audio/cds
echo "public/audio/cds/" >> .gitignore
git commit -m "Serve CD audio from Supabase Storage"
```

Keep the local copies. Old commits still contain the files, so the repo stays
large on disk even though the published site shrinks; `git gc` will not help.
Rewriting that history is a separate job and is not required — the 1 GB limit
applies to the published site, not the repository.
