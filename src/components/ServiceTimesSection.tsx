'use client';

export function ServiceTimesSection() {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Sunday Services',
      time: '8:00 AM • 10:30 AM • 5:00 PM',
      subtitle: 'Three Services Available',
      location: 'Wellspring, Achimota Ghana',
      badge: 'Most Popular',
      isPrimary: true,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Wednesday Midweek Service',
      time: '6:00 PM - 8:30 PM',
      subtitle: 'Prayer & Bible Study',
      location: 'Wellspring, Achimota Ghana',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Friday Service',
      time: '6:00 PM - 8:30 PM',
      subtitle: 'Supernatural Encounter Night',
      location: 'Wellspring, Achimota Ghana',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Clock Icon */}
          <div className="flex justify-center scroll-reveal">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gray-900">Join Us for </span>
              <span className="gradient-text">
                Worship
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Experience God's presence with us throughout the week
            </p>
          </div>

          {/* Service Cards - Adjusted Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8">
            {/* Left Card */}
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-cyan-500 transition-all shadow-md hover:shadow-xl scroll-reveal">
              <div className="space-y-6 text-left">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                  {services[1].icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900">{services[1].title}</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-cyan-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{services[1].time}</span>
                  </div>
                  <p className="text-gray-600">{services[1].subtitle}</p>
                  <div className="flex items-center gap-3 text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">{services[1].location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-cyan-500 transition-all shadow-md hover:shadow-xl scroll-reveal">
              <div className="space-y-6 text-left">
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                  {services[2].icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900">{services[2].title}</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-cyan-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{services[2].time}</span>
                  </div>
                  <p className="text-gray-600">{services[2].subtitle}</p>
                  <div className="flex items-center gap-3 text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">{services[2].location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Card (Sunday) */}
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-8 rounded-lg border-2 border-cyan-700 hover:border-cyan-800 transition-all relative lg:row-start-1 lg:col-start-3 shadow-xl scroll-reveal">
              {services[0].badge && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    {services[0].badge}
                  </span>
                </div>
              )}

              <div className="space-y-6 text-left">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-white">
                  {services[0].icon}
                </div>

                <h3 className="text-xl font-bold text-white">{services[0].title}</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-white font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{services[0].time}</span>
                  </div>
                  <p className="text-cyan-50">{services[0].subtitle}</p>
                  <div className="flex items-center gap-3 text-cyan-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">{services[0].location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 italic pt-8 scroll-reveal">
            We can't wait to worship with you
          </p>
        </div>
      </div>
    </section>
  );
}
