'use client';

import { createClient, type Session } from '@supabase/supabase-js';
import { Bell, CheckCircle2, FileVideo, Globe2, Lock, MapPinned, MessageCircle, Radio, Send, ShieldCheck, UploadCloud, UserX, Users } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_OGN_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_OGN_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

type Row = Record<string, any>;
type Tab = 'dashboard' | 'publish' | 'announcements' | 'people' | 'moderation' | 'prayer' | 'evangelism' | 'settings';

const tabs: Tab[] = ['dashboard', 'publish', 'announcements', 'people', 'moderation', 'prayer', 'evangelism', 'settings'];
const roleOptions = ['member', 'prayer_team', 'media_admin', 'moderator', 'outreach', 'staff', 'leader', 'admin', 'super_admin'];
const prayerStatuses = ['new', 'praying', 'follow_up', 'answered', 'closed'];
const emptyData = { stories: [] as Row[], media: [] as Row[], prayers: [] as Row[], roles: [] as Row[], messages: [] as Row[], channels: [] as Row[], territories: [] as Row[], contacts: [] as Row[], profiles: [] as Row[], statuses: [] as Row[], reports: [] as Row[], events: [] as Row[] };

export function AppConsole() {
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(emptyData);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [story, setStory] = useState({ title: '', category: '', region: '', body: '', imageUrl: '' });
  const [media, setMedia] = useState({ mediaType: 'sermon', title: '', speaker: '', description: '', thumbnailUrl: '', fileUrl: '', externalUrl: '' });
  const [event, setEvent] = useState({ title: '', description: '', location: 'Online / OGN Broadcast', startsAt: '', imageUrl: '', registrationUrl: '' });
  const [push, setPush] = useState({ title: '', body: '', category: 'announcements' });
  const [role, setRole] = useState({ userId: '', value: 'member' });
  const [statusReason, setStatusReason] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [prayerAssignee, setPrayerAssignee] = useState('');
  const [prayer, setPrayer] = useState({ name: '', request: '' });

  const metrics = useMemo(() => ({
    reached: data.territories.reduce((sum, item) => sum + (item.reached_count || 0), 0),
    saved: data.territories.reduce((sum, item) => sum + (item.souls_saved_count || 0), 0),
    followUps: data.territories.reduce((sum, item) => sum + (item.follow_up_count || 0), 0),
    due: data.contacts.filter((item) => item.follow_up_needed).length,
  }), [data]);

  const userStatus = useMemo(() => new Map(data.statuses.map((item) => [item.user_id, item.status || 'active'])), [data.statuses]);
  const rolesByUser = useMemo(() => {
    const map = new Map<string, string[]>();
    data.roles.forEach((item) => map.set(item.user_id, [...(map.get(item.user_id) || []), item.role]));
    return map;
  }, [data.roles]);
  const users = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    return q ? data.profiles.filter((p) => [p.id, p.display_name, p.phone, p.region, p.country].some((v) => String(v || '').toLowerCase().includes(q))) : data.profiles;
  }, [data.profiles, userSearch]);

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
    const none = Promise.resolve({ data: [], error: null });
    const q = (query: any) => (session ? query : none);
    const [stories, mediaRows, prayers, roles, messages, channels, territories, contacts, profiles, statuses, reports, events] = await Promise.all([
      q(supabase.from('app_stories').select('id,title,category,region,status').order('published_at', { ascending: false }).limit(40)),
      q(supabase.from('media_items').select('id,title,media_type,speaker,status,is_featured').order('published_at', { ascending: false }).limit(60)),
      q(supabase.from('prayer_requests').select('id,name,category,request,status,assigned_to').order('created_at', { ascending: false }).limit(50)),
      q(supabase.from('user_roles').select('user_id,role').limit(200)),
      q(supabase.from('chat_messages').select('id,channel_id,body,is_flagged').order('created_at', { ascending: false }).limit(60)),
      q(supabase.from('chat_channels').select('id,name,channel_type').order('created_at')),
      q(supabase.from('territories').select('id,name,level,status,reached_count,souls_saved_count,follow_up_count').limit(100)),
      q(supabase.from('outreach_contacts').select('id,full_name,status,assigned_leader_name,follow_up_needed').order('created_at', { ascending: false }).limit(80)),
      q(supabase.from('profiles').select('id,display_name,phone,country,region,created_at').order('created_at', { ascending: false }).limit(200)),
      q(supabase.from('user_admin_status').select('user_id,status,reason,updated_at').limit(200)),
      q(supabase.from('content_reports').select('id,target_type,target_id,reason,status,created_at').order('created_at', { ascending: false }).limit(60)),
      supabase.from('events').select('id,title,description,location,starts_at,image_url,registration_url').order('starts_at', { ascending: true }).limit(60),
    ]);
    setData({ stories: stories.data || [], media: mediaRows.data || [], prayers: prayers.data || [], roles: roles.data || [], messages: messages.data || [], channels: channels.data || [], territories: territories.data || [], contacts: contacts.data || [], profiles: profiles.data || [], statuses: statuses.data || [], reports: reports.data || [], events: events.data || [] });
    if ([stories, mediaRows, prayers, roles, messages, channels, territories, contacts, profiles, statuses, reports, events].some((r) => r.error)) setNotice('Some protected records could not load. Confirm this account has the correct role and RLS access.');
    setLoading(false);
  }, [session]);

  useEffect(() => { loadData(); }, [loadData]);

  async function signIn() {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setNotice(error ? error.message : 'Signed in. Protected app tools are loading.');
  }

  async function resetPassword() {
    if (!supabase) return;
    if (!email.trim()) return setNotice('Enter your email first, then choose Forgot Password.');
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/app` : 'https://overcomersglobalnetwork.com/app';
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo });
    setNotice(error ? error.message : `Password reset email sent to ${email.trim().toLowerCase()}.`);
  }

  async function uploadFile(file: File, bucket: 'app-assets' | 'story-media') {
    if (!supabase || !session) return setNotice('Sign in before uploading files.'), null;
    const objectPath = `website-app/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]+/g, '-')}`;
    const { error } = await supabase.storage.from(bucket).upload(objectPath, file, { contentType: file.type, upsert: true });
    if (error) return setNotice(error.message), null;
    return supabase.storage.from(bucket).getPublicUrl(objectPath).data.publicUrl;
  }

  async function publishStory() {
    if (!supabase || !session) return setNotice('Sign in with an approved content/admin account first.');
    if (!story.title.trim()) return setNotice('Add a story title before publishing.');
    const { error } = await supabase.from('app_stories').insert({ title: story.title.trim(), category: story.category || null, region: story.region || null, body: story.body || null, image_url: story.imageUrl || null, status: 'published', created_by: session.user.id, published_at: new Date().toISOString() });
    if (error) return setNotice(error.message);
    await supabase.functions.invoke('send-push-notification', { body: { title: story.title, body: story.body || 'A new OGN story has been published.', category: 'announcements' } }).catch(() => null);
    setStory({ title: '', category: '', region: '', body: '', imageUrl: '' });
    setNotice('Story published.');
    loadData();
  }

  async function publishMedia() {
    if (!supabase || !session) return setNotice('Sign in with an approved media/admin account first.');
    if (!media.title.trim()) return setNotice('Add a media title before publishing.');
    if (!media.fileUrl && !media.externalUrl.trim()) return setNotice('Upload an audio/video/PDF file or paste an external URL first.');
    const { error } = await supabase.from('media_items').insert({ media_type: media.mediaType, title: media.title.trim(), speaker: media.speaker || null, description: media.description || null, thumbnail_url: media.thumbnailUrl || null, file_url: media.fileUrl || null, external_url: media.externalUrl || null, status: 'published', created_by: session.user.id, published_at: new Date().toISOString(), is_downloadable: true });
    if (error) return setNotice(error.message);
    await supabase.functions.invoke('send-push-notification', { body: { title: media.title, body: media.description || `New ${media.mediaType} is available.`, category: media.mediaType === 'article' ? 'articles' : 'sermons' } }).catch(() => null);
    setMedia({ mediaType: 'sermon', title: '', speaker: '', description: '', thumbnailUrl: '', fileUrl: '', externalUrl: '' });
    setNotice('Media published.');
    loadData();
  }

  async function publishEvent() {
    if (!supabase || !session) return setNotice('Sign in with an approved staff/admin account first.');
    if (!event.title.trim() || !event.startsAt.trim()) return setNotice('Add an event title and start date/time.');
    const { error } = await supabase.from('events').insert({ title: event.title.trim(), description: event.description || null, location: event.location || null, starts_at: new Date(event.startsAt).toISOString(), image_url: event.imageUrl || null, registration_url: event.registrationUrl || null });
    if (error) return setNotice(error.message);
    await supabase.from('app_stories').insert({ title: event.title.trim(), category: 'Event', region: event.location || null, body: event.description || 'New OGN event published.', image_url: event.imageUrl || null, action_url: event.registrationUrl || null, status: 'published', created_by: session.user.id, published_at: new Date().toISOString() });
    const channel = data.channels.find((c) => c.channel_type === 'announcement');
    if (channel) await supabase.from('chat_messages').insert({ channel_id: channel.id, user_id: session.user.id, body: `New event: ${event.title}\n${event.description}` });
    await supabase.functions.invoke('send-push-notification', { body: { title: event.title, body: event.description || 'New OGN event is available.', category: 'announcements' } }).catch(() => null);
    setEvent({ title: '', description: '', location: 'Online / OGN Broadcast', startsAt: '', imageUrl: '', registrationUrl: '' });
    setNotice('Event published and sent to announcements.');
    loadData();
  }

  async function sendPush() {
    if (!supabase || !session) return setNotice('Sign in with an approved admin account first.');
    if (!push.title.trim() || !push.body.trim()) return setNotice('Add both a title and message before sending.');
    const { data: result, error } = await supabase.functions.invoke('send-push-notification', { body: push });
    setNotice(error ? error.message : `Push sent to ${result?.sent || 0} device${result?.sent === 1 ? '' : 's'}.`);
  }

  async function submitPrayer() {
    if (!supabase || !prayer.request.trim()) return setNotice('Add a prayer request first.');
    const { error } = await supabase.from('prayer_requests').insert({ name: prayer.name || 'Website visitor', category: 'Website app page', request: prayer.request, is_private: true, consent_received: true, created_by: session?.user.id || null });
    if (error) return setNotice(error.message);
    setPrayer({ name: '', request: '' });
    setNotice('Prayer request submitted.');
    loadData();
  }

  async function saveRole(userId = role.userId, value = role.value) {
    if (!supabase || !session) return setNotice('Sign in with an approved admin account first.');
    if (!userId.trim()) return setNotice('Select or paste a Supabase user ID first.');
    const { error } = await supabase.from('user_roles').upsert({ user_id: userId.trim(), role: value });
    if (error) return setNotice(error.message);
    setNotice('Role saved.');
    loadData();
  }

  async function setUserStatus(userId: string, status: 'active' | 'paused' | 'muted' | 'removed') {
    if (!supabase || !session) return setNotice('Sign in with an approved admin account first.');
    const { error } = await supabase.from('user_admin_status').upsert({ user_id: userId, status, reason: statusReason || null, updated_by: session.user.id, updated_at: new Date().toISOString() });
    if (error) return setNotice(error.message);
    if (status === 'removed') await Promise.all([supabase.from('chat_members').delete().eq('user_id', userId), supabase.from('user_roles').delete().eq('user_id', userId)]);
    await supabase.from('audit_logs').insert({ actor_id: session.user.id, action: `user_${status}`, table_name: 'user_admin_status', record_id: userId, metadata: { reason: statusReason || null } });
    setNotice(`User marked ${status}.`);
    loadData();
  }

  async function updateRow(table: string, id: string, patch: Row, label: string) {
    if (!supabase || !session) return setNotice('Sign in first.');
    const { error } = await supabase.from(table).update(patch).eq('id', id);
    if (error) return setNotice(error.message);
    setNotice(label);
    loadData();
  }

  async function deleteRow(table: string, id: string, label: string) {
    if (!supabase || !session) return setNotice('Sign in first.');
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) return setNotice(error.message);
    setNotice(label);
    loadData();
  }

  return (
    <section className="bg-white">
      <div className="bg-[#071B45] px-4 pb-16 pt-36 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200"><Radio className="h-4 w-4" /> OGN App Command Center</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Back office for the live iOS and Android app.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Publish app content, upload media, send announcements, manage people, moderate chat, track prayer, and review evangelism follow-up from one protected console.</p>
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
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${tab === item ? 'bg-[#071B45] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{title(item)}</button>)}</div>
            {!session && <LockedMessage />}
            {session && tab === 'dashboard' && <Grid><Panel title="Recent Stories" icon={<Radio className="h-5 w-5" />}><Rows items={data.stories.slice(0, 8)} map={(i) => ({ title: i.title, body: `${i.category || 'Story'} - ${i.region || 'Global'} - ${i.status || 'draft'}` })} /></Panel><Panel title="Recent Media" icon={<FileVideo className="h-5 w-5" />}><Rows items={data.media.slice(0, 8)} map={(i) => ({ title: i.title, body: `${i.media_type} - ${i.speaker || 'OGN'} - ${i.status || 'draft'}` })} /></Panel></Grid>}
            {session && tab === 'publish' && <Grid><Panel title="Stories" icon={<UploadCloud className="h-5 w-5" />}><Fields state={story} setState={setStory} fields={['title', 'category', 'region', 'body']} /><FileInput label="Upload story cover photo or video" accept="image/*,video/*" onUpload={async (file) => { const url = await uploadFile(file, 'story-media'); if (url) setStory((v) => ({ ...v, imageUrl: url })); }} /><button onClick={publishStory} className="primary">Publish Story</button></Panel><Panel title="Media Library" icon={<FileVideo className="h-5 w-5" />}><select className="field" value={media.mediaType} onChange={(e) => setMedia((v) => ({ ...v, mediaType: e.target.value }))}>{['sermon', 'article', 'video', 'music', 'live', 'devotional'].map((kind) => <option key={kind}>{kind}</option>)}</select><Fields state={media} setState={setMedia} fields={['title', 'speaker', 'description', 'externalUrl']} /><FileInput label="Upload cover photo" accept="image/*" onUpload={async (file) => { const url = await uploadFile(file, 'app-assets'); if (url) setMedia((v) => ({ ...v, thumbnailUrl: url })); }} /><FileInput label="Upload audio, video, sermon notes, or article PDF" accept="video/*,audio/*,application/pdf" onUpload={async (file) => { const url = await uploadFile(file, 'app-assets'); if (url) setMedia((v) => ({ ...v, fileUrl: url })); }} /><button onClick={publishMedia} className="primary">Publish Media</button></Panel></Grid>}
            {session && tab === 'announcements' && <Grid><Panel title="Events to Announcements" icon={<Bell className="h-5 w-5" />}><Fields state={event} setState={setEvent} fields={['title', 'description', 'location', 'startsAt', 'registrationUrl']} /><FileInput label="Upload event cover" accept="image/*" onUpload={async (file) => { const url = await uploadFile(file, 'app-assets'); if (url) setEvent((v) => ({ ...v, imageUrl: url })); }} /><button onClick={publishEvent} className="primary">Publish Event + Announcement</button></Panel><Panel title="Push Announcement" icon={<Send className="h-5 w-5" />}><select className="field" value={push.category} onChange={(e) => setPush((v) => ({ ...v, category: e.target.value }))}>{['announcements', 'sermons', 'articles', 'chat', 'prayer', 'all'].map((c) => <option key={c}>{c}</option>)}</select><Fields state={push} setState={setPush} fields={['title', 'body']} /><button onClick={sendPush} className="primary">Send Push</button><Rows items={data.events.slice(0, 6)} map={(i) => ({ title: i.title, body: `${formatDate(i.starts_at)} - ${i.location || 'Online'}`, action: <button onClick={() => deleteRow('events', i.id, 'Event removed.')} className="miniDanger">Remove</button> })} /></Panel></Grid>}
            {session && tab === 'people' && <Panel title="People & Access" icon={<Users className="h-5 w-5" />}><div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px_1fr]"><input className="field" placeholder="Search name, phone, region, or user ID" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} /><select className="field" value={role.value} onChange={(e) => setRole((v) => ({ ...v, value: e.target.value }))}>{roleOptions.map((r) => <option key={r}>{r}</option>)}</select><input className="field" placeholder="Reason for pause/remove/mute" value={statusReason} onChange={(e) => setStatusReason(e.target.value)} /></div><div className="grid gap-3">{users.slice(0, 50).map((p) => <div key={p.id} className="rounded-xl border border-gray-200 bg-white p-4"><div className="font-bold text-gray-900">{p.display_name || 'Unnamed member'}</div><div className="text-sm text-gray-500">{p.phone || 'No phone'} - {p.region || p.country || 'No region'} - {userStatus.get(p.id) || 'active'}</div><div className="break-all text-xs text-gray-400">{p.id}</div><div className="my-2 flex flex-wrap gap-2">{(rolesByUser.get(p.id) || ['member']).map((r) => <span key={r} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">{r}</span>)}</div><div className="flex flex-wrap gap-2"><button onClick={() => saveRole(p.id, role.value)} className="mini">Grant Role</button><button onClick={() => setUserStatus(p.id, 'active')} className="mini">Activate</button><button onClick={() => setUserStatus(p.id, 'paused')} className="mini">Pause</button><button onClick={() => setUserStatus(p.id, 'muted')} className="mini">Mute</button><button onClick={() => setUserStatus(p.id, 'removed')} className="miniDanger"><UserX className="mr-1 inline h-3.5 w-3.5" />Remove</button></div></div>)}</div></Panel>}
            {session && tab === 'moderation' && <Grid><Panel title="Content Reports" icon={<ShieldCheck className="h-5 w-5" />}><Rows items={data.reports.slice(0, 16)} map={(i) => ({ title: `${i.target_type} - ${i.status}`, body: `${i.reason || 'No reason'} - ${formatDate(i.created_at)}`, action: <><button onClick={() => updateRow('content_reports', i.id, { status: 'reviewing' }, 'Report marked reviewing.')} className="mini">Reviewing</button> <button onClick={() => updateRow('content_reports', i.id, { status: 'resolved' }, 'Report resolved.')} className="mini">Resolved</button></> })} /></Panel><Panel title="Chat Moderation" icon={<MessageCircle className="h-5 w-5" />}><Rows items={data.messages.slice(0, 16)} map={(i) => ({ title: channelName(data.channels, i.channel_id), body: `${i.is_flagged ? 'Flagged' : 'Visible'} - ${i.body}`, action: <><button onClick={() => updateRow('chat_messages', i.id, { is_flagged: true }, 'Message flagged.')} className="mini">Flag</button> <button onClick={() => updateRow('chat_messages', i.id, { is_flagged: true, deleted_at: new Date().toISOString() }, 'Message removed.')} className="miniDanger">Remove</button></> })} /></Panel></Grid>}
            {session && tab === 'prayer' && <Panel title="Prayer Workflow" icon={<Bell className="h-5 w-5" />}><input className="field mb-3" placeholder="Optional assigned user ID" value={prayerAssignee} onChange={(e) => setPrayerAssignee(e.target.value)} /><Rows items={data.prayers.slice(0, 24)} map={(i) => ({ title: i.name || 'Prayer request', body: `${i.category || 'General'} - ${i.request}`, action: <>{prayerStatuses.map((s) => <button key={s} onClick={() => updateRow('prayer_requests', i.id, { status: s, assigned_to: prayerAssignee || null }, 'Prayer request updated.')} className="mini">{s}</button>)}</> })} /></Panel>}
            {session && tab === 'evangelism' && <Panel title="Evangelism Dashboard" icon={<MapPinned className="h-5 w-5" />}><Grid><Rows items={data.territories.slice(0, 14)} map={(i) => ({ title: i.name, body: `${i.level} - ${i.status} - ${i.reached_count || 0} reached - ${i.follow_up_count || 0} follow-ups` })} /><Rows items={data.contacts.slice(0, 14)} map={(i) => ({ title: i.full_name || 'Outreach contact', body: `${i.status || 'contact'} - ${i.assigned_leader_name || 'unassigned'}${i.follow_up_needed ? ' - follow-up needed' : ''}` })} /></Grid></Panel>}
            {session && tab === 'settings' && <Panel title="System Settings" icon={<FileVideo className="h-5 w-5" />}><Rows items={data.media.slice(0, 14)} map={(i) => ({ title: i.title, body: `${i.media_type} - ${i.status || 'draft'}${i.is_featured ? ' - featured' : ''}`, action: <><button onClick={() => updateRow('media_items', i.id, { is_featured: !i.is_featured }, 'Media featured setting updated.')} className="mini">{i.is_featured ? 'Unfeature' : 'Feature'}</button> <button onClick={() => updateRow('media_items', i.id, { status: 'archived' }, 'Media archived.')} className="miniDanger">Archive</button></> })} /></Panel>}
          </div>
          <aside className="space-y-8">
            <Panel title={session ? 'Admin Session' : 'Admin Sign In'} icon={<ShieldCheck className="h-5 w-5" />}>{session ? <div className="space-y-4"><div className="rounded-xl bg-green-50 p-4 text-green-800"><CheckCircle2 className="mb-2 h-5 w-5" />Signed in as {session.user.email}</div><button onClick={async () => { await supabase?.auth.signOut(); setNotice('Signed out.'); }} className="secondary">Sign Out</button></div> : <div className="space-y-3"><input className="field" placeholder="Admin email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><input className="field" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><button onClick={signIn} className="primary">Sign In</button><button onClick={resetPassword} className="secondary">Forgot Password</button><p className="text-sm text-gray-500">Approved app roles can manage protected content. Service-role keys are never exposed here.</p></div>}</Panel>
            <Panel title="Quick Prayer Intake" icon={<Bell className="h-5 w-5" />}><Fields state={prayer} setState={setPrayer} fields={['name', 'request']} /><button onClick={submitPrayer} className="primary">Submit Prayer Request</button></Panel>
            <Panel title="Store Review Readiness" icon={<FileVideo className="h-5 w-5" />}><ul className="space-y-3 text-sm text-gray-700">{['Privacy, Support, and Terms pages are live', 'Admins can upload covers, audio, video, and PDFs', 'Events publish to Announcements and push', 'Admins can pause, mute, remove, and role users', loading ? 'Loading app records...' : 'Back office connected to app backend'].map((label) => <li key={label} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-700" />{label}</li>)}</ul></Panel>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">{icon}</div><h2 className="text-xl font-bold text-gray-900">{title}</h2></div>{children}</section>;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#071B45] text-amber-300">{icon}</div><div className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</div><div className="mt-1 text-sm font-medium text-gray-500">{label}</div></div>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 xl:grid-cols-2">{children}</div>;
}

function Fields({ state, setState, fields }: { state: Row; setState: React.Dispatch<React.SetStateAction<any>>; fields: string[] }) {
  return <div className="space-y-3">{fields.map((field) => field.toLowerCase().includes('body') || field.toLowerCase().includes('description') || field === 'request' ? <textarea key={field} className="field min-h-20" placeholder={label(field)} value={state[field] || ''} onChange={(e) => setState((v: Row) => ({ ...v, [field]: e.target.value }))} /> : <input key={field} className="field" placeholder={label(field)} value={state[field] || ''} onChange={(e) => setState((v: Row) => ({ ...v, [field]: e.target.value }))} />)}</div>;
}

function FileInput({ label, accept, onUpload }: { label: string; accept: string; onUpload: (file: File) => void | Promise<void> }) {
  return <label className="my-3 block rounded-xl border border-dashed border-amber-300 px-4 py-3 text-sm"><span className="mb-2 block font-semibold text-gray-700">{label}</span><input type="file" accept={accept} onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} className="w-full text-sm" /></label>;
}

function Rows({ items, map }: { items: Row[]; map: (item: Row) => { title: string; body: string; action?: React.ReactNode } }) {
  return <div className="space-y-3">{items.length ? items.map((item, index) => { const row = map(item); return <div key={`${row.title}-${index}`} className="rounded-xl border border-gray-200 bg-white p-3"><div className="break-all font-semibold text-gray-900">{row.title}</div><div className="mt-1 line-clamp-3 text-sm leading-5 text-gray-600">{row.body}</div>{row.action && <div className="mt-3 flex flex-wrap gap-2">{row.action}</div>}</div>; }) : <p className="text-sm text-gray-500">No records visible.</p>}</div>;
}

function LockedMessage() {
  return <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center"><Lock className="mx-auto h-8 w-8 text-gray-500" /><h3 className="mt-3 font-bold text-gray-900">Protected by Supabase RLS</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">Sign in with an approved outreach, staff, leader, media, prayer, moderator, or admin role to manage live app data.</p></div>;
}

function title(value: string) {
  return value.replace(/(^|_)([a-z])/g, (_match, prefix, letter) => `${prefix ? ' ' : ''}${letter.toUpperCase()}`);
}

function label(value: string) {
  return title(value.replace(/([A-Z])/g, ' $1').toLowerCase());
}

function channelName(channels: Row[], channelId: string) {
  return channels.find((channel) => channel.id === channelId)?.name || 'Chat message';
}

function formatDate(value: string | null) {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}
