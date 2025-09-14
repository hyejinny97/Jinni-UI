import type { Meta, StoryObj } from '@storybook/react';
import { ReorderItem } from '.';

const meta: Meta<typeof ReorderItem> = {
  component: ReorderItem,
  argTypes: {
    children: {
      description: '아이템 콘텐츠',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    value: {
      description: '아이템을 특정할 수 있는 유니크한 값',
      table: {
        type: { summary: 'string | number' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ReorderItem>;

export const Basic: Story = {};
