import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Mini dashboard que se ve dentro de la pantalla ── */
function DashboardScreen() {
  const bars = [65, 80, 45, 90, 70, 55, 85];

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0d0d0f",
      display: "flex", flexDirection: "column",
      fontFamily: "system-ui, sans-serif",
      overflow: "hidden",
      userSelect: "none",
    }}>

      {/* Top bar */}
      <div style={{
        height: 36, background: "#111113",
        borderBottom: "1px solid #ffffff0f",
        display: "flex", alignItems: "center",
        padding: "0 14px", gap: 8, flexShrink: 0,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F97316" }} />
        <div style={{ width: 60, height: 5, borderRadius: 4, background: "#ffffff10" }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 44, height: 5, borderRadius: 4, background: "#ffffff08" }} />
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "#F9731620", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F97316" }} />
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Sidebar */}
        <div style={{
          width: 48, background: "#111113",
          borderRight: "1px solid #ffffff0a",
          display: "flex", flexDirection: "column",
          alignItems: "center", padding: "10px 0", gap: 8, flexShrink: 0,
        }}>
          {["#F97316", "#ffffff20", "#ffffff20", "#ffffff20"].map((c, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: 8,
              background: c === "#F97316" ? "#F9731618" : c,
              border: c === "#F97316" ? "1px solid #F9731640" : "none",
            }} />
          ))}
        </div>

        {/* Contenido */}
        <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>

          {/* Título */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: 80, height: 7, borderRadius: 4, background: "#ffffff18" }} />
            <div style={{ width: 50, height: 20, borderRadius: 6, background: "#F9731622", border: "1px solid #F9731640" }} />
          </div>

          {/* Métrica cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Proyectos", val: "24", color: "#F97316" },
              { label: "Clientes",  val: "12", color: "#a78bfa" },
              { label: "APIs",      val: "8",  color: "#34d399" },
            ].map((m) => (
              <div key={m.label} style={{
                background: "#111113", border: "1px solid #ffffff09",
                borderRadius: 8, padding: "8px 10px",
              }}>
                <div style={{ fontSize: 7, color: "#71717a", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Gráfica de barras */}
          <div style={{
            flex: 1, background: "#111113",
            border: "1px solid #ffffff09",
            borderRadius: 8, padding: "10px 12px",
          }}>
            <div style={{ fontSize: 7, color: "#71717a", marginBottom: 8 }}>Actividad semanal</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 50 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%", justifyContent: "flex-end" }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    style={{
                      width: "100%", borderRadius: "3px 3px 0 0",
                      background: i === 3 ? "#F97316" : "#ffffff12",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Lista de items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { name: "API Gateway",      status: "Live",    color: "#34d399" },
              { name: "Dashboard Admin",  status: "En desarrollo", color: "#F97316" },
            ].map((item) => (
              <div key={item.name} style={{
                background: "#111113", border: "1px solid #ffffff09",
                borderRadius: 7, padding: "6px 10px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ fontSize: 8, color: "#e4e4e7" }}>{item.name}</div>
                <div style={{
                  fontSize: 7, color: item.color,
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                  padding: "2px 6px", borderRadius: 99,
                }}>{item.status}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Laptop 3D con parallax ── */
export default function LaptopMockup() {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const W = 620; // ancho laptop
  const SCREEN_W = W - 40;
  const SCREEN_H = SCREEN_W * 0.62;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        width: W, perspective: 1000,
        cursor: "pointer", userSelect: "none",
      }}
    >
      {/* Glow naranja detrás del laptop */}
      <div style={{
        position: "absolute",
        top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: W * 0.9, height: W * 0.5,
        background: "radial-gradient(ellipse, #F9731622 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative", zIndex: 1 }}>

        {/* ── PANTALLA ── */}
        <div style={{
          width: W,
          background: "#1a1a1f",
          borderRadius: "14px 14px 0 0",
          padding: "10px 10px 0 10px",
          border: "1px solid #ffffff15",
          borderBottom: "none",
          boxShadow: "0 -4px 40px rgba(249,115,22,0.08), 0 0 0 1px #ffffff08",
          position: "relative",
        }}>
          {/* Cámara */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffffff20" }} />
          </div>

          {/* Pantalla con dashboard */}
          <div style={{
            width: "100%",
            height: SCREEN_H,
            borderRadius: "6px 6px 0 0",
            overflow: "hidden",
            border: "1px solid #ffffff10",
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
          }}>
            <DashboardScreen />
          </div>
        </div>

        {/* ── BASE / TECLADO ── */}
        <div style={{
          width: W,
          height: 18,
          background: "linear-gradient(to bottom, #232327, #1a1a1f)",
          borderRadius: "0 0 10px 10px",
          border: "1px solid #ffffff10",
          borderTop: "1px solid #ffffff08",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 2px 0 #ffffff08",
        }}>
          {/* Touchpad */}
          <div style={{
            width: 80, height: 8, borderRadius: 4,
            background: "#ffffff08", border: "1px solid #ffffff0a",
          }} />
        </div>

        {/* Sombra del suelo */}
        <div style={{
          width: W * 0.8,
          height: 20,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
          margin: "0 auto",
          transform: "translateY(4px)",
          filter: "blur(8px)",
        }} />

      </motion.div>
    </motion.div>
  );
}
