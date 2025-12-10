import type { Meta, StoryObj } from '@storybook/react';
import TabPrevButton from './TabPrevButton';

const meta: Meta<typeof TabPrevButton> = {
  component: TabPrevButton,
  argTypes: {
    children: {
      description: 'tab prev button content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TabPrevButton>;

export const Basic: Story = {};
