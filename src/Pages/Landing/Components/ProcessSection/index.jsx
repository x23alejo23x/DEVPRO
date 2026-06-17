import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { processSteps } from "../../../../data/process";
import SectionReveal from "../../../../animations/SectionReveal";

export default function ProcessSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="proceso" className="py-32 bg-[#09090b] overflow-hidden">
      <SectionReveal>
        <div className="w-full max-w-3xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20"
            >
              Proceso
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              ¿Cómo trabajamos <span className="text-orange-400">juntos?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-zinc-500 max-w-lg mx-auto"
            >
              Un proceso claro, ordenado y enfocado en resultados.
            </motion.p>
          </div>

          {/* Stepper vertical */}
          <div className="relative">
            {/* Línea vertical conectora */}
            <div
              className="absolute left-[27px] top-8 bottom-8 w-px pointer-events-none"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            <div className="flex flex-col gap-3">
              {processSteps.map((step, i) => {
                const Icon = Icons[step.icon] || Icons.Circle;
                const isHovered = hovered === i;
                const isLast = i === processSteps.length - 1;

                return (
                  <motion.div
                    key={step.id}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="relative flex items-start gap-5"
                  >
                    {/* Dot + ícono */}
                    <div className="relative shrink-0 z-10">
                      <motion.div
                        animate={{
                          background: isHovered ? "#F97316" : "#111113",
                          borderColor: isHovered ? "#F97316" : "rgba(255,255,255,0.12)",
                          boxShadow: isHovered ? "0 0 20px 4px rgba(249,115,22,0.4)" : "none",
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                      >
                        <Icon
                          size={20}
                          style={{ color: isHovered ? "#fff" : "#F97316" }}
                        />
                      </motion.div>

                      {/* Conector vertical entre dot y siguiente */}
                      {!isLast && (
                        <motion.div
                          animate={{ background: isHovered ? "#F97316" : "rgba(255,255,255,0.06)" }}
                          transition={{ duration: 0.25 }}
                          className="absolute left-1/2 -translate-x-1/2 w-px"
                          style={{ top: "100%", height: 12 }}
                        />
                      )}
                    </div>

                    {/* Contenido */}
                    <motion.div
                      animate={{
                        borderColor: isHovered ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 rounded-2xl border bg-[#111113] px-6 py-5 overflow-hidden relative"
                    >
                      {/* Glow */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: "radial-gradient(ellipse at left center, rgba(249,115,22,0.07), transparent 70%)",
                          opacity: isHovered ? 1 : 0,
                        }}
                      />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span
                              className="text-xs font-bold font-mono"
                              style={{ color: isHovered ? "#F97316" : "rgba(255,255,255,0.2)" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-bold text-white text-base">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-zinc-500 leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Flecha */}
                        <motion.div
                          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 ml-6 text-orange-400"
                        >
                          <Icons.ArrowRight size={18} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </SectionReveal>
    </section>
  );
}
