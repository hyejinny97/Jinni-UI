import { useKeydown } from './Tour.hooks';
import TourContext from './Tour.contexts';
import { MaskOptionalProps } from './Mask';
import { TourStepOptionalProps } from './TourStep';

type CloseReason = 'escapeKeydown' | 'backdropClick';

export type TourProps = MaskOptionalProps &
  TourStepOptionalProps & {
    children: React.ReactNode;
    value: number | string;
    open: boolean;
    onClose?: (
      event: Event | React.SyntheticEvent,
      reason: CloseReason
    ) => void;
  };

const Tour = (props: TourProps) => {
  const { children, value, open, onClose, ...rest } = props;
  useKeydown({ onClose });

  if (!open) return;
  return (
    <TourContext.Provider value={{ tourValue: value, onClose, ...rest }}>
      {children}
    </TourContext.Provider>
  );
};

export default Tour;
