export const EASING_SET = [
  'emphasized',
  'emphasized-accelerate',
  'emphasized-decelerate',
  'standard',
  'standard-accelerate',
  'standard-decelerate'
] as const;

export const DURATIONS = [
  'short1',
  'short2',
  'short3',
  'short4',
  'medium1',
  'medium2',
  'medium3',
  'medium4',
  'long1',
  'long2',
  'long3',
  'long4',
  'extra-long1',
  'extra-long2',
  'extra-long3',
  'extra-long4'
] as const;

export const DEFAULT_EASING_SET = {
  emphasized: 'ease',
  'emphasized-accelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  'emphasized-decelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  'standard-accelerate': 'cubic-bezier(0, 0, 0, 1)',
  'standard-decelerate': 'cubic-bezier(0.3, 0, 1, 1)'
} as const;

export const DEFAULT_DURATION = {
  short1: '50ms',
  short2: '100ms',
  short3: '150ms',
  short4: '200ms',
  medium1: '250ms',
  medium2: '300ms',
  medium3: '350ms',
  medium4: '400ms',
  long1: '450ms',
  long2: '500ms',
  long3: '550ms',
  long4: '600ms',
  'extra-long1': '700ms',
  'extra-long2': '800ms',
  'extra-long3': '900ms',
  'extra-long4': '1000ms'
} as const;

export const TRANSITION_ARGTYPES = {
  children: {
    description: 'child content'
  },
  duration: {
    description: 'transition duration (단위: ms)',
    table: {
      type: {
        summary: `DurationType | number | string | { enter: DurationType | number  | string, exit: DurationType | number  | string }`
      },
      defaultValue: { summary: `'medium1'` }
    }
  },
  easing: {
    description: 'transition timing function',
    table: {
      type: {
        summary: `EasingType | string | { enter: EasingType | string, exit: EasingType | string }`
      },
      defaultValue: { summary: `'emphasized'` }
    }
  },
  in: {
    description: 'true이면, transition in 됨',
    table: {
      type: { summary: `boolean` }
    }
  },
  animateOnMount: {
    description: 'true이면, mount 시 animation이 실행됨',
    table: {
      type: { summary: `boolean` }
    }
  }
};
