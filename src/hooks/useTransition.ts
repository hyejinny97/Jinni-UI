import { useMemo } from 'react';
import { TransitionType, DurationType, EasingType } from '@/types/motion';
import { DURATIONS, EASING_SET } from '@/constants/motion';
import { isNumber } from '@/utils/isNumber';
import { isObject } from '@/utils/isObject';

type EnterExit<T> = { enter: T; exit: T };

export const useTransition = ({
  easing,
  duration
}: Required<Pick<TransitionType, 'easing' | 'duration'>>) => {
  const processDuration = (
    duration: DurationType | number | string
  ): string => {
    if (DURATIONS.some((el) => el === duration)) {
      return `var(--jinni-duration-${duration})`;
    } else if (isNumber(duration)) {
      return `${duration}ms`;
    } else return duration;
  };

  const processEasing = (easing: EasingType | string): string => {
    if (EASING_SET.some((el) => el === easing)) {
      return `var(--jinni-easing-${easing})`;
    } else return easing;
  };

  const { enter: enterDuration, exit: exitDuration } = useMemo<
    EnterExit<string>
  >(() => {
    if (isObject(duration) && 'enter' in duration && 'exit' in duration) {
      return {
        enter: processDuration(duration.enter),
        exit: processDuration(duration.exit)
      };
    } else {
      const processedDuration = processDuration(duration);
      return {
        enter: processedDuration,
        exit: processedDuration
      };
    }
  }, [duration]);

  const { enter: enterEasing, exit: exitEasing } = useMemo<
    EnterExit<string>
  >(() => {
    if (isObject(easing) && 'enter' in easing && 'exit' in easing) {
      return {
        enter: processEasing(easing.enter),
        exit: processEasing(easing.exit)
      };
    } else {
      const processedEasing = processEasing(easing);
      return {
        enter: processedEasing,
        exit: processedEasing
      };
    }
  }, [easing]);

  return {
    enterDuration,
    exitDuration,
    enterEasing,
    exitEasing
  };
};
