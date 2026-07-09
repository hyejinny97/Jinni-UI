import './DateYearRangeCalendarCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateYearRangeCalendar, {
  DateYearRangeCalendarProps
} from './DateYearRangeCalendar';
import CalendarHeader from '@/components/CalendarHeader';
import Stack from '@/components/Stack';
import Text from '@/components/Text';
import Box from '@/components/Box';
import Grid from '@/components/Grid';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledDatesFnType
} from '@/types/date-component';

const meta: Meta<typeof DateYearRangeCalendar> = {
  title: 'components/DateRangePicker/DateRangeCalendar/DateYearRangeCalendar',
  component: DateYearRangeCalendar,
  argTypes: {
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
          summary: `({ date, rangeField }: { date: Date; rangeField: 'start' | 'end'; }) => boolean;`
        }
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
type Story = StoryObj<typeof DateYearRangeCalendar>;

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

const ControlledDateYearRangeCalendarTemplate = () => {
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
      <DateYearRangeCalendar value={value} onChange={handleChange} />
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
      <DateYearRangeCalendar
        key={locale}
        value={value}
        onChange={handleDateChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateYearRangeCalendarProps['options']> = [
    {
      dateStyle: 'medium'
    },
    {
      year: 'numeric'
    },
    {
      year: '2-digit'
    }
  ] as const;
  const [option, setOption] = useState<DateYearRangeCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateYearRangeCalendarProps['options']);
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
      <DateYearRangeCalendar
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        options={option}
      />
    </Stack>
  );
};

type CaseType = {
  label: string;
  withValue?: false;
  disabledDates: RangeDisabledDatesFnType;
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (value: RangeType<Date | null>) => RangeDisabledDatesFnType;
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Available from 2000 to 2050.',
    disabledDates: ({ date }) => {
      const year = date.getFullYear();
      return year < 2000 || 2050 < year;
    }
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    }
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
      <DateYearRangeCalendar
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

export const BasicDateYearRangeCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateYearRangeCalendar {...args} />
      <DateYearRangeCalendar
        defaultValue={{
          start: new Date(2025, 6, 14),
          end: new Date(2030, 7, 20)
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateYearRangeCalendar />
  <DateYearRangeCalendar
    defaultValue={{
      start: new Date(2025, 6, 14),
      end: new Date(2030, 7, 20)
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateYearRangeCalendar: Story = {
  render: () => <ControlledDateYearRangeCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateYearRangeCalendarTemplate = () => {
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
      <DateYearRangeCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <DateYearRangeCalendar referenceDate={new Date(2050, 0, 1)} {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateYearRangeCalendar referenceDate={new Date(2050, 0, 1)} />`.trim()
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
      <DateYearRangeCalendar
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
  const OPTIONS: Array<DateYearRangeCalendarProps['options']> = [
    {
      dateStyle: 'medium'
    },
    {
      year: 'numeric'
    },
    {
      year: '2-digit'
    }
  ] as const;
  const [option, setOption] = useState<DateYearRangeCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateYearRangeCalendarProps['options']);
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
      <DateYearRangeCalendar
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
        code: `type CaseType = {
  label: string;
  withValue?: false;
  disabledDates: RangeDisabledDatesFnType;
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (value: RangeType<Date | null>) => RangeDisabledDatesFnType;
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Available from 2000 to 2050.',
    disabledDates: ({ date }) => {
      const year = date.getFullYear();
      return year < 2000 || 2050 < year;
    }
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    }
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
      <DateYearRangeCalendar
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

export const ReadOnly: Story = {
  render: (args) => <DateYearRangeCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateYearRangeCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <DateYearRangeCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateYearRangeCalendar disabled />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: (args) => <DateYearRangeCalendar yearsOrder="dsc" {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateYearRangeCalendar yearsOrder='dsc' />`.trim()
      }
    }
  }
};

export const CustomRangeYear: Story = {
  render: (args) => (
    <DateYearRangeCalendar className="custom-range-year" {...args} />
  )
};

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <DateYearRangeCalendar
      renderCalendarHeader={(calendarHeaderProps) => {
        return (
          <CalendarHeader
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
        code: `<DateYearRangeCalendar
  renderCalendarHeader={(calendarHeaderProps) => {
    return (
      <CalendarHeader
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
