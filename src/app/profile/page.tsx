'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { User, MapPin, Mail, Calendar, Edit, LogOut, MessageSquare, Chrome, Apple } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  location: string;
  avatar?: string;
  provider: 'google' | 'apple' | 'email';
  createdAt: string;
}

interface Comment {
  id: string;
  postId: number;
  userId: string;
  userName: string;
  userLocation: string;
  content: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [userComments, setUserComments] = useState<Comment[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('ogn-user');
    if (!savedUser) {
      router.push('/auth?redirect=/profile');
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
    setName(parsedUser.name);
    setLocation(parsedUser.location);

    // Load user's comments
    const allComments = JSON.parse(localStorage.getItem('ogn-blog-comments') || '[]');
    const myComments = allComments.filter((c: Comment) => c.userId === parsedUser.id);
    setUserComments(myComments);
  }, [router]);

  const handleSaveProfile = () => {
    if (!user) return;

    const updatedUser = { ...user, name, location };
    
    // Update in users list
    const users = JSON.parse(localStorage.getItem('ogn-users') || '[]');
    const updatedUsers = users.map((u: UserProfile) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('ogn-users', JSON.stringify(updatedUsers));
    localStorage.setItem('ogn-user', JSON.stringify(updatedUser));
    
    // Update comments with new name/location
    const comments = JSON.parse(localStorage.getItem('ogn-blog-comments') || '[]');
    const updatedComments = comments.map((c: Comment) => 
      c.userId === user.id ? { ...c, userName: name, userLocation: location } : c
    );
    localStorage.setItem('ogn-blog-comments', JSON.stringify(updatedComments));
    
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('ogn-user');
    router.push('/');
  };

  if (!user) return null;

  const getProviderIcon = () => {
    switch (user.provider) {
      case 'google':
        return <Chrome className="w-5 h-5 text-blue-500" />;
      case 'apple':
        return <Apple className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      {getProviderIcon()}
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setName(user.name);
                          setLocation(user.location);
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-100 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{userComments.length}</div>
                  <div className="text-sm text-gray-600">Comments</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-600">Member Since</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900 capitalize">{user.provider}</div>
                  <div className="text-sm text-gray-600">Sign-in Method</div>
                </div>
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-amber-500" />
                Your Recent Comments
              </h2>
              
              {userComments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No comments yet</p>
                  <p className="text-sm">Start engaging with our blog posts!</p>
                  <Link
                    href="/blog"
                    className="inline-block mt-4 px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                  >
                    Browse Blog Posts
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userComments.slice(0, 10).map((comment) => (
                    <div key={comment.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <Link
                          href={`/blog/${comment.postId}`}
                          className="text-sm text-amber-600 hover:text-amber-700"
                        >
                          View Post
                        </Link>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
