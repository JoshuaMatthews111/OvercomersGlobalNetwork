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
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  Bell,
  BookOpen,
  ImageIcon,
  Video,
  Heart,
  UserPlus,
  ShieldCheck,
  MessageSquare,
  Loader2,
  UserCheck,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import { signOutAdmin, MASTER_ADMIN_PERMISSIONS, type AdminPermissions } from '@/lib/firebase';

interface Order {
  id: number;
  date: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  items: Array<{ title: string; quantity: number; price: number }>;
  total: number;
  status: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [recentDonations, setRecentDonations] = useState<Array<{id: string; amount: number; email: string; name: string; date: string; description: string}>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    
    // Load orders
    const savedOrders = JSON.parse(localStorage.getItem('ogn-orders') || '[]');
    setOrders(savedOrders);

    // Load discipleship enrollments
    const savedEnrollments = JSON.parse(localStorage.getItem('ogn-discipleship-enrollments') || '[]');
    setEnrollments(savedEnrollments);

    // Load prophet bookings
    const savedBookings = JSON.parse(localStorage.getItem('ogn-prophet-bookings') || '[]');
    setBookings(savedBookings);

    // Fetch donation totals from Stripe
    fetch('/api/donations/total')
      .then(res => res.json())
      .then(data => {
        if (data.total !== undefined) {
          setTotalDonations(data.total);
          setDonationCount(data.count || 0);
          setRecentDonations(data.recent || []);
        }
      })
      .catch(() => { /* Stripe not configured yet */ })
      .finally(() => setDonationsLoading(false));
  }, [router]);

  const [adminRole, setAdminRole] = useState<string>('');
  const [adminName, setAdminName] = useState<string>('');
  const [permissions, setPermissions] = useState<AdminPermissions>(MASTER_ADMIN_PERMISSIONS);

  useEffect(() => {
    const role = localStorage.getItem('ogn-admin-role') || '';
    const name = localStorage.getItem('ogn-admin-name') || 'Admin';
    setAdminRole(role);
    setAdminName(name);
    if (role === 'master') {
      setPermissions(MASTER_ADMIN_PERMISSIONS);
    } else {
      try {
        const stored = localStorage.getItem('ogn-admin-permissions');
        if (stored) setPermissions(JSON.parse(stored));
      } catch { /* use defaults */ }
    }
  }, []);

  const handleLogout = async () => {
    await signOutAdmin();
    localStorage.removeItem('ogn-admin-auth');
    localStorage.removeItem('ogn-admin-email');
    localStorage.removeItem('ogn-admin-role');
    localStorage.removeItem('ogn-admin-name');
    localStorage.removeItem('ogn-admin-uid');
    localStorage.removeItem('ogn-admin-permissions');
    router.push('/admin');
  };

  const hasPermission = (key: keyof AdminPermissions) => {
    if (adminRole === 'master') return true;
    return permissions[key] === true;
  };

  if (!isAuthenticated) {
    return null;
  }

  const pendingOrders = orders.filter(o => o.status === 'pending_payment').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingEnrollments = enrollments.filter(e => e.status === 'pending').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending_payment' || !b.isPaid).length;
  const totalNotifications = pendingOrders + pendingEnrollments + pendingBookings;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 flex flex-col z-40 transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="mb-4">
          <h1 className="text-xl font-bold text-amber-400">OGN Admin</h1>
          <p className="text-gray-400 text-xs flex items-center gap-1">
            {adminRole === 'master' && <ShieldCheck className="w-3 h-3 text-amber-400" />}
            {adminRole === 'master' ? 'Master Admin' : 'Admin'} • {adminName}
          </p>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          {hasPermission('orders') && (
            <Link
              href="/admin/orders"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Orders
              {pendingOrders > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingOrders}
                </span>
              )}
            </Link>
          )}
          {hasPermission('events') && (
            <Link
              href="/admin/events"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Events
            </Link>
          )}
          {hasPermission('content') && (
            <Link
              href="/admin/content"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <FileText className="w-5 h-5" />
              Content
            </Link>
          )}
          {hasPermission('blog') && (
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Blog Posts
            </Link>
          )}
          {hasPermission('enrollments') && (
            <Link
              href="/admin/enrollments"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Users className="w-5 h-5" />
              Enrollments
            </Link>
          )}
          {hasPermission('scheduler') && (
            <Link
              href="/admin/scheduler"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Clock className="w-5 h-5" />
              Post Scheduler
            </Link>
          )}
          {hasPermission('eventFlyers') && (
            <Link
              href="/admin/events-flyers"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              Event Flyers
            </Link>
          )}
          {hasPermission('prophetSchedule') && (
            <Link
              href="/admin/prophet-schedule"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Video className="w-5 h-5" />
              Prophet Schedule
              {pendingBookings > 0 && (
                <span className="ml-auto bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingBookings}
                </span>
              )}
            </Link>
          )}
          {hasPermission('discipleship') && (
            <Link
              href="/admin/discipleship"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Heart className="w-5 h-5" />
              Discipleship
              {pendingEnrollments > 0 && (
                <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingEnrollments}
                </span>
              )}
            </Link>
          )}
          {hasPermission('prayerRequests') && (
            <Link
              href="/admin/prayer-requests"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Heart className="w-5 h-5" />
              Prayer Requests
            </Link>
          )}
          {hasPermission('askProphet') && (
            <Link
              href="/admin/ask-prophet"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Ask The Prophet
            </Link>
          )}
          {hasPermission('people') && (
            <Link
              href="/admin/people"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <UserCheck className="w-5 h-5" />
              People
            </Link>
          )}
          {hasPermission('settings') && (
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          )}
          {adminRole === 'master' && (
            <Link
              href="/admin/users"
              className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:bg-white/5 rounded-lg text-sm transition-colors font-medium"
            >
              <ShieldCheck className="w-5 h-5" />
              Manage Admins
            </Link>
          )}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white w-full rounded-lg text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-6 h-6" />
              {totalNotifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {totalNotifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              {donationsLoading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {donationsLoading ? '...' : `$${totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </h3>
            <p className="text-gray-500 text-sm">Total Donations</p>
            <p className="text-gray-400 text-xs mt-1">{donationCount} donation{donationCount !== 1 ? 's' : ''} via Stripe</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{enrollments.length}</h3>
            <p className="text-gray-500 text-sm">Discipleship Enrollments</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{bookings.length}</h3>
            <p className="text-gray-500 text-sm">1-on-1 Bookings</p>
          </div>
        </div>

        {/* Recent Donations - Master Admin Only */}
        {adminRole === 'master' && (
          <div className="bg-white rounded-2xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent Donations</h2>
                <a
                  href="https://dashboard.stripe.com/payments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
                >
                  Stripe Dashboard <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            {donationsLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 text-gray-300 mx-auto mb-2 animate-spin" />
                <p className="text-gray-400 text-sm">Loading from Stripe...</p>
              </div>
            ) : recentDonations.length === 0 ? (
              <div className="p-12 text-center">
                <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No donations recorded yet</p>
                <p className="text-gray-400 text-xs mt-1">Donations will appear here once Stripe is configured</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {donation.name || 'Anonymous'}
                        </p>
                        <p className="text-gray-500 text-sm">{donation.email || 'No email'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${donation.amount.toFixed(2)}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(donation.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Link
            href="/admin/blog"
            className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <BookOpen className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Write Blog Post</h3>
            <p className="text-white/80 text-sm">Create and publish blog content</p>
          </Link>

          <Link
            href="/admin/events-flyers"
            className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <ImageIcon className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Add Event Flyer</h3>
            <p className="text-white/80 text-sm">Upload event flyers for carousel</p>
          </Link>

          <Link
            href="/admin/prophet-schedule"
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <Video className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Prophet Schedule</h3>
            <p className="text-white/80 text-sm">Manage 1-on-1 session availability</p>
          </Link>

          <Link
            href="/admin/content"
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <FileText className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Update Content</h3>
            <p className="text-white/80 text-sm">Edit site content and announcements</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <ShoppingBag className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Manage Orders</h3>
            <p className="text-white/80 text-sm">View and process orders</p>
          </Link>

          <Link
            href="/admin/discipleship"
            className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <Heart className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Discipleship</h3>
            <p className="text-white/80 text-sm">View new enrollments</p>
            {pendingEnrollments > 0 && (
              <span className="mt-2 inline-block bg-white/20 px-2 py-1 rounded text-xs">
                {pendingEnrollments} pending
              </span>
            )}
          </Link>
        </div>

        {/* Recent Enrollments */}
        {enrollments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm mt-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent Discipleship Enrollments</h2>
                <Link
                  href="/admin/discipleship"
                  className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {enrollments.slice(0, 3).map((enrollment: any) => (
                <div key={enrollment.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {enrollment.firstName} {enrollment.lastName}
                      </p>
                      <p className="text-gray-500 text-sm">{enrollment.city}, {enrollment.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      enrollment.status === 'pending' 
                        ? 'bg-amber-100 text-amber-700'
                        : enrollment.status === 'contacted'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {enrollment.status === 'pending' ? 'Needs Contact' : enrollment.status}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(enrollment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm mt-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent 1-on-1 Bookings</h2>
                <Link
                  href="/admin/prophet-schedule"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {bookings.slice(0, 3).map((booking: any) => (
                <div key={booking.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Video className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.customer?.firstName} {booking.customer?.lastName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.isPaid 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.isPaid ? 'Paid' : 'Pending Payment'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
