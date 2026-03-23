import type { Meta, StoryObj } from '@storybook/react';
import StepDescription from './StepDescription';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof StepDescription> = {
  component: StepDescription,
  argTypes: {
    children: {
      description: 'step description',
      table: {
        type: { summary: `React.ReactNode` }
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
type Story = StoryObj<typeof StepDescription>;

export const BasicStepDescription: Story = {};
