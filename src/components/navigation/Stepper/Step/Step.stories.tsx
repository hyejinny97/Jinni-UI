import type { Meta, StoryObj } from '@storybook/react';
import Step from './Step';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof Step> = {
  component: Step,
  argTypes: {
    children: {
      description: 'StepDot, StepTitle, StepDescription 컴포넌트',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    status: {
      description: 'step 상태',
      table: {
        type: { summary: `'completed' | 'active' | 'pending'` },
        defaultValue: { summary: `'pending'` }
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
type Story = StoryObj<typeof Step>;

export const BasicStep: Story = {};
