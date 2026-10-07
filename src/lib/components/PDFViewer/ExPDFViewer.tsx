"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, LoaderCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ExButton from "../Button/ExButton";
import type { ExPDFViewerProps } from "./props/ExPDFViewer";

export default function ExPDFViewer({
  name,
  url,
  file,
  onClose,
}: ExPDFViewerProps) {
  const pdfUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return url;
  }, [file, url]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!file || !pdfUrl) return;
    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, [file, pdfUrl]);

  if (!pdfUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex flex-col bg-black/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={name ? `PDF viewer: ${name}` : "PDF viewer"}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="size-5 text-white" aria-hidden="true" />
            <span className="truncate text-sm font-medium text-white">
              {name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ExButton variant="soft" color="danger" iconOnly onClick={onClose}>
              <X size={16} aria-label="Close PDF viewer" />
            </ExButton>
          </div>
        </div>
        <div className="relative flex-1 bg-neutral-900">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900">
              <LoaderCircle className="size-8 animate-spin text-white" aria-hidden="true" />
            </div>
          )}
          <iframe
            src={pdfUrl}
            title={name}
            className="h-full w-full"
            onLoad={() => setLoading(false)}
            aria-label={name || "PDF document"}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}