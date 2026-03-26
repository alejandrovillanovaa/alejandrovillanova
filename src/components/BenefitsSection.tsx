import { motion } from "framer-motion";
import { Users, Award, Clock, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Users, title: "Más clientes", desc: "Atrae más personas interesadas en lo que ofreces" },
  { icon: Award, title: "Mejor imagen profesional", desc: "Destaca frente a tu competencia con una presencia sólida" },
  { icon: Clock, title: "Ahorro de tiempo", desc: "Automatiza lo repetitivo y enfócate en lo importante" },
  { icon: TrendingUp, title: "Negocio más eficiente", desc: "Procesos optimizados que impulsan tu crecimiento" },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Lo que consigues
          </h2>
          <p className="text-muted-foreground text-lg">Resultados reales para tu negocio</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group text-center p-8 rounded-2xl border border-border bg-background hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <b.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
