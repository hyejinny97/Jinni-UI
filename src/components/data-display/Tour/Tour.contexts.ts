import { createContext } from 'react';
import { TourProps } from './Tour';

type TourContextType = {
  tourValue: TourProps['value'];
  onClose: TourProps['onClose'];
};

const TourContext = createContext<TourContextType | null>(null);

export default TourContext;
