import { BREAKPOINTS } from '@/constants/breakpoint';

export type BreakpointType = (typeof BREAKPOINTS)[number];

export type Responsive<T> = Partial<Record<BreakpointType, T>>;
