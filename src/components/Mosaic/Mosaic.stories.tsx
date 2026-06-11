import type { Meta, StoryObj } from '@storybook/react';
import Mosaic from './Mosaic';
import { Box, BoxProps } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Mosaic> = {
  component: Mosaic,
  argTypes: {
    children: {
      description: '모자이크 영역 하위 콘텐츠',
      table: { type: { summary: 'React.ReactNode' } }
    },
    color: {
      description: '모자이크 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'surface-container-highest'` }
      }
    },
    size: {
      description: '모자이크 크기',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Mosaic>;

const Square = (props: BoxProps) => {
  const { style, ...rest } = props;
  return (
    <Box
      className="typo-title-medium"
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100px',
        fontWeight: 'semi-bold',
        textShadow:
          '1px 1px rgba(255, 255, 255, 1), -1px -1px rgba(255, 255, 255, 1)',
        ...style
      }}
      {...rest}
    />
  );
};

export const BasicMosaic: Story = {
  render: (args) => (
    <Mosaic {...args}>
      <Square />
    </Mosaic>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Mosaic key={size} size={size} {...args}>
          <Square>{size}</Square>
        </Mosaic>
      ))}
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      {(['primary', 'yellow-400', 'rgba(0,100,0,0.5)'] as const).map(
        (color) => (
          <Mosaic key={color} mosaicColor={color} {...args}>
            <Square>{color}</Square>
          </Mosaic>
        )
      )}
    </Stack>
  )
};
