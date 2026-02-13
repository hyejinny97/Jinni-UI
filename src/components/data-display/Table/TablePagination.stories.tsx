import type { Meta, StoryObj } from '@storybook/react';
import TablePagination from './TablePagination';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof TablePagination> = {
  component: TablePagination,
  argTypes: {
    count: {
      description: '전체 rows 갯수',
      table: {
        type: { summary: `number` }
      }
    },
    page: {
      description: '현재 페이지 (zero-based index)',
      table: {
        type: { summary: `number` }
      }
    },
    rowsPerPage: {
      description: '페이지 당 rows 갯수',
      table: {
        type: { summary: `number` }
      }
    },
    rowsPerPageOptions: {
      description: 'rows per page의 선택 옵션',
      table: {
        type: {
          summary: `Array<number | { label: string, value: number }> | null`
        },
        defaultValue: { summary: `[10, 25, 50, 100]` }
      }
    },
    onPageChange: {
      description: 'page 값이 변경되었을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: React.MouseEvent, page: number) => void`
        }
      }
    },
    onRowsPerPageChange: {
      description: 'rows per page 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, rowsPerPage: number) => void`
        }
      }
    }
  },
  decorators: [
    (Story) => (
      <StoryErrorBoundary>
        <Story />
      </StoryErrorBoundary>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof TablePagination>;

export const BasicTablePagination: Story = {};
