import type { Meta, StoryObj } from '@storybook/react';
import InputBase from './InputBase';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';

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
      description: 'base color',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'gray-400'` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    disableFocusEffect: {
      description: 'true이면, focus effect가 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    disableHoverEffect: {
      description: 'true이면, hover effect가 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    endAdornment: {
      description: 'input 뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    focused: {
      description:
        '(disableFocusEffect=false인 경우) true이면, focused style이 생성됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    focusedColor: {
      description: 'focused color',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    fullWidth: {
      description: 'true이면, input이 container 안에 꽉 채워지게 됨',
      table: {
        type: { summary: 'boolean' }
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
  render: (args) => (
    <Stack spacing={20}>
      <InputBase {...args} />
      <InputBase {...args}>Base</InputBase>
    </Stack>
  )
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

export const Focus: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <InputBase variant="outlined" focused {...args}>
          Outlined
        </InputBase>
        <InputBase variant="filled" focused {...args}>
          Filled
        </InputBase>
        <InputBase variant="underlined" focused {...args}>
          Underlined
        </InputBase>
        <InputBase variant="borderless" focused {...args}>
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
        <InputBase color="error" focusedColor="error" {...args}>
          <input value="Error" />
        </InputBase>
        <InputBase color="yellow-400" focusedColor="yellow-400" {...args}>
          <input value="Yellow-400" />
        </InputBase>
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <InputBase fullWidth {...args}>
        Full Width
      </InputBase>
    </Box>
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
          <input value="Disable Hover Effect" />
        </InputBase>
        <InputBase variant="filled" disableFocusEffect {...args}>
          <input value="Disable Focus Effect" />
        </InputBase>
      </Stack>
    );
  }
};
