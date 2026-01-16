import { createContext } from 'react';
import { CarouselProps } from './Carousel';

type CarouselContextProps = {
  count: number;
  slideValue: number;
  goSlide: (newValue: number) => void;
  goPrevSlide: () => void;
  goNextSlide: () => void;
  noPrevSlide: boolean;
  noNextSlide: boolean;
  isSwiping: boolean;
  scrollEndLimitRef: React.MutableRefObject<number>;
  scrollToActiveSlide: boolean;
  enableScrollToActiveSlide: () => void;
} & Required<Pick<CarouselProps, 'orientation' | 'spacing' | 'slideAlignment'>>;

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
