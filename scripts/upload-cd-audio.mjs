#!/usr/bin/env node
/**
 * Uploads public/audio/cds/** into the private Supabase Storage bucket that
 * serves CD downloads, then reports what is in the bucket.
 *
 * The audio must leave this repo: GitHub Pages refuses to publish a site over
 * 1 GB, and the mp3s alone are ~780 MB of that.
 *
 * Usage:
 *   node scripts/upload-cd-audio.mjs            # upload everything, skip files already there
 *   node scripts/upload-cd-audio.mjs --force    # re-upload even if present
 *   node scripts/upload-cd-audio.mjs --check    # list the bucket, upload nothing
 *
 * Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.
 * The service role key is never printed.
 */
import { createClient } from '@supabase/supabase-js';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const BUCKET = 'cd-audio';
const AUDIO_ROOT = path.join(process.cwd(), 'public', 'audio', 'cds');

async function loadEnv() {
  let raw = '';
  try {
    raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8');
  } catch {
    /* fall back to the real environment */
  }
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (.env.local or environment).');
    process.exit(1);
  }
  return { url, key };
}

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else if (entry.name.toLowerCase().endsWith('.mp3')) {
      out.push({ full, key: path.relative(base, full).split(path.sep).join('/') });
    }
  }
  return out.sort((a, b) => a.key.localeCompare(b.key));
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;

async function listBucket(supabase, folder) {
  const { data, error } = await supabase.storage.from(BUCKET).list(folder, { limit: 1000 });
  if (error) return [];
  return data.filter((f) => f.name.endsWith('.mp3'));
}

const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const checkOnly = args.has('--check');

const { url, key } = await loadEnv();
const supabase = createClient(url, key, { auth: { persistSession: false } });

const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
if (bucketErr) {
  console.error('Could not reach Supabase Storage:', bucketErr.message);
  process.exit(1);
}
if (!buckets.some((b) => b.name === BUCKET)) {
  console.log(`Bucket "${BUCKET}" does not exist — creating it as private.`);
  const { error } = await supabase.storage.createBucket(BUCKET, { public: false });
  if (error) {
    console.error(`Could not create bucket "${BUCKET}": ${error.message}`);
    process.exit(1);
  }
  console.log('Bucket created.\n');
}

const folders = (await readdir(AUDIO_ROOT, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (checkOnly) {
  for (const folder of folders) {
    const remote = await listBucket(supabase, folder);
    const total = remote.reduce((n, f) => n + (f.metadata?.size ?? 0), 0);
    console.log(`${folder}: ${remote.length} files in bucket (${mb(total)})`);
  }
  process.exit(0);
}

const only = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (only && !folders.includes(only)) {
  console.error(`No such album folder "${only}". Available: ${folders.join(', ')}`);
  process.exit(1);
}

const allFiles = await walk(AUDIO_ROOT);
const files = only ? allFiles.filter((f) => f.key.startsWith(`${only}/`)) : allFiles;
if (only) console.log(`Limiting to album "${only}".`);
const totalBytes = (await Promise.all(files.map((f) => stat(f.full)))).reduce((n, s) => n + s.size, 0);
console.log(`${files.length} mp3 files, ${mb(totalBytes)} to consider.\n`);

const existing = new Set();
for (const folder of folders) {
  for (const f of await listBucket(supabase, folder)) existing.add(`${folder}/${f.name}`);
}

let uploaded = 0;
let skipped = 0;
let failed = 0;

for (const [i, file] of files.entries()) {
  const label = `[${i + 1}/${files.length}] ${file.key}`;
  if (!force && existing.has(file.key)) {
    skipped++;
    console.log(`${label} — already in bucket, skipping`);
    continue;
  }
  const body = await readFile(file.full);
  const { error } = await supabase.storage.from(BUCKET).upload(file.key, body, {
    contentType: 'audio/mpeg',
    upsert: true,
  });
  if (error) {
    failed++;
    console.error(`${label} — FAILED: ${error.message}`);
  } else {
    uploaded++;
    console.log(`${label} — uploaded (${mb(body.length)})`);
  }
}

console.log(`\nUploaded ${uploaded}, skipped ${skipped}, failed ${failed}.`);
if (failed) process.exit(1);
console.log('\nNext: confirm with --check, then delete public/audio/cds from the repo.');
