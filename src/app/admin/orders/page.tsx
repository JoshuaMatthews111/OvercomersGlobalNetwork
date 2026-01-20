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
  Search,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  CreditCard,
  DollarSign
} from 'lucide-react';

interface Order {
  id: number;
  date: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: Array<{ title: string; quantity: number; price: number }>;
  total: number;
  status: string;
  stripeSessionId?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthenticated(true);
    loadOrders();
  }, [router]);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('ogn-orders') || '[]');
    setOrders(savedOrders.reverse());
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('ogn-orders', JSON.stringify(updatedOrders));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const deleteOrder = (orderId: number) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('ogn-orders', JSON.stringify(updatedOrders));
      setSelectedOrder(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ogn-admin-auth');
    router.push('/admin');
  };

  if (!isAuthenticated) return null;

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = 
      order.customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingOrders = orders.filter(o => o.status === 'pending_payment').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Pending Payment</span>;
      case 'paid':
        return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Paid</span>;
      case 'shipped':
        return <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><Truck className="w-3 h-3" /> Shipped</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{status}</span>;
    }
  };

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
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl">
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
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500">Manage and track all orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-10 focus:border-amber-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending_payment">Pending Payment</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedOrder?.id === order.id ? 'bg-amber-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Order #{order.id.toString().slice(-6)}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-gray-500 text-sm">{order.customer.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">Order Details</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">#{selectedOrder.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(selectedOrder.date).toLocaleString()}</p>
                  </div>

                  {selectedOrder.stripeSessionId && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-700 text-sm">
                        <CreditCard className="w-4 h-4" />
                        <span className="font-medium">Paid via Stripe</span>
                      </div>
                      <p className="text-green-600 text-xs mt-1 truncate">
                        Session: {selectedOrder.stripeSessionId.slice(0, 20)}...
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.customer.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.customer.address}<br />
                      {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.zip}<br />
                      {selectedOrder.customer.country}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Items</p>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.title} x{item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-amber-600">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Update Status</p>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="pending_payment">Pending Payment</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => deleteOrder(selectedOrder.id)}
                    className="w-full mt-4 border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
