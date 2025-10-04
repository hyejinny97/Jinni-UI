import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import CircularProgress from './CircularProgress';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { ButtonBase } from '@/components/general/ButtonBase';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  argTypes: {
    disableShrink: {
      description: 'shrink animation 비활성화',
      defaultValue: { summary: 'false' }
    },
    lineCap: {
      description: 'progress line 끝 모양',
      table: {
        type: { summary: `'round' | 'butt'` },
        defaultValue: { summary: `'round'` }
      }
    },
    progressColor: {
      description: 'progress 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    size: {
      description: 'progress 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | number` },
        defaultValue: { summary: `'md'` }
      }
    },
    speed: {
      description: '한번 회전하는데 걸리는 시간 (단위: s)',
      defaultValue: { summary: '1.5' }
    },
    thickness: {
      description: 'progress 두께',
      defaultValue: { summary: '4' }
    },
    trackColor: {
      description: 'track 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'transparent'` }
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
type Story = StoryObj<typeof CircularProgress>;

const WithLabel = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <Box style={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        size={40}
        value={value}
        aria-label="파일 업로드 진행률"
      />
      <Text
        className="typo-label-small"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
          margin: 0,
          color: 'gray-500'
        }}
      >{`${value}%`}</Text>
    </Box>
  );
};

const SaveButton = () => {
  const THICKNESS = 4;
  const [state, setState] = useState<'init' | 'saving' | 'saved'>('init');

  const handleClick = () => {
    setState('saving');
    const timeoutId = setTimeout(() => {
      setState('saved');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <ButtonBase
        onClick={handleClick}
        elevation={5}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: state === 'saved' ? 'green' : 'primary',
          borderRadius: '50%'
        }}
        aria-label="save"
      >
        {state === 'saved' ? (
          <CheckIcon color="white" />
        ) : (
          <SaveIcon color="white" />
        )}
      </ButtonBase>
      {state === 'saving' && (
        <CircularProgress
          progressColor="yellow-300"
          size={50 + THICKNESS * 3}
          thickness={THICKNESS}
          style={{
            position: 'absolute',
            top: `${-THICKNESS * 1.5}px`,
            left: `${-THICKNESS * 1.5}px`
          }}
        />
      )}
    </Box>
  );
};

export const Indeterminate: Story = {
  render: (args) => <CircularProgress {...args} />
};

export const Speed: Story = {
  render: (args) => <CircularProgress speed={3} {...args} />
};

export const DisableShrinkAnimation: Story = {
  render: (args) => <CircularProgress disableShrink {...args} />
};

export const Determinate: Story = {
  render: (args) => <CircularProgress value={70} {...args} />
};

export const CircularWithLabel: Story = {
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
    <Box style={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        size={40}
        value={value}
        aria-label="파일 업로드 진행률"
      />
      <Text
        className="typo-label-small"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
          margin: 0,
          color: 'gray-500'
        }}
      >{\`\${value}%\`}</Text>
    </Box>
  );
};
`.trim()
      }
    }
  }
};

export const ProgressColor: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress progressColor="secondary" {...args} />
        <CircularProgress progressColor="yellow-400" {...args} />
        <CircularProgress progressColor="green" {...args} />
        <CircularProgress progressColor="#123" {...args} />
        <CircularProgress progressColor="rgb(100, 200, 200)" {...args} />
      </Stack>
    );
  }
};

export const TrackColor: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress trackColor="gray-200" {...args} />
        <CircularProgress
          progressColor="yellow-400"
          trackColor="yellow-200"
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
  render: (args) => <CircularProgress thickness={6} {...args} />
};

export const LineCap: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <CircularProgress value={70} thickness={8} lineCap="round" {...args} />
        <CircularProgress value={70} thickness={8} lineCap="butt" {...args} />
      </Stack>
    );
  }
};

export const Customization: Story = {
  render: () => <SaveButton />,
  parameters: {
    docs: {
      source: {
        code: `const SaveButton = () => {
  const THICKNESS = 4;
  const [state, setState] = useState<'init' | 'saving' | 'saved'>('init');

  const handleClick = () => {
    setState('saving');
    const timeoutId = setTimeout(() => {
      setState('saved');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <ButtonBase
        onClick={handleClick}
        elevation={5}
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: state === 'saved' ? 'green' : 'primary',
          borderRadius: '50%'
        }}
        aria-label="save"
      >
        {state === 'saved' ? (
          <CheckIcon color="white" />
        ) : (
          <SaveIcon color="white" />
        )}
      </ButtonBase>
      {state === 'saving' && (
        <CircularProgress
          progressColor="yellow-300"
          size={50 + THICKNESS * 3}
          thickness={THICKNESS}
          style={{
            position: 'absolute',
            top: \`\${-THICKNESS * 1.5}px\`,
            left: \`\${-THICKNESS * 1.5}px\`
          }}
        />
      )}
    </Box>
  );
};
`.trim()
      }
    }
  }
};
