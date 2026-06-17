import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import * as Icons from "lucide-react";
import { services } from "../../../../data/services";
import ScrollFloat from "../../../../animations/ScrollFloat";
import AuroraBackground from "../../../../animations/AuroraBackground";
import SectionReveal from "../../../../animations/SectionReveal";

/* ─── Ilustraciones (mismas de antes) ─── */
function IllustrationAPI() {
  const endpoints = [
    { method: "GET", path: "/api/users", color: "#34d399" },
    { method: "POST", path: "/api/projects", color: "#60a5fa" },
    { method: "PUT", path: "/api/config", color: "#F97316" },
    { method: "DELETE", path: "/api/cache", color: "#f87171" },
  ];
  return (
    <div className="flex flex-col gap-3 w-full">
      {endpoints.map((ep, i) => (
        <motion.div
          key={ep.path}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-xl border border-white/6 bg-[#111113] px-4 py-3"
        >
          <span
            className="text-xs font-bold font-mono px-2 py-0.5 rounded"
            style={{
              color: ep.color,
              background: `${ep.color}15`,
              border: `1px solid ${ep.color}30`,
              minWidth: 52,
              textAlign: "center",
            }}
          >
            {ep.method}
          </span>
          <span className="text-xs font-mono text-zinc-400">{ep.path}</span>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className="ml-auto w-2 h-2 rounded-full"
            style={{ background: ep.color }}
          />
        </motion.div>
      ))}
      <div className="grid grid-cols-3 gap-3 mt-2">
        {[
          { l: "Latencia", v: "12ms" },
          { l: "Uptime", v: "99.9%" },
          { l: "Req/s", v: "4.2k" },
        ].map((s) => (
          <div
            key={s.l}
            className="bg-[#111113] border border-white/6 rounded-xl p-3 text-center"
          >
            <div className="text-[9px] text-zinc-500 mb-1">{s.l}</div>
            <div className="text-base font-bold text-orange-400">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IllustrationWebApp() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);
  const pages = ["Dashboard", "Reportes", "Configuración"];
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-[#111113] border border-white/6 rounded-t-xl px-3 py-2">
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div
            key={i}
            style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
          />
        ))}
        <div className="flex-1 bg-[#0d0d0f] rounded px-3 py-1 ml-2">
          <span className="text-[8px] font-mono text-zinc-500">
            devpro.app/{pages[active].toLowerCase()}
          </span>
        </div>
      </div>
      <div className="flex bg-[#111113] border-x border-white/6 px-3 py-1 gap-4">
        {pages.map((p, i) => (
          <span
            key={p}
            onClick={() => setActive(i)}
            className="text-[9px] cursor-pointer transition-colors"
            style={{
              color: active === i ? "#F97316" : "#71717a",
              borderBottom: active === i ? "1px solid #F97316" : "none",
              paddingBottom: 2,
              fontWeight: active === i ? 700 : 400,
            }}
          >
            {p}
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="bg-[#0d0d0f] border border-white/6 rounded-b-xl p-3 flex flex-col gap-2"
        >
          <div className="grid grid-cols-3 gap-2">
            {[
              ["#F97316", "28"],
              ["#a78bfa", "94%"],
              ["#34d399", "12"],
            ].map(([c, v], i) => (
              <div
                key={i}
                className="bg-[#111113] rounded-lg p-2 border border-white/6"
              >
                <div className="h-1 rounded-full bg-white/10 mb-2 overflow-hidden">
                  <motion.div
                    animate={{ width: "65%" }}
                    transition={{ duration: 1 }}
                    style={{ height: "100%", borderRadius: 99, background: c }}
                  />
                </div>
                <div className="text-sm font-bold" style={{ color: c }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-2 items-center bg-[#111113] rounded-lg p-2 border border-white/6"
            >
              <div className="w-5 h-5 rounded bg-orange-500/10 shrink-0" />
              <div className="flex-1 h-2 rounded-full bg-white/8" />
              <div className="w-8 h-2 rounded-full bg-emerald-500/30" />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function IllustrationCustom() {
  const steps = [
    { l: "Análisis", done: true },
    { l: "Diseño", done: true },
    { l: "Código", done: false, active: true },
    { l: "Deploy", done: false },
  ];
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.l} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all"
              style={{
                background: s.done
                  ? "#F97316"
                  : s.active
                    ? "transparent"
                    : "#111113",
                borderColor: s.done
                  ? "#F97316"
                  : s.active
                    ? "#F97316"
                    : "#ffffff15",
              }}
            >
              {s.done ? (
                <span className="text-white text-sm">✓</span>
              ) : s.active ? (
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-orange-400"
                />
              ) : (
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
              )}
            </div>
            <span
              className="text-[9px]"
              style={{
                color: s.done ? "#F97316" : s.active ? "#fff" : "#52525b",
                fontWeight: s.active ? 700 : 400,
              }}
            >
              {s.l}
            </span>
            {i < steps.length - 1 && <div className="absolute" />}
          </div>
        ))}
      </div>
      <div className="bg-[#111113] border border-white/6 rounded-xl p-4 font-mono text-xs">
        <span className="text-zinc-500">// </span>
        <span className="text-emerald-400">SolutionBuilder</span>
        <span className="text-zinc-300">.create({"{"}</span>
        <br />
        <span className="text-zinc-400 pl-4"> requirements,</span>
        <br />
        <span className="text-orange-400 pl-4"> → yourBusiness</span>
        <br />
        <span className="text-zinc-300">{"}"}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-orange-400"
        >
          ▌
        </motion.span>
      </div>
    </div>
  );
}

function IllustrationIntegration() {
  return (
    <div className="w-full relative" style={{ height: 220 }}>
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        {[
          { x1: "12%", y1: "30%", x2: "45%", y2: "50%" },
          { x1: "12%", y1: "70%", x2: "45%", y2: "52%" },
          { x1: "57%", y1: "50%", x2: "80%", y2: "28%" },
          { x1: "57%", y1: "52%", x2: "80%", y2: "72%" },
        ].map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#F9731450"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          />
        ))}
        {[
          { cx: "12%", cy: "30%", label: "ERP", c: "#60a5fa" },
          { cx: "12%", cy: "70%", label: "CRM", c: "#a78bfa" },
          { cx: "51%", cy: "50%", label: "API", c: "#F97316" },
          { cx: "80%", cy: "28%", label: "App", c: "#34d399" },
          { cx: "80%", cy: "72%", label: "DB", c: "#f472b6" },
        ].map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: i * 0.1 }}
          >
            <rect
              x={`calc(${n.cx} - 20px)`}
              y={`calc(${n.cy} - 12px)`}
              width="40"
              height="24"
              rx="6"
              fill="#111113"
              stroke={n.c}
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <text
              x={n.cx}
              y={n.cy}
              dominantBaseline="middle"
              textAnchor="middle"
              fill={n.c}
              fontSize="10"
              fontWeight="700"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function IllustrationDashboard() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setF((v) => v + 1), 1200);
    return () => clearInterval(id);
  }, []);
  const sets = [
    [40, 65, 80, 55, 90, 70, 85],
    [60, 45, 75, 90, 50, 80, 65],
    [75, 85, 50, 70, 60, 95, 40],
  ];
  const bars = sets[f % 3];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Revenue", v: "$48k", c: "#F97316" },
          { l: "Usuarios", v: "1.2k", c: "#a78bfa" },
          { l: "Conversión", v: "3.8%", c: "#34d399" },
        ].map((m) => (
          <div
            key={m.l}
            className="bg-[#111113] border border-white/6 rounded-xl p-3"
          >
            <div className="text-[8px] text-zinc-500 mb-1">{m.l}</div>
            <div className="text-base font-bold" style={{ color: m.c }}>
              {m.v}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#111113] border border-white/6 rounded-xl p-3">
        <div className="text-[8px] text-zinc-500 mb-3">
          Métricas en tiempo real
        </div>
        <div className="flex items-end gap-1.5" style={{ height: 60 }}>
          {bars.map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 rounded-t"
              style={{
                background:
                  i === 5 ? "#F97316" : i === 2 ? "#a78bfa" : "#ffffff15",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function IllustrationArchitecture() {
  const layers = [
    {
      label: "Frontend — React / Angular",
      c: "#60a5fa",
      items: ["Components", "State", "Router"],
    },
    {
      label: "API Layer — .NET / REST",
      c: "#F97316",
      items: ["Controllers", "Auth", "Docs"],
    },
    {
      label: "Business Logic",
      c: "#a78bfa",
      items: ["Services", "DTOs", "Rules"],
    },
    {
      label: "Data — SQL / MySQL",
      c: "#34d399",
      items: ["Repository", "Cache", "ORM"],
    },
  ];
  return (
    <div className="w-full flex flex-col gap-2">
      {layers.map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-lg px-3 py-2.5"
          style={{
            background: "#111113",
            borderLeft: `3px solid ${l.c}`,
            border: `1px solid ${l.c}20`,
            borderLeftWidth: 3,
          }}
        >
          <div className="text-[9px] font-bold mb-1.5" style={{ color: l.c }}>
            {l.label}
          </div>
          <div className="flex gap-1.5">
            {l.items.map((it) => (
              <span
                key={it}
                className="text-[8px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded"
              >
                {it}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const illustrations = [
  IllustrationAPI,
  IllustrationWebApp,
  IllustrationCustom,
  IllustrationIntegration,
  IllustrationDashboard,
  IllustrationArchitecture,
];

/* ─── Slide completo por servicio — ocupa 100vh, snap ─── */
function ServiceSlide({ service, index, total }) {
  const Icon = Icons[service.icon] || Icons.Code2;
  const Illustration = illustrations[index];
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.5,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const progressPct = ((index + 1) / total) * 100;

  return (
    <div
      ref={ref}
      id={`servicio-${index}`}
      className="snap-section w-full flex items-center bg-[#09090b] relative"
      style={{ minHeight: "100vh" }}
    >
      {/* 3 columnas: texto | línea central | card */}
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 py-24"
        style={{display:"grid", gridTemplateColumns:"1fr 48px 1fr", alignItems:"center", gap:0}}>

        {/* TEXTO */}
        <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:0.5}} transition={{duration:0.55}}>
          <div className="text-7xl font-black leading-none mb-4 select-none" style={{color:"rgba(255,255,255,0.25)"}}>{String(index+1).padStart(2,"0")}</div>
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
            <Icon size={24} className="text-orange-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{service.title}</h2>
          <p className="text-base text-zinc-400 leading-relaxed mb-8 max-w-md">{service.description}</p>
          <a href="#contacto" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors group">
            Solicitar este servicio <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <div className="flex gap-1.5 mt-12">
            {services.map((_,i)=>(
              <div key={i} className="h-1 rounded-full transition-all duration-300"
                style={{width:i===index?24:6, background:i===index?"#F97316":"#ffffff20"}} />
            ))}
          </div>
        </motion.div>

        {/* LÍNEA CENTRAL */}
        <div className="relative self-stretch flex justify-center hidden lg:flex">
          {/* Base gris */}
          <div className="absolute inset-y-0 w-px bg-white/8" />

          {/* Naranja llena toda la línea cuando inView */}
          <motion.div className="absolute top-0 w-px origin-top"
            style={{background:"linear-gradient(to bottom, transparent, #F97316 20%, #F97316 80%, transparent)"}}
            initial={{height:"0%"}}
            animate={{height: inView ? "100%" : "0%"}}
            transition={{duration:0.7, ease:[0.25,0.1,0.25,1]}}
          />

          {/* Punto de intersección */}
          <motion.div className="absolute w-3 h-3 rounded-full"
            style={{top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:2}}
            animate={{
              background: inView ? "#F97316" : "#1c1c1e",
              boxShadow: inView ? "0 0 16px 4px #F9731680" : "0 0 0 0 transparent",
            }}
            transition={{duration:0.35, delay:0.55}}
          />

          {/* Conector horizontal → card (nace del punto, va a la derecha) */}
          <motion.div className="absolute h-px origin-left"
            style={{top:"50%", left:"50%", transform:"translateY(-50%)"}}
            animate={{width: inView ? "100%" : "0%", background:"#F97316"}}
            transition={{duration:0.35, delay:0.65}}
          />
        </div>

        {/* CARD */}
        <motion.div className="hidden lg:block" initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:0.5}} transition={{duration:0.55,delay:0.15}}>
          <motion.div
            animate={{
              borderColor: inView ? "rgba(249,115,22,0.55)" : "rgba(255,255,255,0.06)",
              boxShadow: inView ? "0 0 60px rgba(249,115,22,0.18), 0 0 0 1px rgba(249,115,22,0.2) inset" : "none",
            }}
            transition={{duration:0.45, delay:0.8}}
            className="relative rounded-2xl border bg-[#111113] p-6 overflow-hidden"
            style={{minHeight:340}}
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{background:"radial-gradient(ellipse at left center,#F9731608,transparent 55%)"}} />
            <div className="relative"><Illustration /></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden max-w-7xl mx-auto px-8 w-full py-20 flex flex-col gap-8">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
            <Icon size={20} className="text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-[#111113] p-5 overflow-hidden">
          <Illustration />
        </div>
      </div>
    </div>
  );
}

/* ─── Línea interactiva con scroll ─── */
function ScrollLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const fillH = useTransform(smooth, [0, 0.6], ["0%", "100%"]);
  const opacity = useTransform(smooth, [0, 0.1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="flex flex-col items-center gap-3 mt-14"
    >
      <span className="text-[10px] tracking-widest uppercase text-zinc-600">
        Descubre los servicios
      </span>
      <div className="relative flex flex-col items-center" style={{ height: "28vh" }}>
        {/* Base gris */}
        <div className="absolute inset-0 w-px mx-auto bg-zinc-800" />
        {/* Fill naranja sincronizado con scroll */}
        <motion.div
          className="absolute top-0 w-px mx-auto origin-top"
          style={{
            height: fillH,
            background: "linear-gradient(to bottom, #F97316cc, #F97316, #F9731660)",
          }}
        />
        {/* Punto que viaja por la línea */}
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 left-1/2"
          style={{
            top: fillH,
            background: "#F97316",
            boxShadow: "0 0 10px 3px #F9731680",
            translateY: "-50%",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Sidebar de navegación lateral fija ─── */
function ServicesSidebarNav({ activeIndex, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 pointer-events-auto"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {services.map((s, i) => {
        const isActive = activeIndex === i;
        return (
          <button
            key={s.id}
            onClick={() =>
              document
                .getElementById(`servicio-${i}`)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2.5 group"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? 28 : 6,
                background: isActive ? "#F97316" : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ height: 6, borderRadius: 99, flexShrink: 0 }}
            />
            {/* Label */}
            <motion.span
              animate={{ color: isActive ? "#F97316" : "rgba(255,255,255,0.35)" }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-semibold whitespace-nowrap select-none"
              style={{ pointerEvents: "none" }}
            >
              {s.title.split(" ")[0]}
            </motion.span>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ─── Sección completa ─── */
export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const visible = new Set();
    const observers = services.map((_, i) => {
      const el = document.getElementById(`servicio-${i}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.add(i);
            setActiveIndex(i);
          } else {
            visible.delete(i);
            if (visible.size === 0) setActiveIndex(null);
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const sidebarVisible = activeIndex !== null;

  return (
    <>
      <ServicesSidebarNav activeIndex={activeIndex} visible={sidebarVisible} />
      {/* Header propio — una sola pantalla */}
      <div
        id="servicios"
        className="w-full flex items-center justify-center bg-[#09090b] relative overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-600/5 blur-[100px] pointer-events-none rounded-full" />
        {/* Fade bottom — se funde con el primer servicio */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, transparent, #09090b)",
          }}
        />

        {/* Grid de puntos */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle,#ffffff18 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <SectionReveal>
        <div className="text-center px-8 relative max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-medium tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            {services.length} servicios disponibles
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            ¿Qué puedo hacer
            <br />
            por ti?
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed"
          >
            Soluciones de software construidas para durar, escalar y resolver
            problemas reales de negocio.
          </motion.p>

          {/* Chips de servicios */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {services.map((s, i) => {
              const Icon = Icons[s.icon] || Icons.Code2;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  onClick={() => document.getElementById(`servicio-${i}`)?.scrollIntoView({ behavior:"smooth" })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-zinc-500 text-xs cursor-pointer hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/5 transition-all duration-200"
                >
                  <Icon size={11} className="text-orange-400/70" />
                  {s.title.split(" ")[0]}
                </motion.div>
              );
            })}
          </motion.div>
          {/* Scroll hint — línea interactiva con scroll */}
          <ScrollLine />
        </div>
        </SectionReveal>
      </div>

      {/* Un slide por servicio */}
      {services.map((service, i) => (
        <ServiceSlide
          key={service.id}
          service={service}
          index={i}
          total={services.length}
        />
      ))}
    </>
  );
}
