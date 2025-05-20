import type { Meta, StoryObj } from '@storybook/react';
import InputBase from './InputBase';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof InputBase> = {
  component: InputBase,
  argTypes: {
    children: {
      description: 'input content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'focus 됐을 때, input border 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
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

export default meta;
type Story = StoryObj<typeof InputBase>;

export const BasicInputBase: Story = {
  render: (args) => {
    return <InputBase {...args} />;
  }
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="outlined" {...args}>
          Outlined
        </InputBase>
        <InputBase variant="filled" {...args}>
          Filled
        </InputBase>
        <InputBase variant="underlined" {...args}>
          Underlined
        </InputBase>
        <InputBase variant="borderless" {...args}>
          Borderless
        </InputBase>
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase size="sm" {...args}>
          sm
        </InputBase>
        <InputBase size="md" {...args}>
          md
        </InputBase>
        <InputBase size="lg" {...args}>
          lg
        </InputBase>
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="outlined" disabled {...args}>
          Outlined
        </InputBase>
        <InputBase variant="filled" disabled {...args}>
          Filled
        </InputBase>
        <InputBase variant="underlined" disabled {...args}>
          Underlined
        </InputBase>
        <InputBase variant="borderless" disabled {...args}>
          Borderless
        </InputBase>
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase color="error" {...args}>
          Error
        </InputBase>
        <InputBase color="yellow-400" {...args}>
          Yellow-400
        </InputBase>
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => (
    <InputBase fullWidth {...args}>
      Full Width
    </InputBase>
  )
};

export const Adornments: Story = {
  render: (args) => {
    return (
      <InputBase startAdornment="start" endAdornment="end" {...args}>
        content
      </InputBase>
    );
  }
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="filled" disableHoverEffect {...args}>
          Disable Hover Effect
        </InputBase>
        <InputBase variant="filled" disableFocusEffect {...args}>
          Disable Focus Effect
        </InputBase>
      </Stack>
    );
  }
};
