import type { Meta, StoryObj } from '@storybook/react';
import Year from './Year';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Year> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateYearCalendar/YearCalendar/Year',
  component: Year,
  argTypes: {
    children: {
      description: 'button 콘텐츠',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    color: {
      description: 'selected 됐을 때 나타나는 배경색',
      table: {
        type: { summary: `ColorType` },
        defaultValue: { summary: `'primary'` }
      }
    },
    marked: {
      description: 'true이면, marked style이 나타남',
      table: {
        type: { summary: `boolean` }
      }
    },
    readOnly: {
      description: 'true이면, click handler가 호출되지 않음',
      table: {
        type: { summary: `boolean` }
      }
    },
    selected: {
      description: 'true이면, selected style이 나타남',
      table: {
        type: { summary: `boolean` }
      }
    },
    value: {
      description: '다른 Year 컴포넌트와 구별되는 식별자',
      table: {
        type: { summary: `Date` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Year>;

export const BasicYear: Story = {
  render: () => <Year value={new Date()}>2026</Year>,
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()}>2026</Year>`.trim()
      }
    }
  }
};

export const SelectedYear: Story = {
  render: () => (
    <Year value={new Date()} selected>
      2026
    </Year>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()} selected>
  2026
</Year>`.trim()
      }
    }
  }
};

export const MarkedYear: Story = {
  render: () => (
    <Year value={new Date()} marked>
      2026
    </Year>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()} marked>
  2026
</Year>`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: () => (
    <Year value={new Date()} selected color="yellow-400">
      2026
    </Year>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()} selected color="yellow-400">
  2026
</Year>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: () => (
    <Year value={new Date()} readOnly onClick={() => console.info('clicked')}>
      2026
    </Year>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()} readOnly onClick={() => console.info('clicked')}>
  2026
</Year>`.trim()
      }
    }
  }
};

export const OverlayEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Year value={new Date()} selected overlayColor="black">
        2026
      </Year>
      <Year value={new Date()} selected disableOverlay>
        2026
      </Year>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <Year value={new Date()} selected overlayColor="black">
    2026
  </Year>
  <Year value={new Date()} selected disableOverlay>
    2026
  </Year>
</Stack>`.trim()
      }
    }
  }
};

export const RippleEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Year value={new Date()} selected rippleColor="black">
        2026
      </Year>
      <Year value={new Date()} selected rippleStartLocation="center">
        2026
      </Year>
      <Year value={new Date()} selected disableRipple>
        2026
      </Year>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <Year value={new Date()} selected rippleColor="black">
    2026
  </Year>
  <Year value={new Date()} selected rippleStartLocation="center">
    2026
  </Year>
  <Year value={new Date()} selected disableRipple>
    2026
  </Year>
</Stack>`.trim()
      }
    }
  }
};

export const ElevationEffect: Story = {
  render: () => (
    <Year value={new Date()} selected elevation={3}>
      2026
    </Year>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()} selected elevation={3}>
  2026
</Year>`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: () => (
    <Year value={new Date()} selected disabled>
      2026
    </Year>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Year value={new Date()} selected disabled>
  2026
</Year>`.trim()
      }
    }
  }
};
