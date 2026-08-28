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

### 1. Plan — staying on Free for now

Joshua chose to stay on the Free plan rather than upgrade OGNAPP2026
(`ljmzujrzdhwmvvapajlr`) to Pro. Two consequences to watch:

- **Pausing.** The project was found paused on 2026-08-28 and had to be restored
  by hand before anything could be uploaded. Pausing is judged on *database*
  activity, and serving mp3s from Storage is not database activity — so this can
  recur while CDs are actively selling, and every download link dies until
  someone restores it.
- **Egress.** Free gives 5 GB uncached per month, shared across the whole
  organization. One Revelation download is 116 MB, so roughly 40 downloads a
  month before Fair Use restrictions apply — which can mean 402s on every API
  request, not just downloads.

For this reason **only the Revelation CD was moved.** Volume I and Volume II
(660 MB) stay on GitHub Pages, where serving them costs no egress.

### 2. Create the bucket — DONE

`cd-audio`, private. The upload script creates it automatically if missing.

### 3. Upload the audio — DONE for revelation

```bash
node scripts/upload-cd-audio.mjs revelation   # one album
node scripts/upload-cd-audio.mjs             # everything
```

Reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `.env.local`. Safe to
re-run; it skips files already uploaded. Confirm with:

```bash
node scripts/upload-cd-audio.mjs --check
```

12/12 revelation tracks uploaded and size-verified on 2026-08-28. Signed URLs
were confirmed working and unsigned public access confirmed blocked.

Note: right after a restore the database refuses some connections and a few
uploads fail with "too many connections" — just run the script again.

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

### 6. Switch it on and test with a real purchase — DONE 2026-08-28

Deployed with JWT verification on, `STRIPE_SECRET_KEY` set as a function secret.
Verified against real Stripe data:

| Case | Result |
|---|---|
| Real **paid** session, matching product | 12 signed URLs, audio downloads (206) |
| Real **unpaid** session | refused — "purchase has not been completed" |
| Real paid session for a **different product** | refused — "does not cover this collection" |
| Bogus / missing session id | refused |
| Unsigned public read of the bucket | refused (400) |

The paid case was proven by deploying a throwaway copy of the function that
mapped a genuine paid Payment Link to the revelation folder, calling it, and
downloading a track through the returned link. That copy was deleted immediately
afterwards (`selftest-download-links`, gone from both Supabase and the repo).

Note: `vol-1` and `vol-2` are in the function's catalog but their files are not
in the bucket. `createSignedUrls` returns per-item nulls rather than failing, so
the page falls back to the mp3s in `/public` for those two. That is intentional
while the volumes stay on GitHub Pages.

#### Original instructions

Add to `.env.production`:

```
NEXT_PUBLIC_SIGNED_DOWNLOADS=1
```

Push, wait for Pages, then **buy one CD for real** and confirm the tracks
download. Also confirm that opening
`/store/download/?product=revelation&session_id=cs_test_bogus` is now refused.

### 7. Remove the audio from the repo — DONE 2026-08-28 for revelation

Only remove albums actually in the bucket. `revelation` is done; `volume-1` and
`volume-2` stay published from `/public` on purpose.

The local files are kept and `.gitignore`d, so the masters remain on disk.

```bash
git rm -r --cached public/audio/cds/revelation
echo "public/audio/cds/" >> .gitignore
git commit -m "Serve CD audio from Supabase Storage"
```

Keep the local copies. Old commits still contain the files, so the repo stays
large on disk even though the published site shrinks; `git gc` will not help.
Rewriting that history is a separate job and is not required — the 1 GB limit
applies to the published site, not the repository.
