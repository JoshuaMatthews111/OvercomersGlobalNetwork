'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Plus, Calendar, Clock, FileText, Image as ImageIcon, 
  Trash2, Edit, Eye, CheckCircle, AlertCircle, Play, Pause,
  LayoutDashboard, ChevronLeft, ChevronRight, Bell, Send
} from 'lucide-react';

interface ScheduledPost {
  id: number;
  type: 'blog' | 'flyer';
  title: string;
  content: string;
  image: string;
  excerpt?: string;
  category?: string;
  author?: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'published' | 'draft';
  createdAt: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  published: boolean;
  fontTheme?: string;
}

interface Flyer {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
  active: boolean;
}

const categories = ['Teaching', 'Ministry', 'Finance', 'Testimony', 'Events', 'Sermon', 'Message', 'Worship', 'Prophecy'];

export default function SchedulerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [postType, setPostType] = useState<'blog' | 'flyer'>('blog');
  const [newPost, setNewPost] = useState<Partial<ScheduledPost>>({
    type: 'blog',
    title: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200',
    excerpt: '',
    category: 'Message',
    author: 'Prophet Joshua Matthews',
    scheduledDate: '',
    scheduledTime: '09:00',
    status: 'scheduled',
  });

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') setIsAuthenticated(true);
    else window.location.href = '/admin';

    // Load scheduled posts
    const saved = localStorage.getItem('ogn-scheduled-posts');
    if (saved) {
      setScheduledPosts(JSON.parse(saved));
    }

    // Check and publish scheduled posts
    checkAndPublishPosts();
    
    // Set up interval to check every minute
    const interval = setInterval(checkAndPublishPosts, 60000);
    return () => clearInterval(interval);
  }, []);

  const saveScheduledPosts = (posts: ScheduledPost[]) => {
    localStorage.setItem('ogn-scheduled-posts', JSON.stringify(posts));
    setScheduledPosts(posts);
  };

  const checkAndPublishPosts = () => {
    const saved = localStorage.getItem('ogn-scheduled-posts');
    if (!saved) return;

    const posts: ScheduledPost[] = JSON.parse(saved);
    const now = new Date();
    let hasChanges = false;

    const updatedPosts = posts.map(post => {
      if (post.status === 'scheduled') {
        const scheduledDateTime = new Date(`${post.scheduledDate}T${post.scheduledTime}`);
        if (now >= scheduledDateTime) {
          // Publish the post
          if (post.type === 'blog') {
            publishBlogPost(post);
          } else {
            publishFlyer(post);
          }
          hasChanges = true;
          return { ...post, status: 'published' as const };
        }
      }
      return post;
    });

    if (hasChanges) {
      localStorage.setItem('ogn-scheduled-posts', JSON.stringify(updatedPosts));
      setScheduledPosts(updatedPosts);
    }
  };

  const publishBlogPost = (scheduledPost: ScheduledPost) => {
    const savedBlogs = localStorage.getItem('ogn-blog-posts');
    const blogs: BlogPost[] = savedBlogs ? JSON.parse(savedBlogs) : [];
    
    const newBlog: BlogPost = {
      id: Date.now(),
      title: scheduledPost.title,
      excerpt: scheduledPost.excerpt || scheduledPost.content.substring(0, 150) + '...',
      content: scheduledPost.content,
      image: scheduledPost.image,
      author: scheduledPost.author || 'Prophet Joshua Matthews',
      date: scheduledPost.scheduledDate,
      category: scheduledPost.category || 'Message',
      published: true,
      fontTheme: 'hillsong',
    };

    blogs.unshift(newBlog);
    localStorage.setItem('ogn-blog-posts', JSON.stringify(blogs));
  };

  const publishFlyer = (scheduledPost: ScheduledPost) => {
    const savedFlyers = localStorage.getItem('ogn-flyers');
    const flyers: Flyer[] = savedFlyers ? JSON.parse(savedFlyers) : [];
    
    const newFlyer: Flyer = {
      id: Date.now(),
      title: scheduledPost.title,
      image: scheduledPost.image,
      date: scheduledPost.scheduledDate,
      description: scheduledPost.content,
      active: true,
    };

    flyers.unshift(newFlyer);
    localStorage.setItem('ogn-flyers', JSON.stringify(flyers));
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.scheduledDate || !newPost.scheduledTime) {
      alert('Please fill in title, date, and time');
      return;
    }

    const post: ScheduledPost = {
      id: Date.now(),
      type: postType,
      title: newPost.title || '',
      content: newPost.content || '',
      image: newPost.image || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200',
      excerpt: newPost.excerpt,
      category: newPost.category,
      author: newPost.author,
      scheduledDate: newPost.scheduledDate || '',
      scheduledTime: newPost.scheduledTime || '09:00',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    saveScheduledPosts([...scheduledPosts, post]);
    setIsCreating(false);
    setNewPost({
      type: 'blog',
      title: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200',
      excerpt: '',
      category: 'Message',
      author: 'Prophet Joshua Matthews',
      scheduledDate: '',
      scheduledTime: '09:00',
      status: 'scheduled',
    });
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Delete this scheduled post?')) {
      saveScheduledPosts(scheduledPosts.filter(p => p.id !== id));
    }
  };

  const handlePublishNow = (post: ScheduledPost) => {
    if (post.type === 'blog') {
      publishBlogPost(post);
    } else {
      publishFlyer(post);
    }
    saveScheduledPosts(scheduledPosts.map(p => 
      p.id === post.id ? { ...p, status: 'published' as const } : p
    ));
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getPostsForDate = (dateStr: string) => {
    return scheduledPosts.filter(p => p.scheduledDate === dateStr);
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDay }, (_, i) => i);

  const scheduledCount = scheduledPosts.filter(p => p.status === 'scheduled').length;
  const publishedCount = scheduledPosts.filter(p => p.status === 'published').length;

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Post Scheduler</h1>
                  <p className="text-xs text-gray-500">Schedule blogs & flyers</p>
                </div>
              </Link>
            </div>
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/30"
            >
              <Plus className="w-5 h-5" /> Schedule Post
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100">
            <FileText className="w-4 h-4" /> Blog
          </Link>
          <Link href="/admin/events-flyers" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100">
            <ImageIcon className="w-4 h-4" /> Flyers
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{scheduledCount}</span>
            </div>
            <p className="text-sm font-medium opacity-90">Scheduled Posts</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{publishedCount}</span>
            </div>
            <p className="text-sm font-medium opacity-90">Published</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{scheduledPosts.length}</span>
            </div>
            <p className="text-sm font-medium opacity-90">Total Posts</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{formatMonth(currentMonth)}</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {blanks.map(i => (
                <div key={`blank-${i}`} className="aspect-square" />
              ))}
              {days.map(day => {
                const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const postsOnDay = getPostsForDate(dateStr);
                const isToday = new Date().toDateString() === new Date(dateStr).toDateString();
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(dateStr);
                      setNewPost({ ...newPost, scheduledDate: dateStr });
                    }}
                    className={`aspect-square p-1 rounded-lg text-sm relative transition-all ${
                      isSelected ? 'bg-amber-500 text-white' :
                      isToday ? 'bg-amber-100 text-amber-700' :
                      'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">{day}</span>
                    {postsOnDay.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {postsOnDay.slice(0, 3).map((post, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full ${
                              post.status === 'published' ? 'bg-green-500' : 
                              post.type === 'blog' ? 'bg-blue-500' : 'bg-purple-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-600">Blog</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-gray-600">Flyer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600">Published</span>
              </div>
            </div>
          </div>

          {/* Upcoming Posts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Posts</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {scheduledPosts
                .filter(p => p.status === 'scheduled')
                .sort((a, b) => new Date(a.scheduledDate + 'T' + a.scheduledTime).getTime() - new Date(b.scheduledDate + 'T' + b.scheduledTime).getTime())
                .map(post => (
                  <div key={post.id} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        post.type === 'blog' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {post.type === 'blog' ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.scheduledDate).toLocaleDateString()} at {post.scheduledTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handlePublishNow(post)}
                        className="flex-1 text-xs py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        Publish Now
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              {scheduledPosts.filter(p => p.status === 'scheduled').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No scheduled posts</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Scheduled Posts Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Scheduled Posts</h2>
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No posts scheduled yet</p>
              <p className="text-sm">Click "Schedule Post" to create your first scheduled post</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Scheduled For</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledPosts.map(post => (
                    <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          post.type === 'blog' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {post.type === 'blog' ? <FileText className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                          {post.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{post.title}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(post.scheduledDate).toLocaleDateString()} at {post.scheduledTime}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' ? 'bg-green-100 text-green-700' :
                          post.status === 'scheduled' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {post.status === 'published' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {post.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {post.status === 'scheduled' && (
                            <button 
                              onClick={() => handlePublishNow(post)}
                              className="text-green-600 hover:text-green-700"
                              title="Publish Now"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Schedule New Post</h2>
                <button onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Post Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPostType('blog')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                      postType === 'blog' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    Blog Post
                  </button>
                  <button
                    onClick={() => setPostType('flyer')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                      postType === 'flyer' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ImageIcon className="w-5 h-5" />
                    Event Flyer
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
                {newPost.image && (
                  <div className="mt-2 relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <Image src={newPost.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              {/* Blog-specific fields */}
              {postType === 'blog' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                      placeholder="Short description..."
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        value={newPost.author}
                        onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {postType === 'blog' ? 'Content' : 'Description'}
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder={postType === 'blog' ? 'Full blog content...' : 'Event description...'}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              {/* Schedule Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                  <input
                    type="date"
                    value={newPost.scheduledDate}
                    onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                  <input
                    type="time"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Schedule Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Schedule</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Tomorrow 9 AM', days: 1, time: '09:00' },
                    { label: 'This Sunday 8 AM', days: (7 - new Date().getDay()) % 7 || 7, time: '08:00' },
                    { label: 'Next Week', days: 7, time: '09:00' },
                    { label: 'In 2 Weeks', days: 14, time: '09:00' },
                    { label: 'Next Month', days: 30, time: '09:00' },
                  ].map(option => {
                    const date = new Date();
                    date.setDate(date.getDate() + option.days);
                    const dateStr = date.toISOString().split('T')[0];
                    return (
                      <button
                        key={option.label}
                        onClick={() => setNewPost({ ...newPost, scheduledDate: dateStr, scheduledTime: option.time })}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-amber-500/30"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
