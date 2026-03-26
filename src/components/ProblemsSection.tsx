import { motion } from "framer-motion";
import { AlertTriangle, Eye, Clock, Cpu } from "lucide-react";

const problems = [
  { icon: Eye, text: "No destacan en internet" },
  { icon: AlertTriangle, text: "No convierten visitas en clientes" },
  { icon: Clock, text: "Pierden tiempo en tareas manuales" },
  { icon: Cpu, text: "No aprovechan la tecnología" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const ProblemsSection = () => {
  return (
    <section className="section-padding bg-section-dark text-section-dark-foreground">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold mb-4"
        >
          ¿Te suena alguno de estos problemas?
        </motion.h2>
        <p className="text-section-dark-foreground/60 mb-16 text-lg">
          Muchos negocios enfrentan estos desafíos cada día
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4 p-6 rounded-xl border border-section-dark-foreground/10 bg-section-dark-foreground/5 text-left"
            >
              <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <p.icon className="w-6 h-6 text-accent" />
              </div>
              <span className="text-lg font-medium">{p.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
