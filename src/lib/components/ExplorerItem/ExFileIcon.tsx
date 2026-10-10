"use client";

import type { ReactNode } from "react";

export default function ExFileIcon({ children, hexColor = "#64B5F6" }: { children?: ReactNode; hexColor?: string }) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={80} height={80} fill="none" aria-hidden="true">
        <defs>
          <filter id="foldShadow" x="20" y="0" width="24" height="24" filterUnits="userSpaceOnUse">
            <feDropShadow dx="-1.5" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>
        <path d="M10 4h18l12 12v24a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h14Z" fill={hexColor} />
        <g filter="url(#foldShadow)" aria-hidden="true">
          <path d="M28 4l12 12h-10a2.5 2.5 0 0 1-2.5-2.5V4Z" fill="#E3F2FD" />
        </g>
        <path d="M28 4l12 12h-10a2.5 2.5 0 0 1-2.5-2.5V4Z" fill="#fff" opacity="0.25" aria-hidden="true" />
      </svg>
      <div className="absolute inset-0 left-1 top-3.5 flex items-center justify-center text-white" role="img" aria-label="File icon">
        {children}
      </div>
    </div>
  );
}
