import { clsx } from "clsx";
import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
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
    [prefersReducedMotion],
  );
}
