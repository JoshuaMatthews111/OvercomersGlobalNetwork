'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkPage, setIsDarkPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if we're on a page with dark background
    const darkPages = ['/'];
    const currentPath = window.location.pathname;
    setIsDarkPage(darkPages.includes(currentPath));
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Discipleship', href: '/discipleship' },
    { label: 'Watch', href: '/watch' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: 'Give', href: '/give' },
    { label: 'Connect', href: '/connect' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/60 backdrop-blur-xl border-b border-amber-500/20' 
        : isDarkPage 
        ? 'bg-transparent backdrop-blur-sm'
        : 'bg-white/90 backdrop-blur-xl border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-24 w-64 overflow-hidden">
              <Image
                src="/images/ogn-logo-transparent.png"
                alt="Overcomers Global Network"
                fill
                className="object-cover scale-100 transition-transform group-hover:scale-110 filter drop-shadow-lg"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors text-sm font-medium ${
                  scrolled 
                    ? 'text-white hover:text-amber-400' 
                    : isDarkPage
                    ? 'text-white hover:text-amber-400'
                    : 'text-gray-900 hover:text-amber-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/network"
              className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/30 ${
                  scrolled 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : isDarkPage
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
            >
              Join Our Network
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${
              scrolled 
                ? 'text-white' 
                : isDarkPage
                ? 'text-white'
                : 'text-gray-900'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-amber-500/30 bg-black/20 backdrop-blur-lg">
            <div className="pt-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-3 px-2 text-white hover:text-amber-400 hover:bg-amber-500/20 rounded-lg transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 px-2">
                <Link
                  href="/network"
                  className="block w-full bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-full font-semibold text-center transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Join Our Network
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
