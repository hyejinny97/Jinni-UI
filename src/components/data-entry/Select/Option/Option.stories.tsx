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
      description: '다른 options와 구별되는 식별자',
      table: {
        type: { summary: `string | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Option>;

export const BasicOption: Story = {};
