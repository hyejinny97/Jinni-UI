import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './Collapse';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { EASING_SET, DURATIONS } from '@/constants/motion';
import { TRANSITION_ARGTYPES } from '@/constants/motion';

const meta: Meta<typeof Collapse> = {
  component: Collapse,
  argTypes: {
    ...TRANSITION_ARGTYPES,
    collapsedSize: {
      description: 'collapse될 때 container의 크기',
      table: {
        type: { summary: `number | string` }
      }
    },
    orientation: {
      description: 'transition 방향',
      table: {
        type: {
          summary: `'horizontal' | 'vertical'`
        },
        defaultValue: { summary: `'vertical'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Collapse>;

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

const CollapseWithToggle = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);

  const toggleTransition = () => {
    setTransitionIn((prev) => !prev);
  };

  return (
    <Stack spacing={10} style={{ minWidth: 150, minHeight: 150 }}>
      <Button onClick={toggleTransition} style={{ maxWidth: 'max-content' }}>
        {transitionIn ? 'Expand' : 'Collapse'}
      </Button>
      <Collapse in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Collapse>
    </Stack>
  );
};

const CollapseWithToggleAndReset = ({ ...props }) => {
  const [transitionIn, setTransitionIn] = useState(false);
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
          {transitionIn ? 'Expand' : 'Collapse'}
        </Button>
        <Button
          onClick={reset}
          variant="outlined"
          style={{ maxWidth: 'max-content' }}
        >
          reset
        </Button>
      </Stack>
      <Collapse key={key} in={transitionIn} {...props}>
        <Box
          style={{ backgroundColor: 'yellow-300', width: 100, height: 100 }}
        />
      </Collapse>
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
            <Label key={label} content={label}>
              <Radio
                value={idx}
                checked={checkedValue === idx}
                onChange={handleChange}
              />
            </Label>
          );
        })}
      </Grid>
      <CollapseWithToggle easing={TIMING_FUNCTIONS[checkedValue]} />
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
            <Label key={label} content={label}>
              <Radio
                value={idx}
                checked={checkedValue === idx}
                onChange={handleChange}
              />
            </Label>
          );
        })}
      </Grid>
      <CollapseWithToggle duration={TRANSITION_DURATIONS[checkedValue]} />
    </Stack>
  );
};

export const BasicCollapse: Story = {
  render: () => <CollapseWithToggle />
};

export const Orientation: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <CollapseWithToggle orientation="vertical" />
      <CollapseWithToggle orientation="horizontal" />
    </Stack>
  )
};

export const CollapsedSize: Story = {
  render: () => <CollapseWithToggle collapsedSize="20px" />
};

export const TransitionTimingFunction: Story = {
  render: () => <TimingFunctionTemplate />
};

export const TransitionDuration: Story = {
  render: () => <DurationTemplate />
};

export const AnimateOnMount: Story = {
  render: () => <CollapseWithToggleAndReset animateOnMount />
};
