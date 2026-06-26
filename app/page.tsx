"use client";

import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import PricingGrid from "@/components/home/PricingGrid";
import PlatformPreview from "@/components/home/PlatformPreview";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <TrustSection />
      <PricingGrid />
      <PlatformPreview />
      <Footer />
    </main>
  );
}