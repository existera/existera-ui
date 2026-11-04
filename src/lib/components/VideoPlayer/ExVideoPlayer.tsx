"use client";

import {
  Captions,
  Check,
  CircleAlert,
  Download,
  LoaderCircle,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  RotateCw,
  Settings2,
  Video,
  Volume1,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { createPortal } from "react-dom";
import ExButton from "../Button/ExButton";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { cn } from "../../utils/Utils";
import { formatVideoTime, getBufferedSegments, getVideoError } from "./videoUtils";
import type { ExVideoPlayerProps } from "./props/ExVideoPlayerProps";

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const EMPTY_TRACKS: NonNullable<ExVideoPlayerProps["tracks"]> = [];
function PlayerButton({
  label,
  children,
  className,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & { label: string; children: ReactNode; ref?: Ref<HTMLButtonElement> }) {
  return (
    <ExButton
      variant="text"
      color="secondary"
      size="md"
      iconOnly
      title={label}
      aria-label={label}
      className={cn("text-foreground! hover:bg-surface-3! hover:text-foreground!", className)}
      {...props}>
      {children}
    </ExButton>
  );
}

type DocumentPip = { requestWindow: (options: { width: number; height: number; disallowReturnToOpener: boolean }) => Promise<Window> };
const getDocumentPip = () => (window as Window & { documentPictureInPicture?: DocumentPip }).documentPictureInPicture;

function VideoReader({
  name,
  url,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
  tracks = EMPTY_TRACKS,
  crossOrigin,
  onClose,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onBufferingChange,
  onError,
  onRestore,
}: ExVideoPlayerProps) {
  const videoHome = useRef<HTMLDivElement>(null);
  const pipSlot = useRef<HTMLDivElement>(null);
  const pipWindowRef = useRef<Window | null>(null);
  const pipAction = useRef<"return" | "close" | null>(null);
  const closed = useRef(false);
  const nativeReturning = useRef(false);
  const [mode, setMode] = useState<"visible" | "hidden" | "closed">("visible");
  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const visible = mode === "visible";
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeFocus = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const playingIntent = useRef(autoPlay);
  const lastVolume = useRef(1);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState<{ start: number; end: number }[]>([]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [rate, setRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [pip, setPip] = useState(false);
  const [settings, setSettings] = useState(false);
  const [caption, setCaption] = useState(-1);
  const titleId = useId();
  const settingsId = useId();
  const seekable = Number.isFinite(duration) && duration > 0;
  const busy = !error && (loading || buffering);
  const progress = seekable ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;
  const supportsPip = Boolean(
    getDocumentPip() || (document.pictureInPictureEnabled && "requestPictureInPicture" in HTMLVideoElement.prototype),
  );
  const supportsFullscreen = Boolean(document.fullscreenEnabled && "requestFullscreen" in HTMLElement.prototype);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    playingIntent.current = true;
    setNotice("");
    try {
      await video.play();
    } catch (reason) {
      if (reason instanceof Error && reason.name === "AbortError") return;
      playingIntent.current = false;
      setBuffering(false);
      setNotice("Playback could not start. Press play to try again; your browser may require an interaction.");
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || error) return;
    if (video.paused || video.ended) void play();
    else {
      playingIntent.current = false;
      video.pause();
    }
  }, [error, play]);

  const seek = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const next = Math.min(video.duration, Math.max(0, value));
    video.currentTime = next;
    setCurrent(next);
    setEnded(false);
  }, []);

  const changeVolume = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = Math.max(0, Math.min(1, value));
    video.muted = value === 0;
    if (value > 0) lastVolume.current = value;
    setVolume(video.volume);
    setIsMuted(video.muted);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || video.volume === 0) changeVolume(lastVolume.current || 1);
    else {
      lastVolume.current = video.volume;
      video.muted = true;
      setIsMuted(true);
    }
  }, [changeVolume]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement === rootRef.current) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch {
      setNotice("Fullscreen is unavailable in this browser or embedded context.");
    }
  }, []);

  const restoreVideo = useCallback(() => {
    const video = videoRef.current;
    if (video && videoHome.current && video.parentNode !== videoHome.current) videoHome.current.append(video);
  }, []);

  const close = useCallback(() => {
    if (closed.current) return;
    closed.current = true;
    playingIntent.current = false;
    pipAction.current = "close";
    restoreVideo();
    const video = videoRef.current;
    video?.pause();
    video?.removeAttribute("src");
    video?.load();
    pipWindowRef.current?.close();
    if (document.pictureInPictureElement === video) void document.exitPictureInPicture().catch(() => {});
    if (document.fullscreenElement === rootRef.current) void document.exitFullscreen().catch(() => {});
    setPipWindow(null);
    setMode("closed");
    onClose();
  }, [onClose, restoreVideo]);

  const returnToTab = useCallback(() => {
    if (closed.current) return;
    pipAction.current = "return";
    nativeReturning.current = true;
    restoreVideo();
    pipWindowRef.current?.close();
    if (document.pictureInPictureElement === videoRef.current) void document.exitPictureInPicture().catch(() => {});
    setPipWindow(null);
    setPip(false);
    setMode("visible");
    window.focus();
    onRestore?.();
  }, [onRestore, restoreVideo]);

  async function togglePip() {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.fullscreenElement === rootRef.current) await document.exitFullscreen();
      pipAction.current = null;
      nativeReturning.current = false;
      const documentPip = getDocumentPip();
      if (documentPip) {
        const popup = await documentPip.requestWindow({ width: 480, height: 320, disallowReturnToOpener: true });
        if (closed.current) {
          popup.close();
          return;
        }
        popup.document.title = name || "Video";
        // Preserve theme tokens and ExButton styles in the same-origin PiP window.
        for (const sheet of document.styleSheets) {
          try {
            const style = popup.document.createElement("style");
            style.textContent = Array.from(sheet.cssRules, (rule) => rule.cssText).join("\n");
            popup.document.head.append(style);
          } catch {
            if (sheet.href) {
              const link = popup.document.createElement("link");
              link.rel = "stylesheet";
              link.href = sheet.href;
              popup.document.head.append(link);
            }
          }
        }
        const theme = document.documentElement.dataset.theme;
        if (theme) popup.document.documentElement.dataset.theme = theme;
        popup.document.body.style.cssText = "margin:0;background:var(--color-surface);color:var(--color-foreground);overflow:hidden";
        popup.addEventListener(
          "pagehide",
          () => {
            restoreVideo();
            pipWindowRef.current = null;
            setPipWindow(null);
            setPip(false);
            if (pipAction.current === null) close();
          },
          { once: true },
        );
        pipWindowRef.current = popup;
        setPipWindow(popup);
        setPip(true);
        setSettings(false);
        setMode("hidden");
      } else {
        await video.requestPictureInPicture();
      }
    } catch {
      setNotice("Picture-in-picture is unavailable for this video or browser.");
    }
  }

  useLayoutEffect(() => {
    if (pipWindow && pipSlot.current && videoRef.current) pipSlot.current.append(videoRef.current);
    return () => {
      restoreVideo();
    };
  }, [pipWindow, restoreVideo]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    closed.current = false;
    return () => {
      closed.current = true;
      pipAction.current = "close";
      restoreVideo();
      pipWindowRef.current?.close();
      if (document.pictureInPictureElement === video) void document.exitPictureInPicture().catch(() => {});
    };
  }, [restoreVideo]);

  function syncBuffer() {
    const video = videoRef.current;
    if (video) setBuffered(getBufferedSegments(video.buffered, video.duration));
  }

  function ready() {
    setLoading(false);
    setBuffering(false);
    syncBuffer();
  }

  function retry() {
    const video = videoRef.current;
    if (!video) return;
    setError("");
    setNotice("");
    setLoading(true);
    setBuffering(false);
    setEnded(false);
    setCurrent(0);
    setDuration(0);
    setBuffered([]);
    video.load();
    void play();
  }

  function selectCaption(index: number) {
    const video = videoRef.current;
    if (!video) return;
    Array.from(video.textTracks).forEach((track, trackIndex) => {
      track.mode = trackIndex === index ? "showing" : "disabled";
    });
    setCaption(index);
  }

  useEffect(() => {
    onBufferingChange?.(buffering);
  }, [buffering, onBufferingChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = url;
    video.load();
    return () => {
      playingIntent.current = false;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [url]);

  useEffect(() => {
    const video = videoRef.current;
    const onFullscreen = () => setFullscreen(document.fullscreenElement === rootRef.current);
    const enterPip = () => {
      setPip(true);
      setSettings(false);
      setMode("hidden");
    };
    const leavePip = () => {
      setPip(false);
      if (closed.current) return;
      if (nativeReturning.current) {
        setMode("visible");
        return;
      }
      if (document.visibilityState === "visible" && document.hasFocus()) returnToTab();
      else if (video?.paused) close();
      else returnToTab();
    };
    const onFocus = () => {
      if (document.pictureInPictureElement === video && document.visibilityState === "visible") returnToTab();
    };
    video?.addEventListener("enterpictureinpicture", enterPip);
    video?.addEventListener("leavepictureinpicture", leavePip);
    document.addEventListener("fullscreenchange", onFullscreen);
    window.addEventListener("focus", onFocus);
    return () => {
      video?.removeEventListener("enterpictureinpicture", enterPip);
      video?.removeEventListener("leavepictureinpicture", leavePip);
      document.removeEventListener("fullscreenchange", onFullscreen);
      window.removeEventListener("focus", onFocus);
    };
  }, [close, returnToTab]);

  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = bodyOverflow;
      if (document.fullscreenElement === root) void document.exitFullscreen().catch(() => {});
    };
  }, [visible]);

  useEffect(() => {
    if (!settings || !visible) return;
    function outside(event: PointerEvent) {
      if (!settingsRef.current?.contains(event.target as Node)) setSettings(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [settings, visible]);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement
      )
        return;
      const key = event.key.toLowerCase();
      if ((key === " " || key === "enter") && event.target instanceof HTMLButtonElement) return;
      if (key === " " || key === "k") {
        event.preventDefault();
        togglePlay();
      } else if (key === "arrowleft" || key === "j") {
        event.preventDefault();
        seek((videoRef.current?.currentTime || 0) - 10);
      } else if (key === "arrowright" || key === "l") {
        event.preventDefault();
        seek((videoRef.current?.currentTime || 0) + 10);
      } else if (key === "m") {
        event.preventDefault();
        toggleMute();
      } else if (key === "f" && supportsFullscreen) {
        event.preventDefault();
        void toggleFullscreen();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, close, settings, togglePlay, seek, toggleMute, toggleFullscreen, supportsFullscreen]);

  async function download() {
    setDownloading(true);
    setDownloadError("");
    try {
      const response = await fetch(url, { credentials: crossOrigin === "use-credentials" ? "include" : "same-origin" });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      const sourceName = new URL(url, window.location.href).pathname.split("/").pop() || "video";
      const extension =
        sourceName.match(/\.[a-z0-9]{2,5}$/i)?.[0] || (blob.type === "video/webm" ? ".webm" : blob.type === "video/ogg" ? ".ogv" : ".mp4");
      link.download = name ? (/\.[a-z0-9]{2,5}$/i.test(name) ? name : `${name}${extension}`) : sourceName;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(href), 60_000);
    } catch {
      setDownloadError("Unable to download this video. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  useFocusTrap(visible, rootRef, null, closeFocus, () => {
    if (settings) {
      setSettings(false);
      settingsRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    } else if (!document.fullscreenElement) close();
  });

  if (mode === "closed") return null;

  return (
    <>
      <div
        ref={rootRef}
        tabIndex={-1}
        role={visible ? "dialog" : undefined}
        aria-modal={visible || undefined}
        aria-hidden={!visible}
        inert={!visible}
        aria-labelledby={titleId}
        style={visible ? undefined : { width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", pointerEvents: "none" }}
        className="fixed inset-0 z-9999 flex h-dvh min-h-0 flex-col bg-surface text-foreground">
        <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
            <Video size={17} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="truncate text-sm font-semibold tracking-tight">
              {name || "Video"}
            </h2>
            <p className="mt-0.5 text-[11px] text-muted">Video player</p>
          </div>
          <PlayerButton
            label={downloading ? "Downloading video" : "Download video"}
            disabled={downloading || !url}
            onClick={() => void download()}>
            {downloading ? <LoaderCircle size={17} className="animate-spin motion-reduce:animate-none" /> : <Download size={17} />}
          </PlayerButton>
          <PlayerButton ref={closeFocus} label="Close video player" onClick={close}>
            <X size={18} />
          </PlayerButton>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-surface-3 sm:px-6 sm:py-5">
          <div className="relative flex h-full min-h-0 w-full max-w-6xl items-center justify-center overflow-hidden sm:rounded-[var(--radius-md)] sm:border sm:border-border">
            <div ref={videoHome} className="contents">
              <video
                ref={videoRef}
                src={url}
                autoPlay={autoPlay}
                controls={false}
                loop={loop}
                muted={muted}
                poster={poster}
                crossOrigin={crossOrigin}
                playsInline
                preload="metadata"
                aria-label={name || "Video content"}
                aria-describedby={`${titleId}-instructions`}
                className="h-full w-full object-contain"
                onClick={controls ? togglePlay : undefined}
                onLoadStart={() => {
                  setLoading(true);
                  setError("");
                }}
                onLoadedMetadata={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  setDuration(video.duration);
                  setCurrent(video.currentTime);
                  setVolume(video.volume);
                  setIsMuted(video.muted);
                  const selected = Array.from(video.textTracks).findIndex((track) => track.mode === "showing");
                  setCaption(selected);
                  syncBuffer();
                }}
                onDurationChange={(event) => setDuration(event.currentTarget.duration)}
                onLoadedData={ready}
                onCanPlay={ready}
                onCanPlayThrough={ready}
                onPlay={() => {
                  playingIntent.current = true;
                  setPlaying(true);
                  setEnded(false);
                  setNotice("");
                  onPlay?.();
                }}
                onPlaying={() => {
                  setPlaying(true);
                  ready();
                }}
                onPause={() => {
                  playingIntent.current = false;
                  setPlaying(false);
                  setBuffering(false);
                  onPause?.();
                }}
                onEnded={() => {
                  playingIntent.current = false;
                  setPlaying(false);
                  setEnded(true);
                  setBuffering(false);
                  onEnded?.();
                }}
                onWaiting={() => {
                  if (playingIntent.current) setBuffering(true);
                }}
                onStalled={(event) => {
                  if (!event.currentTarget.paused && event.currentTarget.readyState < 3) setBuffering(true);
                }}
                onSeeking={(event) => {
                  if (event.currentTarget.readyState < 3) setBuffering(true);
                }}
                onSeeked={(event) => {
                  if (event.currentTarget.readyState >= 2) ready();
                }}
                onProgress={syncBuffer}
                onTimeUpdate={(event) => {
                  const video = event.currentTarget;
                  setCurrent(video.currentTime);
                  onTimeUpdate?.(video.currentTime, video.duration);
                }}
                onVolumeChange={(event) => {
                  setVolume(event.currentTarget.volume);
                  setIsMuted(event.currentTarget.muted);
                }}
                onRateChange={(event) => setRate(event.currentTarget.playbackRate)}
                onError={(event) => {
                  const message = getVideoError(event.currentTarget.error?.code);
                  setError(message);
                  setLoading(false);
                  setBuffering(false);
                  setPlaying(false);
                  onError?.(message);
                }}>
                {tracks.map((track) => (
                  <track
                    key={`${track.src}-${track.srcLang}`}
                    kind="subtitles"
                    {...track}
                    onLoad={() => {
                      const video = videoRef.current;
                      if (video) setCaption(Array.from(video.textTracks).findIndex((item) => item.mode === "showing"));
                    }}
                  />
                ))}
              </video>
            </div>
            {busy && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                <div
                  role="status"
                  className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-black/65 px-6 py-5 backdrop-blur-md">
                  <LoaderCircle className="size-7 animate-spin text-white motion-reduce:animate-none" aria-hidden="true" />
                  <span className="text-xs font-medium text-white/80">{buffering ? "Buffering…" : "Loading video…"}</span>
                </div>
              </div>
            )}
            {!busy && !error && !playing && controls && (
              <ExButton
                variant="soft"
                color="secondary"
                iconOnly
                size="lg"
                aria-label={ended ? "Replay video" : "Play video"}
                onClick={() => void play()}
                className="absolute flex size-16 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-xl backdrop-blur-md transition-colors hover:bg-primary-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:size-20">
                {ended ? <RotateCcw size={26} /> : <Play size={28} className="ml-1 fill-current" />}
              </ExButton>
            )}
            {error && (
              <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface/95 p-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl border border-danger/25 bg-danger/10 text-danger">
                  <CircleAlert size={24} />
                </div>
                <div>
                  <p className="text-base font-semibold">Unable to play video</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted">{error}</p>
                </div>
                <ExButton
                  onClick={retry}
                  className="mt-1 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[var(--radius-md)] bg-primary-solid px-4 text-sm font-medium text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <RotateCcw size={15} />
                  Retry playback
                </ExButton>
              </div>
            )}
          </div>
        </div>
        <p id={`${titleId}-instructions`} className="sr-only">
          Use Space or K to play or pause, left and right arrows to seek ten seconds, M to mute, F for fullscreen, and Escape to close.
          Settings include playback speed and available subtitles.
        </p>
        {downloadError && (
          <p role="alert" className="border-t border-border px-4 py-2 text-center text-xs text-danger">
            {downloadError}
          </p>
        )}
        {notice && (
          <p role="status" className="border-t border-border px-4 py-2 text-center text-xs leading-5 text-muted">
            {notice}
          </p>
        )}
        {controls && (
          <div className="shrink-0 border-t border-border bg-surface px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="relative flex h-7 items-center" data-video-timeline>
                <div className="pointer-events-none absolute inset-x-0 h-1 overflow-hidden rounded-full bg-border">
                  {buffered.map((segment, index) => (
                    <span
                      key={index}
                      data-buffered-segment
                      className="absolute inset-y-0 bg-muted/40"
                      style={{ left: `${segment.start}%`, width: `${segment.end - segment.start}%` }}
                    />
                  ))}
                  <span className="absolute inset-y-0 left-0 bg-primary-solid" style={{ width: `${progress}%` }} />
                </div>
                <input
                  type="range"
                  aria-label="Seek video"
                  aria-valuetext={`${formatVideoTime(current)} of ${formatVideoTime(duration)}`}
                  min={0}
                  max={seekable ? duration : 1}
                  step={0.1}
                  value={seekable ? current : 0}
                  disabled={!seekable || Boolean(error)}
                  onChange={(event) => seek(Number(event.target.value))}
                  className="relative z-10 h-7 w-full cursor-pointer appearance-none bg-transparent accent-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-solid [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-track]:h-1 [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary-solid"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <PlayerButton label={playing ? "Pause" : ended ? "Replay" : "Play"} disabled={Boolean(error)} onClick={togglePlay}>
                    {playing ? <Pause size={19} className="fill-current" /> : <Play size={19} className="fill-current" />}
                  </PlayerButton>
                  <PlayerButton label="Back 10 seconds" disabled={!seekable || Boolean(error)} onClick={() => seek(current - 10)}>
                    <RotateCcw size={17} />
                  </PlayerButton>
                  <PlayerButton label="Forward 10 seconds" disabled={!seekable || Boolean(error)} onClick={() => seek(current + 10)}>
                    <RotateCw size={17} />
                  </PlayerButton>
                  <span className="ml-1 whitespace-nowrap font-mono text-[11px] tabular-nums text-muted sm:ml-3 sm:text-xs">
                    <span className="text-foreground">{formatVideoTime(current)}</span>
                    <span className="mx-1.5 text-muted">/</span>
                    {duration === Infinity ? "LIVE" : formatVideoTime(duration)}
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
                  <PlayerButton
                    label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                    aria-pressed={isMuted || volume === 0}
                    onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : volume < 0.5 ? <Volume1 size={18} /> : <Volume2 size={18} />}
                  </PlayerButton>
                  <input
                    type="range"
                    aria-label="Volume"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(event) => changeVolume(Number(event.target.value))}
                    className="mr-2 hidden h-1 w-16 cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:block"
                  />
                  <div ref={settingsRef} className="relative">
                    <PlayerButton
                      label="Playback settings"
                      aria-expanded={settings}
                      aria-controls={settingsId}
                      onClick={() => setSettings((value) => !value)}
                      className={settings ? "bg-surface-3 text-foreground" : undefined}>
                      <Settings2 size={18} />
                    </PlayerButton>
                    {settings && (
                      <div
                        id={settingsId}
                        className="fixed inset-x-4 bottom-36 z-30 mb-3 max-h-[65dvh] overflow-y-auto rounded-[var(--radius-md)] sm:absolute sm:inset-x-auto sm:right-0 sm:bottom-full sm:w-64 border border-border bg-surface-2 p-4 shadow-2xl">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-semibold">Playback settings</span>
                          <ExButton
                            variant="text"
                            color="secondary"
                            iconOnly
                            size="xs"
                            aria-label="Close playback settings"
                            onClick={() => setSettings(false)}
                            className="cursor-pointer rounded-sm p-1 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            <X size={14} />
                          </ExButton>
                        </div>
                        <label className="block text-[11px] font-medium text-muted">
                          Speed
                          <select
                            aria-label="Playback speed"
                            value={rate}
                            onChange={(event) => {
                              const video = videoRef.current;
                              if (video) {
                                video.playbackRate = Number(event.target.value);
                                setRate(video.playbackRate);
                              }
                            }}
                            className="mt-1.5 h-9 w-full cursor-pointer rounded-[var(--radius-md)] border border-border bg-surface px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            {speeds.map((speed) => (
                              <option key={speed} value={speed}>
                                {speed === 1 ? "Normal (1×)" : `${speed}×`}
                              </option>
                            ))}
                          </select>
                        </label>
                        {tracks.length > 0 && (
                          <label className="mt-4 block text-[11px] font-medium text-muted">
                            Subtitles
                            <select
                              aria-label="Subtitles"
                              value={caption}
                              onChange={(event) => selectCaption(Number(event.target.value))}
                              className="mt-1.5 h-9 w-full cursor-pointer rounded-[var(--radius-md)] border border-border bg-surface px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
                              <option value={-1}>Off</option>
                              {tracks.map((track, index) => (
                                <option key={`${track.src}-${track.srcLang}`} value={index}>
                                  {track.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                        <p className="mt-4 border-t border-border pt-3 text-[10px] leading-5 text-muted">
                          Space / K · Play or pause
                          <br />← / → · Seek 10s · M · Mute
                        </p>
                      </div>
                    )}
                  </div>
                  {caption >= 0 && (
                    <span title="Subtitles on" className="hidden text-primary sm:inline-flex">
                      <Captions size={16} />
                    </span>
                  )}
                  {supportsPip && (
                    <PlayerButton
                      label={pip ? "Exit picture-in-picture" : "Picture-in-picture"}
                      aria-pressed={pip}
                      disabled={loading || Boolean(error)}
                      onClick={() => void togglePip()}>
                      <PictureInPicture2 size={18} />
                    </PlayerButton>
                  )}
                  {supportsFullscreen && (
                    <PlayerButton
                      label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                      aria-pressed={fullscreen}
                      onClick={() => void toggleFullscreen()}>
                      {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </PlayerButton>
                  )}
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-border pt-2 text-[10px] text-muted">
                <span className="flex items-center gap-1.5">
                  <span className={cn("size-1 rounded-full", busy ? "bg-warning-solid" : error ? "bg-danger-solid" : "bg-success-solid")} />
                  {error
                    ? "Playback error"
                    : buffering
                      ? "Buffering"
                      : loading
                        ? "Loading"
                        : ended
                          ? "Playback ended"
                          : playing
                            ? "Playing"
                            : "Paused"}
                </span>
                <span className="flex items-center gap-1.5">
                  {rate !== 1 && `${rate}× · `}
                  {!busy && !error && <Check size={10} aria-hidden="true" />}Inline playback
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {pipWindow &&
        createPortal(
          <div className="flex h-dvh flex-col bg-surface text-foreground">
            <div
              ref={pipSlot}
              className="flex min-h-0 flex-1 items-center justify-center overflow-hidden [&>video]:h-full [&>video]:w-full [&>video]:object-contain"
            />
            <div className="flex shrink-0 items-center justify-between gap-2 border-t border-border p-2">
              <PlayerButton label={playing ? "Pause" : "Play"} onClick={togglePlay}>
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </PlayerButton>
              <ExButton size="sm" variant="soft" color="secondary" onClick={returnToTab}>
                Back to tab
              </ExButton>
              <div className="flex gap-1">
                <PlayerButton label="Close video player" onClick={close}>
                  <X size={17} />
                </PlayerButton>
              </div>
            </div>
          </div>,
          pipWindow.document.body,
        )}
    </>
  );
}

export default function ExVideoPlayer(props: ExVideoPlayerProps) {
  if (typeof document === "undefined") return null;
  return createPortal(<VideoReader key={props.url} {...props} />, document.body);
}
