import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import LinearProgress from './LinearProgress';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Fraction } from '@/components/data-display/Fraction';
import { Button } from '@/components/general/Button';
import { ButtonGroup } from '@/components/general/ButtonGroup';

const meta: Meta<typeof LinearProgress> = {
  component: LinearProgress,
  argTypes: {
    lineCap: {
      description: 'progress/track line 끝 모양',
      table: {
        type: { summary: `'round' | 'butt'` },
        defaultValue: { summary: `'butt'` }
      }
    },
    orientation: {
      description: 'LinearProgress 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    progressColor: {
      description: 'progress 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    speed: {
      description: '한번 이동하는데 걸리는 시간 (단위: s)',
      defaultValue: { summary: '1.5' }
    },
    thickness: {
      description: 'progress 두께',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' }
      }
    },
    trackColor: {
      description: 'track 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'gray-200'` }
      }
    },
    value: {
      description: '처리 정도',
      table: {
        type: { summary: 'number (0~100)' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

const WithLabel = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <Stack direction="row" spacing={20} style={{ alignItems: 'center' }}>
      <Box style={{ width: '500px' }}>
        <LinearProgress value={value} aria-label="파일 업로드 진행률" />
      </Box>
      <Text
        className="typo-label-small"
        style={{
          margin: 0,
          width: '50px',
          color: 'gray-500'
        }}
      >{`${value}%`}</Text>
    </Stack>
  );
};

const StepProgress = () => {
  const STEPS = 5;
  const INIT_STEP = 0;
  const [currentStep, setCurrentStep] = useState(INIT_STEP);

  return (
    <Stack direction="row" spacing={30}>
      <ButtonGroup variant="outlined">
        <Button
          aria-label="reduce"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === INIT_STEP}
        >
          -
        </Button>
        <Button
          aria-label="increase"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === STEPS}
        >
          +
        </Button>
      </ButtonGroup>
      <Stack direction="row" spacing={20} style={{ alignItems: 'center' }}>
        <Stack
          direction="row"
          spacing={3}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={STEPS}
          aria-valuenow={currentStep}
        >
          {Array(STEPS)
            .fill(0)
            .map((_, idx) => {
              const step = idx + 1;
              return (
                <LinearProgress
                  key={step}
                  value={currentStep >= step ? 100 : 0}
                  style={{ width: '50px' }}
                  role="none"
                />
              );
            })}
        </Stack>
        <Fraction count={STEPS} value={currentStep} />
      </Stack>
    </Stack>
  );
};

export const Indeterminate: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <LinearProgress {...args} />
    </Box>
  )
};

export const Speed: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <LinearProgress speed={3} {...args} />
    </Box>
  )
};

export const Determinate: Story = {
  render: (args) => {
    return (
      <Box style={{ width: '500px' }}>
        <LinearProgress value={70} {...args} />
      </Box>
    );
  }
};

export const LinearWithLabel: Story = {
  render: () => <WithLabel />,
  parameters: {
    docs: {
      source: {
        code: `const WithLabel = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <Stack direction="row" spacing={20} style={{ alignItems: 'center' }}>
      <Box style={{ width: '500px' }}>
        <LinearProgress value={value} aria-label="파일 업로드 진행률" />
      </Box>
      <Text
        className="typo-label-small"
        style={{
          margin: 0,
          width: '50px',
          color: 'gray-500'
        }}
      >{\`\${value}%\`}</Text>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Orientation: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20} style={{ height: '400px' }}>
        <LinearProgress orientation="vertical" {...args} />
        <LinearProgress orientation="vertical" value={70} {...args} />
      </Stack>
    );
  }
};

export const ProgressColor: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress progressColor="secondary" {...args} />
        <LinearProgress progressColor="yellow-400" {...args} />
        <LinearProgress progressColor="green" {...args} />
        <LinearProgress progressColor="#123" {...args} />
        <LinearProgress progressColor="rgb(100, 200, 200)" {...args} />
      </Stack>
    );
  }
};

export const TrackColor: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress trackColor="transparent" {...args} />
        <LinearProgress
          progressColor="yellow-400"
          trackColor="yellow-100"
          {...args}
        />
      </Stack>
    );
  }
};

export const Thickness: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <LinearProgress thickness={6} {...args} />
    </Box>
  )
};

export const LineCap: Story = {
  render: (args) => {
    return (
      <Stack spacing={20} style={{ width: '500px' }}>
        <LinearProgress lineCap="round" thickness={6} {...args} />
        <LinearProgress lineCap="butt" thickness={6} {...args} />
      </Stack>
    );
  }
};

export const Customization: Story = {
  render: () => <StepProgress />,
  parameters: {
    docs: {
      source: {
        code: `const StepProgress = () => {
  const STEPS = 5;
  const INIT_STEP = 0;
  const [currentStep, setCurrentStep] = useState(INIT_STEP);

  return (
    <Stack direction="row" spacing={30}>
      <ButtonGroup variant="outlined">
        <Button
          aria-label="reduce"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === INIT_STEP}
        >
          -
        </Button>
        <Button
          aria-label="increase"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === STEPS}
        >
          +
        </Button>
      </ButtonGroup>
      <Stack direction="row" spacing={20} style={{ alignItems: 'center' }}>
        <Stack
          direction="row"
          spacing={3}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={STEPS}
          aria-valuenow={currentStep}
        >
          {Array(STEPS)
            .fill(0)
            .map((_, idx) => {
              const step = idx + 1;
              return (
                <LinearProgress
                  key={step}
                  value={currentStep >= step ? 100 : 0}
                  style={{ width: '50px' }}
                  role="none"
                />
              );
            })}
        </Stack>
        <Fraction count={STEPS} value={currentStep} />
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
