import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Slide from './Slide';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { EASING_SET, DURATIONS } from '@/constants/motion';
import { TRANSITION_ARGTYPES } from '@/constants/motion';

const meta: Meta<typeof Slide> = {
  component: Slide,
  argTypes: {
    ...TRANSITION_ARGTYPES,
    containerRef: {
      description: 'slide transition이 나타나는 container',
      table: {
        type: {
          summary: `React.RefObject<HTMLElement>`
        }
      }
    },
    direction: {
      description: 'transition 방향',
      table: {
        type: {
          summary: `'down' | 'left' | 'right' | 'up'`
        },
        defaultValue: { summary: `'down'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Slide>;

const TIMING_FUNCTIONS = [
  ...EASING_SET,
  'linear',
  'cubic-bezier(0.2, 0.1, 0.8, 0.1)',
  { enter: 'emphasized-decelerate', exit: 'emphasized-accelerate' }
];

const TRANSITION_DURATIONS = [
  ...DURATIONS,
  1500,
  '2s',
  { enter: 'long1', exit: 'short1' }
];

const SlideWithToggle = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Slide out' : 'Slide in'}
      </Button>
      <Slide in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Slide>
    </Stack>
  );
};

const SlideWithToggleAndReset = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(true);
  const [key, setKey] = useState<number>(Math.random());

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };
  const reset = () => {
    setKey(Math.random());
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Stack direction="row" spacing={10}>
        <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
          {transitionIn ? 'Slide out' : 'Slide in'}
        </Button>
        <Button
          onClick={reset}
          variant="outlined"
          style={{ maxWidth: 'max-content' }}
        >
          reset
        </Button>
      </Stack>
      <Slide key={key} in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Slide>
    </Stack>
  );
};

const SlideWithToggleAndContainer = ({ ...props }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [transitionIn, setTransitionIn] = useState(true);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Slide out' : 'Slide in'}
      </Button>
      <Box
        ref={containerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 400,
          height: 200,
          backgroundColor: 'gray-100',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <Slide in={transitionIn} containerRef={containerRef} {...props}>
          <Box
            style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
          />
        </Slide>
      </Box>
    </Stack>
  );
};

const TimingFunctionTemplate = () => {
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <Stack spacing={20}>
      <Grid columns={3} columnSpacing={20}>
        {TIMING_FUNCTIONS.map((timing, idx) => {
          const label = JSON.stringify(timing);
          return (
            <RadioLabel key={label} label={label}>
              <Radio
                value={idx}
                checked={checkedValue === idx}
                onChange={handleChange}
              />
            </RadioLabel>
          );
        })}
      </Grid>
      <SlideWithToggle easing={TIMING_FUNCTIONS[checkedValue]} />
    </Stack>
  );
};

const DurationTemplate = () => {
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <Stack spacing={20}>
      <Grid columns={4} columnSpacing={20}>
        {TRANSITION_DURATIONS.map((duration, idx) => {
          const label = JSON.stringify(duration);
          return (
            <RadioLabel key={label} label={label}>
              <Radio
                value={idx}
                checked={checkedValue === idx}
                onChange={handleChange}
              />
            </RadioLabel>
          );
        })}
      </Grid>
      <SlideWithToggle duration={TRANSITION_DURATIONS[checkedValue]} />
    </Stack>
  );
};

export const BasicSlide: Story = {
  render: () => <SlideWithToggle />
};

export const Direction: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      {['down', 'up', 'left', 'right'].map((direction) => (
        <Stack key={direction}>
          <Text>Direction: {direction}</Text>
          <SlideWithToggle direction={direction} />
        </Stack>
      ))}
    </Stack>
  )
};

export const SlideContainer: Story = {
  render: () => <SlideWithToggleAndContainer />
};

export const TransitionTimingFunction: Story = {
  render: () => <TimingFunctionTemplate />
};

export const TransitionDuration: Story = {
  render: () => <DurationTemplate />
};

export const AnimateOnMount: Story = {
  render: () => <SlideWithToggleAndReset animateOnMount />
};
