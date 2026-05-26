import { useCallback } from 'react';
import useResponsive from '@/hooks/useResponsive';
import { isNumber } from '@/utils/isNumber';
import { Responsive, BreakpointType } from '@/types/breakpoint';

export const useTransform = () => {
  const { isResponsive } = useResponsive();

  const transformNumberToPx = useCallback(
    (value: number | string | Responsive<number | string> | undefined) => {
      if (isNumber(value)) {
        return `${value}px`;
      }
      if (isResponsive(value)) {
        const responsiveValue = { ...value };
        Object.keys(responsiveValue).forEach((key) => {
          const bp = key as BreakpointType;
          const val = responsiveValue[bp];
          if (isNumber(value)) {
            responsiveValue[bp] = `${val}px`;
          }
        });
        return responsiveValue;
      }
      return value;
    },
    [isResponsive]
  );

  return { transformNumberToPx };
};
