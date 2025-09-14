import { createContext } from 'react';
import { ReorderItemValueType } from './Reorder.types';

type ReorderContextProps = {
  moveItem: (fromId: ReorderItemValueType, toId: ReorderItemValueType) => void;
  direction: 'horizontal' | 'vertical';
  isReorderingRef: React.MutableRefObject<boolean>;
};

type ReorderItemContextProps = {
  triggerElRef: React.RefObject<HTMLElement>;
};

export const ReorderContext = createContext<ReorderContextProps | null>(null);

export const ReorderItemContext = createContext<ReorderItemContextProps | null>(
  null
);
