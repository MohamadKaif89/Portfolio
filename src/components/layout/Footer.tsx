import { Link } from "react-router-dom";
import { portfolio } from "../../data/portfolio.ts";
import { SocialIcon } from "../icons/SocialIcon.tsx";

/**
 * Compact footer: copyright, legal links, and social icons.
 *
 * @example
 * <Footer />
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10 bg-canvas">
      <div className="mx-auto flex w-full max-w-page flex-col gap-4 px-6 py-6 text-center font-display text-body text-ink md:flex-row md:items-center md:justify-between md:px-8 md:text-left lg:px-16 xl:px-16">
        <p>© {year} {portfolio.brand}. All rights reserved.</p>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          <li>
            <Link to={portfolio.footer.privacy.href} className="hover:text-accent-ink">
              {portfolio.footer.privacy.label}
            </Link>
          </li>
          <li>
            <Link to={portfolio.footer.terms.href} className="hover:text-accent-ink">
              {portfolio.footer.terms.label}
            </Link>
          </li>
        </ul>
        <ul className="flex items-center justify-center gap-1">
          {portfolio.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="grid size-11 place-items-center rounded-full hover:text-accent-ink"
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
              >
                <SocialIcon name={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
