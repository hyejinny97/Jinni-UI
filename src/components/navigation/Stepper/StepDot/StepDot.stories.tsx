import type { Meta, StoryObj } from '@storybook/react';
import StepDot from './StepDot';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof StepDot> = {
  component: StepDot,
  argTypes: {
    children: {
      description: 'dot 내부 내용',
      table: {
        type: { summary: `node` }
      }
    },
    color: {
      description: 'completed or active 상태일 때, dot 색상',
      table: {
        type: { summary: `ColorType` },
        defaultValue: { summary: `'primary'` }
      }
    },
    variant: {
      description: 'dot 종류',
      table: {
        type: {
          summary: `{ completed: 'filled' | 'subtle-filled' | 'outlined' | 'text', active: 'filled' | 'subtle-filled' | 'outlined' | 'text', pending: 'filled' | 'subtle-filled' | 'outlined' | 'text' }`
        },
        defaultValue: {
          summary: `{ completed: 'filled', active: 'filled', pending: 'filled' }`
        }
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
type Story = StoryObj<typeof StepDot>;

export const BasicStepDot: Story = {};
