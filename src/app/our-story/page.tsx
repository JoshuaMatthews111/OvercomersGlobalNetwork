import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-cyan-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <p className="text-orange-400 tracking-[0.3em] text-sm uppercase mb-4 animate-fadeIn">
            About Us
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeInUp">
            Our Story
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Christ at the Center
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We believe Jesus Christ is the center of all we are and all we do. He is the
                Son of God, the Savior of the world, and the One who calls every believer
                to follow Him, grow in Him, and make Him known.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                His commission is clear—"Go therefore and make disciples of all nations..."
                (Matthew 28:19). This call is not for a select few, but for every believer
                who has been redeemed by His blood and transformed by His Spirit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp delay-200">
              <div className="bg-white/5 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
                <h3 className="text-5xl font-bold text-orange-400 mb-2">2000+</h3>
                <p className="text-gray-400">Lives Transformed</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all">
                <h3 className="text-5xl font-bold text-cyan-400 mb-2">4</h3>
                <p className="text-gray-400">Locations</p>
              </div>
              <div className="bg-white/5 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
                <h3 className="text-5xl font-bold text-orange-400 mb-2">5+</h3>
                <p className="text-gray-400">Nations Reached</p>
              </div>
            </div>

            <div className="animate-fadeInUp delay-300">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Overcomers Global Network is a place where people can meet Jesus, engage
                in life-giving community, and everyone is welcome. We believe in creating
                a space where people can have authentic encounters with Christ, discover
                their gifts and use them for God's glory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
