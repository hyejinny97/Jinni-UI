import { createContext } from 'react';
import { BreakpointType } from '@/types/breakpoint';

interface JinniValueType {
  breakpoints: Record<BreakpointType, number>;
}

const JinniContext = createContext<JinniValueType | null>(null);

export default JinniContext;
