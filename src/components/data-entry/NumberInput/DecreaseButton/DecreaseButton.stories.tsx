import type { Meta, StoryObj } from '@storybook/react';
import DecreaseButton from './DecreaseButton';

const meta: Meta<typeof DecreaseButton> = {
  component: DecreaseButton,
  argTypes: {
    children: {
      description: '버튼 내부 내용',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `<ArrowDownIcon color='gray-600' />` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DecreaseButton>;

export const Basic: Story = {};
