import './VDateDayRangeCalendarCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import VDateDayRangeCalendar, {
  VDateDayRangeCalendarProps
} from './VDateDayRangeCalendar';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-component';

const meta: Meta<typeof VDateDayRangeCalendar> = {
  title:
    'components/data-entry/DateRangePicker/DateRangeCalendar/VDateDayRangeCalendar',
  component: VDateDayRangeCalendar,
  argTypes: {
    dayCalendars: {
      description: 'day calendars 갯수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' }
      }
    },
    defaultValue: {
      description: '초기 selected date',
      table: {
        type: { summary: `{ start?: Date, end?: Date }` }
      }
    },
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
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start?: Date | null, end?: Date | null }, selectedDate?: Date) => void;`
        }
      }
    },
    options: {
      description: 'date 속성',
      table: {
        type: {
          summary: `{
  dateStyle: 'short' | 'medium'
}
| 
{
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short';
  day?: 'numeric' | '2-digit';
}`
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
    referenceDate: {
      description: 'value, defaultValue prop이 없을 때 참조하는 date',
      table: {
        type: {
          summary: `Date`
        }
      }
    },
    renderCalendarHeader: {
      description:
        'calendarHeaderProps를 인자로 받아 CalendarHeader 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(calendarHeaderProps: CalendarHeaderProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(calendarHeaderProps: CalendarHeaderProps) => <CalendarHeader {...calendarHeaderProps} />;`
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
    },
    value: {
      description: 'date',
      table: {
        type: {
          summary: `{ start?: Date | null, end?: Date | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof VDateDayRangeCalendar>;

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

const ControlledVDateDayRangeCalendarTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <VDateDayRangeCalendar value={value} onChange={handleChange} />
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
      <VDateDayRangeCalendar key={locale} locale={locale} />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<VDateDayRangeCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
    {
      year: 'numeric',
      month: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<VDateDayRangeCalendarProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as VDateDayRangeCalendarProps['options']);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={OPTIONS.length} columns={1} spacing={5}>
            {OPTIONS.map((option) => {
              const optionStr = JSON.stringify(option);
              return (
                <Label content={optionStr}>
                  <Radio value={optionStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <VDateDayRangeCalendar key={JSON.stringify(option)} options={option} />
    </Stack>
  );
};

const CountOfCalendarsTemplate = () => {
  type calendarsType = NonNullable<VDateDayRangeCalendarProps['dayCalendars']>;
  const CALENDARS: Array<calendarsType> = [3, 5, 8] as const;
  const [calendars, setCalendars] = useState<calendarsType>(5);

  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCalendars(Number(value) as calendarsType);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Calendars
        </Chip>
        <RadioGroup
          name="option"
          value={String(calendars)}
          onChange={handleCalendarsChange}
        >
          <Grid columns={CALENDARS.length} spacing={5}>
            {CALENDARS.map((calendar) => {
              const calendarStr = String(calendar);
              return (
                <Label content={calendarStr}>
                  <Radio value={calendarStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <VDateDayRangeCalendar dayCalendars={calendars} />
    </Stack>
  );
};

export const BasicVDateDayRangeCalendar: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <VDateDayRangeCalendar {...args} />
      <VDateDayRangeCalendar
        defaultValue={{
          start: new Date(2025, 6, 14),
          end: new Date(2025, 7, 20)
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <VDateDayRangeCalendar />
  <VDateDayRangeCalendar
    defaultValue={{
      start: new Date(2025, 6, 14),
      end: new Date(2025, 7, 20)
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledVDateDayRangeCalendar: Story = {
  render: () => <ControlledVDateDayRangeCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledVDateDayRangeCalendarTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <VDateDayRangeCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseInitialDate: Story = {
  render: (args) => (
    <VDateDayRangeCalendar referenceDate={new Date(2000, 1, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar referenceDate={new Date(2000, 1, 1)} />`.trim()
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
      <VDateDayRangeCalendar key={locale} locale={locale} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Options: Story = {
  render: () => <OptionsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionsTemplate = () => {
  const OPTIONS: Array<VDateDayRangeCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
    {
      year: 'numeric',
      month: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<VDateDayRangeCalendarProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as VDateDayRangeCalendarProps['options']);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={OPTIONS.length} columns={1} spacing={5}>
            {OPTIONS.map((option) => {
              const optionStr = JSON.stringify(option);
              return (
                <Label content={optionStr}>
                  <Radio value={optionStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <VDateDayRangeCalendar key={JSON.stringify(option)} options={option} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <VDateDayRangeCalendar
      referenceDate={new Date(2025, 1, 1)}
      minDate={new Date(2025, 1, 10)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar
  referenceDate={new Date(2025, 1, 1)}
  minDate={new Date(2025, 1, 10)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <VDateDayRangeCalendar
      referenceDate={new Date(2025, 1, 1)}
      maxDate={new Date(2025, 1, 20)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar
  referenceDate={new Date(2025, 1, 1)}
  maxDate={new Date(2025, 1, 20)}
/>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <VDateDayRangeCalendar
      referenceDate={new Date(2025, 1, 1)}
      disabledDates={[new Date(2025, 1, 15), new Date(2025, 1, 28)]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar
  referenceDate={new Date(2025, 1, 1)}
  disabledDates={[new Date(2025, 1, 15), new Date(2025, 1, 28)]}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <VDateDayRangeCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <VDateDayRangeCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar disabled />`.trim()
      }
    }
  }
};

export const CountOfCalendars: Story = {
  render: () => <CountOfCalendarsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CountOfCalendarsTemplate = () => {
  type calendarsType = NonNullable<VDateDayRangeCalendarProps['dayCalendars']>;
  const CALENDARS: Array<calendarsType> = [3, 5, 8] as const;
  const [calendars, setCalendars] = useState<calendarsType>(5);

  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCalendars(Number(value) as calendarsType);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Calendars
        </Chip>
        <RadioGroup
          name="option"
          value={String(calendars)}
          onChange={handleCalendarsChange}
        >
          <Grid columns={CALENDARS.length} spacing={5}>
            {CALENDARS.map((calendar) => {
              const calendarStr = String(calendar);
              return (
                <Label content={calendarStr}>
                  <Radio value={calendarStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <VDateDayRangeCalendar dayCalendars={calendars} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ShowAdditionalDays: Story = {
  render: (args) => (
    <VDateDayRangeCalendar
      showDaysOutsideCurrentMonth
      fixedWeekNumber={6}
      {...args}
    />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => <VDateDayRangeCalendar displayWeekNumber {...args} />
};

export const CustomRangeDay: Story = {
  render: (args) => (
    <VDateDayRangeCalendar className="custom-range-day" {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar className="custom-range-day" />`.trim()
      }
    }
  }
};

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <VDateDayRangeCalendar
      renderCalendarHeader={(calendarHeaderProps) => (
        <CalendarHeader
          style={{ backgroundColor: 'gray-200' }}
          {...calendarHeaderProps}
        />
      )}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<VDateDayRangeCalendar
  renderCalendarHeader={(calendarHeaderProps) => (
    <CalendarHeader
      style={{ backgroundColor: 'gray-200' }}
      {...calendarHeaderProps}
    />
  )}
/>`.trim()
      }
    }
  }
};
