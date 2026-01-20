'use client';

import { 
  TrendingUp, 
  BookOpen, 
  ChartBar, 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Church,
  Heart,
  Star,
  Sparkles,
  Flame,
  Globe,
  Target,
  Zap,
  Award,
  Diamond,
  Crown,
  Shield,
  Lightbulb,
  Compass,
  Anchor,
  Dove,
  Cross
} from 'lucide-react';

// Alternative icon sets for different themes
const iconSets = {
  professional: [TrendingUp, BookOpen, ChartBar, Trophy],
  spiritual: [Church, Heart, Star, Sparkles],
  modern: [Zap, Target, Globe, Flame],
  elegant: [Crown, Diamond, Award, Shield],
  biblical: [Dove, Cross, Anchor, Compass],
  prophetic: [Lightbulb, Star, Sparkles, Flame]
};

const serviceData = [
  { day: 'Tuesday', title: 'Financial and Personal Wellness Class', time: '6:30 PM EST' },
  { day: 'Wednesday', title: 'Bible Study', time: '6:00 PM EST' },
  { day: 'Thursday', title: 'Financial Class', time: '8:00 PM EST' },
  { day: 'Friday', title: 'Weekly Gathering – Gathering of Champions', time: '2:00 PM EST' }
];

// Design Style 1: Modern Gradient Cards
export function ModernGradientCard({ service, index }: { service: typeof serviceData[0]; index: number }) {
  const gradients = [
    'from-emerald-400 to-emerald-600',
    'from-blue-400 to-blue-600', 
    'from-purple-400 to-purple-600',
    'from-amber-400 to-amber-600'
  ];
  
  const Icon = iconSets.professional[index];
  
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-600 font-bold text-sm uppercase tracking-wide">{service.day}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <Clock className="w-4 h-4" />
            {service.time}
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

// Design Style 2: Spiritual Theme Cards
export function SpiritualThemeCard({ service, index }: { service: typeof serviceData[0]; index: number }) {
  const colors = ['bg-violet-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
  const Icon = iconSets.spiritual[index];
  
  return (
    <div className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-16 h-16 ${colors[index]} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-purple-600 font-bold text-sm uppercase tracking-wide">{service.day}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <Clock className="w-4 h-4" />
            {service.time}
          </div>
        </div>
        <div className="text-purple-400 group-hover:text-purple-600 transition-colors">
          <Heart className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

// Design Style 3: Minimalist Cards
export function MinimalistCard({ service, index }: { service: typeof serviceData[0]; index: number }) {
  const colors = ['text-emerald-600', 'text-blue-600', 'text-purple-600', 'text-amber-600'];
  const Icon = iconSets.modern[index];
  
  return (
    <div className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center ${colors[index]} group-hover:bg-gray-100 transition-colors duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-semibold text-sm uppercase tracking-wide ${colors[index]}`}>{service.day}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-base group-hover:text-gray-700 transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <Clock className="w-4 h-4" />
            {service.time}
          </div>
        </div>
        <div className="text-gray-300 group-hover:text-gray-500 transition-colors">
          <Target className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// Design Style 4: Premium Elegant Cards
export function PremiumElegantCard({ service, index }: { service: typeof serviceData[0]; index: number }) {
  const gradients = [
    'from-emerald-500 via-emerald-600 to-emerald-700',
    'from-blue-500 via-blue-600 to-blue-700',
    'from-purple-500 via-purple-600 to-purple-700', 
    'from-amber-500 via-amber-600 to-amber-700'
  ];
  const Icon = iconSets.elegant[index];
  
  return (
    <div className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
          <Icon className="w-8 h-8 relative z-10" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">{service.day}</span>
          </div>
          <h3 className="font-bold text-white text-lg group-hover:text-amber-100 transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-300 text-sm mt-1">
            <Clock className="w-4 h-4" />
            {service.time}
          </div>
        </div>
        <div className="text-amber-400 group-hover:text-amber-300 transition-colors">
          <Crown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

// Design Style 5: Prophetic School Theme
export function PropheticSchoolCard({ service, index }: { service: typeof serviceData[0]; index: number }) {
  const colors = ['bg-indigo-600', 'bg-purple-600', 'bg-blue-600', 'bg-violet-600'];
  const Icon = iconSets.prophetic[index];
  
  return (
    <div className="group bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full -mr-12 -mb-12 opacity-30"></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-16 h-16 ${colors[index]} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
          <Icon className="w-8 h-8 relative z-10" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-indigo-700 font-bold text-sm uppercase tracking-wide">{service.day}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-800 transition-colors">
            {service.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
            <Clock className="w-4 h-4" />
            {service.time}
          </div>
        </div>
        <div className="text-indigo-500 group-hover:text-indigo-700 transition-colors">
          <Lightbulb className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export const designExamples = {
  modern: ModernGradientCard,
  spiritual: SpiritualThemeCard,
  minimalist: MinimalistCard,
  premium: PremiumElegantCard,
  prophetic: PropheticSchoolCard
};

export const iconExamples = {
  professional: [
    { name: 'TrendingUp', icon: TrendingUp, description: 'Growth & Finance' },
    { name: 'BookOpen', icon: BookOpen, description: 'Study & Learning' },
    { name: 'ChartBar', icon: ChartBar, description: 'Analytics & Progress' },
    { name: 'Trophy', icon: Trophy, description: 'Achievement & Victory' }
  ],
  spiritual: [
    { name: 'Church', icon: Church, description: 'Worship & Community' },
    { name: 'Heart', icon: Heart, description: 'Love & Compassion' },
    { name: 'Star', icon: Star, description: 'Divine Guidance' },
    { name: 'Sparkles', icon: Sparkles, description: 'Glory & Presence' }
  ],
  biblical: [
    { name: 'Dove', icon: Dove, description: 'Holy Spirit' },
    { name: 'Cross', icon: Cross, description: 'Salvation' },
    { name: 'Anchor', icon: Anchor, description: 'Hope & Faith' },
    { name: 'Compass', icon: Compass, description: 'Direction & Purpose' }
  ],
  prophetic: [
    { name: 'Lightbulb', icon: Lightbulb, description: 'Revelation & Insight' },
    { name: 'Flame', icon: Flame, description: 'Fire & Passion' },
    { name: 'Crown', icon: Crown, description: 'Authority & Kingdom' },
    { name: 'Shield', icon: Shield, description: 'Protection & Power' }
  ]
};
