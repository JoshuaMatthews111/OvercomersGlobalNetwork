'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  MapPin,
  Clock,
  Eye
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isLive: boolean;
  createdAt: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    isLive: true,
  });
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    loadEvents();
  }, [router]);

  const loadEvents = () => {
    const savedEvents = JSON.parse(localStorage.getItem('ogn-events') || '[]');
    setEvents(savedEvents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(event =>
        event.id === editingEvent.id
          ? { ...event, ...formData }
          : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('ogn-events', JSON.stringify(updatedEvents));
    } else {
      // Create new event
      const newEvent: Event = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updatedEvents = [newEvent, ...events];
      setEvents(updatedEvents);
      localStorage.setItem('ogn-events', JSON.stringify(updatedEvents));
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: '',
      isLive: true,
    });
    setEditingEvent(null);
    setShowModal(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      isLive: event.isLive,
    });
    setShowModal(true);
  };

  const handleDelete = (eventId: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      localStorage.setItem('ogn-events', JSON.stringify(updatedEvents));
    }
  };

  const toggleLive = (eventId: number) => {
    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, isLive: !event.isLive } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('ogn-events', JSON.stringify(updatedEvents));
  };

  const handleLogout = () => {
    localStorage.removeItem('ogn-admin-auth');
    router.push('/admin');
  };

  if (!isAuthenticated) return null;

  const pendingOrders = JSON.parse(localStorage.getItem('ogn-orders') || '[]')
    .filter((o: any) => o.status === 'pending_payment').length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-amber-400">OGN Admin</h1>
          <p className="text-gray-400 text-sm">Master Dashboard</p>
        </div>

        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Orders
            {pendingOrders > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingOrders}</span>
            )}
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Calendar className="w-5 h-5" />
            Events
          </Link>
          <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <FileText className="w-5 h-5" />
            Content
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-500">Create and manage events & flyers</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-6">Create your first event to display on the website</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {event.image && (
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      event.isLive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {event.isLive ? 'Live' : 'Draft'}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-amber-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => toggleLive(event.id)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        event.isLive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {event.isLive ? 'Live' : 'Make Live'}
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Event description"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="Event location or 'Online'"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flyer/Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  placeholder="https://example.com/flyer.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Paste a URL to your event flyer or image</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isLive"
                  checked={formData.isLive}
                  onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                  className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                />
                <label htmlFor="isLive" className="text-sm text-gray-700">
                  Publish immediately (make live on site)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-all"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
