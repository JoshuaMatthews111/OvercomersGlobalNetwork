'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Users, UserPlus, Shield, ShieldCheck, 
  Mail, Trash2, Pause, Play, Ban, RefreshCw, Copy,
  CheckCircle, XCircle, Clock, Eye, EyeOff, Loader2
} from 'lucide-react';
import { 
  getAllAdmins, inviteAdmin, updateAdminStatus, removeAdmin, 
  resetAdminPassword, signInAdmin, type AdminUser 
} from '@/lib/firebase';

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  
  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [showTempPassword, setShowTempPassword] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState('');
  
  // Re-auth state for after invite
  const [masterEmail, setMasterEmail] = useState('');
  const [masterPassword, setMasterPassword] = useState('');

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    const result = await getAllAdmins();
    if (result.success) {
      setAdmins(result.admins);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Check if master admin
    const role = localStorage.getItem('ogn-admin-role');
    const email = localStorage.getItem('ogn-admin-email');
    const name = localStorage.getItem('ogn-admin-name');
    const uid = localStorage.getItem('ogn-admin-uid');
    
    if (role !== 'master') {
      window.location.href = '/admin/dashboard';
      return;
    }
    
    setCurrentAdmin({ 
      uid: uid || '', 
      email: email || '', 
      name: name || '', 
      role: 'master', 
      status: 'active',
      createdAt: '',
      lastLogin: ''
    });
    setMasterEmail(email || '');
    
    loadAdmins();
  }, [loadAdmins]);

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(password);
  };

  const handleInviteAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError('');
    
    if (!tempPassword) {
      setInviteError('Please generate a temporary password');
      setInviteLoading(false);
      return;
    }

    const result = await inviteAdmin(
      inviteEmail, 
      inviteName, 
      tempPassword, 
      currentAdmin?.uid || ''
    );
    
    if (result.success) {
      setInviteSuccess(true);
      loadAdmins();
      
      // Re-authenticate as master admin (creating user signs them out)
      if (masterPassword) {
        await signInAdmin(masterEmail, masterPassword);
      }
    } else {
      setInviteError(result.error || 'Failed to invite admin');
    }
    setInviteLoading(false);
  };

  const handleStatusChange = async (adminUid: string, newStatus: 'active' | 'suspended' | 'paused') => {
    const result = await updateAdminStatus(adminUid, newStatus);
    if (result.success) {
      loadAdmins();
    }
  };

  const handleRemoveAdmin = async (adminUid: string) => {
    if (!confirm('Are you sure you want to remove this admin? This action cannot be undone.')) {
      return;
    }
    
    const result = await removeAdmin(adminUid);
    if (result.success) {
      loadAdmins();
      setSelectedAdmin(null);
    }
  };

  const handleResetPassword = async (email: string) => {
    const result = await resetAdminPassword(email);
    if (result.success) {
      alert('Password reset email sent to ' + email);
    } else {
      alert('Failed to send password reset email');
    }
  };

  const closeInviteModal = () => {
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteName('');
    setTempPassword('');
    setInviteSuccess(false);
    setInviteError('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"><CheckCircle className="w-3 h-3" /> Active</span>;
      case 'suspended':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs"><Ban className="w-3 h-3" /> Suspended</span>;
      case 'paused':
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs"><Pause className="w-3 h-3" /> Paused</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"><Clock className="w-3 h-3" /> Unknown</span>;
    }
  };

  if (!currentAdmin || currentAdmin.role !== 'master') {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
                <p className="text-sm text-gray-500">Manage admin access and permissions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadAdmins()}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => { generateTempPassword(); setShowInviteModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                <UserPlus className="w-4 h-4" />
                Invite Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
                <p className="text-xs text-gray-500">Total Admins</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{admins.filter(a => a.status === 'active').length}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Pause className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{admins.filter(a => a.status === 'paused').length}</p>
                <p className="text-xs text-gray-500">Paused</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{admins.filter(a => a.status === 'suspended').length}</p>
                <p className="text-xs text-gray-500">Suspended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">All Administrators</h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
              <p className="text-gray-500 mt-2">Loading admins...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No admins found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <div 
                  key={admin.uid} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedAdmin?.uid === admin.uid ? 'bg-amber-50' : ''}`}
                  onClick={() => setSelectedAdmin(admin)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${admin.role === 'master' ? 'bg-amber-100' : 'bg-gray-100'}`}>
                        {admin.role === 'master' ? (
                          <ShieldCheck className="w-6 h-6 text-amber-600" />
                        ) : (
                          <Shield className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{admin.name}</h3>
                          {admin.role === 'master' && (
                            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">Master</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{admin.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(admin.status)}
                      {admin.lastLogin && (
                        <span className="text-xs text-gray-400">
                          Last login: {new Date(admin.lastLogin).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Admin Actions */}
        {selectedAdmin && selectedAdmin.role !== 'master' && (
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Actions for {selectedAdmin.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedAdmin.status === 'active' && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedAdmin.uid, 'paused')}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200"
                  >
                    <Pause className="w-4 h-4" />
                    Pause Account
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAdmin.uid, 'suspended')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    <Ban className="w-4 h-4" />
                    Suspend Account
                  </button>
                </>
              )}
              {selectedAdmin.status === 'paused' && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedAdmin.uid, 'active')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    <Play className="w-4 h-4" />
                    Reactivate Account
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAdmin.uid, 'suspended')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    <Ban className="w-4 h-4" />
                    Suspend Account
                  </button>
                </>
              )}
              {selectedAdmin.status === 'suspended' && (
                <button
                  onClick={() => handleStatusChange(selectedAdmin.uid, 'active')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  <Play className="w-4 h-4" />
                  Reactivate Account
                </button>
              )}
              <button
                onClick={() => handleResetPassword(selectedAdmin.email)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                <Mail className="w-4 h-4" />
                Send Password Reset
              </button>
              <button
                onClick={() => handleRemoveAdmin(selectedAdmin.uid)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Remove Admin
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            {inviteSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Invited!</h3>
                <p className="text-gray-600 mb-4">
                  Share these credentials with the new admin:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Email:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{inviteEmail}</span>
                      <button onClick={() => copyToClipboard(inviteEmail)} className="text-gray-400 hover:text-gray-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Temp Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{tempPassword}</span>
                      <button onClick={() => copyToClipboard(tempPassword)} className="text-gray-400 hover:text-gray-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  The admin should change their password after first login.
                </p>
                <button
                  onClick={closeInviteModal}
                  className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Invite New Admin</h3>
                  <button onClick={closeInviteModal} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleInviteAdmin} className="space-y-4">
                  {inviteError && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                      {inviteError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temporary Password
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showTempPassword ? 'text' : 'password'}
                          value={tempPassword}
                          onChange={(e) => setTempPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none pr-10"
                          placeholder="Generate or enter password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowTempPassword(!showTempPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showTempPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={generateTempPassword}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-sm text-amber-700">
                      <strong>Note:</strong> To invite an admin, you need to re-enter your password below. 
                      This is required because Firebase signs you out when creating a new user.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Password (to re-authenticate)
                    </label>
                    <input
                      type="password"
                      value={masterPassword}
                      onChange={(e) => setMasterPassword(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={inviteLoading}
                    className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 disabled:bg-amber-300"
                  >
                    {inviteLoading ? 'Inviting...' : 'Send Invite'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
