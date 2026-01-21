'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ImageIcon } from 'lucide-react';

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
}

const categories = ['Teaching', 'Ministry', 'Finance', 'Testimony', 'Events'];

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
];

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
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
    });
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleSavePost = () => {
    if (!currentPost.title || !currentPost.excerpt) {
      alert('Please fill in title and excerpt');
      return;
    }

    const existingIndex = posts.findIndex((p) => p.id === currentPost.id);
    let newPosts: BlogPost[];

    if (existingIndex >= 0) {
      newPosts = [...posts];
      newPosts[existingIndex] = currentPost;
    } else {
      newPosts = [...posts, currentPost];
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
                  Save Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {showPreview ? (
            /* Preview Mode */
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentPost.title || 'Untitled Post'}
                </h1>
                <p className="text-gray-600 text-lg mb-6">{currentPost.excerpt}</p>
                <div className="prose max-w-none">
                  {currentPost.content || 'No content yet...'}
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="max-w-3xl mx-auto">
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
                  <button
                    onClick={() => setShowImagePicker(!showImagePicker)}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Choose from stock images
                  </button>
                  {showImagePicker && (
                    <div className="grid grid-cols-4 gap-2 mt-3 p-3 bg-gray-50 rounded-xl">
                      {stockImages.map((img, index) => (
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
                    placeholder="Write your blog post content here..."
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
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
                    {currentPost.published ? 'Published' : 'Draft'}
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
              <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
              <p className="text-gray-600">Create and manage blog content</p>
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
            <p className="text-gray-500 mb-4">No blog posts yet</p>
            <button
              onClick={handleNewPost}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Create your first post
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
                  </div>
                  <p className="text-gray-500 text-sm truncate">{post.excerpt}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {post.category} • {post.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
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
