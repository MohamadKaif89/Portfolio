import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

/**
 * Thin accent bar fixed to the top of the viewport. Scale is tied to page scroll.
 *
 * @example
 * <ScrollProgress />
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const bar = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    bar.current?.setAttribute("aria-valuenow", String(Math.round(value * 100)));
  });

  return (
    <motion.div
      ref={bar}
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-accent"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    />
  );
}
