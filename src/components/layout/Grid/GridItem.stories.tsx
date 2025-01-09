import type { Meta, StoryObj } from '@storybook/react';
import GridItem from './GridItem';

const meta: Meta<typeof GridItem> = {
  component: GridItem,
  argTypes: {
    children: {
      description: 'grid item 콘텐츠'
    },
    columnEnd: {
      description: 'grid item의 column 끝 라인',
      table: {
        type: { summary: `number | Responsive<number>` }
      }
    },
    columnSpan: {
      description: 'grid container 내에서 grid item이 차지하는 columns 수',
      table: {
        type: {
          summary: `number | 'auto' | 'full' | Responsive<number | 'auto' | 'full'>`
        },
        defaultValue: { summary: `'auto'` }
      }
    },
    columnStart: {
      description: 'grid item의 column 시작 라인',
      table: {
        type: { summary: `number | Responsive<number>` }
      }
    },
    rowEnd: {
      description: 'grid item의 row 끝 라인',
      table: {
        type: { summary: `number | Responsive<number>` }
      }
    },
    rowSpan: {
      description: 'grid container 내에서 grid item이 차지하는 rows 수',
      table: {
        type: {
          summary: `number | 'auto' | 'full' | Responsive<number | 'auto' | 'full'>`
        },
        defaultValue: { summary: `'auto'` }
      }
    },
    rowStart: {
      description: 'grid item의 row 시작 라인',
      table: {
        type: { summary: `number | Responsive<number>` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof GridItem>;

export const BasicGridItem: Story = {
  render: (args) => <GridItem {...args}>content</GridItem>
};
