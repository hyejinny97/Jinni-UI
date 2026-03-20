import './CustomCalendarHeader.scss';
import type { Meta, StoryObj } from '@storybook/react';
import CalendarHeader from './CalendarHeader';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof CalendarHeader> = {
  title: 'components/data-entry/DatePicker/CalendarHeader',
  component: CalendarHeader,
  argTypes: {
    children: {
      description: 'Header 중앙에 위치할 콘텐츠',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    hideNextButton: {
      description: 'true이면, next button을 숨김',
      table: {
        type: { summary: 'boolean' }
      }
    },
    hidePrevButton: {
      description: 'true이면, prev button을 숨김',
      table: {
        type: { summary: 'boolean' }
      }
    },
    nextIcon: {
      description: 'next button의 icon',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    onNextClick: {
      description: 'next button 클릭 시 호출되는 함수',
      table: {
        type: { summary: '() => void' }
      }
    },
    onPrevClick: {
      description: 'prev button 클릭 시 호출되는 함수',
      table: {
        type: { summary: '() => void' }
      }
    },
    prevIcon: {
      description: 'prev button의 icon',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CalendarHeader>;

export const BasicCalendarHeader: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <CalendarHeader {...args} />
      <CalendarHeader {...args}>YYYY/MM</CalendarHeader>
    </Stack>
  )
};

export const HandleControlButtonsClicked: Story = {
  render: (args) => (
    <CalendarHeader
      onPrevClick={() => alert('prev button clicked!')}
      onNextClick={() => alert('next button clicked!')}
      {...args}
    >
      YYYY/MM
    </CalendarHeader>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CalendarHeader
  onPrevClick={() => alert('prev button clicked!')}
  onNextClick={() => alert('next button clicked!')}
>
  YYYY/MM
</CalendarHeader>`.trim()
      }
    }
  }
};

export const HideControlButtons: Story = {
  render: (args) => (
    <CalendarHeader hidePrevButton hideNextButton {...args}>
      YYYY/MM
    </CalendarHeader>
  )
};

export const CustomControlButtonsIcon: Story = {
  render: (args) => (
    <CalendarHeader prevIcon="prev" nextIcon="next" {...args}>
      YYYY/MM
    </CalendarHeader>
  )
};

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <CalendarHeader className="custom-calendar-header" {...args}>
      YYYY/MM
    </CalendarHeader>
  )
};
