import { CheckCircle2 } from "lucide-react";
import FadeInUp from "../../../../animations/FadeInUp";
import SectionTitle from "../../../../Components/UI/SectionTitle";
import { motion } from "framer-motion";
import SectionReveal from "../../../../animations/SectionReveal";

const benefits = [
  "Desarrollo rápido y sin rodeos",
  "Código limpio, documentado y mantenible",
  "Arquitectura diseñada para escalar",
  "Seguridad y buenas prácticas desde el inicio",
  "Soporte continuo post-entrega",
  "Comunicación directa, sin intermediarios",
  "Presupuesto transparente, sin sorpresas",
];

const stats = [
  { value: "+15", label: "Proyectos entregados" },
  { value: "+3",  label: "Años de experiencia" },
  { value: "100%", label: "Entregas a tiempo" },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-[#09090b]">
      <SectionReveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle
              badge="Por qué elegirme"
              title="Por qué trabajar"
              highlight="conmigo"
              center={false}
            />
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <FadeInUp key={b} delay={i * 0.06}>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-orange-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{b}</span>
                  </li>
                </FadeInUp>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <FadeInUp key={stat.label} delay={i * 0.12}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#130820] border border-slate-200 dark:border-purple-900/30 hover:border-orange-500/30 transition-all"
                >
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
      </SectionReveal>
    </section>
  );
}
