import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

const ParticleField = lazy(() => import("@/components/three/ParticleField"));

const CtaSection = () => {
  return (
    <section id="contacto" className="section-padding bg-section-dark text-section-dark-foreground relative overflow-hidden">
      {/* 3D particles */}
      <Suspense fallback={null}>
        <ParticleField count={120} color="#14b8a6" speed={0.4} />
      </Suspense>

      <div className="max-w-3xl mx-auto text-center relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Si quieres mejorar tu negocio,{" "}
            <span className="gradient-text">hablemos</span>
          </h2>
          <p className="text-section-dark-foreground/60 text-lg mb-10 max-w-xl mx-auto">
            Sin compromiso. Cuéntame tu situación y vemos juntos cómo puedo ayudarte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" asChild>
              <a href="https://wa.me/34622568843" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" />
                Contactar por WhatsApp
              </a>
            </Button>
            <Button size="xl" className="bg-section-dark-foreground/10 text-section-dark-foreground border border-section-dark-foreground/20 hover:bg-section-dark-foreground/20" asChild>
              <a href="tel:+34622568843">
                <Phone className="mr-2" />
                Llamar
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
