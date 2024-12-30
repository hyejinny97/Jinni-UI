import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  argTypes: {
    animation: {
      description: '애니메이션 타입',
      table: {
        type: { summary: 'pulse | wave | none' },
        defaultValue: { summary: 'pulse' }
      }
    },
    height: {
      description: 'Skeleton의 높이',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '1em' }
      }
    },
    variant: {
      description: 'Skeleton의 모양(border-radius 결정)',
      table: {
        type: { summary: 'rectangular | rounded | circular' },
        defaultValue: { summary: 'rounded' }
      }
    },
    width: {
      description: 'Skeleton의 너비',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '100%' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const ColumnStack = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack spacing={10} style={{ minWidth: '500px' }}>
      {children}
    </Stack>
  );
};

export const BasicSkeleton: Story = {
  render: (args) => (
    <ColumnStack>
      <Skeleton {...args} />
      <Skeleton width="50%" height={10} {...args} />
    </ColumnStack>
  )
};

export const Variants: Story = {
  render: (args) => (
    <ColumnStack>
      <Skeleton variant="rectangular" {...args} />
      <Skeleton variant="rounded" {...args} />
      <Skeleton variant="circular" width={50} height={50} {...args} />
    </ColumnStack>
  )
};

export const Color: Story = {
  render: (args) => (
    <ColumnStack>
      <Skeleton style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }} {...args} />
    </ColumnStack>
  )
};

export const Animations: Story = {
  render: (args) => (
    <ColumnStack>
      <Skeleton animation="pulse" {...args} />
      <Skeleton animation="wave" {...args} />
      <Skeleton animation="none" {...args} />
    </ColumnStack>
  )
};
