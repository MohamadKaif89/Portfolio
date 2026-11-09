import type { ReactNode } from "react";
import { cn } from "../../lib/utils.ts";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Render a list, header row, or other element when a plain div is wrong. */
  as?: "div" | "header" | "footer";
};

/**
 * Page column. At 1440px the side inset is 128px, matching the Figma frame.
 *
 * @example
 * <Container><h1>Hey</h1></Container>
 */
export function Container({ children, className, as = "div" }: ContainerProps) {
  const Component = as;
  return (
    <Component className={cn("mx-auto w-full max-w-page px-6 md:px-8 lg:px-16 xl:px-32", className)}>
      {children}
    </Component>
  );
}
