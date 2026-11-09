import { useEffect } from "react";
import { portfolio } from "../data/portfolio.ts";
import { About } from "../components/sections/About.tsx";
import { Blog } from "../components/sections/Blog.tsx";
import { Contact } from "../components/sections/Contact.tsx";
import { Experience } from "../components/sections/Experience.tsx";
import { Hero } from "../components/sections/Hero.tsx";
import { Projects } from "../components/sections/Projects.tsx";
import { Skills } from "../components/sections/Skills.tsx";
import { Seo } from "../components/seo/Seo.tsx";

/**
 * Home page. Section order follows the Figma frame, with Experience added in the same visual system.
 *
 * @example
 * <Route path="/" element={<HomePage />} />
 */
export function HomePage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: portfolio.name,
      jobTitle: portfolio.role,
      email: portfolio.email,
      url: portfolio.websiteUrl,
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <Seo title={portfolio.seo.title} description={portfolio.seo.description} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
    </>
  );
}
