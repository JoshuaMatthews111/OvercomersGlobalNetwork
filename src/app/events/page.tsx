import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming events, conferences, and gatherings from Overcomers Global Network. Join us for worship, teaching, and fellowship.',
  alternates: { canonical: '/events/' },
  openGraph: {
    title: 'Events | Overcomers Global Network',
    description: 'Upcoming events, conferences, and gatherings. Join us for worship, teaching, and fellowship.',
    url: 'https://overcomersglobalnetwork.com/events/',
  },
};

const featuredEvent = {
  title: 'Kids Night Fun Night Club',
  date: 'July 10, 2026',
  time: '5:00 PM - 9:00 PM',
  location: '7519 Mentor Ave Ste A106, Mentor, OH 44060',
  description: 'Kids Night is a safe, fun, and purpose-filled evening for ages 10 and up! Kids will enjoy games, dinner, a movie, and worship while parents get a well-deserved break. Spots are limited, so register today!',
  image: '/images/events/kids-night-2026-07-10.jpg',
  href: '/events/kids-night',
  price: '$50 gift',
};

const upcomingEvents = [
  {
    id: 1,
    title: 'Kids Night Fun Night Club',
    date: 'Jul 10, 2026',
    time: '5:00 PM - 9:00 PM',
    location: '7519 Mentor Ave Ste A106, Mentor, OH 44060',
    type: 'In-Person',
    description: 'Games, dinner, a movie, and worship for ages 10 and up. Registration is a $50 gift.',
    href: '/events/kids-night',
  },
  {
    id: 2,
    title: 'House Church Leaders Summit',
    date: 'Feb 8, 2025',
    time: '10:00 AM EST',
    location: 'Online via Zoom',
    type: 'Virtual',
    description: 'Monthly gathering for house church leaders to connect, learn, and share.',
  },
  {
    id: 3,
    title: 'Prayer & Intercession Night',
    date: 'Feb 14, 2025',
    time: '7:00 PM EST',
    location: 'Online',
    type: 'Virtual',
    description: 'Join us for a powerful night of corporate prayer for the nations.',
  },
  {
    id: 4,
    title: 'New Believer\'s Class',
    date: 'Feb 22, 2025',
    time: '9:00 AM EST',
    location: 'Multiple Locations',
    type: 'Hybrid',
    description: 'Foundations course for those new to the faith or new to OGN.',
  },
  {
    id: 5,
    title: 'Kingdom Business Workshop',
    date: 'Mar 1, 2025',
    time: '2:00 PM EST',
    location: 'Online',
    type: 'Virtual',
    description: 'Biblical principles for entrepreneurs and marketplace leaders.',
  },
  {
    id: 6,
    title: 'Youth Discipleship Retreat',
    date: 'Mar 8-9, 2025',
    time: 'All Day',
    location: 'Ohio, USA',
    type: 'In-Person',
    description: 'Weekend retreat for young disciples ages 13-25.',
  },
  {
    id: 7,
    title: 'Women\'s Fellowship',
    date: 'Mar 15, 2025',
    time: '11:00 AM EST',
    location: 'Online',
    type: 'Virtual',
    description: 'Monthly gathering for women in the OGN community.',
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Events
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              Gather, Learn, <span className="gold-shimmer">Grow</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join us for conferences, training sessions, and community gatherings 
              both online and in-person across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr] overflow-hidden rounded-3xl bg-gray-950 shadow-2xl">
              <div className="relative min-h-[460px] bg-black">
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
              </div>
              <div className="p-8 md:p-12 lg:p-16">
                <div>
                  <span className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Globe className="w-4 h-4" />
                    Featured Event
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {featuredEvent.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    {featuredEvent.description}
                  </p>
                  <div className="flex flex-wrap gap-6 mb-8 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      {featuredEvent.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      {featuredEvent.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      {featuredEvent.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-400" />
                      {featuredEvent.price}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={featuredEvent.href}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
                    >
                      Register Now
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href={featuredEvent.href} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-semibold transition-all">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Calendar
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Upcoming Events
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
              >
                {/* Date Badge */}
                <div className="flex-shrink-0 w-20 h-20 bg-amber-50 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-amber-600 font-bold text-xl">
                    {event.date.split(' ')[1]?.replace(',', '')}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {event.date.split(' ')[0]}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      event.type === 'Virtual' 
                        ? 'bg-blue-100 text-blue-700'
                        : event.type === 'Hybrid'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <Link
                    href={event.href || '/connect'}
                    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-700 px-6 py-3 rounded-full font-medium transition-all"
                  >
                    Register
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold">
              View Full Calendar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want to Host an Event?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Whether it's a local gathering, training session, or regional conference, 
              we can help you plan and execute impactful events for your community.
            </p>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
