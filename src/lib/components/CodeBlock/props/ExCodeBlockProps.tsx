import type {
  CodeBlockColor,
  CodeBlockSize,
  CodeBlockTheme,
} from "../types/ExCodeBlockTypes";

export interface ExCodeBlockProps {
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  color?: CodeBlockColor;
  size?: CodeBlockSize;
  children: string | string[];
  theme?: CodeBlockTheme;
}
