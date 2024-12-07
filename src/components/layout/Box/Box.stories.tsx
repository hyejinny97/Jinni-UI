import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';
import { Stack } from '@/components/layout/Stack';
import { StyleType } from '@/types/style';

const meta: Meta<typeof Box> = {
  component: Box,
  argTypes: {
    children: {
      description: 'Box 내 content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    elevation: {
      description: '계층(높낮이)',
      table: {
        type: { summary: 'ElevationType' },
        defaultValue: { summary: '0' }
      }
    },
    outlined: {
      description: 'border 존재 여부',
      defaultValue: { summary: 'false' }
    },
    round: {
      description: 'border-radius 값',
      table: {
        type: { summary: 'sm | md | lg | number' },
        defaultValue: { summary: '0' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Box>;

const defaultStyle: StyleType = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px'
};

export const BasicBox: Story = {
  render: (args) => <Box {...args}>content</Box>
};

export const Customization: Story = {
  render: (args) => (
    <Box
      style={{
        ...defaultStyle,
        backgroundColor: 'gray-100',
        color: 'gray-500'
      }}
      {...args}
    >
      content
    </Box>
  )
};

export const Elevation: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <Box elevation={5} style={defaultStyle} {...args}>
        content
      </Box>
      <Box elevation={20} style={defaultStyle} {...args}>
        content
      </Box>
    </Stack>
  )
};

export const Outlined: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <Box outlined style={defaultStyle} {...args}>
        content
      </Box>
      <Box
        outlined
        style={{ ...defaultStyle, borderColor: 'primary' }}
        {...args}
      >
        content
      </Box>
      <Box
        outlined
        style={{ ...defaultStyle, borderStyle: 'dashed' }}
        {...args}
      >
        content
      </Box>
    </Stack>
  )
};

export const Round: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <Box outlined round="sm" style={defaultStyle} {...args}>
        content
      </Box>
      <Box outlined round="md" style={defaultStyle} {...args}>
        content
      </Box>
      <Box outlined round="lg" style={defaultStyle} {...args}>
        content
      </Box>
      <Box outlined round={30} style={defaultStyle} {...args}>
        content
      </Box>
    </Stack>
  )
};
