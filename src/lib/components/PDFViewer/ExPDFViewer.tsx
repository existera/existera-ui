"use client";

import { ChevronLeft, ChevronRight, Download, FileText, LoaderCircle, Maximize, RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { createPortal } from "react-dom";
import ExButton from "../Button/ExButton";
import ExInput from "../Input/ExInput";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { cn } from "../../utils/Utils";
import { PDFBinaryDataFactory } from "./PDFAssets";
import type { ExPDFViewerProps } from "./props/ExPDFViewer";

async function loadEngine() {
  const [engine, worker] = await Promise.all([import("pdfjs-dist"), import("pdfjs-dist/build/pdf.worker.min.mjs?url")]);
  engine.GlobalWorkerOptions.workerSrc = worker.default;
  return engine;
}

function Reader({ name, url, file, onClose }: ExPDFViewerProps) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState("");
  const [renderError, setRenderError] = useState("");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(0);
  const [rendering, setRendering] = useState(true);
  const [pageText, setPageText] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [downloadError, setDownloadError] = useState("");
  const dialog = useRef<HTMLDivElement>(null);
  const closeFocus = useRef<HTMLButtonElement>(null);
  useFocusTrap(true, dialog, null, closeFocus, onClose);
  const viewport = useRef<HTMLDivElement>(null);
  const pageHost = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const pageId = useId();
  const total = pdf?.numPages ?? 0;

  const goTo = useCallback(
    (next: number) => {
      const value = Math.max(1, Math.min(total || 1, next));
      setPage(value);
      setPageInput(String(value));
      viewport.current?.scrollTo({ top: 0, left: 0 });
    },
    [total],
  );

  useEffect(() => {
    let cancelled = false;
    let task: PDFDocumentLoadingTask | undefined;
    let loaded: PDFDocumentProxy | undefined;
    async function open() {
      try {
        const engine = await loadEngine();
        const data = file ? new Uint8Array(await file.arrayBuffer()) : undefined;
        if (cancelled) return;
        // Keep parsing and rendering inside our reader rather than a native PDF embed.
        task = engine.getDocument({
          ...(data ? { data } : { url: url! }),
          BinaryDataFactory: PDFBinaryDataFactory,
          useWorkerFetch: false,
          disableWorkerRendering: true,
        });
        loaded = await task.promise;
        if (cancelled) return;
        setPdf(loaded);
      } catch (reason) {
        if (cancelled) return;
        const passwordRequired = reason instanceof Error && reason.name === "PasswordException";
        setError(
          passwordRequired
            ? "This PDF is password protected. Open an unlocked copy to preview it."
            : "Unable to open this PDF. Check the file or URL and try again. Remote URLs must allow cross-origin access.",
        );
      }
    }
    void open();
    return () => {
      cancelled = true;
      if (task) void task.destroy().catch(() => {});
    };
  }, [file, url]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setWidth(Math.max(1, element.clientWidth - 32)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pdf || !width) return;
    const document = pdf;
    let cancelled = false;
    let task: ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]> | undefined;
    async function render() {
      setRendering(true);
      setRenderError("");
      try {
        const sheet = await document.getPage(page);
        if (cancelled) return;
        const angle = (sheet.rotate + rotation) % 360;
        const original = sheet.getViewport({ scale: 1, rotation: angle });
        // 100% means fit to the available reader width, capped for comfortable desktop reading.
        const scale = (Math.min(width, 960) / original.width) * zoom;
        const view = sheet.getViewport({ scale, rotation: angle });
        const canvas = window.document.createElement("canvas");
        // Limit canvas memory on mobile while retaining sharp text on high-DPI screens.
        const density = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(12_000_000 / (view.width * view.height)));
        canvas.width = Math.max(1, Math.floor(view.width * density));
        canvas.height = Math.max(1, Math.floor(view.height * density));
        canvas.style.width = `${view.width}px`;
        canvas.style.height = `${view.height}px`;
        canvas.className = "block bg-white shadow-lg";
        canvas.setAttribute("role", "img");
        canvas.setAttribute("aria-label", `${name || "PDF"}, page ${page} of ${document.numPages}`);
        task = sheet.render({ canvas, viewport: view, transform: [density, 0, 0, density, 0, 0] });
        await task.promise;
        if (cancelled) return;
        pageHost.current?.replaceChildren(canvas);
        setRendering(false);
        const text = await sheet.getTextContent().catch(() => null);
        if (!cancelled) setPageText(text?.items.map((item) => ("str" in item ? item.str : "")).join(" ") ?? "");
      } catch (reason) {
        if (cancelled || (reason instanceof Error && reason.name === "RenderingCancelledException")) return;
        setRenderError("This page could not be rendered. Try again or download the original PDF.");
        setRendering(false);
      }
    }
    void render();
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [pdf, page, width, zoom, rotation, attempt, name]);

  useEffect(() => {
    const bodyOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = bodyOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.target instanceof HTMLInputElement || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goTo(page - 1);
      }
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goTo(page + 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(1);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(total);
      }
    }
    window.document.addEventListener("keydown", onKeyDown);
    return () => window.document.removeEventListener("keydown", onKeyDown);
  }, [onClose, goTo, page, total]);

  async function download() {
    try {
      setDownloadError("");
      const data = file ?? (pdf ? new Blob([new Uint8Array(await pdf.getData())], { type: "application/pdf" }) : null);
      if (!data) return;
      const href = URL.createObjectURL(data);
      const link = window.document.createElement("a");
      link.href = href;
      link.download = name?.toLowerCase().endsWith(".pdf") ? name : `${name || "document"}.pdf`;
      window.document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(href), 60_000);
    } catch {
      setDownloadError("Unable to download this PDF. Please try again.");
    }
  }

  return (
    <div
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-9999 flex h-dvh min-h-0 flex-col bg-surface text-foreground">
      <header className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-3 py-3 sm:px-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
          <FileText size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="truncate text-sm font-semibold">
            {name || "PDF document"}
          </h2>
          <p className="mt-0.5 text-xs text-muted">PDF reader{total ? ` · ${total} pages` : ""}</p>
        </div>
        <ExButton
          variant="text"
          color="secondary"
          iconOnly
          aria-label="Download PDF"
          title="Download PDF"
          disabled={!pdf && !file}
          onClick={() => void download()}>
          <Download size={17} />
        </ExButton>
        <ExButton
          ref={closeFocus}
          variant="soft"
          color="secondary"
          iconOnly
          aria-label="Close PDF viewer"
          title="Close (Escape)"
          onClick={onClose}>
          <X size={18} />
        </ExButton>
      </header>
      <div
        role="toolbar"
        aria-label="PDF viewing controls"
        className="flex shrink-0 flex-wrap items-center justify-center gap-1 border-b border-border bg-surface px-3 py-2 sm:gap-2">
        <ExButton
          size="sm"
          variant="text"
          color="secondary"
          iconOnly
          aria-label="Zoom out"
          title="Zoom out"
          disabled={!pdf || zoom <= 0.5}
          onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))}>
          <ZoomOut size={17} />
        </ExButton>
        <span className="w-12 text-center font-mono text-xs tabular-nums" aria-label="Zoom level">
          {Math.round(zoom * 100)}%
        </span>
        <ExButton
          size="sm"
          variant="text"
          color="secondary"
          iconOnly
          aria-label="Zoom in"
          title="Zoom in"
          disabled={!pdf || zoom >= 3}
          onClick={() => setZoom((value) => Math.min(3, value + 0.25))}>
          <ZoomIn size={17} />
        </ExButton>
        <span className="mx-2 h-4 w-px bg-border" aria-hidden="true" />
        <ExButton size="sm" variant="text" color="secondary" leftIcon={<Maximize size={15} />} disabled={!pdf} onClick={() => setZoom(1)}>
          Fit width
        </ExButton>
        <ExButton
          size="sm"
          variant="text"
          color="secondary"
          iconOnly
          aria-label="Rotate clockwise"
          title="Rotate clockwise"
          disabled={!pdf}
          onClick={() => setRotation((value) => (value + 90) % 360)}>
          <RotateCw size={16} />
        </ExButton>
      </div>
      <div
        ref={viewport}
        tabIndex={0}
        role="region"
        aria-label="Document pages"
        aria-busy={!error && (!pdf || rendering)}
        className="relative min-h-0 flex-1 overflow-auto overscroll-contain bg-surface-3">
        {!error && (
          <div className="flex min-h-full min-w-full w-fit justify-center p-4">
            <div ref={pageHost} className={cn("shrink-0 self-start", rendering && "invisible")} />
          </div>
        )}
        {(!pdf || rendering || error || renderError) && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {error || renderError ? (
              <div role="alert" className="max-w-sm text-center">
                <FileText className="mx-auto mb-4 size-8 text-muted" />
                <p className="text-sm leading-6">{error || renderError}</p>
                {renderError && (
                  <ExButton className="mt-4" size="sm" variant="soft" onClick={() => setAttempt((value) => value + 1)}>
                    Retry page
                  </ExButton>
                )}
              </div>
            ) : (
              <div role="status" className="flex items-center gap-2 text-sm text-muted">
                <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                {pdf ? "Rendering page…" : "Opening document…"}
              </div>
            )}
          </div>
        )}
        <p className="sr-only">{!rendering && !renderError ? pageText : ""}</p>
      </div>
      {downloadError && (
        <p role="alert" className="border-t border-border px-4 py-2 text-center text-xs text-danger">
          {downloadError}
        </p>
      )}
      <footer className="flex shrink-0 items-center justify-center gap-3 border-t border-border bg-surface px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-5">
        <ExButton
          variant="soft"
          color="secondary"
          iconOnly
          aria-label="Previous page"
          title="Previous page"
          disabled={!pdf || page <= 1}
          onClick={() => goTo(page - 1)}>
          <ChevronLeft size={18} />
        </ExButton>
        <form
          className="flex items-center gap-2 text-xs text-muted"
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(pageInput);
            goTo(Number.isFinite(value) && value > 0 ? Math.trunc(value) : page);
          }}>
          <label htmlFor={pageId}>Page</label>
          <div className="w-14">
            <ExInput
              id={pageId}
              type="text"
              size="sm"
              inputMode="numeric"
              autoComplete="off"
              value={pageInput}
              disabled={!pdf}
              onChange={setPageInput}
              onBlur={() => setPageInput(String(page))}
              textAlign="center"
            />
          </div>
          <span>of {total || "—"}</span>
        </form>
        <ExButton
          variant="soft"
          color="secondary"
          iconOnly
          aria-label="Next page"
          title="Next page"
          disabled={!pdf || page >= total}
          onClick={() => goTo(page + 1)}>
          <ChevronRight size={18} />
        </ExButton>
        <span role="status" className="sr-only">
          {pdf ? `Page ${page} of ${total}` : ""}
        </span>
      </footer>
    </div>
  );
}

// Reset all document-specific state when the source changes, including File identity.
export default function ExPDFViewer(props: ExPDFViewerProps) {
  const [source, setSource] = useState({ file: props.file, url: props.url, key: 0 });
  if (source.file !== props.file || source.url !== props.url) {
    setSource({ file: props.file, url: props.url, key: source.key + 1 });
  }
  if (typeof document === "undefined" || (!props.file && !props.url)) return null;
  return createPortal(<Reader key={source.key} {...props} />, document.body);
}
