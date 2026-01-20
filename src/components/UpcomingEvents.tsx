'use client';

export function UpcomingEvents() {
  const events = [
    {
      tag: 'special-service',
      title: 'Encounter With Oil',
      time: 'Evening: 6:00 PM',
      location: 'Achimota, Accra',
      date: 'Sun, 30 Nov',
      image: 'https://ext.same-assets.com/1353966518/1244740630.png',
    },
  ];

  return (
    <section className="py-20 bg-[#0a0c11] relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="text-cyan-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Upcoming </span>
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Events
              </span>
            </h2>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-6 py-3">
              <p className="text-cyan-400 text-sm">Next Event</p>
              <p className="text-white font-mono text-lg">12d 21h 35m</p>
            </div>
          </div>
        </div>

        <div className="w-20 h-1 bg-cyan-500 mb-12" />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-64">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-cyan-400 text-black px-3 py-1 rounded-full text-xs font-medium">
                  {event.tag}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h3>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
