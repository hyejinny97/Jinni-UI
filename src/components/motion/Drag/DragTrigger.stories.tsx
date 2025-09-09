import type { Meta, StoryObj } from '@storybook/react';
import { DragTrigger } from '.';

const meta: Meta<typeof DragTrigger> = {
  component: DragTrigger,
  argTypes: {
    children: {
      description: 'drag 이벤트를 유발하는 대상',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DragTrigger>;

export const Basic: Story = {};
