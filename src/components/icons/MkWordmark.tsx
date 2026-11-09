type MkWordmarkProps = {
  className?: string;
};

/**
 * Bold “MK” wordmark. `fill` is `currentColor`, so `text-accent-ink` paints it
 * with `rgb(var(--accent-ink) / var(--tw-text-opacity, 1))`.
 *
 * @example
 * <MkWordmark className="h-8 text-accent-ink" />
 */
export function MkWordmark({ className = "h-8" }: MkWordmarkProps) {
  return (
    <svg viewBox="0 0 86 40" className={className} aria-hidden="true" fill="currentColor">
      <path d="M2 36V4h9l8 14 8-14h9v32h-9V18l-4 7-4-7v18H2z" />
      <path d="M44 4h9v8.2L62.5 4H73L60.8 18.2 73.6 36H62.4l-9.4-11.4V36H44V4z" />
    </svg>
  );
}
