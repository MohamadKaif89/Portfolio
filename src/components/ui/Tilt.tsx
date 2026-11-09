import type { ReactNode } from "react";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { useFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery.ts";
import { cn } from "../../lib/utils.ts";

type TiltProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Subtle 3D tilt for project cards. Disabled for touch and reduced motion.
 *
 * @example
 * <Tilt><article>...</article></Tilt>
 */
export function Tilt({ children, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div className={cn("perspective-[900px]", className)}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="transition-transform duration-200 will-change-transform [transform-style:preserve-3d]"
      >
        {children}
      </div>
    </div>
  );
}
