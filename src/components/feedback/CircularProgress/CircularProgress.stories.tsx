import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import CircularProgress, { CircularProgressProps } from './CircularProgress';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  argTypes: {
    disableShrink: {
      description: 'shrink animation 비활성화',
      defaultValue: { summary: 'false' }
    },
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
    size: {
      description: 'progress 크기',
      table: {
        type: { summary: 'sm | md | lg | number' },
        defaultValue: { summary: 'md' }
      }
    },
    speed: {
      description: '한번 회전하는데 걸리는 시간',
      defaultValue: { summary: '1.5s' }
    },
    thickness: {
      description: 'progress 두께',
      defaultValue: { summary: '4px' }
    },
    trailColor: {
      description: 'progress 이외의 색상',
      defaultValue: { summary: 'transparent' }
    }
  }
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
