import { createContext } from 'react';
import { OrientationType } from './Carousel';

type CarouselContextProps = {
  carouselItemCount: number;
  isFirstCarouselItem: boolean;
  isLastCarouselItem: boolean;
  carouselValue: number;
  handleChange: (event: Event | React.SyntheticEvent, newValue: number) => void;
  goNextSlide: (event: Event | React.SyntheticEvent) => void;
  goPrevSlide: (event: Event | React.SyntheticEvent) => void;
  orientation: OrientationType;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

export default CarouselContext;
