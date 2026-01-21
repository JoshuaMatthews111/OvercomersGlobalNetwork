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
  TrendingUp,
  Clock,
  ChevronRight,
  Bell,
  BookOpen,
  ImageIcon
} from 'lucide-react';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ogn-admin-auth');
    localStorage.removeItem('ogn-admin-email');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  const pendingOrders = orders.filter(o => o.status === 'pending_payment').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-amber-400">OGN Admin</h1>
          <p className="text-gray-400 text-sm">Master Dashboard</p>
        </div>

        <nav className="space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
            {pendingOrders > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingOrders}
              </span>
            )}
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Events
          </Link>
          <Link
            href="/admin/content"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <FileText className="w-5 h-5" />
            Content
          </Link>
          <Link
            href="/admin/blog"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Blog Posts
          </Link>
          <Link
            href="/admin/events-flyers"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
            Event Flyers
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-6 h-6" />
              {pendingOrders > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{orders.length}</h3>
            <p className="text-gray-500 text-sm">Total Orders</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</h3>
            <p className="text-gray-500 text-sm">Total Revenue</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{orders.length}</h3>
            <p className="text-gray-500 text-sm">Customers</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{pendingOrders}</h3>
            <p className="text-gray-500 text-sm">Pending Orders</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">
                        {order.customer.firstName[0]}{order.customer.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-gray-500 text-sm">{order.customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending_payment' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status === 'pending_payment' ? 'Pending Payment' : order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
            href="/admin/content"
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <FileText className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Update Content</h3>
            <p className="text-white/80 text-sm">Edit site content and announcements</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <ShoppingBag className="w-8 h-8 mb-4" />
            <h3 className="font-bold text-lg mb-1">Manage Orders</h3>
            <p className="text-white/80 text-sm">View and process orders</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
