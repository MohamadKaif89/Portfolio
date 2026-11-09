import { useEffect, useState } from "react";

/**
 * Highlights the section that has most recently crossed a line under the sticky nav.
 *
 * @param ids - Section ids in page order. Pass a stable array, not one created during render.
 * @returns The active section id.
 *
 * @example
 * const active = useScrollSpy(spyIds);
 */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = 150;
      let current = ids[0] ?? "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - marker <= 0) current = id;
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
