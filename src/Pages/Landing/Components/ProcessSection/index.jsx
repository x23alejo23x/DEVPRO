import { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { processSteps } from "../../../../data/process";
import SectionReveal from "../../../../animations/SectionReveal";

export default function ProcessSection() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  // La barra para exactamente en el centro del dot del paso hovered
  // Cada columna ocupa 100/6 = 16.67%. El dot del col i está a i * 16.67% desde col 0.
  const lineWidth =
    hovered !== null ? `${(hovered / processSteps.length) * 100}%` : "0%";

  return (
    <section id="proceso" className="py-32 bg-[#09090b] overflow-hidden">
      <SectionReveal>
        <div className="w-full px-4 lg:px-6">
          {/* Header */}
          <div className="mb-20 text-center">
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

          {/* Timeline + Cards */}
          <div ref={containerRef}>
            {/* ── Línea + números sobre la misma grilla que las cards ── */}
            <div className="relative hidden md:block mb-6">
              {/* Línea: usa el mismo grid para que los números queden exactos */}
              <div
                className="grid grid-cols-6 gap-6 relative"
                style={{ height: 48 }}
              >
                {/* Línea base — de centro del col-1 al centro del col-6 */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 bg-white/8"
                  style={{
                    left: "8.33%",
                    right: "8.33%",
                    height: 3,
                    borderRadius: 99,
                  }}
                />

                {/* Naranja de progreso */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 origin-left"
                  animate={{ width: lineWidth }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    left: "8.33%",
                    height: 3,
                    borderRadius: 99,
                    background: "linear-gradient(to right, #F97316, #F97316cc)",
                    maxWidth: "83.34%",
                  }}
                />

                {/* Números: uno por columna, centrado */}
                {processSteps.map((_, i) => {
                  const lit = hovered !== null && i <= hovered;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center relative z-10"
                    >
                      <motion.div
                        animate={{
                          background: lit ? "#F97316" : "#111113",
                          borderColor: lit
                            ? "#F97316"
                            : "rgba(255,255,255,0.15)",
                          color: lit ? "#ffffff" : "#52525b",
                          boxShadow:
                            hovered === i
                              ? "0 0 16px 5px rgba(249,115,22,0.55)"
                              : "none",
                          scale: hovered === i ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border select-none"
                      >
                        {i + 1}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Cards con dot centrado arriba ── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {processSteps.map((step, i) => {
                const Icon = Icons[step.icon] || Icons.Circle;
                const isHovered = hovered === i;
                const lit = hovered !== null ? i <= hovered : false;

                return (
                  <motion.div
                    key={step.id}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    whileHover={{ y: -3 }}
                    animate={{
                      borderColor: isHovered
                        ? "rgba(249,115,22,0.5)"
                        : "rgba(255,255,255,0.06)",
                      boxShadow: isHovered
                        ? "0 0 30px rgba(249,115,22,0.12)"
                        : "none",
                    }}
                    className="relative rounded-xl border bg-[#111113] cursor-default"
                    style={{ padding: "20px 16px" }}
                  >
                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(ellipse at top left,rgba(249,115,22,0.06),transparent 65%)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    <div className="relative flex flex-col gap-0">
                      {/* Número + ícono */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black font-mono select-none"
                          style={{ color: isHovered ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.22)" }}>
                          {String(i+1).padStart(2,"0")}
                        </span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                          isHovered ? "bg-orange-500/20 border border-orange-500/30" : "bg-white/5 border border-white/8"
                        }`}>
                          <Icon size={14} className="text-orange-400" />
                        </div>
                      </div>

                      {/* Título grande */}
                      <h3 className="font-bold text-white leading-tight mb-3"
                        style={{ fontSize:"clamp(1rem, 1.3vw, 1.35rem)" }}>
                        {step.title}
                      </h3>

                      {/* Línea */}
                      <div className="w-8 h-px mb-3 transition-colors duration-300"
                        style={{ background: isHovered ? "#F97316" : "rgba(255,255,255,0.15)" }} />

                      {/* Descripción */}
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Hint */}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
