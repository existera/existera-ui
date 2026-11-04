import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";

import { oneDark, oneLight, vscDarkPlus, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ensureCodeContrast } from "./codeContrast";
import type { CodeBlockTheme } from "./types/ExCodeBlockTypes";

SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("jsx", js);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", markup);

const themes = {
  oneDark,
  oneLight,
  vscDarkPlus,
  atomDark,
};

interface ExCodeHighlighterProps {
  language: string;
  theme: CodeBlockTheme;
  showLineNumbers: boolean;
  padding: string;
  fontSize: string;
  children: string;
}

export default function ExCodeHighlighter({ language, theme, showLineNumbers, padding, fontSize, children }: ExCodeHighlighterProps) {
  const sourceTheme = themes[theme as keyof typeof themes] ?? oneDark;
  const isLight = theme === "oneLight";
  const commentColor = isLight ? "#5a6170" : "#a4adbd";
  const background = sourceTheme['pre[class*="language-"]']?.background as string ?? (isLight ? "#fafafa" : "#282c34");
  const accessibleTheme = Object.fromEntries(Object.entries(sourceTheme).map(([selector, style]) => [
    selector,
    { ...style, ...(typeof style.color === "string" ? { color: ensureCodeContrast(style.color, background) } : {}) },
  ]));
  return (
    <SyntaxHighlighter
      language={language}
      style={accessibleTheme}
      showLineNumbers={showLineNumbers}
      wrapLines
      wrapLongLines={false}
      customStyle={{
        margin: 0,
        padding,
        background,
        fontSize,
        width: "100%",
        whiteSpace: "pre",
      }}
      lineNumberStyle={{ color: commentColor, minWidth: "2.25em" }}
      codeTagProps={{
        style: {
          background: "transparent",
          whiteSpace: "pre",
        },
      }}>
      {children}
    </SyntaxHighlighter>
  );
}
