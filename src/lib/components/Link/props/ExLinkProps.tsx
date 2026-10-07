import type { AnchorHTMLAttributes, ElementType, ReactNode } from "react";
import type {
  LinkColor,
  LinkOpenMode,
  LinkSize,
  LinkUnderline,
  LinkWeight,
} from "../types/ExLinkType";

export interface ExLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> {
  as?: ElementType;
  to?: string;
  href?: string;
  openMode?: LinkOpenMode;
  navigate?: (path: string) => void;
  color?: LinkColor;
  size?: LinkSize;
  weight?: LinkWeight;
  underline?: LinkUnderline;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
