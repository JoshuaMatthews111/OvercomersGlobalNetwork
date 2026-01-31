import { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Globe, Users, BookOpen, Home, Heart, Star, Shield, Sparkles, ArrowRight, Church, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join Our Network | Overcomers Global Network',
  description: 'Join the Overcomers Global Network - a worldwide family of believers committed to Kingdom advancement. Whether you\'re from another church or seeking a church home, you\'re welcome here.',
};

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
    icon: Heart,
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

const testimonials = [
  {
    quote: "Joining the Overcomers Network transformed my walk with God. The discipleship and community have been incredible.",
    name: "Pastor Michael",
    location: "Lagos, Nigeria",
  },
  {
    quote: "As a pastor of a small church, connecting with this network has given us resources and support we never had before.",
    name: "Rev. Sarah",
    location: "London, UK",
  },
  {
    quote: "Starting a house church through OGN was the best decision. The training and ongoing support made it possible.",
    name: "David & Maria",
    location: "Houston, USA",
  },
];

export default function JoinNetworkPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Welcome to the Family
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join the <span className="text-amber-600">Overcomers</span> Global Network
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Whether you&apos;re a pastor looking to connect your church, an individual seeking deeper discipleship, 
              or someone interested in starting a house church — you&apos;re welcome here. We are one body in Christ.
            </p>
            
            {/* One Body in Christ Message */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
              <Church className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-3">One Body in Christ</h2>
              <p className="text-amber-100 mb-4">
                We welcome believers from all backgrounds and churches. Our network is not about replacing 
                your local church — it&apos;s about connecting, equipping, and supporting the global body of Christ.
              </p>
              <p className="text-amber-200 text-sm italic">
                &quot;For just as the body is one and has many members... so it is with Christ.&quot; — 1 Corinthians 12:12
              </p>
            </div>

            <Link
              href="/discipleship/enroll"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg"
            >
              Join the Network Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Why Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Benefits of Joining Our Network
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When you join the Overcomers Global Network, you become part of a worldwide family 
              committed to Kingdom advancement and spiritual growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {networkBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
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

      {/* Who Can Join */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Open to All
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                Who Can Join?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Church className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Churches & Pastors</h3>
                <p className="text-gray-600 text-sm">
                  Connect your church to our global network. Access resources, training, and support 
                  while maintaining your local identity.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Individual Believers</h3>
                <p className="text-gray-600 text-sm">
                  Whether you attend another church or are seeking a church home, 
                  join for discipleship, mentorship, and community.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">House Church Leaders</h3>
                <p className="text-gray-600 text-sm">
                  Start a house church in your home or join an existing one. 
                  We provide training, resources, and ongoing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              What Our Network Says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-700 italic mb-6">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to You</h2>
            <p className="text-amber-100 text-lg mb-8">
              When you join our network, we commit to supporting your spiritual journey every step of the way.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-10">
              {[
                'Our team will be praying for you',
                'We\'ll reach out to check on you regularly',
                'Personalized guidance for your journey',
                'Access to all network resources',
                'Connection to believers worldwide',
                'Welcome to the family!',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-200 flex-shrink-0" />
                  <span className="text-amber-50">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/discipleship/enroll"
              className="inline-flex items-center gap-2 bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg"
            >
              Join the Network Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Questions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  q: 'Do I have to leave my current church to join?',
                  a: 'Absolutely not! Our network is designed to complement, not replace, your local church. Many of our members actively serve in their local churches while also being part of our global community.',
                },
                {
                  q: 'Is there a cost to join the network?',
                  a: 'Joining the network is completely free. We believe in making discipleship and community accessible to everyone.',
                },
                {
                  q: 'What if I\'m not sure about starting a house church?',
                  a: 'That\'s perfectly fine! You can join simply for discipleship and community. If you later feel called to start or join a house church, we\'ll be here to support you.',
                },
                {
                  q: 'How will you follow up with me?',
                  a: 'Our team will reach out via email or phone to welcome you, answer questions, and help you get connected. We also do regular check-ins to support your journey.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Family?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step today. Fill out our enrollment form and become part of a 
            global movement of believers advancing the Kingdom together.
          </p>
          <Link
            href="/discipleship/enroll"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
          >
            Join the Overcomers Network
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
