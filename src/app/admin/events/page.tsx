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
  MapPin,
  Clock,
  Bell,
  User,
  CheckCircle,
  Video,
  Heart,
  DollarSign,
  ExternalLink,
  ChevronRight,
  Users
} from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead, getUnreadNotificationCount } from '@/lib/notifications';

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

interface Notification {
  id: number;
  type: 'booking' | 'donation' | 'enrollment' | 'order';
  title: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'notifications'>('notifications');
  const [unreadCount, setUnreadCount] = useState(0);
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
    loadData();

    // Poll for new notifications every 5 seconds
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [router]);

  const loadData = () => {
    const savedEvents = JSON.parse(localStorage.getItem('ogn-events') || '[]');
    setEvents(savedEvents);

    const allNotifications = getNotifications();
    setNotifications(allNotifications);
    setUnreadCount(getUnreadNotificationCount());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      const updatedEvents = events.map(event =>
        event.id === editingEvent.id ? { ...event, ...formData } : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('ogn-events', JSON.stringify(updatedEvents));
    } else {
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

  const handleMarkRead = (id: number) => {
    markNotificationRead(id);
    loadData();
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('ogn-admin-auth');
    router.push('/admin');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-5 h-5 text-amber-500" />;
      case 'donation': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'enrollment': return <Heart className="w-5 h-5 text-purple-500" />;
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-amber-50 border-amber-200';
      case 'donation': return 'bg-green-50 border-green-200';
      case 'enrollment': return 'bg-purple-50 border-purple-200';
      case 'order': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (!isAuthenticated) return null;

  const pendingOrders = JSON.parse(localStorage.getItem('ogn-orders') || '[]')
    .filter((o: any) => o.status === 'pending_payment').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header - Consistent with website theme */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Overcomers Admin</h1>
                  <p className="text-xs text-gray-500">Events & Notifications</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/events"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Nav */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md transition-all border border-gray-100">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md transition-all border border-gray-100">
            <ShoppingBag className="w-4 h-4" />
            Orders
            {pendingOrders > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingOrders}</span>}
          </Link>
          <Link href="/admin/prophet-schedule" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md transition-all border border-gray-100">
            <Video className="w-4 h-4" />
            Scheduling
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md transition-all border border-gray-100">
            <FileText className="w-4 h-4" />
            Blog
          </Link>
          <Link href="/admin/discipleship" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md transition-all border border-gray-100">
            <Users className="w-4 h-4" />
            Discipleship
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-white text-gray-600 hover:text-amber-600 border border-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
            Notifications
            {unreadCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === 'notifications' ? 'bg-white text-amber-600' : 'bg-red-500 text-white'
              }`}>
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-white text-gray-600 hover:text-amber-600 border border-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Events
          </button>
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Live Notifications</h2>
                <p className="text-gray-500">Real-time updates for bookings, donations, and enrollments</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark All Read
                </button>
              )}
            </div>

            {/* Notification Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['booking', 'donation', 'enrollment', 'order'].map((type) => {
                const count = notifications.filter(n => n.type === type).length;
                const unread = notifications.filter(n => n.type === type && !n.read).length;
                return (
                  <div key={type} className={`p-4 rounded-2xl border ${getNotificationColor(type)}`}>
                    <div className="flex items-center gap-3">
                      {getNotificationIcon(type)}
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{count}</p>
                        <p className="text-sm text-gray-600 capitalize">{type}s</p>
                      </div>
                      {unread > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {unread} new
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Notifications Yet</h3>
                  <p className="text-gray-500">When someone books a session, donates, or enrolls, you&apos;ll see it here in real-time.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-amber-50/50' : ''
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          {!notification.read && (
                            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>

                        {/* Show additional details for bookings */}
                        {notification.type === 'booking' && notification.data && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-gray-500">Email:</span>
                                <span className="ml-2 text-gray-900">{notification.data.customer?.email}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Phone:</span>
                                <span className="ml-2 text-gray-900">{notification.data.customer?.phone}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Status:</span>
                                <span className={`ml-2 font-medium ${notification.data.isPaid ? 'text-green-600' : 'text-amber-600'}`}>
                                  {notification.data.isPaid ? 'Paid' : 'Pending Payment'}
                                </span>
                              </div>
                            </div>
                            {notification.data.customer?.notes && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <span className="text-gray-500">Notes:</span>
                                <p className="text-gray-900 italic">&quot;{notification.data.customer.notes}&quot;</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Email Notification Setup */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email Notifications Enabled</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    You will receive email notifications at <strong>mr.matthews2022@gmail.com</strong> for all new bookings, donations, and enrollments.
                  </p>
                  <p className="text-blue-600 text-sm">
                    ✓ Free integration using EmailJS (200 emails/month)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Events</h2>
                <p className="text-gray-500">Create and manage events & flyers</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-amber-500/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Event
              </button>
            </div>

            {events.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Events Yet</h3>
                <p className="text-gray-500 mb-6">Create your first event to display on the website</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Create Event
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                    {event.image && (
                      <div className="relative h-48 bg-gray-100">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
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
          </div>
        )}
      </div>

      {/* Event Modal */}
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
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold transition-all"
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
