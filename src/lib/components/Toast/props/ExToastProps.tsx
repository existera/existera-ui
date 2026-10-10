import { createContext, type ReactNode } from "react";

import type { ToastPosition, ToastType } from "../types/ExToastType";

export type ToastLayout = "stack" | "overlap";

export interface ToastItemProps {
  id: string;
  title?: string;
  description?: string;
  content?: ReactNode;

  type: ToastType;
  duration?: number;

  position?: ToastPosition;
  layout?: ToastLayout;
}

export interface ExToastProps {
  toast: ToastItemProps;
  onClose: (id: string) => void;
}

export interface ToastContextType {
  show: (toast: Omit<ToastItemProps, "id">) => void;
}

export interface ExToastProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext<ToastContextType | null>(null);
