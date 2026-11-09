import { useState } from "react";
import { Link } from "react-router-dom";
import { portfolio } from "../../data/portfolio.ts";
import { Dialog } from "../ui/Dialog.tsx";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Searches project and blog titles from the portfolio data.
 *
 * @example
 * <SearchDialog open={open} onClose={() => setOpen(false)} />
 */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const projects = portfolio.projects.filter((project) =>
    `${project.title} ${project.summary} ${project.tech.join(" ")}`.toLowerCase().includes(needle),
  );
  const posts = portfolio.posts.filter((post) =>
    `${post.title} ${post.excerpt}`.toLowerCase().includes(needle),
  );
  const empty = needle.length > 0 && projects.length === 0 && posts.length === 0;

  return (
    <Dialog open={open} title="Search" onClose={onClose}>
      <label htmlFor="site-search" className="font-display text-body text-accent-ink">
        Search projects and notes
      </label>
      <input
        id="site-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try React or notes"
        className="mt-3 w-full rounded-lg bg-field px-4 py-4 font-sans text-body text-ink outline-none ring-1 ring-line/15 placeholder:text-ink/40 focus-visible:ring-accent"
        autoComplete="off"
      />
      <div className="mt-6 max-h-80 space-y-6 overflow-auto">
        {empty ? <p className="font-sans text-body text-ink/70">Nothing matches that search.</p> : null}
        {projects.length > 0 ? (
          <section aria-label="Projects">
            <h3 className="font-sans text-small uppercase tracking-wide text-ink/60">Projects</h3>
            <ul className="mt-3 space-y-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/#${project.slug}`}
                    onClick={onClose}
                    className="block rounded-lg px-3 py-2 font-sans text-body hover:bg-canvas hover:text-accent-ink"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {posts.length > 0 ? (
          <section aria-label="Notes">
            <h3 className="font-sans text-small uppercase tracking-wide text-ink/60">Notes</h3>
            <ul className="mt-3 space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    onClick={onClose}
                    className="block rounded-lg px-3 py-2 font-sans text-body hover:bg-canvas hover:text-accent-ink"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </Dialog>
  );
}
