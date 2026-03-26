import { motion } from "framer-motion";
import { Globe, Instagram, Layout, FileText, MessageSquare, CalendarCheck, Settings, Zap } from "lucide-react";

const growth = [
  { icon: Globe, title: "Optimización de Google Maps" },
  { icon: Instagram, title: "Mejora de perfil de Instagram" },
  { icon: Layout, title: "Creación de páginas web modernas" },
  { icon: FileText, title: "Estrategia básica de contenido" },
];

const automation = [
  { icon: MessageSquare, title: "Automatización de respuestas" },
  { icon: CalendarCheck, title: "Gestión automática de reservas" },
  { icon: Settings, title: "Optimización de procesos" },
  { icon: Zap, title: "Sistemas que ahorran tiempo" },
];

const ServiceCard = ({ icon: Icon, title, i }: { icon: any; title: string; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1, duration: 0.4 }}
    className="flex items-start gap-4 p-5 rounded-xl hover:bg-secondary/80 transition-colors"
  >
    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <span className="text-foreground font-medium pt-2">{title}</span>
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding bg-section-subtle">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            ¿Cómo puedo ayudarte?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Dos áreas clave para hacer crecer tu negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Growth */}
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Crecimiento y visibilidad
            </div>
            <div className="space-y-1">
              {growth.map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} i={i} />
              ))}
            </div>
          </div>

          {/* Automation */}
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Automatización e IA
            </div>
            <div className="space-y-1">
              {automation.map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
