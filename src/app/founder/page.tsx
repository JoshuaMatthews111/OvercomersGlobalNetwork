import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 to-orange-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <p className="text-cyan-400 tracking-[0.3em] text-sm uppercase mb-4 animate-fadeIn">
            Leadership
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeInUp">
            Our Founder
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative animate-slideInLeft">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 rounded-full border-8 border-cyan-500/30" />
                  <div className="absolute inset-4 rounded-full border-8 border-white" />
                  <div className="absolute inset-8 rounded-full border-8 border-[#1a1d29]" />
                  <div className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
                    <Image
                      src="https://ugc.same-assets.com/vWI9cceLkD25F7O0OrE1V0pgZZcPNeSu.png"
                      alt="Prophet Joshua Matthews"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 animate-slideInRight">
                <div>
                  <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                    Senior Pastor
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
                    Prophet Joshua Matthews
                  </h2>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Prophet Joshua Matthews is the founder and senior pastor of Overcomers Global Network.
                  With a heart for seeing lives transformed by the power of God, he has dedicated his
                  ministry to educating, equipping, and evolving believers for the advancement of God's Kingdom.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed">
                  His vision is to create a global network of believers who are empowered to make a
                  difference in their communities and beyond, through faith, service, and authentic
                  relationships with Christ.
                </p>

                <div className="pt-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-md font-medium transition-all"
                  >
                    Connect With Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
