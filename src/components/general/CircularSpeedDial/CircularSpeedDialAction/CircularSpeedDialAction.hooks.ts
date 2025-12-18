import { useLayoutEffect, useRef, useState } from 'react';
import { isNumber } from '@/utils/isNumber';
import { TooltipProps } from '@/components/data-display/Tooltip';

export const useTooltipPlacement = () => {
  const wrapperElRef = useRef<HTMLElement>(null);
  const [tooltipPlacement, setTooltipPlacement] =
    useState<TooltipProps['placement']>('right');

  useLayoutEffect(() => {
    const wrapperEl = wrapperElRef.current;
    if (!wrapperEl) return;

    const setPlacement = () => {
      const rotationAngle = wrapperEl.dataset.rotationAngle;
      if (!rotationAngle) return;

      const angle = parseFloat(rotationAngle);
      if (!isNumber(angle)) return;

      if (90 < angle && angle < 270) setTooltipPlacement('left');
      else if (angle < 90 || angle > 270) setTooltipPlacement('right');
      else if (angle === 90) setTooltipPlacement('bottom');
      else if (angle === 270) setTooltipPlacement('top');
    };

    setPlacement();
    const observer = new MutationObserver(setPlacement);
    observer.observe(wrapperEl, {
      attributes: true,
      attributeFilter: ['data-rotation-angle']
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return { wrapperElRef, tooltipPlacement };
};
