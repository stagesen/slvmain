import Team from '@/components/Team';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Hero from "@/components/home/Hero";
import ServiceTypeCards from "@/components/home/ServiceTypeCards";
import CitySelector from "@/components/home/CitySelector";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";
import Testimonials from "@/components/home/Testimonials";
import AIAssistantPreview from "@/components/home/AIAssistantPreview";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Service Type Cards Section */}
      <ServiceTypeCards />

      {/* Featured Facilities Section */}
      <FeaturedFacilities />

      {/* City Selector Section */}
      <CitySelector />

      {/* AI Assistant Preview Section */}
      <AIAssistantPreview minimized={true} />

      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Team Section */}
      <Team />

      {/* Call To Action Section */}
      <CTASection />
    </div>
  );
};

export default Home;
