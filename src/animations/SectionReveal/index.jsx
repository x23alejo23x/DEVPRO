import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function SectionReveal({ children, className = "" }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.15"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 45, damping: 18, restDelta: 0.001 });

  const scale   = useTransform(smooth, [0, 1], [0.84, 1]);
  const opacity = useTransform(smooth, [0, 0.3], [0, 1]);
  const y       = useTransform(smooth, [0, 1], [70, 0]);
  const blur    = useTransform(smooth, [0, 0.45], [10, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          scale,
          opacity,
          y,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          transformOrigin: "50% 60%",
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
