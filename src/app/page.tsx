import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PathwayTiles } from '@/components/PathwayTiles';
import { HowItWorks } from '@/components/HowItWorks';
import { ServiceSchedule } from '@/components/ServiceSchedule';
import { EventsCarousel } from '@/components/EventsCarousel';
import { FeaturedVideo } from '@/components/FeaturedVideo';
import { AboutProphet } from '@/components/AboutProphet';
import { GlobalNetwork } from '@/components/GlobalNetwork';
import { BookCarousel } from '@/components/BookCarousel';
import { MinistryGallery } from '@/components/MinistryGallery';
import { Testimonials } from '@/components/Testimonials';
import { GiveSection } from '@/components/GiveSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <ScrollReveal />
      <Navigation />
      <HeroSection />
      <PathwayTiles />
      <HowItWorks />
      <ServiceSchedule />
      <EventsCarousel />
      <FeaturedVideo />
      <AboutProphet />
      <GlobalNetwork />
      <BookCarousel />
      <MinistryGallery />
      <Testimonials />
      <GiveSection />
      <Footer />
    </main>
  );
}
