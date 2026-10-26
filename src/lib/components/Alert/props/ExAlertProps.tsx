import type { HTMLAttributes, ReactNode } from "react";
import type { AlertColor, AlertPadding, AlertSize, AlertVariant } from "../types/ExAlertType";

export interface ExAlertProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  isOpen?: boolean;
  variant?: AlertVariant;
  color?: AlertColor;
  size?: AlertSize;
  padding?: AlertPadding;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-label"?: string;
}
