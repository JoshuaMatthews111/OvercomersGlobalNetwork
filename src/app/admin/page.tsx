'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { signInAdmin, onAdminAuthChange, MASTER_ADMIN_PERMISSIONS, type AdminUser } from '@/lib/firebase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
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
        const perms = admin.role === 'master' ? MASTER_ADMIN_PERMISSIONS : (admin.permissions || {});
        localStorage.setItem('ogn-admin-permissions', JSON.stringify(perms));
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
      const perms = result.admin.role === 'master' ? MASTER_ADMIN_PERMISSIONS : (result.admin.permissions || {});
      localStorage.setItem('ogn-admin-permissions', JSON.stringify(perms));
      router.push('/admin/dashboard');
    } else {
      setError(result.error || 'Login failed');
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

          {/* Login Form */}
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

          <p className="text-center text-gray-400 text-xs mt-6">
            Protected admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </main>
  );
}
