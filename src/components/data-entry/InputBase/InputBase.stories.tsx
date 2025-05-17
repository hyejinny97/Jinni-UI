import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputBase from './InputBase';
import { Stack } from '@/components/layout/Stack';
import { Fraction } from '@/components/data-display/Fraction';

const meta: Meta<typeof InputBase> = {
  component: InputBase,
  argTypes: {
    color: {
      description: 'focus 됐을 때, input border 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultValue: {
      description: '초기 input value',
      table: {
        type: { summary: 'string | number' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disableFocusEffect: {
      description: 'true이면, focus effect가 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disableHoverEffect: {
      description: 'true이면, hover effect가 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    endAdornment: {
      description: 'input 뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    fullWidth: {
      description: 'true이면, input이 container 안에 꽉 채워지게 됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void'
        }
      }
    },
    size: {
      description: 'input 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    startAdornment: {
      description: 'input 앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    value: {
      description: 'input value',
      table: {
        type: { summary: 'string | number' }
      }
    },
    variant: {
      description: 'input 형태',
      table: {
        type: {
          summary: `'filled' | 'outlined' | 'underlined' | 'borderless'`
        },
        defaultValue: { summary: `'outlined'` }
      }
    }
  }
};

const ControlledInputBaseTemplate = () => {
  const [value, setValue] = useState('');
  const MAX_COUNT = 20;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.length > MAX_COUNT) return;
    setValue(newValue);
  };

  return (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      <InputBase value={value} onChange={handleChange} />
      <Fraction value={value.length} count={MAX_COUNT} />
    </Stack>
  );
};

export default meta;
type Story = StoryObj<typeof InputBase>;

export const BasicInputBase: Story = {
  render: (args) => {
    return <InputBase defaultValue="Text" {...args} />;
  }
};

export const ControlledInputBase: Story = {
  render: (args) => <ControlledInputBaseTemplate {...args} />
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="outlined" {...args} />
        <InputBase variant="filled" {...args} />
        <InputBase variant="underlined" {...args} />
        <InputBase variant="borderless" {...args} />
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase size="sm" {...args} />
        <InputBase size="md" {...args} />
        <InputBase size="lg" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="outlined" disabled {...args} />
        <InputBase variant="filled" disabled {...args} />
        <InputBase variant="underlined" disabled {...args} />
        <InputBase variant="borderless" disabled {...args} />
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase color="error" {...args} />
        <InputBase color="yellow-400" {...args} />
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => <InputBase fullWidth {...args} />
};

export const Adornments: Story = {
  render: (args) => {
    return <InputBase startAdornment="start" endAdornment="end" {...args} />;
  }
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="filled" disableHoverEffect {...args} />
        <InputBase variant="filled" disableFocusEffect {...args} />
      </Stack>
    );
  }
};
