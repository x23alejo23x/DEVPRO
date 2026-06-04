import * as Icons from "lucide-react";
import { processSteps } from "../../../../data/process";
import SectionTitle from "../../../../Components/UI/SectionTitle";
import FadeInUp from "../../../../animations/FadeInUp";
import SectionReveal from "../../../../animations/SectionReveal";

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-24 bg-[#09090b]">
      <SectionReveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Proceso"
          title="¿Cómo trabajamos"
          highlight="juntos?"
          subtitle="Un proceso claro, ordenado y enfocado en resultados. Sin sorpresas, sin rodeos."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => {
            const Icon = Icons[step.icon] || Icons.Circle;
            return (
              <FadeInUp key={step.id} delay={i * 0.08}>
                <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#130820] hover:border-orange-500/30 transition-all group">
                  <span className="absolute top-5 right-5 text-4xl font-black text-slate-100 dark:text-purple-900/60 select-none">
                    {step.id}
                  </span>
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                      <Icon size={20} className="text-orange-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-[#FFF7ED] mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </div>
      </SectionReveal>
    </section>
  );
}
