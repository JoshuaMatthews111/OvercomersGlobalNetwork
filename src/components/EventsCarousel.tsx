'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Instagram, Facebook, Youtube } from 'lucide-react';

interface Event {
  id: number;
  image: string;
  title: string;
  date?: string;
}

// Default placeholder events - these will be replaced by admin-uploaded events
const defaultEvents: Event[] = [
  {
    id: 1,
    image: '/images/events/event-1.jpg',
    title: 'Upcoming Event',
    date: 'Coming Soon',
  },
  {
    id: 2,
    image: '/images/events/event-2.jpg',
    title: 'Upcoming Event',
    date: 'Coming Soon',
  },
  {
    id: 3,
    image: '/images/events/event-3.jpg',
    title: 'Upcoming Event',
    date: 'Coming Soon',
  },
];

export function EventsCarousel() {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
                className={`absolute inset-0 transition-all duration-700 ease-out ${
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
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{event.title}</h3>
                  {event.date && (
                    <p className="text-amber-400 font-medium">{event.date}</p>
                  )}
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
