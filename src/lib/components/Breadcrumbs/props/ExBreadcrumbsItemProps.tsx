import type { ElementType, ReactNode, MouseEvent } from "react";
import type { BreadcrumbOpenMode } from "../types/ExBreadcrumbsType";

export interface ExBreadcrumbsItemProps {
  as?: ElementType;
  to?: string;
  href?: string;
  navigate?: (path: string) => void;
  openMode?: BreadcrumbOpenMode;
  active?: boolean;
  color?: "default" | "bw";
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
