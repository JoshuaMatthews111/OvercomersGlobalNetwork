'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Trash2, Save, DollarSign, Eye, Link as LinkIcon, Copy, ExternalLink, User, Video, CheckCircle, ChevronLeft, ChevronRight, X, Bell, LayoutDashboard, ShoppingBag, FileText, Users, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getUnreadNotificationCount } from '@/lib/notifications';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ServiceType {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  active: boolean;
}

interface Booking {
  id: number;
  serviceType?: ServiceType;
  sessionType?: any;
  date: string;
  time: string;
  customer: any;
  status: string;
  isPaid?: boolean;
  createdAt: string;
}

const DEFAULT_SERVICES: ServiceType[] = [
  { id: 'prophetic-word', title: 'Prophetic Word & Prayer', duration: '30 minutes', price: 50, description: 'Personal prophetic word and prayer.', active: true },
  { id: 'spiritual-guidance', title: 'Spiritual Guidance Session', duration: '60 minutes', price: 100, description: 'In-depth spiritual guidance and counsel.', active: true },
  { id: 'ministry-consultation', title: 'Ministry Consultation', duration: '90 minutes', price: 150, description: 'Strategic consultation for ministry leaders.', active: true },
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'
];

export default function ProphetScheduleAdmin() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<ServiceType[]>(DEFAULT_SERVICES);
  const [activeTab, setActiveTab] = useState<'calendar' | 'services' | 'bookings' | 'links'>('calendar');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [dateRangeStart, setDateRangeStart] = useState<string | null>(null);
  const [dateRangeEnd, setDateRangeEnd] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') setIsAuthenticated(true);
    else window.location.href = '/admin';
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const savedAvailability = localStorage.getItem('ogn-prophet-availability');
    if (savedAvailability) setAvailability(JSON.parse(savedAvailability));
    const savedBookings = localStorage.getItem('ogn-prophet-bookings');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    const savedServices = localStorage.getItem('ogn-prophet-services');
    if (savedServices) setServices(JSON.parse(savedServices));
    setUnreadCount(getUnreadNotificationCount());
  };

  const saveAvailability = () => {
    localStorage.setItem('ogn-prophet-availability', JSON.stringify(availability));
    alert('Availability saved! Changes are now live on the public scheduling page.');
  };

  const saveServices = () => {
    localStorage.setItem('ogn-prophet-services', JSON.stringify(services));
    alert('Services saved!');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    
    // Add padding for start of week
    for (let i = 0; i < firstDay.getDay(); i++) {
      const d = new Date(year, month, -i);
      days.unshift(d);
    }
    
    // Add days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add padding for end of week
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => date.toISOString().split('T')[0];

  const handleDateClick = (date: Date, shiftKey: boolean) => {
    const dateKey = formatDateKey(date);
    
    if (shiftKey && dateRangeStart) {
      // Range selection
      const start = new Date(dateRangeStart);
      const end = date;
      const [first, last] = start < end ? [start, end] : [end, start];
      const range: string[] = [];
      const current = new Date(first);
      while (current <= last) {
        range.push(formatDateKey(current));
        current.setDate(current.getDate() + 1);
      }
      setSelectedDates(range);
      setDateRangeEnd(dateKey);
    } else {
      // Single click or start new range
      if (selectedDates.includes(dateKey)) {
        setSelectedDates(selectedDates.filter(d => d !== dateKey));
      } else {
        setSelectedDates([...selectedDates, dateKey]);
      }
      setDateRangeStart(dateKey);
      setDateRangeEnd(null);
    }
  };

  const handleSelectDateRange = () => {
    if (selectedDates.length === 0) {
      alert('Please select dates first by clicking on the calendar');
      return;
    }
    setShowTimeModal(true);
    // Pre-select times that are common across all selected dates
    if (selectedDates.length === 1 && availability[selectedDates[0]]) {
      setSelectedTimeSlots(availability[selectedDates[0]].map(s => s.time));
    } else {
      setSelectedTimeSlots([]);
    }
  };

  const handleApplyTimeSlots = () => {
    const updatedAvailability = { ...availability };
    selectedDates.forEach(date => {
      updatedAvailability[date] = selectedTimeSlots.map(time => ({ time, available: true }));
    });
    setAvailability(updatedAvailability);
    setShowTimeModal(false);
    setSelectedDates([]);
  };

  const handleClearSelectedDates = () => {
    const updatedAvailability = { ...availability };
    selectedDates.forEach(date => {
      delete updatedAvailability[date];
    });
    setAvailability(updatedAvailability);
    setSelectedDates([]);
  };

  const toggleTimeSlot = (time: string) => {
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(t => t !== time));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, time]);
    }
  };

  const selectTimeRange = (start: string, end: string) => {
    const startIdx = TIME_SLOTS.indexOf(start);
    const endIdx = TIME_SLOTS.indexOf(end);
    if (startIdx !== -1 && endIdx !== -1) {
      const range = TIME_SLOTS.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
      setSelectedTimeSlots([...new Set([...selectedTimeSlots, ...range])]);
    }
  };

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus, isPaid: newStatus === 'confirmed' } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('ogn-prophet-bookings', JSON.stringify(updatedBookings));
  };

  const updateService = (serviceId: string, updates: Partial<ServiceType>) => {
    setServices(services.map(s => s.id === serviceId ? { ...s, ...updates } : s));
  };

  const copyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getBookingsForDate = (dateKey: string) => {
    return bookings.filter(b => b.date === dateKey);
  };

  if (!isAuthenticated) return null;

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Prophet Joshua Schedule</h1>
                  <p className="text-xs text-gray-500">Manage availability & bookings</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/schedule-prophet-joshua" target="_blank" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600">
                <ExternalLink className="w-4 h-4" /> View Public Page
              </Link>
              <button onClick={saveAvailability} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-amber-500/30">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Nav */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/events" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100">
            <Bell className="w-4 h-4" /> Notifications
            {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100">
            <FileText className="w-4 h-4" /> Blog
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          {[
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'services', label: 'Services', icon: DollarSign },
            { id: 'bookings', label: 'Bookings', icon: User },
            { id: 'links', label: 'Share Links', icon: LinkIcon },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white text-gray-600 hover:text-amber-600 border border-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.id === 'bookings' && bookings.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'bookings' ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-600'}`}>
                  {bookings.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Click</strong> to select dates • <strong>Shift+Click</strong> to select a range • Then click &quot;Set Time Slots&quot;
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, idx) => {
                  const dateKey = formatDateKey(date);
                  const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                  const isToday = formatDateKey(new Date()) === dateKey;
                  const isSelected = selectedDates.includes(dateKey);
                  const hasSlots = availability[dateKey] && availability[dateKey].length > 0;
                  const dayBookings = getBookingsForDate(dateKey);
                  const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <button
                      key={idx}
                      onClick={(e) => !isPast && handleDateClick(date, e.shiftKey)}
                      disabled={isPast}
                      className={`aspect-square p-1 rounded-lg text-sm transition-all relative ${
                        isPast ? 'bg-gray-50 text-gray-300 cursor-not-allowed' :
                        isSelected ? 'bg-amber-500 text-white ring-2 ring-amber-300' :
                        hasSlots ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                        isCurrentMonth ? 'bg-gray-50 text-gray-900 hover:bg-gray-100' :
                        'bg-gray-50/50 text-gray-400'
                      } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <span className="font-medium">{date.getDate()}</span>
                      {hasSlots && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-green-600">
                          {availability[dateKey].length}
                        </span>
                      )}
                      {dayBookings.length > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Dates Actions */}
              {selectedDates.length > 0 && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-sm text-amber-800 mb-3">
                    <strong>{selectedDates.length}</strong> date(s) selected
                  </p>
                  <div className="flex gap-3">
                    <button onClick={handleSelectDateRange} className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium">
                      Set Time Slots
                    </button>
                    <button onClick={handleClearSelectedDates} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200">
                      Clear Slots
                    </button>
                    <button onClick={() => setSelectedDates([])} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                      Deselect
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Legend & Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Legend</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg" />
                    <span className="text-sm text-gray-600">Has time slots available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg" />
                    <span className="text-sm text-gray-600">Currently selected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg ring-2 ring-blue-500" />
                    <span className="text-sm text-gray-600">Today</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg relative">
                      <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-600">Has bookings</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days with slots</span>
                    <span className="font-bold text-gray-900">{Object.keys(availability).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total bookings</span>
                    <span className="font-bold text-gray-900">{bookings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confirmed</span>
                    <span className="font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed' || b.isPaid).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-bold text-amber-600">{bookings.filter(b => b.status === 'pending_payment' && !b.isPaid).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Manage Services</h2>
                <button onClick={saveServices} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium">
                  <Save className="w-4 h-4" /> Save Services
                </button>
              </div>
              <div className="space-y-6">
                {services.map((service) => (
                  <div key={service.id} className={`border-2 rounded-xl p-6 ${service.active ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <input type="text" value={service.title} onChange={(e) => updateService(service.id, { title: e.target.value })} className="text-xl font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-amber-500 focus:outline-none w-full" />
                      <label className="flex items-center gap-2 cursor-pointer ml-4">
                        <input type="checkbox" checked={service.active} onChange={(e) => updateService(service.id, { active: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-amber-500" />
                        <span className="text-sm text-gray-600 whitespace-nowrap">Active</span>
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input type="text" value={service.duration} onChange={(e) => updateService(service.id, { duration: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input type="number" value={service.price} onChange={(e) => updateService(service.id, { price: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none" />
                      </div>
                    </div>
                    <textarea value={service.description} onChange={(e) => updateService(service.id, { description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Bookings ({bookings.length})</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{booking.serviceType?.title || booking.sessionType?.title || '1-on-1 Session'}</h3>
                          <p className="text-sm text-gray-600">{booking.serviceType?.duration || '60 minutes'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' || booking.isPaid ? 'bg-green-100 text-green-700' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.isPaid ? 'PAID' : booking.status?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-gray-600"><Calendar className="w-4 h-4" /> {new Date(booking.date).toLocaleDateString()}</p>
                          <p className="flex items-center gap-2 text-gray-600"><Clock className="w-4 h-4" /> {booking.time}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.customer?.firstName} {booking.customer?.lastName}</p>
                          <p className="text-gray-600">{booking.customer?.email}</p>
                          <p className="text-gray-600">{booking.customer?.phone}</p>
                        </div>
                      </div>
                      {booking.customer?.notes && (
                        <p className="text-gray-600 mt-3 text-sm italic bg-gray-50 p-2 rounded">&quot;{booking.customer.notes}&quot;</p>
                      )}
                      <div className="flex gap-2 mt-4">
                        {!booking.isPaid && booking.status !== 'confirmed' && (
                          <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Mark as Paid</button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Cancel</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shareable Links</h2>
              <p className="text-gray-600 mb-6">Copy and share these links with clients</p>
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Main Scheduling Page</h3>
                    <Link href="/schedule-prophet-joshua" target="_blank" className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Preview</Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">{typeof window !== 'undefined' ? `${window.location.origin}/schedule-prophet-joshua` : ''}</code>
                    <button onClick={() => copyLink(`${window.location.origin}/schedule-prophet-joshua`, 'main')} className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                      {copiedLink === 'main' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Pre-Paid / Admin Approved</h3>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">{typeof window !== 'undefined' ? `${window.location.origin}/schedule-prophet-joshua?paid=true` : ''}</code>
                    <button onClick={() => copyLink(`${window.location.origin}/schedule-prophet-joshua?paid=true`, 'paid')} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      {copiedLink === 'paid' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Other Links</h2>
              <div className="space-y-3">
                {[
                  { name: 'Discipleship Enrollment', path: '/discipleship/enroll', color: 'blue' },
                  { name: 'Donation Page', path: '/give', color: 'purple' },
                  { name: 'Blog / Messages', path: '/blog', color: 'gray' },
                ].map((link) => (
                  <div key={link.path} className={`bg-${link.color}-50 border border-${link.color}-200 rounded-xl p-4`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{link.name}</h3>
                      <button onClick={() => copyLink(`${window.location.origin}${link.path}`, link.path)} className={`p-2 bg-${link.color}-500 text-white rounded-lg hover:bg-${link.color}-600`}>
                        {copiedLink === link.path ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Time Slot Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Set Time Slots</h2>
                <p className="text-sm text-gray-600">For {selectedDates.length} selected date(s)</p>
              </div>
              <button onClick={() => setShowTimeModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {/* Quick Range Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Select</h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => selectTimeRange('9:00 AM', '12:00 PM')} className="px-3 py-2 bg-gray-100 hover:bg-amber-100 rounded-lg text-sm font-medium">Morning (9AM-12PM)</button>
                  <button onClick={() => selectTimeRange('1:00 PM', '5:00 PM')} className="px-3 py-2 bg-gray-100 hover:bg-amber-100 rounded-lg text-sm font-medium">Afternoon (1PM-5PM)</button>
                  <button onClick={() => selectTimeRange('6:00 PM', '8:00 PM')} className="px-3 py-2 bg-gray-100 hover:bg-amber-100 rounded-lg text-sm font-medium">Evening (6PM-8PM)</button>
                  <button onClick={() => setSelectedTimeSlots(TIME_SLOTS)} className="px-3 py-2 bg-gray-100 hover:bg-amber-100 rounded-lg text-sm font-medium">All Day</button>
                  <button onClick={() => setSelectedTimeSlots([])} className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium">Clear All</button>
                </div>
              </div>
              {/* Time Grid */}
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button key={time} onClick={() => toggleTimeSlot(time)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTimeSlots.includes(time) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                    {time}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t flex gap-3">
                <button onClick={() => setShowTimeModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200">Cancel</button>
                <button onClick={handleApplyTimeSlots} className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold">Apply to {selectedDates.length} Date(s)</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
