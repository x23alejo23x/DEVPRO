import { motion } from "framer-motion";

const techs = [".NET","C#","React","Angular","TypeScript","Azure","Docker","SQL Server","ASP.NET Core","Git"];

export default function LogoBar() {
  return (
    <section className="py-10 border-y border-slate-200 dark:border-purple-900/30 bg-slate-50 dark:bg-[#0D0313] overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-6">
        Tecnologías con las que trabajo
      </p>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <motion.span
            key={i}
            whileHover={{ color: "#F97316", scale: 1.05 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white dark:bg-[#130820] border border-slate-200 dark:border-purple-900/30 text-sm font-medium text-slate-500 dark:text-slate-400 cursor-default transition-colors shrink-0"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
