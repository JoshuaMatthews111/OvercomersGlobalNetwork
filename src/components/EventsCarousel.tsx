'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Instagram, Facebook, Youtube } from 'lucide-react';

interface Event {
  id: number;
  image: string;
  title: string;
  date?: string;
  description?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  eventDate?: string;
}

// Default placeholder events - these will be replaced by admin-uploaded events
const defaultEvents: Event[] = [
  {
    id: 1,
    image: '/images/events/Church Service (1).jpg',
    title: 'Church Service',
    date: 'Every Sunday',
  },
  {
    id: 2,
    image: '/images/events/Freshhand Fire (3).jpg',
    title: 'Fresh Fire Conference',
    date: 'Coming Soon',
  },
  {
    id: 3,
    image: '/images/events/FOLLOW US ON TIKTOK.jpg',
    title: 'Follow Us Online',
    date: 'Daily Content',
  },
  {
    id: 4,
    image: '/images/events/Church (1).mp4',
    title: 'Service Highlights',
    date: 'Weekly',
  },
];

export function EventsCarousel() {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load events from localStorage (admin can add these)
  useEffect(() => {
    const savedEvents = localStorage.getItem('ogn-events-flyers');
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      if (parsed.length > 0) {
        setEvents(parsed);
      }
    }
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || events.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setIsAutoPlaying(false);
  };

  const handleAddToCalendar = (event: Event) => {
    const startDate = event.eventDate || new Date().toISOString().split('T')[0];
    const startTime = event.startTime || '10:00';
    const endTime = event.endTime || '12:00';
    
    const start = `${startDate}T${startTime}:00`;
    const end = `${startDate}T${endTime}:00`;
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start.replace(/[-:]/g, '')}/${end.replace(/[-:]/g, '')}&details=${encodeURIComponent(event.description || 'Join us for this special event!')}&location=${encodeURIComponent(event.location || 'Overcomers Global Network')}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  if (events.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-amber-400 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don't Miss What's <span className="gold-shimmer">Coming</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay connected with our upcoming events, conferences, and gatherings. 
            Swipe through to see what God is doing in our community!
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel */}
          <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl">
            {events.map((event, index) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className={`absolute inset-0 transition-all duration-700 ease-out cursor-pointer group ${
                  index === currentIndex 
                    ? 'opacity-100 scale-100 z-10' 
                    : index === (currentIndex - 1 + events.length) % events.length
                    ? 'opacity-0 scale-95 -translate-x-full z-0'
                    : 'opacity-0 scale-95 translate-x-full z-0'
                }`}
                style={{
                  animation: index === currentIndex ? 'float 6s ease-in-out infinite' : 'none'
                }}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Event Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{event.title}</h3>
                  {event.date && (
                    <p className="text-amber-400 font-medium">{event.date}</p>
                  )}
                  <p className="text-white/80 text-sm mt-2">Click to view details</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {events.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Next event"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {events.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-amber-500 w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Follow Us CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Follow us for more events and updates</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com/overcomersglobalnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/overcomersglobalnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@overcomersglobalnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all hover:scale-110"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Flyer Image */}
            <div className="relative aspect-[16/9] md:aspect-[2/1]">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Event Details */}
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
              
              {selectedEvent.description && (
                <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
              )}

              <div className="space-y-3 mb-6">
                {selectedEvent.date && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <span className="font-medium">{selectedEvent.date}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.startTime && selectedEvent.endTime && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleAddToCalendar(selectedEvent)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Add to Calendar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}
