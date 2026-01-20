import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Globe, Users, Home, Handshake, ArrowRight, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NetworkPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - One Body in Christ */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="network" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
                <line x1="10" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.3"/>
                <line x1="10" y1="10" x2="10" y2="20" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Global Partnership
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join Our <span className="gold-shimmer">Network</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              We are <strong>one body in Christ</strong>. At Overcomers Global Network, 
              we partner with ministries worldwide to advance the Kingdom together.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Whether you're seeking community, called to lead, or already leading a ministry — 
              there's a place for you in our global family.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pathway Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Your Path
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              How Would You Like to Connect?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Option 1: Find a House Church */}
            <Link href="/discipleship#find" className="group">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 h-full border-2 border-transparent hover:border-amber-500 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Find a House Church</h3>
                <p className="text-gray-600 mb-6">
                  Looking for authentic community? Join a house church gathering in your area 
                  and experience fellowship, worship, and discipleship in an intimate setting.
                </p>
                <span className="inline-flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-3 transition-all">
                  Find a Gathering <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Option 2: Become a Leader */}
            <Link href="/discipleship#start" className="group">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 h-full border-2 border-transparent hover:border-amber-500 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Become a Leader</h3>
                <p className="text-gray-300 mb-6">
                  Feel called to open your home and lead others? We provide training, resources, 
                  and ongoing support to help you start and grow a house church.
                </p>
                <span className="inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-3 transition-all">
                  Start Leading <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Option 3: Already a Leader */}
            <Link href="#partner" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 h-full border-2 border-transparent hover:border-amber-500 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm Already a Leader</h3>
                <p className="text-gray-600 mb-6">
                  Leading a ministry but need partners? Join our network for apostolic covering, 
                  resources, and connection with like-minded leaders worldwide.
                </p>
                <span className="inline-flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-3 transition-all">
                  Partner With Us <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* One Body Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Our Vision
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                One Body, Many Members
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                "For just as the body is one and has many members, and all the members of the body, 
                though many, are one body, so it is with Christ." — 1 Corinthians 12:12
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We believe in the power of partnership. Overcomers Global Network connects 
                ministries, house churches, and leaders across nations to strengthen the 
                global Church and advance Kingdom culture together.
              </p>
              <ul className="space-y-3">
                {[
                  'Apostolic covering and spiritual support',
                  'Access to training and resources',
                  'Connection with global leaders',
                  'Collaborative Kingdom advancement',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
                alt="Global community"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm opacity-90">Partner Ministries Worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section - For Existing Leaders */}
      <section id="partner" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop"
                alt="Ministry partnership"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="text-white">
              <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
                For Ministry Leaders
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                Already Leading? Let's Partner.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                If you're already leading a ministry, church, or organization, we invite you to 
                join our network of partners. Together, we can accomplish more for the Kingdom 
                than we ever could alone.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Apostolic covering and accountability',
                  'Shared resources and curriculum',
                  'Leadership development opportunities',
                  'Global networking and collaboration',
                  'Joint events and conferences',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Apply for Partnership
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Our Reach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              A Growing Global Family
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '200+', label: 'House Churches' },
              { number: '50+', label: 'Partner Ministries' },
              { number: '30+', label: 'Countries' },
              { number: '5,000+', label: 'Network Members' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Family?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            No matter where you are in your journey, there's a place for you in Overcomers Global Network. 
            Let's advance the Kingdom together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all"
            >
              Get Connected
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/discipleship"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all"
            >
              Learn About House Churches
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
