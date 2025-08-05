// File: src/pages/Index.tsx

import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { EnginesSection } from "../components/engines-section";
import { ServicesSection } from "../components/services-section";
import { GallerySection } from "../components/gallery-section";
import { AboutSection } from "../components/about-section";
import { Footer } from "../components/footer";
import { useEffect } from "react";

export default function HomePage() {
  // Update page title
  useEffect(() => {
    document.title = "Amber Vintage Performance";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <EnginesSection />
        <ServicesSection />
        <GallerySection />
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
}
