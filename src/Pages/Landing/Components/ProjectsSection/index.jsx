import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../../../data/projects";
import SectionTitle from "../../../../Components/UI/SectionTitle";
import { StaggerContainer, StaggerItem } from "../../../../animations/StaggerContainer";
import SectionReveal from "../../../../animations/SectionReveal";

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="py-24 bg-[#09090b]">
      <SectionReveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Proyectos"
          title="Proyectos que generan"
          highlight="impacto"
          subtitle="Cada solución, construida para resolver un problema real de negocio."
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#130820] overflow-hidden hover:border-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/5"
              >
                <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1a0a2e] dark:to-[#130820] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-600/5" />
                  <span className="text-4xl font-black text-slate-300 dark:text-purple-900/40 select-none">
                    {project.id.toString().padStart(2, "0")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 to-purple-700/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href="#contacto" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold">
                      Ver detalles <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-[#FFF7ED] mb-2 text-base">{project.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs bg-purple-500/10 text-purple-400 dark:text-purple-300 border border-purple-500/20">
                        {tag}
                      </span>
                    ))}
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
