import { EASING_SET, DURATIONS } from '@/constants/motion';

export type EasingType = (typeof EASING_SET)[number];

export type DurationType = (typeof DURATIONS)[number];

type EnterExit<T> = { enter: T; exit: T };

export type TransitionType = {
  in: boolean;
  easing?: EasingType | string | EnterExit<EasingType | string>;
  duration?:
    | DurationType
    | number
    | string
    | EnterExit<DurationType | number | string>;
  animateOnMount?: boolean;
};
