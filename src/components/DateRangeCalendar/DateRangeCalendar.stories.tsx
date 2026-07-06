import './DateRangeCalendarCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateRangeCalendar, { DateRangeCalendarProps } from './DateRangeCalendar';
import CalendarHeader from '@/components/CalendarHeader';
import Stack from '@/components/Stack';
import Text from '@/components/Text';
import Box from '@/components/Box';
import Grid from '@/components/Grid';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import Switch from '@/components/Switch';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledDatesFnType
} from '@/types/date-component';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateRangeCalendar> = {
  title: 'components/DateRangePicker/DateRangeCalendar',
  component: DateRangeCalendar,
  argTypes: {
    dayCalendars: {
      description: 'day calendars 갯수',
      table: {
        type: { summary: `orientation === 'horizontal' ? 1 | 2 | 3 : number` },
        defaultValue: { summary: `orientation === 'horizontal' ? 2: 5` }
      }
    },
    dayCalendarsOrientation: {
      description: 'day calendars 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    defaultValue: {
      description: '초기 selected date',
      table: {
        type: { summary: '{ start?: Date, end?: Date }' }
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
        type: {
          summary: `Array<Date> | ({ date, rangeField }: { date: Date; rangeField: 'start' | 'end'; }) => boolean;`
        }
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
    monthCalendars: {
      description: 'month calendars 갯수',
      table: {
        type: { summary: `orientation === 'horizontal' ? 1 | 2 | 3 : number` },
        defaultValue: { summary: `orientation === 'horizontal' ? 2: 5` }
      }
    },
    monthCalendarsOrientation: {
      description: 'month calendars 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
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
      description: 'selected date',
      table: {
        type: {
          summary: `{ start?: Date | null, end?: Date | null }`
        }
      }
    },
    yearsOrder: {
      description: 'years를 나타내는 순서',
      table: {
        type: {
          summary: `'asc' | 'dsc'`
        },
        defaultValue: {
          summary: `'asc'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateRangeCalendar>;

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

const ControlledDateRangeCalendarTemplate = () => {
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
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <DateRangeCalendar value={value} onChange={handleChange} />
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
      <DateRangeCalendar
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateRangeCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
    { year: 'numeric' },
    { month: 'long' },
    { day: 'numeric' }
  ] as const;
  const [option, setOption] = useState<DateRangeCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangeCalendarProps['options']);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={3} columns={2} spacing={5}>
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
      <DateRangeCalendar
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

const dateToMonth = (date: Date) => {
  return date.getFullYear() * 12 + date.getMonth();
};

const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

type CaseType = {
  label: string;
  withValue?: false;
  disabledDates: Array<Date> | RangeDisabledDatesFnType;
  options?: DateRangeCalendarProps['options'];
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (
    value: RangeType<Date | null>
  ) => Array<Date> | RangeDisabledDatesFnType;
  options?: DateRangeCalendarProps['options'];
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Disable today',
    disabledDates: [new Date()]
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    },
    options: { year: 'numeric' }
  },
  {
    label: `'End' can only be selected up to 'start' + 10 years.`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start.getFullYear();
          const year = date.getFullYear();
          return year < start || start + 10 <= year;
        }
        return false;
      },
    options: { year: 'numeric' }
  },
  {
    label: 'Available from june to august.',
    disabledDates: ({ date }) => {
      const month = date.getMonth();
      return month < 5 || 7 < month;
    },
    options: { month: 'long' }
  },
  {
    label: `'End' can only be selected up to 'start' + 2 months.`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start;
          const startInMonth = dateToMonth(start);
          const end = new Date(start);
          end.setMonth(start.getMonth() + 2);
          const endInMonth = dateToMonth(end);
          const dateInMonth = dateToMonth(date);
          return dateInMonth < startInMonth || endInMonth < dateInMonth;
        }
        return false;
      },
    options: { month: 'long' }
  },
  {
    label: 'Disable weekends.',
    disabledDates: ({ date }) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    }
  },
  {
    label: 'Available between 2026.6.1 and 2026.8.15.',
    disabledDates: ({ date }) => {
      const startInDay = dateToDay(new Date(2026, 5, 1));
      const endInDay = dateToDay(new Date(2026, 7, 15));
      const dateInDay = dateToDay(date);
      return dateInDay < startInDay || endInDay < dateInDay;
    }
  },
  {
    label: `'End' can only be selected up to 'start' + 7 days.`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start;
          const startInDay = dateToDay(start);
          const end = new Date(start);
          end.setDate(start.getDate() + 7);
          const endInDay = dateToDay(end);
          const dateInDay = dateToDay(date);
          return dateInDay < startInDay || endInDay <= dateInDay;
        }
        return false;
      }
  }
];

const DisabledDatesTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateRangeCalendar
        value={value}
        onChange={handleChange}
        disabledDates={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDates(value)
            : CASES[caseIdx].disabledDates
        }
        options={CASES[caseIdx].options}
      />
    </Stack>
  );
};

const CountOfMonthCalendarsTemplate = () => {
  type Orientation = 'horizontal' | 'vertical';
  type HCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'horizontal'>['monthCalendars']
  >;
  type VCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'vertical'>['monthCalendars']
  >;
  const H_CALENDARS: Array<HCalendarsType> = [1, 2, 3] as const;
  const V_CALENDARS: Array<VCalendarsType> = [3, 5, 8] as const;
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [hCalendars, setHCalendars] = useState<HCalendarsType>(2);
  const [vCalendars, setVCalendars] = useState<VCalendarsType>(5);
  const monthCalendars = orientation === 'horizontal' ? hCalendars : vCalendars;

  const handleOrientationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setOrientation(checked ? 'vertical' : 'horizontal');
  };
  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    switch (orientation) {
      case 'horizontal':
        setHCalendars(Number(value) as HCalendarsType);
        break;
      case 'vertical':
        setVCalendars(Number(value) as VCalendarsType);
    }
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack
        spacing={5}
        style={{ display: 'inline-flex', alignItems: 'start' }}
      >
        <Label content={`'vertical'`}>
          <Switch
            checked={orientation === 'vertical'}
            onChange={handleOrientationChange}
          />
        </Label>
        <Box
          as="fieldset"
          round="sm"
          style={{ backgroundColor: 'surface-container', border: 'none' }}
        >
          <Chip as="legend" variant="filled" color="surface-container-highest">
            Calendars
          </Chip>
          <RadioGroup
            name="option"
            value={String(monthCalendars)}
            onChange={handleCalendarsChange}
          >
            <Grid columns={3} spacing={5}>
              {(orientation === 'horizontal' ? H_CALENDARS : V_CALENDARS).map(
                (calendar) => {
                  const calendarStr = String(calendar);
                  return (
                    <Label content={calendarStr}>
                      <Radio value={calendarStr} />
                    </Label>
                  );
                }
              )}
            </Grid>
          </RadioGroup>
        </Box>
      </Stack>
      <DateRangeCalendar
        options={{ month: 'numeric' }}
        monthCalendarsOrientation={orientation}
        monthCalendars={monthCalendars}
      />
    </Stack>
  );
};

const CountOfDayCalendarsTemplate = () => {
  type Orientation = 'horizontal' | 'vertical';
  type HCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'horizontal', 'horizontal'>['dayCalendars']
  >;
  type VCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'horizontal', 'vertical'>['dayCalendars']
  >;
  const H_CALENDARS: Array<HCalendarsType> = [1, 2, 3] as const;
  const V_CALENDARS: Array<VCalendarsType> = [3, 5, 8] as const;
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [hCalendars, setHCalendars] = useState<HCalendarsType>(2);
  const [vCalendars, setVCalendars] = useState<VCalendarsType>(5);
  const dayCalendars = orientation === 'horizontal' ? hCalendars : vCalendars;

  const handleOrientationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setOrientation(checked ? 'vertical' : 'horizontal');
  };
  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    switch (orientation) {
      case 'horizontal':
        setHCalendars(Number(value) as HCalendarsType);
        break;
      case 'vertical':
        setVCalendars(Number(value) as VCalendarsType);
    }
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack
        spacing={5}
        style={{ display: 'inline-flex', alignItems: 'start' }}
      >
        <Label content={`'vertical'`}>
          <Switch
            checked={orientation === 'vertical'}
            onChange={handleOrientationChange}
          />
        </Label>
        <Box
          as="fieldset"
          round="sm"
          style={{ backgroundColor: 'surface-container', border: 'none' }}
        >
          <Chip as="legend" variant="filled" color="surface-container-highest">
            Calendars
          </Chip>
          <RadioGroup
            name="option"
            value={String(dayCalendars)}
            onChange={handleCalendarsChange}
          >
            <Grid columns={3} spacing={5}>
              {(orientation === 'horizontal' ? H_CALENDARS : V_CALENDARS).map(
                (calendar) => {
                  const calendarStr = String(calendar);
                  return (
                    <Label content={calendarStr}>
                      <Radio value={calendarStr} />
                    </Label>
                  );
                }
              )}
            </Grid>
          </RadioGroup>
        </Box>
      </Stack>
      <DateRangeCalendar
        dayCalendarsOrientation={orientation}
        dayCalendars={dayCalendars}
      />
    </Stack>
  );
};

export const BasicDateRangeCalendar: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangeCalendar {...args} />
      <DateRangeCalendar
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
  <DateRangeCalendar />
  <DateRangeCalendar
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

export const ControlledDateRangeCalendar: Story = {
  render: () => <ControlledDateRangeCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateRangeCalendarTemplate = () => {
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
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <DateRangeCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <DateRangeCalendar referenceDate={new Date(2050, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar referenceDate={new Date(2050, 0, 1)} />`.trim()
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
      <DateRangeCalendar
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
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
  const OPTIONS: Array<DateRangeCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
    { year: 'numeric' },
    { month: 'long' },
    { day: 'numeric' }
  ] as const;
  const [option, setOption] = useState<DateRangeCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangeCalendarProps['options']);
  };
  const handleDateChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={3} columns={2} spacing={5}>
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
      <DateRangeCalendar
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: () => <DisabledDatesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const dateToMonth = (date: Date) => {
  return date.getFullYear() * 12 + date.getMonth();
};

const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

type CaseType = {
  label: string;
  withValue?: false;
  disabledDates: Array<Date> | RangeDisabledDatesFnType;
  options?: DateRangeCalendarProps['options'];
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (
    value: RangeType<Date | null>
  ) => Array<Date> | RangeDisabledDatesFnType;
  options?: DateRangeCalendarProps['options'];
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Disable today',
    disabledDates: [new Date()]
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    },
    options: { year: 'numeric' }
  },
  {
    label: \`'End' can only be selected up to 'start' + 10 years.\`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start.getFullYear();
          const year = date.getFullYear();
          return year < start || start + 10 <= year;
        }
        return false;
      },
    options: { year: 'numeric' }
  },
  {
    label: 'Available from june to august.',
    disabledDates: ({ date }) => {
      const month = date.getMonth();
      return month < 5 || 7 < month;
    },
    options: { month: 'long' }
  },
  {
    label: \`'End' can only be selected up to 'start' + 2 months.\`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start;
          const startInMonth = dateToMonth(start);
          const end = new Date(start);
          end.setMonth(start.getMonth() + 2);
          const endInMonth = dateToMonth(end);
          const dateInMonth = dateToMonth(date);
          return dateInMonth < startInMonth || endInMonth < dateInMonth;
        }
        return false;
      },
    options: { month: 'long' }
  },
  {
    label: 'Disable weekends.',
    disabledDates: ({ date }) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    }
  },
  {
    label: 'Available between 2026.6.1 and 2026.8.15.',
    disabledDates: ({ date }) => {
      const startInDay = dateToDay(new Date(2026, 5, 1));
      const endInDay = dateToDay(new Date(2026, 7, 15));
      const dateInDay = dateToDay(date);
      return dateInDay < startInDay || endInDay < dateInDay;
    }
  },
  {
    label: \`'End' can only be selected up to 'start' + 7 days.\`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start;
          const startInDay = dateToDay(start);
          const end = new Date(start);
          end.setDate(start.getDate() + 7);
          const endInDay = dateToDay(end);
          const dateInDay = dateToDay(date);
          return dateInDay < startInDay || endInDay <= dateInDay;
        }
        return false;
      }
  }
];

const DisabledDatesTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateRangeCalendar
        value={value}
        onChange={handleChange}
        disabledDates={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDates(value)
            : CASES[caseIdx].disabledDates
        }
        options={CASES[caseIdx].options}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <DateRangeCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <DateRangeCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar disabled />`.trim()
      }
    }
  }
};

export const MonthCalendarsOrientation: Story = {
  render: (args) => (
    <DateRangeCalendar
      options={{ month: 'numeric' }}
      monthCalendarsOrientation="vertical"
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar
  options={{ month: 'numeric' }}
  monthCalendarsOrientation="vertical"
/>`.trim()
      }
    }
  }
};

export const DayCalendarsOrientation: Story = {
  render: (args) => (
    <DateRangeCalendar dayCalendarsOrientation="vertical" {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar dayCalendarsOrientation='vertical' />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: (args) => (
    <DateRangeCalendar
      options={{ year: 'numeric' }}
      yearsOrder="dsc"
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar
  options={{ year: 'numeric' }}
  yearsOrder="dsc"
/>`.trim()
      }
    }
  }
};

export const CustomRangeYear: Story = {
  render: (args) => (
    <DateRangeCalendar
      className="custom-range-year"
      options={{ year: 'numeric' }}
      {...args}
    />
  )
};

export const CountOfMonthCalendars: Story = {
  render: () => <CountOfMonthCalendarsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CountOfMonthCalendarsTemplate = () => {
  type Orientation = 'horizontal' | 'vertical';
  type HCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'horizontal'>['monthCalendars']
  >;
  type VCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'vertical'>['monthCalendars']
  >;
  const H_CALENDARS: Array<HCalendarsType> = [1, 2, 3] as const;
  const V_CALENDARS: Array<VCalendarsType> = [3, 5, 8] as const;
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [hCalendars, setHCalendars] = useState<HCalendarsType>(2);
  const [vCalendars, setVCalendars] = useState<VCalendarsType>(5);
  const monthCalendars = orientation === 'horizontal' ? hCalendars : vCalendars;

  const handleOrientationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setOrientation(checked ? 'vertical' : 'horizontal');
  };
  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    switch (orientation) {
      case 'horizontal':
        setHCalendars(Number(value) as HCalendarsType);
        break;
      case 'vertical':
        setVCalendars(Number(value) as VCalendarsType);
    }
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack
        spacing={5}
        style={{ display: 'inline-flex', alignItems: 'start' }}
      >
        <Label content={\`'vertical'\`}>
          <Switch
            checked={orientation === 'vertical'}
            onChange={handleOrientationChange}
          />
        </Label>
        <Box
          as="fieldset"
          round="sm"
          style={{ backgroundColor: 'surface-container', border: 'none' }}
        >
          <Chip as="legend" variant="filled" color="surface-container-highest">
            Calendars
          </Chip>
          <RadioGroup
            name="option"
            value={String(monthCalendars)}
            onChange={handleCalendarsChange}
          >
            <Grid columns={3} spacing={5}>
              {(orientation === 'horizontal' ? H_CALENDARS : V_CALENDARS).map(
                (calendar) => {
                  const calendarStr = String(calendar);
                  return (
                    <Label content={calendarStr}>
                      <Radio value={calendarStr} />
                    </Label>
                  );
                }
              )}
            </Grid>
          </RadioGroup>
        </Box>
      </Stack>
      <DateRangeCalendar
        options={{ month: 'numeric' }}
        monthCalendarsOrientation={orientation}
        monthCalendars={monthCalendars}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomRangeMonth: Story = {
  render: (args) => (
    <DateRangeCalendar
      className="custom-range-month"
      options={{ month: 'numeric' }}
      {...args}
    />
  )
};

export const CountOfDayCalendars: Story = {
  render: () => <CountOfDayCalendarsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CountOfDayCalendarsTemplate = () => {
  type Orientation = 'horizontal' | 'vertical';
  type HCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'horizontal', 'horizontal'>['dayCalendars']
  >;
  type VCalendarsType = NonNullable<
    DateRangeCalendarProps<'div', 'horizontal', 'vertical'>['dayCalendars']
  >;
  const H_CALENDARS: Array<HCalendarsType> = [1, 2, 3] as const;
  const V_CALENDARS: Array<VCalendarsType> = [3, 5, 8] as const;
  const [orientation, setOrientation] = useState<Orientation>('horizontal');
  const [hCalendars, setHCalendars] = useState<HCalendarsType>(2);
  const [vCalendars, setVCalendars] = useState<VCalendarsType>(5);
  const dayCalendars = orientation === 'horizontal' ? hCalendars : vCalendars;

  const handleOrientationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setOrientation(checked ? 'vertical' : 'horizontal');
  };
  const handleCalendarsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    switch (orientation) {
      case 'horizontal':
        setHCalendars(Number(value) as HCalendarsType);
        break;
      case 'vertical':
        setVCalendars(Number(value) as VCalendarsType);
    }
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack
        spacing={5}
        style={{ display: 'inline-flex', alignItems: 'start' }}
      >
        <Label content={\`'vertical'\`}>
          <Switch
            checked={orientation === 'vertical'}
            onChange={handleOrientationChange}
          />
        </Label>
        <Box
          as="fieldset"
          round="sm"
          style={{ backgroundColor: 'surface-container', border: 'none' }}
        >
          <Chip as="legend" variant="filled" color="surface-container-highest">
            Calendars
          </Chip>
          <RadioGroup
            name="option"
            value={String(dayCalendars)}
            onChange={handleCalendarsChange}
          >
            <Grid columns={3} spacing={5}>
              {(orientation === 'horizontal' ? H_CALENDARS : V_CALENDARS).map(
                (calendar) => {
                  const calendarStr = String(calendar);
                  return (
                    <Label content={calendarStr}>
                      <Radio value={calendarStr} />
                    </Label>
                  );
                }
              )}
            </Grid>
          </RadioGroup>
        </Box>
      </Stack>
      <DateRangeCalendar
        dayCalendarsOrientation={orientation}
        dayCalendars={dayCalendars}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ShowAdditionalDays: Story = {
  render: (args) => (
    <DateRangeCalendar
      showDaysOutsideCurrentMonth
      fixedWeekNumber={6}
      {...args}
    />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => <DateRangeCalendar displayWeekNumber {...args} />
};

export const CustomRangeDay: Story = {
  render: (args) => <DateRangeCalendar className="custom-range-day" {...args} />
};

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <DateRangeCalendar
      renderCalendarHeader={(calendarHeaderProps) => {
        return (
          <CalendarHeader
            prevIcon="Prev"
            nextIcon="Next"
            style={{ backgroundColor: 'surface-container' }}
            {...calendarHeaderProps}
          />
        );
      }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeCalendar
  renderCalendarHeader={(calendarHeaderProps) => {
    return (
      <CalendarHeader
        prevIcon="Prev"
        nextIcon="Next"
        style={{ backgroundColor: 'surface-container' }}
        {...calendarHeaderProps}
      />
    );
  }}
/>`.trim()
      }
    }
  }
};
