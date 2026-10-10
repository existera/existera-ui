import type { InputOperatorRadius, InputOperatorSize, InputOperatorState } from "../types/ExInputOperatorType";

export const InputOperatorStateClass: Record<InputOperatorState, string> = {
  default: "focus-within:outline-2 focus-within:outline-primary",
  error: "outline-2 outline-danger",
  success: "outline-2 outline-success",
};

export const InputOperatorSizeClass: Record<
  InputOperatorSize,
  {
    height: string;
    radius: Record<
      InputOperatorRadius,
      {
        prefix: string;
        default: string;
        suffix: string;
      }
    >;
  }
> = {
  xs: {
    height: "min-h-xs h-fit text-xs",
    radius: {
      default: {
        prefix: "rounded-r-xs",
        default: "rounded-xs",
        suffix: "rounded-l-xs",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-full",
        suffix: "rounded-l-full",
      },
    },
  },
  sm: {
    height: "min-h-sm h-fit text-sm",
    radius: {
      default: {
        prefix: "rounded-r-sm",
        default: "rounded-sm",
        suffix: "rounded-l-sm",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-full",
        suffix: "rounded-l-full",
      },
    },
  },
  md: {
    height: "min-h-md h-fit text-md",
    radius: {
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
    },
  },
  lg: {
    height: "min-h-lg h-fit text-lg",
    radius: {
      default: {
        prefix: "rounded-r-lg",
        default: "rounded-lg",
        suffix: "rounded-l-lg",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-full",
        suffix: "rounded-l-full",
      },
    },
  },
};

export const InputOperatorRadiusClass: Record<
  InputOperatorRadius,
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

export const InputOperatorStateIconSize: Record<InputOperatorSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4.5",
};

export const InputOperatorPadding: Record<
  InputOperatorSize,
  {
    wrapper: string;
    left: string;
    right: string;
  }
> = {
  xs: {
    wrapper: "px-1.5 py-1",
    left: "pr-0.5",
    right: "pl-0.5",
  },
  sm: {
    wrapper: "px-2 py-1",
    left: "pr-1",
    right: "pl-1",
  },
  md: {
    wrapper: "px-2 py-1",
    left: "pr-1.5",
    right: "pl-1.5",
  },
  lg: {
    wrapper: "px-2.5 py-1",
    left: "pr-2",
    right: "pl-2",
  },
};
