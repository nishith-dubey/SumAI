import BGGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/DemoSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="relative w-full">

        <BGGradient className="from-emerald-500 via-teal-500 to-cyan-500
            opacity-15"/>
      <div className="flex flex-col items-center justify-center">
        <HeroSection/>
        <DemoSection/>
      </div>
      <div className="flex flex-col items-center bg-gray-100">
        <HowItWorksSection/>
      </div>
      {/* 
      <PricingSection/>
      <CTASection/> */}
    </div>
  );
}
