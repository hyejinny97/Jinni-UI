import type { Meta, StoryObj } from '@storybook/react';
import TabNextButton from './TabNextButton';

const meta: Meta<typeof TabNextButton> = {
  component: TabNextButton,
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
type Story = StoryObj<typeof TabNextButton>;

export const Basic: Story = {};
