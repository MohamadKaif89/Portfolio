import { motion } from "framer-motion";
import { portfolio } from "../../data/portfolio.ts";
import { fadeUp } from "../../lib/animations.ts";
import { Contour } from "../effects/Contour.tsx";
import { Card } from "../ui/Card.tsx";
import { Container } from "../ui/Container.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionTitle } from "../ui/SectionTitle.tsx";

/**
 * Work and education timeline. Copy comes from `portfolio.experience`.
 *
 * @example
 * <Experience />
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative overflow-hidden bg-canvas py-16 lg:py-32">
      <Contour />
      <Container className="relative">
        <Reveal>
          <SectionTitle
            id="experience-title"
            title={portfolio.experienceIntro.title}
            subtitle={portfolio.experienceIntro.subtitle}
          />
        </Reveal>
        <ol className="relative mx-auto mt-14 max-w-sheet space-y-6 before:absolute before:bottom-4 before:left-[5px] before:top-4 before:w-px before:bg-accent/50">
          {portfolio.experience.map((item, index) => (
            <motion.li
              key={item.id}
              className="relative pl-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ delay: index * 0.05 }}
            >
              <span aria-hidden="true" className="absolute left-0 top-6 size-3 rounded-full bg-accent" />
              <Card className="px-6 py-6 sm:px-8">
                <p className="font-sans text-small text-accent-ink">
                  {item.kind === "education" ? "Education" : "Work"} · {item.period}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{item.title}</h3>
                <p className="mt-1 font-sans text-body text-accent-ink">{item.org}</p>
                <p className="mt-3 font-sans text-body text-ink/85">{item.description}</p>
              </Card>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
