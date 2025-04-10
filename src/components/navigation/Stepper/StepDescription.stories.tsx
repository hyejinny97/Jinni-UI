import type { Meta, StoryObj } from '@storybook/react';
import { StepDescription } from '@/components/navigation/Stepper';

const meta: Meta<typeof StepDescription> = {
  component: StepDescription,
  argTypes: {
    children: {
      description: 'step description',
      table: {
        type: { summary: `node` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof StepDescription>;

export const BasicStepDescription: Story = {};
