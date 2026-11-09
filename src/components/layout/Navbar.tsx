import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { navLinks, portfolio, spyIds } from "../../data/portfolio.ts";
import { useScrollSpy } from "../../hooks/useScrollSpy.ts";
import { useTheme } from "../../hooks/useTheme.tsx";
import { MkWordmark } from "../icons/MkWordmark.tsx";
import { SocialIcon } from "../icons/SocialIcon.tsx";
import { cn } from "../../lib/utils.ts";
import { SearchDialog } from "./SearchDialog.tsx";

const iconButton =
  "grid size-11 place-items-center rounded-full text-ink transition-colors hover:text-accent-ink";

/**
 * Sticky header. Hides while scrolling down, returns on the way up,
 * and marks the section in view. The mobile menu is a disclosure, not a separate page.
 *
 * @example
 * <Navbar />
 */
export function Navbar() {
  const active = useScrollSpy(spyIds);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > last && y > 120);
      last = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const themeLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line/10 bg-canvas/95 backdrop-blur-md transition-transform duration-300",
        hidden && !menuOpen && "-translate-y-full",
        scrolled ? "py-3 lg:py-4" : "py-4 lg:py-8 desktop:py-12",
      )}
    >
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-4 px-6 md:px-8 lg:px-16 xl:px-32">
        <Link to="/#home" className="flex items-center text-accent-ink">
          <MkWordmark className="h-8 w-auto lg:h-9" />
          <span className="sr-only">MK Home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex desktop:gap-8">
          {navLinks.map((link) => {
            const current = link.id === active && location.pathname === "/";
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "font-sans text-base text-ink hover:text-accent-ink desktop:text-nav",
                  current && "text-accent-ink underline decoration-accent decoration-2 underline-offset-8",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" className={iconButton} aria-label={themeLabel} onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
          </button>
          <button type="button" className={iconButton} aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search className="size-5" aria-hidden="true" />
          </button>
          <ul className="hidden items-center xl:flex">
            {portfolio.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className={iconButton}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={cn(iconButton, "lg:hidden")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen
        ? createPortal(
            <div id="mobile-menu" className="fixed inset-0 z-40 bg-canvas px-6 pt-32 lg:hidden">
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} onClick={() => setMenuOpen(false)} className="font-display text-4xl text-ink hover:text-accent-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <ul className="mt-10 flex gap-2">
                {portfolio.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className={iconButton}
                      aria-label={social.label}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>,
            document.body,
          )
        : null}

      {searchOpen ? <SearchDialog open onClose={() => setSearchOpen(false)} /> : null}
    </header>
  );
}
