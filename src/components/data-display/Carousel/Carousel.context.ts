import { createContext } from 'react';
import { OrientationType } from './Carousel';

type CarouselContextProps = {
  carouselItemsCount: number;
  noPrevSlide: boolean;
  noNextSlide: boolean;
  carouselItemValue: number;
  handleChange: (
    value: { newSlideValue: number } | { newCarouselItemValue: number }
  ) => void;
  goNextSlide: () => void;
  goPrevSlide: () => void;
  orientation: OrientationType;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
