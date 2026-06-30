import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { CookieBanner } from "@/legal";
import { SEOHead, OrganizationJsonLd, WebSiteJsonLd } from "@/seo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        description="Ayudo a negocios a atraer más clientes y ahorrar tiempo con tecnología. Presencia online, automatización e inteligencia artificial."
        canonicalUrl="https://alejandrovillanova.com"
        ogType="website"
      />
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      <Navbar />
      <HeroSection />
      <ProblemsSection />
      <ServicesSection />
      <BenefitsSection />
      <ProcessSection />
      <AboutSection />
      <CtaSection />
      <TestimonialsSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
