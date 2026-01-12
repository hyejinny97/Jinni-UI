import { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { CarouselProps } from './Carousel';
import CarouselContext from './Carousel.context';

type UseSlideValueProps = Pick<CarouselProps, 'value' | 'onChange'> &
  Required<Pick<CarouselProps, 'defaultValue'>>;

type UseScrollProps = Required<
  Pick<CarouselProps, 'orientation' | 'slideAlignment'>
> &
  Pick<CarouselProps, 'disableBounceEffect'> & {
    carouselElRef: React.RefObject<HTMLElement>;
    goSlide: (newValue: number) => void;
  };

export const useSlideValue = ({
  defaultValue,
  value,
  onChange
}: UseSlideValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSlideValue, setUncontrolledSlideValue] =
    useState(defaultValue);
  const slideValue = isControlled ? value : uncontrolledSlideValue;

  const goSlide = useCallback(
    (newValue: number) => {
      if (!isControlled) setUncontrolledSlideValue(newValue);
      if (onChange) onChange(newValue);
    },
    [isControlled, onChange]
  );

  return {
    slideValue,
    goSlide
  };
};

export const useSwipe = ({
  carouselElRef,
  goSlide,
  orientation,
  slideAlignment,
  disableBounceEffect
}: UseScrollProps) => {
  const [isSwiping, setSwiping] = useState<boolean>(false);
  const scrollEndLimitRef = useRef<number>(Number.MAX_VALUE);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    if (!carouselEl) return;

    const carouselContainerEl = carouselEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContainer'
    );
    if (!carouselContainerEl) return;

    const carouselContentEl = carouselContainerEl.querySelector<HTMLElement>(
      ':scope > .JinniCarouselContent'
    );
    if (!carouselContentEl) return;

    const carouselItemElList = carouselContentEl.querySelectorAll<HTMLElement>(
      ':scope > .JinniCarouselItem'
    );
    const reversedCarouselItemElList = [...carouselItemElList].reverse();
    const maxItemIdx = carouselItemElList.length - 1;
    const firstItem = carouselItemElList[0];
    const lastItem = carouselItemElList[maxItemIdx];

    const calculateScrollLimit = () => {
      let scrollStartLimit: number = 0;
      let scrollEndLimit: number = carouselContentEl.scrollWidth;
      switch (orientation) {
        case 'horizontal': {
          switch (slideAlignment) {
            case 'start': {
              scrollStartLimit = firstItem.offsetLeft;
              scrollEndLimit =
                lastItem.offsetLeft +
                lastItem.clientWidth -
                carouselContainerEl.clientWidth;
              break;
            }
            case 'center': {
              scrollStartLimit =
                firstItem.offsetLeft -
                (carouselContainerEl.clientWidth - firstItem.clientWidth) / 2;
              scrollEndLimit =
                lastItem.offsetLeft -
                (carouselContainerEl.clientWidth - lastItem.clientWidth) / 2;
              break;
            }
          }
          break;
        }
        case 'vertical': {
          switch (slideAlignment) {
            case 'start': {
              scrollStartLimit = firstItem.offsetTop;
              scrollEndLimit =
                lastItem.offsetTop +
                lastItem.clientHeight -
                carouselContainerEl.clientHeight;
              break;
            }
            case 'center': {
              scrollStartLimit =
                firstItem.offsetTop -
                (carouselContainerEl.clientHeight - firstItem.clientHeight) / 2;
              scrollEndLimit =
                lastItem.offsetTop -
                (carouselContainerEl.clientHeight - lastItem.clientHeight) / 2;
            }
          }
        }
      }
      return { scrollStartLimit, scrollEndLimit };
    };
    const { scrollStartLimit, scrollEndLimit } = calculateScrollLimit();
    scrollEndLimitRef.current = scrollEndLimit;

    const translate = (event: PointerEvent) => {
      switch (orientation) {
        case 'horizontal': {
          if (disableBounceEffect) {
            const nextScrollLeft =
              carouselContainerEl.scrollLeft - event.movementX;
            carouselContainerEl.scrollLeft = Math.max(
              scrollStartLimit,
              Math.min(scrollEndLimit, nextScrollLeft)
            );
          } else {
            const diffScrollStartLimit =
              carouselContainerEl.scrollLeft - scrollStartLimit;
            const diffScrollEndLimit =
              scrollEndLimit - carouselContainerEl.scrollLeft;

            let movement = event.movementX;
            if (diffScrollStartLimit < 0) {
              movement = movement / Math.sqrt(Math.abs(diffScrollStartLimit));
            } else if (diffScrollEndLimit < 0) {
              movement = movement / Math.sqrt(Math.abs(diffScrollEndLimit));
            }

            const nextScrollLeft = carouselContainerEl.scrollLeft - movement;
            carouselContainerEl.scrollLeft = nextScrollLeft;
          }
          break;
        }
        case 'vertical': {
          if (disableBounceEffect) {
            const nextScrollTop =
              carouselContainerEl.scrollTop - event.movementY;
            carouselContainerEl.scrollTop = Math.max(
              scrollStartLimit,
              Math.min(scrollEndLimit, nextScrollTop)
            );
          } else {
            const diffScrollStartLimit =
              carouselContainerEl.scrollTop - scrollStartLimit;
            const diffScrollEndLimit =
              scrollEndLimit - carouselContainerEl.scrollTop;

            let movement = event.movementY;
            if (diffScrollStartLimit < 0) {
              movement = movement / Math.sqrt(Math.abs(diffScrollStartLimit));
            } else if (diffScrollEndLimit < 0) {
              movement = movement / Math.sqrt(Math.abs(diffScrollEndLimit));
            }

            const nextScrollTop = carouselContainerEl.scrollTop - movement;
            carouselContainerEl.scrollTop = nextScrollTop;
          }
        }
      }
    };
    const setSlideValue = () => {
      switch (orientation) {
        case 'horizontal': {
          switch (slideAlignment) {
            case 'start': {
              const itemIdx = reversedCarouselItemElList.findIndex(
                (item) =>
                  item.getBoundingClientRect().left <=
                  carouselContainerEl.getBoundingClientRect().left
              );
              if (itemIdx === -1) return;

              const activeItemIdx = maxItemIdx - itemIdx;
              const activeItem = carouselItemElList[activeItemIdx];
              const isOverMiddleOfItem =
                carouselContainerEl.scrollLeft >=
                activeItem.offsetLeft +
                  activeItem.getBoundingClientRect().width / 2;
              if (isOverMiddleOfItem)
                goSlide(Math.min(maxItemIdx, activeItemIdx + 1));
              else goSlide(activeItemIdx);
              break;
            }
            case 'center': {
              const itemIdx = reversedCarouselItemElList.findIndex(
                (item) =>
                  item.getBoundingClientRect().left <=
                  carouselContainerEl.getBoundingClientRect().left +
                    carouselContainerEl.getBoundingClientRect().width / 2
              );
              if (itemIdx === -1) return;

              const activeItemIdx = maxItemIdx - itemIdx;
              goSlide(Math.min(maxItemIdx, activeItemIdx));
            }
          }
          break;
        }
        case 'vertical': {
          switch (slideAlignment) {
            case 'start': {
              const itemIdx = reversedCarouselItemElList.findIndex(
                (item) =>
                  item.getBoundingClientRect().top <=
                  carouselContainerEl.getBoundingClientRect().top
              );
              if (itemIdx === -1) return;

              const activeItemIdx = maxItemIdx - itemIdx;
              const activeItem = carouselItemElList[activeItemIdx];
              const isOverMiddleOfItem =
                carouselContainerEl.scrollTop >=
                activeItem.offsetTop +
                  activeItem.getBoundingClientRect().height / 2;
              if (isOverMiddleOfItem)
                goSlide(Math.min(maxItemIdx, activeItemIdx + 1));
              else goSlide(activeItemIdx);
              break;
            }
            case 'center': {
              const itemIdx = reversedCarouselItemElList.findIndex(
                (item) =>
                  item.getBoundingClientRect().top <=
                  carouselContainerEl.getBoundingClientRect().top +
                    carouselContainerEl.getBoundingClientRect().height / 2
              );
              if (itemIdx === -1) return;

              const activeItemIdx = maxItemIdx - itemIdx;
              goSlide(Math.min(maxItemIdx, activeItemIdx));
            }
          }
          break;
        }
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!carouselContentEl.contains(event.target as Node | null)) return;
      setSwiping(true);
      translate(event);
      setSlideValue();
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!isSwiping) return;
      translate(event);
      setSlideValue();
    };
    const handlePointerUp = () => {
      if (!isSwiping) return;
      setSwiping(false);
      setSlideValue();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    carouselElRef,
    isSwiping,
    goSlide,
    orientation,
    slideAlignment,
    disableBounceEffect
  ]);

  return { isSwiping, scrollEndLimitRef };
};

export const useCarousel = () => {
  const value = useContext(CarouselContext);
  if (!value) throw Error('CarouselContext value is null');
  return value;
};
