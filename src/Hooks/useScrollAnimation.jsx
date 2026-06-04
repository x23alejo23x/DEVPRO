import { useInView } from "react-intersection-observer";

/**
 * Hook que retorna ref + triggered para animar elementos al entrar en viewport
 * @param {number} threshold - % del elemento visible para disparar (0-1)
 * @param {boolean} triggerOnce - si solo dispara una vez
 */
export function useScrollAnimation(threshold = 0.15, triggerOnce = true) {
  const { ref, inView } = useInView({ threshold, triggerOnce });
  return { ref, inView };
}
