'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { User, Mail, Phone, MapPin, Home, Send, Heart, BookOpen, Globe, Users, Church, CheckCircle, Star, Shield, Sparkles, HandHeart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const networkBenefits = [
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connect with believers across 50+ nations worldwide',
  },
  {
    icon: BookOpen,
    title: 'Discipleship Training',
    description: 'Comprehensive Kingdom teaching and spiritual growth resources',
  },
  {
    icon: Home,
    title: 'House Church Network',
    description: 'Start or join a house church in your community',
  },
  {
    icon: HandHeart,
    title: 'Prayer Support',
    description: 'Our team will pray for you and check on your journey',
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Personal guidance from experienced leaders',
  },
  {
    icon: Star,
    title: 'Leadership Development',
    description: 'Training to become a Kingdom leader and disciple-maker',
  },
  {
    icon: Shield,
    title: 'Pastoral Care',
    description: 'Regular check-ins and spiritual support',
  },
  {
    icon: Sparkles,
    title: 'Kingdom Resources',
    description: 'Access to teachings, books, and ministry materials',
  },
];

export default function DiscipleshipEnrollPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Church Affiliation
    hasChurch: '',
    churchName: '',
    churchLocation: '',
    pastorName: '',
    attendanceDuration: '',
    reasonsForJoining: [] as string[],
    reasonsOther: '',
    
    // House Church Interest
    houseChurchInterest: '',
    // If starting
    homeOwnership: '',
    spaceCapacity: '',
    preferredTimes: [] as string[],
    leadershipExperience: '',
    callingReason: '',
    // If joining
    preferredLocation: '',
    joinPreferredTimes: [] as string[],
    specificNeeds: '',
    // General
    previousHouseChurch: '',
    fellowshipGoals: '',
    
    // Additional
    howDidYouHear: '',
    prayerRequest: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create comprehensive enrollment object with all details
    const newEnrollment = {
      id: Date.now().toString(),
      enrollmentNumber: `OGN-${Date.now().toString().slice(-8)}`,
      submittedAt: new Date().toISOString(),
      status: 'new',
      
      // Personal Information
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
      },
      
      // Address
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        fullAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
      },
      
      // Church Affiliation
      churchAffiliation: {
        hasChurch: formData.hasChurch,
        churchName: formData.churchName || null,
        churchLocation: formData.churchLocation || null,
        pastorName: formData.pastorName || null,
        attendanceDuration: formData.attendanceDuration || null,
      },
      
      // Reasons for Joining
      reasonsForJoining: {
        selected: formData.reasonsForJoining,
        other: formData.reasonsOther || null,
      },
      
      // House Church Interest
      houseChurch: {
        interest: formData.houseChurchInterest,
        // Starting details
        startingDetails: formData.houseChurchInterest === 'start' ? {
          homeOwnership: formData.homeOwnership,
          spaceCapacity: formData.spaceCapacity,
          preferredTimes: formData.preferredTimes,
          leadershipExperience: formData.leadershipExperience,
          callingReason: formData.callingReason,
        } : null,
        // Joining details
        joiningDetails: formData.houseChurchInterest === 'join' ? {
          preferredLocation: formData.preferredLocation,
          preferredTimes: formData.joinPreferredTimes,
          specificNeeds: formData.specificNeeds,
        } : null,
        // General
        previousExperience: formData.previousHouseChurch,
        fellowshipGoals: formData.fellowshipGoals,
      },
      
      // Additional Info
      howDidYouHear: formData.howDidYouHear,
      prayerRequest: formData.prayerRequest || null,
      
      // Admin tracking fields
      adminNotes: [],
      contactedDate: null,
      assignedTo: null,
      followUpDate: null,
      lastUpdated: new Date().toISOString(),
    };

    // Save enrollment to localStorage
    const enrollments = JSON.parse(localStorage.getItem('ogn-enrollments') || '[]');
    enrollments.unshift(newEnrollment);
    localStorage.setItem('ogn-enrollments', JSON.stringify(enrollments));

    // Send email notification with enrollment details using Formspree
    try {
      await fetch('https://formspree.io/f/xpwzgvkn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New OGN Enrollment: ${newEnrollment.personalInfo.fullName}`,
          enrollmentNumber: newEnrollment.enrollmentNumber,
          name: newEnrollment.personalInfo.fullName,
          email: newEnrollment.personalInfo.email,
          phone: newEnrollment.personalInfo.phone,
          address: newEnrollment.address.fullAddress,
          churchAffiliation: newEnrollment.churchAffiliation.hasChurch,
          churchName: newEnrollment.churchAffiliation.churchName || 'N/A',
          houseChurchInterest: newEnrollment.houseChurch.interest,
          reasonsForJoining: newEnrollment.reasonsForJoining.selected.join(', '),
          prayerRequest: newEnrollment.prayerRequest || 'None',
          submittedAt: newEnrollment.submittedAt,
          // Full JSON for reference
          fullData: JSON.stringify(newEnrollment, null, 2),
        }),
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }

    // Redirect to thank you page
    router.push('/discipleship/thank-you');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const currentValues = formData[name as keyof typeof formData] as string[];
      if (checked) {
        setFormData({ ...formData, [name]: [...currentValues, value] });
      } else {
        setFormData({ ...formData, [name]: currentValues.filter(v => v !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    const currentValues = formData[name as keyof typeof formData] as string[];
    if (checked) {
      setFormData({ ...formData, [name]: [...currentValues, value] });
    } else {
      setFormData({ ...formData, [name]: currentValues.filter(v => v !== value) });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Join Our Global Family
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join the <span className="text-amber-600">Overcomers Network</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Whether you&apos;re part of a local fellowship or another church, we welcome you! 
              We are one body in Christ. Take the first step to connect with our global family.
            </p>
            
            {/* One Body in Christ Message */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <Church className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <p className="text-lg font-medium mb-2">One Body in Christ</p>
              <p className="text-amber-100 text-sm">
                &quot;For just as the body is one and has many members... so it is with Christ. 
                For in one Spirit we were all baptized into one body.&quot;
              </p>
              <p className="text-amber-200 text-xs mt-2">— 1 Corinthians 12:12-13</p>
            </div>
          </div>
        </div>
      </section>

      {/* Network Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Joining Our Network</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When you join the Overcomers Global Network, you become part of a worldwide family 
              committed to Kingdom advancement and spiritual growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {networkBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
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

                {/* Church Affiliation Section */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Church className="w-5 h-5 text-amber-600" />
                    Church Affiliation
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    We welcome everyone! Whether you&apos;re part of another church or seeking a church home, 
                    you&apos;re welcome here. We are one body in Christ.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Are you currently part of a local church or fellowship? *
                      </label>
                      <div className="space-y-2">
                        {['Yes, I attend a church', 'No, I\'m looking for a church home', 'Not currently attending'].map((option) => (
                          <label key={option} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-amber-300 transition-colors">
                            <input
                              type="radio"
                              name="hasChurch"
                              value={option}
                              checked={formData.hasChurch === option}
                              onChange={(e) => handleRadioChange('hasChurch', e.target.value)}
                              className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                              required
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Show church details if they attend a church */}
                    {formData.hasChurch === 'Yes, I attend a church' && (
                      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                        <p className="text-sm text-amber-700 font-medium">
                          That&apos;s wonderful! We&apos;d love to know more about your church family.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Church/Fellowship Name
                            </label>
                            <input
                              type="text"
                              name="churchName"
                              value={formData.churchName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                              placeholder="e.g., Grace Community Church"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Church Location
                            </label>
                            <input
                              type="text"
                              name="churchLocation"
                              value={formData.churchLocation}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                              placeholder="City, State/Country"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Pastor/Leader Name (Optional)
                            </label>
                            <input
                              type="text"
                              name="pastorName"
                              value={formData.pastorName}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                              placeholder="Pastor John Smith"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              How long have you been attending?
                            </label>
                            <select
                              name="attendanceDuration"
                              value={formData.attendanceDuration}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                            >
                              <option value="">Select duration</option>
                              <option value="Less than 6 months">Less than 6 months</option>
                              <option value="6-12 months">6-12 months</option>
                              <option value="1-2 years">1-2 years</option>
                              <option value="2-5 years">2-5 years</option>
                              <option value="5+ years">5+ years</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reasons for Joining */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    What Brings You to Our Network?
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Select all that apply - we want to serve you better!
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Seeking deeper discipleship',
                      'Want to start a house church',
                      'Want to join a house church',
                      'Interested in Prophet Joshua\'s teachings',
                      'Looking for mentorship',
                      'Desire to serve in ministry',
                      'Need prayer support',
                      'Want to connect globally',
                    ].map((reason) => (
                      <label key={reason} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-amber-300 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.reasonsForJoining.includes(reason)}
                          onChange={(e) => handleCheckboxChange('reasonsForJoining', reason, e.target.checked)}
                          className="w-4 h-4 text-amber-500 focus:ring-amber-500 rounded"
                        />
                        <span className="text-gray-700 text-sm">{reason}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other reasons (please specify)
                    </label>
                    <input
                      type="text"
                      name="reasonsOther"
                      value={formData.reasonsOther}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                </div>

                {/* House Church Interest Section */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Home className="w-5 h-5 text-amber-600" />
                    House Church Interest
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    House churches are at the heart of our network - intimate gatherings where believers 
                    grow together in faith, fellowship, and discipleship.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Are you interested in house church ministry? *
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'start', label: 'Yes, I want to START a house church in my home', icon: '🏠' },
                          { value: 'join', label: 'Yes, I want to JOIN an existing house church', icon: '👥' },
                          { value: 'learn', label: 'I want to learn more first', icon: '📖' },
                          { value: 'not-now', label: 'Not at this time', icon: '⏳' },
                        ].map((option) => (
                          <label key={option.value} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.houseChurchInterest === option.value ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                            <input
                              type="radio"
                              name="houseChurchInterest"
                              value={option.value}
                              checked={formData.houseChurchInterest === option.value}
                              onChange={(e) => handleRadioChange('houseChurchInterest', e.target.value)}
                              className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                              required
                            />
                            <span className="text-xl">{option.icon}</span>
                            <span className="text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Starting a House Church - Additional Questions */}
                    {formData.houseChurchInterest === 'start' && (
                      <div className="bg-amber-50 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-2 text-amber-800 font-medium">
                          <Sparkles className="w-5 h-5" />
                          Amazing! We&apos;re excited to help you start a house church!
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Do you own or rent your home? *
                            </label>
                            <select
                              name="homeOwnership"
                              value={formData.homeOwnership}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none bg-white"
                            >
                              <option value="">Select option</option>
                              <option value="Own">I own my home</option>
                              <option value="Rent">I rent</option>
                              <option value="Other">Other arrangement</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              How many people can your space accommodate? *
                            </label>
                            <select
                              name="spaceCapacity"
                              value={formData.spaceCapacity}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none bg-white"
                            >
                              <option value="">Select capacity</option>
                              <option value="5-10">5-10 people</option>
                              <option value="10-15">10-15 people</option>
                              <option value="15-20">15-20 people</option>
                              <option value="20+">20+ people</option>
                              <option value="Not sure">Not sure yet</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred meeting days/times (select all that apply)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Weekday evenings', 'Weekend mornings', 'Weekend afternoons', 'Weekend evenings', 'Flexible'].map((time) => (
                              <label key={time} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-amber-300">
                                <input
                                  type="checkbox"
                                  checked={formData.preferredTimes.includes(time)}
                                  onChange={(e) => handleCheckboxChange('preferredTimes', time, e.target.checked)}
                                  className="w-4 h-4 text-amber-500 focus:ring-amber-500 rounded"
                                />
                                <span className="text-sm text-gray-700">{time}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Do you have any leadership or ministry experience?
                          </label>
                          <textarea
                            name="leadershipExperience"
                            value={formData.leadershipExperience}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none bg-white"
                            placeholder="Share any relevant experience (it's okay if you don't have any!)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Why do you feel called to start a house church? *
                          </label>
                          <textarea
                            name="callingReason"
                            value={formData.callingReason}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none bg-white"
                            placeholder="Share your heart and vision..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Joining a House Church - Additional Questions */}
                    {formData.houseChurchInterest === 'join' && (
                      <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-2 text-blue-800 font-medium">
                          <Users className="w-5 h-5" />
                          Great! We&apos;ll help connect you with a house church near you!
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred location/area *
                          </label>
                          <input
                            type="text"
                            name="preferredLocation"
                            value={formData.preferredLocation}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none bg-white"
                            placeholder="City, neighborhood, or region"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred meeting times (select all that apply)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Weekday evenings', 'Weekend mornings', 'Weekend afternoons', 'Weekend evenings', 'Flexible'].map((time) => (
                              <label key={time} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-amber-300">
                                <input
                                  type="checkbox"
                                  checked={formData.joinPreferredTimes.includes(time)}
                                  onChange={(e) => handleCheckboxChange('joinPreferredTimes', time, e.target.checked)}
                                  className="w-4 h-4 text-amber-500 focus:ring-amber-500 rounded"
                                />
                                <span className="text-sm text-gray-700">{time}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Any specific needs or preferences?
                          </label>
                          <textarea
                            name="specificNeeds"
                            value={formData.specificNeeds}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none bg-white"
                            placeholder="e.g., family-friendly, young adults, specific language, etc."
                          />
                        </div>
                      </div>
                    )}

                    {/* General House Church Questions */}
                    {(formData.houseChurchInterest === 'start' || formData.houseChurchInterest === 'join' || formData.houseChurchInterest === 'learn') && (
                      <div className="space-y-4 pt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Have you attended a house church before?
                          </label>
                          <div className="flex gap-4">
                            {['Yes', 'No'].map((option) => (
                              <label key={option} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="previousHouseChurch"
                                  value={option}
                                  checked={formData.previousHouseChurch === option}
                                  onChange={(e) => handleRadioChange('previousHouseChurch', e.target.value)}
                                  className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                                />
                                <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            What are you hoping to gain from house church fellowship?
                          </label>
                          <textarea
                            name="fellowshipGoals"
                            value={formData.fellowshipGoals}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                            placeholder="Share your hopes and expectations..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-6 border-t border-gray-100">
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
                      <option value="Social Media">Social Media (Facebook, Instagram, etc.)</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Friend/Family">Friend or Family Member</option>
                      <option value="Another Church">Another Church</option>
                      <option value="Online Search">Online Search</option>
                      <option value="Event">Event or Conference</option>
                      <option value="Prophet Joshua Ministry">Prophet Joshua&apos;s Ministry</option>
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
                      placeholder="Share any prayer requests - our team will be praying for you..."
                    />
                  </div>
                </div>

                {/* Our Commitment Section */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <HandHeart className="w-5 h-5" />
                    Our Commitment to You
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Our team will be praying for you',
                      'We\'ll reach out to check on you',
                      'Personalized guidance for your journey',
                      'Welcome to the family!',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-200 flex-shrink-0" />
                        <span className="text-amber-50 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scripture */}
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-700 italic mb-2">
                    &quot;And they devoted themselves to the apostles&apos; teaching and the fellowship, 
                    to the breaking of bread and the prayers.&quot;
                  </p>
                  <p className="text-amber-600 font-semibold text-sm">— Acts 2:42</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-amber-300 disabled:to-orange-300 text-white py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Your Enrollment...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Join the Network
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to be contacted by our fellowship leaders. 
                  We&apos;ll reach out to welcome you and support your journey.
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
