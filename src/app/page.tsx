import { GridBackground } from "@/components/ui/GridBackground";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { SplitSection } from "@/components/SplitSection";
import { LinkedInNodeGraph } from "@/components/LinkedInNodeGraph";
import { BlinkingTypoSection } from "@/components/BlinkingTypoSection";
import { AboutFlipCard } from "@/components/AboutFlipCard";
import { ArticlesSection } from "@/components/ArticlesSection";
import { CreativeGallery } from "@/components/CreativeGallery";
import { FooterMarquee } from "@/components/FooterMarquee";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#202020]">
      <GridBackground />
      <Navigation />
      
      <div className="flex flex-col">
        <Hero />
        <SplitSection />
        <LinkedInNodeGraph />
        <AboutFlipCard />
        <ArticlesSection />
        <CreativeGallery />
        <FooterMarquee />
        <Footer />
      </div>
    </main>
  );
}
