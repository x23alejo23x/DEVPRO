import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../../../../data/testimonials";

const IOS_SPRING = { type: "spring", stiffness: 300, damping: 28 };

export default function TestimonialsSection() {
  return (
    <section
      className="bg-[#09090b] relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "60px 0" }}
    >
      {/* Glow fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={IOS_SPRING}>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ ...IOS_SPRING, delay: .05 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Testimonios
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3"
            style={{ letterSpacing: "-0.03em", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
            Lo que dicen quienes ya<br />
            <span className="text-orange-400">confiaron en mí</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            Proyectos reales. Clientes reales. Resultados reales.
          </p>
        </motion.div>

        {/* 3 cards horizontales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...IOS_SPRING, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{
                background: i === 1
                  ? "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.04) 100%)"
                  : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: i === 1
                  ? "1px solid rgba(249,115,22,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "28px 24px",
                boxShadow: i === 1
                  ? "0 0 0 1px rgba(249,115,22,0.08), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(249,115,22,0.08)"
                  : "0 8px 32px rgba(0,0,0,0.3)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow superior en card central */}
              {i === 1 && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: "linear-gradient(to right, transparent, rgba(249,115,22,0.6), transparent)",
                }} />
              )}

              {/* Cita + estrellas */}
              <div className="flex items-start justify-between mb-5">
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: i === 1 ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${i === 1 ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Quote size={15} style={{ color: i === 1 ? "#F97316" : "#52525b" }} />
                </div>
                <div className="flex gap-0.5">
                  {[...Array(t.rating || 5)].map((_, j) => (
                    <Star key={j} size={13} className="fill-[#FF9500] text-[#FF9500]" />
                  ))}
                </div>
              </div>

              {/* Texto */}
              <p style={{
                fontSize: 14, color: i === 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
                lineHeight: 1.65, marginBottom: 24,
                fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400, letterSpacing: "-0.01em",
              }}>
                "{t.text}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3">
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: `linear-gradient(135deg, #F97316, #EA580C)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: "#fff",
                    boxShadow: i === 1 ? "0 0 0 2px rgba(249,115,22,0.4)" : "none",
                  }}>
                    {t.initials || t.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div style={{
                    position: "absolute", bottom: -1, right: -1,
                    width: 12, height: 12, borderRadius: "50%",
                    background: "#30D158", border: "2px solid #09090b",
                  }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(249,115,22,0.7)", fontWeight: 500 }}>
                    {t.role} · {t.company}
                  </p>
                </div>
                {i === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ ...IOS_SPRING, delay: .3 }}
                    style={{
                      marginLeft: "auto",
                      padding: "3px 9px", borderRadius: 99,
                      background: "rgba(249,115,22,0.12)",
                      border: "1px solid rgba(249,115,22,0.25)",
                      fontSize: 10, fontWeight: 700, color: "#F97316",
                      letterSpacing: "0.05em",
                    }}>
                    DESTACADO
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-14 mt-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ ...IOS_SPRING, delay: .35 }}
        >
          {[
            { value: "+15", label: "proyectos" },
            { value: "3",   label: "países"    },
            { value: "100%",label: "entregas a tiempo" },
          ].map((s, i) => (
            <motion.div key={s.label} className="text-center"
              whileHover={{ scale: 1.05, y: -2 }} transition={IOS_SPRING}>
              <div style={{
                fontSize: 26, fontWeight: 800, color: "#F97316",
                fontFamily: "-apple-system, sans-serif", letterSpacing: "-0.03em",
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
