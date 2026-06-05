import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ─── Dashboard pantalla ─── */
function DashboardScreen() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  // Barras que cambian suavemente cada tick
  const barSets = [
    [65, 80, 45, 90, 70, 55, 85],
    [50, 65, 80, 60, 90, 40, 75],
    [80, 45, 70, 55, 85, 65, 90],
  ];
  const bars = barSets[tick % 3];

  // Métricas que "actualizan"
  const metrics = [
    [{ l:"Proyectos",v:"24",c:"#F97316" },{ l:"Clientes",v:"12",c:"#a78bfa" },{ l:"APIs",v:"8",c:"#34d399" }],
    [{ l:"Proyectos",v:"26",c:"#F97316" },{ l:"Clientes",v:"14",c:"#a78bfa" },{ l:"APIs",v:"9",c:"#34d399" }],
    [{ l:"Proyectos",v:"25",c:"#F97316" },{ l:"Clientes",v:"13",c:"#a78bfa" },{ l:"APIs",v:"8",c:"#34d399" }],
  ];
  const currentMetrics = metrics[tick % 3];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d0d0f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui,sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 28,
          paddingTop: 0,
          background: "#111113",
          borderBottom: "1px solid #ffffff0f",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 120,
              height: 5,
              borderRadius: 4,
              background: "#ffffff10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 6, color: "#71717a" }}>devpro.app</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: 42,
            background: "#111113",
            borderRight: "1px solid #ffffff0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {["#F97316", "#ffffff20", "#ffffff20", "#ffffff20"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: c === "#F97316" ? "#F9731618" : c,
                border: c === "#F97316" ? "1px solid #F9731640" : "none",
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 6,
            }}
          >
            {currentMetrics.map((m) => (
              <div
                key={m.l}
                style={{
                  background: "#111113",
                  border: "1px solid #ffffff09",
                  borderRadius: 7,
                  padding: "7px 8px",
                }}
              >
                <div style={{ fontSize: 7, color: "#71717a", marginBottom: 3 }}>
                  {m.l}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: m.c }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: "#111113",
              border: "1px solid #ffffff09",
              borderRadius: 8,
              padding: "8px 10px",
            }}
          >
            <div style={{ fontSize: 7, color: "#71717a", marginBottom: 6 }}>
              Actividad semanal
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 4,
                height: 48,
              }}
            >
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  style={{
                    flex: 1,
                    borderRadius: "2px 2px 0 0",
                    background: i === 3 ? "#F97316" : "#ffffff12",
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { n: "API Gateway", s: "Live", c: "#34d399" },
              { n: "Dashboard Admin", s: "En desarrollo", c: "#F97316" },
            ].map((item) => (
              <div
                key={item.n}
                style={{
                  background: "#111113",
                  border: "1px solid #ffffff09",
                  borderRadius: 6,
                  padding: "5px 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: 8, color: "#e4e4e7" }}>{item.n}</div>
                <div
                  style={{
                    fontSize: 7,
                    color: item.c,
                    background: `${item.c}15`,
                    border: `1px solid ${item.c}30`,
                    padding: "1px 5px",
                    borderRadius: 99,
                  }}
                >
                  {item.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── App móvil ─── */
function MobileAppScreen() {
  const [tab, setTab] = useState(0);
  const tabs = ["Inicio", "Proyectos", "Perfil"];
  useEffect(() => {
    const id = setInterval(() => setTab((t) => (t + 1) % 3), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d0d0f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui,sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 14px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 9, color: "#71717a" }}>Bienvenido</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
            DevPro
          </div>
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#F97316,#9333EA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          S
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: "4px 12px" }}>
        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div
              key="h"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 7,
                  marginBottom: 8,
                }}
              >
                {[
                  { l: "Activos", v: "5", c: "#F97316" },
                  { l: "Revisión", v: "2", c: "#a78bfa" },
                  { l: "Listos", v: "12", c: "#34d399" },
                  { l: "Horas", v: "340", c: "#60a5fa" },
                ].map((c) => (
                  <div
                    key={c.l}
                    style={{
                      background: "#111113",
                      border: "1px solid #ffffff08",
                      borderRadius: 10,
                      padding: "9px 10px",
                    }}
                  >
                    <div
                      style={{ fontSize: 8, color: "#71717a", marginBottom: 2 }}
                    >
                      {c.l}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: c.c }}>
                      {c.v}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#111113",
                  border: "1px solid #ffffff08",
                  borderRadius: 10,
                  padding: "10px",
                }}
              >
                <div style={{ fontSize: 8, color: "#71717a", marginBottom: 6 }}>
                  Esta semana
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 4,
                    height: 46,
                  }}
                >
                  {[40, 60, 35, 80, 55, 70, 90].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: i * 0.06 }}
                      style={{
                        flex: 1,
                        borderRadius: "3px 3px 0 0",
                        background: i === 6 ? "#F97316" : "#ffffff12",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {tab === 1 && (
            <motion.div
              key="p"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              {["API Gateway", "Dashboard", "App Móvil", "E-commerce"].map(
                (p, i) => (
                  <div
                    key={p}
                    style={{
                      background: "#111113",
                      border: "1px solid #ffffff08",
                      borderRadius: 10,
                      padding: "9px 12px",
                      marginBottom: 7,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}
                      >
                        {p}
                      </div>
                      <div
                        style={{
                          fontSize: 8,
                          color: "#34d399",
                          background: "#34d39915",
                          border: "1px solid #34d39930",
                          padding: "1px 6px",
                          borderRadius: 99,
                        }}
                      >
                        Live
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: 3,
                        borderRadius: 99,
                        background: "#ffffff10",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${55 + i * 12}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        style={{
                          height: "100%",
                          borderRadius: 99,
                          background: "#F97316",
                        }}
                      />
                    </div>
                  </div>
                ),
              )}
            </motion.div>
          )}
          {tab === 2 && (
            <motion.div
              key="pr"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#F97316,#9333EA)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                S
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 2,
                }}
              >
                Sergio Dev
              </div>
              <div style={{ fontSize: 9, color: "#71717a", marginBottom: 10 }}>
                Full Stack · Colombia
              </div>
              {[
                { l: "Proyectos", v: "15" },
                { l: "Clientes", v: "8" },
                { l: "Rating", v: "⭐ 5.0" },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    width: "100%",
                    background: "#111113",
                    border: "1px solid #ffffff08",
                    borderRadius: 9,
                    padding: "8px 12px",
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 10, color: "#71717a" }}>{s.l}</span>
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: "#F97316" }}
                  >
                    {s.v}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        style={{
          height: 48,
          background: "#111113",
          borderTop: "1px solid #ffffff08",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexShrink: 0,
          paddingBottom: 6,
        }}
      >
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: tab === i ? "#F9731618" : "#ffffff08",
                border:
                  tab === i ? "1px solid #F9731640" : "1px solid #ffffff10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2,
                  background: tab === i ? "#F97316" : "#ffffff30",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 8,
                color: tab === i ? "#F97316" : "#ffffff40",
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── MacBook Pro — aluminio plateado + notch ─── */
function MacBook({ W, rotateX, rotateY }) {
  const screenH = W * 0.625;
  const aluminio = "linear-gradient(160deg,#d0d0d0 0%,#b8b8b8 30%,#c8c8c8 60%,#a8a8a8 100%)";
  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        width: W,
        flexShrink: 0,
      }}
    >
      {/* ── Tapa / Pantalla ── */}
      <div style={{
        width: W,
        background: aluminio,
        borderRadius: "14px 14px 0 0",
        padding: "4px 4px 0",   /* bezel plateado muy fino */
        border: "1px solid #ffffff65",
        borderBottom: "none",
        boxShadow: "0 0 0 1px #00000015 inset, 0 -4px 30px rgba(249,115,22,0.05), inset 0 1px 0 #ffffffc0",
        position: "relative",
      }}>
        {/* Pantalla — bezel plateado del marco ya se ve, la pantalla ocupa casi todo */}
        <div style={{
          width: "100%", height: screenH,
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          border: "1.5px solid #c0c0c0",   /* borde plateado alrededor de la pantalla */
          background: "#000",
          position: "relative",
          boxShadow: "inset 0 0 0 1px #00000060",
        }}>
          <DashboardScreen />

          {/* Notch — dentro de la pantalla, cae desde arriba como iPhone */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%", transform: "translateX(-50%)",
            width: W * 0.11, height: 18,
            background: "#000",
            borderRadius: "0 0 10px 10px",
            zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #2a4a6a, #060c14)",
              boxShadow: "0 0 0 1px #ffffff20, 0 0 4px rgba(100,180,255,0.3)",
            }} />
          </div>
        </div>
      </div>

      {/* ── Base / Teclado ── */}
      <div style={{
        width: W, height: 28,
        background: aluminio,
        borderRadius: "0 0 12px 12px",
        border: "1px solid #ffffff50",
        borderTop: "1px solid #00000020",
        boxShadow: "0 16px 50px rgba(0,0,0,0.65), inset 0 -1px 0 #00000050, inset 0 1px 0 #ffffff60",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
        padding: "4px 0",
      }}>
        {/* Filas de teclas simuladas */}
        {[W*0.75, W*0.68, W*0.58].map((w, i) => (
          <div key={i} style={{
            width: w, height: 3,
            background: "linear-gradient(to right, transparent, #00000018, transparent)",
            borderRadius: 2,
          }} />
        ))}
        {/* Touchpad */}
        <div style={{
          width: 80, height: 6, borderRadius: 3,
          background: "linear-gradient(to bottom,#a8a8a8,#bfbfbf)",
          border: "1px solid #00000022",
          boxShadow: "inset 0 1px 0 #ffffff70, 0 1px 2px rgba(0,0,0,0.2)",
          marginTop: 1,
        }} />
      </div>
      {/* Sombra */}
      <div
        style={{
          width: W * 0.8,
          height: 8,
          margin: "0 auto",
          background:
            "radial-gradient(ellipse,rgba(0,0,0,0.5),transparent 70%)",
          filter: "blur(8px)",
          transform: "translateY(3px)",
        }}
      />
    </motion.div>
  );
}

/* ─── iPhone 15 Pro — CSS titanio ─── */
function IPhone({ W, rotateX, rotateY }) {
  const H   = W * 2.16;
  const r   = W * 0.135;
  const bz  = W * 0.038;
  const btn = W * 0.028;
  const titanio = "linear-gradient(135deg,#b0b4b8 0%,#8e9297 25%,#c8cdd2 50%,#9aa0a6 75%,#b0b4b8 100%)";

  return (
    <motion.div style={{ rotateX, rotateY, transformStyle:"preserve-3d", width:W, height:H, position:"relative", flexShrink:0 }}>
      <div style={{ position:"absolute", inset:0, borderRadius:r, background:titanio, boxShadow:"0 0 0 1px #ffffff50, 0 30px 70px rgba(0,0,0,0.85), inset 0 1px 0 #ffffffa0" }} />
      <div style={{ position:"absolute", inset:W*0.018, borderRadius:r-W*0.018, background:"#0a0a0a" }} />
      <div style={{ position:"absolute", top:bz, left:bz, width:W-bz*2, height:H-bz*2, borderRadius:r-bz*0.6, overflow:"hidden", background:"#000" }}>
        <MobileAppScreen />
      </div>
      <div style={{ position:"absolute", top:bz+H*0.018, left:"50%", transform:"translateX(-50%)", width:W*0.34, height:W*0.075, background:"#000", borderRadius:99, zIndex:10 }}>
        <div style={{ position:"absolute", right:"18%", top:"50%", transform:"translateY(-50%)", width:W*0.055, height:W*0.055, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%,#1a3a5c,#060c12)", boxShadow:"0 0 0 1px #ffffff15" }} />
      </div>
      <div style={{ position:"absolute", left:-btn, top:"14%", width:btn, height:H*0.044, background:titanio, borderRadius:"3px 0 0 3px" }} />
      {[0.26,0.35].map((t,i)=>(
        <div key={i} style={{ position:"absolute", left:-btn, top:`${t*100}%`, width:btn, height:H*0.082, background:titanio, borderRadius:"3px 0 0 3px" }} />
      ))}
      <div style={{ position:"absolute", right:-btn, top:"27%", width:btn, height:H*0.13, background:titanio, borderRadius:"0 3px 3px 0" }} />
      <div style={{ position:"absolute", bottom:bz+H*0.012, left:"50%", transform:"translateX(-50%)", width:W*0.35, height:3.5, background:"rgba(255,255,255,0.55)", borderRadius:99, zIndex:10 }} />
    </motion.div>
  );
}

/* ─── Showcase ─── */
export default function DeviceShowcase() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 80,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 80,
    damping: 20,
  });
  // Inclinación base del MacBook hacia adelante
  const macRotateX = useTransform(rotateX, (v) => v + 10);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const W_MAC = 460;
  const W_PHN = 155;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        position: "relative",
        perspective: 1200,
        cursor: "pointer",
        userSelect: "none",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* MacBook centrado */}
      <MacBook W={W_MAC} rotateX={macRotateX} rotateY={rotateY} />

      {/* iPhone — inclinado derecha, esquina inferior */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          position: "absolute",
          bottom: -10,
          right: -W_PHN * 0.15,
          zIndex: 20,
          perspective: 800,
        }}
      >
        {/* Inclinación fija: rotateY 14° hacia la derecha */}
        <motion.div style={{
          rotateY: useTransform(rotateY, v => v - 14),
          rotateX,
          transformStyle: "preserve-3d",
        }}>
          <IPhone W={W_PHN} rotateX={{ get: () => 0 }} rotateY={{ get: () => 0 }} />
        </motion.div>
      </motion.div>

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 80,
          background: "radial-gradient(ellipse,#F9731615,transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </motion.div>
  );
}
