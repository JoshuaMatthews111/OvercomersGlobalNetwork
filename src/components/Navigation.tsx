'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Discipleship', href: '/discipleship' },
    { label: 'Watch', href: '/watch' },
    { label: 'App', href: '/app' },
    { label: 'Store', href: '/store' },
    { label: 'Blog', href: '/blog' },
    { label: 'Events', href: '/events' },
    { label: '1-on-1', href: '/oneonone' },
    { label: 'Give', href: '/give' },
    { label: 'Connect', href: '/connect' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1b3d] border-b border-[#1a2d5e]">
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
                className="whitespace-nowrap transition-colors text-sm font-medium text-white hover:text-amber-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/network"
              className="px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/30 bg-amber-500 hover:bg-amber-600 text-white"
            >
              Join Our Network
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-amber-500/30 bg-[#0f1b3d]">
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
