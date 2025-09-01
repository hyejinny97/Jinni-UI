import { useRef, useLayoutEffect, useState } from 'react';
import { SlideProps } from './Slide';

export const useTranslate = ({
  direction,
  children,
  containerRef
}: Pick<SlideProps, 'direction' | 'children' | 'containerRef'>) => {
  const contentElRef = useRef<HTMLDivElement>(null);
  const [contentPosition, setContentPosition] = useState<string | null>(null);

  useLayoutEffect(() => {
    const contentEl = contentElRef.current;
    if (!contentEl) return;
    const {
      left: contentLeft,
      right: contentRight,
      top: contentTop,
      bottom: contentBottom,
      width: contentWidth,
      height: contentHeight
    } = contentEl.getBoundingClientRect();
    const {
      left: containerLeft,
      right: containerRight,
      top: containerTop,
      bottom: containerBottom
    } = containerRef && containerRef.current
      ? containerRef.current.getBoundingClientRect()
      : {
          left: 0,
          right: window.innerWidth,
          top: 0,
          bottom: window.innerHeight
        };

    let position = 0;
    switch (direction) {
      case 'left':
        position = containerRight - contentRight + contentWidth;
        break;
      case 'right':
        position = -(contentLeft - containerLeft + contentWidth);
        break;
      case 'up':
        position = containerBottom - contentBottom + contentHeight;
        break;
      case 'down':
        position = -(contentTop - containerTop + contentHeight);
        break;
    }
    setContentPosition(`${position}px`);
  }, [children, direction, containerRef]);

  const getTranslateValue = (position: string) => {
    switch (direction) {
      case 'up':
      case 'down':
        return `translateY(${position})`;
      case 'left':
      case 'right':
        return `translateX(${position})`;
    }
  };

  return {
    contentElRef,
    translatedPosition: contentPosition && getTranslateValue(contentPosition),
    originPosition: contentPosition && getTranslateValue('0px')
  };
};
