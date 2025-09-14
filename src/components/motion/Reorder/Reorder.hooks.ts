import { useContext } from 'react';
import { ReorderContext, ReorderItemContext } from './Reorder.contexts';

export const useReorder = () => {
  const value = useContext(ReorderContext);
  if (!value) throw Error('ReorderContext value is null');
  return value;
};

export const useReorderItem = () => {
  const value = useContext(ReorderItemContext);
  if (!value) throw Error('ReorderItemContext value is null');
  return value;
};
