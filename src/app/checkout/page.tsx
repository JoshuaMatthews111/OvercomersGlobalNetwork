'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ShoppingBag, Heart, CheckCircle, ArrowRight, BookOpen, Loader2, CreditCard, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  cover: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [step, setStep] = useState(1);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cart = localStorage.getItem('ogn-cart');
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Save order to localStorage first
      const orderId = Date.now();
      const orders = JSON.parse(localStorage.getItem('ogn-orders') || '[]');
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        customer: formData,
        items: cartItems,
        total: total,
        status: 'pending_payment',
      };
      orders.push(newOrder);
      localStorage.setItem('ogn-orders', JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem('ogn-cart');

      // Redirect to Stripe checkout
      window.location.href = 'https://buy.stripe.com/3cI3cw5xM5Hj3VLbg5co000';
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderSubmitted) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Browse our resources and add items to your cart.</p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Browse Resources
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (orderSubmitted) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Submitted!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your order. To complete your purchase, please make a donation 
                of <strong className="text-amber-600">${total.toFixed(2)}</strong> through Givelify.
              </p>
              
              <div className="bg-amber-50 rounded-2xl p-8 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Complete Your Payment</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Your donation covers the cost of materials, production, and shipping. 
                  Click below to complete your gift through our secure Givelify platform.
                </p>
                <a 
                  target="_blank" 
                  href="https://giv.li/b5jpv9"
                  className="inline-block hover:opacity-90 transition-opacity"
                >
                  <img 
                    src="https://images.givelify.com/PrimaryGiveButton2xImg.png" 
                    alt="Give with Givelify" 
                    className="h-14 mx-auto"
                  />
                </a>
                <p className="text-gray-500 text-xs mt-4">
                  Please include your name and "Book Order" in the memo/notes field.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="text-gray-500">Email:</span> {formData.email}</p>
                  <p><span className="text-gray-500">Shipping:</span> {formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold mt-8"
              >
                Return to Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600 mb-8">Complete your order to receive your resources</p>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-12">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}>1</div>
                <span className="font-medium">Review</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 rounded">
                <div className={`h-full bg-amber-500 rounded transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}>2</div>
                <span className="font-medium">Shipping</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 rounded">
                <div className={`h-full bg-amber-500 rounded transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}>3</div>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={item.cover} alt={item.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                            <p className="text-amber-600 font-bold mt-2">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-500 text-sm">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-700 text-sm">
                            <strong>Your donation covers the cost</strong> of materials, production, and shipping 
                            for these resources. Thank you for supporting the ministry!
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition-all"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          required
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        required
                      />
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          name="zip"
                          placeholder="ZIP Code"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          required
                        />
                      </div>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:border-gray-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-semibold transition-all"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Complete Your Order</h2>
                    
                    {error && (
                      <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6">
                        {error}
                      </div>
                    )}

                    <div className="bg-amber-50 rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-2">Secure Checkout</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Your contribution of <strong className="text-amber-600">${total.toFixed(2)}</strong> covers 
                            the cost of materials, production, and shipping for your resources. This helps us 
                            continue creating content that advances the Kingdom.
                          </p>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Lock className="w-4 h-4" />
                            <span>Secure payment powered by Stripe</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Shipping To:</h4>
                      <p className="text-gray-600 text-sm">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zip}<br />
                        {formData.country}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(2)}
                        disabled={isLoading}
                        className="flex-1 border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:border-gray-300 transition-all disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleStripeCheckout}
                        disabled={isLoading}
                        className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                        ) : (
                          <><CreditCard className="w-5 h-5" /> Pay ${total.toFixed(2)}</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32">
                  <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.title} x{item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600">Included</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Donation</span>
                      <span className="text-amber-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      <span>Secure checkout powered by Stripe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
