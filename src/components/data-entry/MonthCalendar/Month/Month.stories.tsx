import type { Meta, StoryObj } from '@storybook/react';
import Month from './Month';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Month> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateMonthCalendar/MonthCalendar/Month',
  component: Month,
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
      description: '다른 Month 컴포넌트와 구별되는 식별자',
      table: {
        type: { summary: `Date` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Month>;

export const BasicMonth: Story = {
  render: () => <Month value={new Date()}>1월</Month>,
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()}>1월</Month>`.trim()
      }
    }
  }
};

export const SelectedMonth: Story = {
  render: () => (
    <Month value={new Date()} selected>
      1월
    </Month>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()} selected>
  1월
</Month>`.trim()
      }
    }
  }
};

export const MarkedMonth: Story = {
  render: () => (
    <Month value={new Date()} marked>
      1월
    </Month>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()} marked>
  1월
</Month>`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: () => (
    <Month value={new Date()} selected color="yellow-400">
      1월
    </Month>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()} selected color="yellow-400">
  1월
</Month>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: () => (
    <Month value={new Date()} readOnly onClick={() => console.info('clicked')}>
      1월
    </Month>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()} readOnly onClick={() => console.info('clicked')}>
  1월
</Month>`.trim()
      }
    }
  }
};

export const OverlayEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Month value={new Date()} selected overlayColor="black">
        1월
      </Month>
      <Month value={new Date()} selected disableOverlay>
        1월
      </Month>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <Month value={new Date()} selected overlayColor="black">
    1월
  </Month>
  <Month value={new Date()} selected disableOverlay>
    1월
  </Month>
</Stack>`.trim()
      }
    }
  }
};

export const RippleEffect: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Month value={new Date()} selected rippleColor="black">
        1월
      </Month>
      <Month value={new Date()} selected rippleStartLocation="center">
        1월
      </Month>
      <Month value={new Date()} selected disableRipple>
        1월
      </Month>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <Month value={new Date()} selected rippleColor="black">
    1월
  </Month>
  <Month value={new Date()} selected rippleStartLocation="center">
    1월
  </Month>
  <Month value={new Date()} selected disableRipple>
    1월
  </Month>
</Stack>`.trim()
      }
    }
  }
};

export const ElevationEffect: Story = {
  render: () => (
    <Month value={new Date()} selected elevation={3}>
      1월
    </Month>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()} selected elevation={3}>
  1월
</Month>`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: () => (
    <Month value={new Date()} selected disabled>
      1월
    </Month>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Month value={new Date()} selected disabled>
  1월
</Month>`.trim()
      }
    }
  }
};
