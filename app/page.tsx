import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Hero */}
      <div className="flex flex-col">
      
      <HeroSection  />
      <DemoSection />
      <HowItWorks />
      </div>
      
     
      <PricingSection />
      {/* cta  */}
    </div>
  );
}
