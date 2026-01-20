'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Save,
  Eye,
  Bell,
  Image as ImageIcon,
  Type,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface Announcement {
  id: number;
  text: string;
  type: 'info' | 'warning' | 'success';
  isActive: boolean;
  createdAt: string;
}

interface ContentUpdate {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  announcements: Announcement[];
}

export default function AdminContentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('announcements');
  const [saved, setSaved] = useState(false);
  const [content, setContent] = useState<ContentUpdate>({
    heroTitle: 'Advancing Kingdom Culture',
    heroSubtitle: 'Join a global movement of believers committed to authentic discipleship, spiritual growth, and Kingdom advancement.',
    aboutText: '',
    announcements: [],
  });
  const [newAnnouncement, setNewAnnouncement] = useState({
    text: '',
    type: 'info' as 'info' | 'warning' | 'success',
  });
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    
    // Load saved content
    const savedContent = localStorage.getItem('ogn-content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('ogn-content', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addAnnouncement = () => {
    if (!newAnnouncement.text.trim()) return;
    
    const announcement: Announcement = {
      id: Date.now(),
      text: newAnnouncement.text,
      type: newAnnouncement.type,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    
    setContent({
      ...content,
      announcements: [announcement, ...content.announcements],
    });
    setNewAnnouncement({ text: '', type: 'info' });
  };

  const toggleAnnouncement = (id: number) => {
    setContent({
      ...content,
      announcements: content.announcements.map(a =>
        a.id === id ? { ...a, isActive: !a.isActive } : a
      ),
    });
  };

  const deleteAnnouncement = (id: number) => {
    setContent({
      ...content,
      announcements: content.announcements.filter(a => a.id !== id),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('ogn-admin-auth');
    router.push('/admin');
  };

  if (!isAuthenticated) return null;

  const pendingOrders = JSON.parse(localStorage.getItem('ogn-orders') || '[]')
    .filter((o: any) => o.status === 'pending_payment').length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-amber-400">OGN Admin</h1>
          <p className="text-gray-400 text-sm">Master Dashboard</p>
        </div>

        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Orders
            {pendingOrders > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingOrders}</span>
            )}
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <Calendar className="w-5 h-5" />
            Events
          </Link>
          <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <FileText className="w-5 h-5" />
            Content
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Manager</h1>
            <p className="text-gray-500">Update site content and announcements</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              saved 
                ? 'bg-green-500 text-white' 
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'announcements'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5" />
              Announcements
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'hero'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              Hero Section
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'text'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Type className="w-5 h-5" />
              Text Content
            </button>
          </div>

          <div className="p-6">
            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div>
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Create New Announcement</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newAnnouncement.text}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, text: e.target.value })}
                      placeholder="Enter announcement text..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                    <select
                      value={newAnnouncement.type}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value as any })}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    >
                      <option value="info">Info (Blue)</option>
                      <option value="warning">Warning (Yellow)</option>
                      <option value="success">Success (Green)</option>
                    </select>
                    <button
                      onClick={addAnnouncement}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900">Active Announcements</h3>
                  {content.announcements.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4">No announcements yet. Create one above.</p>
                  ) : (
                    content.announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          announcement.type === 'info' ? 'bg-blue-50' :
                          announcement.type === 'warning' ? 'bg-yellow-50' :
                          'bg-green-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <AlertCircle className={`w-5 h-5 ${
                            announcement.type === 'info' ? 'text-blue-500' :
                            announcement.type === 'warning' ? 'text-yellow-500' :
                            'text-green-500'
                          }`} />
                          <span className={`${!announcement.isActive ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {announcement.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleAnnouncement(announcement.id)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              announcement.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {announcement.isActive ? 'Active' : 'Inactive'}
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(announcement.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Hero Section Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={content.heroTitle}
                    onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    placeholder="Main headline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                  <textarea
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Supporting text below the headline"
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Preview</h4>
                  <div className="bg-gray-900 rounded-lg p-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">{content.heroTitle || 'Hero Title'}</h1>
                    <p className="text-gray-300 text-sm">{content.heroSubtitle || 'Hero subtitle text'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Text Content Tab */}
            {activeTab === 'text' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Section Text</label>
                  <textarea
                    value={content.aboutText}
                    onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                    rows={6}
                    placeholder="Enter about section content..."
                  />
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Changes to text content will be reflected on the site after saving. 
                    For major content changes, consider updating the source files directly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Quick Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              Announcements appear as a banner at the top of the website
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              Use "Warning" type for urgent messages that need attention
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              Toggle announcements off instead of deleting to reuse later
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              Remember to click "Save Changes" to publish your updates
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
