import type {
  PaginationSize,
  PaginationVariant,
  PaginationRadius,
  PaginationColor,
} from "../types/ExPaginationType";

export interface ExPaginationProps {
  color?: PaginationColor;
  page?: number;
  total?: number;
  range?: number;
  variant?: PaginationVariant;
  size?: PaginationSize;
  radius?: PaginationRadius;
  onPageChange?: (page: number) => void;
}
