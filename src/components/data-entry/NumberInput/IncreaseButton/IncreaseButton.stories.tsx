import type { Meta, StoryObj } from '@storybook/react';
import IncreaseButton from './IncreaseButton';

const meta: Meta<typeof IncreaseButton> = {
  component: IncreaseButton,
  argTypes: {
    children: {
      description: '버튼 내부 내용',
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `<ArrowUpIcon color='gray-600' />` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof IncreaseButton>;

export const Basic: Story = {};
