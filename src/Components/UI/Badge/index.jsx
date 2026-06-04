export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
