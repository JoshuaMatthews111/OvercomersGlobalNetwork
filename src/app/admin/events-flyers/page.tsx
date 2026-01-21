'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Trash2, GripVertical, ImageIcon } from 'lucide-react';

interface EventFlyer {
  id: number;
  image: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  eventDate?: string;
}

export default function AdminEventsFlyersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [flyers, setFlyers] = useState<EventFlyer[]>([]);
  const [newFlyer, setNewFlyer] = useState({
    title: '',
    date: '',
    image: '',
    description: '',
    location: 'Overcomers Global Network, 7519 Mentor Ave, Unit A106, Mentor, OH 44060',
    startTime: '10:00',
    endTime: '12:00',
    eventDate: new Date().toISOString().split('T')[0],
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/admin';
    }

    const savedFlyers = localStorage.getItem('ogn-events-flyers');
    if (savedFlyers) {
      setFlyers(JSON.parse(savedFlyers));
    }
  }, []);

  const saveFlyers = (newFlyers: EventFlyer[]) => {
    localStorage.setItem('ogn-events-flyers', JSON.stringify(newFlyers));
    setFlyers(newFlyers);
  };

  const handleAddFlyer = () => {
    if (!newFlyer.title || !newFlyer.image) {
      alert('Please fill in title and image URL');
      return;
    }

    const flyer: EventFlyer = {
      id: Date.now(),
      ...newFlyer,
    };

    saveFlyers([...flyers, flyer]);
    setNewFlyer({ 
      title: '', 
      date: '', 
      image: '',
      description: '',
      location: 'Overcomers Global Network, 7519 Mentor Ave, Unit A106, Mentor, OH 44060',
      startTime: '10:00',
      endTime: '12:00',
      eventDate: new Date().toISOString().split('T')[0],
    });
    setShowAddForm(false);
  };

  const handleDeleteFlyer = (id: number) => {
    if (confirm('Are you sure you want to delete this flyer?')) {
      saveFlyers(flyers.filter((f) => f.id !== id));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Event Flyers</h1>
              <p className="text-gray-600">Manage event flyers for the homepage carousel</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Flyer
            </button>
          </div>
        </div>
      </div>

      {/* Add Flyer Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add Event Flyer</h2>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={newFlyer.title}
                  onChange={(e) => setNewFlyer({ ...newFlyer, title: e.target.value })}
                  placeholder="e.g., Kingdom Conference 2026"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Date (e.g., "March 15-17, 2026")
                </label>
                <input
                  type="text"
                  value={newFlyer.date}
                  onChange={(e) => setNewFlyer({ ...newFlyer, date: e.target.value })}
                  placeholder="e.g., March 15-17, 2026 or Every Sunday"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  value={newFlyer.description}
                  onChange={(e) => setNewFlyer({ ...newFlyer, description: e.target.value })}
                  placeholder="Describe what this event is about..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date (for calendar)
                  </label>
                  <input
                    type="date"
                    value={newFlyer.eventDate}
                    onChange={(e) => setNewFlyer({ ...newFlyer, eventDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newFlyer.location}
                    onChange={(e) => setNewFlyer({ ...newFlyer, location: e.target.value })}
                    placeholder="Event location"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newFlyer.startTime}
                    onChange={(e) => setNewFlyer({ ...newFlyer, startTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newFlyer.endTime}
                    onChange={(e) => setNewFlyer({ ...newFlyer, endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flyer Image URL
                </label>
                <input
                  type="text"
                  value={newFlyer.image}
                  onChange={(e) => setNewFlyer({ ...newFlyer, image: e.target.value })}
                  placeholder="https://... or /images/events/flyer.jpg"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Upload your flyer image to /public/images/events/ folder and use the path like /images/events/your-flyer.jpg
                </p>
              </div>

              {newFlyer.image && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={newFlyer.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFlyer}
                className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
              >
                Add Flyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flyers List */}
      <div className="container mx-auto px-4 py-8">
        {flyers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No event flyers yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Add your first flyer
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flyers.map((flyer) => (
              <div
                key={flyer.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm group"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleDeleteFlyer(flyer.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{flyer.title}</h3>
                  {flyer.date && (
                    <p className="text-amber-600 text-sm">{flyer.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-amber-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-2">How to add event flyers:</h3>
          <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm">
            <li>Upload your flyer image to the <code className="bg-white px-2 py-0.5 rounded">/public/images/events/</code> folder</li>
            <li>Click "Add Flyer" and enter the event details (title, description, date, time, location)</li>
            <li>Use the image path like <code className="bg-white px-2 py-0.5 rounded">/images/events/your-flyer.jpg</code></li>
            <li>The flyer will appear in the Events Carousel on the homepage</li>
            <li>Users can click the flyer to see full details and add the event to their calendar</li>
          </ol>
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-gray-700 text-sm"><strong>Note:</strong> Fill in all event details so users can add the event to Google Calendar with accurate information.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
