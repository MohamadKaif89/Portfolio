import { portfolio } from "../../data/portfolio.ts";
import { Container } from "../ui/Container.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionTitle } from "../ui/SectionTitle.tsx";
import { ContactForm } from "./Contact/ContactForm.tsx";

/**
 * Contact section. The plate and field layout follow the Figma frame.
 * The form posts through Web3Forms, and WhatsApp sits beside the send button.
 *
 * @example
 * <Contact />
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-deep py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionTitle id="contact-title" title={portfolio.contact.title} subtitle={portfolio.contact.subtitle} />
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mx-auto mt-12 w-fit rounded-br-[32px] rounded-tl-[32px] px-8 py-4 text-center font-sans text-lead font-medium text-accent-ink">
            {portfolio.contact.formTitle}
          </h3>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
