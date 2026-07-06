import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateRangeField, { DateRangeFieldProps } from './DateRangeField';
import DateField from '@/components/DateField';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledDatesFnType
} from '@/types/date-component';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateRangeField> = {
  title: 'components/DateRangePicker/DateRangeField',
  component: DateRangeField,
  argTypes: {
    centerIcon: {
      description: '두 date field 중앙에 위치한 아이콘',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    defaultValue: {
      description: '초기 date',
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
    endAdornment: {
      description: '뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary:
            '{ start?: React.ReactNode; end?: React.ReactNode, dateRangeField?: React.ReactNode }'
        }
      }
    },
    focusedField: {
      description: '현재 포커스된 date field',
      table: {
        type: { summary: `'start' | 'end'` }
      }
    },
    format: {
      description: 'date format',
      table: {
        type: { summary: 'string' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
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
    placeholder: {
      description: 'placeholder',
      table: {
        type: {
          summary: `{ start?: string; end?: string; }`
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
    startAdornment: {
      description: '앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary:
            '{ start?: React.ReactNode; end?: React.ReactNode, dateRangeField?: React.ReactNode }'
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
type Story = StoryObj<typeof DateRangeField>;

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

const ControlledDateRangeFieldTemplate = () => {
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
      <DateRangeField value={value} onChange={handleChange} />
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
      <DateRangeField
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateRangeFieldProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangeFieldProps['options']);
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
      <DateRangeField
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
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
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (
    value: RangeType<Date | null>
  ) => Array<Date> | RangeDisabledDatesFnType;
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Disable today',
    disabledDates: [new Date()]
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
      <DateRangeField
        value={value}
        onChange={handleChange}
        disabledDates={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDates(value)
            : CASES[caseIdx].disabledDates
        }
      />
    </Stack>
  );
};

const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
          Format
        </Chip>
        <RadioGroup name="format" value={format} onChange={handleFormatChange}>
          <Grid rows={1} columns={2} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateRangeField
        key={format}
        value={value}
        onChange={handleDateChange}
        format={format}
      />
    </Stack>
  );
};

const MultiDateFieldTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dateToDay = (date: Date): number => {
    return Math.trunc(date.getTime() / DAY);
  };
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

  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

  return (
    <Stack spacing={20} style={{ color: 'on-surface' }}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate(startDate)} />
        <span>-</span>
        <DateText {...getDate(endDate)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <DateField
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <DateField
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateRangeField: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangeField {...args} />
      <DateRangeField
        placeholder={{
          start: 'Select Departure Date',
          end: 'Select Arrival Date'
        }}
        {...args}
      />
      <DateRangeField
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
  <DateRangeField />
  <DateRangeField
    placeholder={{
      start: 'Select Departure Date',
      end: 'Select Arrival Date'
    }}
  />
  <DateRangeField
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

export const ControlledDateRangeField: Story = {
  render: () => <ControlledDateRangeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateRangeFieldTemplate = () => {
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
      <DateRangeField value={value} onChange={handleChange} />
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
      <DateRangeField
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
  const OPTIONS: Array<DateRangeFieldProps['options']> = [
    { dateStyle: 'medium' },
    { year: 'numeric' },
    { month: 'long' },
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  ] as const;
  const [option, setOption] = useState<DateRangeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateRangeFieldProps['options']);
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
      <DateRangeField
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

export const DateFormat: Story = {
  render: () => <DateFormatTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 6, 14),
    end: new Date(2025, 7, 20)
  });

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
          Format
        </Chip>
        <RadioGroup name="format" value={format} onChange={handleFormatChange}>
          <Grid rows={1} columns={2} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateRangeField
        key={format}
        value={value}
        onChange={handleDateChange}
        format={format}
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
        code: `const dateToDay = (date: Date) => {
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
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (
    value: RangeType<Date | null>
  ) => Array<Date> | RangeDisabledDatesFnType;
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Disable today',
    disabledDates: [new Date()]
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
      <DateRangeField
        value={value}
        onChange={handleChange}
        disabledDates={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDates(value)
            : CASES[caseIdx].disabledDates
        }
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
    <DateRangeField
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
    <DateRangeField
      defaultValue={{
        start: new Date(2025, 6, 14),
        end: new Date(2025, 7, 20)
      }}
      disabled
      {...args}
    />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Grid spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateRangeField
            key={variant}
            variant={variant}
            placeholder={{ start: variant, end: variant }}
            {...args}
          />
        )
      )}
    </Grid>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Grid spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateRangeField
          key={size}
          size={size}
          placeholder={{ start: size, end: size }}
          {...args}
        />
      ))}
    </Grid>
  )
};

export const Color: Story = {
  render: (args) => (
    <DateRangeField color="yellow-400" focusedColor="yellow-400" {...args} />
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <DateRangeField fullWidth {...args} />
    </Box>
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateRangeField disableHoverEffect {...args} />
      <DateRangeField disableFocusEffect {...args} />
    </Stack>
  )
};

export const Adornments: Story = {
  render: () => (
    <DateRangeField
      placeholder={{
        start: 'Flight Departure',
        end: 'Flight Arrival'
      }}
      startAdornment={{
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      }}
      endAdornment={{
        dateRangeField: <DateRangeIcon size={20} color="gray-500" />
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateRangeField
  placeholder={{
    start: 'Flight Departure',
    end: 'Flight Arrival'
  }}
  startAdornment={{
    start: <FlightTakeOffIcon size={20} color="gray-600" />,
    end: <FlightLandIcon size={20} color="gray-600" />
  }}
  endAdornment={{
    dateRangeField: <DateRangeIcon size={20} color="gray-500" />
  }}
/>`.trim()
      }
    }
  }
};

export const CustomCenterIcon: Story = {
  render: (args) => (
    <DateRangeField
      centerIcon={<ArrowRightIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const MultiDateField: Story = {
  render: () => <MultiDateFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiDateFieldTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dateToDay = (date: Date): number => {
    return Math.trunc(date.getTime() / DAY);
  };
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

  const isChronologicalError =
    startDate && endDate && dateToDay(startDate) > dateToDay(endDate);

  return (
    <Stack spacing={20} style={{ color: 'on-surface' }}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Date:</span>
        <DateText {...getDate(startDate)} />
        <span>-</span>
        <DateText {...getDate(endDate)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <DateField
          value={startDate}
          onChange={handleStartDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <DateField
          value={endDate}
          onChange={handleEndDateChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
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
