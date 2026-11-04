import type { ReactNode } from "react";
import type { FlyoutSide, FlyoutSize } from "../types/ExFlyoutType";

export interface ExFlyoutProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  isOpen?: boolean;
  side?: FlyoutSide;
  size?: FlyoutSize;
  closeByOverlay?: boolean;
  closeButton?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}
