import { motion } from "framer-motion";

export default function ButtonOutline({ children, href = "#", onClick, className = "" }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-zinc-300 font-semibold text-sm cursor-pointer transition-all hover:border-white/30 hover:text-white hover:bg-white/5 backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.a>
  );
}
