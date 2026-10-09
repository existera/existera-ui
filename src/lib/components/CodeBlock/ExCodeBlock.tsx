"use client";

import { lazy, Suspense, useState, useSyncExternalStore } from "react";
import { Check, Copy } from "lucide-react";
import type { ExCodeBlockProps } from "./props/ExCodeBlockProps";
import {
  ColorCodeBlockBodyStyles,
  ColorCodeBlockStyles,
  SizeCodeBlockClass,
} from "./class/CodeBlockClass";
import { cn } from "../../utils/Utils";

const SyntaxHighlighter = lazy(() => import("./ExCodeHighlighter"));
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function ExCodeBlock({
  language = "tsx",
  title,
  showLineNumbers = true,
  color = "default",
  size = "md",
  theme = "oneDark",
  children,
}: ExCodeBlockProps) {
  const sizeClass = SizeCodeBlockClass[size];
  const code = Array.isArray(children) ? children.join("") : children;
  const isMounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-full overflow-hidden border text-foreground rounded-xl",
        ColorCodeBlockStyles[color],
      )}
      role="region"
      aria-label={title ? `Code block: ${title}` : "Code block"}
    >
      <div
        className={`flex justify-between gap-5 ${
          color === "default"
            ? "bg-surface-3 border-b border-surface-3"
            : ColorCodeBlockStyles[color]
        }`}
        style={{
          padding: sizeClass.headerPadding,
        }}
      >
        <div className="text-xs truncate max-w-full">{title || language}</div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs hover:text-foreground transition self-start sm:self-auto hover:cursor-pointer"
          aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? (
            <>
              <Check size={13} /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>

      <div
        className={cn(
          "code-scroll w-full max-w-full overflow-x-auto",
          ColorCodeBlockBodyStyles[color],
        )}
      >
        {isMounted ? (
          <Suspense fallback={<pre className="m-0 overflow-x-auto" style={{ padding: sizeClass.padding, fontSize: sizeClass.fontSize }}><code>{code}</code></pre>}>
            <SyntaxHighlighter
              language={language}
              theme={theme}
              showLineNumbers={showLineNumbers}
              padding={sizeClass.padding}
              fontSize={sizeClass.fontSize}
            >
              {code}
            </SyntaxHighlighter>
          </Suspense>
        ) : (
          <pre className="m-0 overflow-x-auto" style={{ padding: sizeClass.padding, fontSize: sizeClass.fontSize }}><code>{code}</code></pre>
        )}
      </div>

      <style>{`
        .code-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .code-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .code-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .code-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          transition: background 0.3s ease;
        }

        .code-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </div>
  );
}
