import { useContext } from 'react';
import { DragContext } from './Drag.contexts';

export const useDragContext = () => {
  const dragContext = useContext(DragContext);
  if (!dragContext) throw new Error('DragContext value is null');
  return dragContext;
};
