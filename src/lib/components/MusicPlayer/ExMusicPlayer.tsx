"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ExButton from "../Button/ExButton";
import type { ExMusicPlayerProps } from "./props/ExMusicPlayerProps";

const VISUALIZER_HEIGHTS = [12, 20, 8, 26, 16, 22, 10, 30, 14, 24, 18, 28, 12, 26, 16, 22, 10, 30, 14, 24, 18, 28, 12, 20];

export default function ExMusicPlayer({ name, url, autoPlay = false, loop = false, muted = false, onClose }: ExMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [volumeOpen, setVolumeOpen] = useState(false);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return (current / duration) * 100;
  }, [current, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setLoading(true);
    setDuration(0);
    setCurrent(0);

    audio.src = url;
    audio.loop = loop;
    audio.muted = muted;

    if (autoPlay) {
      audio.play().catch(() => {
        setPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, [url, loop, autoPlay, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target as Node)) {
        setVolumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const updateVolume = (value: number) => {
    setVolume(value);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    audio.muted = value === 0;
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="fixed bottom-5 left-1/2 z-9999 w-[calc(100%-32px)] max-w-md -translate-x-1/2"
        role="region"
        aria-label={name ? `Music player: ${name}` : "Music player"}>
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-linear-to-br from-white via-white to-neutral-100 p-5 shadow-[0_30px_80px_rgba(0,0,0,.15)] backdrop-blur-2xl dark:border-white/10 dark:bg-none dark:bg-neutral-950/80 dark:shadow-[0_30px_80px_rgba(0,0,0,.55)]">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/5 via-transparent to-transparent dark:from-white/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{
                  duration: 8,
                  repeat: playing ? Infinity : 0,
                  ease: "linear",
                }}
                className="relative flex size-14 items-center justify-center rounded-full bg-linear-to-br from-black/10 to-black/5 ring-1 ring-black/10 dark:from-white/20 dark:to-white/5 dark:ring-white/10"
                aria-hidden="true">
                <div className="absolute inset-1 rounded-full bg-background dark:bg-black" />
                <Music size={22} className="relative" />
              </motion.div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{name}</p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-white/50">{playing ? "Playing now" : "Paused"}</p>
              </div>
            </div>

            <ExButton variant="text" color="danger" iconOnly onClick={onClose}>
              <X size={17} aria-label="Close music player" />
            </ExButton>
          </div>

          <div className="mt-5 flex h-8 items-center justify-center gap-1" aria-hidden={playing ? "false" : "true"}>
            {loading ? (
              <LoaderCircle size={24} className="animate-spin text-neutral-400 dark:text-white/50" />
            ) : (
              VISUALIZER_HEIGHTS.map((height, index) => (
                <motion.span
                  key={index}
                  animate={{
                    height: playing ? [6, height, 6] : 6,
                    opacity: playing ? 1 : 0.35,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: index * 0.03,
                  }}
                  className="w-1 rounded-full bg-neutral-900/40 dark:bg-white/40"
                />
              ))
            )}
          </div>

          <audio
            ref={audioRef}
            preload="metadata"
            onLoadedMetadata={(event) => {
              setDuration(event.currentTarget.duration);
              setLoading(false);
            }}
            onCanPlay={() => setLoading(false)}
            onError={() => setLoading(false)}
            onTimeUpdate={(event) => {
              setCurrent(event.currentTarget.currentTime);
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          <div className="mt-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={current}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = value;
                }
                setCurrent(value);
              }}
              className="h-1 w-full cursor-pointer accent-neutral-900 dark:accent-white"
              aria-label="Seek bar"
              style={{
                background: `linear-gradient(to right, currentColor ${progress}%, rgba(0,0,0,.15) ${progress}%)`,
              }}
            />

            <div className="mt-2 flex justify-between text-[11px] text-neutral-500 dark:text-white/40">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <ExButton variant="text" iconOnly color="secondary" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </ExButton>

            <div ref={volumeRef} className="relative">
              <ExButton variant="text" color="secondary" iconOnly onClick={() => setVolumeOpen((value) => !value)} aria-label="Volume">
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </ExButton>

              <AnimatePresence>
                {volumeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute bottom-full left-1/2 mb-0 flex h-40 -translate-x-1/2 items-center rounded-2xl border border-border bg-white/95 px-3 shadow-xl backdrop-blur-xl dark:bg-background/75"
                    role="slider"
                    aria-label="Volume control"
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={volume}>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(event) => updateVolume(Number(event.target.value))}
                      className="h-28 w-1 cursor-pointer appearance-none"
                      style={{
                        writingMode: "vertical-lr",
                        direction: "rtl",
                        background: `linear-gradient(to top, currentColor 0%, currentColor ${volume * 100}%, rgba(0,0,0,.15) ${volume * 100}%, rgba(0,0,0,.15) 100%)`,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
