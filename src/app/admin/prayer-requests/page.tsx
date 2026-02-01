'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Heart, Search, Filter, Eye, CheckCircle, Clock, 
  AlertTriangle, RefreshCw, Loader2, X, Mail, Phone, User,
  MessageSquare, Calendar
} from 'lucide-react';
import { getFormSubmissions, addFormSubmission } from '@/lib/firebase';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

interface PrayerRequest {
  firebaseId?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  prayerType: string;
  isUrgent: boolean;
  prayerRequest: string;
  wantFollowUp: boolean;
  submittedAt: string;
  status: 'new' | 'praying' | 'prayed' | 'follow-up';
  prayedFor: boolean;
  adminNotes: Array<{ date: string; note: string; author: string }>;
}

export default function PrayerRequestsAdminPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PrayerRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [adminName, setAdminName] = useState('Admin');

  const loadRequests = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const result = await getFormSubmissions('prayerRequests');
      if (result.success) {
        const sorted = (result.submissions as PrayerRequest[]).sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        setRequests(sorted);
      }
    } catch (error) {
      console.error('Error loading prayer requests:', error);
    }

    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('ogn-admin-name') || 'Admin';
    setAdminName(name);
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    let filtered = [...requests];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.fullName.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query) ||
        r.prayerRequest.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      if (typeFilter === 'urgent') {
        filtered = filtered.filter(r => r.isUrgent);
      } else {
        filtered = filtered.filter(r => r.prayerType === typeFilter);
      }
    }

    setFilteredRequests(filtered);
  }, [requests, searchQuery, statusFilter, typeFilter]);

  const updateStatus = async (request: PrayerRequest, newStatus: PrayerRequest['status']) => {
    if (!request.firebaseId) return;

    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'prayerRequests', request.firebaseId), {
        status: newStatus,
        prayedFor: newStatus === 'prayed',
      });
      loadRequests(true);
      if (selectedRequest?.firebaseId === request.firebaseId) {
        setSelectedRequest({ ...request, status: newStatus, prayedFor: newStatus === 'prayed' });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const addNote = async () => {
    if (!newNote.trim() || !selectedRequest?.firebaseId) return;

    try {
      const db = getFirestore();
      const newNoteObj = { date: new Date().toISOString(), note: newNote.trim(), author: adminName };
      await updateDoc(doc(db, 'prayerRequests', selectedRequest.firebaseId), {
        adminNotes: [...(selectedRequest.adminNotes || []), newNoteObj],
      });
      setNewNote('');
      loadRequests(true);
      setSelectedRequest({
        ...selectedRequest,
        adminNotes: [...(selectedRequest.adminNotes || []), newNoteObj],
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'praying': return 'bg-purple-100 text-purple-700';
      case 'prayed': return 'bg-green-100 text-green-700';
      case 'follow-up': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    urgent: requests.filter(r => r.isUrgent).length,
    needsFollowUp: requests.filter(r => r.wantFollowUp && r.status !== 'follow-up').length,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prayer Requests</h1>
                <p className="text-sm text-gray-500">Manage and pray for submitted requests</p>
              </div>
            </div>
            <button
              onClick={() => loadRequests(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isRefreshing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Requests</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                <p className="text-xs text-gray-500">New</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                <p className="text-xs text-gray-500">Urgent</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.needsFollowUp}</p>
                <p className="text-xs text-gray-500">Needs Follow-up</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or request..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="praying">Praying</option>
              <option value="prayed">Prayed</option>
              <option value="follow-up">Follow-up Done</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="urgent">Urgent Only</option>
              <option value="Healing & Health">Healing & Health</option>
              <option value="Family & Relationships">Family & Relationships</option>
              <option value="Financial Breakthrough">Financial Breakthrough</option>
              <option value="Spiritual Growth">Spiritual Growth</option>
              <option value="Guidance & Direction">Guidance & Direction</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
              <p className="text-gray-500">Loading prayer requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No prayer requests found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredRequests.map((request) => (
                <div
                  key={request.firebaseId}
                  onClick={() => setSelectedRequest(request)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedRequest?.firebaseId === request.firebaseId ? 'bg-purple-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{request.fullName}</h3>
                          {request.isUrgent && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Urgent</span>
                          )}
                          {request.wantFollowUp && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Follow-up</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{request.prayerType}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{request.prayerRequest}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(request.submittedAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedRequest.fullName}</h2>
                <p className="text-sm text-gray-500">{selectedRequest.prayerType}</p>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Status Actions */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Update Status:</span>
                {['new', 'praying', 'prayed', 'follow-up'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedRequest, status as PrayerRequest['status'])}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                      selectedRequest.status === status ? getStatusColor(status) : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selectedRequest.email}`} className="text-purple-600 hover:underline">
                      {selectedRequest.email}
                    </a>
                  </div>
                  {selectedRequest.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${selectedRequest.phone}`} className="text-purple-600 hover:underline">
                        {selectedRequest.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Prayer Request */}
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  Prayer Request
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedRequest.prayerRequest}</p>
              </div>

              {/* Admin Notes */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                  Admin Notes
                </h3>
                {selectedRequest.adminNotes && selectedRequest.adminNotes.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {selectedRequest.adminNotes.map((note, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3">
                        <p className="text-gray-700">{note.note}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {note.author} • {formatDate(note.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-4">No notes yet</p>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={addNote}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
