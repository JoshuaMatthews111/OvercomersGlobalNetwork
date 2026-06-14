'use client';

import { createClient, type Session } from '@supabase/supabase-js';
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  Globe2,
  HeartHandshake,
  Lock,
  MapPinned,
  MessageCircle,
  Radio,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

type SermonSeries = {
  id: string;
  title: string;
  description: string | null;
  speaker: string | null;
};

type Sermon = {
  id: string;
  title: string;
  scripture_reference: string | null;
  speaker: string | null;
  is_featured: boolean | null;
};

type EventRow = {
  id: string;
  title: string;
  location: string | null;
  starts_at: string;
};

type GivingLink = {
  id: string;
  label: string;
  instructions: string | null;
  url: string | null;
};

type ChatChannel = {
  id: string;
  name: string;
  region: string | null;
  channel_type: string;
  is_mandatory: boolean | null;
};

type Territory = {
  id: string;
  parent_id: string | null;
  name: string;
  level: string;
  status: string;
  reached_count: number | null;
  souls_saved_count: number | null;
  follow_up_count: number | null;
  bible_studies_active: number | null;
  covered_streets_count: number | null;
  in_progress_streets_count: number | null;
  streets_untapped_count: number | null;
};

type OutreachContact = {
  id: string;
  full_name: string | null;
  status: string | null;
  assigned_leader_name: string | null;
  next_follow_up_at: string | null;
  follow_up_needed: boolean | null;
};

type DashboardData = {
  series: SermonSeries[];
  sermons: Sermon[];
  events: EventRow[];
  giving: GivingLink[];
  channels: ChatChannel[];
  territories: Territory[];
  contacts: OutreachContact[];
};

const emptyData: DashboardData = {
  series: [],
  sermons: [],
  events: [],
  giving: [],
  channels: [],
  territories: [],
  contacts: [],
};

export function AppConsole() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prayerName, setPrayerName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const metrics = useMemo(() => {
    const reached = data.territories.reduce((sum, item) => sum + (item.reached_count || 0), 0);
    const saved = data.territories.reduce((sum, item) => sum + (item.souls_saved_count || 0), 0);
    const followUps = data.territories.reduce((sum, item) => sum + (item.follow_up_count || 0), 0);
    const bibleStudies = data.territories.reduce((sum, item) => sum + (item.bible_studies_active || 0), 0);
    const untapped = data.territories.reduce((sum, item) => sum + (item.streets_untapped_count || 0), 0);
    const due = data.contacts.filter((contact) => contact.follow_up_needed || isDue(contact.next_follow_up_at)).length;
    return { reached, saved, followUps, bibleStudies, untapped, due };
  }, [data]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setNotice('Supabase public environment variables are not configured for this deployment yet.');
      return;
    }

    supabase.auth.getSession().then(({ data: auth }) => setSession(auth.session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setNotice(null);

    const [series, sermons, events, giving, channels, territories, contacts] = await Promise.all([
      supabase.from('sermon_series').select('id,title,description,speaker').eq('status', 'published').order('sort_order'),
      supabase.from('sermons').select('id,title,scripture_reference,speaker,is_featured').eq('status', 'published').order('published_at', { ascending: false }),
      supabase.from('events').select('id,title,location,starts_at').order('starts_at'),
      supabase.from('giving_links').select('id,label,instructions,url').eq('is_active', true).order('sort_order'),
      session ? supabase.from('chat_channels').select('id,name,region,channel_type,is_mandatory').order('created_at') : Promise.resolve({ data: [], error: null }),
      session ? supabase.from('territories').select('id,parent_id,name,level,status,reached_count,souls_saved_count,follow_up_count,bible_studies_active,covered_streets_count,in_progress_streets_count,streets_untapped_count').order('created_at') : Promise.resolve({ data: [], error: null }),
      session ? supabase.from('outreach_contacts').select('id,full_name,status,assigned_leader_name,next_follow_up_at,follow_up_needed').order('created_at', { ascending: false }).limit(20) : Promise.resolve({ data: [], error: null }),
    ]);

    const errors = [series.error, sermons.error, events.error, giving.error, channels.error, territories.error, contacts.error].filter(Boolean);
    if (errors.length) {
      setNotice(session ? 'Some protected data could not load. Confirm your user has outreach, staff, leader, or admin role.' : 'Sign in to load protected chat and evangelism records.');
    }

    setData({
      series: series.data || [],
      sermons: sermons.data || [],
      events: events.data || [],
      giving: giving.data || [],
      channels: channels.data || [],
      territories: territories.data || [],
      contacts: contacts.data || [],
    });
    setLoading(false);
  }, [session]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function signIn() {
    if (!supabase) return;
    setNotice(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setNotice(error ? error.message : 'Signed in. Loading protected app data now.');
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setNotice('Signed out. Protected app data is hidden.');
  }

  async function submitPrayer() {
    if (!supabase || !prayerRequest.trim()) {
      setNotice('Add a prayer request before submitting.');
      return;
    }
    const { error } = await supabase.from('prayer_requests').insert({
      name: prayerName || 'Website visitor',
      category: 'Website app page',
      request: prayerRequest,
      is_private: true,
      consent_received: true,
      created_by: session?.user.id || null,
    });
    if (error) {
      setNotice(error.message);
      return;
    }
    setPrayerName('');
    setPrayerRequest('');
    setNotice('Prayer request submitted to the live Supabase backend.');
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#071B45] pt-36 pb-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full border border-amber-300/40" />
          <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-blue-300/20" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <Radio className="h-4 w-4" />
              OGN App Command Center
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
              Global Broadcast app, live backend, and leader follow-up in one place.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              This page connects your website to the same Supabase backend powering the iOS and Android MVP. Public ministry content is visible now; protected evangelism records require an approved outreach or leader account.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#live-console" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600">
                Open Live Console
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/JoshuaMatthews111/OVercomersapp2026/pull/1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Mobile App PR
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="live-console" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-4">
            <Metric icon={<Globe2 />} label="People Reached" value={metrics.reached || 0} />
            <Metric icon={<HeartHandshake />} label="Souls Saved" value={metrics.saved || 0} />
            <Metric icon={<Clock />} label="Follow-Ups Due" value={metrics.due || metrics.followUps || 0} />
            <Metric icon={<BookOpen />} label="Bible Studies" value={metrics.bibleStudies || 0} />
          </div>

          {notice && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
              {notice}
            </div>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-8">
              <Panel title="Live App Content" icon={<Activity className="h-5 w-5" />}>
                <div className="grid gap-4 md:grid-cols-2">
                  <ContentList
                    title="Message Series"
                    items={data.series.map((item) => ({
                      title: item.title,
                      body: item.description || item.speaker || 'Published series',
                    }))}
                    empty={loading ? 'Loading series...' : 'No published series yet.'}
                  />
                  <ContentList
                    title="Featured Messages"
                    items={data.sermons.map((item) => ({
                      title: item.title,
                      body: [item.speaker, item.scripture_reference].filter(Boolean).join(' • ') || 'Published message',
                    }))}
                    empty={loading ? 'Loading messages...' : 'No published sermons yet.'}
                  />
                  <ContentList
                    title="Events"
                    items={data.events.map((item) => ({
                      title: item.title,
                      body: `${formatDate(item.starts_at)}${item.location ? ` • ${item.location}` : ''}`,
                    }))}
                    empty={loading ? 'Loading events...' : 'No events yet.'}
                  />
                  <ContentList
                    title="Giving"
                    items={data.giving.map((item) => ({
                      title: item.label,
                      body: item.instructions || item.url || 'Giving option',
                    }))}
                    empty={loading ? 'Loading giving links...' : 'No giving links yet.'}
                  />
                </div>
              </Panel>

              <Panel title="Evangelism Operations" icon={<MapPinned className="h-5 w-5" />}>
                {session ? (
                  <div className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-3">
                      <SmallStat label="Covered Streets" value={sum(data.territories, 'covered_streets_count')} tone="green" />
                      <SmallStat label="In Progress" value={sum(data.territories, 'in_progress_streets_count')} tone="gold" />
                      <SmallStat label="Untapped" value={metrics.untapped} tone="red" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <ContentList
                        title="Territory Drill-Down"
                        items={data.territories.slice(0, 8).map((item) => ({
                          title: item.name,
                          body: `${item.level} • ${item.status.replaceAll('_', ' ')} • ${(item.reached_count || 0).toLocaleString()} reached`,
                        }))}
                        empty="No territories visible for this account."
                      />
                      <ContentList
                        title="Follow-Up Queue"
                        items={data.contacts.map((item) => ({
                          title: item.full_name || 'Household / person',
                          body: `${(item.status || 'contact_made').replaceAll('_', ' ')}${item.assigned_leader_name ? ` • ${item.assigned_leader_name}` : ''}${item.next_follow_up_at ? ` • ${formatDate(item.next_follow_up_at)}` : ''}`,
                        }))}
                        empty="No outreach records visible for this account."
                      />
                    </div>
                  </div>
                ) : (
                  <LockedMessage />
                )}
              </Panel>
            </div>

            <aside className="space-y-8">
              <Panel title={session ? 'Leader Session' : 'Leader Sign In'} icon={<ShieldCheck className="h-5 w-5" />}>
                {session ? (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-green-50 p-4 text-green-800">
                      <div className="flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        Signed in
                      </div>
                      <p className="mt-2 text-sm">{session.user.email}</p>
                    </div>
                    <button onClick={signOut} className="w-full rounded-full border border-gray-300 px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500" placeholder="Leader email" type="email" />
                    <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500" placeholder="Password" type="password" />
                    <button onClick={signIn} className="w-full rounded-full bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600">
                      Sign In
                    </button>
                    <p className="text-sm text-gray-500">Your Supabase role must be outreach, staff, leader, or admin to see protected evangelism data.</p>
                  </div>
                )}
              </Panel>

              <Panel title="Prayer Intake" icon={<Bell className="h-5 w-5" />}>
                <div className="space-y-3">
                  <input value={prayerName} onChange={(event) => setPrayerName(event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500" placeholder="Name or Anonymous" />
                  <textarea value={prayerRequest} onChange={(event) => setPrayerRequest(event.target.value)} className="min-h-28 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-amber-500" placeholder="Prayer request" />
                  <button onClick={submitPrayer} className="w-full rounded-full bg-[#071B45] px-5 py-3 font-semibold text-white transition hover:bg-[#0B1D4D]">
                    Submit to Supabase
                  </button>
                </div>
              </Panel>

              <Panel title="Realtime Readiness" icon={<MessageCircle className="h-5 w-5" />}>
                <ul className="space-y-3 text-sm text-gray-700">
                  <ChecklistItem label="Schema, RLS, seed, and storage applied" done />
                  <ChecklistItem label="Mobile app reads same Supabase backend" done />
                  <ChecklistItem label="Chat channels require signed-in members" done />
                  <ChecklistItem label="Private outreach records remain role-gated" done />
                  <ChecklistItem label="EAS build is next step" />
                </ul>
              </Panel>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">{icon}</div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#071B45] text-amber-300">{icon}</div>
      <div className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="mt-1 text-sm font-medium text-gray-500">{label}</div>
    </div>
  );
}

function ContentList({ title, items, empty }: { title: string; items: { title: string; body: string }[]; empty: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <h3 className="mb-3 font-bold text-gray-900">{title}</h3>
      <div className="space-y-3">
        {items.length ? items.map((item) => (
          <div key={`${title}-${item.title}`} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
            <div className="font-semibold text-gray-900">{item.title}</div>
            <div className="mt-1 text-sm leading-5 text-gray-600">{item.body}</div>
          </div>
        )) : <div className="text-sm text-gray-500">{empty}</div>}
      </div>
    </div>
  );
}

function SmallStat({ label, value, tone }: { label: string; value: number; tone: 'green' | 'gold' | 'red' }) {
  const tones = {
    green: 'bg-green-50 text-green-800',
    gold: 'bg-amber-50 text-amber-800',
    red: 'bg-red-50 text-red-800',
  };
  return (
    <div className={`rounded-xl p-4 ${tones[tone]}`}>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}

function LockedMessage() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
      <Lock className="mx-auto h-8 w-8 text-gray-500" />
      <h3 className="mt-3 font-bold text-gray-900">Protected by Supabase RLS</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
        Evangelism records, households, locations, phone numbers, and follow-up history are private. Sign in with an outreach, staff, leader, or admin role to manage them from the website.
      </p>
    </div>
  );
}

function ChecklistItem({ label, done = false }: { label: string; done?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
        <CheckCircle2 className="h-3.5 w-3.5" />
      </span>
      <span>{label}</span>
    </li>
  );
}

function formatDate(value: string | null) {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

function sum(items: Territory[], field: keyof Territory) {
  return items.reduce((total, item) => total + (Number(item[field]) || 0), 0);
}

function isDue(value: string | null) {
  if (!value) return false;
  const dueAt = new Date(value);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return dueAt < tomorrow;
}
