import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = string;

const STORAGE_KEY = "theme";
const THEME_EVENT = "ex-theme-change";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): string {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const html = document.documentElement;
  const resolved = resolveTheme(theme);
  const colorScheme = resolved === "dark" ? "dark" : "light";

  html.dataset.theme = resolved;
  html.style.colorScheme = colorScheme;
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "system";

  const storedTheme = localStorage.getItem(STORAGE_KEY);

  if (!storedTheme || storedTheme === "system") {
    return getSystemTheme();
  }

  return storedTheme;
}

function getServerSnapshot(): Theme {
  return "system";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(THEME_EVENT, handler);
  media.addEventListener("change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(THEME_EVENT, handler);
    media.removeEventListener("change", handler);
  };
}

export default function useExTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((value: Theme) => {
    if (typeof window === "undefined") return;

    if (value === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, value);
    }

    applyTheme(value);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme("system");
  }, [setTheme]);

  return {
    theme,
    setTheme,
    resetTheme,
  };
}
