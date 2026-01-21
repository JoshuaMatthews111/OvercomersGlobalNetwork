'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Trash2, Save, DollarSign, Eye } from 'lucide-react';
import Link from 'next/link';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Booking {
  id: number;
  sessionType: any;
  date: string;
  time: string;
  customer: any;
  status: string;
  createdAt: string;
}

export default function ProphetScheduleAdmin() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availability, setAvailability] = useState<any>({});
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sessionPrices, setSessionPrices] = useState({
    'prophetic-word': 50,
    'spiritual-guidance': 100,
    'ministry-consultation': 150,
  });

  useEffect(() => {
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
  };

  const saveAvailability = () => {
    localStorage.setItem('ogn-prophet-availability', JSON.stringify(availability));
    alert('Availability saved successfully!');
  };

  const addTimeSlot = () => {
    if (!selectedDate || !newTimeSlot) return;

    const updatedAvailability = { ...availability };
    if (!updatedAvailability[selectedDate]) {
      updatedAvailability[selectedDate] = [];
    }

    updatedAvailability[selectedDate].push({
      time: newTimeSlot,
      available: true,
    });

    setAvailability(updatedAvailability);
    setNewTimeSlot('');
  };

  const removeTimeSlot = (date: string, time: string) => {
    const updatedAvailability = { ...availability };
    updatedAvailability[date] = updatedAvailability[date].filter(
      (slot: TimeSlot) => slot.time !== time
    );
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
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('ogn-prophet-bookings', JSON.stringify(updatedBookings));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prophet Joshua Schedule Management</h1>
              <p className="text-gray-600 mt-1">Manage your availability and bookings</p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Availability Management */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                <Calendar className="w-6 h-6 inline mr-2" />
                Set Availability
              </h2>
              <button
                onClick={saveAvailability}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
              >
                <option value="">Choose a date...</option>
                {getNext30Days().map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Time Slot */}
            {selectedDate && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Time Slot
                </label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    onClick={addTimeSlot}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Time Slots for Selected Date */}
            {selectedDate && availability[selectedDate] && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Available Times for {new Date(selectedDate).toLocaleDateString()}
                </h3>
                <div className="space-y-2">
                  {availability[selectedDate].map((slot: TimeSlot, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      <button
                        onClick={() => removeTimeSlot(selectedDate, slot.time)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Session Pricing */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Session Pricing
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Prophetic Word & Prayer (30 min)</span>
                  <input
                    type="number"
                    value={sessionPrices['prophetic-word']}
                    onChange={(e) => setSessionPrices({ ...sessionPrices, 'prophetic-word': parseInt(e.target.value) })}
                    className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Spiritual Guidance (60 min)</span>
                  <input
                    type="number"
                    value={sessionPrices['spiritual-guidance']}
                    onChange={(e) => setSessionPrices({ ...sessionPrices, 'spiritual-guidance': parseInt(e.target.value) })}
                    className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Ministry Consultation (90 min)</span>
                  <input
                    type="number"
                    value={sessionPrices['ministry-consultation']}
                    onChange={(e) => setSessionPrices({ ...sessionPrices, 'ministry-consultation': parseInt(e.target.value) })}
                    className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <Eye className="w-6 h-6 inline mr-2" />
              Upcoming Bookings
            </h2>

            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No bookings yet</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{booking.sessionType.title}</h3>
                        <p className="text-sm text-gray-600">{booking.sessionType.duration}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'pending_payment'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {booking.time}
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <p className="font-medium text-gray-900">
                          {booking.customer.firstName} {booking.customer.lastName}
                        </p>
                        <p className="text-gray-600">{booking.customer.email}</p>
                        <p className="text-gray-600">{booking.customer.phone}</p>
                        {booking.customer.notes && (
                          <p className="text-gray-600 mt-2 italic">"{booking.customer.notes}"</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {booking.status === 'pending_payment' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Mark as Paid
                        </button>
                      )}
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
