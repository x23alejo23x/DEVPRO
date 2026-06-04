import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = [
  "software",
  "APIs REST",
  "dashboards",
  "plataformas",
  "sistemas",
  "aplicaciones",
];

/**
 * Cicla una lista de palabras con animación blur + slide vertical
 * @param {string[]} words     - Palabras a ciclar
 * @param {number}  interval  - Ms entre cambios
 * @param {string}  className - Clases extra del span
 */
export default function CycleText({
  words = WORDS,
  interval = 2200,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    /*
     * py-2 + -my-2 dan espacio vertical para que el slide
     * no quede cortado sin necesitar overflow-hidden
     */
    <span className={`relative inline-flex justify-start py-2 -my-2 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 32, opacity: 0, filter: "blur(12px)" }}
          animate={{ y: 0,  opacity: 1, filter: "blur(0px)"  }}
          exit={{   y: -32, opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
