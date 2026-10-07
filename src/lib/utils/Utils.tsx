import { clsx } from "clsx";
import { useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export function useReducedMotionProps() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useCallback(
    (props: { animate?: unknown; initial?: unknown; exit?: unknown }) => {
      if (prefersReducedMotion) {
        return {
          animate: props.animate || undefined,
          initial: props.initial || { opacity: 1 },
          exit: props.exit || { opacity: 0 },
          transition: { duration: 0 },
        };
      }
      return props;
    },
    [prefersReducedMotion]
  );
}
