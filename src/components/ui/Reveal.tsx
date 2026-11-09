import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOut, fadeUp } from "../../lib/animations.ts";
import { cn } from "../../lib/utils.ts";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds, used to stagger siblings. */
  delay?: number;
};

/**
 * Fades and rises content the first time it enters the viewport.
 * `MotionConfig reducedMotion="user"` flattens this when the OS asks for less motion.
 *
 * @example
 * <Reveal delay={0.1}><p>Hello</p></Reveal>
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
