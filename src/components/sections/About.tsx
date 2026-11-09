import type { ReactNode } from "react";
import { portfolio } from "../../data/portfolio.ts";
import type { AboutParagraph } from "../../types/index.ts";
import { escapeRegExp } from "../../lib/utils.ts";
import { Contour } from "../effects/Contour.tsx";
import { Container } from "../ui/Container.tsx";
import { Reveal } from "../ui/Reveal.tsx";

/**
 * About section: title plate and copy on the left, photo on the right, over contour lines.
 *
 * @example
 * <About />
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-canvas py-16 lg:py-28">
      <Contour className="text-accent/45" />
      <Container className="relative">
        <div className="mb-10 flex flex-col items-center lg:mb-14" aria-hidden="true">
          <span className="grid size-10 place-items-center rounded-full border-2 border-accent font-sans text-small text-accent-ink">
            0
          </span>
          <span className="h-12 border-l border-dashed border-accent" />
          <span className="size-1.5 rounded-full bg-paper" />
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,420px)] lg:items-start lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_minmax(280px,460px)] xl:gap-x-16">
          <div className="max-w-sheet">
            <Reveal>
              <h2
                id="about-title"
                className="inline-block rounded-bl-3xl rounded-br-[2.75rem] rounded-tl-[2.75rem] rounded-tr-3xl border-2 border-accent bg-canvas px-8 py-3 font-display text-4xl text-ink sm:px-10 sm:py-4 sm:text-5xl"
              >
                {portfolio.about.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-8">
              <div className="rounded-sheet bg-deep px-6 py-6 sm:px-10 sm:py-8">
                <p className="font-sans text-small text-mist" aria-hidden="true">
                  {"<p>"}
                </p>
                <p className="mt-3 font-sans text-lead font-medium text-accent-ink">{portfolio.about.greeting}</p>
                <div className="mt-4 space-y-4">
                  {portfolio.about.paragraphs.map((paragraph) => (
                    <p key={paragraph.text} className="font-sans text-body text-ink/90">
                      <Highlighted paragraph={paragraph} />
                    </p>
                  ))}
                </div>
                <p className="mt-4 font-sans text-small text-mist" aria-hidden="true">
                  {"</p>"}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mx-auto mt-12 w-full max-w-[460px] lg:mx-0 lg:mt-2">
            <AboutPhoto />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * Right-hand photo. Uses `portfolio.about.image` when set, otherwise the drawn desk.
 *
 * @example
 * <AboutPhoto />
 */
function AboutPhoto() {
  if (portfolio.about.image) {
    return (
      <img
        src={portfolio.about.image}
        alt={portfolio.about.imageAlt}
        width={462}
        height={556}
        className="aspect-[462/556] w-full rounded-2xl object-cover"
      />
    );
  }

  return <WorkspaceArt />;
}

/** Wraps configured phrases in the accent color. */
function Highlighted({ paragraph }: { paragraph: AboutParagraph }) {
  const { text, highlights } = paragraph;
  if (highlights.length === 0) return text;
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);
  const nodes: ReactNode[] = parts.map((part, index) =>
    highlights.includes(part) ? (
      <span key={`${part}-${index}`} className="text-accent-ink">
        {part}
      </span>
    ) : (
      <span key={`text-${index}`}>{part}</span>
    ),
  );
  return nodes;
}

/**
 * Original desk illustration. It stands in for the template photo so the layout keeps its frame.
 *
 * @example
 * <WorkspaceArt />
 */
function WorkspaceArt() {
  return (
    <svg viewBox="0 0 462 556" role="img" aria-label="Illustration of a desk, a monitor with code, and a plant" className="aspect-[462/556] h-auto w-full rounded-2xl bg-deep">
      <rect width="462" height="556" fill="#1A1E23" />
      <rect x="70" y="78" width="280" height="180" rx="16" fill="#292F36" stroke="#12F7D6" strokeWidth="3" />
      <rect x="88" y="96" width="244" height="144" rx="8" fill="#1A1E23" />
      <rect x="104" y="116" width="120" height="8" rx="4" fill="#12F7D6" />
      <rect x="104" y="136" width="180" height="8" rx="4" fill="#97F9EB" opacity="0.85" />
      <rect x="104" y="156" width="150" height="8" rx="4" fill="#FFFFFF" opacity="0.7" />
      <rect x="104" y="176" width="96" height="8" rx="4" fill="#12F7D6" opacity="0.7" />
      <rect x="186" y="258" width="48" height="28" fill="#43454D" />
      <rect x="120" y="286" width="180" height="12" rx="4" fill="#43454D" />
      <rect x="78" y="360" width="306" height="16" rx="8" fill="#292F36" />
      <rect x="96" y="392" width="210" height="14" rx="7" fill="#43454D" />
      <rect x="96" y="418" width="160" height="14" rx="7" fill="#292F36" stroke="#97F9EB" />
      <path d="M330 430c18-40 48-48 48-48s8 30-10 62c-8 16-22 28-38 28s-18-18 0-42z" fill="#12F7D6" />
      <rect x="346" y="468" width="16" height="36" rx="4" fill="#97F9EB" />
      <circle cx="120" cy="500" r="18" fill="#292F36" stroke="#12F7D6" strokeWidth="3" />
    </svg>
  );
}
