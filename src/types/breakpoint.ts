export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Responsive<T> = Partial<Record<BreakpointType, T>>;
