import { useEffect, useRef, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery.ts";

/**
 * Follower ring for mouse and trackpad users. Hidden on touch and when motion is reduced.
 * The native cursor stays visible so hit targets remain obvious.
 *
 * @example
 * <CustomCursor />
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;

    const seen = { current: false };
    const move = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!seen.current) {
        seen.current = true;
        setVisible(true);
      }
    };

    const hide = () => {
      seen.current = false;
      setVisible(false);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/80 transition-transform duration-200 ease-out"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
