import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateRangeCalendar from './DateRangeCalendar';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { DateOptions } from '@/components/data-entry/DateField';
import { RangeType } from '@/components/data-entry/DateRangeField';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';

const meta: Meta<typeof DateRangeCalendar> = {
  component: DateRangeCalendar,
  argTypes: {
    dayCalendarsOrientation: {
      description: 'day calendars 정렬 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    defaultValue: {
      description: '초기 date',
      table: {
        type: { summary: '{ start?: Date, end?: Date }' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
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
      description: 'month당 보여지는 week 개수',
      table: {
        type: { summary: 'number' }
      }
    },
    horizontalDayCalendars: {
      description: '수평 상에 렌더하는 day calendars 갯수',
      table: {
        type: { summary: `1 | 2 | 3` },
        defaultValue: { summary: `2` }
      }
    },
    horizontalMonthCalendars: {
      description: '수평 상에 렌더하는 month calendars 갯수',
      table: {
        type: { summary: `1 | 2 | 3` },
        defaultValue: { summary: `2` }
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
    monthCalendarsOrientation: {
      description: 'month calendars 정렬 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start: Date | null, end: Date | null }) => void;`
        }
      }
    },
    onDayChange: {
      description: 'day 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start: Date | null, end: Date | null }) => void;`
        }
      }
    },
    onMonthChange: {
      description: 'month 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start: Date | null, end: Date | null }) => void;`
        }
      }
    },
    onYearChange: {
      description: 'year 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start: Date | null, end: Date | null }) => void;`
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
        },
        defaultValue: { summary: 'false' }
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
    renderDay: {
      description: 'dayProps를 인자로 받아 Day 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dayProps: DayProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dayProps: DayProps) => <Day {...dayProps} />`
        }
      }
    },
    renderMonth: {
      description: 'monthProps를 인자로 받아 Month 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(monthProps: MonthProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(monthProps: MonthProps) => <Month {...monthProps} />`
        }
      }
    },
    renderYear: {
      description: 'yearProps를 인자로 받아 Year 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(yearProps: YearProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(yearProps: YearProps) => <Year {...yearProps} />`
        }
      }
    },
    showDaysOutsideCurrentMonth: {
      description:
        'true이면, 현재 month에 해당하는 days 이외의 앞뒤 일부 days를 나타냄',
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
          summary: `{ start: Date | null, end: Date | null }`
        }
      }
    },
    verticalDayCalendars: {
      description: '수직 상에 렌더하는 day calendars 갯수',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `5` }
      }
    },
    verticalMonthCalendars: {
      description: '수직 상에 렌더하는 month calendars 갯수',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `5` }
      }
    },
    yearsOrder: {
      description: 'years를 나타내는 순서',
      table: {
        type: {
          summary: `'asc' | 'desc'`
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

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<DateOptions> = [
  {
    dateStyle: 'medium'
  },
  {
    year: 'numeric'
  },
  {
    month: 'long'
  }
];
const DEFAULT_VALUE = {
  start: new Date(2025, 6, 8, 12, 30),
  end: new Date(2025, 7, 13, 17, 20)
};
const CALENDARS = [1, 2, 3] as const;

const DateStr = ({ date }: { date: Date | null }) => {
  const year = date?.getFullYear();
  const month = date?.getMonth();
  const day = date?.getDate();

  return (
    <Text
      style={{
        display: 'inline-flex',
        gap: '5px',
        maxWidth: 'max-content',
        margin: '10px'
      }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const ControlledDateRangeCalendarTemplate = ({ ...props }) => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        <span>Date:</span>
        <DateStr date={value.start} />
        <span>-</span>
        <DateStr date={value.end} />
      </Stack>
      <DateRangeCalendar value={value} onChange={handleChange} {...props} />
    </Stack>
  );
};

const LocaleTemplate = () => {
  const [selectedLocale, setSelectedLocale] = useState(LOCALES[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocale(event.target.value);
  };

  return (
    <Stack>
      <Grid columns={LOCALES.length}>
        {LOCALES.map((locale) => (
          <RadioLabel key={locale} label={locale}>
            <Radio
              value={locale}
              checked={selectedLocale === locale}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Stack key={selectedLocale}>
        <Text>{`Locale: '${selectedLocale}'`}</Text>
        <DateRangeCalendar
          locale={selectedLocale}
          defaultValue={DEFAULT_VALUE}
        />
      </Stack>
    </Stack>
  );
};

const HorizontalDayCalendarsTemplate = () => {
  const [selectedCalendars, setSelectedCalendars] = useState<
    (typeof CALENDARS)[number]
  >(CALENDARS[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCalendars(
      Number(event.target.value) as (typeof CALENDARS)[number]
    );
  };

  return (
    <Stack>
      <Grid columns={CALENDARS.length}>
        {CALENDARS.map((calendarNum) => (
          <RadioLabel key={calendarNum} label={`${calendarNum}개`}>
            <Radio
              value={calendarNum}
              checked={selectedCalendars === calendarNum}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Stack key={selectedCalendars}>
        <Text>{`Calendars: ${selectedCalendars}개`}</Text>
        <DateRangeCalendar horizontalDayCalendars={selectedCalendars} />
      </Stack>
    </Stack>
  );
};

const HorizontalMonthCalendarsTemplate = () => {
  const [selectedCalendars, setSelectedCalendars] = useState<
    (typeof CALENDARS)[number]
  >(CALENDARS[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCalendars(
      Number(event.target.value) as (typeof CALENDARS)[number]
    );
  };

  return (
    <Stack>
      <Grid columns={CALENDARS.length}>
        {CALENDARS.map((calendarNum) => (
          <RadioLabel key={calendarNum} label={`${calendarNum}개`}>
            <Radio
              value={calendarNum}
              checked={selectedCalendars === calendarNum}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Stack key={selectedCalendars}>
        <Text>{`Calendars: ${selectedCalendars}개`}</Text>
        <DateRangeCalendar
          horizontalMonthCalendars={selectedCalendars}
          options={{ month: 'numeric' }}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateRangeCalendar: Story = {
  render: () => <DateRangeCalendar />
};

export const DefaultValue: Story = {
  render: () => <DateRangeCalendar defaultValue={DEFAULT_VALUE} />
};

export const ControlledDateRangeCalendar: Story = {
  render: () => <ControlledDateRangeCalendarTemplate />
};

export const ChooseTheInitialDate: Story = {
  render: () => <DateRangeCalendar referenceDate={new Date(2022, 10, 5)} />
};

export const Locale: Story = {
  render: () => <LocaleTemplate />
};

export const Options: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {OPTIONS.map((options) => (
        <Stack key={JSON.stringify(options)}>
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
          <DateRangeCalendar options={options} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => <DateRangeCalendar defaultValue={DEFAULT_VALUE} readOnly />
};

export const Disabled: Story = {
  render: () => <DateRangeCalendar defaultValue={DEFAULT_VALUE} disabled />
};

export const RestrictDate: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          1) MinDate = 2025/07/05
        </Text>
        <ControlledDateRangeCalendarTemplate
          referenceDate={new Date('2025-07')}
          minDate={new Date('2025-07-05')}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          2) MaxDate = 2025/07/20
        </Text>
        <ControlledDateRangeCalendarTemplate
          referenceDate={new Date('2025-07')}
          maxDate={new Date('2025-07-20')}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          3) DisabledDates = 2025/07/10, 2025/07/15
        </Text>
        <ControlledDateRangeCalendarTemplate
          referenceDate={new Date('2025-07')}
          disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        />
      </Stack>
    </Grid>
  )
};

export const OrderOfYears: Story = {
  render: () => (
    <DateRangeCalendar yearsOrder="dsc" options={{ year: 'numeric' }} />
  )
};

export const ShowAdditionalDays: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateRangeCalendar showDaysOutsideCurrentMonth />
      <DateRangeCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
    </Stack>
  )
};

export const DisplayWeekNumber: Story = {
  render: () => <DateRangeCalendar displayWeekNumber />
};

export const OrientationOfDayCalendars: Story = {
  render: () => <DateRangeCalendar dayCalendarsOrientation="vertical" />
};

export const OrientationOfMonthCalendars: Story = {
  render: () => (
    <DateRangeCalendar
      options={{ month: 'numeric' }}
      monthCalendarsOrientation="vertical"
    />
  )
};

export const ChooseTheHorizontalDayCalendarsToRender: Story = {
  render: () => <HorizontalDayCalendarsTemplate />
};

export const ChooseTheVerticalDayCalendarsToRender: Story = {
  render: () => (
    <DateRangeCalendar
      dayCalendarsOrientation="vertical"
      verticalDayCalendars={11}
    />
  )
};

export const ChooseTheHorizontalMonthCalendarsToRender: Story = {
  render: () => <HorizontalMonthCalendarsTemplate />
};

export const ChooseTheVerticalMonthCalendarsToRender: Story = {
  render: () => (
    <DateRangeCalendar
      options={{ month: 'numeric' }}
      monthCalendarsOrientation="vertical"
      verticalMonthCalendars={11}
    />
  )
};
