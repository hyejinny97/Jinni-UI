import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Transition, { TransitionProps } from './Transition';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { TRANSITION_ARG_TYPES } from './Transition.constants';

const meta: Meta<typeof Transition> = {
  component: Transition,
  argTypes: TRANSITION_ARG_TYPES
};

export default meta;
type Story = StoryObj<typeof Transition>;

const Rotate = (props: TransitionProps) => {
  const { in: transitionIn, children, style, ...rest } = props;

  return (
    <Transition
      in={transitionIn}
      easing="emphasized-accelerate"
      duration="long2"
      style={{
        transitionProperty: 'transform',
        transform: transitionIn ? 'rotate(180deg)' : 'none',
        ...style
      }}
      {...rest}
    >
      {children}
    </Transition>
  );
};

const TransitionTemplate = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: '150px' }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Back' : 'Rotate'}
      </Button>
      <Rotate in={transitionIn} {...props}>
        <Box
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(#e66465, #9198e5)'
          }}
        />
      </Rotate>
    </Stack>
  );
};

export const RotateTransition: Story = {
  render: (args) => <TransitionTemplate {...args} />
};
