'use client';

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Gradient Background with more white */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-100 to-white" />

      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[url('https://ext.same-assets.com/3877151051/2159630338.jpeg')] bg-cover bg-center" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Heart Icon */}
          <div className="flex justify-center scroll-reveal">
            <div className="text-7xl animate-pulse">❤️</div>
          </div>

          {/* Title with Gradient */}
          <h2 className="text-4xl md:text-6xl font-bold scroll-reveal">
            <span className="text-gray-900">This is Church </span>
            <span className="gradient-text">
              This is Home
            </span>
          </h2>

          {/* Content with better styling */}
          <div className="space-y-6 text-gray-700 text-lg max-w-3xl mx-auto scroll-reveal">
            <p className="leading-relaxed">
              We are a community of believers dedicated to serving God and spreading His
              love. Our church is a place where everyone is welcome, regardless of where you
              are in your spiritual journey.
            </p>

            <p className="leading-relaxed">
              We believe in the power of faith, community, and service. Join us as we worship
              together, grow in our faith, and make a positive impact in our community and
              beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
