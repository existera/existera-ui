import type { Color, Size, Variant } from "../../../types/Types";
export type AlertColorConfig = {
  textOnFilled: string;
  textOnSoft: string;
  bgFilled: string;
  bgSoft: string;
  ring: string;
};
export type AlertVariant = Exclude<Variant, "outline" | "text">;
export type AlertSize = Size;
export type AlertPadding = "s" | "m" | "l";
export type AlertColor = Color;
