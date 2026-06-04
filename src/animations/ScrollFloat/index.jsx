import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * ScrollFloat — efecto Apple: cada letra entra con scale + blur + y
 * sincronizado al scroll. Muy dramático, como cambio de "pantalla".
 */
const ScrollFloat = ({ children, containerClassName = "", stagger = 0.018 }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  // Spring para suavizar el progreso global
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const text = typeof children === "string" ? children : "";
  const chars = text.split("");
  const total = chars.length;

  return (
    <h2 ref={ref} className={`overflow-visible inline-block ${containerClassName}`}>
      {chars.map((char, i) => {
        const charStart = (i / total) * stagger * total * 0.6;
        const charEnd = charStart + 0.55;

        return (
          <CharSpan
            key={i}
            char={char}
            progress={smoothProgress}
            start={Math.min(charStart, 0.85)}
            end={Math.min(charEnd, 1)}
          />
        );
      })}
    </h2>
  );
};

function CharSpan({ char, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y       = useTransform(progress, [start, end], [50, 0]);
  const blur    = useTransform(progress, [start, end], [12, 0]);
  const scale   = useTransform(progress, [start, end], [0.6, 1]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        display: "inline-block",
        transformOrigin: "50% 100%",
        willChange: "transform, opacity, filter",
      }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
}

export default ScrollFloat;
