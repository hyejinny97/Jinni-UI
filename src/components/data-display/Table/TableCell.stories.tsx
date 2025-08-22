import type { Meta, StoryObj } from '@storybook/react';
import TableCell from './TableCell';

const meta: Meta<typeof TableCell> = {
  component: TableCell,
  argTypes: {
    align: {
      description: 'cell 내 text alignment',
      table: {
        type: { summary: `'left' | 'center' | 'right'` },
        defaultValue: { summary: `'left'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TableCell>;

export const BasicTableCell: Story = {};
