import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0c11]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 to-orange-900/50" />
        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <p className="text-cyan-400 tracking-[0.3em] text-sm uppercase mb-4 animate-fadeIn">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fadeInUp">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a1d29] to-[#0a0c11]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-slideInLeft">
                <h2 className="text-3xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Send Us a Message
                  </span>
                </h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 resize-none transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-4 rounded-md font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <span>✈️</span>
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8 animate-slideInRight">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                      Get In Touch
                    </span>
                  </h2>
                  <p className="text-gray-400">
                    We'd love to hear from you! Reach out to us using any of the methods below.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-orange-500 transition-all">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">📍</span>
                      <div>
                        <h3 className="text-white font-bold mb-2">Main Campus</h3>
                        <p className="text-gray-400">7519 Mentor Ave, Suite A106</p>
                        <p className="text-gray-400">Painesville, OH 44077</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-cyan-500 transition-all">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">📧</span>
                      <div>
                        <h3 className="text-white font-bold mb-2">Email</h3>
                        <a href="mailto:ognmedia2024@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                          ognmedia2024@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-orange-500 transition-all">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🌐</span>
                      <div>
                        <h3 className="text-white font-bold mb-2">Website</h3>
                        <a href="https://www.overcomersglobalnetwork.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                          www.overcomersglobalnetwork.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/20 to-cyan-900/20 p-6 rounded-lg border border-white/10">
                    <h3 className="text-white font-bold mb-4">Service Times</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>Sunday: 11:00 AM</p>
                      <p>Wednesday: 6:00 PM</p>
                      <p>Friday: 6:00 PM</p>
                    </div>
                  </div>
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
