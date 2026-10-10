import { createContext, useCallback, useContext, useRef } from "react";
import type { RefCallback } from "react";

interface ExModalContextValue {
  onClose?: () => void;
  isFullscreen?: boolean;
  registerPortal?: (element: HTMLElement) => () => void;
}

export const ExModalContext = createContext<ExModalContextValue | null>(null);

export const useExModal = () => {
  const ctx = useContext(ExModalContext);
  if (!ctx) throw new Error("ExModal must be used inside ExModal");
  return ctx;
};

export const useRegisterModalPortal = <T extends HTMLElement>(): RefCallback<T> => {
  const context = useContext(ExModalContext);
  const unregisterRef = useRef<(() => void) | null>(null);
  return useCallback((element: T | null) => {
    unregisterRef.current?.();
    unregisterRef.current = element ? context?.registerPortal?.(element) ?? null : null;
  }, [context]);
};
