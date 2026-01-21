import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Mail, MapPin, Phone, Globe, Send, Heart, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Community',
    description: 'Join our WhatsApp for updates and fellowship',
    value: 'overcomersglobalnetwork',
    href: 'https://wa.me/1234567890',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us a message anytime',
    value: 'ognmedia2024@gmail.com',
    href: 'mailto:ognmedia2024@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Our locations - Ohio & Tampa',
    value: '7519 Mentor Ave, Suite A106, Painesville, OH 44077 • Tampa, FL',
    href: '#',
  },
  {
    icon: Globe,
    title: 'Website',
    description: 'Learn more about us',
    value: 'overcomersglobalnetwork.com',
    href: 'https://www.overcomersglobalnetwork.com',
  },
];

const connectOptions = [
  {
    icon: Users,
    title: 'Join a House Church',
    description: 'Connect with believers in your area through intimate home gatherings.',
    href: '/discipleship',
    color: 'bg-amber-500',
  },
  {
    icon: Heart,
    title: 'Prayer Request',
    description: 'Submit a prayer request and our team will intercede for you.',
    href: '#prayer',
    color: 'bg-rose-500',
  },
  {
    icon: MessageCircle,
    title: 'General Inquiry',
    description: 'Have questions? We\'d love to hear from you.',
    href: '#contact',
    color: 'bg-blue-500',
  },
];

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Connect
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">
              We'd Love to <span className="gold-shimmer">Hear From You</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Whether you have questions, need prayer, or want to get involved — 
              we're here to connect with you.
            </p>
          </div>
        </div>
      </section>

      {/* Connect Options */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {connectOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-8 text-center transition-all hover:shadow-xl"
              >
                <div className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors bg-white">
                    <option>General Inquiry</option>
                    <option>Join a House Church</option>
                    <option>Start a House Church</option>
                    <option>Partnership Opportunity</option>
                    <option>Media/Press</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of the following channels.
              </p>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{method.title}</h3>
                      <p className="text-gray-500 text-sm mb-1">{method.description}</p>
                      <p className="text-amber-600 font-medium">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-12 h-12 bg-gray-100 hover:bg-amber-500 hover:text-white rounded-full flex items-center justify-center transition-all text-gray-600"
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request */}
      <section id="prayer" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-rose-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Submit a Prayer Request
              </h2>
              <p className="text-gray-600">
                Share your prayer needs with us. Our team is committed to interceding for you.
              </p>
            </div>

            <form className="bg-gray-50 rounded-2xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Request
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors resize-none"
                  placeholder="Share your prayer request with us..."
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="private"
                  className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                />
                <label htmlFor="private" className="text-gray-600 text-sm">
                  Keep my request private (only shared with prayer team)
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Submit Prayer Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for updates on teachings, events, and stories from our global network.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
