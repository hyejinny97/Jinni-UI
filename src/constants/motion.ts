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
