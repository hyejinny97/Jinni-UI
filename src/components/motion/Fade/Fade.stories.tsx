import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Fade from './Fade';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { EASING_SET, DURATIONS } from '@/constants/motion';
import { TRANSITION_ARGTYPES } from '@/constants/motion';

const meta: Meta<typeof Fade> = {
  component: Fade,
  argTypes: TRANSITION_ARGTYPES
};

export default meta;
type Story = StoryObj<typeof Fade>;

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

const FadeWithToggle = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(true);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Fade out' : 'Fade in'}
      </Button>
      <Fade in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Fade>
    </Stack>
  );
};

const FadeWithToggleAndReset = ({ ...props }) => {
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
          {transitionIn ? 'Fade out' : 'Fade in'}
        </Button>
        <Button
          onClick={reset}
          variant="outlined"
          style={{ maxWidth: 'max-content' }}
        >
          reset
        </Button>
      </Stack>
      <Fade key={key} in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Fade>
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
      <FadeWithToggle easing={TIMING_FUNCTIONS[checkedValue]} />
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
      <FadeWithToggle duration={TRANSITION_DURATIONS[checkedValue]} />
    </Stack>
  );
};

export const BasicFade: Story = {
  render: () => <FadeWithToggle />
};

export const TransitionTimingFunction: Story = {
  render: () => <TimingFunctionTemplate />
};

export const TransitionDuration: Story = {
  render: () => <DurationTemplate />
};

export const AnimateOnMount: Story = {
  render: () => <FadeWithToggleAndReset animateOnMount duration="extra-long4" />
};
