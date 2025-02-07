export const TRANSITION_ARG_TYPES = {
  children: {
    description: 'child content',
    table: {
      type: { summary: 'React.ReactNode' }
    }
  },
  duration: {
    description: 'transition duration (단위: ms)',
    table: {
      type: {
        summary:
          'DurationType | number | { enter?: DurationType | number, exit?: DurationType | number }'
      },
      defaultValue: { summary: `'medium1'` }
    }
  },
  easing: {
    description: 'transition timing function',
    table: {
      type: {
        summary:
          'EasingType | string | { enter?: EasingType | string, exit?: EasingType | string }'
      },
      defaultValue: { summary: `'emphasized'` }
    }
  },
  in: {
    description: 'true이면, transition in 됨'
  }
};
