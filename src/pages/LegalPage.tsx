import { Link } from "react-router-dom";
import { portfolio } from "../data/portfolio.ts";
import { Container } from "../components/ui/Container.tsx";
import { Seo } from "../components/seo/Seo.tsx";

type LegalKind = "privacy" | "terms";

type LegalPageProps = {
  kind: LegalKind;
};

/**
 * Privacy or terms page. Copy lives in `portfolio.legal`.
 *
 * @example
 * <LegalPage kind="privacy" />
 */
export function LegalPage({ kind }: LegalPageProps) {
  const page = portfolio.legal[kind];

  return (
    <article className="bg-canvas py-16 lg:py-24">
      <Seo title={`${page.title} — ${portfolio.name}`} description={page.paragraphs[0] ?? page.title} />
      <Container>
        <div className="mx-auto max-w-3xl">
        <p>
          <Link to="/" className="font-sans text-body text-accent-ink">
            Back home
          </Link>
        </p>
        <h1 className="mt-6 font-display text-4xl text-accent-ink sm:text-5xl">{page.title}</h1>
        <div className="mt-8 space-y-5">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-display text-lg font-light leading-8 text-ink/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      </Container>
    </article>
  );
}
