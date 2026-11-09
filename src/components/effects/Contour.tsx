import { useId } from "react";
import { cn } from "../../lib/utils.ts";

type ContourProps = {
  className?: string;
};

/**
 * Low-cost topographic lines, drawn as one repeating SVG pattern.
 * Used behind About, Skills, Works, and Experience.
 *
 * @example
 * <Contour className="opacity-70" />
 */
export function Contour({ className }: ContourProps) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-accent/30", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width="320" height="200" patternUnits="userSpaceOnUse">
          <path d="M-10 36C40 8 90 70 150 34s110-20 180 16" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M-10 68C48 40 96 104 158 66s112-18 176 18" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M-10 102C52 74 100 138 164 100s108-16 170 20" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M-10 138C56 110 108 172 170 136s104-14 166 18" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M-10 170C60 146 112 204 176 170s100-12 160 16" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
