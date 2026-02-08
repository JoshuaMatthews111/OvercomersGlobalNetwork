'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Users,
  Clock,
  ChevronRight,
  BookOpen,
  ImageIcon,
  Video,
  Heart,
  ShieldCheck,
  MessageSquare,
  UserCheck,
  Plus,
  Search,
  Filter,
  X,
  Phone,
  Mail,
  MapPin,
  Tag,
  AlertCircle,
  CheckCircle,
  Send,
  Loader2,
  Trash2,
  Edit3,
  ChevronDown,
} from 'lucide-react';
import {
  signOutAdmin,
  MASTER_ADMIN_PERMISSIONS,
  type AdminPermissions,
  type Person,
  type PersonNote,
  getPeople,
  addPerson,
  updatePerson,
  deletePerson,
  addPersonNote,
  markFollowUp,
  assignPerson,
  getAllAdmins,
  type AdminUser,
} from '@/lib/firebase';
import { checkAdminPermission } from '@/lib/useAdminPermission';

export default function PeoplePage() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterAssigned, setFilterAssigned] = useState('');
  const [filterFollowUp, setFilterFollowUp] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  // Admin info
  const [adminRole, setAdminRole] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminUid, setAdminUid] = useState('');
  const [permissions, setPermissions] = useState<AdminPermissions>(MASTER_ADMIN_PERMISSIONS);

  // New person form
  const [newPerson, setNewPerson] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    source: '',
    tags: '',
  });

  const hasPermission = (key: keyof AdminPermissions) => {
    if (adminRole === 'master') return true;
    return permissions[key] === true;
  };

  const loadPeople = useCallback(async () => {
    const result = await getPeople();
    if (result.success) {
      setPeople(result.people);
    }
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) { router.push('/admin'); return; }

    if (!checkAdminPermission('people')) {
      router.push('/admin/dashboard');
      return;
    }

    setAdminRole(localStorage.getItem('ogn-admin-role') || '');
    setAdminName(localStorage.getItem('ogn-admin-name') || '');
    setAdminUid(localStorage.getItem('ogn-admin-uid') || '');

    const savedPerms = localStorage.getItem('ogn-admin-permissions');
    if (savedPerms) {
      try { setPermissions(JSON.parse(savedPerms)); } catch {}
    }

    const init = async () => {
      setLoading(true);
      await loadPeople();
      const adminResult = await getAllAdmins();
      if (adminResult.success) setAdmins(adminResult.admins);
      setLoading(false);
    };
    init();
  }, [router, loadPeople]);

  const handleAddPerson = async () => {
    if (!newPerson.firstName || !newPerson.lastName) return;
    setSaving(true);
    const person: Omit<Person, 'firebaseId' | 'createdAt' | 'updatedAt'> = {
      firstName: newPerson.firstName,
      lastName: newPerson.lastName,
      email: newPerson.email,
      phone: newPerson.phone,
      address: newPerson.address,
      tags: newPerson.tags ? newPerson.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      assignedTo: '',
      assignedToName: '',
      assignedBy: '',
      assignedByName: '',
      needsFollowUp: false,
      lastFollowedUp: null,
      lastFollowedUpBy: null,
      lastFollowedUpByName: null,
      notes: [],
      status: 'new',
      source: newPerson.source,
      createdBy: adminUid,
      createdByName: adminName,
    };
    const result = await addPerson(person);
    if (result.success) {
      await loadPeople();
      setShowAddForm(false);
      setNewPerson({ firstName: '', lastName: '', email: '', phone: '', address: '', source: '', tags: '' });
    }
    setSaving(false);
  };

  const handleAddNote = async () => {
    if (!selectedPerson?.firebaseId || !noteText.trim()) return;
    setSavingNote(true);
    const result = await addPersonNote(selectedPerson.firebaseId, {
      text: noteText.trim(),
      authorName: adminName,
      authorUid: adminUid,
    });
    if (result.success) {
      setNoteText('');
      await loadPeople();
      // Re-select updated person
      const updated = (await getPeople()).people.find(p => p.firebaseId === selectedPerson.firebaseId);
      if (updated) setSelectedPerson(updated);
    }
    setSavingNote(false);
  };

  const handleMarkFollowUp = async (personId: string, needsFollowUp: boolean) => {
    if (needsFollowUp) {
      // Tag as needs follow-up
      await updatePerson(personId, { needsFollowUp: true });
    } else {
      // Mark follow-up done
      await markFollowUp(personId, adminUid, adminName);
    }
    await loadPeople();
    if (selectedPerson?.firebaseId === personId) {
      const updated = (await getPeople()).people.find(p => p.firebaseId === personId);
      if (updated) setSelectedPerson(updated);
    }
  };

  const handleAssign = async (personId: string, targetUid: string, targetName: string) => {
    await assignPerson(personId, targetUid, targetName, adminUid, adminName);
    setShowAssignDropdown(false);
    await loadPeople();
    if (selectedPerson?.firebaseId === personId) {
      const updated = (await getPeople()).people.find(p => p.firebaseId === personId);
      if (updated) setSelectedPerson(updated);
    }
  };

  const handleDelete = async (personId: string) => {
    if (!confirm('Are you sure you want to delete this person?')) return;
    await deletePerson(personId);
    setSelectedPerson(null);
    await loadPeople();
  };

  const handleToggleTag = async (personId: string, tag: string) => {
    const person = people.find(p => p.firebaseId === personId);
    if (!person) return;
    const tags = person.tags || [];
    const newTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
    await updatePerson(personId, { tags: newTags });
    await loadPeople();
    if (selectedPerson?.firebaseId === personId) {
      const updated = (await getPeople()).people.find(p => p.firebaseId === personId);
      if (updated) setSelectedPerson(updated);
    }
  };

  // Can this admin assign others?
  const canAssignOthers = adminRole === 'master';

  // Filter people
  const allTags = Array.from(new Set(people.flatMap(p => p.tags || [])));
  const filteredPeople = people.filter(p => {
    const matchesSearch = searchQuery === '' ||
      `${p.firstName} ${p.lastName} ${p.email} ${p.phone}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === '' || (p.tags || []).includes(filterTag);
    const matchesAssigned = filterAssigned === '' || (filterAssigned === 'unassigned' ? !p.assignedTo : p.assignedTo === filterAssigned);
    const matchesFollowUp = !filterFollowUp || p.needsFollowUp;
    return matchesSearch && matchesTag && matchesAssigned && matchesFollowUp;
  });

  const handleLogout = async () => {
    await signOutAdmin();
    localStorage.removeItem('ogn-admin-auth');
    localStorage.removeItem('ogn-admin-email');
    localStorage.removeItem('ogn-admin-role');
    localStorage.removeItem('ogn-admin-name');
    localStorage.removeItem('ogn-admin-uid');
    localStorage.removeItem('ogn-admin-permissions');
    router.push('/admin');
  };

  const predefinedTags = ['New Visitor', 'Member', 'Leader', 'Volunteer', 'First Timer', 'Online', 'Needs Prayer', 'VIP', 'Youth', 'Mentor'];

  if (!loading && !checkAdminPermission('people')) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col z-50">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-amber-400">OGN Admin</h1>
          <p className="text-gray-400 text-xs flex items-center gap-1">
            {adminRole === 'master' && <ShieldCheck className="w-3 h-3 text-amber-400" />}
            {adminRole === 'master' ? 'Master Admin' : 'Admin'} • {adminName}
          </p>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          {hasPermission('orders') && (
            <Link href="/admin/orders" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <ShoppingBag className="w-5 h-5" /> Orders
            </Link>
          )}
          {hasPermission('events') && (
            <Link href="/admin/events" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Calendar className="w-5 h-5" /> Events
            </Link>
          )}
          {hasPermission('content') && (
            <Link href="/admin/content" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <FileText className="w-5 h-5" /> Content
            </Link>
          )}
          {hasPermission('blog') && (
            <Link href="/admin/blog" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <BookOpen className="w-5 h-5" /> Blog Posts
            </Link>
          )}
          {hasPermission('enrollments') && (
            <Link href="/admin/enrollments" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Users className="w-5 h-5" /> Enrollments
            </Link>
          )}
          {hasPermission('scheduler') && (
            <Link href="/admin/scheduler" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Clock className="w-5 h-5" /> Post Scheduler
            </Link>
          )}
          {hasPermission('eventFlyers') && (
            <Link href="/admin/events-flyers" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <ImageIcon className="w-5 h-5" /> Event Flyers
            </Link>
          )}
          {hasPermission('prophetSchedule') && (
            <Link href="/admin/prophet-schedule" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Video className="w-5 h-5" /> Prophet Schedule
            </Link>
          )}
          {hasPermission('discipleship') && (
            <Link href="/admin/discipleship" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Heart className="w-5 h-5" /> Discipleship
            </Link>
          )}
          {hasPermission('prayerRequests') && (
            <Link href="/admin/prayer-requests" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Heart className="w-5 h-5" /> Prayer Requests
            </Link>
          )}
          {hasPermission('askProphet') && (
            <Link href="/admin/ask-prophet" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <MessageSquare className="w-5 h-5" /> Ask The Prophet
            </Link>
          )}
          {hasPermission('people') && (
            <Link href="/admin/people" className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm">
              <UserCheck className="w-5 h-5" /> People
            </Link>
          )}
          {hasPermission('settings') && (
            <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          )}
          {adminRole === 'master' && (
            <Link href="/admin/users" className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:bg-white/5 rounded-lg text-sm transition-colors font-medium">
              <ShieldCheck className="w-5 h-5" /> Manage Admins
            </Link>
          )}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white w-full rounded-lg text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">People</h1>
            <p className="text-gray-500">Manage contacts, assignments, and follow-ups</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Person
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <select
              value={filterAssigned}
              onChange={(e) => setFilterAssigned(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="">All Assigned</option>
              <option value="unassigned">Unassigned</option>
              {admins.map(a => (
                <option key={a.uid} value={a.uid}>{a.name}</option>
              ))}
            </select>
            <button
              onClick={() => setFilterFollowUp(!filterFollowUp)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterFollowUp ? 'bg-red-100 text-red-700 border border-red-200' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Needs Follow-Up
            </button>
            <span className="text-gray-400 text-sm">{filteredPeople.length} people</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* People List */}
          <div className="lg:col-span-1 space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
            {loading ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <Loader2 className="w-8 h-8 text-gray-300 mx-auto mb-2 animate-spin" />
                <p className="text-gray-400 text-sm">Loading people...</p>
              </div>
            ) : filteredPeople.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No people found</p>
                <p className="text-gray-400 text-sm mt-1">Add someone to get started</p>
              </div>
            ) : (
              filteredPeople.map((person) => (
                <button
                  key={person.firebaseId}
                  onClick={() => { setSelectedPerson(person); setNoteText(''); setShowAssignDropdown(false); }}
                  className={`w-full text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 ${
                    selectedPerson?.firebaseId === person.firebaseId ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 truncate">
                          {person.firstName} {person.lastName}
                        </p>
                        {person.needsFollowUp && (
                          <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full" title="Needs follow-up" />
                        )}
                      </div>
                      {person.email && <p className="text-gray-500 text-xs truncate mt-0.5">{person.email}</p>}
                      {person.assignedToName && (
                        <p className="text-amber-600 text-xs mt-1 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" /> {person.assignedToName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        person.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        person.status === 'active' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {person.status}
                      </span>
                      {(person.tags || []).length > 0 && (
                        <div className="flex gap-1 flex-wrap justify-end">
                          {person.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                          {person.tags.length > 2 && (
                            <span className="text-[10px] text-gray-400">+{person.tags.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Person Detail Panel */}
          <div className="lg:col-span-2">
            {selectedPerson ? (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Person Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedPerson.firstName} {selectedPerson.lastName}
                      </h2>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        {selectedPerson.email && (
                          <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {selectedPerson.email}</span>
                        )}
                        {selectedPerson.phone && (
                          <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {selectedPerson.phone}</span>
                        )}
                        {selectedPerson.address && (
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedPerson.address}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(selectedPerson.firebaseId!)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete person"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {(selectedPerson.tags || []).map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleToggleTag(selectedPerson.firebaseId!, tag)}
                        className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full hover:bg-amber-200 transition-colors flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" /> {tag}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    <div className="relative">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleToggleTag(selectedPerson.firebaseId!, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-gray-200 transition-colors appearance-none cursor-pointer pr-6"
                        defaultValue=""
                      >
                        <option value="" disabled>+ Add Tag</option>
                        {predefinedTags.filter(t => !(selectedPerson.tags || []).includes(t)).map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Assignment & Follow-Up Row */}
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Assignment */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Assigned To</p>
                      {selectedPerson.assignedToName ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedPerson.assignedToName}</p>
                            <p className="text-xs text-gray-400">Assigned by {selectedPerson.assignedByName}</p>
                          </div>
                          {(canAssignOthers || selectedPerson.assignedTo === adminUid) && (
                            <button
                              onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                              className="ml-auto text-xs text-amber-600 hover:text-amber-700 font-medium"
                            >
                              Change
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() => {
                              if (canAssignOthers) {
                                setShowAssignDropdown(!showAssignDropdown);
                              } else {
                                handleAssign(selectedPerson.firebaseId!, adminUid, adminName);
                              }
                            }}
                            className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            {canAssignOthers ? 'Assign to Admin' : 'Assign to Myself'}
                          </button>
                        </div>
                      )}
                      {showAssignDropdown && canAssignOthers && (
                        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1">
                          {admins.filter(a => a.status === 'active').map(admin => (
                            <button
                              key={admin.uid}
                              onClick={() => handleAssign(selectedPerson.firebaseId!, admin.uid, admin.name)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-amber-50 transition-colors ${
                                selectedPerson.assignedTo === admin.uid ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-700'
                              }`}
                            >
                              {admin.name} {admin.role === 'master' && <span className="text-xs text-amber-500">(Master)</span>}
                            </button>
                          ))}
                          <button
                            onClick={() => handleAssign(selectedPerson.firebaseId!, '', '')}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Unassign
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Follow-Up */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Follow-Up Status</p>
                      {selectedPerson.needsFollowUp ? (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-medium text-red-600">Needs Follow-Up</span>
                          </div>
                          <button
                            onClick={() => handleMarkFollowUp(selectedPerson.firebaseId!, false)}
                            className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Mark as Followed Up
                          </button>
                        </div>
                      ) : (
                        <div>
                          {selectedPerson.lastFollowedUp ? (
                            <div className="mb-2">
                              <p className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" /> Last followed up
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(selectedPerson.lastFollowedUp).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                                })}
                                {selectedPerson.lastFollowedUpByName && ` by ${selectedPerson.lastFollowedUpByName}`}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 mb-2">No follow-up recorded</p>
                          )}
                          <button
                            onClick={() => handleMarkFollowUp(selectedPerson.firebaseId!, true)}
                            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
                          >
                            <AlertCircle className="w-3.5 h-3.5" /> Tag for Follow-Up
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Notes & Activity</h3>

                  {/* Add Note */}
                  <div className="flex gap-2 mb-6">
                    <input
                      type="text"
                      placeholder="Add a note about this person..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAddNote(); }}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!noteText.trim() || savingNote}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      {savingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {(selectedPerson.notes || []).length === 0 ? (
                      <p className="text-gray-400 text-sm text-center py-8">No notes yet. Add one above.</p>
                    ) : (
                      (selectedPerson.notes || []).map((note) => (
                        <div key={note.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{note.authorName}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(note.createdAt).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-400 space-y-1">
                    <p>Added by {selectedPerson.createdByName} on {new Date(selectedPerson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    {selectedPerson.source && <p>Source: {selectedPerson.source}</p>}
                    <p>Last updated: {new Date(selectedPerson.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Select a person to view details</p>
                <p className="text-gray-400 text-sm mt-1">Or add a new person to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Person Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Add New Person</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  value={newPerson.firstName}
                  onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={newPerson.lastName}
                  onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={newPerson.email}
                onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newPerson.phone}
                onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Address"
                value={newPerson.address}
                onChange={(e) => setNewPerson({ ...newPerson, address: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Source (e.g. Sunday Service, Online, Referral)"
                value={newPerson.source}
                onChange={(e) => setNewPerson({ ...newPerson, source: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Tags (comma separated, e.g. New Visitor, Youth)"
                value={newPerson.tags}
                onChange={(e) => setNewPerson({ ...newPerson, tags: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:border-gray-300 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPerson}
                disabled={!newPerson.firstName || !newPerson.lastName || saving}
                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white py-2.5 rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Person
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
