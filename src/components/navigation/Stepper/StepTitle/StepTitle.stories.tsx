import type { Meta, StoryObj } from '@storybook/react';
import StepTitle from './StepTitle';

const meta: Meta<typeof StepTitle> = {
  component: StepTitle,
  argTypes: {
    children: {
      description: 'step title',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof StepTitle>;

export const BasicStepTitle: Story = {};
