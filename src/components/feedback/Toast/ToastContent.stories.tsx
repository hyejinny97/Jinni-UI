import type { Meta, StoryObj } from '@storybook/react';
import ToastContent from './ToastContent';

const meta: Meta<typeof ToastContent> = {
  component: ToastContent,
  argTypes: {
    action: {
      description: 'toast의 action'
    },
    message: {
      description: 'toast 메시지'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToastContent>;

export const BasicToastContent: Story = {
  render: () => <ToastContent message="Toast Content" />
};
