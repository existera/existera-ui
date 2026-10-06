"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ExButton from "../Button/ExButton";
import type { ExVideoPlayerProps } from "./props/ExVideoPlayerProps";

export default function ExVideoPlayer({
  name,
  url,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
  onClose,
}: ExVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    const video = videoRef.current;
    if (!video) return;
    setError(false);
    video.src = url;
    video.load();
    if (autoPlay) {
      void video.play().catch(() => {});
    }
    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [url, autoPlay]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex flex-col bg-black/90 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={name || "Video player"}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Video className="size-5 text-white" aria-hidden="true" />
            <span className="truncate text-sm font-medium text-white">
              {name}
            </span>
          </div>
          <ExButton variant="text" color="danger" iconOnly onClick={onClose}>
            <X size={16} aria-label="Close video player" />
          </ExButton>
        </div>
        <div className="relative flex flex-1 items-center justify-center bg-black">
          {loading && !error && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <LoaderCircle 
                className="size-8 animate-spin text-white" 
                aria-hidden="true" 
              />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-sm text-white">
              Unable to load video.
            </div>
          )}
          <video
            ref={videoRef}
            className="max-h-full max-w-full"
            controls={controls}
            loop={loop}
            muted={muted}
            poster={poster}
            playsInline
            preload="metadata"
            aria-label={name || "Video content"}
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onCanPlay={() => {
              setLoading(false);
            }}
            onPlaying={() => {
              setLoading(false);
            }}
            onWaiting={() => {
              setLoading(true);
            }}
            onStalled={() => {
              setLoading(true);
            }}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}