import { useEffect } from "react";
import { motion } from "framer-motion";
import { KIcon } from "../icons/KIcon.tsx";
import { easeOut } from "../../lib/animations.ts";

type PreloaderProps = {
  onDone: () => void;
};

/**
 * Full-screen intro shown once on load. Calls `onDone` when the bar finishes.
 *
 * @example
 * <Preloader onDone={() => setBooting(false)} />
 */
export function Preloader({ onDone }: PreloaderProps) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(onDone, 1300);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-canvas px-6"
      role="status"
      aria-live="polite"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="flex w-full max-w-xs flex-col items-center gap-6">
        <p className="flex items-center gap-2 font-sans text-lead font-medium text-ink">
          <KIcon className="size-8 text-accent-ink" />
          Loading
        </p>
        <div className="h-1 w-full overflow-hidden rounded-pill bg-deep">
          <motion.div
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.05, ease: easeOut }}
          />
        </div>
        <p className="font-sans text-small text-ink/70">Opening the portfolio</p>
      </div>
    </motion.div>
  );
}
