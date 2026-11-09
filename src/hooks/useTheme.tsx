import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeName } from "../types/index.ts";

const STORAGE_KEY = "portfolio-theme";

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Stores the theme on `<html data-theme>` and in local storage.
 * The inline script in `index.html` applies the saved value before paint.
 *
 * @example
 * <ThemeProvider><App /></ThemeProvider>
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const current = document.documentElement.dataset.theme;
    return current === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Read and toggle the persisted color theme.
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}
