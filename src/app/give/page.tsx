'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Heart, Globe, Users, BookOpen, CheckCircle, CreditCard, Building, Mail, Loader2, Lock } from 'lucide-react';
import Image from 'next/image';

const impactAreas = [
  {
    icon: Globe,
    title: 'Global Missions',
    description: 'Support church planting and discipleship in unreached nations across Africa, Asia, and beyond.',
  },
  {
    icon: Users,
    title: 'Leader Training',
    description: 'Equip house church leaders with resources, mentorship, and ongoing support.',
  },
  {
    icon: BookOpen,
    title: 'Resource Development',
    description: 'Create books, courses, and materials for spiritual growth and discipleship.',
  },
];

const givingOptions = [
  { amount: 25, label: '$25', description: 'Provides study materials for one house church' },
  { amount: 50, label: '$50', description: 'Supports a leader training session' },
  { amount: 100, label: '$100', description: 'Sponsors a new believer\'s discipleship journey' },
  { amount: 250, label: '$250', description: 'Helps launch a new house church' },
  { amount: 500, label: '$500', description: 'Funds a regional leadership summit' },
  { amount: 1000, label: '$1000', description: 'Supports a month of global missions' },
];

export default function GivePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStripeDonation = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount < 1) {
      setError('Please select or enter a donation amount');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use Stripe Payment Link for static site
      // Redirect to Givelify for donations (works without server)
      window.location.href = 'https://giv.li/b5jpv9';
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hearts" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 6 C10 4, 8 2, 6 2 C4 2, 2 4, 2 6 C2 10, 10 14, 10 14 C10 14, 18 10, 18 6 C18 4, 16 2, 14 2 C12 2, 10 4, 10 6" fill="currentColor" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hearts)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Partner With Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Giving Time is Blessing Time
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-6">
              Your generosity fuels the mission. Every gift helps train leaders, 
              plant house churches, and spread the Gospel to the nations.
            </p>
            <p className="text-lg text-white/80 italic max-w-2xl mx-auto">
              "Give, and it will be given to you. A good measure, pressed down, shaken together 
              and running over, will be poured into your lap." — Luke 6:38
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="py-8 bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="max-w-xs">
              <p className="text-gray-700 italic text-sm">"Honor the Lord with your wealth, with the firstfruits of all your crops."</p>
              <p className="text-amber-600 font-medium text-sm mt-1">— Proverbs 3:9</p>
            </div>
            <div className="max-w-xs">
              <p className="text-gray-700 italic text-sm">"Bring the whole tithe into the storehouse... and see if I will not throw open the floodgates of heaven."</p>
              <p className="text-amber-600 font-medium text-sm mt-1">— Malachi 3:10</p>
            </div>
            <div className="max-w-xs">
              <p className="text-gray-700 italic text-sm">"Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously."</p>
              <p className="text-amber-600 font-medium text-sm mt-1">— 2 Corinthians 9:6</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {impactAreas.map((area) => (
              <div key={area.title} className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <area.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                  Make a Difference Today
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  See how your gift impacts the Kingdom
                </p>

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-center">
                    {error}
                  </div>
                )}

                {/* Amount Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {givingOptions.map((option) => (
                    <button
                      key={option.amount}
                      onClick={() => {
                        setSelectedAmount(option.amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 border-2 rounded-xl transition-all text-left ${
                        selectedAmount === option.amount
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className={`text-2xl font-bold transition-colors ${
                        selectedAmount === option.amount ? 'text-amber-600' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or enter a custom amount:</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>

                {/* Stripe Donate Button */}
                <button
                  onClick={handleStripeDonation}
                  disabled={isLoading || (!selectedAmount && !customAmount)}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mb-4"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <><Heart className="w-5 h-5" /> Give {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : 'Now'}</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
                  <Lock className="w-4 h-4" />
                  <span>Secure payment powered by Stripe</span>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-amber-800 text-sm">
                    <strong>Giving is an act of worship.</strong> Your seed sown in faith will produce a harvest of blessings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Other Ways to Give
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer multiple ways to support the mission of Overcomers Global Network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">By Mail</h3>
              <p className="text-gray-600 text-sm">
                Send checks payable to "Overcomers Global Network" to:<br />
                <span className="font-medium">7519 Mentor Ave, Suite A106<br />Painesville, OH 44077</span>
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Bank Transfer</h3>
              <p className="text-gray-600 text-sm">
                Contact our office for wire transfer and direct deposit information.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Venmo</h3>
              <p className="text-gray-600 text-sm">
                Send your gift via Venmo:<br />
                <span className="font-medium text-amber-600">@OvercomersGlobalNetwork</span>
              </p>
            </div>
          </div>

          {/* Givelify Option */}
          <div className="mt-8 max-w-md mx-auto text-center">
            <p className="text-gray-500 text-sm mb-3">You can also give through Givelify:</p>
            <a 
              target="_blank" 
              href="https://giv.li/b5jpv9"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <img 
                src="https://images.givelify.com/PrimaryGiveButton2xImg.png" 
                alt="Give with Givelify" 
                className="h-12 mx-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl text-white/90 italic max-w-3xl mx-auto mb-4">
            "Each of you should give what you have decided in your heart to give, 
            not reluctantly or under compulsion, for God loves a cheerful giver."
          </blockquote>
          <cite className="text-amber-400 font-medium">— 2 Corinthians 9:7</cite>
          
          <div className="mt-10 pt-10 border-t border-white/10">
            <p className="text-white/70 mb-6">Give now and be a blessing</p>
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              <Heart className="w-5 h-5" />
              Give Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
