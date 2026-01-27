'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Trash2, Save, DollarSign, Eye, Link as LinkIcon, Copy, ExternalLink, User, Video, CheckCircle, Image as ImageIcon, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
  {
    id: 'prophetic-word',
    title: 'Prophetic Word & Prayer',
    duration: '30 minutes',
    price: 50,
    description: 'Receive a personal prophetic word and prayer from Prophet Joshua Matthews.',
    active: true,
  },
  {
    id: 'spiritual-guidance',
    title: 'Spiritual Guidance Session',
    duration: '60 minutes',
    price: 100,
    description: 'In-depth spiritual guidance, counsel, and prayer for life decisions.',
    active: true,
  },
  {
    id: 'ministry-consultation',
    title: 'Ministry Consultation',
    duration: '90 minutes',
    price: 150,
    description: 'Strategic consultation for ministry leaders and church planters.',
    active: true,
  },
];

const TIME_PRESETS = [
  { label: 'Morning (9AM-12PM)', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
  { label: 'Afternoon (1PM-5PM)', slots: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'] },
  { label: 'Evening (6PM-9PM)', slots: ['6:00 PM', '7:00 PM', '8:00 PM'] },
];

const STOCK_PROPHET_IMAGES = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
];

export default function ProphetScheduleAdmin() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availability, setAvailability] = useState<Record<string, TimeSlot[]>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<ServiceType[]>(DEFAULT_SERVICES);
  const [prophetPhoto, setProphetPhoto] = useState<string>('/images/prophet-joshua.jpg');
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'schedule' | 'services' | 'bookings' | 'links'>('schedule');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Time range selection
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [timeIncrement, setTimeIncrement] = useState(60); // minutes

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/admin';
    }
    loadData();
  }, []);

  const loadData = () => {
    const savedAvailability = localStorage.getItem('ogn-prophet-availability');
    if (savedAvailability) {
      setAvailability(JSON.parse(savedAvailability));
    }

    const savedBookings = localStorage.getItem('ogn-prophet-bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    const savedServices = localStorage.getItem('ogn-prophet-services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }

    const savedPhoto = localStorage.getItem('ogn-prophet-photo');
    if (savedPhoto) {
      setProphetPhoto(savedPhoto);
    }
  };

  const saveAvailability = () => {
    localStorage.setItem('ogn-prophet-availability', JSON.stringify(availability));
    alert('Availability saved successfully!');
  };

  const saveServices = () => {
    localStorage.setItem('ogn-prophet-services', JSON.stringify(services));
    alert('Services saved successfully!');
  };

  const savePhoto = (url: string) => {
    setProphetPhoto(url);
    localStorage.setItem('ogn-prophet-photo', url);
    setShowPhotoSelector(false);
  };

  // Generate time slots from range
  const generateTimeSlots = () => {
    if (!selectedDate) return;

    const slots: TimeSlot[] = [];
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    let currentMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    while (currentMinutes < endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const mins = currentMinutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      const timeStr = `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
      
      slots.push({ time: timeStr, available: true });
      currentMinutes += timeIncrement;
    }

    const updatedAvailability = { ...availability };
    updatedAvailability[selectedDate] = slots;
    setAvailability(updatedAvailability);
  };

  // Add preset time slots
  const addPresetSlots = (preset: typeof TIME_PRESETS[0]) => {
    if (!selectedDate) return;

    const updatedAvailability = { ...availability };
    if (!updatedAvailability[selectedDate]) {
      updatedAvailability[selectedDate] = [];
    }

    preset.slots.forEach(time => {
      if (!updatedAvailability[selectedDate].find(s => s.time === time)) {
        updatedAvailability[selectedDate].push({ time, available: true });
      }
    });

    // Sort by time
    updatedAvailability[selectedDate].sort((a, b) => {
      const timeA = new Date(`2000/01/01 ${a.time}`).getTime();
      const timeB = new Date(`2000/01/01 ${b.time}`).getTime();
      return timeA - timeB;
    });

    setAvailability(updatedAvailability);
  };

  const removeTimeSlot = (date: string, time: string) => {
    const updatedAvailability = { ...availability };
    updatedAvailability[date] = updatedAvailability[date].filter(
      (slot: TimeSlot) => slot.time !== time
    );
    setAvailability(updatedAvailability);
  };

  const clearDateSlots = (date: string) => {
    const updatedAvailability = { ...availability };
    delete updatedAvailability[date];
    setAvailability(updatedAvailability);
  };

  const getNext30Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus, isPaid: newStatus === 'confirmed' } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('ogn-prophet-bookings', JSON.stringify(updatedBookings));
  };

  const updateService = (serviceId: string, updates: Partial<ServiceType>) => {
    const updatedServices = services.map(s =>
      s.id === serviceId ? { ...s, ...updates } : s
    );
    setServices(updatedServices);
  };

  const copyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getServiceLink = (service: ServiceType) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/schedule-prophet-joshua?service=${service.id}`;
  };

  const getPaidLink = (service: ServiceType) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/schedule-prophet-joshua?service=${service.id}&paid=true`;
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
                <Image
                  src={prophetPhoto}
                  alt="Prophet Joshua"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prophet Joshua Schedule</h1>
                <p className="text-gray-600">Manage availability, services & bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPhotoSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                Change Photo
              </button>
              <Link
                href="/schedule-prophet-joshua"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Public Page
              </Link>
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Selector Modal */}
      {showPhotoSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Profile Photo</h3>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {STOCK_PROPHET_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => savePhoto(img)}
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-amber-500 transition-colors"
                >
                  <Image src={img} alt={`Option ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Or enter custom URL:</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customPhotoUrl}
                  onChange={(e) => setCustomPhotoUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                />
                <button
                  onClick={() => customPhotoUrl && savePhoto(customPhotoUrl)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium"
                >
                  Use
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowPhotoSelector(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'services', label: 'Services', icon: DollarSign },
              { id: 'bookings', label: 'Bookings', icon: User },
              { id: 'links', label: 'Share Links', icon: LinkIcon },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Availability Management */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Set Availability</h2>
                <button
                  onClick={saveAvailability}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Choose a date...</option>
                  {getNext30Days().map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                      {availability[date] ? ` (${availability[date].length} slots)` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDate && (
                <>
                  {/* Time Range Generator */}
                  <div className="bg-amber-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Generate Time Slots</h3>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">End Time</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Increment</label>
                        <select
                          value={timeIncrement}
                          onChange={(e) => setTimeIncrement(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                        >
                          <option value={30}>30 min</option>
                          <option value={60}>1 hour</option>
                          <option value={90}>1.5 hours</option>
                          <option value={120}>2 hours</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={generateTimeSlots}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Generate Slots
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Quick Add Presets</h3>
                    <div className="flex flex-wrap gap-2">
                      {TIME_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => addPresetSlots(preset)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          + {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Slots */}
                  {availability[selectedDate] && availability[selectedDate].length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          Slots for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </h3>
                        <button
                          onClick={() => clearDateSlots(selectedDate)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {availability[selectedDate].map((slot: TimeSlot, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                          >
                            <span className="text-sm font-medium">{slot.time}</span>
                            <button
                              onClick={() => removeTimeSlot(selectedDate, slot.time)}
                              className="text-red-500 hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Calendar Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Calendar Overview</h2>
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {getNext30Days().map((date) => {
                  const d = new Date(date);
                  const hasSlots = availability[date] && availability[date].length > 0;
                  const slotCount = availability[date]?.length || 0;
                  const isSelected = selectedDate === date;
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-white'
                          : hasSlots
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium">{d.getDate()}</span>
                      {hasSlots && (
                        <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-green-600'}`}>
                          {slotCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Manage Services</h2>
                <button
                  onClick={saveServices}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Services
                </button>
              </div>

              <div className="space-y-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border-2 rounded-xl p-6 transition-colors ${
                      service.active ? 'border-amber-200 bg-amber-50/50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(service.id, { title: e.target.value })}
                          className="text-xl font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-amber-500 focus:outline-none w-full"
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={service.active}
                          onChange={(e) => updateService(service.id, { active: e.target.checked })}
                          className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm text-gray-600">Active</span>
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={service.duration}
                          onChange={(e) => updateService(service.id, { duration: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => updateService(service.id, { price: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateService(service.id, { description: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Service-specific links */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Booking Links for this Service</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-xs bg-gray-100 px-3 py-2 rounded overflow-x-auto">
                            {getServiceLink(service)}
                          </code>
                          <button
                            onClick={() => copyLink(getServiceLink(service), `service-${service.id}`)}
                            className="p-2 text-gray-500 hover:text-amber-600"
                          >
                            {copiedLink === `service-${service.id}` ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Share this link for clients to book this specific service</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                <User className="w-5 h-5 inline mr-2" />
                All Bookings ({bookings.length})
              </h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {booking.serviceType?.title || booking.sessionType?.title || '1-on-1 Session'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {booking.serviceType?.duration || booking.sessionType?.duration || '60 minutes'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' || booking.isPaid
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'pending_payment'
                            ? 'bg-yellow-100 text-yellow-700'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.isPaid ? 'PAID' : booking.status?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.customer?.firstName} {booking.customer?.lastName}
                          </p>
                          <p className="text-gray-600">{booking.customer?.email}</p>
                          <p className="text-gray-600">{booking.customer?.phone}</p>
                        </div>
                      </div>

                      {booking.customer?.notes && (
                        <p className="text-gray-600 mt-3 text-sm italic bg-gray-50 p-2 rounded">
                          &quot;{booking.customer.notes}&quot;
                        </p>
                      )}

                      <div className="flex gap-2 mt-4">
                        {(booking.status === 'pending_payment' || !booking.isPaid) && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Mark as Paid
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
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
            {/* Main Scheduling Link */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                <LinkIcon className="w-5 h-5 inline mr-2" />
                Shareable Links
              </h2>
              <p className="text-gray-600 mb-6">Copy and share these links with your clients</p>

              <div className="space-y-4">
                {/* Main Page Link */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Main Scheduling Page</h3>
                    <Link
                      href="/schedule-prophet-joshua"
                      target="_blank"
                      className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Preview
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">
                      {typeof window !== 'undefined' ? `${window.location.origin}/schedule-prophet-joshua` : '/schedule-prophet-joshua'}
                    </code>
                    <button
                      onClick={() => copyLink(`${window.location.origin}/schedule-prophet-joshua`, 'main')}
                      className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    >
                      {copiedLink === 'main' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Pre-Paid Link */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Pre-Paid / Admin Approved Link</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">No payment required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">
                      {typeof window !== 'undefined' ? `${window.location.origin}/schedule-prophet-joshua?paid=true` : '/schedule-prophet-joshua?paid=true'}
                    </code>
                    <button
                      onClick={() => copyLink(`${window.location.origin}/schedule-prophet-joshua?paid=true`, 'paid')}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      {copiedLink === 'paid' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Service-Specific Links */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Service-Specific Links</h3>
                  <div className="space-y-3">
                    {services.filter(s => s.active).map((service) => (
                      <div key={service.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{service.title}</h4>
                            <p className="text-sm text-gray-500">{service.duration} • ${service.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-xs bg-white px-3 py-2 rounded border overflow-x-auto">
                            {getServiceLink(service)}
                          </code>
                          <button
                            onClick={() => copyLink(getServiceLink(service), service.id)}
                            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                          >
                            {copiedLink === service.id ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Admin Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Other Shareable Links</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Discipleship Enrollment Form</h3>
                    <Link
                      href="/discipleship/enroll"
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Preview
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">
                      {typeof window !== 'undefined' ? `${window.location.origin}/discipleship/enroll` : '/discipleship/enroll'}
                    </code>
                    <button
                      onClick={() => copyLink(`${window.location.origin}/discipleship/enroll`, 'discipleship')}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {copiedLink === 'discipleship' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Donation Page</h3>
                    <Link
                      href="/give"
                      target="_blank"
                      className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Preview
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">
                      {typeof window !== 'undefined' ? `${window.location.origin}/give` : '/give'}
                    </code>
                    <button
                      onClick={() => copyLink(`${window.location.origin}/give`, 'give')}
                      className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      {copiedLink === 'give' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Blog / Messages</h3>
                    <Link
                      href="/blog"
                      target="_blank"
                      className="text-gray-600 hover:text-gray-700 text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Preview
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border overflow-x-auto">
                      {typeof window !== 'undefined' ? `${window.location.origin}/blog` : '/blog'}
                    </code>
                    <button
                      onClick={() => copyLink(`${window.location.origin}/blog`, 'blog')}
                      className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      {copiedLink === 'blog' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
