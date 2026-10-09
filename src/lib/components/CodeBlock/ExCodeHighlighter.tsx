import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";

import { oneDark, oneLight, vscDarkPlus, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  return (
    <SyntaxHighlighter
      language={language}
      style={themes[theme as keyof typeof themes] ?? oneDark}
      showLineNumbers={showLineNumbers}
      wrapLines
      wrapLongLines={false}
      customStyle={{
        margin: 0,
        padding,
        background: "transparent",
        fontSize,
        width: "100%",
        whiteSpace: "pre",
      }}
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
