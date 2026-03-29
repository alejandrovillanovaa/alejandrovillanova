import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
            Tecnología para tu negocio
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground max-w-4xl">
            Ayudo a negocios a atraer más clientes y ahorrar tiempo con{" "}
            <span className="gradient-text">tecnología</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Mejoro tu presencia online y automatizo tareas para que tengas más tiempo para tu negocio.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button variant="accent" size="xl" asChild>
              <a href="#servicios">
                Ver cómo puedo ayudarte
                <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#contacto">Contactar</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
