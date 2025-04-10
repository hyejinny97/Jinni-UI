import type { Meta, StoryObj } from '@storybook/react';
import { StepConnector } from '@/components/navigation/Stepper';

const meta: Meta<typeof StepConnector> = {
  component: StepConnector,
  argTypes: {
    color: {
      description: 'completed 상태일 때, connector 색상',
      table: {
        type: { summary: `ColorType` },
        defaultValue: { summary: `'gray-400'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof StepConnector>;

export const BasicStepConnector: Story = {};
