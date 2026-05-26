export interface DefaultBreakpoint {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BreakpointOverride {}

export type BreakpointType = keyof (keyof BreakpointOverride extends never
  ? DefaultBreakpoint
  : BreakpointOverride);

export type Responsive<T> = Partial<Record<BreakpointType, T>>;

type CustomBreakpoint = Record<string, number> & {
  [K in keyof DefaultBreakpoint]?: never;
};

export type BreakpointValue = DefaultBreakpoint | CustomBreakpoint;
