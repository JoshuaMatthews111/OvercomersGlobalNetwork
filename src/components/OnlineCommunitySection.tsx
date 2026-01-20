'use client';

export function OnlineCommunitySection() {
  const socialLinks = [
    { icon: '▶', name: 'YouTube', url: '#' },
    { icon: '🎙', name: 'Podcast', url: '#' },
    { icon: '📱', name: 'TikTok', url: '#' },
    { icon: '📷', name: 'Instagram', url: '#' },
    { icon: '👍', name: 'Facebook', url: '#' },
    { icon: '✖', name: 'X', url: '#' },
  ];

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Icon */}
          <div className="flex justify-center scroll-reveal">
            <span className="text-6xl">💬</span>
          </div>

          {/* Title */}
          <div className="space-y-4 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gray-900">Join Our Online </span>
              <span className="gradient-text-cyan">
                Community
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Connect with us on social media and access our growing library of spiritual content
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 scroll-reveal">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="w-16 h-16 bg-white border-2 border-gray-200 hover:border-cyan-500 shadow-md hover:shadow-lg rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label={link.name}
              >
                <span className="text-2xl">{link.icon}</span>
              </a>
            ))}
          </div>

          {/* Video Background */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-200 scroll-reveal">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Our Growing Content Library</h3>
                <div className="grid grid-cols-3 gap-8 mt-8">
                  <div>
                    <p className="text-3xl font-bold text-orange-500">2,000+</p>
                    <p className="text-gray-600 text-sm">Sermons</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-cyan-600">1,500+</p>
                    <p className="text-gray-600 text-sm">Messages</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-500">500+</p>
                    <p className="text-gray-600 text-sm">Podcasts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-md text-lg font-medium transition-all hover:scale-105 shadow-lg"
            >
              <span>🎵</span>
              Explore Our Content
            </a>
            <p className="text-gray-600 text-sm">New content added weekly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
