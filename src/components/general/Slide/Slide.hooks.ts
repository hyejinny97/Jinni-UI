import { useRef, useState, useCallback } from 'react';
import useJinni from '@/hooks/useJinni';
import { isNumber } from '@/utils/isNumber';
import { flatDuration } from '@/components/general/Transition';
import { SlideProps } from './Slide';

type useSlideProps = {
  direction: SlideProps['direction'];
  container?: SlideProps['container'];
};

type TranslateType = {
  translateX: number;
  translateY: number;
};

export const useSlide = ({ direction, container }: useSlideProps) => {
  const slideRef = useRef<HTMLElement>(null);
  const [translateValue, setTranslateValue] = useState<
    TranslateType | undefined
  >(undefined);

  const getSlideEl = () => {
    const slideEl = slideRef.current;
    if (!slideEl) throw new Error('slideEl를 찾을 수 없음.');
    return slideEl;
  };

  const getSlideElOffset = useCallback(() => {
    const slideEl = getSlideEl();
    const slideElStyles = window.getComputedStyle(slideEl);
    const transform = slideElStyles.getPropertyValue('transform');

    let offsetX = 0;
    let offsetY = 0;
    if (transform && transform !== 'none' && typeof transform === 'string') {
      const transformValues = transform.split('(')[1].split(')')[0].split(',');
      offsetX = parseInt(transformValues[4], 10);
      offsetY = parseInt(transformValues[5], 10);
    }
    return { offsetX, offsetY };
  }, []);

  const getTranslateValue = useCallback(() => {
    const slideEl = getSlideEl();
    const containerRect = container && container.getBoundingClientRect();
    const slideElRect = slideEl.getBoundingClientRect();
    const { offsetX, offsetY } = getSlideElOffset();

    let translateX = 0;
    let translateY = 0;
    switch (direction) {
      case 'left':
        if (containerRect)
          translateX = offsetX + containerRect.right - slideElRect.left;
        else translateX = offsetX + window.innerWidth - slideElRect.left;
        break;
      case 'right':
        if (containerRect)
          translateX = offsetX + containerRect.left - slideElRect.right;
        else translateX = offsetX - slideElRect.right;
        break;
      case 'up':
        if (containerRect)
          translateY = offsetY + containerRect.bottom - slideElRect.top;
        else translateY = offsetY + window.innerHeight - slideElRect.top;
        break;
      case 'down':
        if (containerRect)
          translateY = offsetY + containerRect.top - slideElRect.bottom;
        else translateY = offsetY - slideElRect.bottom;
        break;
    }
    return { translateX, translateY };
  }, [direction, container, getSlideElOffset]);

  const setTranslate = useCallback(() => {
    const { translateX, translateY } = getTranslateValue();
    setTranslateValue({ translateX, translateY });
  }, [getTranslateValue]);

  const initTranslate = useCallback(() => {
    setTranslateValue(undefined);
  }, []);

  const makeVisible = useCallback(() => {
    const slideEl = getSlideEl();
    slideEl.style.visibility = 'visible';
  }, []);

  const makeInVisible = useCallback(() => {
    const slideEl = getSlideEl();
    slideEl.style.visibility = 'hidden';
  }, []);

  const removeTransition = useCallback(() => {
    const slideEl = slideRef.current;
    if (!slideEl) return;
    slideEl.style.transitionProperty = 'none';
  }, []);

  const setTransition = useCallback(() => {
    const slideEl = slideRef.current;
    if (!slideEl) return;
    slideEl.style.transitionProperty = 'transform';
  }, []);

  return {
    slideRef,
    translateValue,
    setTranslate,
    initTranslate,
    makeVisible,
    makeInVisible,
    removeTransition,
    setTransition
  };
};

export const useDurationInNumber = ({
  duration,
  in: transitionIn
}: Required<Pick<SlideProps, 'duration' | 'in'>>) => {
  const { duration: durationTokenSet } = useJinni();

  const flattenDuration = flatDuration({
    duration,
    in: transitionIn
  });

  return isNumber(flattenDuration)
    ? flattenDuration
    : parseInt(durationTokenSet[flattenDuration]);
};
