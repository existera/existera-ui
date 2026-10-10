"use client";

import { Check, CheckCheck, Download, File, Image as ImageIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "../../utils/Utils";
import { ExChatBubbleProps } from "./props/ExChatBubbleProps";
import { ChatBubbleSizeClass } from "./class/ExChatBubbleClass";

function renderStatusIcon(status: "sent" | "delivered" | "read", size: number) {
  switch (status) {
    case "sent":
      return <Check size={size} />;

    case "delivered":
      return <CheckCheck size={size} />;

    case "read":
      return <CheckCheck size={size} className="text-primary" />;
  }
}

export default function ExChatBubble({
  position = "left",
  size = "md",
  message,
  media,
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
  const isSender = position === "right";
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needExpand, setNeedExpand] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const hasMedia = Boolean(media && mediaType);
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const checkOverflow = () => {
      setNeedExpand(el.scrollHeight > el.clientHeight + 2);
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [expanded, message]);
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn("group flex w-full items-end gap-2.5", isSender ? "flex-row-reverse" : "flex-row", className)}>
        {showAvatar && (
          <div className={cn(ui.avatar, "shrink-0 overflow-hidden rounded-full ring-1 ring-border/50")}>
            {avatar ? (
              <img src={avatar} alt={name} className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center bg-surface-3 font-semibold text-foreground">
                {name?.charAt(0).toUpperCase() ?? "?"}
              </div>
            )}
          </div>
        )}

        <div
          className={cn(
            "flex max-w-[75%] flex-col",
            isSender ? "items-end" : "items-start",
            !showAvatar && (isSender ? "mr-11" : "ml-11"),
          )}>
          {showName && name && !isSender && <span className={cn(ui.name, "mb-1 px-1 font-semibold text-muted")}>{name}</span>}

          <div
            className={cn(
              "relative overflow-hidden shadow-sm transition-all duration-200 group-hover:shadow-md",
              hasMedia ? "p-1.5" : ui.bubble,
              isSender
                ? "rounded-2xl rounded-br-xs bg-primary-soft text-primary-foreground"
                : "rounded-2xl rounded-bl-xs bg-surface-2 text-foreground",
            )}>
            {hasMedia && (
              <>
                {mediaType === "image" && (
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="group/image relative block w-full overflow-hidden rounded-2xl">
                    <img
                      src={media}
                      alt="media"
                      className="max-h-[420px] w-full rounded-2xl object-cover transition duration-300 group-hover/image:scale-[1.02]"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover/image:bg-black/20">
                      <ImageIcon className="opacity-0 transition group-hover/image:opacity-100 text-white" />
                    </div>
                  </button>
                )}

                {mediaType === "video" && (
                  <video controls className="max-h-[420px] w-full rounded-2xl outline-none">
                    <source src={media} />
                  </video>
                )}

                {mediaType === "file" && (
                  <a
                    href={media}
                    download
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 transition hover:bg-surface-3">
                    <div className="rounded-xl bg-primary-soft p-3">
                      <File size={22} />
                    </div>

                    <div className="flex-1">
                      <div className="font-medium">Attachment</div>

                      <div className="text-xs text-muted">Click to download</div>
                    </div>

                    <Download size={18} />
                  </a>
                )}

                {message && (
                  <div className="px-3.5 pt-3 pb-1">
                    <p ref={textRef} className={cn(ui.text, "whitespace-pre-wrap break-words", !expanded && "line-clamp-3")}>
                      {message}
                    </p>
                  </div>
                )}
              </>
            )}

            {!hasMedia && (
              <>
                <p ref={textRef} className={cn(ui.text, "whitespace-pre-wrap break-words", !expanded && "line-clamp-3")}>
                  {message}
                </p>
              </>
            )}

            {needExpand && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={cn("mt-2 font-medium text-primary transition hover:underline hover:cursor-pointer", ui.meta)}>
                {expanded ? "Show less" : "Show more"}
              </button>
            )}

            <div
              className={cn(
                hasMedia ? "pt-2" : "pt-1",
                "flex items-center justify-end gap-1.5 px-0",
                ui.meta,
                isSender ? "text-primary-foreground/70" : "text-muted",
              )}>
              {showStatus && isSender && renderStatusIcon(status, ui.icon)}

              {showTimestamp && timestamp && <span>{timestamp}</span>}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {previewOpen && mediaType === "image" && (
          <motion.div
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
              alt=""
              className="max-h-[92vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
