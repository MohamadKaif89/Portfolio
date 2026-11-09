import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container.tsx";
import { Seo } from "../components/seo/Seo.tsx";

/**
 * Shown when a route or a note slug does not exist.
 *
 * @example
 * <Route path="*" element={<NotFoundPage />} />
 */
export function NotFoundPage() {
  return (
    <section className="bg-canvas py-24">
      <Seo title="Page not found" description="That page is not part of this portfolio." />
      <Container>
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-4 font-sans text-body text-ink/80">That address is not part of this site.</p>
        <Link to="/" className="mt-6 inline-block font-sans text-body text-accent-ink">
          Back home
        </Link>
      </Container>
    </section>
  );
}
