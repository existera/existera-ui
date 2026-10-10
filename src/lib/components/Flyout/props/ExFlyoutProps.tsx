import type { ReactNode } from "react";
import type { FlyoutSide, FlyoutSize } from "../types/ExFlyoutType";

export interface ExFlyoutProps {
  isOpen?: boolean;
  side?: FlyoutSide;
  size?: FlyoutSize;
  closeByOverlay?: boolean;
  closeButton?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}
