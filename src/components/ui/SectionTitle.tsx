import { cn } from "../../lib/utils.ts";

type SectionTitleProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  className?: string;
};

/**
 * Centered section heading used by Skills, Works, Experience, Blog, and Contact.
 * The title is the accent color; the subtitle is body copy.
 *
 * @example
 * <SectionTitle id="skills-title" title="Skills" subtitle="Always learning" />
 */
export function SectionTitle({ id, title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-4 text-center", className)}>
      <h2 id={id} className="font-display text-4xl text-accent-ink sm:text-5xl lg:text-title">
        {title}
      </h2>
      <p className="max-w-xl font-sans text-body text-ink/90">{subtitle}</p>
    </div>
  );
}
