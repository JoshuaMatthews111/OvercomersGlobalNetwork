'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ImageIcon, Palette, Type, Search } from 'lucide-react';

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

const categories = ['Teaching', 'Ministry', 'Finance', 'Testimony', 'Events', 'Sermon'];

// Font themes for sermon/blog previews
const fontThemes = [
  {
    id: 'classic',
    name: 'Classic Serif',
    titleFont: 'font-serif',
    bodyFont: 'font-serif',
    titleSize: 'text-4xl',
    bodySize: 'text-lg',
    preview: 'Elegant and traditional'
  },
  {
    id: 'modern',
    name: 'Modern Sans',
    titleFont: 'font-sans',
    bodyFont: 'font-sans',
    titleSize: 'text-5xl',
    bodySize: 'text-base',
    preview: 'Clean and contemporary'
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    titleFont: 'font-black',
    bodyFont: 'font-medium',
    titleSize: 'text-6xl',
    bodySize: 'text-lg',
    preview: 'Strong and powerful'
  },
  {
    id: 'elegant',
    name: 'Elegant Light',
    titleFont: 'font-light',
    bodyFont: 'font-light',
    titleSize: 'text-5xl',
    bodySize: 'text-lg',
    preview: 'Refined and sophisticated'
  },
  {
    id: 'newspaper',
    name: 'Newspaper Style',
    titleFont: 'font-serif font-bold',
    bodyFont: 'font-serif',
    titleSize: 'text-3xl',
    bodySize: 'text-base',
    preview: 'Editorial and journalistic'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    titleFont: 'font-thin',
    bodyFont: 'font-normal',
    titleSize: 'text-4xl',
    bodySize: 'text-sm',
    preview: 'Simple and focused'
  },
];

// Stock image search queries for unlimited ideas
const stockImageQueries = [
  { query: 'prayer hands light', concept: 'Spiritual devotion and prayer' },
  { query: 'sunrise mountain worship', concept: 'New beginnings and hope' },
  { query: 'bible open light rays', concept: 'Scripture and revelation' },
  { query: 'church congregation worship', concept: 'Community and fellowship' },
  { query: 'cross sunset silhouette', concept: 'Sacrifice and redemption' },
  { query: 'dove sky peace', concept: 'Holy Spirit and peace' },
  { query: 'hands reaching sky', concept: 'Faith and surrender' },
  { query: 'candle flame darkness', concept: 'Light in darkness' },
  { query: 'water baptism river', concept: 'Baptism and cleansing' },
  { query: 'bread wine communion', concept: 'Lords Supper' },
  { query: 'family prayer together', concept: 'Family devotion' },
  { query: 'path forest light', concept: 'Gods guidance' },
  { query: 'storm clouds breakthrough', concept: 'Overcoming trials' },
  { query: 'seeds growing soil', concept: 'Spiritual growth' },
  { query: 'crown gold royal', concept: 'Kingdom authority' },
  { query: 'fire flames pentecost', concept: 'Holy Spirit fire' },
  { query: 'shepherd sheep field', concept: 'Gods care and protection' },
  { query: 'ancient scroll scripture', concept: 'Biblical wisdom' },
  { query: 'globe world missions', concept: 'Global outreach' },
  { query: 'heart love compassion', concept: 'Gods love' },
];

const stockImages = [
  'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
  'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
];

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showImageIdeas, setShowImageIdeas] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(fontThemes[0]);
  const [imageSearch, setImageSearch] = useState('');
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    image: stockImages[0],
    author: 'Prophet Joshua Matthews',
    date: new Date().toISOString().split('T')[0],
    category: 'Teaching',
    published: false,
    fontTheme: 'classic',
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

  const handleNewPost = () => {
    setCurrentPost({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      image: stockImages[Math.floor(Math.random() * stockImages.length)],
      author: 'Prophet Joshua Matthews',
      date: new Date().toISOString().split('T')[0],
      category: 'Teaching',
      published: false,
      fontTheme: 'classic',
    });
    setSelectedTheme(fontThemes[0]);
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    const theme = fontThemes.find(t => t.id === post.fontTheme) || fontThemes[0];
    setSelectedTheme(theme);
    setIsEditing(true);
  };

  const handleSavePost = () => {
    if (!currentPost.title || !currentPost.excerpt) {
      alert('Please fill in title and excerpt');
      return;
    }

    const postToSave = { ...currentPost, fontTheme: selectedTheme.id };
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

  const filteredImages = imageSearch
    ? stockImages.filter((_, i) => i < 12)
    : stockImages;

  if (!isAuthenticated) {
    return null;
  }

  if (isEditing) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Posts
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Palette className="w-4 h-4" />
                  Theme
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4" />
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={handleSavePost}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  <Save className="w-4 h-4" />
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector Panel */}
        {showThemeSelector && (
          <div className="bg-white border-b border-gray-200 py-4">
            <div className="container mx-auto px-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Typography Theme</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {fontThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTheme.id === theme.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`${theme.titleFont} text-lg text-gray-900 mb-1`}>{theme.name}</p>
                    <p className={`${theme.bodyFont} text-xs text-gray-500`}>{theme.preview}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {showPreview ? (
            /* Preview Mode with Multiple Theme Previews */
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preview with Different Themes</h2>
              
              {/* Current Theme Preview - Large */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-amber-500 text-white px-4 py-2 text-sm font-medium">
                  Current Theme: {selectedTheme.name}
                </div>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={currentPost.image}
                    alt={currentPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {currentPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-500 text-sm mb-2">
                    {currentPost.date} • {currentPost.author}
                  </p>
                  <h1 className={`${selectedTheme.titleFont} ${selectedTheme.titleSize} text-gray-900 mb-4`}>
                    {currentPost.title || 'Untitled Post'}
                  </h1>
                  <p className={`${selectedTheme.bodyFont} ${selectedTheme.bodySize} text-gray-600 mb-6`}>
                    {currentPost.excerpt}
                  </p>
                  <div className={`${selectedTheme.bodyFont} ${selectedTheme.bodySize} prose max-w-none text-gray-700`}>
                    {currentPost.content || 'No content yet...'}
                  </div>
                </div>
              </div>

              {/* Other Theme Previews - Grid */}
              <h3 className="text-lg font-semibold text-gray-700">Other Theme Options</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fontThemes.filter(t => t.id !== selectedTheme.id).map((theme) => (
                  <div
                    key={theme.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedTheme(theme)}
                  >
                    <div className="bg-gray-100 text-gray-700 px-3 py-1.5 text-xs font-medium flex justify-between items-center">
                      <span>{theme.name}</span>
                      <button className="text-amber-600 hover:text-amber-700 text-xs font-semibold">
                        Use This
                      </button>
                    </div>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={currentPost.image}
                        alt={currentPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className={`${theme.titleFont} text-xl text-gray-900 mb-2 line-clamp-2`}>
                        {currentPost.title || 'Untitled Post'}
                      </h2>
                      <p className={`${theme.bodyFont} text-sm text-gray-600 line-clamp-2`}>
                        {currentPost.excerpt || 'No excerpt...'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                {/* Image Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={currentPost.image}
                      alt="Featured"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowImagePicker(!showImagePicker); setShowImageIdeas(false); }}
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Browse Stock Images
                    </button>
                    <button
                      onClick={() => { setShowImageIdeas(!showImageIdeas); setShowImagePicker(false); }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Search className="w-4 h-4" />
                      Image Ideas & Queries
                    </button>
                  </div>

                  {/* Stock Image Picker */}
                  {showImagePicker && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Search images..."
                          value={imageSearch}
                          onChange={(e) => setImageSearch(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                        {filteredImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentPost({ ...currentPost, image: img });
                              setShowImagePicker(false);
                            }}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                              currentPost.image === img
                                ? 'border-amber-500'
                                : 'border-transparent hover:border-gray-300'
                            }`}
                          >
                            <Image src={img} alt="" fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image Ideas */}
                  {showImageIdeas && (
                    <div className="mt-3 p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">Stock Image Search Ideas</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Use these queries on Unsplash, Pexels, or Pixabay to find the perfect image:
                      </p>
                      <div className="grid md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {stockImageQueries.map((item, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg">
                            <p className="font-mono text-sm text-blue-700 mb-1">&quot;{item.query}&quot;</p>
                            <p className="text-xs text-gray-500">{item.concept}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        Tip: Combine queries with your sermon topic for more specific results
                      </p>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={currentPost.title}
                    onChange={(e) =>
                      setCurrentPost({ ...currentPost, title: e.target.value })
                    }
                    placeholder="Enter post title..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-lg"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt (Short description)
                  </label>
                  <textarea
                    value={currentPost.excerpt}
                    onChange={(e) =>
                      setCurrentPost({ ...currentPost, excerpt: e.target.value })
                    }
                    placeholder="Brief description of the post..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={currentPost.content}
                    onChange={(e) =>
                      setCurrentPost({ ...currentPost, content: e.target.value })
                    }
                    placeholder="Write your sermon/blog post content here...

Use **bold** for emphasis
Use headings like:
**Main Point 1**
**Main Point 2**

Include scripture references and application points."
                    rows={16}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none font-mono text-sm"
                  />
                </div>

                {/* Meta */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={currentPost.category}
                      onChange={(e) =>
                        setCurrentPost({ ...currentPost, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={currentPost.author}
                      onChange={(e) =>
                        setCurrentPost({ ...currentPost, author: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={currentPost.date}
                      onChange={(e) =>
                        setCurrentPost({ ...currentPost, date: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <button
                    onClick={() =>
                      setCurrentPost({ ...currentPost, published: !currentPost.published })
                    }
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
                    {currentPost.published ? 'Published - Visible on Blog Page' : 'Draft - Not visible'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
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
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Blog & Sermon Posts</h1>
              <p className="text-gray-600">Create sermons with multiple font themes and publish in real-time</p>
            </div>
            <button
              onClick={handleNewPost}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="container mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Type className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No blog posts yet</p>
            <button
              onClick={handleNewPost}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Create your first sermon or blog post
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.fontTheme && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {fontThemes.find(t => t.id === post.fontTheme)?.name || 'Classic'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm truncate">{post.excerpt}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {post.category} • {post.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View on site"
                    target="_blank"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(post.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      post.published
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {post.published ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEditPost(post)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
