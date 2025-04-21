import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import LinearProgress from './LinearProgress';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof LinearProgress> = {
  component: LinearProgress,
  argTypes: {
    labelFormat: {
      description: 'progress label 커스텀 함수',
      defaultValue: { summary: '(percent: number) ⇒ ${percent}%' }
    },
    lineCap: {
      description: 'progress line 끝 모양',
      table: {
        type: { summary: 'round | butt' },
        defaultValue: { summary: 'round' }
      }
    },
    orientation: {
      description: 'linear progress 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical' ` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    percent: {
      description: '처리 정도'
    },
    progressColor: {
      description: 'progress 색상',
      defaultValue: { summary: 'primary' }
    },
    showLabel: {
      description: 'progress label(percent)을 나타냄',
      defaultValue: { summary: 'false' }
    },
    speed: {
      description: '한번 회전하는데 걸리는 시간',
      defaultValue: { summary: '2s' }
    },
    thickness: {
      description: 'progress 두께',
      table: {
        type: { summary: 'sm | md | lg | number' },
        defaultValue: { summary: 'md' }
      }
    },
    trailColor: {
      description: '바탕 색상',
      defaultValue: { summary: 'lighten(processColor)' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

const PercentChange = ({ ...args }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercent((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <Stack spacing={20} style={{ width: '500px' }}>
      <LinearProgress percent={75} showLabel {...args} />
      <LinearProgress percent={percent} showLabel {...args} />
    </Stack>
  );
};

export const Indeterminate: Story = {
  render: (args) => (
    <Stack style={{ width: '500px' }}>
      <LinearProgress {...args} />
    </Stack>
  )
};

export const Determinate: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress percent={50} {...args} />
        <LinearProgress percent={70} {...args} />
      </Stack>
    );
  }
};

export const Orientation: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20} style={{ height: '400px' }}>
        <LinearProgress orientation="vertical" {...args} />
        <LinearProgress orientation="vertical" percent={70} {...args} />
      </Stack>
    );
  }
};

export const ProgressColor: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress progressColor="secondary" {...args} />
        <LinearProgress progressColor="tertiary" {...args} />
        <LinearProgress progressColor="yellow-400" {...args} />
        <LinearProgress progressColor="green" {...args} />
        <LinearProgress progressColor="#123" {...args} />
        <LinearProgress progressColor="rgb(100, 200, 200)" {...args} />
      </Stack>
    );
  }
};

export const TrailColor: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress trailColor="gray-200" {...args} />
        <LinearProgress
          progressColor="yellow-400"
          trailColor="yellow-100"
          {...args}
        />
      </Stack>
    );
  }
};

export const Thickness: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress thickness="sm" {...args} />
        <LinearProgress thickness="md" {...args} />
        <LinearProgress thickness="lg" {...args} />
        <LinearProgress thickness={10} {...args} />
      </Stack>
    );
  }
};

export const LineCap: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress lineCap="round" {...args} />
        <LinearProgress lineCap="butt" {...args} />
      </Stack>
    );
  }
};

export const Speed: Story = {
  render: (args) => {
    return (
      <Stack style={{ width: '500px' }}>
        <LinearProgress speed={1} {...args} />
      </Stack>
    );
  }
};

export const ShowLabel: Story = {
  render: (args) => <PercentChange {...args} />
};

export const LabelFormat: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress
          percent={100}
          showLabel
          labelFormat={(percent) => (percent === 100 ? 'Done' : `${percent}%`)}
          {...args}
        />
        <LinearProgress
          percent={75}
          showLabel
          labelFormat={(percent) => `${percent} Days`}
          style={{ fontSize: '10px', color: 'gray-400' }}
          {...args}
        />
      </Stack>
    );
  }
};
