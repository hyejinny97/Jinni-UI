import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Scale from './Scale';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { TRANSITION_ARG_TYPES } from '@/components/general/Transition';

const meta: Meta<typeof Scale> = {
  component: Scale,
  argTypes: TRANSITION_ARG_TYPES
};

export default meta;
type Story = StoryObj<typeof Scale>;

const ScaleTemplate = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Disappear' : 'Appear'}
      </Button>
      <Scale in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Scale>
    </Stack>
  );
};

export const DefaultScaleTransition: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ScaleTemplate {...args} />
      <ScaleTemplate
        easing={{
          enter: 'emphasized-decelerate',
          exit: 'emphasized-accelerate'
        }}
        {...args}
      />
    </Stack>
  )
};

export const TransitionOrigin: Story = {
  render: (args) => (
    <ScaleTemplate style={{ transformOrigin: 'top left' }} {...args} />
  )
};
