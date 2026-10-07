"use client";

import { useState } from "react";
import type { ExAvatarProps } from "./props/ExAvatarProps";
import { cn } from "../../utils/Utils";
import {
  AvatarColorClass,
  AvatarEffectClass,
  AvatarSizeClass,
  AvatarStatusClass,
} from "./class/ExAvatarClass";

export default function ExAvatar({
  variant = "solid",
  name,
  imgURL,
  icon,
  size = "md",
  status = "none",
  color = "primary",
  effect = "default",
  border = false,
}: ExAvatarProps) {
  const [loaded, setLoaded] = useState(false);
  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div className="relative inline-flex h-fit w-fit">
      <div
        className={cn(
          AvatarColorClass[color][variant],
          "relative overflow-hidden flex items-center justify-center font-bold select-none rounded-full",
          AvatarSizeClass[size].container,
          border ? "border-2 border-background" : "",
        )}
        role={imgURL ? "img" : "presentation"}
        aria-label={imgURL ? name : undefined}
      >
        {imgURL ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/40">
                <div
                  className={cn(
                    "animate-spin rounded-full border-2 border-muted-foreground border-t-transparent",
                    size === "xs" && "size-3",
                    size === "sm" && "size-4",
                    size === "md" && "size-5",
                    size === "lg" && "size-6",
                  )}
                />
              </div>
            )}
            <img
              src={imgURL}
              alt={name || ""}
              onLoad={() => setLoaded(true)}
              className={cn(
                "size-full object-cover transition-opacity duration-300",
                AvatarEffectClass[effect],
                loaded ? "opacity-100" : "opacity-0",
              )}
            />
          </>
        ) : name ? (
          <span aria-hidden="true">{initials}</span>
        ) : (
          <span aria-hidden="true">{icon}</span>
        )}
      </div>

      {status !== "none" && (
        <span
          className={cn(
            "absolute -bottom-1 -right-1 rounded-full border-2 border-background",
            AvatarSizeClass[size].status,
            AvatarStatusClass[status],
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
