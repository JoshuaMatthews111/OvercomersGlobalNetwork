'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, MessageCircle, Search, Eye, CheckCircle, Clock, 
  RefreshCw, Loader2, X, Mail, Phone, User, Globe, Star,
  Send, AlertCircle
} from 'lucide-react';
import { getFormSubmissions } from '@/lib/firebase';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

interface ProphetQuestion {
  firebaseId?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  questionType: string;
  question: string;
  hasReceivedProphecy: string;
  additionalContext?: string;
  submittedAt: string;
  status: 'pending' | 'reviewing' | 'responded' | 'archived';
  responded: boolean;
  response: string | null;
  respondedAt: string | null;
  adminNotes: Array<{ date: string; note: string; author: string }>;
}

export default function AskProphetAdminPage() {
  const [questions, setQuestions] = useState<ProphetQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<ProphetQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<ProphetQuestion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [adminName, setAdminName] = useState('Admin');

  const loadQuestions = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const result = await getFormSubmissions('askTheProphet');
      if (result.success) {
        const sorted = (result.submissions as ProphetQuestion[]).sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        setQuestions(sorted);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    }

    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const name = localStorage.getItem('ogn-admin-name') || 'Admin';
    setAdminName(name);
    loadQuestions();
  }, [loadQuestions]);

  useEffect(() => {
    let filtered = [...questions];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q =>
        q.fullName.toLowerCase().includes(query) ||
        q.email.toLowerCase().includes(query) ||
        q.question.toLowerCase().includes(query) ||
        q.country.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(q => q.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(q => q.questionType === typeFilter);
    }

    setFilteredQuestions(filtered);
  }, [questions, searchQuery, statusFilter, typeFilter]);

  const updateStatus = async (question: ProphetQuestion, newStatus: ProphetQuestion['status']) => {
    if (!question.firebaseId) return;

    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'askTheProphet', question.firebaseId), {
        status: newStatus,
      });
      loadQuestions(true);
      if (selectedQuestion?.firebaseId === question.firebaseId) {
        setSelectedQuestion({ ...question, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const sendResponse = async () => {
    if (!responseText.trim() || !selectedQuestion?.firebaseId) return;
    setIsSendingResponse(true);

    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'askTheProphet', selectedQuestion.firebaseId), {
        status: 'responded',
        responded: true,
        response: responseText.trim(),
        respondedAt: new Date().toISOString(),
      });
      setResponseText('');
      loadQuestions(true);
      setSelectedQuestion({
        ...selectedQuestion,
        status: 'responded',
        responded: true,
        response: responseText.trim(),
        respondedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error sending response:', error);
    }

    setIsSendingResponse(false);
  };

  const addNote = async () => {
    if (!newNote.trim() || !selectedQuestion?.firebaseId) return;

    try {
      const db = getFirestore();
      const newNoteObj = { date: new Date().toISOString(), note: newNote.trim(), author: adminName };
      await updateDoc(doc(db, 'askTheProphet', selectedQuestion.firebaseId), {
        adminNotes: [...(selectedQuestion.adminNotes || []), newNoteObj],
      });
      setNewNote('');
      loadQuestions(true);
      setSelectedQuestion({
        ...selectedQuestion,
        adminNotes: [...(selectedQuestion.adminNotes || []), newNoteObj],
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
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-amber-100 text-amber-700';
      case 'responded': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: questions.length,
    pending: questions.filter(q => q.status === 'pending').length,
    reviewing: questions.filter(q => q.status === 'reviewing').length,
    responded: questions.filter(q => q.status === 'responded').length,
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
                <h1 className="text-2xl font-bold text-gray-900">Ask The Prophet</h1>
                <p className="text-sm text-gray-500">Manage questions submitted to Prophet Joshua</p>
              </div>
            </div>
            <button
              onClick={() => loadQuestions(true)}
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
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.reviewing}</p>
                <p className="text-xs text-gray-500">Reviewing</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.responded}</p>
                <p className="text-xs text-gray-500">Responded</p>
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
                placeholder="Search by name, email, country, or question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="responded">Responded</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Spiritual Guidance">Spiritual Guidance</option>
              <option value="Life Direction">Life Direction</option>
              <option value="Ministry Calling">Ministry Calling</option>
              <option value="Dream Interpretation">Dream Interpretation</option>
              <option value="Vision Interpretation">Vision Interpretation</option>
              <option value="Relationship Guidance">Relationship Guidance</option>
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
              <p className="text-gray-500">Loading questions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No questions found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredQuestions.map((question) => (
                <div
                  key={question.firebaseId}
                  onClick={() => setSelectedQuestion(question)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedQuestion?.firebaseId === question.firebaseId ? 'bg-amber-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{question.fullName}</h3>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Globe className="w-3 h-3" />
                            {question.country}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{question.questionType}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{question.question}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                        {question.status}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(question.submittedAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedQuestion.fullName}</h2>
                <p className="text-sm text-gray-500">{selectedQuestion.questionType} • {selectedQuestion.country}</p>
              </div>
              <button onClick={() => setSelectedQuestion(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Status Actions */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Update Status:</span>
                {['pending', 'reviewing', 'responded', 'archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedQuestion, status as ProphetQuestion['status'])}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                      selectedQuestion.status === status ? getStatusColor(status) : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                    <a href={`mailto:${selectedQuestion.email}`} className="text-amber-600 hover:underline">
                      {selectedQuestion.email}
                    </a>
                  </div>
                  {selectedQuestion.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${selectedQuestion.phone}`} className="text-amber-600 hover:underline">
                        {selectedQuestion.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedQuestion.country}</span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-amber-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600" />
                  Question
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedQuestion.question}</p>
                {selectedQuestion.additionalContext && (
                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <p className="text-sm text-gray-500 mb-1">Additional Context:</p>
                    <p className="text-gray-700">{selectedQuestion.additionalContext}</p>
                  </div>
                )}
                {selectedQuestion.hasReceivedProphecy && (
                  <p className="text-sm text-amber-700 mt-3">
                    Previous prophecy: {selectedQuestion.hasReceivedProphecy}
                  </p>
                )}
              </div>

              {/* Response Section */}
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Send className="w-4 h-4 text-green-600" />
                  Response
                </h3>
                {selectedQuestion.response ? (
                  <div>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedQuestion.response}</p>
                    {selectedQuestion.respondedAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Responded on {formatDate(selectedQuestion.respondedAt)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <textarea
                      rows={4}
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write your response to this question..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:outline-none resize-none mb-3"
                    />
                    <button
                      onClick={sendResponse}
                      disabled={isSendingResponse || !responseText.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300"
                    >
                      {isSendingResponse ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Save Response
                    </button>
                  </div>
                )}
              </div>

              {/* Admin Notes */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Admin Notes</h3>
                {selectedQuestion.adminNotes && selectedQuestion.adminNotes.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {selectedQuestion.adminNotes.map((note, idx) => (
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
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    onClick={addNote}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
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
