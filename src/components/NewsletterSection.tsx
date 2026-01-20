'use client';

export function NewsletterSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Newsletter Card */}
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-12 shadow-2xl scroll-reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-4xl">✉️</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Stay Connected
                  </h2>
                </div>
                <p className="text-cyan-50 text-lg leading-relaxed">
                  Subscribe to our newsletter for weekly updates on events, sermons, and inspiring messages from our community.
                </p>
                <div className="flex items-center gap-2 text-cyan-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Weekly sermons and messages</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Upcoming events and programs</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Community news and updates</span>
                </div>
              </div>

              {/* Right Form */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="newsletter-name" className="block text-white text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="newsletter-name"
                        placeholder="Enter your name"
                        className="w-full bg-white border-2 border-transparent focus:border-orange-400 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="newsletter-email" className="block text-white text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="newsletter-email"
                        placeholder="Enter your email"
                        className="w-full bg-white border-2 border-transparent focus:border-orange-400 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>Subscribe Now</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </form>
                  <p className="text-cyan-100 text-xs text-center mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Below */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">5,000+</p>
              <p className="text-gray-600 text-sm mt-2">Subscribers</p>
            </div>
            <div className="text-center scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">Weekly</p>
              <p className="text-gray-600 text-sm mt-2">Updates</p>
            </div>
            <div className="text-center scroll-reveal" style={{ animationDelay: '0.3s' }}>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">100%</p>
              <p className="text-gray-600 text-sm mt-2">Free Forever</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
