import HomeHero from "@/components/home/HomeHero";
import HomeStats from "@/components/home/HomeStats";
import HomePricing from "@/components/home/HomePricing";
import HomePlatform from "@/components/home/HomePlatform";
import HomeRules from "@/components/home/HomeRules";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeCTA from "@/components/home/HomeCTA";
import HomeFooter from "@/components/home/HomeFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050509] text-white">
      <HomeHero />
      <HomeStats />
      <HomePricing />
      <HomePlatform />
      <HomeRules />
      <HomeFAQ />
      <HomeCTA />
      <HomeFooter />
    </main>
  );
}