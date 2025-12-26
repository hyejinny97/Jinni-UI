import type { Meta, StoryObj } from '@storybook/react';
import Step from './Step';

const meta: Meta<typeof Step> = {
  component: Step,
  argTypes: {
    children: {
      description: 'StepDot, StepContent, StepConnector 컴포넌트',
      table: {
        type: { summary: `node` }
      }
    },
    status: {
      description: 'step 상태',
      table: {
        type: { summary: `'completed' | 'active' | 'pending'` },
        defaultValue: { summary: `'pending'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Step>;

export const BasicStep: Story = {};
