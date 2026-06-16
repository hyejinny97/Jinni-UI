import type { Meta, StoryObj } from '@storybook/react';
import StepTitle from './StepTitle';
import StoryErrorBoundary from '@/components/StoryErrorBoundary';

const meta: Meta<typeof StepTitle> = {
  title: 'components/Stepper/StepTitle',
  component: StepTitle,
  argTypes: {
    children: {
      description: 'step title',
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
type Story = StoryObj<typeof StepTitle>;

export const BasicStepTitle: Story = {};
