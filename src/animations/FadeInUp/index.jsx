import { motion } from "framer-motion";

/**
 * Wrapper de animación fade-in hacia arriba al entrar en pantalla
 * @param {number} delay - retraso en segundos
 * @param {number} duration - duración en segundos
 * @param {number} y - desplazamiento vertical inicial (px)
 */
export default function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
