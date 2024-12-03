import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import CircularProgress, { CircularProgressProps } from './CircularProgress';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Indeterminate: Story = {
  render: (args) => <CircularProgress {...args} />
};

export const Determinate: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress percent={50} {...args} />
        <CircularProgress percent={70} {...args} />
      </Stack>
    );
  }
};

export const ProgressColor: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress progressColor="secondary" {...args} />
        <CircularProgress progressColor="tertiary" {...args} />
        <CircularProgress progressColor="yellow-400" {...args} />
        <CircularProgress progressColor="green" {...args} />
        <CircularProgress progressColor="#123" {...args} />
        <CircularProgress progressColor="rgb(100, 200, 200)" {...args} />
      </Stack>
    );
  }
};

export const TrailColor: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress trailColor="gray-200" {...args} />
        <CircularProgress
          progressColor="yellow-400"
          trailColor="yellow-200"
          {...args}
        />
      </Stack>
    );
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress size="sm" {...args} />
        <CircularProgress size="md" {...args} />
        <CircularProgress size="lg" {...args} />
        <CircularProgress size={100} {...args} />
      </Stack>
    );
  }
};

export const Thickness: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress {...args} />
        <CircularProgress thickness={6} {...args} />
      </Stack>
    );
  }
};

export const LineCap: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress
          percent={70}
          thickness={8}
          lineCap="round"
          {...args}
        />
        <CircularProgress percent={70} thickness={8} lineCap="butt" {...args} />
      </Stack>
    );
  }
};

export const Speed: Story = {
  render: (args) => {
    return <CircularProgress speed={3} {...args} />;
  }
};

export const DisableShrinkAnimation: Story = {
  render: (args) => {
    return <CircularProgress disableShrink {...args} />;
  }
};

const PercentChange = (args: CircularProgressProps) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercent((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <Stack direction="row" spacing={20}>
      <CircularProgress size={40} percent={75} showLabel {...args} />
      <CircularProgress size={40} percent={percent} showLabel {...args} />
    </Stack>
  );
};

export const ShowLabel: Story = {
  render: PercentChange
};

export const LabelFormat: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress
          size={40}
          percent={100}
          showLabel
          labelFormat={(percent) => (percent === 100 ? 'Done' : `${percent}%`)}
          {...args}
        />
        <CircularProgress
          size={60}
          percent={75}
          showLabel
          labelFormat={(percent) => `${percent} Days`}
          style={{ fontSize: '10px', color: 'gray-400', whiteSpace: 'nowrap' }}
          {...args}
        />
      </Stack>
    );
  }
};
