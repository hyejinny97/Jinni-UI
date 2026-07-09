import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateRangePicker, { DateRangePickerProps } from './DateRangePicker';
import DatePicker from '@/components/DatePicker';
import DateRangeCalendar from '@/components/DateRangeCalendar';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledDatesFnType
} from '@/types/date-component';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  argTypes: {
    DateRangeFieldProps: {
      description: 'DateRangeField 컴포넌트의 Props',
      table: {
        type: { summary: 'DateRangeFieldProps' }
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
        type: {
          summary: `Array<Date> | ({ date, rangeField }: { date: Date; rangeField: 'start' | 'end'; }) => boolean;`
        }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    name: {
      description: 'input name',
      table: {
        type: { summary: '{ start?: string; end?: string }' }
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
    PopoverProps: {
      description: 'Popover 컴포넌트의 props',
      table: {
        type: {
          summary: `PopoverProps`
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
    renderDateRangeCalendar: {
      description:
        'dateRangeCalendarProps를 인자로 받아 DateRangeCalendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary:
            '(dateRangeCalendarProps: DateRangeCalendarProps) => React.ReactNode;'
        },
        defaultValue: {
          summary:
            '(dateRangeCalendarProps: DateRangeCalendarProps) => <DateRangeCalendar {...dateRangeCalendarProps} />;'
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
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

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

const ControlledDateRangePickerTemplate = () => {
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
      <DateRangePicker value={value} onChange={handleChange} />
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
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
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
      <DateRangePicker
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateRangePickerProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { year: 'numeric', month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangePickerProps['options']);
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
      <DateRangePicker
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
  options?: DateRangePickerProps['options'];
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (
    value: RangeType<Date | null>
  ) => Array<Date> | RangeDisabledDatesFnType;
  options?: DateRangePickerProps['options'];
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
      <DateRangePicker
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

const MultiDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const handleStartDateChange = (value: Date | null) => {
    setStartDate(value);
  };
  const handleEndDateChange = (value: Date | null) => {
    setEndDate(value);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Date:</span>
        <DateText {...getDate(startDate)} />
        <span>-</span>
        <DateText {...getDate(endDate)} />
      </Stack>
      <Stack direction="row" spacing={20} style={{ color: 'on-surface' }}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateRangePicker: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangePicker {...args} />
      <DateRangePicker
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
  <DateRangePicker />
  <DateRangePicker
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

export const ControlledDateRangePicker: Story = {
  render: () => <ControlledDateRangePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateRangePickerTemplate = () => {
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
      <DateRangePicker value={value} onChange={handleChange} />
    </Stack>
  );
};
`.trim()
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
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
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
      <DateRangePicker
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
  const OPTIONS: Array<DateRangePickerProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { year: 'numeric', month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangePickerProps['options']);
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
      <DateRangePicker
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
  options?: DateRangePickerProps['options'];
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (
    value: RangeType<Date | null>
  ) => Array<Date> | RangeDisabledDatesFnType;
  options?: DateRangePickerProps['options'];
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
      <DateRangePicker
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

export const Readonly: Story = {
  render: (args) => (
    <DateRangePicker
      defaultValue={{
        start: new Date(2025, 6, 14),
        end: new Date(2025, 7, 20)
      }}
      readOnly
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateRangePicker
      defaultValue={{
        start: new Date(2025, 6, 14),
        end: new Date(2025, 7, 20)
      }}
      disabled
      {...args}
    />
  )
};

export const DateRangePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const departure = formData.get('departure date');
        const arrival = formData.get('arrival date');
        alert(`- Departure Date: ${departure}\n- Arrival Date: ${arrival}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DateRangePicker
        name={{ start: 'departure date', end: 'arrival date' }}
        {...args}
      />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  ),
  parameters: {
    docs: {
      source: {
        code: `<form
  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const departure = formData.get('departure date');
    const arrival = formData.get('arrival date');
    alert(\`- Departure Date: \${departure}\n- Arrival Date: \${arrival}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <DateRangePicker
    name={{ start: 'departure date', end: 'arrival date' }}
    {...args}
  />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomDateRangeField: Story = {
  render: () => (
    <Box style={{ width: '500px' }}>
      <DateRangePicker
        DateRangeFieldProps={{
          placeholder: {
            start: 'Select Departure Date',
            end: 'Select Arrival Date'
          },
          format: 'YYYY/MM/DD',
          variant: 'filled',
          size: 'sm',
          color: 'gray-400',
          focusedColor: 'tertiary',
          fullWidth: true,
          startAdornment: {
            start: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
            end: <FlightLandIcon size={20} color="on-surface-variant" />
          },
          centerIcon: <ArrowRightIcon size={20} color="gray-400" />
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '500px' }}>
  <DateRangePicker
    DateRangeFieldProps={{
      placeholder: {
        start: 'Select Departure Date',
        end: 'Select Arrival Date'
      },
      format: 'YYYY/MM/DD',
      variant: 'filled',
      size: 'sm',
      color: 'gray-400',
      focusedColor: 'tertiary',
      fullWidth: true,
      startAdornment: {
        start: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
        end: <FlightLandIcon size={20} color="on-surface-variant" />
      },
      centerIcon: <ArrowRightIcon size={20} color="gray-400" />
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const CustomDateRangeCalendar: Story = {
  render: () => (
    <DateRangePicker
      renderDateRangeCalendar={(dateRangeCalendarProps) => {
        return (
          <>
            <Box
              style={{
                padding: '6px 0',
                backgroundColor: 'surface-container-highest',
                textAlign: 'center',
                fontWeight: '700'
              }}
            >{`Today: ${new Date().toDateString()}`}</Box>
            <DateRangeCalendar
              referenceDate={new Date(2022, 6, 30)}
              yearsOrder="asc"
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              displayWeekNumber
              dayCalendarsOrientation="vertical"
              dayCalendars={3}
              {...dateRangeCalendarProps}
            />
          </>
        );
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangePicker
  renderDateRangeCalendar={(dateRangeCalendarProps) => {
    return (
      <>
        <Box
          style={{
            padding: '6px 0',
            backgroundColor: 'surface-container-highest',
            textAlign: 'center',
            fontWeight: '700'
          }}
        >{\`Today: \${new Date().toDateString()}\`}</Box>
        <DateRangeCalendar
          referenceDate={new Date(2022, 6, 30)}
          yearsOrder="asc"
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          displayWeekNumber
          dayCalendarsOrientation='vertical'
          dayCalendars={3}
          {...dateRangeCalendarProps}
        />
      </>
    );
  }}
/>`.trim()
      }
    }
  }
};

export const CustomPopover: Story = {
  render: (args) => (
    <DateRangePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};

export const MultiDatePicker: Story = {
  render: () => <MultiDatePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiDatePickerTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const handleStartDateChange = (value: Date | null) => {
    setStartDate(value);
  };
  const handleEndDateChange = (value: Date | null) => {
    setEndDate(value);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Date:</span>
        <DateText {...getDate(startDate)} />
        <span>-</span>
        <DateText {...getDate(endDate)} />
      </Stack>
      <Stack direction="row" spacing={20} style={{ color: 'on-surface' }}>
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            DateFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
