import type { SocialIconName } from "../../types/index.ts";
import { Mail } from "lucide-react";

type SocialIconProps = {
  name: SocialIconName;
  className?: string;
};

/**
 * Icon for a social link. Brand marks are inline so the bundle does not depend on icon-pack exports.
 *
 * @example
 * <SocialIcon name="github" className="size-5" />
 */
export function SocialIcon({ name, className = "size-5" }: SocialIconProps) {
  if (name === "mail") return <Mail className={className} aria-hidden="true" />;
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.75 2.6 4.75 6V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24h-4V8.5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
