import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-cyan-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <p className="text-orange-400 tracking-[0.3em] text-sm uppercase mb-4 animate-fadeIn">
            Resources
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeInUp">
            Media Library
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fadeInUp">
              <div className="text-center p-8 bg-white/5 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
                <h3 className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                  2,000+
                </h3>
                <p className="text-gray-400 text-lg">Sermons</p>
              </div>
              <div className="text-center p-8 bg-white/5 rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all">
                <h3 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">
                  1,500+
                </h3>
                <p className="text-gray-400 text-lg">Messages</p>
              </div>
              <div className="text-center p-8 bg-white/5 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all">
                <h3 className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                  500+
                </h3>
                <p className="text-gray-400 text-lg">Podcasts</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="text-center space-y-8 animate-fadeInUp delay-200">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Connect With Us Online
              </h2>
              <p className="text-gray-400 text-lg">
                Access our growing library of spiritual content across all platforms
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                {['YouTube', 'Podcast', 'TikTok', 'Instagram', 'Facebook', 'X'].map((platform, index) => (
                  <a
                    key={platform}
                    href="#"
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500 rounded-lg transition-all hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-white font-medium">{platform}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center mt-16 animate-fadeInUp delay-300">
              <p className="text-gray-500 italic">New content added weekly</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
