import { createContext, useContext } from "react";

interface ExModalContextValue {
  onClose?: () => void;
  isFullscreen?: boolean;
}

export const ExModalContext = createContext<ExModalContextValue | null>(null);

export const useExModal = () => {
  const ctx = useContext(ExModalContext);
  if (!ctx) throw new Error("ExModal must be used inside ExModal");
  return ctx;
};
