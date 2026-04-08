import { createContext } from 'react';
import { TourProps } from './Tour';
import { MaskOptionalProps } from './Mask';
import { TourStepOptionalProps } from './TourStep';

type TourContextType = MaskOptionalProps &
  TourStepOptionalProps & {
    tourValue: TourProps['value'];
    onClose: TourProps['onClose'];
  };

const TourContext = createContext<TourContextType | null>(null);

export default TourContext;
