import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { Globe, Users, BookOpen, Heart, Target, Eye } from 'lucide-react';

const leaders = [
  {
    name: 'Prophet Joshua Matthews',
    role: 'Founder & Visionary Leader',
    image: 'https://media.redcircle.com/images/2025/8/7/13/4258076d-a9eb-4eab-ae53-4794b7b3cd36_episode_43_square.jpg',
    bio: 'Called to raise mature believers who walk in freedom, spiritual authority, and authentic relationship with God.',
  },
];

const values = [
  {
    icon: BookOpen,
    title: 'Biblical Foundation',
    description: 'Everything we do is rooted in the Word of God and the pattern of the early church.',
  },
  {
    icon: Users,
    title: 'Authentic Community',
    description: 'We believe in genuine relationships built through intimate home gatherings.',
  },
  {
    icon: Heart,
    title: 'Sacrificial Love',
    description: 'Following Christ means loving others as He loved us — sacrificially and unconditionally.',
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description: 'We are called to make disciples of all nations, reaching every corner of the earth.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
              A Movement of <span className="gold-shimmer">Disciples</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Overcomers Global Network is a global discipleship movement following the 
              pattern of the early church — gathering from home to home, making disciples 
              who make disciples across the nations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop"
                alt="Worship gathering"
                width={800}
                height={600}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To EDUCATE, EQUIP, and EVOLVE all Saints for the advancement of God's Kingdom 
                  through home-to-home discipleship and authentic community.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To see a global network of house churches in every nation, where believers 
                  gather, grow, and multiply — transforming communities and advancing the Kingdom of God.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                How It All Began
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-lg leading-relaxed mb-6">
                Overcomers Global Network was born from a simple yet profound calling: to return 
                to the pattern of the early church described in the Book of Acts. What began as 
                a small gathering in a living room has grown into a global movement spanning 
                over 50 nations.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founders recognized that true discipleship happens best in intimate settings — 
                where believers can share life together, study the Word, pray for one another, 
                and grow in authentic community. This home-to-home model has proven to be 
                remarkably effective in raising up mature disciples who go on to disciple others.
              </p>
              <p className="text-lg leading-relaxed">
                Today, OGN continues to expand as leaders are trained, house churches are planted, 
                and the Gospel advances from nation to nation. We believe the best is yet to come 
                as we remain faithful to the call of making disciples of all nations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Prophet */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/prophet-joshua-matthews.jpg"
                  alt="Prophet Joshua Matthews"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Ministry Images Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://media.npr.org/assets/img/2015/02/22/house-church-2-c3c2d96e9dce562ce03936a9534768bf919eebf5.jpg"
                    alt="House Church Gathering"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://www.gainesville.com/gcdn/authoring/2010/07/24/NTGS/ghows-LK-c8045ea3-c2b2-461e-9d82-41ab054ee2ed-658334eb.jpeg"
                    alt="Community Worship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right - Bio */}
            <div>
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
                About the Prophet
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                Prophet <span className="gold-shimmer">Joshua Matthews</span>
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 space-y-5">
                <p>
                  <strong>Prophet Joshua Matthews</strong> is the founder and visionary leader of <strong>Overcomers Global Network</strong>, 
                  a global discipleship movement committed to raising mature believers who walk in freedom, 
                  spiritual authority, and authentic relationship with God.
                </p>
                <p>
                  Prophet Joshua carries a clear mandate to <strong>establish local assemblies</strong> while also 
                  building a <strong>home-to-home discipleship network</strong>, ensuring believers are not only 
                  connected online but rooted in real spiritual family and community. Through these local 
                  gatherings and house fellowships, believers are nurtured, taught, and empowered to grow in Christ together.
                </p>
                <p>
                  A central focus of Prophet Joshua's ministry is <strong>helping believers break free from the bondage of 
                  religion and tradition</strong>, leading them into truth, liberty, and genuine fellowship with God. 
                  His teaching emphasizes identity in Christ, spiritual maturity, and living by the Spirit rather 
                  than by ritual, performance, or inherited religious systems.
                </p>
                <p>
                  With a warm and welcoming heart, Prophet Joshua ministers with clarity, compassion, and biblical depth—guiding 
                  believers to encounter God personally, understand their purpose, and walk confidently in their calling. 
                  His message is practical, Christ-centered, and designed to transform everyday life, not merely religious activity.
                </p>
                <p>
                  As an author, teacher, and servant to the body of Christ, Prophet Joshua is committed to equipping leaders, 
                  restoring lives, and strengthening the church through sound doctrine, discipleship, and prophetic insight.
                </p>
              </div>

              {/* Ministry Focus */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Author & Teacher</h4>
                  <p className="text-gray-500 text-sm mt-1">Multiple books on Kingdom living</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Discipleship Leader</h4>
                  <p className="text-gray-500 text-sm mt-1">Training disciples globally</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Network Builder</h4>
                  <p className="text-gray-500 text-sm mt-1">50+ nations connected</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Prophetic Ministry</h4>
                  <p className="text-gray-500 text-sm mt-1">Speaking truth with love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking to join a house church or start one in your community, 
            we're here to help you take the next step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/discipleship"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Join a House Church
            </a>
            <a
              href="/connect"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
