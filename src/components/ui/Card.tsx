import type { ReactNode } from "react";
import { cn } from "../../lib/utils.ts";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Dark raised surface used for stats, experience, and project bodies.
 *
 * @example
 * <Card className="p-8">...</Card>
 */
export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-sheet bg-deep text-ink shadow-card", className)}>{children}</div>;
}
