import { motion } from "framer-motion";

/**
 * Anima cada palabra del texto con stagger — estilo reactbits.dev SplitText
 * @param {string}  text       - Texto a animar
 * @param {string}  className  - Clases del contenedor
 * @param {string}  wordClass  - Clases de cada palabra
 * @param {number}  delay      - Delay inicial en segundos
 * @param {number}  stagger    - Tiempo entre palabras
 * @param {"words"|"chars"} by - Dividir por palabras o caracteres
 */
export default function SplitText({
  text = "",
  className = "",
  wordClass = "",
  delay = 0,
  stagger = 0.06,
  by = "words",
}) {
  const items = by === "chars" ? text.split("") : text.split(" ");

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((word, i) => (
        <motion.span
          key={i}
          variants={item}
          className={`inline-block ${wordClass}`}
          style={{ whiteSpace: by === "chars" ? "pre" : "normal" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
