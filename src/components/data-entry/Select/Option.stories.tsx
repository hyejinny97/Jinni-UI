import type { Meta, StoryObj } from '@storybook/react';
import Option from './Option';

const meta: Meta<typeof Option> = {
  component: Option,
  argTypes: {
    children: {
      description: 'option content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    value: {
      description: 'option의 value',
      table: {
        type: { summary: `string` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Option>;

export const BasicOption: Story = {};
