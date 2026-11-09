import { Link, useParams } from "react-router-dom";
import { portfolio } from "../data/portfolio.ts";
import { PostMeta } from "../components/sections/Blog.tsx";
import { Container } from "../components/ui/Container.tsx";
import { Seo } from "../components/seo/Seo.tsx";
import { NotFoundPage } from "./NotFoundPage.tsx";

/**
 * Full note. Content is the `content` array on the matching post.
 *
 * @example
 * <Route path="/blog/:slug" element={<BlogPostPage />} />
 */
export function BlogPostPage() {
  const { slug } = useParams();
  const post = portfolio.posts.find((item) => item.slug === slug);

  if (!post) return <NotFoundPage />;

  return (
    <article className="bg-canvas py-16 lg:py-24">
      <Seo title={`${post.title} — ${portfolio.name}`} description={post.excerpt} />
      <Container>
        <div className="mx-auto max-w-3xl">
        <p>
          <Link to="/#blog" className="font-sans text-body text-accent-ink">
            Back to notes
          </Link>
        </p>
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">{post.title}</h1>
        <PostMeta post={post} />
        <div className="mt-8 space-y-5">
          {post.content.map((paragraph) => (
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
