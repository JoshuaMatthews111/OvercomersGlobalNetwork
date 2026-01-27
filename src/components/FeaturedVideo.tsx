'use client';

import { VideoPlayer } from '@/components/VideoPlayer';

export function FeaturedVideo() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
            Latest Message
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Watch & Be Transformed
          </h2>
          <p className="text-gray-600 text-lg">
            Powerful teachings to equip you for Kingdom advancement and spiritual growth.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Facebook Video Embed */}
            <div className="relative aspect-video bg-black">
              <iframe 
                src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fjoshua.grace.matthews%2Fvideos%2F2690854674606913%2F&show_text=true&width=560&t=0" 
                width="560" 
                height="429" 
                style={{border: 'none', overflow: 'hidden', width: '100%', height: '100%', maxWidth: '800px', margin: '0 auto'}}
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <span className="text-amber-400 text-sm font-medium">Sunday Service • January 25, 2026</span>
              <h3 className="text-white text-xl md:text-2xl font-bold mt-1">
                ADVANCING KINGDOM CULTURE
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Revealing the power of the new creation
              </p>
              <a 
                href="https://www.facebook.com/joshua.grace.matthews/videos/2690854674606913/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-white hover:text-amber-400 transition-colors pointer-events-auto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on Facebook
              </a>
            </div>
          </div>

          {/* Video Meta */}
          <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-bold text-lg">OGN</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Overcomers Global Network</p>
                <p className="text-gray-500 text-sm">Weekly Teaching Series</p>
              </div>
            </div>
            <a
              href="/watch"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              View All Messages
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
