import type {
  AboutParagraph,
  ExperienceItem,
  NavLink,
  Post,
  Project,
  Service,
  Skill,
  SocialLink,
  Stat,
} from "../types/index.ts";

/**
 * All visible copy lives in this file.
 * Replace the sample content below — components read from here and nowhere else.
 *
 * Also update the matching title and description in `index.html` when you change `seo`.
 */
export const portfolio = {
  name: "Kaif",
  brand: "Kaif",
  role: "Full-stack developer",
  /** Cycled in the hero. The first entry should match `role`. */
  roles: ["Full-stack developer", "React engineer", "Interface builder"],
  watermark: "Developer",
  email: "hello@example.com",
  location: "Remote",
  availability: "Full-time / Freelancer",
  websiteLabel: "example.com",
  websiteUrl: "https://example.com",
  resumeUrl: "/resume.pdf",
  seo: {
    title: "Kaif — Full-stack developer",
    description:
      "Portfolio of Kaif, a full-stack developer who builds fast, accessible web products with React, Node.js, and TypeScript.",
  },
  hero: {
    greeting: "Hey",
    lead: "I’m",
    intro:
      "I help teams ship clear, fast web products. If you want a developer who cares about the details,",
    cta: "Let’s Talk",
  },
  heroTags: ["React", "Node.js", "TS", "Git"],
  stats: [
    { value: "4", primary: "Programming", secondary: "Language" },
    { value: "6", primary: "Development", secondary: "Tools" },
    { value: "3", primary: "Years of", secondary: "Experience" },
  ] satisfies Stat[],
  about: {
    title: "About Me",
    /**
     * Your photo. Put the file in `public/` (for example `public/about.jpg`)
     * and set this to `"/about.jpg"`. Leave it empty to keep the drawn stand-in.
     */
    image: "",
    imageAlt: "Kaif at a desk",
    greeting: "Hello!",
    paragraphs: [
      {
        text: "My name is Kaif and I specialize in web products built with React, Node.js, and TypeScript.",
        highlights: ["React", "Node.js", "TypeScript"],
      },
      {
        text: "I am a careful, optimistic builder. I like clear code, honest interfaces, and pages that stay fast after the demo.",
        highlights: [],
      },
      {
        text: "When I am away from the editor I am usually reading, making photos, or learning a tool I have not tried yet.",
        highlights: ["reading", "photos"],
      },
      {
        text: "I like having my assumptions challenged, because that is how the work gets sharper.",
        highlights: [],
      },
    ] satisfies AboutParagraph[],
  },
  skillsIntro: {
    title: "Skills",
    subtitle: "I am striving to never stop learning and improving",
  },
  services: [
    {
      title: "Web development",
      detail: "React · Node · TypeScript",
      icon: "code",
    },
    {
      title: "Product UI",
      detail: "Tailwind · Accessibility",
      icon: "layout",
    },
  ] satisfies Service[],
  skills: [
    { name: "JavaScript", swatch: "bg-js", label: "text-js", icon: "braces" },
    { name: "React", swatch: "bg-reactbrand", label: "text-reactbrand", icon: "atom" },
    { name: "Node.js", swatch: "bg-node", label: "text-node", icon: "server" },
    { name: "Tailwind", swatch: "bg-tailwind", label: "text-tailwind", icon: "wind" },
  ] satisfies Skill[],
  technologies: [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind",
    "Git",
  ],
  worksIntro: {
    title: "Works",
    subtitle: "I had the pleasure of working with these awesome projects",
  },
  projects: [
    {
      slug: "northwind-commerce",
      title: "Northwind Commerce",
      summary: "A storefront focused on fast product pages, calm checkout, and a catalog that stays easy to browse.",
      description:
        "Storefront UI with a product grid, cart summary, and a checkout column. Built as a sample case study you can replace with a real launch.",
      tech: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/",
      year: "2026",
      preview: "commerce",
      image: "",
    },
    {
      slug: "fieldnote",
      title: "Fieldnote",
      summary: "A notes workspace with a quiet editor, tags, and a reading list that does not fight the writing.",
      description:
        "Writing app case study: sidebar, note list, and a focused editor. Swap the links and the preview image for your own build.",
      tech: ["React", "TypeScript", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/",
      year: "2025",
      preview: "notes",
      image: "",
    },
    {
      slug: "lumen-analytics",
      title: "Lumen Analytics",
      summary: "A dashboard for product traffic, with charts that stay readable and filters that do not reset the page.",
      description:
        "Analytics case study: KPI row, a bar chart, and a recent-events list. Replace this entry with a project you actually shipped.",
      tech: ["React", "Express", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/",
      year: "2025",
      preview: "analytics",
      image: "",
    },
  ] satisfies Project[],
  experienceIntro: {
    title: "Experience",
    subtitle: "Roles and study that shaped how I build",
  },
  experience: [
    {
      id: "independent",
      period: "2023 — Now",
      title: "Full-stack developer",
      org: "Independent",
      description:
        "Design and build web apps end to end: React interfaces, Node APIs, and the small details that make a product feel finished.",
      kind: "work",
    },
    {
      id: "studio",
      period: "2021 — 2023",
      title: "Frontend developer",
      org: "Sample Studio",
      description:
        "Shipped marketing sites and product UI for client teams. This is placeholder history — replace it with your own role.",
      kind: "work",
    },
    {
      id: "study",
      period: "2017 — 2021",
      title: "B.S. Computer Science",
      org: "Sample University",
      description:
        "Studied software, interfaces, and the habit of writing things down. Replace this with your school or another chapter.",
      kind: "education",
    },
  ] satisfies ExperienceItem[],
  blogIntro: {
    title: "Blogs",
    subtitle: "My thoughts on technology and business, welcome to subscribe",
  },
  posts: [
    {
      slug: "interfaces-people-finish",
      title: "Build interfaces people can finish",
      excerpt:
        "A useful screen is one a person can complete without guessing. Labels, focus, and quiet hierarchy do more than another animation.",
      date: "12 Mar 2026",
      readTime: "3 Min",
      tag: "Interface",
      content: [
        "Most interfaces fail in the last inch. The button is there, the data is there, and the person still hesitates because the next step is unclear.",
        "I start with the sentence the screen has to support. If I cannot say what the person is trying to finish, the layout is too early.",
        "From there the work is ordinary and specific: one heading, labels tied to fields, a focus style that survives a theme change, and copy that says what will happen.",
        "Motion can help, but only after the path is obvious with the animation turned off. If the task needs the animation, the task is not designed yet.",
      ],
    },
    {
      slug: "a-stack-that-stays-fast",
      title: "A small stack that stays fast",
      excerpt:
        "React, Node, and a short list of tools are enough when each one has a job. The speed comes from what you leave out.",
      date: "02 Jan 2026",
      readTime: "2 Min",
      tag: "Engineering",
      content: [
        "A portfolio, a store, and a dashboard can share one idea: send less, render less, and keep the data close to the markup.",
        "I reach for React when the screen has real state, Node when the server needs a small API, and Tailwind when the design is a system instead of a one-off.",
        "The rest is restraint. A new library has to remove a problem I already have. If it only adds a file, it waits.",
      ],
    },
  ] satisfies Post[],
  contact: {
    title: "Contact",
    subtitle: "I’m currently available for freelance work",
    formTitle: "Send me a message",
    submit: "Send Message",
    sending: "Sending...",
    subject: "New message from my portfolio",
    helper: "Prefer chat? Message me on WhatsApp.",
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: "Hi Kaif, I found your portfolio and I'd like to connect.",
    fields: {
      name: { label: "Your name *", placeholder: "Enter your name" },
      email: { label: "Your email *", placeholder: "Enter your email" },
      message: { label: "Your message *", placeholder: "Enter your needs" },
    },
    errors: {
      name: "Enter your name.",
      nameMax: "Please use a shorter name.",
      email: "Enter a valid email address.",
      message: "Add a few more words so I know how to help.",
      messageMax: "Please keep the message under 2000 characters.",
    },
    success: "Message sent. I will reply to the email you entered.",
    error: "The message did not send.",
    fallbackLabel: "Email me directly",
  },
  subscribe: {
    label: "Subscribe",
    title: "Subscribe",
    text: "Leave your email and I will send the occasional note on building for the web. No schedule I cannot keep.",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
  ] satisfies SocialLink[],
  footer: {
    privacy: { label: "Privacy Policy", href: "/privacy" },
    terms: { label: "Terms & Conditions", href: "/terms" },
  },
  legal: {
    privacy: {
      title: "Privacy Policy",
      paragraphs: [
        "This site stores a theme preference in local storage on your device. That value stays in the browser and is not sent to a server by the site itself.",
        "If you use the contact form, your name, email, and message are sent through Web3Forms so they can be delivered by email. The site does not store that message itself.",
        "The site does not run advertising trackers. Replace this page with a policy that matches the tools you actually connect.",
      ],
    },
    terms: {
      title: "Terms & Conditions",
      paragraphs: [
        "The writing and sample projects on this site are placeholders until you replace them. Do not treat the case studies as client work.",
        "External links open other sites with their own terms.",
        "You are responsible for the content you publish on this site.",
      ],
    },
  },
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Works", href: "/#works", id: "works" },
  { label: "Blog", href: "/#blog", id: "blog" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

/** Stable id list for the scroll spy. Keep this in the same order as the page. */
export const spyIds: string[] = navLinks.flatMap((link) => (link.id ? [link.id] : []));
