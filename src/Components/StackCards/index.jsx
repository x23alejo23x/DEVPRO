import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Code2, Users, Rocket } from "lucide-react";

const CARD_W = 480; // px fijos de ancho
const CARD_H = 320; // px fijos de alto

const cards = [
  {
    icon: Zap,
    tag: "Velocidad",
    title: "De idea a producción",
    value: "sin meses de espera",
    desc: "Sprints cortos, entregas reales y feedback continuo desde el día uno.",
    color: "#F97316",
  },
  {
    icon: ShieldCheck,
    tag: "Calidad",
    title: "Código que no envejece",
    value: "limpio y mantenible",
    desc: "Arquitectura pensada para que cualquier dev pueda entenderlo y ampliarlo.",
    color: "#a78bfa",
  },
  {
    icon: Clock,
    tag: "Compromiso",
    title: "100% de entregas",
    value: "a tiempo",
    desc: "Fechas reales desde el inicio. Sin excusas, sin sorpresas al final.",
    color: "#34d399",
  },
  {
    icon: Users,
    tag: "Comunicación",
    title: "Trato directo",
    value: "sin intermediarios",
    desc: "Hablas conmigo, no con un project manager que no escribe código.",
    color: "#60a5fa",
  },
  {
    icon: Rocket,
    tag: "Escalabilidad",
    title: "Construido para crecer",
    value: "desde el primer commit",
    desc: "APIs documentadas, módulos desacoplados y despliegue automatizado.",
    color: "#f472b6",
  },
  {
    icon: Code2,
    tag: "Stack",
    title: ".NET + React",
    value: "nivel enterprise",
    desc: "Las mismas tecnologías que usan Netflix, GitHub y Stack Overflow.",
    color: "#F97316",
  },
];

export default function StackCards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = cards.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 4800);
    return () => clearInterval(id);
  }, [total, paused]);

  return (
    /* Contenedor con dimensiones 100% fijas */
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: `${CARD_W}px`,
        height: `${CARD_H + 60}px`,
        flexShrink: 0,
      }}
    >
      {cards.map((card, i) => {
        const offset  = (i - active + total) % total;
        const isActive = offset === 0;
        const isNext   = offset === 1;
        const isNext2  = offset === 2;
        const Icon = card.icon;

        return (
          <motion.div
            key={card.tag}
            onClick={() => setActive(i)}
            animate={{
              y:       isActive ? 0 : isNext ? 14 : isNext2 ? 24 : 30,
              scale:   isActive ? 1 : isNext ? 0.95 : isNext2 ? 0.90 : 0.86,
              opacity: isActive ? 1 : isNext ? 0.65 : isNext2 ? 0.35 : 0,
              zIndex:  isActive ? 10 : isNext ? 7 : isNext2 ? 4 : 0,
              rotateZ: isActive ? 0 : isNext ? -0.8 : isNext2 ? -1.6 : -2,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              cursor: "pointer",
              transformOrigin: "bottom center",
            }}
          >
            {/* Card interior también fijo */}
            <div
              style={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                padding: "24px 32px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "#111113",
                overflow: "hidden",         /* texto largo → oculto, no deforma */
                boxShadow: isActive ? `0 0 40px ${card.color}15` : "none",
                position: "relative",
              }}
            >
              {/* Glow sutil */}
              {isActive && (
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 140, height: 140, borderRadius: "50%",
                  background: card.color, filter: "blur(60px)",
                  opacity: 0.12, pointerEvents: "none",
                }} />
              )}

              {/* Tag + ícono — fila fija */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "4px 10px",
                  borderRadius: 999, border: `1px solid ${card.color}40`,
                  color: card.color, background: `${card.color}12`,
                  whiteSpace: "nowrap",
                }}>
                  {card.tag}
                </span>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${card.color}18`,
                }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
              </div>

              {/* Texto — fijo, sin wrap dinámico */}
              <p style={{ fontSize: 13, color: "#71717a", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {card.title}
              </p>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {card.value}
              </p>
              <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6,
                display: "-webkit-box", WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {card.desc}
              </p>
            </div>
          </motion.div>
        );
      })}

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: 6,
      }}>
        {cards.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            <div style={{
              height: 4, borderRadius: 99,
              width: active === i ? 20 : 6,
              background: active === i ? "#F97316" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }} />
          </button>
        ))}
      </div>
    </div>
  );
}
