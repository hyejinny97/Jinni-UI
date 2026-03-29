import './DayRangeCalendarCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DayRangeCalendar from './DayRangeCalendar';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-component';

const meta: Meta<typeof DayRangeCalendar> = {
  title:
    'components/data-entry/DateRangePicker/DateRangeCalendar/HDateDayRangeCalendar/DayRangeCalendar',
  component: DayRangeCalendar,
  argTypes: {
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    displayedDate: {
      description: '화면에 보여지는 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    displayWeekNumber: {
      description: 'true이면, week number가 나타남',
      table: {
        type: { summary: 'boolean' }
      }
    },
    fixedWeekNumber: {
      description: 'day calendar에서 보여지는 week 개수',
      table: {
        type: { summary: 'number' }
      }
    },
    hoveredDate: {
      description: 'hover한 날짜',
      table: {
        type: { summary: 'Date | null' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    maxDate: {
      description: '선택 가능한 최대 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    minDate: {
      description: '선택 가능한 최소 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    onHoverDate: {
      description: '날짜에 hover 했을 때 호출되는 함수',
      table: {
        type: { summary: '(newHoveredDate: Date | null) => void;' }
      }
    },
    onSelectDate: {
      description: 'selected date가 변경되었을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(newSelectedDate: { start?: Date | null; end?: Date | null }) ⇒ void;'
        }
      }
    },
    readOnly: {
      description: 'true이면, 수정 불가',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    selectedDate: {
      description: '선택된 날짜 범위',
      table: {
        type: {
          summary: `{ start?: Date | null; end?: Date | null }`
        }
      }
    },
    showDaysOutsideCurrentMonth: {
      description:
        'true이면, day calendar에서 해당 month의 days 이외의 앞뒤 일부 days를 나타냄',
      table: {
        type: {
          summary: `boolean`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DayRangeCalendar>;

const DateText = ({
  year,
  month,
  day
}: {
  year?: number;
  month?: number;
  day?: number;
}) => {
  return (
    <Text
      noMargin
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const ControlledSelectTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: selectedDate[rangeField]?.getFullYear(),
    month: selectedDate[rangeField]?.getMonth(),
    day: selectedDate[rangeField]?.getDate()
  });

  const handleSelect = (newValue: RangeType<Date | null>) => {
    setSelectedDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Selected Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <DayRangeCalendar
        displayedDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={handleSelect}
      />
    </Stack>
  );
};

const ControlledHoverTemplate = () => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const year = hoveredDate?.getFullYear();
  const month = hoveredDate?.getMonth();
  const day = hoveredDate?.getDate();

  const handleHover = (newValue: Date | null) => {
    setHoveredDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Hovered Date:</span>
        <DateText year={year} month={month} day={day} />
      </Stack>
      <DayRangeCalendar
        displayedDate={new Date()}
        hoveredDate={hoveredDate}
        onHoverDate={handleHover}
      />
    </Stack>
  );
};

const LocaleTemplate = () => {
  const LOCALES = [
    'ko-KR',
    'en-US',
    'fr-FR',
    'ja-JP',
    'zh-CN',
    'ar-EG'
  ] as const;
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>(LOCALES[0]);

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Locale
        </Chip>
        <RadioGroup name="locale" value={locale} onChange={handleLocaleChange}>
          <Grid rows={2} columns={3} spacing={5}>
            {LOCALES.map((locale) => (
              <Label content={locale}>
                <Radio value={locale} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DayRangeCalendar
        key={locale}
        displayedDate={new Date()}
        locale={locale}
      />
    </Stack>
  );
};

export const BasicDayRangeCalendar: Story = {
  render: (args) => <DayRangeCalendar displayedDate={new Date()} {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar displayedDate={new Date()} />`.trim()
      }
    }
  }
};

export const ControlledSelect: Story = {
  render: () => <ControlledSelectTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledSelectTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: selectedDate[rangeField]?.getFullYear(),
    month: selectedDate[rangeField]?.getMonth(),
    day: selectedDate[rangeField]?.getDate()
  });

  const handleSelect = (newValue: RangeType<Date | null>) => {
    setSelectedDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Selected Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <DayRangeCalendar
        displayedDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={handleSelect}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ControlledHover: Story = {
  render: () => <ControlledHoverTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledHoverTemplate = () => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const year = hoveredDate?.getFullYear();
  const month = hoveredDate?.getMonth();
  const day = hoveredDate?.getDate();

  const handleHover = (newValue: Date | null) => {
    setHoveredDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Hovered Date:</span>
        <DateText year={year} month={month} day={day} />
      </Stack>
      <DayRangeCalendar
        displayedDate={new Date()}
        hoveredDate={hoveredDate}
        onHoverDate={handleHover}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Locale: Story = {
  render: () => <LocaleTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LocaleTemplate = () => {
  const LOCALES = [
    'ko-KR',
    'en-US',
    'fr-FR',
    'ja-JP',
    'zh-CN',
    'ar-EG'
  ] as const;
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>(LOCALES[0]);

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Locale
        </Chip>
        <RadioGroup name="locale" value={locale} onChange={handleLocaleChange}>
          <Grid rows={2} columns={3} spacing={5}>
            {LOCALES.map((locale) => (
              <Label content={locale}>
                <Radio value={locale} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DayRangeCalendar key={locale} displayedDate={new Date()} locale={locale} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <DayRangeCalendar
      displayedDate={new Date(2025, 0, 1)}
      minDate={new Date(2025, 0, 10)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar
  displayedDate={new Date(2025, 0, 1)}
  minDate={new Date(2025, 0, 10)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <DayRangeCalendar
      displayedDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 0, 20)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar
  displayedDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 0, 20)}
/>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <DayRangeCalendar
      displayedDate={new Date(2025, 0, 1)}
      disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar
  displayedDate={new Date(2025, 0, 1)}
  disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => (
    <DayRangeCalendar displayedDate={new Date()} readOnly {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar displayedDate={new Date()} readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <DayRangeCalendar displayedDate={new Date()} disabled {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar displayedDate={new Date()} disabled />`.trim()
      }
    }
  }
};

export const ShowAdditionalDays: Story = {
  render: (args) => (
    <DayRangeCalendar
      displayedDate={new Date()}
      showDaysOutsideCurrentMonth
      fixedWeekNumber={6}
      {...args}
    />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => (
    <DayRangeCalendar displayedDate={new Date()} displayWeekNumber {...args} />
  )
};

export const CustomRangeDay: Story = {
  render: (args) => (
    <DayRangeCalendar
      className="custom-range-day"
      displayedDate={new Date()}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayRangeCalendar
  className="custom-range-day"
  displayedDate={new Date()}
/>`.trim()
      }
    }
  }
};
