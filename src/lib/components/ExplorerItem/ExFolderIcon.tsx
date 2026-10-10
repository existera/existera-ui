"use client";

import type { ExFolderProps } from "./props/ExFolderProps";

export default function ExFolderIcon({
  color = "#FFCA28",
  width = 90,
  height = 90,
  className,
  icon,
}: ExFolderProps) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={width}
        height={height}
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M6 12C6 10.8 7 10 8.2 10H18.5C19.1 10 19.6 10.2 20 10.6L22.5 12H39C40.7 12 42 13.3 42 15V18H6V12Z"
          fill={color}
          opacity={0.8}
        />
        <path
          d="M6 16H39C41 16 42.5 17.5 42.5 19.5V33C42.5 36 40.5 38 37.5 38H10.5C7.8 38 6 36.2 6 33.5V18.5C6 17.2 6.6 16.4 7.5 16.2C8.4 16 9.5 16 10.5 16H39"
          fill={color}
        />
        <path
          d="M6 30H42.5V33C42.5 36 40.5 38 37.5 38H10.5C7.8 38 6 36.2 6 33.5V30Z"
          fill="#000"
          opacity={0.05}
        />
      </svg>
      {icon && (
        <div className="absolute text-xl left-1/2 top-12.5 -translate-x-1/2 -translate-y-1/2 z-10 text-white">
          {icon}
        </div>
      )}
    </div>
  );
}
