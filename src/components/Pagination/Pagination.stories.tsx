import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';
import PaginationItem from '../PaginationItem';
import Stack from '@/components/Stack';
import Text from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import Link from '@/components/Link';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  argTypes: {
    boundaryCount: {
      description: '처음과 끝에 보여지는 페이지 수',
      defaultValue: { summary: `1` }
    },
    color: {
      description: 'selected page 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    count: {
      description: '전체 페이지 수'
    },
    defaultPage: {
      description: '초기 selected page',
      defaultValue: { summary: `1` }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      defaultValue: { summary: `false` }
    },
    displayCount: {
      description: '화면에 보여지는 페이지 최대 개수',
      defaultValue: { summary: `5` }
    },
    displayMethod: {
      description: 'displayCount 만큼의 pagination items를 나타내는 방법',
      table: {
        type: { summary: `'default' | 'ellipsis'` },
        defaultValue: { summary: `'default'` }
      }
    },
    onChange: {
      description: 'selected page가 변경됐을 때마다 호출되는 함수',
      table: {
        type: { summary: `(event: React.SyntheticEvent, page: number) => void` }
      }
    },
    page: {
      description: 'selected page'
    },
    renderPaginationItem: {
      description:
        'paginationItemProps을 인자로 받아 PaginationItem 컴포넌트를 렌더하는 함수',
      table: {
        type: {
          summary: `(paginationItemProps: PaginationItemProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(paginationItemProps: PaginationItemProps) => <PaginationItem {...paginationItemProps} />;`
        }
      }
    },
    shape: {
      description: 'pagination item 모양',
      table: {
        type: { summary: `'circular' | 'rounded'` },
        defaultValue: { summary: `'circular'` }
      }
    },
    siblingCount: {
      description: 'selected page 양옆으로 보여지는 페이지 수',
      defaultValue: { summary: `1` }
    },
    size: {
      description: 'pagination item 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    variant: {
      description: 'pagination item 종류',
      table: {
        type: {
          summary: `{ selectedPage: 'filled' | 'subtle-filled' | 'outlined' | 'text', page: 'filled' | 'subtle-filled' | 'outlined' | 'text' }`
        },
        defaultValue: {
          summary: `{ selectedPage: 'filled', page: 'text' }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const ControlledPaginationTemplate = () => {
  const [page, setPage] = useState(2);

  const handleChange = (_: React.SyntheticEvent, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Text>Current Page: {page}</Text>
      <Pagination count={10} page={page} onChange={handleChange} />
    </>
  );
};

const RouterIntegrationTemplate = () => {
  const query = new URLSearchParams(window.location.search);
  const page = parseInt(query.get('page') || '1', 10);

  return (
    <Pagination<'ul', typeof Link>
      count={10}
      page={page}
      renderPaginationItem={(itemProps) => (
        <PaginationItem
          as={Link}
          href={`/${itemProps.page === 1 ? '' : `?page=${itemProps.page}`}`}
          {...itemProps}
        />
      )}
    />
  );
};

const HideControlButtonTemplate = () => {
  return (
    <Pagination
      count={10}
      displayCount={10}
      renderPaginationItem={(itemProps) =>
        ['first', 'last', 'prev', 'next'].includes(itemProps.type) ? (
          <PaginationItem style={{ display: 'none' }} {...itemProps} />
        ) : (
          <PaginationItem {...itemProps} />
        )
      }
    />
  );
};

const CustomIconTemplate = () => {
  const ITEMS = {
    prev: { label: 'prev', tooltipContent: 'go prev-page' },
    next: { label: 'next', tooltipContent: 'go next-page' },
    first: { label: 'first', tooltipContent: 'go first-page' },
    last: { label: 'last', tooltipContent: 'go last-page' }
  } as const;

  const isControlType = (
    type: string
  ): type is 'prev' | 'next' | 'first' | 'last' =>
    ['prev', 'next', 'first', 'last'].includes(type);

  return (
    <Pagination
      count={10}
      renderPaginationItem={(itemProps) => {
        const { type } = itemProps;
        if (isControlType(type)) {
          return (
            <Tooltip content={ITEMS[type].tooltipContent} arrow>
              <PaginationItem
                style={{ minWidth: 'max-content' }}
                {...itemProps}
              >
                {ITEMS[type].label}
              </PaginationItem>
            </Tooltip>
          );
        } else {
          return <PaginationItem {...itemProps} />;
        }
      }}
    />
  );
};

export const BasicPagination: Story = {
  render: () => (
    <Stack spacing={20}>
      <Pagination count={10} />
      <Pagination count={10} displayCount={10} />
      <Pagination count={10} displayCount={3} />
      <Pagination count={10} defaultPage={4} />
    </Stack>
  )
};

export const ControlledPagination: Story = {
  render: () => <ControlledPaginationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledPaginationTemplate = () => {
  const [page, setPage] = useState(2);

  const handleChange = (_: React.SyntheticEvent, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Text>Current Page: {page}</Text>
      <Pagination count={10} page={page} onChange={handleChange} />
    </>
  );
};`.trim()
      }
    }
  }
};

export const DisplayMethod: Story = {
  render: () => (
    <Pagination
      count={10}
      displayCount={10}
      defaultPage={5}
      displayMethod="ellipsis"
    />
  )
};

export const RestrictDisplayedCount: Story = {
  render: () => (
    <Stack spacing={20}>
      <Pagination
        count={10}
        displayCount={10}
        defaultPage={5}
        displayMethod="ellipsis"
        siblingCount={0}
      />
      <Pagination
        count={10}
        displayCount={10}
        defaultPage={5}
        displayMethod="ellipsis"
        boundaryCount={2}
      />
    </Stack>
  )
};

export const RouterIntegration: Story = {
  render: () => <RouterIntegrationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const RouterIntegrationTemplate = () => {
  const query = new URLSearchParams(window.location.search);
  const page = parseInt(query.get('page') || '1', 10);

  return (
    <Pagination
      count={10}
      page={page}
      renderPaginationItem={(itemProps) => (
        <PaginationItem
          as={Link}
          href={\`/\${itemProps.page === 1 ? '' : \`?page=\${itemProps.page}\`}\`}
          {...itemProps}
        />
      )}
    />
  );
};`.trim()
      }
    }
  }
};

export const Variant: Story = {
  render: () => (
    <Stack spacing={20}>
      <Pagination
        count={10}
        variant={{ selectedPage: 'outlined', page: 'text' }}
      />
      <Pagination
        count={10}
        variant={{
          selectedPage: 'filled',
          page: 'subtle-filled'
        }}
      />
    </Stack>
  )
};

export const Color: Story = {
  render: () => <Pagination count={10} color="yellow-500" />
};

export const Disabled: Story = {
  render: () => <Pagination count={10} disabled />
};

export const Shape: Story = {
  render: () => (
    <Stack spacing={20}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} shape="circular" />
    </Stack>
  )
};

export const Size: Story = {
  render: () => (
    <Stack spacing={20}>
      <Pagination count={10} size="sm" />
      <Pagination count={10} size="md" />
      <Pagination count={10} size="lg" />
    </Stack>
  )
};

export const HideControlButton: Story = {
  render: () => <HideControlButtonTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const HideControlButtonTemplate = () => {
  return (
    <Pagination
      count={10}
      displayCount={10}
      renderPaginationItem={(itemProps) =>
        ['first', 'last', 'prev', 'next'].includes(itemProps.type) ? (
          <PaginationItem style={{ display: 'none' }} {...itemProps} />
        ) : (
          <PaginationItem {...itemProps} />
        )
      }
    />
  );
};`.trim()
      }
    }
  }
};

export const CustomIcon: Story = {
  render: () => <CustomIconTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomIconTemplate = () => {
  const ITEMS = {
    prev: { label: 'prev', tooltipContent: 'go prev-page' },
    next: { label: 'next', tooltipContent: 'go next-page' },
    first: { label: 'first', tooltipContent: 'go first-page' },
    last: { label: 'last', tooltipContent: 'go last-page' }
  } as const;

  const isControlType = (
    type: string
  ): type is 'prev' | 'next' | 'first' | 'last' =>
    ['prev', 'next', 'first', 'last'].includes(type);

  return (
    <Pagination
      count={10}
      renderPaginationItem={(itemProps) => {
        const { type } = itemProps;
        if (isControlType(type)) {
          return (
            <Tooltip content={ITEMS[type].tooltipContent} arrow>
              <PaginationItem
                style={{ minWidth: 'max-content' }}
                {...itemProps}
              >
                {ITEMS[type].label}
              </PaginationItem>
            </Tooltip>
          );
        } else {
          return <PaginationItem {...itemProps} />;
        }
      }}
    />
  );
};
`.trim()
      }
    }
  }
};
