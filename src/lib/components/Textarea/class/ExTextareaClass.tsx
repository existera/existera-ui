import type { TextareaRadius, TextareaSize, TextareaState } from "../types/ExTextareaType";

export const TextareaStateClass: Record<TextareaState, string> = {
  default: "focus-within:outline-2 focus-within:outline-primary",
  error: "outline-2 outline-danger",
  success: "outline-2 outline-success",
};

export const TextareaSizeClass: Record<
  TextareaSize,
  {
    height: string;
    radius: Record<
      TextareaRadius,
      {
        prefix: string;
        default: string;
        suffix: string;
      }
    >;
  }
> = {
  xs: {
    height: "min-h-[var(--height-xs)]",
    radius: {
      default: {
        prefix: "rounded-r-xs",
        default: "rounded-xs",
        suffix: "rounded-l-xs",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-[var(--radius-full-xs)]",
        suffix: "rounded-l-full",
      },
    },
  },
  sm: {
    height: "min-h-[var(--height-sm)]",
    radius: {
      default: {
        prefix: "rounded-r-sm",
        default: "rounded-sm",
        suffix: "rounded-l-sm",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-[var(--radius-full-sm)]",
        suffix: "rounded-l-full",
      },
    },
  },
  md: {
    height: "min-h-[var(--height-md)]",
    radius: {
      default: {
        prefix: "rounded-r-md",
        default: "rounded-md",
        suffix: "rounded-l-md",
      },
      full: {
        prefix: "rounded-r-md",
        default: "rounded-[var(--radius-full-md)]",
        suffix: "rounded-l-full",
      },
    },
  },
  lg: {
    height: "min-h-[var(--height-lg)]",
    radius: {
      default: {
        prefix: "rounded-r-lg",
        default: "rounded-lg",
        suffix: "rounded-l-lg",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-[var(--radius-full-lg)]",
        suffix: "rounded-l-full",
      },
    },
  },
};

export const TextareaRadiusClass: Record<
  TextareaRadius,
  {
    prefix: string;
    default: string;
    suffix: string;
  }
> = {
  default: {
    prefix: "rounded-r-md",
    default: "rounded-md",
    suffix: "rounded-l-md",
  },
  full: {
    prefix: "rounded-r-md",
    default: "rounded-full",
    suffix: "rounded-l-full",
  },
};

export const TextareaStateIconSize: Record<TextareaSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4.5",
};
export const TextareaStateIconPaddingSize: Record<TextareaSize, string> = {
  xs: "flex h-[calc(var(--height-xs)-2px)] items-center",
  sm: "flex h-[calc(var(--height-sm)-2px)] items-center",
  md: "flex h-[calc(var(--height-md)-2px)] items-center",
  lg: "flex h-[calc(var(--height-lg)-2px)] items-center",
};

export const TextareaPadding: Record<
  TextareaSize,
  {
    wrapper: string;
    left: string;
    right: string;
  }
> = {
  xs: {
    wrapper: "px-1.5 py-0",
    left: "pr-0.5 flex h-[calc(var(--height-xs)-2px)] items-center",
    right: "pl-0.5 flex h-[calc(var(--height-xs)-2px)] items-center",
  },
  sm: {
    wrapper: "px-2 py-0",
    left: "pr-1 flex h-[calc(var(--height-sm)-2px)] items-center",
    right: "pl-1 flex h-[calc(var(--height-sm)-2px)] items-center",
  },
  md: {
    wrapper: "px-2 py-0",
    left: "pr-1.5 flex h-[calc(var(--height-md)-2px)] items-center",
    right: "pl-1.5 flex h-[calc(var(--height-md)-2px)] items-center",
  },
  lg: {
    wrapper: "px-2.5 py-0",
    left: "pr-2 flex h-[calc(var(--height-lg)-2px)] items-center",
    right: "pl-2 flex h-[calc(var(--height-lg)-2px)] items-center",
  },
};
