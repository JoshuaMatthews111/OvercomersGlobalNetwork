'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Home, Search, Filter, Eye, CheckCircle, Clock, 
  MessageSquare, Phone, Mail, MapPin, Church, Calendar,
  ChevronDown, X, FileText, Download, RefreshCw, Star,
  UserCheck, Building, Globe, Heart, ArrowLeft
} from 'lucide-react';

interface Enrollment {
  id: string;
  enrollmentNumber: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
  personalInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    fullAddress: string;
  };
  churchAffiliation: {
    hasChurch: string;
    churchName: string | null;
    churchLocation: string | null;
    pastorName: string | null;
    attendanceDuration: string | null;
  };
  reasonsForJoining: {
    selected: string[];
    other: string | null;
  };
  houseChurch: {
    interest: string;
    startingDetails: {
      homeOwnership: string;
      spaceCapacity: string;
      preferredTimes: string[];
      leadershipExperience: string;
      callingReason: string;
    } | null;
    joiningDetails: {
      preferredLocation: string;
      preferredTimes: string[];
      specificNeeds: string;
    } | null;
    previousExperience: string;
    fellowshipGoals: string;
  };
  howDidYouHear: string;
  prayerRequest: string | null;
  adminNotes: Array<{ date: string; note: string; author: string }>;
  contactedDate: string | null;
  assignedTo: string | null;
  followUpDate: string | null;
  lastUpdated: string;
}

export default function EnrollmentsAdminPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [churchFilter, setChurchFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [newNote, setNewNote] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEnrollments();
  }, []);

  useEffect(() => {
    filterEnrollments();
  }, [enrollments, searchQuery, statusFilter, typeFilter, churchFilter]);

  const loadEnrollments = () => {
    setIsLoading(true);
    // Load from localStorage
    const saved = localStorage.getItem('ogn-enrollments');
    if (saved) {
      setEnrollments(JSON.parse(saved));
    }
    setIsLoading(false);
  };

  const filterEnrollments = () => {
    let filtered = [...enrollments];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e => 
        e.personalInfo.fullName.toLowerCase().includes(query) ||
        e.personalInfo.email.toLowerCase().includes(query) ||
        e.address.city.toLowerCase().includes(query) ||
        e.address.country.toLowerCase().includes(query) ||
        e.enrollmentNumber.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter);
    }

    // Type filter (house church interest)
    if (typeFilter !== 'all') {
      filtered = filtered.filter(e => e.houseChurch.interest === typeFilter);
    }

    // Church affiliation filter
    if (churchFilter !== 'all') {
      if (churchFilter === 'has-church') {
        filtered = filtered.filter(e => e.churchAffiliation.hasChurch === 'Yes, I attend a church');
      } else if (churchFilter === 'no-church') {
        filtered = filtered.filter(e => e.churchAffiliation.hasChurch !== 'Yes, I attend a church');
      }
    }

    setFilteredEnrollments(filtered);
  };

  const updateEnrollmentStatus = (id: string, status: Enrollment['status']) => {
    const updated = enrollments.map(e => {
      if (e.id === id) {
        return {
          ...e,
          status,
          contactedDate: status === 'contacted' ? new Date().toISOString() : e.contactedDate,
          lastUpdated: new Date().toISOString(),
        };
      }
      return e;
    });
    setEnrollments(updated);
    localStorage.setItem('ogn-enrollments', JSON.stringify(updated));
    
    if (selectedEnrollment?.id === id) {
      setSelectedEnrollment(updated.find(e => e.id === id) || null);
    }
  };

  const addNote = (id: string) => {
    if (!newNote.trim()) return;
    
    const newNoteObj = { date: new Date().toISOString(), note: newNote.trim(), author: 'Admin' };
    
    const updated = enrollments.map(e => {
      if (e.id === id) {
        return {
          ...e,
          adminNotes: [...e.adminNotes, newNoteObj],
          lastUpdated: new Date().toISOString(),
        };
      }
      return e;
    });
    setEnrollments(updated);
    setNewNote('');
    localStorage.setItem('ogn-enrollments', JSON.stringify(updated));
    
    if (selectedEnrollment?.id === id) {
      setSelectedEnrollment(updated.find(e => e.id === id) || null);
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

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'start': return 'Start House Church';
      case 'join': return 'Join House Church';
      case 'learn': return 'Learn More';
      case 'not-now': return 'Not Interested';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'start': return 'bg-amber-100 text-amber-700';
      case 'join': return 'bg-blue-100 text-blue-700';
      case 'learn': return 'bg-purple-100 text-purple-700';
      case 'not-now': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Stats
  const stats = {
    total: enrollments.length,
    new: enrollments.filter(e => e.status === 'new').length,
    startHouseChurch: enrollments.filter(e => e.houseChurch.interest === 'start').length,
    joinHouseChurch: enrollments.filter(e => e.houseChurch.interest === 'join').length,
    hasChurch: enrollments.filter(e => e.churchAffiliation.hasChurch === 'Yes, I attend a church').length,
    withPrayer: enrollments.filter(e => e.prayerRequest).length,
  };

  const exportToCSV = () => {
    const headers = ['Enrollment #', 'Name', 'Email', 'Phone', 'City', 'Country', 'Church Affiliation', 'House Church Interest', 'Status', 'Date'];
    const rows = filteredEnrollments.map(e => [
      e.enrollmentNumber,
      e.personalInfo.fullName,
      e.personalInfo.email,
      e.personalInfo.phone,
      e.address.city,
      e.address.country,
      e.churchAffiliation.hasChurch,
      getTypeLabel(e.houseChurch.interest),
      e.status,
      formatShortDate(e.submittedAt),
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ogn-enrollments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Network Enrollments</h1>
                <p className="text-sm text-gray-500">Manage discipleship and house church enrollments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadEnrollments}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                <p className="text-xs text-gray-500">New</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.startHouseChurch}</p>
                <p className="text-xs text-gray-500">Starting</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.joinHouseChurch}</p>
                <p className="text-xs text-gray-500">Joining</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Church className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.hasChurch}</p>
                <p className="text-xs text-gray-500">Has Church</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.withPrayer}</p>
                <p className="text-xs text-gray-500">Prayer Req.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, city, or enrollment #..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${showFilters ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">House Church Interest</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="start">Starting House Church</option>
                    <option value="join">Joining House Church</option>
                    <option value="learn">Learning More</option>
                    <option value="not-now">Not Interested</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Church Affiliation</label>
                  <select
                    value={churchFilter}
                    onChange={(e) => setChurchFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="all">All</option>
                    <option value="has-church">Has Church</option>
                    <option value="no-church">No Church</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600">
            Showing {filteredEnrollments.length} of {enrollments.length} enrollments
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Enrollments...</h3>
              <p className="text-gray-500">Fetching data from server</p>
            </div>
          ) : filteredEnrollments.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Enrollments Found</h3>
              <p className="text-gray-500">
                {enrollments.length === 0 
                  ? 'Enrollments will appear here when people sign up.'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Person</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Church</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            {enrollment.personalInfo.firstName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{enrollment.personalInfo.fullName}</p>
                            <p className="text-sm text-gray-500">{enrollment.personalInfo.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {enrollment.address.city}, {enrollment.address.country}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {enrollment.churchAffiliation.hasChurch === 'Yes, I attend a church' ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Church className="w-4 h-4 text-green-500" />
                            <span className="text-green-700">Yes</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(enrollment.houseChurch.interest)}`}>
                          {getTypeLabel(enrollment.houseChurch.interest)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(enrollment.status)}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatShortDate(enrollment.submittedAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-amber-600 hover:bg-amber-50 rounded-lg text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {selectedEnrollment.personalInfo.firstName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedEnrollment.personalInfo.fullName}</h2>
                    <p className="text-sm text-gray-500">#{selectedEnrollment.enrollmentNumber}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Status Actions */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Update Status:</span>
                {['new', 'contacted', 'in-progress', 'completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateEnrollmentStatus(selectedEnrollment.id, status as Enrollment['status'])}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                      selectedEnrollment.status === status 
                        ? getStatusColor(status) 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${selectedEnrollment.personalInfo.email}`} className="text-amber-600 hover:underline">
                      {selectedEnrollment.personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selectedEnrollment.personalInfo.phone}`} className="text-amber-600 hover:underline">
                      {selectedEnrollment.personalInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700">{selectedEnrollment.address.fullAddress}</span>
                  </div>
                </div>
              </div>

              {/* Church Affiliation */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Church className="w-4 h-4 text-amber-600" />
                  Church Affiliation
                </h3>
                <p className="text-gray-700 mb-2">{selectedEnrollment.churchAffiliation.hasChurch}</p>
                {selectedEnrollment.churchAffiliation.churchName && (
                  <div className="mt-3 pl-4 border-l-2 border-amber-300 space-y-1">
                    <p className="text-sm"><span className="text-gray-500">Church:</span> <span className="text-gray-900">{selectedEnrollment.churchAffiliation.churchName}</span></p>
                    {selectedEnrollment.churchAffiliation.churchLocation && (
                      <p className="text-sm"><span className="text-gray-500">Location:</span> <span className="text-gray-900">{selectedEnrollment.churchAffiliation.churchLocation}</span></p>
                    )}
                    {selectedEnrollment.churchAffiliation.pastorName && (
                      <p className="text-sm"><span className="text-gray-500">Pastor:</span> <span className="text-gray-900">{selectedEnrollment.churchAffiliation.pastorName}</span></p>
                    )}
                    {selectedEnrollment.churchAffiliation.attendanceDuration && (
                      <p className="text-sm"><span className="text-gray-500">Attending:</span> <span className="text-gray-900">{selectedEnrollment.churchAffiliation.attendanceDuration}</span></p>
                    )}
                  </div>
                )}
              </div>

              {/* Reasons for Joining */}
              {selectedEnrollment.reasonsForJoining.selected.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-amber-600" />
                    Reasons for Joining
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEnrollment.reasonsForJoining.selected.map((reason) => (
                      <span key={reason} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                        {reason}
                      </span>
                    ))}
                  </div>
                  {selectedEnrollment.reasonsForJoining.other && (
                    <p className="mt-2 text-sm text-gray-600">Other: {selectedEnrollment.reasonsForJoining.other}</p>
                  )}
                </div>
              )}

              {/* House Church Interest */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Home className="w-4 h-4 text-amber-600" />
                  House Church Interest
                </h3>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedEnrollment.houseChurch.interest)}`}>
                  {getTypeLabel(selectedEnrollment.houseChurch.interest)}
                </span>

                {/* Starting Details */}
                {selectedEnrollment.houseChurch.startingDetails && (
                  <div className="mt-4 space-y-2 text-sm">
                    <p><span className="text-gray-500">Home Ownership:</span> <span className="text-gray-900">{selectedEnrollment.houseChurch.startingDetails.homeOwnership}</span></p>
                    <p><span className="text-gray-500">Space Capacity:</span> <span className="text-gray-900">{selectedEnrollment.houseChurch.startingDetails.spaceCapacity}</span></p>
                    {selectedEnrollment.houseChurch.startingDetails.preferredTimes.length > 0 && (
                      <p><span className="text-gray-500">Preferred Times:</span> <span className="text-gray-900">{selectedEnrollment.houseChurch.startingDetails.preferredTimes.join(', ')}</span></p>
                    )}
                    {selectedEnrollment.houseChurch.startingDetails.leadershipExperience && (
                      <div>
                        <p className="text-gray-500">Leadership Experience:</p>
                        <p className="text-gray-900 mt-1 bg-white p-2 rounded">{selectedEnrollment.houseChurch.startingDetails.leadershipExperience}</p>
                      </div>
                    )}
                    {selectedEnrollment.houseChurch.startingDetails.callingReason && (
                      <div>
                        <p className="text-gray-500">Why They Feel Called:</p>
                        <p className="text-gray-900 mt-1 bg-white p-2 rounded">{selectedEnrollment.houseChurch.startingDetails.callingReason}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Joining Details */}
                {selectedEnrollment.houseChurch.joiningDetails && (
                  <div className="mt-4 space-y-2 text-sm">
                    <p><span className="text-gray-500">Preferred Location:</span> <span className="text-gray-900">{selectedEnrollment.houseChurch.joiningDetails.preferredLocation}</span></p>
                    {selectedEnrollment.houseChurch.joiningDetails.preferredTimes.length > 0 && (
                      <p><span className="text-gray-500">Preferred Times:</span> <span className="text-gray-900">{selectedEnrollment.houseChurch.joiningDetails.preferredTimes.join(', ')}</span></p>
                    )}
                    {selectedEnrollment.houseChurch.joiningDetails.specificNeeds && (
                      <div>
                        <p className="text-gray-500">Specific Needs:</p>
                        <p className="text-gray-900 mt-1 bg-white p-2 rounded">{selectedEnrollment.houseChurch.joiningDetails.specificNeeds}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* General */}
                {(selectedEnrollment.houseChurch.previousExperience || selectedEnrollment.houseChurch.fellowshipGoals) && (
                  <div className="mt-4 space-y-2 text-sm">
                    {selectedEnrollment.houseChurch.previousExperience && (
                      <p><span className="text-gray-500">Previous House Church Experience:</span> <span className="text-gray-900">{selectedEnrollment.houseChurch.previousExperience}</span></p>
                    )}
                    {selectedEnrollment.houseChurch.fellowshipGoals && (
                      <div>
                        <p className="text-gray-500">Fellowship Goals:</p>
                        <p className="text-gray-900 mt-1 bg-white p-2 rounded">{selectedEnrollment.houseChurch.fellowshipGoals}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Prayer Request */}
              {selectedEnrollment.prayerRequest && (
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    Prayer Request
                  </h3>
                  <p className="text-gray-700">{selectedEnrollment.prayerRequest}</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Additional Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">How they heard about us:</span> <span className="text-gray-900">{selectedEnrollment.howDidYouHear || 'Not specified'}</span></p>
                  <p><span className="text-gray-500">Submitted:</span> <span className="text-gray-900">{formatDate(selectedEnrollment.submittedAt)}</span></p>
                  {selectedEnrollment.contactedDate && (
                    <p><span className="text-gray-500">Contacted:</span> <span className="text-gray-900">{formatDate(selectedEnrollment.contactedDate)}</span></p>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  Admin Notes
                </h3>
                
                {/* Existing Notes */}
                {selectedEnrollment.adminNotes.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {selectedEnrollment.adminNotes.map((note, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg">
                        <p className="text-gray-700">{note.note}</p>
                        <p className="text-xs text-gray-400 mt-1">{note.author} • {formatDate(note.date)}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Note */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && addNote(selectedEnrollment.id)}
                  />
                  <button
                    onClick={() => addNote(selectedEnrollment.id)}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(selectedEnrollment.lastUpdated)}
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedEnrollment.personalInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <button
                  onClick={() => setSelectedEnrollment(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
