import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Transition, { TransitionProps } from './Transition';
import Fade from './Fade';
import Slide from './Slide';
import Scale from './Scale';
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

const ScaleFadeTemplate = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Disappear' : 'Appear'}
      </Button>
      <Fade in={transitionIn}>
        <Scale in={transitionIn} {...props}>
          <Box
            style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
          />
        </Scale>
      </Fade>
    </Stack>
  );
};

const SlideFadeTemplate = ({ ...props }) => {
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
        <Slide in={transitionIn} {...props}>
          <Box
            style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
          />
        </Slide>
      </Fade>
    </Stack>
  );
};

export const RotateTransition: Story = {
  render: (args) => <TransitionTemplate {...args} />
};

export const ScaleFade: Story = {
  render: (args) => <ScaleFadeTemplate duration="long4" {...args} />
};

export const SlideFade: Story = {
  render: (args) => <SlideFadeTemplate duration="extra-long4" {...args} />
};
