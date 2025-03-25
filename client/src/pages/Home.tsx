import Hero from "@/components/home/Hero";
import ServiceTypeCards from "@/components/home/ServiceTypeCards";
import CitySelector from "@/components/home/CitySelector";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import ResourceSection from "@/components/home/ResourceSection";
import AIAssistantPreview from "@/components/home/AIAssistantPreview";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceTypeCards />
      <CitySelector />
      <FeaturedFacilities />
      <HowItWorks />
      <Testimonials />
      <ResourceSection />
      <AIAssistantPreview />
      <CTASection />
    </div>
  );
};

export default Home;
