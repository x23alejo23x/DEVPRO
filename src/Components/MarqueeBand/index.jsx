import { motion } from "framer-motion";

const items = [
  { text: "APIs REST", icon: "⚡" },
  { text: ".NET & C#", icon: "🔧" },
  { text: "React & Angular", icon: "⚛️" },
  { text: "SQL Server", icon: "🗄️" },
  { text: "Docker & Azure", icon: "☁️" },
  { text: "Entregas a tiempo", icon: "✅" },
  { text: "Código limpio", icon: "✨" },
  { text: "Sin intermediarios", icon: "🤝" },
  { text: "Dashboards", icon: "📊" },
  { text: "Arquitectura escalable", icon: "🏗️" },
  { text: "TypeScript", icon: "📘" },
  { text: "JWT & Auth", icon: "🔒" },
];

const repeated = [...items, ...items, ...items];

export default function MarqueeBand() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 border-t border-white/5">

      {/* Fade izquierda */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #09090b, transparent)" }} />
      {/* Fade derecha */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #09090b, transparent)" }} />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/8 bg-white/3 whitespace-nowrap shrink-0"
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs font-medium text-zinc-400">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
