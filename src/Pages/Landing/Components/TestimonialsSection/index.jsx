import { Star } from "lucide-react";
import { testimonials } from "../../../../data/testimonials";
import SectionTitle from "../../../../Components/UI/SectionTitle";
import { StaggerContainer, StaggerItem } from "../../../../animations/StaggerContainer";
import { motion } from "framer-motion";
import SectionReveal from "../../../../animations/SectionReveal";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#09090b]">
      <SectionReveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Testimonios"
          title="Lo que dicen quienes ya"
          highlight="confiaron en mí"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#130820] hover:border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/5"
              >
                <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 dark:text-purple-900/40 leading-none select-none">"</span>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 relative">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 bg-gradient-to-br from-orange-500 to-purple-600"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-[#FFF7ED]">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      </SectionReveal>
    </section>
  );
}
