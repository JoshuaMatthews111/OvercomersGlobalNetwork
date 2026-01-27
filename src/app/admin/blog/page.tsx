'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ImageIcon, Palette, Type, Search, Youtube, Facebook, Play, Link as LinkIcon, ExternalLink, CheckCircle } from 'lucide-react';

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
  videoUrl?: string;
  videoType?: 'youtube' | 'facebook' | null;
  videoId?: string;
}

const categories = ['Teaching', 'Ministry', 'Finance', 'Testimony', 'Events', 'Sermon', 'Message', 'Worship'];

// Modern Hillsong-style font themes
const fontThemes = [
  {
    id: 'hillsong',
    name: 'Hillsong Modern',
    titleFont: 'font-sans font-black uppercase tracking-wider',
    bodyFont: 'font-sans font-light',
    titleSize: 'text-5xl md:text-7xl',
    bodySize: 'text-lg',
    style: 'dark',
    preview: 'Bold, modern worship style'
  },
  {
    id: 'elevation',
    name: 'Elevation Style',
    titleFont: 'font-sans font-extrabold',
    bodyFont: 'font-sans',
    titleSize: 'text-4xl md:text-6xl',
    bodySize: 'text-base',
    style: 'gradient',
    preview: 'Dynamic and energetic'
  },
  {
    id: 'bethel',
    name: 'Bethel Worship',
    titleFont: 'font-serif italic',
    bodyFont: 'font-serif',
    titleSize: 'text-5xl md:text-6xl',
    bodySize: 'text-lg',
    style: 'warm',
    preview: 'Intimate and artistic'
  },
  {
    id: 'passion',
    name: 'Passion Conference',
    titleFont: 'font-sans font-black',
    bodyFont: 'font-sans font-medium',
    titleSize: 'text-6xl md:text-8xl',
    bodySize: 'text-lg',
    style: 'bold',
    preview: 'Massive and impactful'
  },
  {
    id: 'classic',
    name: 'Classic Sermon',
    titleFont: 'font-serif',
    bodyFont: 'font-serif',
    titleSize: 'text-4xl',
    bodySize: 'text-lg',
    style: 'classic',
    preview: 'Traditional and elegant'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    titleFont: 'font-sans font-thin',
    bodyFont: 'font-sans font-light',
    titleSize: 'text-5xl',
    bodySize: 'text-base',
    style: 'minimal',
    preview: 'Simple and focused'
  },
];

// Auto-generated stock images based on keywords
const autoStockImages: Record<string, string[]> = {
  worship: [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200',
    'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1200',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200',
  ],
  prayer: [
    'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200',
    'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1200',
  ],
  faith: [
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
  ],
  hope: [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
  ],
  love: [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200',
    'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200',
  ],
  default: [
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200',
  ],
};

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(fontThemes[0]);
  const [videoInput, setVideoInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    image: autoStockImages.default[0],
    author: 'Prophet Joshua Matthews',
    date: new Date().toISOString().split('T')[0],
    category: 'Message',
    published: false,
    fontTheme: 'hillsong',
    videoUrl: '',
    videoType: null,
    videoId: '',
  });

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      window.location.href = '/admin';
    }

    const savedPosts = localStorage.getItem('ogn-blog-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem('ogn-blog-posts', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  // Extract video ID from YouTube or Facebook URL
  const parseVideoUrl = (url: string) => {
    // YouTube patterns
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return { type: 'youtube' as const, id: match[1] };
      }
    }

    // Facebook patterns
    const facebookPatterns = [
      /facebook\.com\/.*\/videos\/(\d+)/,
      /fb\.watch\/([^\/\n?#]+)/,
    ];
    
    for (const pattern of facebookPatterns) {
      const match = url.match(pattern);
      if (match) {
        return { type: 'facebook' as const, id: match[1] };
      }
    }

    return null;
  };

  // Auto-select image based on title keywords
  const autoSelectImage = (title: string) => {
    const lowerTitle = title.toLowerCase();
    const keywords = ['worship', 'prayer', 'faith', 'hope', 'love'];
    
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword)) {
        const images = autoStockImages[keyword];
        return images[Math.floor(Math.random() * images.length)];
      }
    }
    
    const defaultImages = autoStockImages.default;
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  const handleVideoImport = () => {
    if (!videoInput) return;

    const parsed = parseVideoUrl(videoInput);
    if (parsed) {
      // Auto-generate title from video if empty
      const autoImage = autoSelectImage(currentPost.title || 'message');
      
      setCurrentPost({
        ...currentPost,
        videoUrl: videoInput,
        videoType: parsed.type,
        videoId: parsed.id,
        image: currentPost.image === autoStockImages.default[0] ? autoImage : currentPost.image,
      });
      setVideoInput('');
    } else {
      alert('Could not parse video URL. Please use a YouTube or Facebook video link.');
    }
  };

  const handleNewPost = () => {
    const randomImage = autoStockImages.default[Math.floor(Math.random() * autoStockImages.default.length)];
    setCurrentPost({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      image: randomImage,
      author: 'Prophet Joshua Matthews',
      date: new Date().toISOString().split('T')[0],
      category: 'Message',
      published: false,
      fontTheme: 'hillsong',
      videoUrl: '',
      videoType: null,
      videoId: '',
    });
    setSelectedTheme(fontThemes[0]);
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    const theme = fontThemes.find(t => t.id === post.fontTheme) || fontThemes[0];
    setSelectedTheme(theme);
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleSavePost = () => {
    if (!currentPost.title) {
      alert('Please enter a title');
      return;
    }

    // Auto-generate excerpt if empty
    const postToSave = { ...currentPost, fontTheme: selectedTheme.id };
    if (!postToSave.excerpt && postToSave.content) {
      postToSave.excerpt = postToSave.content.substring(0, 150) + '...';
    }

    const existingIndex = posts.findIndex((p) => p.id === currentPost.id);
    let newPosts: BlogPost[];

    if (existingIndex >= 0) {
      newPosts = [...posts];
      newPosts[existingIndex] = postToSave;
    } else {
      newPosts = [...posts, postToSave];
    }

    savePosts(newPosts);
    setIsEditing(false);
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const newPosts = posts.filter((p) => p.id !== id);
      savePosts(newPosts);
    }
  };

  const handleTogglePublish = (id: number) => {
    const newPosts = posts.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    savePosts(newPosts);
  };

  const copyPostLink = (postId: number) => {
    const url = `${window.location.origin}/blog/${postId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Get theme-specific styles for preview
  const getThemeStyles = (theme: typeof fontThemes[0]) => {
    switch (theme.style) {
      case 'dark':
        return 'bg-black text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white';
      case 'warm':
        return 'bg-gradient-to-br from-amber-100 to-orange-50 text-gray-900';
      case 'bold':
        return 'bg-gray-900 text-white';
      case 'minimal':
        return 'bg-white text-gray-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  if (!isAuthenticated) return null;

  if (isEditing) {
    return (
      <main className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    showThemeSelector ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  Style
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    showPreview ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={handleSavePost}
                  className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        {showThemeSelector && (
          <div className="bg-gray-900 text-white py-6">
            <div className="container mx-auto px-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Select Design Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {fontThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedTheme.id === theme.id
                        ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <p className="font-bold text-sm mb-1">{theme.name}</p>
                    <p className="text-xs opacity-70">{theme.preview}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {showPreview ? (
            /* Hillsong-Style Preview */
            <div className="max-w-5xl mx-auto">
              <div className={`rounded-2xl overflow-hidden shadow-2xl ${getThemeStyles(selectedTheme)}`}>
                {/* Hero Image/Video */}
                <div className="relative aspect-video">
                  {currentPost.videoType === 'youtube' && currentPost.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${currentPost.videoId}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <Image
                        src={currentPost.image}
                        alt={currentPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {currentPost.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-10 h-10 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <span className="inline-block bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
                      {currentPost.category}
                    </span>
                    <h1 className={`${selectedTheme.titleFont} ${selectedTheme.titleSize} text-white leading-tight mb-4`}>
                      {currentPost.title || 'Message Title'}
                    </h1>
                    <p className="text-white/80 text-sm">
                      {currentPost.author} • {new Date(currentPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {currentPost.excerpt && (
                    <p className={`${selectedTheme.bodyFont} text-xl md:text-2xl leading-relaxed mb-8 opacity-90`}>
                      {currentPost.excerpt}
                    </p>
                  )}
                  {currentPost.content && (
                    <div className={`${selectedTheme.bodyFont} ${selectedTheme.bodySize} leading-relaxed whitespace-pre-wrap opacity-80`}>
                      {currentPost.content}
                    </div>
                  )}
                </div>
              </div>

              {/* Other Theme Previews */}
              <div className="mt-12">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Try Other Styles</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {fontThemes.filter(t => t.id !== selectedTheme.id).slice(0, 3).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme)}
                      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${getThemeStyles(theme)}`}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={currentPost.image}
                          alt=""
                          fill
                          className="object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <h4 className={`${theme.titleFont} text-xl text-center`}>
                            {currentPost.title || 'Preview'}
                          </h4>
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-sm font-medium">{theme.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Video Import Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  Import Video Message
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Paste a YouTube or Facebook video link to automatically import your message
                </p>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={videoInput}
                    onChange={(e) => setVideoInput(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or https://fb.watch/..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    onClick={handleVideoImport}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Import
                  </button>
                </div>
                
                {currentPost.videoUrl && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-green-800 font-medium">Video imported!</p>
                      <p className="text-green-600 text-sm truncate">{currentPost.videoUrl}</p>
                    </div>
                    <button
                      onClick={() => setCurrentPost({ ...currentPost, videoUrl: '', videoType: null, videoId: '' })}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={currentPost.image}
                      alt="Featured"
                      fill
                      className="object-cover"
                    />
                    {currentPost.videoType === 'youtube' && currentPost.videoId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowImagePicker(!showImagePicker)}
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Choose Image
                    </button>
                    {currentPost.videoType === 'youtube' && currentPost.videoId && (
                      <button
                        onClick={() => setCurrentPost({ ...currentPost, image: getYouTubeThumbnail(currentPost.videoId!) })}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        <Youtube className="w-4 h-4" />
                        Use YouTube Thumbnail
                      </button>
                    )}
                    <button
                      onClick={() => setCurrentPost({ ...currentPost, image: autoSelectImage(currentPost.title) })}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Search className="w-4 h-4" />
                      Auto-Select Based on Title
                    </button>
                  </div>

                  {showImagePicker && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                        {Object.values(autoStockImages).flat().map((img, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentPost({ ...currentPost, image: img });
                              setShowImagePicker(false);
                            }}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                              currentPost.image === img ? 'border-amber-500' : 'border-transparent hover:border-gray-300'
                            }`}
                          >
                            <Image src={img} alt="" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={currentPost.title}
                    onChange={(e) => {
                      setCurrentPost({ ...currentPost, title: e.target.value });
                    }}
                    placeholder="Enter message title..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-xl font-bold"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    placeholder="Brief description of the message..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Content (Optional)
                  </label>
                  <textarea
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    placeholder="Add sermon notes, scripture references, or full transcript..."
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Meta */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={currentPost.category}
                      onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                    <input
                      type="text"
                      value={currentPost.author}
                      onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={currentPost.date}
                      onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentPost({ ...currentPost, published: !currentPost.published })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        currentPost.published ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          currentPost.published ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {currentPost.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {currentPost.id && posts.find(p => p.id === currentPost.id) && (
                    <button
                      onClick={() => copyPostLink(currentPost.id)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600"
                    >
                      {copiedLink ? <CheckCircle className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                      {copiedLink ? 'Copied!' : 'Copy Link'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Messages & Blog</h1>
              <p className="text-gray-600">Import videos, create posts with modern designs</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Blog
              </Link>
              <button
                onClick={handleNewPost}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="container mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Youtube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500 mb-6">Import a YouTube or Facebook video to get started</p>
            <button
              onClick={handleNewPost}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              <Plus className="w-5 h-5" />
              Create First Message
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {post.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      post.published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {post.published ? 'LIVE' : 'DRAFT'}
                    </span>
                    {post.videoType && (
                      <span className="text-xs font-bold px-2 py-1 rounded bg-red-600 text-white flex items-center gap-1">
                        {post.videoType === 'youtube' ? <Youtube className="w-3 h-3" /> : <Facebook className="w-3 h-3" />}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-1 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                  <p className="text-gray-400 text-xs mt-2">{post.date}</p>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleTogglePublish(post.id)}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium ${
                        post.published ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {post.published ? 'Hide' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
