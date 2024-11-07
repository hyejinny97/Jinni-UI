import { createContext } from 'react';
import type { JinniColorType } from '@/components/JinniColorProvider';

export const JinniColorContext = createContext<JinniColorType | null>(null);
