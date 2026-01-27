'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Save, X, ImageIcon, Palette, Youtube, Facebook, Play, Sparkles, FileText, Clock, Wand2, ExternalLink, LayoutDashboard, ShoppingBag, Calendar, Settings, LogOut, ChevronDown, Copy, CheckCircle, Share2, BarChart3, AlertCircle } from 'lucide-react';

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

const categories = ['Teaching', 'Ministry', 'Finance', 'Testimony', 'Events', 'Sermon', 'Message', 'Worship', 'Prophecy'];

const fontThemes = [
  { id: 'hillsong', name: 'Hillsong Modern', titleFont: 'font-sans font-black uppercase tracking-wider', bodyFont: 'font-sans font-light', style: 'dark' },
  { id: 'elevation', name: 'Elevation Style', titleFont: 'font-sans font-extrabold', bodyFont: 'font-sans', style: 'gradient' },
  { id: 'bethel', name: 'Bethel Worship', titleFont: 'font-serif italic', bodyFont: 'font-serif', style: 'warm' },
  { id: 'passion', name: 'Passion Conference', titleFont: 'font-sans font-black', bodyFont: 'font-sans font-medium', style: 'bold' },
  { id: 'classic', name: 'Classic Sermon', titleFont: 'font-serif', bodyFont: 'font-serif', style: 'classic' },
  { id: 'minimal', name: 'Minimal Clean', titleFont: 'font-sans font-thin', bodyFont: 'font-sans font-light', style: 'minimal' },
];

const stockImages: Record<string, string[]> = {
  worship: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200', 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1200'],
  prayer: ['https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200', 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200'],
  faith: ['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200'],
  hope: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200'],
  love: ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200', 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200'],
  default: ['https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200'],
};

const contentTemplates = {
  short: {
    sections: 3,
    wordsPerSection: 80,
    label: 'Short (3 sections)',
  },
  medium: {
    sections: 5,
    wordsPerSection: 120,
    label: 'Medium (5 sections)',
  },
  long: {
    sections: 7,
    wordsPerSection: 180,
    label: 'Long (7 sections)',
  },
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentLength, setContentLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [topicInput, setTopicInput] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showMigrationNotice, setShowMigrationNotice] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: 0, title: '', excerpt: '', content: '', image: stockImages.default[0],
    author: 'Prophet Joshua Matthews', date: new Date().toISOString().split('T')[0],
    category: 'Message', published: false, fontTheme: 'hillsong', videoUrl: '', videoType: null, videoId: '',
  });

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (auth === 'true') setIsAuthenticated(true);
    else window.location.href = '/admin';
    const savedPosts = localStorage.getItem('ogn-blog-posts');
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      setPosts(parsed);
      // Check if any posts have timestamp IDs (IDs > 1000)
      const hasTimestampIds = parsed.some((p: BlogPost) => p.id > 1000);
      if (hasTimestampIds) {
        setShowMigrationNotice(true);
      }
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem('ogn-blog-posts', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const parseVideoUrl = (url: string) => {
    const youtubePatterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /youtube\.com\/shorts\/([^&\n?#]+)/];
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) return { type: 'youtube' as const, id: match[1] };
    }
    const facebookPatterns = [/facebook\.com\/.*\/videos\/(\d+)/, /facebook\.com\/watch\/?\?v=(\d+)/, /facebook\.com\/reel\/(\d+)/, /fb\.watch\/([^\/\n?#]+)/];
    for (const pattern of facebookPatterns) {
      const match = url.match(pattern);
      if (match) return { type: 'facebook' as const, id: match[1] };
    }
    return null;
  };

  const autoSelectImage = (title: string) => {
    const lowerTitle = title.toLowerCase();
    for (const keyword of Object.keys(stockImages)) {
      if (lowerTitle.includes(keyword)) {
        const images = stockImages[keyword];
        return images[Math.floor(Math.random() * images.length)];
      }
    }
    return stockImages.default[Math.floor(Math.random() * stockImages.default.length)];
  };

  const generateBlogContent = async (topic: string, length: 'short' | 'medium' | 'long') => {
    setIsGenerating(true);
    const template = contentTemplates[length];
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sectionTitles = [
      'Introduction', 'Understanding the Foundation', 'The Biblical Perspective',
      'Practical Application', 'Overcoming Challenges', 'Walking in Victory',
      'The Power of Faith', 'Divine Purpose', 'Conclusion & Prayer'
    ].slice(0, template.sections);

    const sectionContent: Record<string, string> = {
      'Introduction': `Today we explore the powerful truth about ${topic}. This message will transform how you understand God's purpose for your life. As believers, we are called to walk in the fullness of what Christ has accomplished for us.`,
      'Understanding the Foundation': `The foundation of ${topic} is rooted in God's eternal word. Scripture reminds us that we are more than conquerors through Him who loved us. When we understand this truth, everything changes. Our perspective shifts from earthly limitations to heavenly possibilities.`,
      'The Biblical Perspective': `Throughout Scripture, we see God's heart for His people regarding ${topic}. From Genesis to Revelation, this theme echoes through every book. The prophets spoke of it, Jesus demonstrated it, and the apostles taught it to the early church.`,
      'Practical Application': `How do we apply ${topic} in our daily lives? First, we must renew our minds with God's word. Second, we practice what we learn through intentional action. Third, we remain connected to a community of believers who encourage our growth.`,
      'Overcoming Challenges': `Every believer faces challenges when pursuing ${topic}. The enemy will try to discourage you, circumstances will test your faith, but God's grace is sufficient. Remember, the same power that raised Christ from the dead lives in you.`,
      'Walking in Victory': `Victory is not something we strive for—it's something we walk in. Through Christ, we have already overcome. ${topic} becomes our reality when we align our lives with God's truth and purpose.`,
      'The Power of Faith': `Faith is the key that unlocks everything related to ${topic}. Without faith, it is impossible to please God. But with faith, mountains move, seas part, and the impossible becomes possible.`,
      'Divine Purpose': `God has a divine purpose for you connected to ${topic}. You were created for such a time as this. Your life has meaning, your struggles have purpose, and your future is secure in His hands.`,
      'Conclusion & Prayer': `As we close this message on ${topic}, I encourage you to take action. Don't just be a hearer of the word, but a doer. Let's pray: Father, we thank You for this revelation. Help us to walk in the fullness of what You have spoken. In Jesus' name, Amen.`
    };

    let fullContent = '';
    sectionTitles.forEach((title, index) => {
      fullContent += `## ${title}\n\n${sectionContent[title] || `This section covers important aspects of ${topic} that every believer should understand and apply.`}\n\n`;
    });

    const generatedTitle = topic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const generatedExcerpt = `Discover the transformative power of ${topic} and how it can revolutionize your walk with God. This message will equip you with biblical principles and practical applications.`;

    setCurrentPost({
      ...currentPost,
      title: generatedTitle,
      excerpt: generatedExcerpt,
      content: fullContent.trim(),
      image: autoSelectImage(topic),
    });
    
    setIsGenerating(false);
    setTopicInput('');
  };

  const handleVideoImport = () => {
    if (!videoInput) return;
    const parsed = parseVideoUrl(videoInput);
    if (parsed) {
      setCurrentPost({
        ...currentPost,
        videoUrl: videoInput,
        videoType: parsed.type,
        videoId: parsed.id,
        image: parsed.type === 'youtube' ? `https://img.youtube.com/vi/${parsed.id}/maxresdefault.jpg` : currentPost.image,
      });
      setVideoInput('');
    } else {
      alert('Could not parse video URL. Please use a valid YouTube or Facebook video link.');
    }
  };

  const handleNewPost = () => {
    // Use sequential ID based on existing posts (max ID + 1)
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    const newId = maxId + 1;
    setCurrentPost({
      id: newId, title: '', excerpt: '', content: '', image: stockImages.default[0],
      author: 'Prophet Joshua Matthews', date: new Date().toISOString().split('T')[0],
      category: 'Message', published: false, fontTheme: 'hillsong', videoUrl: '', videoType: null, videoId: '',
    });
    setSelectedTheme(fontThemes[0]);
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setSelectedTheme(fontThemes.find(t => t.id === post.fontTheme) || fontThemes[0]);
    setIsEditing(true);
    setShowPreview(false);
  };

  const handleSavePost = () => {
    if (!currentPost.title) { alert('Please enter a title'); return; }
    const postToSave = { ...currentPost, fontTheme: selectedTheme.id };
    if (!postToSave.excerpt && postToSave.content) {
      postToSave.excerpt = postToSave.content.substring(0, 150).replace(/[#*]/g, '') + '...';
    }
    const existingIndex = posts.findIndex((p) => p.id === currentPost.id);
    const newPosts = existingIndex >= 0 
      ? posts.map((p, i) => i === existingIndex ? postToSave : p)
      : [...posts, postToSave];
    savePosts(newPosts);
    setIsEditing(false);
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Delete this post?')) savePosts(posts.filter((p) => p.id !== id));
  };

  const handleTogglePublish = (id: number) => {
    savePosts(posts.map((p) => p.id === id ? { ...p, published: !p.published } : p));
  };

  const handleCopyLink = (id: number) => {
    const url = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const publishedCount = posts.filter(p => p.published).length;
  const draftCount = posts.filter(p => !p.published).length;

  const handleMigrateBlogIds = () => {
    if (!confirm('This will convert all blog post IDs to sequential numbers (1, 2, 3...). This is necessary for blog posts to work properly. Continue?')) {
      return;
    }

    // Sort posts by creation date (oldest first)
    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    // Assign sequential IDs starting from 1
    const migratedPosts = sortedPosts.map((post, index) => ({
      ...post,
      id: index + 1
    }));

    // Save migrated posts
    savePosts(migratedPosts);
    setShowMigrationNotice(false);
    setMigrationComplete(true);
    setTimeout(() => setMigrationComplete(false), 5000);
    alert(`Successfully migrated ${migratedPosts.length} blog posts! All posts now have sequential IDs.`);
  };

  const getThemeStyles = (theme: typeof fontThemes[0]) => {
    switch (theme.style) {
      case 'dark': return 'bg-black text-white';
      case 'gradient': return 'bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white';
      case 'warm': return 'bg-gradient-to-br from-amber-100 to-orange-50 text-gray-900';
      case 'bold': return 'bg-gray-900 text-white';
      case 'minimal': return 'bg-white text-gray-900';
      default: return 'bg-white text-gray-900';
    }
  };

  if (!isAuthenticated) return null;

  if (isEditing) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowThemeSelector(!showThemeSelector)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${showThemeSelector ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                  <Palette className="w-4 h-4" /> Style
                </button>
                <button onClick={() => setShowPreview(!showPreview)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${showPreview ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                  <Eye className="w-4 h-4" /> {showPreview ? 'Edit' : 'Preview'}
                </button>
                <button onClick={handleSavePost} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-amber-500/30">
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {showThemeSelector && (
          <div className="bg-gray-900 text-white py-6">
            <div className="container mx-auto px-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Select Design Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {fontThemes.map((theme) => (
                  <button key={theme.id} onClick={() => setSelectedTheme(theme)} className={`p-4 rounded-xl text-left transition-all ${selectedTheme.id === theme.id ? 'bg-amber-500 text-white ring-2 ring-amber-300' : 'bg-gray-800 hover:bg-gray-700'}`}>
                    <p className="font-bold text-sm mb-1">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {showPreview ? (
            <div className="max-w-4xl mx-auto">
              <div className={`rounded-2xl overflow-hidden shadow-2xl ${getThemeStyles(selectedTheme)}`}>
                <div className="relative aspect-video">
                  {currentPost.videoType === 'youtube' && currentPost.videoId ? (
                    <iframe src={`https://www.youtube.com/embed/${currentPost.videoId}`} className="w-full h-full" allowFullScreen />
                  ) : (
                    <Image src={currentPost.image} alt={currentPost.title} fill className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block bg-amber-500 text-white text-xs font-bold uppercase px-3 py-1 rounded mb-4">{currentPost.category}</span>
                    <h1 className={`${selectedTheme.titleFont} text-4xl md:text-5xl text-white leading-tight mb-4`}>{currentPost.title || 'Message Title'}</h1>
                    <p className="text-white/80 text-sm">{currentPost.author} • {new Date(currentPost.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-8">
                  {currentPost.excerpt && <p className={`${selectedTheme.bodyFont} text-xl leading-relaxed mb-8 opacity-90`}>{currentPost.excerpt}</p>}
                  <div className={`${selectedTheme.bodyFont} prose prose-lg max-w-none`} dangerouslySetInnerHTML={{ __html: currentPost.content.replace(/## /g, '<h2 class="text-2xl font-bold mt-8 mb-4">').replace(/\n\n/g, '</h2><p class="mb-4">') + '</p>' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* AI Content Generator */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-xl"><Wand2 className="w-5 h-5 text-purple-600" /></div>
                  <div>
                    <h3 className="font-bold text-gray-900">Auto-Generate Blog Content</h3>
                    <p className="text-sm text-gray-600">Enter a topic and we&apos;ll create a well-structured blog post</p>
                  </div>
                </div>
                <div className="flex gap-3 mb-4">
                  <input type="text" value={topicInput} onChange={(e) => setTopicInput(e.target.value)} placeholder="Enter topic (e.g., Walking in Faith, Overcoming Fear, Divine Purpose)" className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none" />
                  <select value={contentLength} onChange={(e) => setContentLength(e.target.value as any)} className="px-4 py-3 border border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none">
                    <option value="short">{contentTemplates.short.label}</option>
                    <option value="medium">{contentTemplates.medium.label}</option>
                    <option value="long">{contentTemplates.long.label}</option>
                  </select>
                </div>
                <button onClick={() => topicInput && generateBlogContent(topicInput, contentLength)} disabled={!topicInput || isGenerating} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {isGenerating ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</>) : (<><Sparkles className="w-5 h-5" /> Generate Blog Content</>)}
                </button>
              </div>

              {/* Video Import */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Youtube className="w-5 h-5 text-red-600" /> Import Video</h3>
                <div className="flex gap-3">
                  <input type="url" value={videoInput} onChange={(e) => setVideoInput(e.target.value)} placeholder="YouTube or Facebook video URL" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none" />
                  <button onClick={handleVideoImport} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium">Import</button>
                </div>
                {currentPost.videoUrl && <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">✓ Video imported: {currentPost.videoUrl}</div>}
              </div>

              {/* Main Editor */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-6">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <Image src={currentPost.image} alt="Featured" fill className="object-cover" />
                  {currentPost.videoType === 'youtube' && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Play className="w-16 h-16 text-white" /></div>}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setShowImagePicker(!showImagePicker)} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"><ImageIcon className="w-4 h-4" /> Choose Image</button>
                  <button onClick={() => setCurrentPost({ ...currentPost, image: autoSelectImage(currentPost.title) })} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"><Sparkles className="w-4 h-4" /> Auto-Select</button>
                </div>
                {showImagePicker && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="grid grid-cols-4 gap-2">
                      {Object.values(stockImages).flat().map((img, i) => (
                        <button key={i} onClick={() => { setCurrentPost({ ...currentPost, image: img }); setShowImagePicker(false); }} className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentPost.image === img ? 'border-amber-500' : 'border-transparent hover:border-gray-300'}`}>
                          <Image src={img} alt="" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <input type="text" value={currentPost.title} onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })} placeholder="Enter title..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-xl font-bold" />
                <textarea value={currentPost.excerpt} onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })} placeholder="Short description..." rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none" />
                <textarea value={currentPost.content} onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })} placeholder="Full content (use ## for section headings)..." rows={16} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none font-mono text-sm" />
                <div className="grid md:grid-cols-3 gap-4">
                  <select value={currentPost.category} onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none">
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input type="text" value={currentPost.author} onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none" />
                  <input type="date" value={currentPost.date} onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none" />
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <button onClick={() => setCurrentPost({ ...currentPost, published: !currentPost.published })} className={`relative w-12 h-6 rounded-full transition-colors ${currentPost.published ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${currentPost.published ? 'left-7' : 'left-1'}`} />
                  </button>
                  <span className="text-sm font-medium text-gray-700">{currentPost.published ? 'Published' : 'Draft'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div><h1 className="text-xl font-bold text-gray-900">Overcomers Admin</h1><p className="text-xs text-gray-500">Messages & Blog</p></div>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/blog" target="_blank" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600"><ExternalLink className="w-4 h-4" /> View Blog</Link>
              <button onClick={handleNewPost} className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-xl font-medium shadow-lg shadow-amber-500/30"><Plus className="w-5 h-5" /> New Post</button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Migration Notice */}
        {showMigrationNotice && (
          <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Blog ID Migration Required</h3>
                <p className="text-gray-700 mb-4">
                  Some of your blog posts have timestamp-based IDs which cause 404 errors. Click the button below to automatically convert all blog posts to use sequential IDs (1, 2, 3...). This will fix the 404 errors and make all blog posts accessible.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleMigrateBlogIds}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Fix Blog IDs Now
                  </button>
                  <button
                    onClick={() => setShowMigrationNotice(false)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Remind Me Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Migration Success */}
        {migrationComplete && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-bold text-green-900">Migration Complete!</h3>
                <p className="text-green-700">All blog posts now have sequential IDs and will work properly.</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
          <Link href="/admin/scheduler" className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-xl text-amber-700 hover:shadow-md border border-amber-200"><Calendar className="w-4 h-4" /> Post Scheduler</Link>
          <Link href="/admin/events" className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-amber-600 hover:shadow-md border border-gray-100"><Calendar className="w-4 h-4" /> Events</Link>
        </div>

        {/* Blog Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{posts.length}</span>
            </div>
            <p className="text-sm font-medium opacity-90">Total Posts</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{publishedCount}</span>
            </div>
            <p className="text-sm font-medium opacity-90">Published</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{draftCount}</span>
            </div>
            <p className="text-sm font-medium opacity-90">Drafts</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Share2 className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{posts.filter(p => p.videoUrl).length}</span>
            </div>
            <p className="text-sm font-medium opacity-90">With Video</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Messages Yet</h3>
            <p className="text-gray-500 mb-6">Create your first blog post or import a video</p>
            <button onClick={handleNewPost} className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium"><Plus className="w-5 h-5" /> Create Post</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="relative aspect-video">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                  {post.videoUrl && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Play className="w-12 h-12 text-white" /></div>}
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded ${post.published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>{post.published ? 'LIVE' : 'DRAFT'}</span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-amber-600 uppercase">{post.category}</span>
                  <h3 className="font-bold text-gray-900 mt-1 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                  <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditPost(post)} className="flex-1 flex items-center justify-center gap-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"><Edit className="w-4 h-4" /> Edit</button>
                      <Link href={`/blog/${post.id}`} target="_blank" className="flex-1 flex items-center justify-center gap-1 py-2 text-purple-600 hover:bg-purple-50 rounded-lg text-sm font-medium"><ExternalLink className="w-4 h-4" /> View</Link>
                      <button onClick={() => handleTogglePublish(post.id)} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium ${post.published ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}>{post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {post.published ? 'Hide' : 'Publish'}</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleCopyLink(post.id)} className="flex-1 flex items-center justify-center gap-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
                        {copiedId === post.id ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copiedId === post.id ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={() => handleDeletePost(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
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
