import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
};

/**
 * Sets the document title and meta description for the current view.
 *
 * @example
 * <Seo title="Kaif — Full-stack developer" description="Portfolio" />
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
