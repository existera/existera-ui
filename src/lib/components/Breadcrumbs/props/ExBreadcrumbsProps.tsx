import type {
  BreacrumbsSize,
  BreadcrumbsColor,
} from "../types/ExBreadcrumbsType";

export interface ExBreadcrumbsProps {
  children: React.ReactNode;
  separator?: React.ReactNode;
  color?: BreadcrumbsColor;
  size?: BreacrumbsSize;
}
