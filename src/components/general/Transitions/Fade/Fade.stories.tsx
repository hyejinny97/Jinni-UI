import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Fade from './Fade';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { TRANSITION_ARG_TYPES } from '../Transition.constants';

const meta: Meta<typeof Fade> = {
  component: Fade,
  argTypes: TRANSITION_ARG_TYPES
};

export default meta;
type Story = StoryObj<typeof Fade>;

const FadeTemplate = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Disappear' : 'Appear'}
      </Button>
      <Fade in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Fade>
    </Stack>
  );
};

export const DefaultFadeTransition: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <FadeTemplate {...args} />
      <FadeTemplate
        easing="standard"
        duration={{ enter: 'extra-long4', exit: 'short1' }}
        {...args}
      />
    </Stack>
  )
};
