import { isObject } from '@/utils/isObject';
import {
  TransitionProps,
  EnterAndExit,
  DEFAULT_EASING,
  DEFAULT_DURATION
} from './Transition';

const isEnterAndExitType = (value: unknown): value is EnterAndExit<unknown> =>
  isObject(value) && ('enter' in value || 'exit' in value);

export const flatEasing = ({
  easing,
  in: transitionIn
}: Required<Pick<TransitionProps, 'easing' | 'in'>>) => {
  if (!isEnterAndExitType(easing)) return easing;
  if (transitionIn) return easing.enter || DEFAULT_EASING;
  return easing.exit || DEFAULT_EASING;
};

export const flatDuration = ({
  duration,
  in: transitionIn
}: Required<Pick<TransitionProps, 'duration' | 'in'>>) => {
  if (!isEnterAndExitType(duration)) return duration;
  if (transitionIn) return duration.enter || DEFAULT_DURATION;
  return duration.exit || DEFAULT_DURATION;
};
