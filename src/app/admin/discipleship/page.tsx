'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, CheckCircle, Clock, Trash2, Eye } from 'lucide-react';

interface Enrollment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  howDidYouHear: string;
  prayerRequest: string;
  date: string;
  status: 'pending' | 'contacted' | 'completed';
}

export default function AdminDiscipleshipPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/admin';
    }

    const saved = localStorage.getItem('ogn-discipleship-enrollments');
    if (saved) {
      setEnrollments(JSON.parse(saved));
    }
  }, []);

  const updateStatus = (id: number, status: 'pending' | 'contacted' | 'completed') => {
    const updated = enrollments.map(e => 
      e.id === id ? { ...e, status } : e
    );
    setEnrollments(updated);
    localStorage.setItem('ogn-discipleship-enrollments', JSON.stringify(updated));
  };

  const deleteEnrollment = (id: number) => {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      const updated = enrollments.filter(e => e.id !== id);
      setEnrollments(updated);
      localStorage.setItem('ogn-discipleship-enrollments', JSON.stringify(updated));
      setSelectedEnrollment(null);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Discipleship Enrollments</h1>
          <p className="text-gray-600">Manage new believers and discipleship requests</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enrollments List */}
          <div className="lg:col-span-2">
            {enrollments.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No discipleship enrollments yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    onClick={() => setSelectedEnrollment(enrollment)}
                    className={`bg-white rounded-xl p-4 cursor-pointer transition-all ${
                      selectedEnrollment?.id === enrollment.id
                        ? 'ring-2 ring-amber-500 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {enrollment.firstName} {enrollment.lastName}
                          </h3>
                          <p className="text-gray-500 text-sm">{enrollment.email}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {enrollment.city}, {enrollment.country}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          enrollment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          enrollment.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {enrollment.status === 'completed' ? 'Completed' :
                           enrollment.status === 'contacted' ? 'Contacted' : 'Pending'}
                        </span>
                        <p className="text-gray-400 text-xs mt-2">
                          {new Date(enrollment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedEnrollment ? (
              <div className="bg-white rounded-2xl p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">Enrollment Details</h3>
                  <button
                    onClick={() => deleteEnrollment(selectedEnrollment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Name</p>
                    <p className="font-medium">{selectedEnrollment.firstName} {selectedEnrollment.lastName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Contact</p>
                    <div className="space-y-1">
                      <a href={`mailto:${selectedEnrollment.email}`} className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                        <Mail className="w-4 h-4" />
                        {selectedEnrollment.email}
                      </a>
                      <a href={`tel:${selectedEnrollment.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                        <Phone className="w-4 h-4" />
                        {selectedEnrollment.phone}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Mailing Address</p>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p>{selectedEnrollment.address}</p>
                        <p>{selectedEnrollment.city}, {selectedEnrollment.state} {selectedEnrollment.zipCode}</p>
                        <p>{selectedEnrollment.country}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">How They Found Us</p>
                    <p className="text-sm">{selectedEnrollment.howDidYouHear || 'Not specified'}</p>
                  </div>

                  {selectedEnrollment.prayerRequest && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Prayer Request</p>
                      <p className="text-sm bg-amber-50 p-3 rounded-lg">{selectedEnrollment.prayerRequest}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">Update Status</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(selectedEnrollment.id, 'pending')}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                          selectedEnrollment.status === 'pending'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(selectedEnrollment.id, 'contacted')}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                          selectedEnrollment.status === 'contacted'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => updateStatus(selectedEnrollment.id, 'completed')}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                          selectedEnrollment.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center">
                <Eye className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Select an enrollment to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
