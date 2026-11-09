import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery.ts";
import { cn } from "../../lib/utils.ts";

type Variant = "light" | "accent" | "outline" | "text";

type Ripple = { id: number; x: number; y: number };

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & {
    href?: undefined;
  };

type AnchorProps = Common & {
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function isAnchor(props: ButtonProps | AnchorProps): props is AnchorProps {
  return typeof props.href === "string";
}

const variants: Record<Variant, string> = {
  light: "bg-ink text-canvas hover:bg-ink/90",
  accent: "bg-accent text-on-accent hover:bg-accent/90",
  outline: "border border-ink/50 bg-transparent text-ink hover:border-accent hover:text-accent-ink",
  text: "bg-transparent px-0 py-0 text-accent-ink",
};

/**
 * Pill button for download, send, and navigation actions.
 * Solid buttons show a click ripple. A mouse or trackpad adds a small magnetic pull.
 *
 * @example
 * <Button href="/resume.pdf" download variant="light">Download CV</Button>
 */
export function Button(props: ButtonProps | AnchorProps) {
  const variant = props.variant ?? "accent";
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const magnetic = fine && !reduced && variant !== "text";

  const classes = cn(
    "relative inline-flex items-center justify-center gap-4 rounded-pill px-8 py-4 font-display text-button transition-transform duration-200",
    variant !== "text" && "overflow-hidden",
    variants[variant],
    props.className,
  );

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate3d(${x * 0.16}px, ${y * 0.22}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const spawnRipple = (currentTarget: HTMLElement, clientX: number, clientY: number) => {
    if (reduced || variant === "text") return;
    const rect = currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.round(clientX);
    setRipples((current) => [...current, { id, x: clientX - rect.left, y: clientY - rect.top }]);
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== id));
    }, 650);
  };

  const rippleLayer = ripples.map((ripple) => (
    <span key={ripple.id} aria-hidden="true" className="ripple" style={{ left: ripple.x, top: ripple.y }} />
  ));

  if (isAnchor(props)) {
    const { href, download, target, rel, onClick, children } = props;
    const external = href.startsWith("http") || href.startsWith("mailto:");
    const shared = {
      className: classes,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        spawnRipple(event.currentTarget, event.clientX, event.clientY);
        onClick?.(event);
      },
    };

    if (external || download || href.startsWith("#")) {
      return (
        <a
          {...shared}
          ref={(node) => {
            ref.current = node;
          }}
          href={href}
          download={download}
          target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
          rel={rel ?? (href.startsWith("http") ? "noreferrer noopener" : undefined)}
        >
          {children}
          {rippleLayer}
        </a>
      );
    }

    return (
      <Link
        {...shared}
        ref={(node) => {
          ref.current = node;
        }}
        to={href}
      >
        {children}
        {rippleLayer}
      </Link>
    );
  }

  const { children, variant: _variant, className: _className, href: _href, ...buttonProps } = props;
  void _variant;
  void _className;
  void _href;

  return (
    <button
      {...buttonProps}
      ref={(node) => {
        ref.current = node;
      }}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(event) => {
        spawnRipple(event.currentTarget, event.clientX, event.clientY);
        buttonProps.onClick?.(event);
      }}
    >
      {children}
      {rippleLayer}
    </button>
  );
}
