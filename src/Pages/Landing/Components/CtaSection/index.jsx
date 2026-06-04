import { ArrowRight, Calendar } from "lucide-react";
import FadeInUp from "../../../../animations/FadeInUp";
import SectionReveal from "../../../../animations/SectionReveal";

export default function CtaSection() {
  return (
    <SectionReveal>
    <section id="contacto" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-purple-700 to-purple-900" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-900/40 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInUp>
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/10 border border-white/20 text-white">
            ¿Tienes un proyecto?
          </span>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            ¿Listo para desarrollar tu próximo proyecto?
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="text-lg text-orange-100 mb-10">
            Cuéntame tu idea y te doy una propuesta sin compromiso en 24 horas.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:tu@email.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-orange-600 font-bold text-sm hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl"
            >
              Solicitar presupuesto <ArrowRight size={16} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            >
              <Calendar size={16} /> Agendar llamada
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
    </SectionReveal>
  );
}
