import type { ReactNode } from "react";
import { CustomCursor } from "../effects/CustomCursor.tsx";
import { ScrollProgress } from "../effects/ScrollProgress.tsx";
import { WhatsAppButton } from "../ui/WhatsAppButton.tsx";
import { Footer } from "./Footer.tsx";
import { Navbar } from "./Navbar.tsx";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Shared chrome: skip link, scroll progress, cursor, navigation, footer, and the WhatsApp button.
 *
 * @example
 * <Layout><HomePage /></Layout>
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </div>
  );
}
