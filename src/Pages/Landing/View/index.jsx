import Navbar from "../../../Components/Navbar";
import QuoteChat from "../../../Components/QuoteChat";
import Footer from "../../../Components/Footer";
import HeroSection from "../Components/HeroSection";
import ServicesSection from "../Components/ServicesSection";
import ProcessSection from "../Components/ProcessSection";
import ProjectsSection from "../Components/ProjectsSection";
import TestimonialsSection from "../Components/TestimonialsSection";
import CtaSection from "../Components/CtaSection";

export default function LandingView() {
  return (
    <div className="bg-[#09090b]">
      <Navbar />
      <main>
        <div className="snap-section"><HeroSection /></div>
        {/* ServicesSection maneja sus propios snap-sections internamente */}
        <ServicesSection />
        <div className="snap-section"><ProcessSection /></div>
        <div className="snap-section"><ProjectsSection /></div>
        <div className="snap-section"><TestimonialsSection /></div>
        <div className="snap-section"><CtaSection /></div>
      </main>
      <Footer />
      <QuoteChat />
    </div>
  );
}
