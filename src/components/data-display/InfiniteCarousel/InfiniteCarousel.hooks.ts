import {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import InfiniteCarouselContext from './InfiniteCarousel.contexts';
import { InfiniteCarouselProps } from './InfiniteCarousel';
import { CarouselItemElement } from '@/components/data-display/Carousel';
import { findCarouselItems } from './InfiniteCarousel.utils';

type UseCarouselItemsValueProps = {
  defaultValue: number;
};

type UseAddItemsProps = Pick<InfiniteCarouselProps, 'children'> &
  Required<
    Pick<InfiniteCarouselProps, 'orientation' | 'spacing' | 'slideAlignment'>
  > & {
    infiniteCarouselElRef: React.RefObject<HTMLElement>;
    defaultValue: number;
    handleChange: (newValue: number) => void;
  };

type UseTransformProps = {
  baseCount: number;
  itemsAddedToFront: CarouselItemElement[];
};

type UseCarouselJumpOnLimitProps = Required<
  Pick<InfiniteCarouselProps, 'orientation' | 'slideAlignment'>
> & {
  infiniteCarouselElRef: React.RefObject<HTMLElement>;
  freezeCarouselValueRef: React.MutableRefObject<boolean>;
  baseCount: number;
  itemsAddedToFront: CarouselItemElement[];
  itemsAddedToBack: CarouselItemElement[];
  carouselValue: number;
  handleChange: (newValue: number) => void;
};

export const useCarouselValue = ({
  defaultValue
}: UseCarouselItemsValueProps) => {
  const freezeCarouselValueRef = useRef<boolean>(false);
  const [carouselValue, setCarouselValue] = useState<number>(defaultValue);

  const handleChange = useCallback((newValue: number) => {
    if (freezeCarouselValueRef.current) return;
    setCarouselValue(newValue);
  }, []);

  return {
    carouselValue,
    handleChange,
    freezeCarouselValueRef
  };
};

export const useAddItems = ({
  infiniteCarouselElRef,
  children,
  orientation,
  spacing,
  slideAlignment,
  defaultValue,
  handleChange
}: UseAddItemsProps) => {
  const baseCarouselItems = useMemo(
    () => findCarouselItems(children),
    [children]
  );
  const baseCount = baseCarouselItems.length;
  const [itemsAddedToFront, setItemsAddedToFront] = useState<
    CarouselItemElement[]
  >([]);
  const [itemsAddedToBack, setItemsAddedToBack] = useState<
    CarouselItemElement[]
  >([]);

  useLayoutEffect(() => {
    const infiniteCarouselEl = infiniteCarouselElRef.current;
    if (!infiniteCarouselEl) return;

    const carouselContainerEl = infiniteCarouselEl.querySelector<HTMLElement>(
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
    const baseItems = [...carouselItemElList].slice(
      itemsAddedToFront.length,
      itemsAddedToFront.length + baseCount
    );
    const firstItem = baseItems[0];
    const lastItem = baseItems[baseItems.length - 1];

    const generateItemsAddedToFront = () => {
      const clientSize =
        orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
      const sizeToFill =
        slideAlignment === 'start'
          ? carouselContainerEl[clientSize]
          : carouselContainerEl[clientSize] - firstItem[clientSize] / 2;

      let itemsNmToAdded = 0;
      let sizeAddedItems = 0;
      while (sizeToFill >= sizeAddedItems) {
        const slideIdx = baseCount - 1 - (itemsNmToAdded % baseCount);
        sizeAddedItems += baseItems[slideIdx][clientSize] + spacing;
        itemsNmToAdded += 1;
      }

      return Array(itemsNmToAdded)
        .fill(0)
        .map((_, idx) => {
          const offset = itemsNmToAdded - 1 - idx;
          const slideIdx = baseCount - 1 - (offset % baseCount);
          return {
            ...baseCarouselItems[slideIdx],
            key: `item-${offset} added in front`
          };
        });
    };
    const generateItemsAddedToBack = () => {
      const clientSize =
        orientation === 'horizontal' ? 'clientWidth' : 'clientHeight';
      const sizeToFill =
        slideAlignment === 'start'
          ? carouselContainerEl[clientSize]
          : carouselContainerEl[clientSize] - lastItem[clientSize] / 2;

      let itemsNmToAdded = 0;
      let sizeAddedItems = 0;
      while (sizeToFill >= sizeAddedItems) {
        const slideIdx = itemsNmToAdded % baseCount;
        sizeAddedItems += baseItems[slideIdx][clientSize] + spacing;
        itemsNmToAdded += 1;
      }

      return Array(itemsNmToAdded)
        .fill(0)
        .map((_, offset) => {
          const slideIdx = offset % baseCount;
          return {
            ...baseCarouselItems[slideIdx],
            key: `item-${offset} added in back`
          };
        });
    };

    const frontItems = generateItemsAddedToFront();
    const backItems = generateItemsAddedToBack();
    setItemsAddedToFront(frontItems);
    setItemsAddedToBack(backItems);
    handleChange(defaultValue + frontItems.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCarouselItems]);

  return {
    itemsAddedToFront,
    itemsAddedToBack,
    baseCount
  };
};

export const useTransform = ({
  baseCount,
  itemsAddedToFront
}: UseTransformProps) => {
  const transformToSlideIdx = (carouselItemIdx: number): number => {
    const itemsNmAddedInFront = itemsAddedToFront.length;
    const isAddedItemToFront = carouselItemIdx < itemsNmAddedInFront;
    const isAddedItemToBack =
      carouselItemIdx >= baseCount + itemsNmAddedInFront;
    if (isAddedItemToFront) {
      const offset = itemsNmAddedInFront - carouselItemIdx - 1;
      return baseCount - 1 - (offset % baseCount);
    }
    if (isAddedItemToBack) {
      const offset = carouselItemIdx - itemsNmAddedInFront - baseCount;
      return offset % baseCount;
    }
    return carouselItemIdx - itemsNmAddedInFront;
  };
  const transformToCarouselItemIdx = (slideIdx: number): number => {
    const itemsNmAddedInFront = itemsAddedToFront.length;
    return slideIdx + itemsNmAddedInFront;
  };

  return {
    transformToSlideIdx,
    transformToCarouselItemIdx
  };
};

export const useCarouselJumpOnLimit = ({
  infiniteCarouselElRef,
  freezeCarouselValueRef,
  orientation,
  slideAlignment,
  baseCount,
  itemsAddedToFront,
  itemsAddedToBack,
  carouselValue,
  handleChange
}: UseCarouselJumpOnLimitProps) => {
  useEffect(() => {
    const infiniteCarouselEl = infiniteCarouselElRef.current;
    if (
      !infiniteCarouselEl ||
      itemsAddedToFront.length === 0 ||
      itemsAddedToBack.length === 0
    )
      return;

    const carouselContainerEl = infiniteCarouselEl.querySelector<HTMLElement>(
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
    const frontLimitItemIdx = itemsAddedToBack.length - 1;
    const backLimitItemIdx = itemsAddedToFront.length + baseCount;
    const frontLimitItem = carouselItemElList[frontLimitItemIdx];
    const backLimitItem = carouselItemElList[backLimitItemIdx];

    if (
      carouselValue === frontLimitItemIdx ||
      carouselValue === backLimitItemIdx
    ) {
      freezeCarouselValueRef.current = true;
    }

    const offsetAxis =
      orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop';
    const scrollAxis =
      orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop';
    const rectStart = orientation === 'horizontal' ? 'left' : 'top';
    const rectEnd = orientation === 'horizontal' ? 'right' : 'bottom';
    const rectSize = orientation === 'horizontal' ? 'width' : 'height';

    const frontIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { boundingClientRect, rootBounds } = entry;
          if (rootBounds) {
            let isCrossing = false;
            switch (slideAlignment) {
              case 'start': {
                isCrossing =
                  boundingClientRect[rectStart] < rootBounds[rectEnd] &&
                  rootBounds[rectEnd] <= boundingClientRect[rectEnd];
                break;
              }
              case 'center': {
                const targetCenter =
                  boundingClientRect[rectStart] +
                  boundingClientRect[rectSize] / 2;
                const rootCenter =
                  rootBounds[rectStart] + rootBounds[rectSize] / 2;
                isCrossing =
                  rootCenter <= targetCenter &&
                  boundingClientRect[rectStart] < rootCenter;
              }
            }
            if (isCrossing) {
              freezeCarouselValueRef.current = false;
              const itemIdxToJump = frontLimitItemIdx + baseCount;
              carouselContainerEl[scrollAxis] =
                carouselItemElList[itemIdxToJump][offsetAxis];
              handleChange(itemIdxToJump);
            }
          }
        });
      },
      {
        root: carouselContainerEl,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
    const backIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { boundingClientRect, rootBounds } = entry;
          if (rootBounds) {
            let isCrossing = false;
            switch (slideAlignment) {
              case 'start': {
                isCrossing =
                  boundingClientRect[rectStart] <= rootBounds[rectStart] &&
                  rootBounds[rectStart] < boundingClientRect[rectEnd];
                break;
              }
              case 'center': {
                const targetCenter =
                  boundingClientRect[rectStart] +
                  boundingClientRect[rectSize] / 2;
                const rootCenter =
                  rootBounds[rectStart] + rootBounds[rectSize] / 2;
                isCrossing =
                  targetCenter <= rootCenter &&
                  rootCenter < boundingClientRect[rectEnd];
              }
            }
            if (isCrossing) {
              freezeCarouselValueRef.current = false;
              const itemIdxToJump = backLimitItemIdx - baseCount;
              carouselContainerEl[scrollAxis] =
                carouselItemElList[itemIdxToJump][offsetAxis];
              handleChange(itemIdxToJump);
            }
          }
        });
      },
      {
        root: carouselContainerEl,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );

    frontIntersectionObserver.observe(frontLimitItem);
    backIntersectionObserver.observe(backLimitItem);
    return () => {
      frontIntersectionObserver.disconnect();
      backIntersectionObserver.disconnect();
    };
  }, [
    infiniteCarouselElRef,
    freezeCarouselValueRef,
    orientation,
    slideAlignment,
    baseCount,
    itemsAddedToFront,
    itemsAddedToBack,
    carouselValue,
    handleChange
  ]);
};

export const useInfiniteCarousel = () => {
  const value = useContext(InfiniteCarouselContext);
  return value;
};
