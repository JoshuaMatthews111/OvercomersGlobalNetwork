'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, UserPlus, Shield } from 'lucide-react';
import Image from 'next/image';
import { signInAdmin, setupMasterAdmin, onAdminAuthChange, type AdminUser } from '@/lib/firebase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in with Firebase
    const unsubscribe = onAdminAuthChange((admin: AdminUser | null) => {
      if (admin && admin.status === 'active') {
        localStorage.setItem('ogn-admin-auth', 'true');
        localStorage.setItem('ogn-admin-email', admin.email);
        localStorage.setItem('ogn-admin-role', admin.role);
        localStorage.setItem('ogn-admin-name', admin.name);
        localStorage.setItem('ogn-admin-uid', admin.uid);
        router.push('/admin/dashboard');
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signInAdmin(email, password);
    
    if (result.success && result.admin) {
      localStorage.setItem('ogn-admin-auth', 'true');
      localStorage.setItem('ogn-admin-email', result.admin.email);
      localStorage.setItem('ogn-admin-role', result.admin.role);
      localStorage.setItem('ogn-admin-name', result.admin.name);
      localStorage.setItem('ogn-admin-uid', result.admin.uid);
      router.push('/admin/dashboard');
    } else {
      // Check if this might be a setup scenario
      if (result.error === "Not authorized as admin") {
        setNeedsSetup(true);
        setError('No admin account found. Click "Setup Master Admin" to create one.');
      } else {
        setError(result.error || 'Login failed');
      }
    }
    setLoading(false);
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await setupMasterAdmin(email, password, name);
    
    if (result.success) {
      localStorage.setItem('ogn-admin-auth', 'true');
      localStorage.setItem('ogn-admin-email', email);
      localStorage.setItem('ogn-admin-role', 'master');
      localStorage.setItem('ogn-admin-name', name);
      router.push('/admin/dashboard');
    } else {
      setError(result.error || 'Setup failed');
    }
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Checking authentication...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative h-16 w-48 mx-auto mb-4">
              <Image
                src="/images/ogn-logo-transparent.png"
                alt="OGN Admin"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage your site</p>
          </div>

          {/* Setup Mode Toggle - Always show option to setup */}
          {!isSetupMode && (
            <button
              onClick={() => setIsSetupMode(true)}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all"
            >
              <Shield className="w-5 h-5" />
              First Time? Setup Master Admin
            </button>
          )}

          {/* Setup Form */}
          {isSetupMode ? (
            <form onSubmit={handleSetup} className="space-y-4">
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm mb-4">
                <strong>First Time Setup:</strong> Create your Master Admin account. This can only be done once.
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Create a strong password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-xl font-semibold transition-all"
              >
                {loading ? 'Creating Account...' : 'Create Master Admin Account'}
              </button>

              <button
                type="button"
                onClick={() => { setIsSetupMode(false); setError(''); }}
                className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm"
              >
                Back to Login
              </button>
            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-3 rounded-xl font-semibold transition-all"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          <p className="text-center text-gray-400 text-xs mt-6">
            Protected admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </main>
  );
}
