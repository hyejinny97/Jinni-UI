import type { Meta, StoryObj } from '@storybook/react';
import StepDot from './StepDot';

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
          summary: `{ completed: VariantType, active: VariantType, pending: VariantType }`
        },
        defaultValue: {
          summary: `{ completed: 'filled', active: 'filled', pending: 'filled' }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof StepDot>;

export const BasicStepDot: Story = {};
