import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import ButtonPrimary from "../../../../Components/UI/ButtonPrimary";
import ButtonOutline from "../../../../Components/UI/ButtonOutline";
import SplitText from "../../../../animations/SplitText";
import RotatingText from "../../../../animations/RotatingText";
import AuroraBackground from "../../../../animations/AuroraBackground";
import LaptopMockup from "../../../../Components/LaptopMockup";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#09090b]">
      <AuroraBackground />

      {/* Grid de puntos */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff14 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Layout: dos columnas fijas 50/50 */}
      <div className="relative w-full max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-center gap-0">
          {/* ── COLUMNA IZQUIERDA — fija 50% ── */}
          <div style={{ width: "50%", flexShrink: 0, paddingRight: "4rem" }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-medium tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Acepto proyectos · {new Date().getFullYear()}
            </motion.div>

            {/* Línea 1 */}
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight mb-1 text-white whitespace-nowrap">
              <SplitText
                text="Convierto ideas en"
                delay={0.1}
                stagger={0.05}
                wordClass="text-white"
              />
            </h1>

            {/* Línea 2 — rotating */}
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight mb-1 flex items-center gap-x-3 whitespace-nowrap">
              <span className="text-white shrink-0">soluciones de</span>
              <span
                className="inline-flex items-center px-4 rounded-xl"
                style={{
                  background: "#F97316",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                <RotatingText
                  words={["software", "APIs", "dashboards", "sistemas", "plataformas"]}
                  interval={2400}
                  stagger={0.04}
                  letterClass="text-white"
                />
              </span>
            </h1>

            {/* Línea 3 */}
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight mb-8 text-white whitespace-nowrap">
              <SplitText
                text="que duran y escalan"
                delay={0.9}
                stagger={0.04}
                wordClass="text-white"
              />
            </h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-sm text-zinc-400 leading-relaxed mb-8"
              style={{ maxWidth: 380 }}
            >
              Sin agencias, sin intermediarios, sin código genérico. Trabajo
              contigo directo — entiendo tu negocio y construyo exactamente lo
              que necesitas.
            </motion.p>

            {/* Botones */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.25 }}
              className="flex gap-3 mb-8"
            >
              <ButtonPrimary href="#contacto">
                Solicitar cotización <ArrowRight size={14} />
              </ButtonPrimary>
              <ButtonOutline href="#proyectos">Ver proyectos</ButtonOutline>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="flex items-center gap-2"
            ></motion.div>
          </div>

          {/* ── COLUMNA DERECHA — fija 50% ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              width: "50%",
              flexShrink: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="hidden lg:flex"
          >
            <LaptopMockup />
          </motion.div>
        </div>
      </div>
      {/* Fade bottom — fusión con la siguiente sección */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #09090b)" }} />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest uppercase text-zinc-600">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  );
}
