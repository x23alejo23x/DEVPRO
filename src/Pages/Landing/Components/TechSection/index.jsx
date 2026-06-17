import { motion } from "framer-motion";
import { techGroups } from "../../../../data/technologies";
import SectionTitle from "../../../../Components/UI/SectionTitle";
import FadeInUp from "../../../../animations/FadeInUp";
import SectionReveal from "../../../../animations/SectionReveal";

export default function TechSection() {
  return (
    <SectionReveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Stack"
          title="Stack"
          highlight="tecnológico"
          subtitle="Herramientas de nivel enterprise para construir software que dura y escala."
        />
        <div className="space-y-8">
          {techGroups.map((group, gi) => (
            <FadeInUp key={group.category} delay={gi * 0.1}>
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((tech) => (
                    <motion.span
                      key={tech.name}
                      whileHover={{
                        scale: 1.06,
                        boxShadow: `0 0 14px #F9731640`,
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#130820] text-sm font-medium text-slate-700 dark:text-slate-300 cursor-default transition-all hover:border-orange-500/40"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: tech.color }}
                      />
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
