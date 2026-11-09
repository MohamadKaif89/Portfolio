import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import { Preloader } from "./components/effects/Preloader.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { HomePage } from "./pages/HomePage.tsx";

const BlogPostPage = lazy(() =>
  import("./pages/BlogPostPage.tsx").then((module) => ({ default: module.BlogPostPage })),
);
const LegalPage = lazy(() =>
  import("./pages/LegalPage.tsx").then((module) => ({ default: module.LegalPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage.tsx").then((module) => ({ default: module.NotFoundPage })),
);

/**
 * Scrolls to a hash target after navigation, or back to the top of a new page.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

/**
 * Application shell: theme, motion preferences, routes, and the load transition.
 *
 * @example
 * <App />
 */
export default function App() {
  const [booting, setBooting] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const finishBoot = useCallback(() => setBooting(false), []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollManager />
          <AnimatePresence>{booting ? <Preloader onDone={finishBoot} /> : null}</AnimatePresence>
          <Layout>
            <Suspense
              fallback={
                <p className="px-6 py-24 text-center font-sans text-body text-ink">Loading…</p>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/privacy" element={<LegalPage kind="privacy" />} />
                <Route path="/terms" element={<LegalPage kind="terms" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
