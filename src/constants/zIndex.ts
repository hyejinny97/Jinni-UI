export const DEFAULT_Z_INDEX = {
  backdrop: 1000,
  popper: 2000,
  modal: 3000,
  drawer: 3000,
  toast: 4000
} as const;

export const Z_INDEX = Object.keys(
  DEFAULT_Z_INDEX
) as (keyof typeof DEFAULT_Z_INDEX)[];
