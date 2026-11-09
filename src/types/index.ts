/** Supported social icon names. Add a matching branch in SocialIcon when extending this. */
export type SocialIconName = "github" | "linkedin" | "mail";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconName;
};

export type NavLink = {
  label: string;
  href: string;
  /** Section id used by the scroll spy. Omit for routes that are not on the home page. */
  id?: string;
};

export type Stat = {
  value: string;
  primary: string;
  secondary: string;
};

export type AboutParagraph = {
  text: string;
  /** Phrases rendered in the accent color. Must match the source text exactly. */
  highlights: string[];
};

export type Service = {
  title: string;
  detail: string;
  icon: "code" | "layout";
};

export type SkillIcon = "braces" | "atom" | "server" | "wind";

export type Skill = {
  name: string;
  /** Tailwind background class, for example `bg-js`. */
  swatch: string;
  /** Tailwind text class for the label under the circle. */
  label: string;
  icon: SkillIcon;
};

export type ProjectPreview = "commerce" | "notes" | "analytics";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  year: string;
  preview: ProjectPreview;
  /** Optional public image path. When empty, the built-in preview illustration is used. */
  image: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  tag: string;
};

export type ExperienceItem = {
  id: string;
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "work" | "education";
};

export type ThemeName = "dark" | "light";
