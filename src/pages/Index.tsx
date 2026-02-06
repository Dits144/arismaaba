import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <EventsSection />
      <ArticlesSection />
      <GalleryTeaser />
      <AboutTeaser />
      <CTASection />
    </PublicLayout>
  );
};

export default Index;
