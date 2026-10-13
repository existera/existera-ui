import type { ReactNode } from "react";
import type {
  BadgeColor,
  BadgeIconPosition,
  BadgeRadius,
  BadgeSize,
  BadgeVariant,
} from "../types/ExBadgeType";

export interface ExBadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  radius?: BadgeRadius;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  dismissible?: boolean;
  className?: string;
  dismissPosition?: BadgeIconPosition;
  children?: ReactNode;
  onDismiss?: () => void;
}
