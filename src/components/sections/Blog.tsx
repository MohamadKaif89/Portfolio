import { useState, type FormEvent } from "react";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolio } from "../../data/portfolio.ts";
import type { Post } from "../../types/index.ts";
import { sendMessage } from "../../lib/form.ts";
import { isEmail } from "../../lib/utils.ts";
import { Button } from "../ui/Button.tsx";
import { Container } from "../ui/Container.tsx";
import { Dialog } from "../ui/Dialog.tsx";
import { Reveal } from "../ui/Reveal.tsx";
import { SectionTitle } from "../ui/SectionTitle.tsx";

/**
 * Featured note, optional extra posts, and a subscribe dialog.
 *
 * @example
 * <Blog />
 */
export function Blog() {
  const [expanded, setExpanded] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [featured, ...rest] = portfolio.posts;
  const visible = expanded ? rest : [];

  if (!featured) return null;

  return (
    <section id="blog" aria-labelledby="blog-title" className="bg-canvas py-16 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle id="blog-title" title={portfolio.blogIntro.title} subtitle={portfolio.blogIntro.subtitle} />
        </Reveal>
        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-12">
          <PostRow post={featured} />
          {visible.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {rest.length > 0 && !expanded ? (
            <Button type="button" variant="accent" onClick={() => setExpanded(true)}>
              View More
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={() => setSubscribeOpen(true)}>
            {portfolio.subscribe.label}
          </Button>
        </div>
      </Container>
      <SubscribeDialog open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </section>
  );
}

/**
 * Horizontal post summary used on the home page and as the header of a note.
 *
 * @example
 * <PostRow post={post} />
 */
export function PostRow({ post }: { post: Post }) {
  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-[240px_1fr] md:gap-16">
        <NoteArt />
        <div>
          <h3 className="font-display text-2xl leading-9 text-accent-ink sm:text-lead sm:leading-9">
            <Link to={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 font-display text-base font-light leading-6 text-ink/90">{post.excerpt}</p>
          <Link to={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 font-display text-base font-medium text-accent-ink">
            Read More <span aria-hidden="true">&gt;&gt;</span>
          </Link>
          <PostMeta post={post} />
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Author, date, tag, and reading time for a note.
 *
 * @example
 * <PostMeta post={post} />
 */
export function PostMeta({ post }: { post: Post }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-display text-small text-ink/80">
      <li className="inline-flex items-center gap-2">
        <Tag className="size-3.5 text-accent-ink" aria-hidden="true" />
        {post.tag}
      </li>
      <li className="inline-flex items-center gap-2">
        <User className="size-3.5 text-accent-ink" aria-hidden="true" />
        {portfolio.name}
      </li>
      <li className="inline-flex items-center gap-2">
        <Calendar className="size-3.5 text-accent-ink" aria-hidden="true" />
        <time>{post.date}</time>
      </li>
      <li className="inline-flex items-center gap-2">
        <Clock className="size-3.5 text-accent-ink" aria-hidden="true" />
        {post.readTime}
      </li>
    </ul>
  );
}

/** Square note illustration with a fixed size so the row does not shift. */
function NoteArt() {
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" className="aspect-square w-full max-w-[240px] rounded-2xl bg-deep">
      <rect width="240" height="240" fill="#1A1E23" />
      <rect x="28" y="36" width="184" height="120" rx="12" fill="#292F36" />
      <rect x="44" y="56" width="90" height="10" rx="5" fill="#12F7D6" />
      <rect x="44" y="78" width="140" height="8" rx="4" fill="#FFFFFF" opacity="0.7" />
      <rect x="44" y="96" width="120" height="8" rx="4" fill="#97F9EB" />
      <circle cx="168" cy="176" r="28" fill="#12F7D6" />
    </svg>
  );
}

/**
 * Email capture. Uses the same Formspree or mailto path as the contact form.
 *
 * @example
 * <SubscribeDialog open={open} onClose={() => setOpen(false)} />
 */
function SubscribeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    const result = await sendMessage({
      name: "Subscriber",
      email,
      subject: "Subscribe",
      message: `Please add ${email} to the notes list.`,
    });
    setStatus(result);
    if (result === "sent") setEmail("");
  };

  return (
    <Dialog open={open} title={portfolio.subscribe.title} onClose={onClose}>
      <p className="font-sans text-body text-ink/80">{portfolio.subscribe.text}</p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <label htmlFor="subscribe-email" className="font-display text-body text-accent-ink">
          Your email *
        </label>
        <input
          id="subscribe-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "subscribe-error" : undefined}
          placeholder="Enter your email"
          className="w-full rounded-lg bg-field px-4 py-4 font-display text-body text-ink outline-none ring-1 ring-line/15 placeholder:text-ink/40"
        />
        {error ? (
          <p id="subscribe-error" className="font-sans text-small text-danger">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="accent" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : portfolio.subscribe.label}
        </Button>
        <StatusLine status={status} />
      </form>
    </Dialog>
  );
}

function StatusLine({ status }: { status: "idle" | "sending" | "sent" | "mailto" | "error" }) {
  if (status === "idle" || status === "sending") return null;
  const message =
    status === "sent"
      ? "You are on the list."
      : status === "mailto"
        ? "Your email app should open with the request."
        : "That did not send. Try again, or use the email link in the footer.";
  return (
    <p role="status" className="font-sans text-small text-ink/80">
      {message}
    </p>
  );
}
