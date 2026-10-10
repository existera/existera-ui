import type { Color, Size } from "../../../types/Types";

export type CodeBlockColor = "default" | Color;
export type CodeBlockSize = Size;
import * as PrismThemes from "react-syntax-highlighter/dist/esm/styles/prism";

export type CodeBlockTheme = keyof typeof PrismThemes;
