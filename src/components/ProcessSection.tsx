import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Search, Lightbulb, Wrench, BarChart3 } from "lucide-react";

const FloatingShapes = lazy(() => import("@/components/three/FloatingShapes"));

const steps = [
  { icon: Search, num: "01", title: "Analizo tu negocio", desc: "Entiendo tu situación actual y tus objetivos" },
  { icon: Lightbulb, num: "02", title: "Detecto oportunidades", desc: "Identifico las mejoras con mayor impacto" },
  { icon: Wrench, num: "03", title: "Implemento mejoras", desc: "Pongo en marcha las soluciones acordadas" },
  { icon: BarChart3, num: "04", title: "Medimos resultados", desc: "Evaluamos el impacto y seguimos mejorando" },
];

const ProcessSection = () => {
  return (
    <section id="proceso" className="section-padding bg-section-subtle relative overflow-hidden">
      {/* 3D floating shapes background */}
      <Suspense fallback={null}>
        <FloatingShapes count={8} color="#0d9488" />
      </Suspense>

      <div className="max-w-5xl mx-auto relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Cómo trabajo
          </h2>
          <p className="text-muted-foreground text-lg">Un proceso simple y transparente</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              <span className="font-display text-5xl font-bold text-accent/15">{s.num}</span>
              <div className="mt-2">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
