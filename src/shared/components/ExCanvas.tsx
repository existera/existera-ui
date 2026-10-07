import type { PropsWithChildren } from "react";

const GRID_STYLE_LIGHT: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(120,120,120,.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(120,120,120,.08) 1px, transparent 1px),
    linear-gradient(to right, rgba(160,160,160,.14) 1.5px, transparent 1px),
    linear-gradient(to bottom, rgba(160,160,160,.14) 1.5px, transparent 1px)
  `,
  backgroundSize: `20px 20px, 20px 20px, 100px 100px, 100px 100px`,
  maskImage:
    "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
  WebkitMaskImage:
    "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
};

const GRID_STYLE_DARK: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(130,130,130,.14) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(130,130,130,.14) 1px, transparent 1px),

    linear-gradient(to right, rgba(160,160,160,.12) 1.5px, transparent 1px),
    linear-gradient(to bottom, rgba(160,160,160,.12) 1.5px, transparent 1px)
  `,
  backgroundSize: `20px 20px, 20px 20px, 100px 100px, 100px 100px`,
  maskImage:
    "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
  WebkitMaskImage:
    "radial-gradient(circle at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
};

function isDarkMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ExCanvas({ children }: PropsWithChildren) {
  const dark = isDarkMode();

  return (
    <div
      className="
        relative w-full min-h-50 h-full overflow-hidden rounded-xl
        flex items-center flex-col md:flex-row flex-wrap justify-center p-5 bg-surface
        group
      "
    >
      {/* GRID */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          opacity-80
          transition-all duration-500
          group-hover:opacity-100
          scale-[1.02]
          group-hover:scale-[1.05]
          group-hover:brightness-110
        "
        style={dark ? GRID_STYLE_DARK : GRID_STYLE_LIGHT}
      />

      {/* NOISE LAYER */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          opacity-[0.04] dark:opacity-[0.06]
          mix-blend-overlay
          bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-size-[3px_3px]
        "
      />

      {/* CONTENT */}
      <div className="relative flex flex-wrap items-center justify-center gap-0 w-full">
        {children}
      </div>
    </div>
  );
}