import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import TablePagination from './TablePagination';

const meta: Meta<typeof TablePagination> = {
  component: TablePagination,
  argTypes: {
    count: {
      description: '전체 rows 갯수',
      table: {
        type: { summary: `number` }
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
        defaultValue: { summary: `null` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TablePagination>;

const BasicTablePaginationTemplate = () => {
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <TablePagination
      count={100}
      rowsPerPage={30}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};

const OptionsOfRowsPerPageTemplate = () => {
  const ROWS_PER_PAGE_OPTIONS = [5, 10, 15] as const;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<
    (typeof ROWS_PER_PAGE_OPTIONS)[number]
  >(ROWS_PER_PAGE_OPTIONS[0]);

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };
  const handleRowsPerPageChange = (
    _: Event | React.SyntheticEvent,
    selectedRowPerPage: number
  ) => {
    setRowsPerPage(
      selectedRowPerPage as (typeof ROWS_PER_PAGE_OPTIONS)[number]
    );
  };

  return (
    <TablePagination
      count={100}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPageOptions={[...ROWS_PER_PAGE_OPTIONS]}
    />
  );
};

export const BasicTablePagination: Story = {
  render: () => <BasicTablePaginationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicTablePaginationTemplate = () => {
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <TablePagination
      count={100}
      rowsPerPage={30}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};`.trim()
      }
    }
  }
};

export const OptionsOfRowsPerPage: Story = {
  render: () => <OptionsOfRowsPerPageTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionsOfRowsPerPageTemplate = () => {
  const ROWS_PER_PAGE_OPTIONS = [5, 10, 15] as const;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<
    (typeof ROWS_PER_PAGE_OPTIONS)[number]
  >(ROWS_PER_PAGE_OPTIONS[0]);

  const handlePageChange = (_: React.MouseEvent, selectedPage: number) => {
    setPage(selectedPage);
  };
  const handleRowsPerPageChange = (
    _: Event | React.SyntheticEvent,
    selectedRowPerPage: number
  ) => {
    setRowsPerPage(
      selectedRowPerPage as (typeof ROWS_PER_PAGE_OPTIONS)[number]
    );
  };

  return (
    <TablePagination
      count={100}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={page}
      onPageChange={handlePageChange}
      rowsPerPageOptions={[...ROWS_PER_PAGE_OPTIONS]}
    />
  );
};`.trim()
      }
    }
  }
};
