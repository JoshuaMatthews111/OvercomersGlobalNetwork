'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, Mail, MapPin, Phone, Globe, MessageCircle, Music } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Discipleship', href: '/discipleship' },
  { label: 'Watch', href: '/watch' },
  { label: 'Resources', href: '/resources' },
  { label: 'Events', href: '/events' },
];

const connectLinks = [
  { label: 'Join a House Church', href: '/discipleship' },
  { label: 'Start Discipleship', href: '/discipleship#start' },
  { label: 'Prayer Request', href: '/connect#prayer' },
  { label: 'Contact Us', href: '/connect' },
  { label: 'Give', href: '/give' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/overcomersglobalnetwork', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/overcomersglobalnetwork', label: 'Instagram' },
  { icon: Music, href: 'https://tiktok.com/@overcomersglobalnetwork', label: 'TikTok' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://wa.me/1234567890', label: 'WhatsApp' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Connected with <span className="gold-shimmer-light">OGN</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to receive updates on teachings, events, and stories from our global network.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="https://ext.same-assets.com/1353966518/2429820712.png"
                alt="Overcomers Global Network"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <div className="font-bold text-lg">
                  <span className="gold-shimmer-light">Overcomers</span>
                </div>
                <div className="text-xs text-gray-400 tracking-wide">
                  Global Network
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A global discipleship network gathering from home to home, 
              making disciples who make disciples across the nations.
              <br /><br />
              <span className="text-amber-400 font-medium">Join our WhatsApp community for updates!</span>
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-amber-400 font-bold mb-6">Get Involved</h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-amber-400 font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  7519 Mentor Ave, Suite A106<br />
                  Painesville, OH 44077<br />
                  <span className="text-amber-400 font-medium">• Tampa, FL Location</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="mailto:ognmedia2024@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  ognmedia2024@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="https://www.overcomersglobalnetwork.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  overcomersglobalnetwork.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 Overcomers Global Network. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span className="text-amber-500 font-medium">Psalm 34:8</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
