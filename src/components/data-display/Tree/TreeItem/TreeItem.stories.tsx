import type { Meta, StoryObj } from '@storybook/react';
import TreeItem from './TreeItem';

const meta: Meta<typeof TreeItem> = {
  component: TreeItem,
  argTypes: {
    children: {
      description: '하위 tree items',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    itemId: {
      description: 'item의 고유한 id',
      table: {
        type: { summary: `number | string` }
      }
    },
    label: {
      description: 'item label',
      table: {
        type: { summary: `number | string` }
      }
    },
    disabled: {
      description: 'true이면, 해당 item은 비활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Text>;

export const BasicTreeItem: Story = {};
