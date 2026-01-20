import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Home, Users, BookOpen, Heart, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Reach out to find a house church in your area or join our online community.',
  },
  {
    number: '02',
    title: 'Attend',
    description: 'Visit a gathering and experience authentic fellowship and worship.',
  },
  {
    number: '03',
    title: 'Commit',
    description: 'Become part of the family and begin your discipleship journey.',
  },
  {
    number: '04',
    title: 'Grow',
    description: 'Engage in study, mentorship, and spiritual development.',
  },
  {
    number: '05',
    title: 'Multiply',
    description: 'Train to lead and help start new house churches.',
  },
];

const faqs = [
  {
    question: 'What happens at a house church gathering?',
    answer: 'Our gatherings include worship, prayer, Bible study, fellowship, and a shared meal. We follow the pattern of the early church in Acts — breaking bread together and encouraging one another in faith.',
  },
  {
    question: 'How is this different from a traditional church?',
    answer: 'House churches offer a more intimate setting for deeper relationships and personal discipleship. While we value larger gatherings, we believe spiritual growth happens best in smaller, committed communities.',
  },
  {
    question: 'Can I start a house church in my home?',
    answer: 'Absolutely! We provide training and resources for those called to open their homes. Our leadership team will walk alongside you through the process.',
  },
  {
    question: 'What does discipleship look like at OGN?',
    answer: 'Discipleship at OGN is relational and intentional. You\'ll be paired with a mentor, engage in regular Bible study, and learn to apply Kingdom principles to every area of life.',
  },
];

const locations = [
  { region: 'North America', count: '50+', cities: 'USA, Canada, Mexico' },
  { region: 'Africa', count: '80+', cities: 'Nigeria, Kenya, Ghana, South Africa' },
  { region: 'Europe', count: '30+', cities: 'UK, Germany, France, Netherlands' },
  { region: 'Asia', count: '25+', cities: 'India, Philippines, Singapore' },
  { region: 'South America', count: '15+', cities: 'Brazil, Colombia, Argentina' },
];

export default function DiscipleshipPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="homes" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 2 L18 8 L18 18 L2 18 L2 8 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#homes)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Home className="w-4 h-4" />
              House-to-House Discipleship
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join a <span className="gold-shimmer">House Church</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Experience authentic community and spiritual growth through intimate home gatherings. 
              Following the pattern of Acts, we gather from home to home to worship, learn, and grow together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#find"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Find a House Church
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#start"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Become a Leader
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is a House Church */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                The Model
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                What is a House Church?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                A house church is a small group of believers who gather regularly in a home 
                for worship, prayer, Bible study, and fellowship. This model follows the 
                pattern established by the early church in the Book of Acts.
              </p>
              <ul className="space-y-4">
                {[
                  'Intimate gatherings of 5-15 people',
                  'Weekly meetings in homes',
                  'Shared meals and authentic fellowship',
                  'Interactive Bible study and discussion',
                  'Prayer and mutual encouragement',
                  'Discipleship and mentorship',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
                alt="House church gathering"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm opacity-90">House Churches Worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Your Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              How to Get Started
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-2xl p-6 text-center h-full shadow-sm hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-amber-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find a House Church */}
      <section id="find" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Global Network
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Find a House Church Near You
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We have house churches gathering across the globe. Connect with a community in your region.
            </p>
          </div>

          {/* Location Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {locations.map((location) => (
              <div
                key={location.region}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900">{location.region}</h3>
                <div className="text-2xl font-bold text-amber-600 my-2">{location.count}</div>
                <p className="text-gray-500 text-sm">{location.cities}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Request to Join a House Church
            </h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
              <textarea
                placeholder="Tell us about yourself and what you're looking for..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition-all"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Become a Leader */}
      <section id="start" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                Start a House Church in Your Home
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Feel called to open your home for Kingdom purposes? We provide comprehensive 
                training and ongoing support for those who want to lead house church gatherings.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Leadership training and certification',
                  'Curriculum and study materials',
                  'Ongoing mentorship and support',
                  'Connection to the global network',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/connect"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Apply to Lead
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop"
                alt="Leadership training"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
