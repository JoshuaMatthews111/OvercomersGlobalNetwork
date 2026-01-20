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
  CheckCircle,
  Lock,
  User,
  Mail,
  Globe,
  Bell
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Overcomers Global Network',
    contactEmail: 'info@overcomers.org',
    givelifyUrl: 'https://giv.li/b5jpv9',
    venmoHandle: '@OvercomersGlobalNetwork',
    enableNotifications: true,
  });
  const [passwordChange, setPasswordChange] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    
    // Load saved settings
    const savedSettings = localStorage.getItem('ogn-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [router]);

  const handleSave = () => {
    localStorage.setItem('ogn-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
          <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <FileText className="w-5 h-5" />
            Content
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl">
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
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500">Manage your admin preferences</p>
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
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-500" />
              General Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              Payment Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Givelify URL</label>
                <input
                  type="url"
                  value={settings.givelifyUrl}
                  onChange={(e) => setSettings({ ...settings, givelifyUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venmo Handle</label>
                <input
                  type="text"
                  value={settings.venmoHandle}
                  onChange={(e) => setSettings({ ...settings, venmoHandle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Notifications
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Order Notifications</p>
                  <p className="text-sm text-gray-500">Get notified when new orders come in</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, enableNotifications: !settings.enableNotifications })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.enableNotifications ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.enableNotifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-500" />
              Security
            </h2>
            
            <div className="bg-amber-50 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-sm">
                <strong>Important:</strong> To change your login credentials, update the environment 
                variables in your <code className="bg-amber-100 px-1 rounded">.env.local</code> file:
              </p>
              <pre className="mt-2 text-xs bg-amber-100 p-2 rounded overflow-x-auto">
{`NEXT_PUBLIC_ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_password`}
              </pre>
            </div>
            
            <p className="text-gray-500 text-sm">
              For security, credentials are stored in environment variables, not in the database. 
              Contact your developer to update login credentials.
            </p>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Admin Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="font-medium text-gray-900">{localStorage.getItem('ogn-admin-email') || 'Admin'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Version</p>
              <p className="font-medium text-gray-900">OGN Admin v1.0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
