import { motion } from "framer-motion";

export default function ButtonPrimary({ children, href = "#", onClick, className = "" }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm cursor-pointer transition-colors hover:bg-orange-400 ${className}`}
    >
      {children}
    </motion.a>
  );
}
