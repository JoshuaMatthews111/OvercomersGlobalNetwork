'use client';

import { createClient, type Session } from '@supabase/supabase-js';
import {
  Bell,
  CheckCircle2,
  FileVideo,
  Globe2,
  Lock,
  MapPinned,
  MessageCircle,
  Radio,
  Send,
  ShieldCheck,
  UploadCloud,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_OGN_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_OGN_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

type Story = { id: string; title: string; category: string | null; region: string | null; status: string | null };
type Media = { id: string; title: string; media_type: string; speaker: string | null; status: string | null; is_featured: boolean | null };
type Prayer = { id: string; name: string | null; category: string | null; request: string; status: string | null; assigned_to: string | null };
type Role = { user_id: string; role: string };
type Message = { id: string; channel_id: string; body: string; is_flagged: boolean | null };
type Territory = { id: string; name: string; level: string; status: string; reached_count: number | null; souls_saved_count: number | null; follow_up_count: number | null };
type Contact = { id: string; full_name: string | null; status: string | null; assigned_leader_name: string | null; follow_up_needed: boolean | null };
type Channel = { id: string; name: string; channel_type: string };

type AppData = {
  stories: Story[];
  media: Media[];
  prayers: Prayer[];
  roles: Role[];
  messages: Message[];
  territories: Territory[];
  contacts: Contact[];
  channels: Channel[];
};

const emptyData: AppData = { stories: [], media: [], prayers: [], roles: [], messages: [], territories: [], contacts: [], channels: [] };
const roleOptions = ['member', 'outreach', 'staff', 'leader', 'admin', 'super_admin'];
const prayerStatuses = ['new', 'praying', 'follow_up', 'answered', 'closed'];
const pushCategories = ['announcements', 'sermons', 'articles', 'chat', 'prayer', 'all'];

export function AppConsole() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AppData>(emptyData);
  const [storyForm, setStoryForm] = useState({ title: '', category: '', region: '', body: '', imageUrl: '' });
  const [mediaForm, setMediaForm] = useState({ mediaType: 'sermon', title: '', speaker: '', description: '', thumbnailUrl: '', fileUrl: '', externalUrl: '' });
  const [pushForm, setPushForm] = useState({ title: '', body: '', category: 'announcements' });
  const [roleForm, setRoleForm] = useState({ userId: '', role: 'member' });
  const [prayerAssignee, setPrayerAssignee] = useState('');
  const [prayerForm, setPrayerForm] = useState({ name: '', request: '' });

  const metrics = useMemo(() => {
    const reached = data.territories.reduce((sum, item) => sum + (item.reached_count || 0), 0);
    const saved = data.territories.reduce((sum, item) => sum + (item.souls_saved_count || 0), 0);
    const followUps = data.territories.reduce((sum, item) => sum + (item.follow_up_count || 0), 0);
    const due = data.contacts.filter((item) => item.follow_up_needed).length;
    return { reached, saved, followUps, due };
  }, [data]);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setNotice('Supabase public environment variables are not configured for this deployment yet.');
      return;
    }
    supabase.auth.getSession().then(({ data: auth }) => setSession(auth.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const protectedFallback = Promise.resolve({ data: [], error: null });
    const [stories, media, prayers, roles, messages, territories, contacts, channels] = await Promise.all([
      session ? supabase.from('app_stories').select('id,title,category,region,status').order('published_at', { ascending: false }).limit(30) : protectedFallback,
      session ? supabase.from('media_items').select('id,title,media_type,speaker,status,is_featured').order('published_at', { ascending: false }).limit(50) : protectedFallback,
      session ? supabase.from('prayer_requests').select('id,name,category,request,status,assigned_to').order('created_at', { ascending: false }).limit(40) : protectedFallback,
      session ? supabase.from('user_roles').select('user_id,role').limit(100) : protectedFallback,
      session ? supabase.from('chat_messages').select('id,channel_id,body,is_flagged').order('created_at', { ascending: false }).limit(50) : protectedFallback,
      session ? supabase.from('territories').select('id,name,level,status,reached_count,souls_saved_count,follow_up_count').limit(80) : protectedFallback,
      session ? supabase.from('outreach_contacts').select('id,full_name,status,assigned_leader_name,follow_up_needed').order('created_at', { ascending: false }).limit(50) : protectedFallback,
      session ? supabase.from('chat_channels').select('id,name,channel_type').order('created_at') : protectedFallback,
    ]);
    setData({
      stories: stories.data || [],
      media: media.data || [],
      prayers: prayers.data || [],
      roles: roles.data || [],
      messages: messages.data || [],
      territories: territories.data || [],
      contacts: contacts.data || [],
      channels: channels.data || [],
    });
    const errors = [stories.error, media.error, prayers.error, roles.error, messages.error, territories.error, contacts.error, channels.error].filter(Boolean);
    if (errors.length) setNotice('Some protected records could not load. Confirm this account has the correct role and RLS access.');
    setLoading(false);
  }, [session]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function signIn() {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setNotice(error ? error.message : 'Signed in. Protected app tools are loading.');
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setNotice('Signed out.');
  }

  async function sendPasswordReset() {
    if (!supabase) return;
    const target = email.trim().toLowerCase();
    if (!target) return setNotice('Enter your email first, then choose Forgot Password.');
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/app` : 'https://overcomersglobalnetwork.com/app';
    const { error } = await supabase.auth.resetPasswordForEmail(target, { redirectTo });
    setNotice(error ? error.message : `Password reset email sent to ${target}.`);
  }

  async function uploadAppFile(file: File, bucketId: 'app-assets' | 'story-media') {
    if (!supabase || !session) {
      setNotice('Sign in before uploading files.');
      return null;
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-');
    const objectPath = `website-app/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from(bucketId).upload(objectPath, file, { contentType: file.type, upsert: true });
    if (error) {
      setNotice(error.message);
      return null;
    }
    const { data: urlData } = supabase.storage.from(bucketId).getPublicUrl(objectPath);
    return urlData.publicUrl;
  }

  async function publishStory() {
    if (!supabase || !session) return setNotice('Sign in with an approved content/admin account first.');
    if (!storyForm.title.trim()) return setNotice('Add a story title before publishing.');
    const { error } = await supabase.from('app_stories').insert({
      title: storyForm.title.trim(),
      category: storyForm.category.trim() || null,
      region: storyForm.region.trim() || null,
      body: storyForm.body.trim() || null,
      image_url: storyForm.imageUrl || null,
      status: 'published',
      created_by: session.user.id,
      published_at: new Date().toISOString(),
    });
    if (error) return setNotice(error.message);
    await supabase.functions.invoke('send-push-notification', { body: { title: storyForm.title, body: storyForm.body || 'A new OGN story has been published.', category: 'announcements' } }).catch(() => null);
    setStoryForm({ title: '', category: '', region: '', body: '', imageUrl: '' });
    setNotice('Story published.');
    loadData();
  }

  async function publishMedia() {
    if (!supabase || !session) return setNotice('Sign in with an approved media/admin account first.');
    if (!mediaForm.title.trim()) return setNotice('Add a media title before publishing.');
    if (!mediaForm.fileUrl && !mediaForm.externalUrl.trim()) return setNotice('Upload an audio/video/PDF file or paste an external URL first.');
    const { error } = await supabase.from('media_items').insert({
      media_type: mediaForm.mediaType,
      title: mediaForm.title.trim(),
      speaker: mediaForm.speaker.trim() || null,
      description: mediaForm.description.trim() || null,
      thumbnail_url: mediaForm.thumbnailUrl || null,
      file_url: mediaForm.fileUrl || null,
      external_url: mediaForm.externalUrl.trim() || null,
      status: 'published',
      created_by: session.user.id,
      published_at: new Date().toISOString(),
      is_downloadable: true,
    });
    if (error) return setNotice(error.message);
    await supabase.functions.invoke('send-push-notification', { body: { title: mediaForm.title, body: mediaForm.description || `New ${mediaForm.mediaType} is available.`, category: mediaForm.mediaType === 'article' ? 'articles' : 'sermons' } }).catch(() => null);
    setMediaForm({ mediaType: 'sermon', title: '', speaker: '', description: '', thumbnailUrl: '', fileUrl: '', externalUrl: '' });
    setNotice('Media published.');
    loadData();
  }

  async function sendPush() {
    if (!supabase || !session) return setNotice('Sign in with an approved admin account first.');
    if (!pushForm.title.trim() || !pushForm.body.trim()) return setNotice('Add both a title and message before sending.');
    const { data: result, error } = await supabase.functions.invoke('send-push-notification', { body: pushForm });
    setNotice(error ? error.message : `Push sent to ${result?.sent || 0} device${result?.sent === 1 ? '' : 's'}.`);
  }

  async function submitPrayer() {
    if (!supabase || !prayerForm.request.trim()) return setNotice('Add a prayer request first.');
    const { error } = await supabase.from('prayer_requests').insert({
      name: prayerForm.name.trim() || 'Website visitor',
      category: 'Website app page',
      request: prayerForm.request.trim(),
      is_private: true,
      consent_received: true,
      created_by: session?.user.id || null,
    });
    if (error) return setNotice(error.message);
    setPrayerForm({ name: '', request: '' });
    setNotice('Prayer request submitted.');
    loadData();
  }

  async function grantRole() {
    if (!supabase || !session) return setNotice('Sign in with an approved admin account first.');
    if (!roleForm.userId.trim()) return setNotice('Paste a Supabase user ID first.');
    const { error } = await supabase.from('user_roles').upsert({ user_id: roleForm.userId.trim(), role: roleForm.role });
    if (error) return setNotice(error.message);
    setNotice('Role saved.');
    loadData();
  }

  async function revokeRole(userId = roleForm.userId, role = roleForm.role) {
    if (!supabase || !session) return setNotice('Sign in with an approved admin account first.');
    const { error } = await supabase.from('user_roles').delete().eq('user_id', userId.trim()).eq('role', role);
    if (error) return setNotice(error.message);
    setNotice('Role removed.');
    loadData();
  }

  async function updatePrayer(id: string, status: string) {
    if (!supabase || !session) return setNotice('Sign in with an approved prayer/admin account first.');
    const { error } = await supabase.from('prayer_requests').update({ status, assigned_to: prayerAssignee.trim() || null }).eq('id', id);
    if (error) return setNotice(error.message);
    setNotice('Prayer request updated.');
    loadData();
  }

  async function moderateMessage(id: string, remove = false) {
    if (!supabase || !session) return setNotice('Sign in with an approved moderator/admin account first.');
    const patch = remove ? { is_flagged: true, deleted_at: new Date().toISOString() } : { is_flagged: true };
    const { error } = await supabase.from('chat_messages').update(patch).eq('id', id);
    if (error) return setNotice(error.message);
    setNotice(remove ? 'Message removed.' : 'Message flagged.');
    loadData();
  }

  async function updateMedia(id: string, patch: Record<string, string | boolean | null>) {
    if (!supabase || !session) return setNotice('Sign in with an approved media/admin account first.');
    const { error } = await supabase.from('media_items').update(patch).eq('id', id);
    if (error) return setNotice(error.message);
    setNotice('Media record updated.');
    loadData();
  }

  return (
    <section className="bg-white">
      <style jsx global>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          padding: 0.75rem 1rem;
          color: #111827;
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .field:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.16);
        }
        .primary,
        .secondary,
        .danger,
        .mini,
        .miniDanger {
          border-radius: 999px;
          font-weight: 700;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .primary {
          width: 100%;
          background: #f59e0b;
          color: white;
          padding: 0.75rem 1.25rem;
        }
        .primary:hover { background: #d97706; }
        .secondary {
          width: 100%;
          border: 1px solid #fcd34d;
          color: #92400e;
          padding: 0.75rem 1.25rem;
        }
        .secondary:hover { background: #fffbeb; }
        .danger {
          width: 100%;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 0.75rem 1.25rem;
        }
        .danger:hover { background: #fef2f2; }
        .mini,
        .miniDanger {
          border: 1px solid #e5e7eb;
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
        }
        .mini { color: #374151; }
        .mini:hover { background: #f3f4f6; }
        .miniDanger {
          border-color: #fecaca;
          color: #b91c1c;
        }
        .miniDanger:hover { background: #fef2f2; }
      `}</style>
      <div className="bg-[#071B45] px-4 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200"><Radio className="h-4 w-4" /> OGN App Command Center</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Mobile app admin, media, prayer, chat, and evangelism controls.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">This protected console connects the website to the same Supabase backend used by the iOS and Android app. Sign in with an approved role to manage live app content.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {notice && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 font-medium text-amber-900">{notice}</div>}
        <div className="grid gap-6 md:grid-cols-4">
          <Metric icon={<Globe2 />} label="People reached" value={metrics.reached} />
          <Metric icon={<Users />} label="Souls saved" value={metrics.saved} />
          <Metric icon={<MapPinned />} label="Follow-ups" value={metrics.followUps} />
          <Metric icon={<Bell />} label="Due now" value={metrics.due} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <Panel title="App Publishing" icon={<UploadCloud className="h-5 w-5" />}>
              {session ? (
                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Stories</h3>
                    <input value={storyForm.title} onChange={(event) => setStoryForm((current) => ({ ...current, title: event.target.value }))} className="field" placeholder="Story title" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input value={storyForm.category} onChange={(event) => setStoryForm((current) => ({ ...current, category: event.target.value }))} className="field" placeholder="Category" />
                      <input value={storyForm.region} onChange={(event) => setStoryForm((current) => ({ ...current, region: event.target.value }))} className="field" placeholder="Region" />
                    </div>
                    <textarea value={storyForm.body} onChange={(event) => setStoryForm((current) => ({ ...current, body: event.target.value }))} className="field min-h-24" placeholder="Story body" />
                    {storyForm.imageUrl && <img src={storyForm.imageUrl} alt="Story cover preview" className="aspect-[5/2] w-full rounded-xl object-cover" />}
                    <FileInput label="Upload story cover photo or video" accept="image/*,video/*" onUpload={async (file) => {
                      const url = await uploadAppFile(file, 'story-media');
                      if (url) setStoryForm((current) => ({ ...current, imageUrl: url }));
                    }} />
                    <button onClick={publishStory} className="primary">Publish Story</button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">Media</h3>
                    <select value={mediaForm.mediaType} onChange={(event) => setMediaForm((current) => ({ ...current, mediaType: event.target.value }))} className="field">
                      {['sermon', 'article', 'video', 'music', 'live', 'devotional'].map((kind) => <option key={kind} value={kind}>{kind}</option>)}
                    </select>
                    <input value={mediaForm.title} onChange={(event) => setMediaForm((current) => ({ ...current, title: event.target.value }))} className="field" placeholder="Title" />
                    <input value={mediaForm.speaker} onChange={(event) => setMediaForm((current) => ({ ...current, speaker: event.target.value }))} className="field" placeholder="Speaker / artist" />
                    <textarea value={mediaForm.description} onChange={(event) => setMediaForm((current) => ({ ...current, description: event.target.value }))} className="field min-h-20" placeholder="Description" />
                    <input value={mediaForm.externalUrl} onChange={(event) => setMediaForm((current) => ({ ...current, externalUrl: event.target.value }))} className="field" placeholder="External video/audio URL" />
                    {mediaForm.thumbnailUrl && <img src={mediaForm.thumbnailUrl} alt="Media cover preview" className="aspect-video w-full rounded-xl object-cover" />}
                    <FileInput label="Upload cover photo" accept="image/*" onUpload={async (file) => {
                      const url = await uploadAppFile(file, 'app-assets');
                      if (url) setMediaForm((current) => ({ ...current, thumbnailUrl: url }));
                    }} />
                    {mediaForm.fileUrl && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-800">Media file uploaded and ready.</div>}
                    <FileInput label="Upload audio, video, sermon notes, or article PDF" accept="video/*,audio/*,application/pdf" onUpload={async (file) => {
                      const url = await uploadAppFile(file, 'app-assets');
                      if (url) setMediaForm((current) => ({ ...current, fileUrl: url }));
                    }} />
                    <button onClick={publishMedia} className="primary bg-[#071B45] hover:bg-[#0B1D4D]">Publish Media</button>
                  </div>
                </div>
              ) : <LockedMessage />}
            </Panel>

            <Panel title="Admin Builder Workbench" icon={<ShieldCheck className="h-5 w-5" />}>
              {session ? (
                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="space-y-4 rounded-xl bg-gray-50 p-4">
                    <h3 className="font-bold text-gray-900">Role Management</h3>
                    <input value={roleForm.userId} onChange={(event) => setRoleForm((current) => ({ ...current, userId: event.target.value }))} className="field" placeholder="Supabase user ID" />
                    <select value={roleForm.role} onChange={(event) => setRoleForm((current) => ({ ...current, role: event.target.value }))} className="field">
                      {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={grantRole} className="primary">Grant</button>
                      <button onClick={() => revokeRole()} className="danger">Revoke</button>
                    </div>
                    <List items={data.roles.slice(0, 8).map((role) => ({ title: role.user_id, body: role.role, action: <button onClick={() => revokeRole(role.user_id, role.role)} className="miniDanger">Remove</button> }))} empty="No roles visible." />
                  </div>

                  <div className="space-y-4 rounded-xl bg-gray-50 p-4">
                    <h3 className="font-bold text-gray-900">Prayer Workflow</h3>
                    <input value={prayerAssignee} onChange={(event) => setPrayerAssignee(event.target.value)} className="field" placeholder="Optional assigned user ID" />
                    <List items={data.prayers.slice(0, 8).map((prayer) => ({
                      title: prayer.name || 'Prayer request',
                      body: prayer.request,
                      action: <div className="flex flex-wrap gap-2">{prayerStatuses.map((status) => <button key={status} onClick={() => updatePrayer(prayer.id, status)} className="mini">{status}</button>)}</div>,
                    }))} empty="No prayer requests visible." />
                  </div>

                  <div className="space-y-4 rounded-xl bg-gray-50 p-4">
                    <h3 className="font-bold text-gray-900">Chat Moderation</h3>
                    <List items={data.messages.slice(0, 10).map((message) => ({
                      title: channelName(data.channels, message.channel_id),
                      body: `${message.is_flagged ? 'Flagged' : 'Visible'} - ${message.body}`,
                      action: <div className="flex gap-2"><button onClick={() => moderateMessage(message.id)} className="mini">Flag</button><button onClick={() => moderateMessage(message.id, true)} className="miniDanger">Remove</button></div>,
                    }))} empty="No chat messages visible." />
                  </div>

                  <div className="space-y-4 rounded-xl bg-gray-50 p-4">
                    <h3 className="font-bold text-gray-900">Media Manager</h3>
                    <List items={data.media.slice(0, 10).map((item) => ({
                      title: item.title,
                      body: `${item.media_type} - ${item.status || 'draft'}${item.is_featured ? ' - featured' : ''}`,
                      action: <div className="flex gap-2"><button onClick={() => updateMedia(item.id, { is_featured: !item.is_featured })} className="mini">{item.is_featured ? 'Unfeature' : 'Feature'}</button><button onClick={() => updateMedia(item.id, { status: 'archived' })} className="miniDanger">Archive</button></div>,
                    }))} empty="No media visible." />
                  </div>
                </div>
              ) : <LockedMessage />}
            </Panel>

            <Panel title="Evangelism Dashboard" icon={<MapPinned className="h-5 w-5" />}>
              {session ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <List items={data.territories.slice(0, 8).map((item) => ({ title: item.name, body: `${item.level} - ${item.status} - ${item.reached_count || 0} reached` }))} empty="No territories visible." />
                  <List items={data.contacts.slice(0, 8).map((item) => ({ title: item.full_name || 'Outreach contact', body: `${item.status || 'contact'} - ${item.assigned_leader_name || 'unassigned'}` }))} empty="No contacts visible." />
                </div>
              ) : <LockedMessage />}
            </Panel>
          </div>

          <aside className="space-y-8">
            <Panel title={session ? 'Leader Session' : 'Leader Sign In'} icon={<ShieldCheck className="h-5 w-5" />}>
              {session ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-green-50 p-4 text-green-800"><CheckCircle2 className="mb-2 h-5 w-5" />Signed in as {session.user.email}</div>
                  <button onClick={signOut} className="secondary">Sign Out</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input value={email} onChange={(event) => setEmail(event.target.value)} className="field" placeholder="Leader email" type="email" />
                  <input value={password} onChange={(event) => setPassword(event.target.value)} className="field" placeholder="Password" type="password" />
                  <button onClick={signIn} className="primary">Sign In</button>
                  <button onClick={sendPasswordReset} className="secondary">Forgot Password</button>
                  <p className="text-sm text-gray-500">Approved app roles can manage protected content. Public users cannot access the mobile app beyond onboarding/sign in.</p>
                </div>
              )}
            </Panel>

            <Panel title="Prayer Intake" icon={<Bell className="h-5 w-5" />}>
              <div className="space-y-3">
                <input value={prayerForm.name} onChange={(event) => setPrayerForm((current) => ({ ...current, name: event.target.value }))} className="field" placeholder="Name or Anonymous" />
                <textarea value={prayerForm.request} onChange={(event) => setPrayerForm((current) => ({ ...current, request: event.target.value }))} className="field min-h-28" placeholder="Prayer request" />
                <button onClick={submitPrayer} className="primary bg-[#071B45] hover:bg-[#0B1D4D]">Submit Prayer Request</button>
              </div>
            </Panel>

            <Panel title="Push Announcement" icon={<Send className="h-5 w-5" />}>
              <div className="space-y-3">
                <select value={pushForm.category} onChange={(event) => setPushForm((current) => ({ ...current, category: event.target.value }))} className="field">
                  {pushCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
                <input value={pushForm.title} onChange={(event) => setPushForm((current) => ({ ...current, title: event.target.value }))} className="field" placeholder="Notification title" />
                <textarea value={pushForm.body} onChange={(event) => setPushForm((current) => ({ ...current, body: event.target.value }))} className="field min-h-24" placeholder="Announcement message" />
                <button onClick={sendPush} className="primary">Send Push</button>
              </div>
            </Panel>

            <Panel title="Store Review Readiness" icon={<FileVideo className="h-5 w-5" />}>
              <ul className="space-y-3 text-sm text-gray-700">
                <ChecklistItem label="Privacy, Support, and Terms pages are live" />
                <ChecklistItem label="Uploads use Supabase Storage buckets" />
                <ChecklistItem label="Push uses Expo token registration and Edge Function send" />
                <ChecklistItem label="Chat moderation and UGC reporting are available in app" />
                <ChecklistItem label={loading ? 'Loading app records...' : 'App backend connected'} />
              </ul>
            </Panel>
          </aside>
        </div>
      </div>
    </section>
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
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#071B45] text-amber-300">{icon}</div>
      <div className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="mt-1 text-sm font-medium text-gray-500">{label}</div>
    </div>
  );
}

function FileInput({ label, accept, onUpload }: { label: string; accept: string; onUpload: (file: File) => void | Promise<void> }) {
  return (
    <label className="block rounded-xl border border-dashed border-amber-300 px-4 py-3 text-sm">
      <span className="mb-2 block font-semibold text-gray-700">{label}</span>
      <input type="file" accept={accept} onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} className="w-full text-sm" />
    </label>
  );
}

function List({ items, empty }: { items: { title: string; body: string; action?: React.ReactNode }[]; empty: string }) {
  return (
    <div className="space-y-3">
      {items.length ? items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="break-all font-semibold text-gray-900">{item.title}</div>
          <div className="mt-1 line-clamp-3 text-sm leading-5 text-gray-600">{item.body}</div>
          {item.action && <div className="mt-3">{item.action}</div>}
        </div>
      )) : <p className="text-sm text-gray-500">{empty}</p>}
    </div>
  );
}

function LockedMessage() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
      <Lock className="mx-auto h-8 w-8 text-gray-500" />
      <h3 className="mt-3 font-bold text-gray-900">Protected by Supabase RLS</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">Sign in with an approved outreach, staff, leader, media, prayer, moderator, or admin role to manage live app data.</p>
    </div>
  );
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 text-green-700" />
      <span>{label}</span>
    </li>
  );
}

function channelName(channels: Channel[], channelId: string) {
  return channels.find((channel) => channel.id === channelId)?.name || 'Chat message';
}
