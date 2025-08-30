import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Motion from './Motion';
import { AnimatePresence } from '@/components/motion/AnimatePresence';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';
import { RefreshIcon } from '@/components/icons/RefreshIcon';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';

const meta: Meta<typeof Motion> = {
  component: Motion,
  argTypes: {
    animate: {
      description: 'mount시 적용될 스타일'
    },
    children: {
      description: '애니메이션을 적용할 요소'
    },
    exit: {
      description: 'unmount시 적용될 스타일'
    },
    initial: {
      description: '초기 스타일'
    },
    transition: {
      description:
        'CSS transition로 transition-property, transition-duration, transition-timing-function, transition-delay 설정 가능',
      table: {
        type: { summary: 'string | { enter: string; exit: string }' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Motion>;

const TIMING_FUNCTIONS = [
  'emphasized',
  'emphasized-accelerate',
  'emphasized-decelerate',
  'standard',
  'standard-accelerate',
  'standard-decelerate'
];

const DURATIONS = [
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
];

const getColor = (currentColor?: string): string => {
  if (!currentColor) return 'red';
  const COLORS = ['red', 'yellow', 'green', 'blue', 'purple'];
  const currentColorIdx = COLORS.findIndex((color) => color === currentColor);
  return COLORS[(currentColorIdx + 1) % COLORS.length];
};

const GrayBox = ({
  children,
  longWidth
}: {
  children: React.ReactNode;
  longWidth?: boolean;
}) => (
  <Box
    style={{
      display: 'inline-flex',
      justifyContent: longWidth ? 'start' : 'center',
      alignItems: 'center',
      padding: '10px',
      height: '150px',
      width: longWidth ? '500px' : '150px',
      backgroundColor: 'gray-100',
      borderRadius: '4px',
      boxSizing: 'border-box'
    }}
  >
    {children}
  </Box>
);

const WithResetButton = ({
  children,
  longGrayBox = false
}: {
  children: React.ReactNode;
  longGrayBox?: boolean;
}) => {
  const [key, setKey] = useState(Math.random());

  const reset = () => {
    setKey(Math.random());
  };

  return (
    <Stack spacing={10}>
      <GrayBox key={key} longWidth={longGrayBox}>
        {children}
      </GrayBox>
      <Button
        onClick={reset}
        style={{ width: 'max-content' }}
        variant="outlined"
      >
        Reset
      </Button>
    </Stack>
  );
};

const WithShowToggleButton = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <Stack spacing={10}>
      <GrayBox>
        <AnimatePresence>{show && children}</AnimatePresence>
      </GrayBox>
      <Button onClick={toggle} style={{ width: 'max-content' }}>
        {show ? 'Hide' : 'Show'}
      </Button>
    </Stack>
  );
};

const InitialStyleTemplate = () => {
  const [key, setKey] = useState(Math.random());
  const [color, setColor] = useState(getColor());

  const reset = () => {
    setKey(Math.random());
  };
  const changeColor = () => {
    setColor((prev) => getColor(prev));
  };

  return (
    <Stack spacing={10}>
      <GrayBox key={key}>
        <Motion
          initial={{ backgroundColor: 'black', borderRadius: 0 }}
          animate={{ backgroundColor: color, borderRadius: '50%' }}
          transition="background-color 1s ease, border-radius 1s ease"
          style={{ width: '100px', height: '100px' }}
        />
      </GrayBox>
      <Stack direction="row" spacing={10}>
        <Button
          onClick={reset}
          style={{ width: 'max-content' }}
          variant="outlined"
        >
          Reset
        </Button>
        <Button onClick={changeColor}>Change color</Button>
      </Stack>
    </Stack>
  );
};

const GestureAnimationsTemplate = () => {
  const ANIMATIONS = {
    mount: { opacity: 1, transform: 'scale(1)' },
    hover: { transform: 'scale(1.2)' },
    mouseDown: { transform: 'scale(0.8)' },
    mouseUp: { transform: 'scale(1.2)' }
  };
  const [status, setStatus] = useState<keyof typeof ANIMATIONS>('mount');

  return (
    <WithShowToggleButton>
      <Motion
        initial={{ opacity: 0, transform: 'scale(0)' }}
        animate={ANIMATIONS[status]}
        exit={{ opacity: 0, transform: 'scale(0)' }}
        transition="opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
        onMouseEnter={() => setStatus('hover')}
        onMouseLeave={() => setStatus('mount')}
        onMouseDown={() => setStatus('mouseDown')}
        onMouseUp={() => setStatus('mouseUp')}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'yellow',
          borderRadius: '50%'
        }}
      />
    </WithShowToggleButton>
  );
};

const TransitionTimingFunctionTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('emphasized');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <>
      <Grid rows={2} columns={3}>
        {TIMING_FUNCTIONS.map((timingFunction) => (
          <RadioLabel key={timingFunction} label={timingFunction}>
            <Radio
              value={timingFunction}
              checked={checkedValue === timingFunction}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Grid>
      <WithResetButton longGrayBox>
        <Motion
          key={checkedValue}
          animate={{ transform: 'translateX(400px)' }}
          transition={`transform 3s var(--jinni-easing-${checkedValue})`}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'yellow',
            borderRadius: '50%'
          }}
        />
      </WithResetButton>
    </>
  );
};

const TransitionDurationTemplate = () => {
  const [checkedValue, setCheckedValue] = useState('short1');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <>
      <Grid rows={4} columns={4}>
        {DURATIONS.map((duration) => (
          <RadioLabel key={duration} label={duration}>
            <Radio
              value={duration}
              checked={checkedValue === duration}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Grid>
      <WithResetButton longGrayBox>
        <Motion
          key={checkedValue}
          animate={{ transform: 'translateX(400px)' }}
          transition={`transform var(--jinni-duration-${checkedValue}) ease`}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'yellow',
            borderRadius: '50%'
          }}
        />
      </WithResetButton>
    </>
  );
};

export const EnterAnimation: Story = {
  render: () => (
    <WithResetButton>
      <Motion
        initial={{ transform: 'rotate(0deg)' }}
        animate={{ transform: 'rotate(360deg)' }}
        transition="transform 1s linear"
        style={{
          display: 'inline-flex'
        }}
      >
        <RefreshIcon size={36} />
      </Motion>
    </WithResetButton>
  )
};

export const InitialStyle: Story = {
  render: () => <InitialStyleTemplate />
};

export const ExitAnimation: Story = {
  render: () => (
    <WithShowToggleButton>
      <Motion
        initial={{ height: '0px' }}
        animate={{ height: '100px' }}
        exit={{ height: '0px' }}
        transition="height 1s ease-in"
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'yellow',
          borderRadius: '4px'
        }}
      />
    </WithShowToggleButton>
  )
};

export const GestureAnimations: Story = {
  render: () => <GestureAnimationsTemplate />
};

export const DifferentEnterExitTransition: Story = {
  render: () => (
    <WithShowToggleButton>
      <Motion
        initial={{ transform: 'scale(0)' }}
        animate={{ transform: 'scale(1)' }}
        exit={{ transform: 'scale(0)' }}
        transition={{
          enter: 'transform 0.3s ease-out',
          exit: 'transform 1.5s ease-in'
        }}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'yellow',
          borderRadius: '50%'
        }}
      />
    </WithShowToggleButton>
  )
};

export const TransformOrigin: Story = {
  render: () => (
    <WithResetButton>
      <Motion
        animate={{ transform: 'rotate(30deg)' }}
        transition="transform 1s ease"
        style={{
          transformOrigin: 'top left',
          width: '100px',
          height: '100px',
          backgroundColor: 'yellow',
          borderRadius: '4px'
        }}
      />
    </WithResetButton>
  )
};

export const TransitionTimingFunction: Story = {
  render: () => <TransitionTimingFunctionTemplate />
};

export const TransitionDuration: Story = {
  render: () => <TransitionDurationTemplate />
};
