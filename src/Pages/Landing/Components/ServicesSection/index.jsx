import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { services } from "../../../../data/services";
import ScrollFloat from "../../../../animations/ScrollFloat";
import SectionReveal from "../../../../animations/SectionReveal";
import { StaggerContainer, StaggerItem } from "../../../../animations/StaggerContainer";

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-28 bg-[#09090b] relative overflow-hidden">
      {/* Fade top — fusión con sección anterior */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #09090b, transparent)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/5 blur-[100px] pointer-events-none rounded-full" />

      <SectionReveal>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 relative">
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20"
            >
              Servicios
            </motion.span>

            <ScrollFloat
              containerClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              stagger={0.018}
            >
              ¿Qué puedo hacer por ti?
            </ScrollFloat>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base text-zinc-500 max-w-xl mx-auto"
            >
              Soluciones de software construidas para durar, escalar y resolver problemas reales de negocio.
            </motion.p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = Icons[service.icon] || Icons.Code2;
              return (
                <StaggerItem key={service.id}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="group relative p-7 rounded-2xl border border-white/6 bg-[#111113] hover:border-orange-500/25 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "radial-gradient(ellipse at top left, rgba(249,115,22,0.06), transparent 60%)" }} />
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/15 transition-colors">
                        <Icon size={20} className="text-orange-500" />
                      </div>
                      <h3 className="font-semibold text-white mb-2 text-base">{service.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-5">{service.description}</p>
                      <a href={service.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-400 transition-colors group/link">
                        Saber más <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </SectionReveal>
    </section>
  );
}
