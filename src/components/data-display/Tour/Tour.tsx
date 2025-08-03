import { useScrollbarHidden, useKeydown } from './Tour.hooks';
import TourContext from './Tour.contexts';

type CloseReason = 'escapeKeydown' | 'backdropClick';

export type TourProps = {
  children: React.ReactNode;
  open: boolean;
  onClose?: (event: Event | React.SyntheticEvent, reason: CloseReason) => void;
  value: number | string;
};

const Tour = (props: TourProps) => {
  const { children, open, onClose, value } = props;
  useScrollbarHidden({ open });
  useKeydown({ onClose });

  if (!open) return;
  return (
    <TourContext.Provider value={{ tourValue: value, onClose }}>
      {children}
    </TourContext.Provider>
  );
};

export default Tour;
