import type { Meta, StoryObj } from '@storybook/react';
import { StepContent } from '@/components/navigation/Stepper';

const meta: Meta<typeof StepContent> = {
  component: StepContent,
  argTypes: {
    children: {
      description: 'StepTitle, StepDescription 컴포넌트',
      table: {
        type: { summary: `node` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof StepContent>;

export const BasicStepContent: Story = {};
