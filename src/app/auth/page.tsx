'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, MapPin, Chrome, Apple } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  location: string;
  avatar?: string;
  provider: 'google' | 'apple' | 'email';
  createdAt: string;
}

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/blog';
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('ogn-user');
    if (user) {
      router.push(redirect);
    }
  }, [router, redirect]);

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && (!name || !location)) {
      setError('Please fill in all fields');
      return;
    }

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('ogn-users') || '[]');
      const user = users.find((u: UserProfile) => u.email === email);
      
      if (!user) {
        setError('Account not found. Please sign up first.');
        return;
      }

      const savedPassword = localStorage.getItem(`ogn-password-${user.id}`);
      if (savedPassword !== password) {
        setError('Incorrect password');
        return;
      }

      localStorage.setItem('ogn-user', JSON.stringify(user));
      router.push(redirect);
    } else {
      const users = JSON.parse(localStorage.getItem('ogn-users') || '[]');
      const existingUser = users.find((u: UserProfile) => u.email === email);
      
      if (existingUser) {
        setError('Email already registered. Please login instead.');
        return;
      }

      const newUser: UserProfile = {
        id: Date.now().toString(),
        email,
        name,
        location,
        provider: 'email',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('ogn-users', JSON.stringify(users));
      localStorage.setItem(`ogn-password-${newUser.id}`, password);
      localStorage.setItem('ogn-user', JSON.stringify(newUser));
      
      router.push(redirect);
    }
  };

  const handleGoogleAuth = () => {
    const name = prompt('Enter your name:');
    const location = prompt('Enter your location (City, Country):');
    
    if (!name || !location) {
      setError('Name and location are required');
      return;
    }

    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
    const users = JSON.parse(localStorage.getItem('ogn-users') || '[]');
    
    let user = users.find((u: UserProfile) => u.email === email && u.provider === 'google');
    
    if (!user) {
      user = {
        id: Date.now().toString(),
        email,
        name,
        location,
        provider: 'google',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      localStorage.setItem('ogn-users', JSON.stringify(users));
    }

    localStorage.setItem('ogn-user', JSON.stringify(user));
    router.push(redirect);
  };

  const handleAppleAuth = () => {
    const name = prompt('Enter your name:');
    const location = prompt('Enter your location (City, Country):');
    
    if (!name || !location) {
      setError('Name and location are required');
      return;
    }

    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@icloud.com`;
    const users = JSON.parse(localStorage.getItem('ogn-users') || '[]');
    
    let user = users.find((u: UserProfile) => u.email === email && u.provider === 'apple');
    
    if (!user) {
      user = {
        id: Date.now().toString(),
        email,
        name,
        location,
        provider: 'apple',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      localStorage.setItem('ogn-users', JSON.stringify(users));
    }

    localStorage.setItem('ogn-user', JSON.stringify(user));
    router.push(redirect);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">
              {isLogin ? 'Welcome Back' : 'Join Our Community'}
            </h1>
            <p className="text-white/90 text-sm mt-1">
              {isLogin ? 'Sign in to comment and connect' : 'Create your account to get started'}
            </p>
          </div>

          {/* Social Auth */}
          <div className="p-6 border-b border-gray-100">
            <div className="space-y-3">
              <button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-amber-500 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all"
              >
                <Chrome className="w-5 h-5 text-blue-500" />
                Continue with Google
              </button>
              <button
                onClick={handleAppleAuth}
                className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition-all"
              >
                <Apple className="w-5 h-5" />
                Continue with Apple
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
          </div>

          {/* Email Auth Form */}
          <form onSubmit={handleEmailAuth} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="New York, USA"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-amber-600 font-medium hover:text-amber-700"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
