'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { User, Mail, Phone, MapPin, Home, Send, Heart, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DiscipleshipEnrollPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    howDidYouHear: '',
    prayerRequest: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save enrollment to localStorage for admin panel
    const enrollments = JSON.parse(localStorage.getItem('ogn-discipleship-enrollments') || '[]');
    const newEnrollment = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: 'pending',
    };
    enrollments.push(newEnrollment);
    localStorage.setItem('ogn-discipleship-enrollments', JSON.stringify(enrollments));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to thank you page
    router.push('/discipleship/thank-you');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Begin Your Journey
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enroll in <span className="text-amber-600">Discipleship</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Take the first step into the Kingdom of God. Fill out this form to receive your 
              right hand of fellowship and begin your journey with the Lord.
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Discipleship Enrollment Form</h2>
                  <p className="text-gray-500 text-sm">All fields marked with * are required</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-amber-600" />
                    Mailing Address
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Provide your address to receive your right hand of fellowship materials
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          placeholder="NY"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP/Postal Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                        >
                          <option value="">Select Country</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Kenya">Kenya</option>
                          <option value="South Africa">South Africa</option>
                          <option value="India">India</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Australia">Australia</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option value="Social Media">Social Media</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Friend/Family">Friend or Family Member</option>
                      <option value="Church">Another Church</option>
                      <option value="Online Search">Online Search</option>
                      <option value="Event">Event or Conference</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prayer Request (Optional)
                    </label>
                    <textarea
                      name="prayerRequest"
                      value={formData.prayerRequest}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                      placeholder="Share any prayer requests or how we can support you on your journey..."
                    />
                  </div>
                </div>

                {/* Scripture */}
                <div className="bg-amber-50 rounded-xl p-6 text-center">
                  <p className="text-amber-800 italic mb-2">
                    &quot;Therefore go and make disciples of all nations, baptizing them in the name of the Father 
                    and of the Son and of the Holy Spirit.&quot;
                  </p>
                  <p className="text-amber-600 font-semibold text-sm">— Matthew 28:19</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Enrollment
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to be contacted by our fellowship leaders.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
