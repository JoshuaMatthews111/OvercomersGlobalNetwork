'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Package, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update order status in localStorage
    if (sessionId) {
      const orders = JSON.parse(localStorage.getItem('ogn-orders') || '[]');
      const updatedOrders = orders.map((order: any) => {
        // Mark the most recent pending order as paid
        if (order.status === 'pending_payment') {
          return { ...order, status: 'paid', stripeSessionId: sessionId };
        }
        return order;
      });
      localStorage.setItem('ogn-orders', JSON.stringify(updatedOrders));
    }
    setLoading(false);
  }, [sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order. Your payment has been processed successfully.
            </p>

            {/* Order Confirmation */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left">
              <h2 className="font-bold text-gray-900 text-lg mb-6">What happens next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Confirmation Email</h3>
                    <p className="text-gray-600 text-sm">
                      You'll receive an email confirmation with your order details shortly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Order Processing</h3>
                    <p className="text-gray-600 text-sm">
                      We'll prepare your resources and ship them within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scripture */}
            <div className="bg-amber-50 rounded-xl p-6 mb-8">
              <p className="text-amber-800 italic">
                "Give, and it will be given to you. A good measure, pressed down, shaken together 
                and running over, will be poured into your lap."
              </p>
              <p className="text-amber-600 text-sm mt-2 font-medium">— Luke 6:38</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold transition-all"
              >
                Return Home
              </Link>
            </div>

            {/* Support */}
            <p className="text-gray-500 text-sm mt-8">
              Questions about your order? Contact us at{' '}
              <a href="mailto:info@overcomers.org" className="text-amber-600 hover:text-amber-700">
                info@overcomers.org
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
