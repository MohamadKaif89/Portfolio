import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolio } from "../../data/portfolio.ts";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery.ts";
import { easeOut } from "../../lib/animations.ts";
import { whatsAppUrl } from "../../lib/contact.ts";
import { cn } from "../../lib/utils.ts";

type WhatsAppButtonProps = {
  /** `inline` sits beside the form. `floating` is fixed at the bottom-right of every page. */
  variant?: "inline" | "floating";
  className?: string;
};

/**
 * Opens a WhatsApp chat with the number in `VITE_WHATSAPP_NUMBER` and a pre-filled message.
 * Renders nothing when that number is missing, so the page never links to an empty `wa.me` address.
 *
 * @example
 * <WhatsAppButton />
 * <WhatsAppButton variant="floating" />
 */
export function WhatsAppButton({ variant = "inline", className }: WhatsAppButtonProps) {
  const reduced = usePrefersReducedMotion();
  const url = whatsAppUrl(portfolio.contact.whatsappMessage);
  const lift = useFooterClearance(variant === "floating");

  if (!url) return null;

  const icon = <WhatsAppIcon className={variant === "floating" ? "size-7" : "size-5"} />;

  if (variant === "floating") {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={cn(
          "fixed right-4 z-30 grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6",
          className,
        )}
        style={{ bottom: lift }}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={reduced ? undefined : { scale: 1.06 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: easeOut }}
      >
        {icon}
      </motion.a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill border border-accent bg-transparent px-8 py-4 font-display text-button text-accent-ink transition-colors hover:bg-accent hover:text-on-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      {icon}
      {portfolio.contact.whatsappLabel}
    </a>
  );
}

/** Keep the fixed button above the footer once the footer enters the viewport. */
function useFooterClearance(active: boolean): number {
  const [bottom, setBottom] = useState(24);

  useEffect(() => {
    if (!active) return;
    const footer = document.querySelector("footer");
    if (!footer) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = footer.getBoundingClientRect().top;
      const next = top < window.innerHeight ? Math.max(24, window.innerHeight - top + 16) : 24;
      setBottom((current) => (current === next ? current : next));
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
  }, [active]);

  return bottom;
}

/** WhatsApp mark, filled with the current text color. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.14h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.02c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.12.1-1.81-.11-.41-.13-.95-.31-1.63-.61-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.4.86-.4.21 0 .43 0 .62.01.2.01.46-.07.72.55.27.64.91 2.22.99 2.38.08.16.13.35.03.56-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.16-.32.33-.14.64.19.31.83 1.37 1.78 2.22 1.22 1.09 2.25 1.43 2.57 1.59.32.16.5.13.69-.08.19-.21.8-.93 1.02-1.25.21-.32.43-.27.72-.16.29.1 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.76-.16 1.44z" />
    </svg>
  );
}
