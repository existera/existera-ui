import type { Color, Radius, Size, Variant } from "../../../types/Types";

export type PaginationColor = Color;
export type PaginationSize = Size;
export type PaginationVariant = Exclude<Variant, "text">;
export type PaginationRadius = Radius;
