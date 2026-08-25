'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAdminPermission } from '@/lib/useAdminPermission';
import {
  getStoreProducts,
  addStoreProduct,
  updateStoreProduct,
  deleteStoreProduct,
  type StoreProduct,
} from '@/lib/firebase';
import Link from 'next/link';
import {
  LayoutDashboard, ShoppingBag, Settings, LogOut,
  Plus, Pencil, Trash2, Save, X, Disc, BookOpen,
  DollarSign, Eye, EyeOff, Loader2, Package, Check,
} from 'lucide-react';

const EMPTY_PRODUCT: Omit<StoreProduct, 'id' | 'createdAt' | 'updatedAt'> = {
  type: 'book',
  title: '',
  subtitle: '',
  description: '',
  author: 'Prophet Joshua Matthews',
  price: 0,
  cover: '',
  preOrder: false,
  active: true,
  tracks: undefined,
  duration: '',
  frontCover: '',
  backCover: '',
  bundlePrice: undefined,
};

export default function AdminStorePage() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<StoreProduct | null>(null);
  const [adding, setAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [filterType, setFilterType] = useState<'all' | 'book' | 'cd'>('all');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('ogn-admin-auth');
    if (!auth) { router.push('/admin'); return; }
    if (!checkAdminPermission('store')) { router.push('/admin/dashboard'); return; }
    setIsAuthenticated(true);
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getStoreProducts();
    setProducts(data);
    setLoading(false);
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAdd = async () => {
    if (!newProduct.title || newProduct.price <= 0) return;
    setSaving(true);
    const result = await addStoreProduct(newProduct);
    if (result.success) {
      showSuccess('Product added successfully');
      setAdding(false);
      setNewProduct(EMPTY_PRODUCT);
      await loadProducts();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editing?.id) return;
    setSaving(true);
    const { id, createdAt, updatedAt, ...data } = editing;
    const result = await updateStoreProduct(id, data);
    if (result.success) {
      showSuccess('Product updated successfully');
      setEditing(null);
      await loadProducts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return;
    const result = await deleteStoreProduct(id);
    if (result.success) {
      showSuccess('Product deleted');
      setEditing(null);
      await loadProducts();
    }
  };

  const handleToggleActive = async (product: StoreProduct) => {
    if (!product.id) return;
    await updateStoreProduct(product.id, { active: !product.active });
    await loadProducts();
    showSuccess(product.active ? 'Product hidden from store' : 'Product is now live');
  };

  const handleLogout = () => {
    localStorage.removeItem('ogn-admin-auth');
    router.push('/admin');
  };

  if (!isAuthenticated) return null;

  const filtered = products.filter(p => filterType === 'all' || p.type === filterType);

  const ProductForm = ({
    data,
    onChange,
    onSave,
    onCancel,
    saveLabel,
  }: {
    data: any;
    onChange: (d: any) => void;
    onSave: () => void;
    onCancel: () => void;
    saveLabel: string;
  }) => (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-2 border-amber-200">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={data.type}
            onChange={e => onChange({ ...data, type: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
          >
            <option value="book">Book</option>
            <option value="cd">CD / Audio</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={data.price}
            onChange={e => onChange({ ...data, price: parseFloat(e.target.value) || 0 })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={e => onChange({ ...data, title: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
          placeholder="Product title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={data.subtitle}
          onChange={e => onChange({ ...data, subtitle: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
          placeholder="Short subtitle"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={data.description}
          onChange={e => onChange({ ...data, description: e.target.value })}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
          placeholder="Full product description"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={data.author}
            onChange={e => onChange({ ...data, author: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image Path</label>
          <input
            type="text"
            value={data.cover}
            onChange={e => onChange({ ...data, cover: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-amber-500 focus:outline-none"
            placeholder="/images/books/book-1.png"
          />
        </div>
      </div>

      {data.type === 'cd' && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-700 text-sm mb-3 flex items-center gap-2">
            <Disc className="w-4 h-4" /> CD-Specific Fields
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Front Cover</label>
              <input
                type="text"
                value={data.frontCover || ''}
                onChange={e => onChange({ ...data, frontCover: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-none text-sm"
                placeholder="/images/cds/volume-1-front.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Back Cover</label>
              <input
                type="text"
                value={data.backCover || ''}
                onChange={e => onChange({ ...data, backCover: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-none text-sm"
                placeholder="/images/cds/volume-1-back.png"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Number of Tracks</label>
              <input
                type="number"
                value={data.tracks || ''}
                onChange={e => onChange({ ...data, tracks: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Duration</label>
              <input
                type="text"
                value={data.duration || ''}
                onChange={e => onChange({ ...data, duration: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-none text-sm"
                placeholder="2h 39m"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bundle Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={data.bundlePrice || ''}
                onChange={e => onChange({ ...data, bundlePrice: parseFloat(e.target.value) || undefined })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-500 focus:outline-none text-sm"
                placeholder="100"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={data.preOrder}
            onChange={e => onChange({ ...data, preOrder: e.target.checked })}
            className="w-4 h-4 text-amber-500 rounded"
          />
          <span className="text-sm text-gray-700">Pre-Order</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={data.active}
            onChange={e => onChange({ ...data, active: e.target.checked })}
            className="w-4 h-4 text-amber-500 rounded"
          />
          <span className="text-sm text-gray-700">Active (visible on store)</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving || !data.title || data.price <= 0}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white px-6 py-2.5 rounded-xl font-medium transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saveLabel}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl transition-colors"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-amber-400">OGN Admin</h1>
          <p className="text-gray-400 text-sm">Store Manager</p>
        </div>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/store" className="flex items-center gap-3 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Package className="w-5 h-5" /> Store Manager
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <ShoppingBag className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full rounded-xl transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Success Toast */}
        {successMsg && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
            <Check className="w-5 h-5" /> {successMsg}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Store Manager</h1>
            <p className="text-gray-500">Add, edit, and remove products from the store. Changes go live immediately.</p>
          </div>
          <button
            onClick={() => { setAdding(true); setEditing(null); setNewProduct(EMPTY_PRODUCT); }}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {/* Add Form */}
        {adding && (
          <ProductForm
            data={newProduct}
            onChange={setNewProduct}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
            saveLabel="Add Product"
          />
        )}

        {/* Edit Form */}
        {editing && (
          <ProductForm
            data={editing}
            onChange={setEditing}
            onSave={handleUpdate}
            onCancel={() => setEditing(null)}
            saveLabel="Save Changes"
          />
        )}

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          {(['all', 'book', 'cd'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterType === t
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {t === 'all' ? 'All Products' : t === 'book' ? 'Books' : 'CDs'}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Loader2 className="w-8 h-8 text-gray-300 mx-auto mb-2 animate-spin" />
            <p className="text-gray-400">Loading products from Firebase...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No products yet</p>
            <p className="text-gray-400 text-sm">Click "Add Product" to create your first product.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filtered.map(product => (
                <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  {/* Type Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    product.type === 'cd' ? 'bg-purple-100' : 'bg-amber-100'
                  }`}>
                    {product.type === 'cd' ? <Disc className="w-5 h-5 text-purple-600" /> : <BookOpen className="w-5 h-5 text-amber-600" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                      {!product.active && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>
                      )}
                      {product.preOrder && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pre-Order</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{product.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 capitalize">{product.type}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActive(product)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      title={product.active ? 'Hide from store' : 'Make visible'}
                    >
                      {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditing(product); setAdding(false); }}
                      className="p-2 text-gray-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => product.id && handleDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{products.filter(p => p.active).length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Books</p>
            <p className="text-2xl font-bold text-amber-600">{products.filter(p => p.type === 'book').length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">CDs</p>
            <p className="text-2xl font-bold text-purple-600">{products.filter(p => p.type === 'cd').length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
