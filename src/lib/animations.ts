import type { Variants } from "framer-motion";

/** Shared easing curve. Transform and opacity only, so the motion stays on the GPU. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fade and rise used by every section reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Parent variant that staggers immediate children using `fadeUp`. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
