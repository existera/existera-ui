import type { Color, Radius, Size, Variant } from "../../../types/Types";

export type ButtonGroupSize = Size;
export type ButtonGroupColor = Color;
export type ButtonGroupVariant = Exclude<Variant, "text">;
export type ButtonGroupRadius = Radius;
export type ButtonGroupResponsive = "wrap" | "scroll" | "stack";
