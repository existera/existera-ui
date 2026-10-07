import type { Color, NodePosition, Radius, Size } from "../../../types/Types";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeColor = Color;
export type BadgeSize = Size;
export type BadgeRadius = Radius;
export type BadgeIconPosition = Exclude<NodePosition, "center">;
