import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query.
 *
 * @param query - Any valid media query, for example `(pointer: fine)`.
 * @returns Whether the query currently matches.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Fine pointers (mouse, trackpad). Touch devices return false. */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** Mirrors the operating system reduced-motion setting. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
