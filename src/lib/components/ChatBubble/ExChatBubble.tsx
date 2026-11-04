"use client";

import { Check, CheckCheck, Download, File, Image as ImageIcon, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { RadiusSizeClass } from "../../styles/Radius";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { cn } from "../../utils/Utils";
import { ExChatBubbleProps } from "./props/ExChatBubbleProps";
import { ChatBubbleColorClass, ChatBubbleSizeClass } from "./class/ExChatBubbleClass";

function renderStatusIcon(status: "sent" | "delivered" | "read", size: number, solid: boolean) {
  switch (status) {
    case "sent":
      return <Check size={size} />;

    case "delivered":
      return <CheckCheck size={size} />;

    case "read":
      return <CheckCheck size={size} className={solid ? "text-current" : "text-primary"} />;
  }
}

export default function ExChatBubble({
  position = "left",
  variant,
  color = "primary",
  size = "md",
  message,
  media,
  mediaAlt,
  mediaType,
  timestamp,
  avatar,
  name,
  status = "sent",
  showAvatar = true,
  showName = true,
  showTimestamp = true,
  showStatus = true,
  className,
}: ExChatBubbleProps) {
  const ui = ChatBubbleSizeClass[size];
  const reducedMotion = useReducedMotion();
  const isSender = position === "right";
  const resolvedVariant = variant ?? (isSender ? "soft" : "solid");
  const isSolid = resolvedVariant === "solid";
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needExpand, setNeedExpand] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  useFocusTrap(previewOpen, previewRef, null, undefined, () => setPreviewOpen(false));
  const hasMedia = Boolean(media && mediaType);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const checkOverflow = () => {
      if (!expanded) setNeedExpand(el.scrollHeight > el.clientHeight + 2);
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [expanded, message]);
  return (
    <>
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn("group flex w-full items-start gap-3 px-2", isSender ? "flex-row-reverse" : "flex-row", className)}>
        {showAvatar && (
          <div className={cn(ui.avatar, "mt-0.5 shrink-0 overflow-hidden rounded-full border border-border/70")}>
            {avatar ? (
              <img src={avatar} alt={name || "User avatar"} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-surface-3 font-semibold text-foreground">
                {name?.charAt(0).toUpperCase() ?? "?"}
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex min-w-0 max-w-[calc(100%-3rem)] flex-col sm:max-w-[80%] lg:max-w-[70%]",
            isSender ? "items-end" : "items-start",
            !showAvatar && "max-w-[90%]",
          )}>
          {showName && name && <span className={cn(ui.name, "mb-1.5 font-medium text-muted")}>{name}</span>}

          <div
            className={cn(
              "relative isolate min-w-0 max-w-full",
              RadiusSizeClass[size],
              isSender ? "rounded-tr-none" : "rounded-tl-none",
              hasMedia ? "p-1.5" : ui.bubble,
              ChatBubbleColorClass[color][resolvedVariant],
            )}>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-0 h-3 w-2 bg-inherit",
                isSender
                  ? "-right-2 [clip-path:polygon(0_0,100%_0,0_100%)]"
                  : "-left-2 [clip-path:polygon(0_0,100%_0,100%_100%)]",
              )}
            />
            {hasMedia && (
              <>
                {mediaType === "image" && (
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    aria-label="Preview attached image"
                    className={cn("group/image relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", RadiusSizeClass[size])}>
                    <img
                      src={media}
                      alt={mediaAlt ?? message ?? "Image attachment"}
                      className={cn("max-h-[420px] w-full object-cover transition duration-300 group-hover/image:scale-[1.02]", RadiusSizeClass[size])}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover/image:bg-black/20">
                      <ImageIcon className="opacity-0 transition group-hover/image:opacity-100 text-white" />
                    </div>
                  </button>
                )}

                {mediaType === "video" && (
                  <video controls className={cn("max-h-[420px] w-full outline-none", RadiusSizeClass[size])}>
                    <source src={media} />
                  </video>
                )}

                {mediaType === "file" && (
                  <a
                    href={media}
                    download
                    className={cn("flex items-center gap-3 border border-border/70 bg-surface text-foreground px-3 py-2.5 transition hover:bg-surface-3", RadiusSizeClass[size])}>
                    <div className={cn(" bg-primary/10 p-2 text-primary", RadiusSizeClass[size])}>
                      <File size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">Attachment</div>

                      <div className="text-xs text-muted">Click to download</div>
                    </div>

                    <Download size={18} />
                  </a>
                )}

                {message && (
                  <div className="px-2 pt-2.5">
                    <p ref={textRef} className={cn(ui.text, "whitespace-pre-wrap [overflow-wrap:anywhere]", !expanded && "line-clamp-3")}>
                      {message}
                    </p>
                  </div>
                )}
              </>
            )}

            {!hasMedia && (
              <>
                <p ref={textRef} className={cn(ui.text, "whitespace-pre-wrap [overflow-wrap:anywhere]", !expanded && "line-clamp-3")}>
                  {message}
                </p>
              </>
            )}

            {needExpand && (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
                className={cn("mt-1.5 rounded-sm font-medium text-current underline underline-offset-4 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2", hasMedia && "mx-2", ui.meta)}>
                {expanded ? "Show less" : "Show more"}
              </button>
            )}

            {((showStatus && isSender) || (showTimestamp && timestamp)) && <div
              className={cn(
                hasMedia ? "px-2 pb-1 pt-2" : "pt-1.5",
                "flex items-center justify-end gap-1.5 px-0",
                ui.meta,
                "text-current",
              )}>
              {showTimestamp && timestamp && <span className="tabular-nums">{timestamp}</span>}
              {showStatus && isSender && <span role="img" aria-label={`Message ${status}`}>{renderStatusIcon(status, ui.icon, isSolid)}</span>}
            </div>}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {previewOpen && mediaType === "image" && (
          <motion.div
            ref={previewRef}
            role="dialog"
            aria-modal="true"
            aria-label="Attached image preview"
            tabIndex={-1}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-5">
            <button
              type="button"
              aria-label="Close image preview"
              onClick={() => setPreviewOpen(false)}
              className="absolute right-5 top-5 rounded-md bg-white/10 p-1 cursor-pointer text-white transition hover:bg-white/20">
              <X size={16} />
            </button>

            <motion.img
              initial={{
                scale: 0.9,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.95,
              }}
              src={media}
              alt={mediaAlt ?? message ?? "Image attachment"}
              className="max-h-[92vh] max-w-[92vw] rounded-[var(--radius-md)] object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
