import type { Meta, StoryObj } from '@storybook/react';
import Day from './Day';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Day> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateDayCalendar/DayCalendar/Day',
  component: Day,
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
      description: '다른 Day 컴포넌트와 구별되는 식별자',
      table: {
        type: { summary: `Date` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Day>;

export const BasicDay: Story = {
  render: () => <Day value={new Date()}>1</Day>,
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()}>1</Day>`.trim()
      }
    }
  }
};

export const SelectedDay: Story = {
  render: () => (
    <Day value={new Date()} selected>
      1
    </Day>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()} selected>
  1
</Day>`.trim()
      }
    }
  }
};

export const MarkedDay: Story = {
  render: () => (
    <Day value={new Date()} marked>
      1
    </Day>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()} marked>
  1
</Day>`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: () => (
    <Day value={new Date()} selected color="yellow-400">
      1
    </Day>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()} selected color="yellow-400">
  1
</Day>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: () => (
    <Day value={new Date()} readOnly onClick={() => console.info('clicked')}>
      1
    </Day>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()} readOnly onClick={() => console.info('clicked')}>
  1
</Day>`.trim()
      }
    }
  }
};

export const OverlayEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Day value={new Date()} selected overlayColor="black">
        1
      </Day>
      <Day value={new Date()} selected disableOverlay>
        1
      </Day>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <Day value={new Date()} selected overlayColor="black">
    1
  </Day>
  <Day value={new Date()} selected disableOverlay>
    1
  </Day>
</Stack>`.trim()
      }
    }
  }
};

export const RippleEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Day value={new Date()} selected rippleColor="black">
        1
      </Day>
      <Day value={new Date()} selected rippleStartLocation="center">
        1
      </Day>
      <Day value={new Date()} selected disableRipple>
        1
      </Day>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <Day value={new Date()} selected rippleColor="black">
    1
  </Day>
  <Day value={new Date()} selected rippleStartLocation="center">
    1
  </Day>
  <Day value={new Date()} selected disableRipple>
    1
  </Day>
</Stack>`.trim()
      }
    }
  }
};

export const ElevationEffect: Story = {
  render: () => (
    <Day value={new Date()} selected elevation={3}>
      1
    </Day>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()} selected elevation={3}>
  1
</Day>`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: () => (
    <Day value={new Date()} selected disabled>
      1
    </Day>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Day value={new Date()} selected disabled>
  1
</Day>`.trim()
      }
    }
  }
};
