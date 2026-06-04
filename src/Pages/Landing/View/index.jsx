import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import HeroSection from "../Components/HeroSection";
import ServicesSection from "../Components/ServicesSection";
import BenefitsSection from "../Components/BenefitsSection";
import ProcessSection from "../Components/ProcessSection";
import TechSection from "../Components/TechSection";
import ProjectsSection from "../Components/ProjectsSection";
import TestimonialsSection from "../Components/TestimonialsSection";
import CtaSection from "../Components/CtaSection";

export default function LandingView() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <BenefitsSection />
        <ProcessSection />
        <TechSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
