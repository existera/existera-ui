"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Eye, Pencil, User } from "lucide-react";
import { AvatarColorClass, AvatarEffectClass, AvatarStatusClass } from "../Avatar/class/ExAvatarClass";
import ExButton from "../Button/ExButton";
import ExModal from "../Modal/ExModal";
import { cn } from "../../utils/Utils";
import type { ExProfilePictureProps } from "./props/ExProfilePictureProps";

interface CropImage {
  image: HTMLImageElement;
  source: string;
  name: string;
}
const limit = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
interface CropBox {
  x: number;
  y: number;
  side: number;
}

export default function ExProfilePicture({
  name,
  imgURL,
  icon,
  variant = "solid",
  color = "primary",
  effect = "default",
  status = "none",
  border = false,
  disabled = false,
  viewOnly = false,
  editOnly = false,
  onChange,
}: ExProfilePictureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const canEdit = !viewOnly;
  const canView = viewOnly || !editOnly;
  const requestRef = useRef(0);
  const dragRef = useRef<{ x: number; y: number; box: CropBox; corner?: string } | null>(null);
  const [crop, setCrop] = useState<CropImage | null>(null);
  const [preview, setPreview] = useState<{ source: string; original: string | undefined } | null>(null);
  const [box, setBox] = useState<CropBox>({ x: 0, y: 0, side: 1 });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const titleId = useId();
  const helpId = useId();

  useEffect(
    () => () => {
      requestRef.current += 1;
    },
    [],
  );

  const close = () => {
    requestRef.current += 1;
    setCrop(null);
    setSaving(false);
    setError("");
    dragRef.current = null;
  };

  const selectFile = (file: File | undefined) => {
    if (!file || !canEdit || disabled) return;
    const request = ++requestRef.current;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    const fail = () => {
      if (request === requestRef.current) setError("This image could not be opened. Please choose another file.");
    };
    reader.onerror = fail;
    reader.onload = () => {
      const source = String(reader.result);
      const image = new Image();
      image.onerror = fail;
      image.onload = () => {
        if (request !== requestRef.current) return;
        if (!image.naturalWidth || !image.naturalHeight) {
          fail();
          return;
        }
        const side = Math.min(image.naturalWidth, image.naturalHeight) * 0.8;
        setBox({ x: (image.naturalWidth - side) / 2, y: (image.naturalHeight - side) / 2, side });
        setCrop({ image, source, name: file.name });
      };
      image.src = source;
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    if (!crop || saving || disabled || !canEdit) return;
    const request = requestRef.current;
    setSaving(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 512;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      context.drawImage(crop.image, box.x, box.y, box.side, box.side, 0, 0, 512, 512);
      const source = canvas.toDataURL("image/png");
      canvas.toBlob((blob) => {
        if (request !== requestRef.current) return;
        if (!blob) {
          setSaving(false);
          setError("Unable to save the crop. Please try again.");
          return;
        }
        const file = new File([blob], `${crop.name.replace(/\.[^.]+$/, "")}-profile.png`, { type: "image/png" });
        setPreview({ source, original: imgURL });
        close();
        onChange?.(file, source);
      }, "image/png");
    } catch {
      setSaving(false);
      setError("Unable to save the crop. Please try another image.");
    }
  };

  const source = preview && preview.original === imgURL ? preview.source : imgURL;
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div className="inline-flex flex-col gap-2 w-fit h-fit">
      <div className="group relative size-32">
        <div
          role="img"
          aria-label={`${name || "User profile picture"}${status !== "none" ? `, ${status}` : ""}`}
          className={cn(
            "flex size-full items-center justify-center overflow-hidden rounded-full text-4xl font-bold [&_svg]:size-12",
            AvatarColorClass[color][variant],
            border && "border-2 border-background",
          )}>
          {source ? (
            <img key={source} src={source} alt={name || ""} className={cn("size-full object-cover", AvatarEffectClass[effect])} />
          ) : (
            <span aria-hidden="true">{initials || icon || <User />}</span>
          )}
        </div>
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          aria-label={canView ? "View profile picture" : "Change profile picture"}
          onClick={() => (canView ? setViewOpen(true) : inputRef.current?.click())}
          className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed group-hover:opacity-100 [@media(hover:none)]:opacity-100">
          {canView ? <Eye size={28} aria-hidden="true" /> : <Pencil size={28} aria-hidden="true" />}
        </button>
        {canView && canEdit && (
          <button
            ref={editButtonRef}
            type="button"
            disabled={disabled}
            aria-label="Change profile picture"
            onClick={() => inputRef.current?.click()}
            className="absolute -bottom-1 -right-1 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-primary-solid text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed [@media(hover:none)]:opacity-100">
            <Pencil size={16} aria-hidden="true" />
          </button>
        )}
        {status !== "none" && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-1 right-1 size-5 rounded-full border-2 border-background",
              AvatarStatusClass[status],
            )}
          />
        )}
      </div>
      {canEdit && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          disabled={disabled}
          className="hidden"
          aria-label="Choose profile picture"
          onChange={(event) => {
            selectFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      )}
      {error && !crop && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <ExModal
        isOpen={viewOpen && canView}
        closeButton={false}
        onClose={() => setViewOpen(false)}
        aria-label={name ? `${name}'s profile picture` : "Profile picture"}
        returnFocusRef={buttonRef}
        className="w-[min(640px,90vw,75dvh)] rounded-none border-0 bg-transparent p-0 shadow-none lg:w-[min(640px,90vw,75dvh)]">
        <div className="relative aspect-square w-full overflow-hidden bg-transparent">
          {source ? (
            <img
              src={source}
              alt={name ? `${name}'s profile picture` : "Profile picture"}
              className={cn("absolute inset-0 size-full object-cover", AvatarEffectClass[effect])}
            />
          ) : (
            <div
              role="img"
              aria-label={name || "User profile picture"}
              className={cn(
                "absolute inset-0 flex size-full items-center justify-center text-6xl font-bold [&_svg]:size-20",
                AvatarColorClass[color][variant],
              )}>
              <span aria-hidden="true">{initials || icon || <User />}</span>
            </div>
          )}
        </div>
      </ExModal>
      <ExModal
        isOpen={!!crop && canEdit}
        onClose={close}
        titleId={titleId}
        aria-describedby={helpId}
        returnFocusRef={canView ? editButtonRef : buttonRef}>
        <div className="flex w-full flex-col gap-4 p-6 sm:w-[640px]">
          <h2 id={titleId} className="pr-6 text-xl font-semibold">
            Crop profile picture
          </h2>
          <p id={helpId} className="text-sm text-muted">
            Drag the square to select an area. Drag any edge or corner to resize. Use arrow keys to move, or Shift + arrow keys to resize.
          </p>
          {crop && (
            <div className="flex justify-center overflow-hidden rounded-md bg-black/90">
              <div
                className="relative max-w-full touch-none overflow-hidden"
                onPointerMove={(event) => {
                  const drag = dragRef.current;
                  if (!drag) return;
                  const scale = crop.image.naturalWidth / event.currentTarget.getBoundingClientRect().width;
                  const dx = (event.clientX - drag.x) * scale;
                  const dy = (event.clientY - drag.y) * scale;
                  if (!drag.corner) {
                    setBox({
                      ...drag.box,
                      x: limit(drag.box.x + dx, 0, crop.image.naturalWidth - drag.box.side),
                      y: limit(drag.box.y + dy, 0, crop.image.naturalHeight - drag.box.side),
                    });
                    return;
                  }
                  const west = drag.corner.includes("w");
                  const north = drag.corner.includes("n");
                  if (drag.corner.length === 1) {
                    const horizontal = west || drag.corner === "e";
                    const centerX = drag.box.x + drag.box.side / 2;
                    const centerY = drag.box.y + drag.box.side / 2;
                    const anchor = horizontal
                      ? west
                        ? drag.box.x + drag.box.side
                        : drag.box.x
                      : north
                        ? drag.box.y + drag.box.side
                        : drag.box.y;
                    const max = horizontal
                      ? Math.min(
                          west ? anchor : crop.image.naturalWidth - anchor,
                          2 * Math.min(centerY, crop.image.naturalHeight - centerY),
                        )
                      : Math.min(
                          north ? anchor : crop.image.naturalHeight - anchor,
                          2 * Math.min(centerX, crop.image.naturalWidth - centerX),
                        );
                    const delta = horizontal ? (west ? -dx : dx) : north ? -dy : dy;
                    const side = limit(drag.box.side + delta, Math.min(32, max), max);
                    setBox({
                      x: horizontal ? (west ? anchor - side : anchor) : centerX - side / 2,
                      y: horizontal ? centerY - side / 2 : north ? anchor - side : anchor,
                      side,
                    });
                    return;
                  }
                  const anchorX = west ? drag.box.x + drag.box.side : drag.box.x;
                  const anchorY = north ? drag.box.y + drag.box.side : drag.box.y;
                  const max = Math.min(
                    west ? anchorX : crop.image.naturalWidth - anchorX,
                    north ? anchorY : crop.image.naturalHeight - anchorY,
                  );
                  const delta = ((west ? -dx : dx) + (north ? -dy : dy)) / 2;
                  const side = limit(drag.box.side + delta, Math.min(32, max), max);
                  setBox({ x: west ? anchorX - side : anchorX, y: north ? anchorY - side : anchorY, side });
                }}
                onPointerUp={() => {
                  dragRef.current = null;
                }}
                onPointerCancel={() => {
                  dragRef.current = null;
                }}>
                <img
                  src={crop.source}
                  alt="Original photo for cropping"
                  draggable={false}
                  className="block h-auto max-h-[50dvh] max-w-full select-none object-contain"
                  style={{ width: "auto" }}
                />
                <div
                  role="group"
                  tabIndex={0}
                  aria-label="Crop selection"
                  aria-describedby={helpId}
                  className="absolute cursor-move border-2 border-white outline-none focus-visible:border-primary"
                  style={{
                    left: `${(box.x / crop.image.naturalWidth) * 100}%`,
                    top: `${(box.y / crop.image.naturalHeight) * 100}%`,
                    width: `${(box.side / crop.image.naturalWidth) * 100}%`,
                    height: `${(box.side / crop.image.naturalHeight) * 100}%`,
                    boxShadow: "0 0 0 9999px rgb(0 0 0 / 55%)",
                  }}
                  onPointerDown={(event) => {
                    if (event.button !== 0) return;
                    event.preventDefault();
                    event.currentTarget.focus();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    const target = event.target as HTMLElement;
                    dragRef.current = { x: event.clientX, y: event.clientY, box, corner: target.dataset.corner };
                  }}
                  onKeyDown={(event) => {
                    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
                    event.preventDefault();
                    const step = Math.max(1, Math.min(crop.image.naturalWidth, crop.image.naturalHeight) / 100);
                    if (event.shiftKey) {
                      const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
                      const max = Math.min(crop.image.naturalWidth - box.x, crop.image.naturalHeight - box.y);
                      setBox({ ...box, side: limit(box.side + direction * step, Math.min(32, max), max) });
                    } else {
                      setBox({
                        ...box,
                        x: limit(
                          box.x + (event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0),
                          0,
                          crop.image.naturalWidth - box.side,
                        ),
                        y: limit(
                          box.y + (event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0),
                          0,
                          crop.image.naturalHeight - box.side,
                        ),
                      });
                    }
                  }}>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }, (_, index) => (
                      <span key={index} className="border border-white/40" />
                    ))}
                  </div>
                  {["n", "e", "s", "w"].map((edge) => (
                    <span
                      key={edge}
                      data-corner={edge}
                      aria-hidden="true"
                      className={cn(
                        "absolute",
                        edge === "n" || edge === "s" ? "left-0 h-5 w-full cursor-ns-resize" : "top-0 h-full w-5 cursor-ew-resize",
                        edge === "n" && "-top-2.5",
                        edge === "s" && "-bottom-2.5",
                        edge === "w" && "-left-2.5",
                        edge === "e" && "-right-2.5",
                      )}
                    />
                  ))}
                  {["nw", "ne", "sw", "se"].map((corner) => (
                    <span
                      key={corner}
                      data-corner={corner}
                      aria-hidden="true"
                      className={cn(
                        "absolute size-5 border-2 border-white bg-black/30",
                        corner.includes("n") ? "-top-2.5" : "-bottom-2.5",
                        corner.includes("w") ? "-left-2.5" : "-right-2.5",
                        corner === "nw" || corner === "se" ? "cursor-nwse-resize" : "cursor-nesw-resize",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <ExButton type="button" variant="text" color="secondary" onClick={close}>
              Cancel
            </ExButton>
            <ExButton type="button" loading={saving} disabled={saving || disabled} onClick={save}>
              Save photo
            </ExButton>
          </div>
        </div>
      </ExModal>
    </div>
  );
}
