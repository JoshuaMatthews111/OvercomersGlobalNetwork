'use client';

export function BeliefsSection() {
  const beliefs = [
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      title: 'Biblical Truth',
      description: 'We believe in the Word of God as the true foundation that gives every person direction and purpose in life. Our mission is to bring people into a genuine relationship with Jesus Christ, helping them begin their walk with God and learn His ways step by step. Our ministry is fully committed to making disciples who grow in faith and maturity.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Life-Giving',
      description: 'Sharing the love of God through charity and rehabilitation efforts, Overcomers help struggling men become effective citizens in this world and faithful servants in the Kingdom of God. We provide in-person and online financial and emotional wellness classes, equipping believers to be strengthened not only by the Word, but also in spirit, soul, body, and finances.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Global Impact',
      description: 'We make a global impact here at Overcomers by training believers around the world and providing both personal and online support. No matter your location, you can be part of this family of faith, with online classes, courses, and community designed to help you excel in your journey with God.',
    },
  ];

  return (
    <section id="beliefs" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Section Badge */}
          <div className="scroll-reveal">
            <span className="inline-block px-4 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-sm font-medium uppercase tracking-wider">
              <span className="gold-shimmer">Senior Pastor</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider scroll-reveal">
            <span className="shimmer-text">We Believe</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto scroll-reveal">
            At Overcomers Global Network, our doors are wide open to people from all backgrounds
          </p>

          {/* Belief Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {beliefs.map((belief, index) => (
              <div
                key={belief.title}
                className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-orange-500 transition-all group shadow-md hover:shadow-xl scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  {belief.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{belief.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {belief.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#about"
            className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-md font-medium transition-all shadow-md hover:shadow-lg scroll-reveal"
          >
            Read the rest of Prophet Joshua's message here... →
          </a>
        </div>
      </div>
    </section>
  );
}
