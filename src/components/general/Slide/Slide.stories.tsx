import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Slide from './Slide';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { TRANSITION_ARG_TYPES } from '@/components/general/Transition';

const meta: Meta<typeof Slide> = {
  component: Slide,
  argTypes: {
    container: {
      description: 'slide transition이 나타나는 container',
      table: {
        type: { summary: `HTML element` }
      }
    },
    direction: {
      description: 'transition 방향',
      table: {
        type: { summary: `'down' | 'left' | 'right' | 'up'` },
        defaultValue: { summary: `'down'` }
      }
    },
    ...TRANSITION_ARG_TYPES
  }
};

export default meta;
type Story = StoryObj<typeof Slide>;

const SlideTemplate = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Disappear' : 'Appear'}
      </Button>
      <Slide in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Slide>
    </Stack>
  );
};

const SlideContainerTemplate = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Box
      ref={containerRef}
      style={{
        width: 300,
        height: 300,
        border: 'solid 3px gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
        <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
          {transitionIn ? 'Disappear' : 'Appear'}
        </Button>
        <Slide in={transitionIn} container={containerRef.current}>
          <Box
            style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
          />
        </Slide>
      </Stack>
    </Box>
  );
};

export const DefaultSlideTransition: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <SlideTemplate {...args} />
      <SlideTemplate
        easing={{
          enter: 'emphasized-decelerate',
          exit: 'emphasized-accelerate'
        }}
        {...args}
      />
    </Stack>
  )
};

export const Direction: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <SlideTemplate direction="down" {...args} />
      <SlideTemplate direction="up" {...args} />
      <SlideTemplate direction="left" {...args} />
      <SlideTemplate direction="right" {...args} />
    </Stack>
  )
};

export const SlideContainer: Story = {
  render: (args) => <SlideContainerTemplate {...args} />
};
