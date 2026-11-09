import type { ReactNode } from "react";
import { Briefcase, Code2, Download, Globe, LayoutGrid, Mail, MapPin, Monitor, PenLine, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navLinks, portfolio, spyIds } from "../../data/portfolio.ts";
import { useScrollSpy } from "../../hooks/useScrollSpy.ts";
import { fadeUp, stagger } from "../../lib/animations.ts";
import { cn } from "../../lib/utils.ts";
import { Badge } from "../ui/Badge.tsx";
import { Button } from "../ui/Button.tsx";
import { Typewriter } from "../ui/Typewriter.tsx";

const sectionIcons = {
  home: LayoutGrid,
  about: UserRound,
  skills: Code2,
  works: Monitor,
  blog: PenLine,
  contact: Mail,
} as const;

/**
 * Monogram stand-in for a portrait. Replace the markup with an `<img>` if you add a photo.
 *
 * @example
 * <Portrait name="Kaif" />
 */
function Portrait({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "K";
  return (
    <svg viewBox="0 0 96 96" role="img" aria-label={`${name} monogram`} className="size-24">
      <circle cx="48" cy="48" r="46" fill="#1A1E23" stroke="#12F7D6" strokeWidth="2" />
      <text x="48" y="62" textAnchor="middle" fontFamily="Ubuntu, sans-serif" fontSize="42" fill="#12F7D6">
        {letter}
      </text>
    </svg>
  );
}

/**
 * Opening section: watermark, profile card, introduction, and the stat plate.
 *
 * @example
 * <Hero />
 */
export function Hero() {
  const active = useScrollSpy(spyIds);

  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-x-clip bg-canvas pb-20 pt-6 lg:pb-28 lg:pt-4">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-24 size-72 rounded-full bg-accent/15 blur-3xl animate-float" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/3 size-80 rounded-full bg-soft/20 blur-3xl animate-float [animation-delay:-5s]"
      />
      <SectionRail active={active} />
      <div className="relative mx-auto w-full max-w-page px-6 md:px-8 lg:px-16 xl:px-20 desktop:px-24">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)_200px] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-6 xl:grid-cols-[300px_minmax(0,1fr)_214px] xl:gap-x-8 desktop:grid-cols-[320px_minmax(0,1fr)_214px]">
          <p
            aria-hidden="true"
            className="pointer-events-none order-1 select-none text-center font-display text-6xl leading-none text-soft sm:text-7xl lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:text-left lg:text-8xl desktop:text-watermark"
          >
            {portfolio.watermark}
          </p>

          <motion.div
            className="relative z-10 order-2 mx-auto w-full max-w-[320px] rounded-tl-[160px] border-b-2 border-r-2 border-white bg-canvas px-6 py-8 text-center shadow-glow lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-16"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="mx-auto w-fit">
              <Portrait name={portfolio.name} />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 font-sans text-lead font-medium text-ink">
              {portfolio.name}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-1 font-sans text-small text-ink/80">
              {portfolio.role}
            </motion.p>
            <ul className="mx-auto mt-6 flex max-w-[274px] flex-col gap-4 text-left">
              <ProfileRow icon={<Mail className="size-4" aria-hidden="true" />} href={`mailto:${portfolio.email}`}>
                {portfolio.email}
              </ProfileRow>
              <ProfileRow icon={<MapPin className="size-4" aria-hidden="true" />}>{portfolio.location}</ProfileRow>
              <ProfileRow icon={<Briefcase className="size-4" aria-hidden="true" />}>{portfolio.availability}</ProfileRow>
              <ProfileRow icon={<Globe className="size-4" aria-hidden="true" />} href={portfolio.websiteUrl}>
                {portfolio.websiteLabel}
              </ProfileRow>
            </ul>
            <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Primary tools">
              {portfolio.heroTags.map((tag) => (
                <li key={tag}>
                  <Badge>{tag}</Badge>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={portfolio.resumeUrl} download variant="light">
                Download CV
                <Download className="size-5" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>

          <div className="relative order-3 lg:col-start-2 lg:row-start-2 lg:-mt-2">
            <p className="font-sans text-small text-mist" aria-hidden="true">
              {"<h1>"}
            </p>
            <div className="relative">
              <h1
                id="home-title"
                className="font-display text-[2.25rem] leading-[1.12] text-ink sm:text-5xl lg:text-[2.75rem] lg:leading-[1.15] xl:text-[3.25rem] xl:leading-[1.15] desktop:text-hero"
              >
                <span className="block">{portfolio.hero.greeting}</span>
                <span className="block">
                  {portfolio.hero.lead} <span className="text-accent-ink">{portfolio.name}</span>,
                </span>
                <span className="block min-h-[1.15em] xl:whitespace-nowrap">
                  <Typewriter words={portfolio.roles} />
                  <span className="ml-3 hidden align-middle font-sans text-small font-normal text-mist xl:inline" aria-hidden="true">
                    {"</h1>"}
                  </span>
                </span>
              </h1>
              <p className="mt-1 font-sans text-small text-mist xl:hidden" aria-hidden="true">
                {"</h1>"}
              </p>
            </div>
            <p className="mt-6 font-sans text-small text-mist" aria-hidden="true">
              {"<p>"}
            </p>
            <p className="mt-2 max-w-[34rem] font-sans text-body text-ink/80">{portfolio.hero.intro}</p>
            <p className="mt-2 font-sans text-small text-mist" aria-hidden="true">
              {"</p>"}
            </p>
            <a href="#contact" className="mt-4 inline-flex items-center gap-4 font-sans text-lead font-medium text-accent-ink">
              {portfolio.hero.cta}
              <span className="grid size-10 place-items-center rounded-full bg-mist text-paper">
                <Mail className="size-5" aria-hidden="true" />
              </span>
            </a>
          </div>

          <ul className="order-4 flex w-full max-w-xs flex-col gap-10 self-center rounded-stat bg-deep px-8 py-12 shadow-card sm:max-w-[214px] lg:col-start-3 lg:row-start-2 lg:max-w-none">
            {portfolio.stats.map((stat) => (
              <li key={stat.secondary} className="flex items-center gap-4">
                <span className="font-sans text-stat font-medium text-accent-ink">{stat.value}</span>
                <span className="font-sans text-body leading-5 text-ink">
                  {stat.primary}
                  <br />
                  {stat.secondary}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Vertical section links shown on wide screens, matching the template’s left rail.
 *
 * @example
 * <SectionRail active="home" />
 */
function SectionRail({ active }: { active: string }) {
  return (
    <nav aria-label="Sections" className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col gap-1 rounded-full border border-white/15 bg-deep px-2 py-3">
        {navLinks.map((link) => {
          const Icon = link.id ? sectionIcons[link.id as keyof typeof sectionIcons] : LayoutGrid;
          const current = link.id === active;
          return (
            <li key={link.href}>
              <Link
                to={link.href}
                aria-label={link.label}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "grid size-11 place-items-center rounded-full text-ink/80 hover:text-accent-ink",
                  current && "text-accent-ink",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type ProfileRowProps = {
  icon: ReactNode;
  href?: string;
  children: ReactNode;
};

/** One line in the profile card: mint icon plus text, optionally a link. */
function ProfileRow({ icon, href, children }: ProfileRowProps) {
  const content = (
    <>
      <span className="text-accent-ink">{icon}</span>
      <span className="min-w-0 break-all font-sans text-small text-ink">{children}</span>
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <li>
        <a
          href={href}
          className="flex items-center gap-3 hover:text-accent-ink"
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="flex items-center gap-3">{content}</li>;
}
