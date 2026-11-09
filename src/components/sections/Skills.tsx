import { Atom, Braces, Code, LayoutTemplate, Server, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "../../data/portfolio.ts";
import type { Skill, SkillIcon } from "../../types/index.ts";
import { fadeUp, stagger } from "../../lib/animations.ts";
import { Contour } from "../effects/Contour.tsx";
import { Container } from "../ui/Container.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionTitle } from "../ui/SectionTitle.tsx";

const glyphs: Record<SkillIcon, typeof Braces> = {
  braces: Braces,
  atom: Atom,
  server: Server,
  wind: Wind,
};

/**
 * Two service plates, four skill marks, and a slow marquee of the wider tool list.
 *
 * @example
 * <Skills />
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden bg-canvas py-16 lg:py-32">
      <Contour />
      <Container className="relative">
        <Reveal>
          <SectionTitle id="skills-title" title={portfolio.skillsIntro.title} subtitle={portfolio.skillsIntro.subtitle} />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          {portfolio.services.map((service) => {
            const Icon = service.icon === "code" ? Code : LayoutTemplate;
            return (
              <Reveal key={service.title}>
                <article className="flex items-stretch overflow-hidden rounded-lg bg-chip text-chip-ink shadow-card">
                  <span className="grid w-16 shrink-0 place-items-center bg-chip-ink text-accent">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <div className="px-6 py-5">
                    <h3 className="font-sans text-xl text-chip-ink md:text-nav">{service.title}</h3>
                    <p className="mt-2 font-sans text-body text-chip-muted">{service.detail}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <motion.ul
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 justify-items-center gap-10 md:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          {portfolio.skills.map((skill) => (
            <SkillMark key={skill.name} skill={skill} />
          ))}
        </motion.ul>

        <div className="relative mt-16 overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex gap-10 pr-10">
                {portfolio.technologies.map((item) => (
                  <li key={`${copy}-${item}`} className="whitespace-nowrap font-sans text-nav text-ink/70">
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Colored circle plus the technology name. Hover scales and glows. */
function SkillMark({ skill }: { skill: Skill }) {
  const Icon = glyphs[skill.icon];
  return (
    <motion.li variants={fadeUp} className="flex w-36 flex-col items-center gap-6">
      <span
        className={`grid size-36 place-items-center rounded-full text-paper shadow-card transition-transform duration-300 hover:scale-105 hover:shadow-glow ${skill.swatch}`}
      >
        <Icon className="size-14" aria-hidden="true" />
      </span>
      <span className={`font-sans text-lead font-medium ${skill.label}`}>{skill.name}</span>
    </motion.li>
  );
}
