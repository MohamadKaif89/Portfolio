import type { ReactNode } from "react";
import { cn } from "../../lib/utils.ts";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  /** `solid` is the mint hero chip. `outline` sits on dark project cards. */
  tone?: "solid" | "outline";
};

/**
 * Small label for technologies and tags.
 *
 * @example
 * <Badge>React</Badge>
 * <Badge tone="outline">Node.js</Badge>
 */
export function Badge({ children, className, tone = "solid" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 font-sans text-small",
        tone === "solid" ? "bg-chip text-chip-ink" : "border border-line/20 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
