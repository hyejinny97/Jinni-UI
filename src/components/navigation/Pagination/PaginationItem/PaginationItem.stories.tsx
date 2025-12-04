import type { Meta, StoryObj } from '@storybook/react';
import PaginationItem from './PaginationItem';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof PaginationItem> = {
  component: PaginationItem,
  argTypes: {
    color: {
      description: 'selected page 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      type: 'boolean',
      defaultValue: { summary: `false` }
    },
    page: {
      description: '특정 pagination item에 해당하는 페이지',
      type: 'number'
    },
    selected: {
      description: 'selected page인지 여부',
      type: 'boolean',
      defaultValue: { summary: `false` }
    },
    shape: {
      description: 'pagination item 모양',
      table: {
        type: { summary: `'circular' | 'rounded'` },
        defaultValue: { summary: `'circular'` }
      }
    },
    size: {
      description: 'pagination item 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    type: {
      description: 'pagination item 타입',
      table: {
        type: { summary: `'first' | 'last' | 'prev' | 'next' | 'page'` },
        defaultValue: { summary: `'page'` }
      }
    },
    variant: {
      description: 'pagination item 종류',
      table: {
        type: { summary: `'filled' | subtle-filled' | 'outlined' | 'text'` },
        defaultValue: { summary: `'text'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof PaginationItem>;

export const Type: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem type="page" page={3} />
      <PaginationItem type="first" page={1} />
      <PaginationItem type="last" page={10} />
      <PaginationItem type="prev" page={2} />
      <PaginationItem type="next" page={4} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem type="page" page={3} />
  <PaginationItem type="first" page={1} />
  <PaginationItem type="last" page={10} />
  <PaginationItem type="prev" page={2} />
  <PaginationItem type="next" page={4} />
</Stack>`.trim()
      }
    }
  }
};

export const Variant: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem type="page" page={3} variant="filled" />
      <PaginationItem type="page" page={3} variant="subtle-filled" />
      <PaginationItem type="page" page={3} variant="outlined" />
      <PaginationItem type="page" page={3} variant="text" />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem type="page" page={3} variant="filled" />
  <PaginationItem type="page" page={3} variant="subtle-filled" />
  <PaginationItem type="page" page={3} variant="outlined" />
  <PaginationItem type="page" page={3} variant="text" />
</Stack>`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem type="page" page={3} disabled />
      <PaginationItem type="first" page={1} disabled />
      <PaginationItem type="last" page={1} disabled />
      <PaginationItem type="prev" page={1} disabled />
      <PaginationItem type="next" page={1} disabled />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem type="page" page={3} disabled />
  <PaginationItem type="first" page={1} disabled />
  <PaginationItem type="last" page={1} disabled />
  <PaginationItem type="prev" page={1} disabled />
  <PaginationItem type="next" page={1} disabled />
</Stack>`.trim()
      }
    }
  }
};

export const OverlayEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem
        type="page"
        page={3}
        variant="subtle-filled"
        overlayColor="white"
      />
      <PaginationItem
        type="page"
        page={3}
        variant="subtle-filled"
        disableOverlay
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem
    type="page"
    page={3}
    variant="subtle-filled"
    overlayColor="white"
  />
  <PaginationItem
    type="page"
    page={3}
    variant="subtle-filled"
    disableOverlay
  />
</Stack>`.trim()
      }
    }
  }
};

export const RippleEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem
        type="page"
        page={3}
        variant="subtle-filled"
        rippleColor="white"
      />
      <PaginationItem
        type="page"
        page={3}
        variant="subtle-filled"
        rippleStartLocation="center"
      />
      <PaginationItem
        type="page"
        page={3}
        variant="subtle-filled"
        disableRipple
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem
    type="page"
    page={3}
    variant="subtle-filled"
    rippleColor="white"
  />
  <PaginationItem
    type="page"
    page={3}
    variant="subtle-filled"
    rippleStartLocation="center"
  />
  <PaginationItem
    type="page"
    page={3}
    variant="subtle-filled"
    disableRipple
  />
</Stack>`.trim()
      }
    }
  }
};

export const ElevationEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem type="page" page={3} elevation={3} />
      <PaginationItem type="first" page={1} elevation={3} />
      <PaginationItem type="last" page={1} elevation={3} />
      <PaginationItem type="prev" page={1} elevation={3} />
      <PaginationItem type="next" page={1} elevation={3} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem type="page" page={3} elevation={3} />
  <PaginationItem type="first" page={1} elevation={3} />
  <PaginationItem type="last" page={1} elevation={3} />
  <PaginationItem type="prev" page={1} elevation={3} />
  <PaginationItem type="next" page={1} elevation={3} />
</Stack>`.trim()
      }
    }
  }
};

export const Selected: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem type="page" page={3} variant="filled" selected />
      <PaginationItem type="page" page={3} variant="subtle-filled" selected />
      <PaginationItem type="page" page={3} variant="outlined" selected />
      <PaginationItem type="page" page={3} variant="text" selected />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem type="page" page={3} variant="filled" selected />
  <PaginationItem type="page" page={3} variant="subtle-filled" selected />
  <PaginationItem type="page" page={3} variant="outlined" selected />
  <PaginationItem type="page" page={3} variant="text" selected />
</Stack>`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem
        type="page"
        page={3}
        variant="filled"
        selected
        color="yellow-500"
      />
      <PaginationItem
        type="page"
        page={3}
        variant="subtle-filled"
        selected
        color="yellow-500"
      />
      <PaginationItem
        type="page"
        page={3}
        variant="outlined"
        selected
        color="yellow-500"
      />
      <PaginationItem
        type="page"
        page={3}
        variant="text"
        selected
        color="yellow-500"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem
    type="page"
    page={3}
    variant="filled"
    selected
    color="yellow-500"
  />
  <PaginationItem
    type="page"
    page={3}
    variant="subtle-filled"
    selected
    color="yellow-500"
  />
  <PaginationItem
    type="page"
    page={3}
    variant="outlined"
    selected
    color="yellow-500"
  />
  <PaginationItem
    type="page"
    page={3}
    variant="text"
    selected
    color="yellow-500"
  />
</Stack>`.trim()
      }
    }
  }
};

export const Shape: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <PaginationItem type="page" page={3} shape="rounded" />
      <PaginationItem type="first" page={1} shape="rounded" />
      <PaginationItem type="last" page={10} shape="rounded" />
      <PaginationItem type="prev" page={2} shape="rounded" />
      <PaginationItem type="next" page={4} shape="rounded" />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <PaginationItem type="page" page={3} shape="rounded" />
  <PaginationItem type="first" page={1} shape="rounded" />
  <PaginationItem type="last" page={10} shape="rounded" />
  <PaginationItem type="prev" page={2} shape="rounded" />
  <PaginationItem type="next" page={4} shape="rounded" />
</Stack>`.trim()
      }
    }
  }
};

export const Size: Story = {
  render: () => (
    <Stack direction="row" spacing={20} style={{ alignItems: 'center' }}>
      <PaginationItem type="page" page={3} variant="filled" size="sm" />
      <PaginationItem type="page" page={3} variant="filled" size="md" />
      <PaginationItem type="page" page={3} variant="filled" size="lg" />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction='row' spacing={20} style={{ alignItems: 'center' }}>
  <PaginationItem type="page" page={3} variant="filled" size="sm" />
  <PaginationItem type="page" page={3} variant="filled" size="md" />
  <PaginationItem type="page" page={3} variant="filled" size="lg" />
</Stack>`.trim()
      }
    }
  }
};
