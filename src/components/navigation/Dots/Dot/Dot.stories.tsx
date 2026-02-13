import type { Meta, StoryObj } from '@storybook/react';
import Dot from './Dot';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof Dot> = {
  component: Dot,
  argTypes: {
    children: {
      description: 'dot 내 콘텐츠',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'selected dot의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    size: {
      description: 'dot의 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: {
          summary: `'md'`
        }
      }
    },
    value: {
      description: '다른 dot과 구별되는 유일한 값',
      table: {
        type: { summary: 'number | string' }
      }
    }
  },
  decorators: [
    (Story) => (
      <StoryErrorBoundary>
        <Story />
      </StoryErrorBoundary>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const BasicDot: Story = {};
