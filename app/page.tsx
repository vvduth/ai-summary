import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Hero */}
      <div className="flex flex-col">
      
      <HeroSection  />
      </div>
      
      <DemoSection />
      {/* pricing */}
      {/* cta  */}
    </div>
  );
}
