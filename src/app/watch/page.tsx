import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Play, Clock, Calendar, Filter, Search } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Sunday Message', 'Discipleship', 'Kingdom', 'Prayer', 'Leadership', 'Family'];

const videos = [
  {
    id: 1,
    title: 'ADVANCING KINGDOM CULTURE',
    description: 'Revealing the power of the new creation',
    thumbnail: 'https://img.youtube.com/vi/default.jpg',
    youtubeId: '',
    facebookUrl: 'https://www.facebook.com/joshua.grace.matthews/videos/2690854674606913/',
    facebookVideoId: '2690854674606913',
    duration: '45:00',
    date: 'Jan 26, 2026',
    category: 'Sunday Message',
    featured: true,
  },
  {
    id: 2,
    title: 'The Power of Kingdom Discipleship',
    description: 'Understanding the call to make disciples who make disciples.',
    thumbnail: 'https://img.youtube.com/vi/Ic2upPmt5lQ/maxresdefault.jpg',
    youtubeId: 'Ic2upPmt5lQ',
    duration: '45:00',
    date: 'Jan 15, 2025',
    category: 'Discipleship',
    featured: false,
  },
  {
    id: 3,
    title: 'The Revelation of the Son of God',
    description: 'Understanding the divine nature and revelation of Jesus Christ as the Son of God.',
    thumbnail: 'https://img.youtube.com/vi/MJhFu-xDZm8/maxresdefault.jpg',
    youtubeId: 'MJhFu-xDZm8',
    duration: '38:00',
    date: 'Jan 8, 2025',
    category: 'Leadership',
    featured: false,
  },
];

export default function WatchPage() {
  const featuredVideo = videos.find(v => v.featured);
  const regularVideos = videos.filter(v => !v.featured);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase">
              Media Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Watch & Be Transformed
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Access powerful teachings, sermons, and training from our global network of leaders.
            </p>
          </div>

          {/* Featured Video */}
          {featuredVideo && (
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                {featuredVideo.facebookVideoId ? (
                  // Facebook Video Embed
                  <iframe 
                    src={`https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fjoshua.grace.matthews%2Fvideos%2F${featuredVideo.facebookVideoId}%2F&show_text=false&width=476&t=0`} 
                    width="476" 
                    height="476" 
                    style={{border: 'none', overflow: 'hidden', width: '100%', height: '100%'}}
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                ) : (
                  // YouTube Video Thumbnail
                  <>
                    <Image
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <a
                        href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-20 h-20 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </a>
                    </div>
                  </>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="inline-block bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                    Featured • {featuredVideo.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-gray-300">{featuredVideo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredVideo.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredVideo.date}
                    </span>
                  </div>
                  {featuredVideo.facebookUrl && (
                    <a
                      href={featuredVideo.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch on Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === 'All'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full md:w-80 pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularVideos.map((video) => (
              <a
                key={video.id}
                href={video.facebookUrl || `https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  {video.facebookVideoId ? (
                    // Facebook Video Thumbnail
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-amber-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <p className="text-white text-sm">Facebook Video</p>
                      </div>
                    </div>
                  ) : (
                    // YouTube Video Thumbnail
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      {video.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {video.date}
                  </span>
                  {video.facebookUrl && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Facebook
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all">
              Load More Messages
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Never Miss a Message
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to our YouTube channel and get notified when new teachings are released.
          </p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
