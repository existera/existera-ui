"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Image, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ExButton from "../Button/ExButton";
import type { ExImageViewerProps } from "./props/ExImageViewerProps";

const MIN_SCALE = 1;
const MAX_SCALE = 5;

export default function ExImageViewer({
  name,
  url,
  file,
  onClose,
}: ExImageViewerProps) {
  const [transform, setTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const dragging = useRef(false);
  const start = useRef({
    x: 0,
    y: 0,
  });
  const pointers = useRef<Map<number, PointerEvent>>(new Map());
  const lastDistance = useRef<number | null>(null);
  const [showZoom, setShowZoom] = useState(false);
  const zoomTimeout = useRef<number | null>(null);

  const showZoomIndicator = () => {
    setShowZoom(true);
    if (zoomTimeout.current) {
      window.clearTimeout(zoomTimeout.current);
    }
    zoomTimeout.current = window.setTimeout(() => {
      setShowZoom(false);
    }, 1000);
  };

  const imageUrl = useMemo(() => {
    if (url) return url;
    if (file) return URL.createObjectURL(file);
    return "";
  }, [url, file]);

  useEffect(() => {
    return () => {
      if (zoomTimeout.current) {
        window.clearTimeout(zoomTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!file) return;
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [file, imageUrl]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const clampScale = (value: number) =>
    Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

  const updateScale = (value: number) => {
    const scale = clampScale(value);
    setTransform((prev) => ({
      scale,
      x: scale === 1 ? 0 : prev.x,
      y: scale === 1 ? 0 : prev.y,
    }));
    showZoomIndicator();
  };

  const reset = () => {
    setTransform({
      scale: 1,
      x: 0,
      y: 0,
    });
  };

  const download = async () => {
    try {
      let blob: Blob;
      if (file) {
        blob = file;
      } else {
        const response = await fetch(imageUrl);
        blob = await response.blob();
      }
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error(error);
      window.open(imageUrl, "_blank");
    }
  };

  const getDistance = (a: PointerEvent, b: PointerEvent) => {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, e.nativeEvent);
    if (transform.scale > 1 && pointers.current.size === 1) {
      dragging.current = true;
      start.current = {
        x: e.clientX - transform.x,
        y: e.clientY - transform.y,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, e.nativeEvent);
    const events = [...pointers.current.values()];
    if (events.length === 2) {
      const distance = getDistance(events[0], events[1]);
      if (lastDistance.current === null) {
        lastDistance.current = distance;
        return;
      }
      const delta = distance - lastDistance.current;
      if (Math.abs(delta) > 1) {
        updateScale(transform.scale + delta * 0.005);
        lastDistance.current = distance;
      }
      return;
    }
    if (!dragging.current || transform.scale === 1) {
      return;
    }
    const limit = 350 * (transform.scale - 1);
    const x = Math.max(-limit, Math.min(limit, e.clientX - start.current.x));
    const y = Math.max(-limit, Math.min(limit, e.clientY - start.current.y));
    setTransform((prev) => ({
      ...prev,
      x,
      y,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    dragging.current = false;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) {
      lastDistance.current = null;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    updateScale(transform.scale + delta);
  };

  const handleDoubleClick = () => {
    const nextScale =
      transform.scale >= MAX_SCALE
        ? MIN_SCALE
        : Math.min(transform.scale + 0.5, MAX_SCALE);
    updateScale(nextScale);
    if (nextScale === MIN_SCALE) {
      setTransform({
        scale: MIN_SCALE,
        x: 0,
        y: 0,
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-999999 bg-black/90 backdrop-blur-md"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={name ? `Image viewer: ${name}` : "Image viewer"}
      >
        <div
          className="relative z-20 flex items-center justify-between border-b border-white/10 bg-surface px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex max-w-[55%] min-w-0 items-center gap-2 font-medium">
            <Image size={20} className="shrink-0" aria-hidden="true" />
            <span className="truncate select-none">{name}</span>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {transform.scale !== 1 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                >
                  <ExButton
                    variant="soft"
                    color="secondary"
                    iconOnly
                    onClick={reset}
                  >
                    <RotateCcw size={16} aria-label="Reset zoom" />
                  </ExButton>
                </motion.div>
              )}
              {transform.scale !== 1 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                >
                  <ExButton
                    variant="soft"
                    color="secondary"
                    iconOnly
                    onClick={() => updateScale(transform.scale - 0.25)}
                  >
                    <ZoomOut size={16} aria-label="Zoom out" />
                  </ExButton>
                </motion.div>
              )}
            </AnimatePresence>
            <ExButton
              variant="soft"
              color="secondary"
              iconOnly
              onClick={() => updateScale(transform.scale + 0.25)}
            >
              <ZoomIn size={16} aria-label="Zoom in" />
            </ExButton>
            <ExButton
              variant="soft"
              color="secondary"
              iconOnly
              onClick={download}
            >
              <Download size={16} aria-label="Download image" />
            </ExButton>
            <ExButton variant="soft" color="danger" iconOnly onClick={onClose}>
              <X size={16} aria-label="Close image viewer" />
            </ExButton>
          </div>
        </div>

        <div
          className="flex h-[calc(100%-65px)] w-full items-center justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onWheel={handleWheel}
        >
          <AnimatePresence>
            {showZoom && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="pointer-events-none absolute top-20 left-1/2 z-9999 -translate-x-1/2"
              >
                <div className="rounded-md bg-black/70 px-2 py-1 backdrop-blur-md">
                  <span className="text-sm font-medium text-white select-none">
                    {Math.round(transform.scale * 100)}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.img
            src={imageUrl}
            alt={name}
            draggable={false}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            animate={{
              scale: transform.scale,
              x: transform.x,
              y: transform.y,
            }}
            transition={{
              type: "tween",
              duration: 0.08,
              ease: "easeOut",
            }}
            style={{
              touchAction: "none",
              userSelect: "none",
            }}
            className={`max-h-full max-w-full object-contain ${
              transform.scale === 1
                ? "cursor-zoom-in"
                : "cursor-grab active:cursor-grabbing"
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}