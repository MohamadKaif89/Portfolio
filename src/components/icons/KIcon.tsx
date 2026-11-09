type KIconProps = {
  className?: string;
};

/**
 * Monogram mark for the brand. `fill` is `currentColor`, so `text-accent-ink`
 * paints it with `rgb(var(--accent-ink) / var(--tw-text-opacity, 1))`.
 *
 * @example
 * <KIcon className="size-8 text-accent-ink" />
 */
export function KIcon({ className = "size-8" }: KIconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M6 4h7v8.4L21.8 4H28l-10.2 12L28.4 28H22l-9-10.2V28H6V4z" />
    </svg>
  );
}
