import type { Meta, StoryObj } from '@storybook/react';
import TableRow from './TableRow';
import { TableCell } from '../TableCell';

const meta: Meta<typeof TableRow> = {
  component: TableRow,
  argTypes: {
    children: {
      description: 'TableCell 컴포넌트들',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    hover: {
      description: 'true이면, hover effect가 활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    selected: {
      description: 'true이면 selected styling 됨',
      table: {
        type: { summary: `boolean` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TableRow>;

export const BasicTableRow: Story = {
  render: (args) => (
    <TableRow {...args}>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>
  )
};

export const HoverEffect: Story = {
  render: (args) => (
    <TableRow hover {...args}>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>
  )
};

export const Selected: Story = {
  render: (args) => (
    <TableRow selected {...args}>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>
  )
};
