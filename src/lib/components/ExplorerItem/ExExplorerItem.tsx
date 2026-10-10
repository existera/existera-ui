"use client";

import { useEffect, useRef, useState } from "react";
import type { ExExplorerItemProps } from "./props/ExExplorerItemProps";
import type { MenuState } from "./types/ExExplorerItemType";
import { cn } from "../../utils/Utils";
import { ArrowDownToLine, ExternalLink, Move, Share2, SquarePen, Trash2 } from "lucide-react";
import { FileIcon } from "./ExIconResolver";
import ExButton from "../Button/ExButton";
import ExFolderIcon from "./ExFolderIcon";

const MENU_WIDTH = 180;
const MENU_HEIGHT = 130;

export default function ExExplorerItem({
  id,
  hexColor,
  name,
  type,
  url,
  selected,
  file,
  onClick,
  onRename,
  onMove,
  onShare,
  onDownload,
  onDelete,
}: ExExplorerItemProps) {
  const [menu, setMenu] = useState<MenuState>({
    open: false,
    x: 0,
    y: 0,
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = (x: number, y: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x;
    let top = y;

    if (left + MENU_WIDTH > vw) {
      left = vw - MENU_WIDTH - 8;
    }
    if (top + MENU_HEIGHT > vh) {
      top = vh - MENU_HEIGHT - 8;
    }

    setMenu({
      open: true,
      x: Math.max(8, left),
      y: Math.max(8, top),
    });
  };

  const closeMenu = () => {
    setMenu((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openMenu(e.clientX, e.clientY);
  };

  const formatFileName = (name: string, maxBaseLength = 12) => {
    const lastDot = name.lastIndexOf(".");
    const hasExt = lastDot !== -1 && lastDot !== 0 && lastDot !== name.length - 1;
    const ext = hasExt ? name.slice(lastDot) : "";
    const base = hasExt ? name.slice(0, lastDot) : name;
    if (base.length <= maxBaseLength) return name;
    const startLength = Math.max(4, Math.floor(maxBaseLength * 0.6));
    const start = base.slice(0, startLength);
    return `${start}... ${ext}`;
  };

  useEffect(() => {
    if (!menu.open) return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      closeMenu();
    };

    const handleDocumentContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      openMenu(e.clientX, e.clientY);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("contextmenu", handleDocumentContextMenu);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("contextmenu", handleDocumentContextMenu);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menu.open]);

  return (
    <>
      <button
        type="button"
        onClick={() => (url ? onClick?.(id) : onClick?.(file!))}
        onContextMenu={handleContextMenu}
        className={cn(
          "flex flex-col items-center justify-start h-fit",
          "w-22",
          "px-1 py-2",
          "rounded-lg",
          "text-xs text-center",
          "gap-1.5",
          "cursor-pointer",
          "transition-colors",
          "hover:bg-muted/10 active:bg-muted/10 hover:shadow-sm active:shadow-sm",
          (selected || menu.open) && "bg-muted/30",
        )}>
        <div className="h-17 flex items-center justify-center overflow-hidden">
          {(url || file) && <FileIcon name={name} type={type} url={url} file={file} className="h-full w-full" />}
          {type === "folder" && !url && <ExFolderIcon color={hexColor} />}
        </div>

        <span className="w-full line-clamp-2 wrap-break-word select-none" title={name}>
          {formatFileName(name)}
        </span>
      </button>

      {menu.open && (
        <div
          ref={menuRef}
          className={cn(
            "fixed z-99999",
            "w-30 grid gap-1",
            "overflow-hidden",
            "rounded-lg border border-border",
            "bg-surface",
            "shadow-xl",
            "p-1",
          )}
          style={{
            left: menu.x,
            top: menu.y,
          }}>
          <ExButton
            type="button"
            variant="text"
            size="xs"
            fit={false}
            textAlign="between"
            color="secondary"
            rightIcon={<ExternalLink size={12} />}
            onClick={() => {
              if (id) onClick?.(id);
              closeMenu();
            }}>
            Open
          </ExButton>
          <ExButton
            type="button"
            variant="text"
            size="xs"
            fit={false}
            textAlign="between"
            color="secondary"
            rightIcon={<SquarePen size={12} />}
            onClick={() => {
              if (id) onRename?.(id);
              closeMenu();
            }}>
            Rename
          </ExButton>
          <ExButton
            type="button"
            variant="text"
            size="xs"
            fit={false}
            textAlign="between"
            color="secondary"
            rightIcon={<Move size={12} />}
            onClick={() => {
              if (id) onMove?.(id);
              closeMenu();
            }}>
            Move
          </ExButton>
          <ExButton
            type="button"
            variant="text"
            size="xs"
            fit={false}
            textAlign="between"
            color="secondary"
            rightIcon={<Share2 size={12} />}
            onClick={() => {
              if (id) onShare?.(id);
              closeMenu();
            }}>
            Share
          </ExButton>
          <ExButton
            type="button"
            variant="text"
            size="xs"
            fit={false}
            textAlign="between"
            color="secondary"
            rightIcon={<ArrowDownToLine size={12} />}
            onClick={() => {
              if (id) onDownload?.(id);
              closeMenu();
            }}>
            Download
          </ExButton>
          <ExButton
            type="button"
            variant="text"
            size="xs"
            fit={false}
            textAlign="between"
            color="danger"
            rightIcon={<Trash2 size={12} />}
            onClick={() => {
              if (id) onDelete?.(id);
              closeMenu();
            }}>
            Delete
          </ExButton>
        </div>
      )}
    </>
  );
}
