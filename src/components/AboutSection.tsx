import { motion } from "framer-motion";
import aboutLogo from "@/assets/about-logo.png";

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center"
        >
          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <img src={aboutLogo} alt="Alejandro Villanova" className="w-56 h-56 rounded-2xl object-contain" />
          </div>

          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sobre mí
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Trabajo ayudando a negocios a crecer con tecnología. Mi objetivo es que consigas más clientes y simplifiques tu día a día.
              </p>
              <p>
                He comenzado trabajando con bares y negocios locales, donde he visto de primera mano cómo pequeñas mejoras pueden marcar una gran diferencia.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
