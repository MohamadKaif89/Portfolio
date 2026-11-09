import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "../../data/portfolio.ts";
import type { Project, ProjectPreview } from "../../types/index.ts";
import { Contour } from "../effects/Contour.tsx";
import { Badge } from "../ui/Badge.tsx";
import { Container } from "../ui/Container.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionTitle } from "../ui/SectionTitle.tsx";
import { Tilt } from "../ui/Tilt.tsx";
import { cn } from "../../lib/utils.ts";

/**
 * Featured device mock, plus a card for every project in the data file.
 *
 * @example
 * <Projects />
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const featured = portfolio.projects[active] ?? portfolio.projects[0];

  if (!featured) return null;

  return (
    <section id="works" aria-labelledby="works-title" className="relative overflow-hidden bg-canvas py-16 lg:py-32">
      <Contour />
      <Container className="relative">
        <Reveal>
          <SectionTitle id="works-title" title={portfolio.worksIntro.title} subtitle={portfolio.worksIntro.subtitle} />
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <Tilt>
            <DeviceStage project={featured} />
          </Tilt>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-6">
            <a
              href={featured.liveUrl}
              className="inline-flex items-center gap-2 font-sans text-nav text-accent-ink"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${featured.title} website`}
            >
              view Website
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.projects.map((project, index) => (
            <li key={project.slug} id={project.slug} className="scroll-mt-28">
              <Tilt>
                <article
                  className={cn(
                    "group overflow-hidden rounded-2xl border bg-deep shadow-card transition-colors",
                    index === active ? "border-accent" : "border-line/10",
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
                    <ProjectVisual project={project} />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-deep via-deep/20 to-transparent p-4 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                      <div className="flex gap-3">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="rounded-pill bg-accent px-4 py-2 font-display text-small text-on-accent"
                        >
                          Live
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="rounded-pill border border-ink/40 px-4 py-2 font-display text-small text-ink"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-2xl text-ink">{project.title}</h3>
                      <span className="font-sans text-small text-ink/60">{project.year}</span>
                    </div>
                    <p className="font-sans text-body text-ink/80">{project.summary}</p>
                    <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                      {project.tech.map((item) => (
                        <li key={item}>
                          <Badge tone="outline">{item}</Badge>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-pressed={index === active}
                      className="font-sans text-small text-accent-ink"
                    >
                      {index === active ? "Showing in preview" : "Show in preview"}
                    </button>
                  </div>
                </article>
              </Tilt>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Laptop and phone frames sharing one project preview. */
function DeviceStage({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto h-[280px] w-full sm:h-[360px] lg:h-[420px]">
      <div className="absolute right-0 top-10 w-[74%] rounded-t-xl border border-line/20 bg-deep p-2 shadow-lift sm:top-14">
        <div className="overflow-hidden rounded-md bg-canvas">
          <ProjectVisual project={project} framed />
        </div>
        <div className="mx-auto mt-2 h-2 w-16 rounded-b-md bg-line/30" />
      </div>
      <div className="absolute left-[4%] top-0 w-[34%] rounded-[1.4rem] border-2 border-line/30 bg-deep p-1.5 shadow-lift">
        <div className="overflow-hidden rounded-[1rem] bg-canvas">
          <ProjectVisual project={project} framed compact />
        </div>
      </div>
    </div>
  );
}

type VisualProps = {
  project: Project;
  framed?: boolean;
  compact?: boolean;
};

/** Uses a real image when `project.image` is set, otherwise a drawn interface. */
function ProjectVisual({ project, framed = false, compact = false }: VisualProps) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        width={640}
        height={400}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", framed && "aspect-[16/10]")}
      />
    );
  }

  return (
    <PreviewArt
      kind={project.preview}
      title={project.title}
      className={cn("h-full w-full transition-transform duration-500 group-hover:scale-105", framed && (compact ? "aspect-[9/16]" : "aspect-[16/10]"))}
    />
  );
}

/**
 * Flat interface drawing for a project that does not have a screenshot yet.
 *
 * @example
 * <PreviewArt kind="notes" title="Fieldnote" />
 */
export function PreviewArt({ kind, title, className }: { kind: ProjectPreview; title: string; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={`${title} interface preview`} className={cn("bg-canvas", className)}>
      <rect width="320" height="200" fill="#1A1E23" />
      <rect x="0" y="0" width="320" height="28" fill="#292F36" />
      <circle cx="16" cy="14" r="4" fill="#12F7D6" />
      <text x="32" y="18" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="10">
        {title}
      </text>
      {kind === "commerce" ? <Commerce /> : null}
      {kind === "notes" ? <Notes /> : null}
      {kind === "analytics" ? <Analytics /> : null}
    </svg>
  );
}

function Commerce() {
  return (
    <>
      <rect x="16" y="44" width="90" height="64" rx="8" fill="#12F7D6" />
      <rect x="116" y="44" width="90" height="64" rx="8" fill="#97F9EB" />
      <rect x="216" y="44" width="88" height="64" rx="8" fill="#292F36" stroke="#12F7D6" />
      <rect x="16" y="120" width="180" height="10" rx="5" fill="#FFFFFF" opacity="0.8" />
      <rect x="16" y="140" width="120" height="10" rx="5" fill="#12F7D6" />
      <rect x="216" y="124" width="88" height="28" rx="14" fill="#12F7D6" />
    </>
  );
}

function Notes() {
  return (
    <>
      <rect x="16" y="44" width="78" height="140" rx="8" fill="#292F36" />
      <rect x="108" y="44" width="196" height="16" rx="6" fill="#12F7D6" />
      <rect x="108" y="72" width="180" height="8" rx="4" fill="#FFFFFF" opacity="0.75" />
      <rect x="108" y="90" width="160" height="8" rx="4" fill="#97F9EB" />
      <rect x="108" y="108" width="190" height="8" rx="4" fill="#FFFFFF" opacity="0.55" />
      <rect x="108" y="126" width="140" height="8" rx="4" fill="#FFFFFF" opacity="0.4" />
    </>
  );
}

function Analytics() {
  return (
    <>
      <rect x="16" y="44" width="88" height="40" rx="8" fill="#292F36" />
      <rect x="116" y="44" width="88" height="40" rx="8" fill="#292F36" />
      <rect x="216" y="44" width="88" height="40" rx="8" fill="#12F7D6" />
      <rect x="28" y="160" width="28" height="20" fill="#97F9EB" />
      <rect x="68" y="130" width="28" height="50" fill="#12F7D6" />
      <rect x="108" y="146" width="28" height="34" fill="#FFFFFF" opacity="0.7" />
      <rect x="148" y="118" width="28" height="62" fill="#12F7D6" />
      <rect x="188" y="138" width="28" height="42" fill="#97F9EB" />
      <rect x="228" y="108" width="28" height="72" fill="#12F7D6" />
    </>
  );
}
